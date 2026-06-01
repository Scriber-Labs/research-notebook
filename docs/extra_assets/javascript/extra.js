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
            // Check if it already has "About This Page" to avoid double injection
            if (!title.textContent.includes('About This Page')) {
                let label = title.querySelector('.md-nav__title__text');
                if (!label) {
                    // MkDocs often has the text directly in the label or in a span
                    // We'll replace the text node that says "On this page"
                    for (let node of title.childNodes) {
                        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === 'On this page') {
                            node.textContent = 'About This Page';
                        }
                    }
                } else if (label.innerText.trim() === 'On this page') {
                    label.innerText = 'About This Page';
                }
            }
        });
    }

    fixLayout();
    // Run again after a short delay to catch any late rendering
    setTimeout(fixLayout, 500);
});