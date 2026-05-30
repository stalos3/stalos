document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const header = document.querySelector('.header-inner');
    const nav = header ? header.querySelector('nav') : null;
    if (header && nav) {
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'nav-toggle';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
        toggle.textContent = 'Menu';
        header.insertBefore(toggle, nav);

        toggle.addEventListener('click', function () {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!expanded));
            body.classList.toggle('nav-open', !expanded);
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 900) {
                body.classList.remove('nav-open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    const backToTop = document.createElement('button');
    backToTop.type = 'button';
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Scroll back to top');
    backToTop.textContent = '↑';
    document.body.appendChild(backToTop);

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', function () {
        backToTop.classList.toggle('show', window.scrollY > 320);
    });
});
