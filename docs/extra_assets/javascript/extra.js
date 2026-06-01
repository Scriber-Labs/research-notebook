document$.subscribe(function() {
    console.log("Initialize third-party libraries here.");

    // Replace emoji shortcodes with images
    const emojiShortcodes = [':favicon:', ':ember:', ':eigenote:'];
    const iconMap = {
        ':favicon:': '../extra_assets/images/favicon.png',
        ':ember:': '../extra_assets/images/ember.png',
        ':eigenote:': '../extra_assets/images/eigenote.png'
    };

    // Need to handle relative paths carefully, or use absolute from root
    const rootPath = document.querySelector('link[rel="canonical"]')?.href || window.location.origin;

    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    const nodesToReplace = [];

    while (node = walk.nextNode()) {
        let text = node.nodeValue;
        let hasMatch = false;
        for (const shortcode of emojiShortcodes) {
            if (text.includes(shortcode)) {
                hasMatch = true;
                break;
            }
        }
        if (hasMatch && !node.parentElement.closest('code, pre')) {
            nodesToReplace.push(node);
        }
    }

    nodesToReplace.forEach(textNode => {
        let text = textNode.nodeValue;
        let hasShortcode = false;
        for (const shortcode of emojiShortcodes) {
            if (text.includes(shortcode)) {
                hasShortcode = true;
                break;
            }
        }
        if (!hasShortcode) return;

        const span = document.createElement('span');
        let html = text;
        for (const [shortcode, path] of Object.entries(iconMap)) {
            const regex = new RegExp(shortcode.replace(/:/g, '\\:'), 'g');
            // Use paths relative to the current script location or better, use relative paths derived from the current URL
            const scriptPath = Array.from(document.querySelectorAll('script')).find(s => s.src.includes('extra.js'))?.src;
            const assetsImagesPath = scriptPath ? scriptPath.replace('javascript/extra.js', 'images/') : '/extra_assets/images/';
            const imgHtml = `<img src="${assetsImagesPath}${shortcode.replace(/:/g, '')}.png" class="twemoji" style="width:1.25em; height:1.25em; vertical-align:middle; display:inline-block;" title="${shortcode}" alt="${shortcode}">`;
            html = html.replace(regex, imgHtml);
        }
        span.innerHTML = html;
        if (textNode.parentNode) {
            textNode.parentNode.replaceChild(span, textNode);
        }
    });

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