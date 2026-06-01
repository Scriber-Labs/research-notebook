document$.subscribe(function() {
    console.log("Initialize third-party libraries here.");

    // Fix header centering and layout
    function fixLayout() {
        const headerInner = document.querySelector('.md-header__inner');
        if (headerInner) {
            headerInner.style.margin = '0 auto';
            headerInner.style.maxWidth = '1220px';
            headerInner.style.display = 'flex';
            headerInner.style.width = '100%';
        }

        const mainInner = document.querySelector('.md-main__inner');
        if (mainInner) {
            mainInner.style.maxWidth = '1220px';
            mainInner.style.margin = '0 auto';
            mainInner.style.display = 'flex';
            mainInner.style.width = '100%';
        }

        // Fix TOC Title
        const tocTitles = document.querySelectorAll('.md-nav--secondary .md-nav__title, .md-nav--secondary > .md-nav__title');
        tocTitles.forEach(title => {
            if (title.innerText.trim() === '' || title.innerText.trim() === 'On this page' || title.getAttribute('for') === '__toc') {
                // If it's the default TOC title or empty, we forcefully set it
                // We use a span to ensure it's visible if we hide the original text via CSS
                let label = title.querySelector('.md-nav__title__text');
                if (!label) {
                    // Create it if it doesn't exist (MkDocs sometimes has different structures)
                    title.innerHTML = '<span class="md-nav__icon md-icon"></span> About This Page';
                } else {
                    label.innerText = 'About This Page';
                }
                title.style.color = 'var(--ptg-color-primary)';
                title.style.visibility = 'visible';
                title.style.display = 'block';
            }
        });
    }

    fixLayout();
    // Run again after a short delay to catch any late rendering
    setTimeout(fixLayout, 500);
});