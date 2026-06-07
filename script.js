// THANK YOU SO MUCH W3SCHOOLS OMG <3
document.addEventListener('DOMContentLoaded', function () {

    // Carousel setup for each faction section
    document.querySelectorAll('section.faction').forEach(function (faction) {
        var track = faction.querySelector('.carousel-track');
        var cards = Array.from(track.querySelectorAll('.char-card'));
        var viewport = faction.querySelector('.carousel-viewport');
        var prevBtn = faction.querySelector('.carousel-btn.prev');
        var nextBtn = faction.querySelector('.carousel-btn.next');
        var dotsWrap = faction.querySelector('.carousel-dots');

        if (cards.length === 0) return;

        var index = 0;

        cards.forEach(function (_, i) {
            var dot = document.createElement('div');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', function () { goTo(i); });
            dotsWrap.appendChild(dot);
        });

        var dots = Array.from(dotsWrap.querySelectorAll('.carousel-dot'));

        function cardStep() {
            return 460 + 36;
        }

        function visibleCount() {
            return Math.max(1, Math.floor(viewport.offsetWidth / cardStep()));
        }

        function maxIndex() {
            return Math.max(0, cards.length - visibleCount());
        }

        function goTo(i) {
            index = Math.max(0, Math.min(i, maxIndex()));
            var offset = index * cardStep();
            track.style.transform = 'translateX(-' + offset + 'px)';
            prevBtn.disabled = index === 0;
            nextBtn.disabled = index >= maxIndex();
            dots.forEach(function (d, j) {
                d.classList.toggle('active', j === index);
            });
        }

        prevBtn.addEventListener('click', function () { goTo(index - 1); });
        nextBtn.addEventListener('click', function () { goTo(index + 1); });

        faction.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') { goTo(index - 1); e.preventDefault(); }
            if (e.key === 'ArrowRight') { goTo(index + 1); e.preventDefault(); }
        });
        faction.setAttribute('tabindex', '0');

        // Touch swipe support
        var touchStartX = 0;
        var touchEndX = 0;

        viewport.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        viewport.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            var diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    goTo(index + 1);
                } else {
                    goTo(index - 1);
                }
            }
        }, { passive: true });

        window.addEventListener('resize', function () { goTo(index); });
        goTo(0);
    });


    // Wiki search across pages
    var pages = [
        { title: 'Home', url: 'index.html', keywords: 'home honkai star rail wiki trailblazer astral express overview' },
        { title: 'Lore & Story', url: 'lore.html', keywords: 'lore story stellaron aeons paths factions akivili nanook yaoshi' },
        { title: 'Gameplay', url: 'gameplay.html', keywords: 'gameplay combat elements warp gacha modes simulated universe' },
        { title: 'Characters', url: 'characters.html', keywords: 'characters trailblazer march dan heng himeko welt sunday kafka silver wolf blade firefly' },
        { title: 'Reviews & Reception', url: 'reviews.html', keywords: 'reviews reception metacritic score ign gamespot gamesradar toucharcade awards game of the year best mobile' },
        { title: 'Astral Express', url: 'characters.html#astral-express', keywords: 'astral express trailblazer march dan heng himeko welt sunday' },
        { title: 'Stellaron Hunters', url: 'characters.html#stellaron-hunters', keywords: 'stellaron hunters kafka silver wolf blade firefly elio' },
        { title: 'Stellarons', url: 'lore.html#stellarons', keywords: 'stellaron cancer of all worlds outbreak disaster' },
        { title: 'The Aeons', url: 'lore.html#aeons', keywords: 'aeons gods akivili nanook yaoshi qlipoth ix' },
        { title: 'The Paths', url: 'lore.html#paths', keywords: 'paths hunt destruction erudition harmony nihility preservation abundance remembrance' },
        { title: 'Combat System', url: 'gameplay.html#combat', keywords: 'combat action value skill points ultimate weakness break' },
        { title: 'Elements', url: 'gameplay.html#elements', keywords: 'elements fire ice lightning wind physical quantum imaginary' },
        { title: 'Game Modes', url: 'gameplay.html#modes', keywords: 'modes simulated universe memory of chaos pure fiction apocalyptic shadow' },
        { title: 'Warp System', url: 'gameplay.html#warp', keywords: 'warp gacha pity banner stellar jade pulls' },
        { title: 'Critical Reception', url: 'reviews.html#critical', keywords: 'critical reception metacritic opencritic scores ratings 87 86 85' },
        { title: 'Major Reviews', url: 'reviews.html#reviews', keywords: 'reviews ign gamespot gamesradar push square rpgsite toucharcade scores' },
        { title: 'Awards', url: 'reviews.html#awards', keywords: 'awards game awards best mobile apple app store google play nominations won' },
        { title: 'Player Reception', url: 'reviews.html#players', keywords: 'player reception community downloads 150 million subreddit gacha feedback' }
    ];

    var searchInputs = document.querySelectorAll('.wiki-search input');
    var searchButtons = document.querySelectorAll('.wiki-search button');

    searchInputs.forEach(function (input, idx) {
        var dropdown = document.createElement('div');
        dropdown.className = 'search-dropdown';
        input.parentElement.appendChild(dropdown);

        function runSearch() {
            var query = input.value.trim().toLowerCase();
            dropdown.innerHTML = '';

            if (query.length < 2) {
                dropdown.classList.remove('visible');
                return;
            }

            var results = pages.filter(function (page) {
                return page.title.toLowerCase().indexOf(query) !== -1 ||
                    page.keywords.indexOf(query) !== -1;
            });

            if (results.length === 0) {
                dropdown.innerHTML = '<div class="search-no-results">No results found</div>';
                dropdown.classList.add('visible');
                return;
            }

            results.forEach(function (result) {
                var link = document.createElement('a');
                link.href = result.url;
                link.className = 'search-result-item';
                link.textContent = result.title;
                dropdown.appendChild(link);
            });

            dropdown.classList.add('visible');
        }

        input.addEventListener('input', runSearch);

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                var firstLink = dropdown.querySelector('.search-result-item');
                if (firstLink) {
                    window.location.href = firstLink.href;
                }
            }
            if (e.key === 'Escape') {
                dropdown.classList.remove('visible');
                input.blur();
            }
        });

        searchButtons[idx].addEventListener('click', function () {
            runSearch();
        });

        document.addEventListener('click', function (e) {
            if (!input.parentElement.contains(e.target)) {
                dropdown.classList.remove('visible');
            }
        });
    });


    // Smooth scroll for sidebar anchor links
    document.querySelectorAll('.wiki-sidebar a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    // Mobile sidebar toggle
    var sidebar = document.querySelector('.wiki-sidebar');
    if (sidebar) {
        var toggleBtn = document.createElement('button');
        toggleBtn.className = 'sidebar-toggle';
        toggleBtn.setAttribute('aria-label', 'Toggle sidebar');
        toggleBtn.innerHTML = '<span></span><span></span><span></span>';
        document.querySelector('.wiki-topbar').appendChild(toggleBtn);

        toggleBtn.addEventListener('click', function () {
            sidebar.classList.toggle('open');
            toggleBtn.classList.toggle('active');
        });

        document.querySelector('.wiki-main').addEventListener('click', function () {
            sidebar.classList.remove('open');
            toggleBtn.classList.remove('active');
        });
    }


    // Back to top button
    var topBtn = document.createElement('button');
    topBtn.className = 'back-to-top';
    topBtn.setAttribute('aria-label', 'Back to top');
    topBtn.textContent = '\u2191';
    document.body.appendChild(topBtn);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            topBtn.classList.add('visible');
        } else {
            topBtn.classList.remove('visible');
        }
    });

    topBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});
