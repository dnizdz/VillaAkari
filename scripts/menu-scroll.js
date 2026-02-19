window.menuScrollModule = (function () {
    const defaultConfig = {
        selector: 'a[href^="#"]',
        header: '.navbar',
        offset: 20
    };

    let config = { ...defaultConfig };
    let closeMenuHandler = null;

    function getHeaderHeight() {
        const header = document.querySelector(config.header);
        return header ? header.offsetHeight : 70;
    }

    function scrollToSection(hash) {
        if (!hash || !hash.startsWith('#')) return;
        const target = document.querySelector(hash);
        if (!target) return;

        const startPosition = window.scrollY;
        const targetPosition = target.getBoundingClientRect().top + startPosition;
        const headerHeight = getHeaderHeight();
        const finalPosition = Math.max(targetPosition - headerHeight - config.offset, 0);

        window.scrollTo({ top: finalPosition, behavior: 'smooth' });
    }

    function handleLinkClick(event) {
        event.preventDefault();
        const hash = event.currentTarget.getAttribute('href');
        scrollToSection(hash);

        if (typeof closeMenuHandler === 'function' && event.currentTarget.closest('.nav-links')) {
            closeMenuHandler();
        }
    }

    function attachListeners() {
        const anchors = document.querySelectorAll(config.selector);
        anchors.forEach(anchor => {
            anchor.removeEventListener('click', handleLinkClick);
            anchor.addEventListener('click', handleLinkClick);
        });
    }

    function init(options = {}) {
        config = { ...config, ...options };
        closeMenuHandler = typeof options.closeMenu === 'function' ? options.closeMenu : closeMenuHandler;
        attachListeners();
    }

    return {
        init
    };
})();
