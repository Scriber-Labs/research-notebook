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
        const tocTitles = document.querySelectorAll('.md-nav--secondary .md-nav__title, .md-nav--secondary > .md-nav__title, [data-md-component="toc"] .md-nav__title');
        tocTitles.forEach(title => {
            // Check if it already has "About This Page" to avoid double injection
            if (!title.textContent.includes('About This Page')) {
                // Force visibility
                title.style.display = 'block';
                title.style.visibility = 'visible';
                title.style.opacity = '1';

                let label = title.querySelector('.md-nav__title__text');
                if (!label) {
                    // Try to find if there's any text node to replace
                    let replaced = false;
                    for (let node of title.childNodes) {
                        if (node.nodeType === Node.TEXT_NODE && (node.textContent.trim() === 'On this page' || node.textContent.trim() === 'Table of contents')) {
                            node.textContent = 'About This Page';
                            replaced = true;
                        }
                    }
                    if (!replaced && title.innerText.trim() === '') {
                         // If empty, just append it
                         title.appendChild(document.createTextNode('About This Page'));
                    }
                } else {
                    label.innerText = 'About This Page';
                }
            }
        });
    }

    fixLayout();
    // Run again after a short delay to catch any late rendering
    setTimeout(fixLayout, 500);
});