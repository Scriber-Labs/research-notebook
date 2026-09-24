// --- Main Initialization for Extra Assets & Features ---
function initExtraFeatures() {
    // Replace emoji shortcodes with images
    const emojiShortcodes = [':favicon:', ':ember:', ':eigenote:'];
    const iconMap = {
        ':favicon:': '../extra_assets/images/favicon.png',
        ':ember:': '../extra_assets/images/ember.png',
        ':eigenote:': '../extra_assets/images/eigenote.png'
    };

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
            if (!title.textContent.includes('About This Page')) {
                title.style.display = 'block';
                title.style.visibility = 'visible';
                title.style.opacity = '1';

                let label = title.querySelector('.md-nav__title__text');
                if (!label) {
                    let replaced = false;
                    for (let node of title.childNodes) {
                        if (node.nodeType === Node.TEXT_NODE && (node.textContent.trim() === 'On this page' || node.textContent.trim() === 'Table of contents')) {
                            node.textContent = 'About This Page';
                            replaced = true;
                        }
                    }
                    if (!replaced && title.innerText.trim() === '') {
                         title.appendChild(document.createTextNode('About This Page'));
                    }
                } else {
                    label.innerText = 'About This Page';
                }
            }
        });
    }

    fixLayout();
    setTimeout(fixLayout, 500);

    // --- Mermaid Zoom/Pan & Fullscreen Lightbox Modal Support ---
    let lightboxModal = null;
    let activeModalPanZoom = null;
    let isProcessingMermaid = false;

    function getOrCreateLightbox() {
        if (lightboxModal && document.body.contains(lightboxModal)) {
            return lightboxModal;
        }

        const modal = document.createElement('div');
        modal.id = 'mermaid-lightbox-modal';
        modal.className = 'mermaid-lightbox-overlay';
        modal.innerHTML = `
            <div class="mermaid-lightbox-backdrop"></div>
            <div class="mermaid-lightbox-content">
                <div class="mermaid-lightbox-header">
                    <div class="mermaid-lightbox-title">
                        <span class="mermaid-lightbox-badge">Interactive Diagram Viewer</span>
                        <span class="mermaid-lightbox-hint">Scroll to zoom &bull; Drag to pan &bull; Double-click to reset &bull; Esc to close</span>
                    </div>
                    <div class="mermaid-lightbox-actions">
                        <button type="button" class="mermaid-zoom-btn" data-action="modal-zoom-in" title="Zoom In (+)" aria-label="Zoom In">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                            <span class="mermaid-btn-text">Zoom In</span>
                        </button>
                        <button type="button" class="mermaid-zoom-btn" data-action="modal-zoom-out" title="Zoom Out (-)" aria-label="Zoom Out">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                            <span class="mermaid-btn-text">Zoom Out</span>
                        </button>
                        <button type="button" class="mermaid-zoom-btn" data-action="modal-reset" title="Reset View" aria-label="Reset View">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                            <span class="mermaid-btn-text">Reset</span>
                        </button>
                        <button type="button" class="mermaid-zoom-btn mermaid-close-btn" data-action="modal-close" title="Close Fullscreen (Esc)" aria-label="Close Fullscreen">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            <span class="mermaid-btn-text">Close</span>
                        </button>
                    </div>
                </div>
                <div class="mermaid-lightbox-body" id="mermaid-lightbox-body"></div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.mermaid-lightbox-backdrop').addEventListener('click', closeMermaidLightbox);
        modal.querySelector('[data-action="modal-close"]').addEventListener('click', closeMermaidLightbox);
        modal.querySelector('[data-action="modal-zoom-in"]').addEventListener('click', () => {
            if (activeModalPanZoom) activeModalPanZoom.zoomIn();
        });
        modal.querySelector('[data-action="modal-zoom-out"]').addEventListener('click', () => {
            if (activeModalPanZoom) activeModalPanZoom.zoomOut();
        });
        modal.querySelector('[data-action="modal-reset"]').addEventListener('click', () => {
            if (activeModalPanZoom) {
                activeModalPanZoom.reset();
                activeModalPanZoom.fit();
                activeModalPanZoom.center();
            }
        });

        window.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('active')) return;
            if (e.key === 'Escape') {
                closeMermaidLightbox();
            } else if (e.key === '+' || e.key === '=') {
                if (activeModalPanZoom) activeModalPanZoom.zoomIn();
            } else if (e.key === '-' || e.key === '_') {
                if (activeModalPanZoom) activeModalPanZoom.zoomOut();
            } else if (e.key === '0') {
                if (activeModalPanZoom) {
                    activeModalPanZoom.reset();
                    activeModalPanZoom.fit();
                    activeModalPanZoom.center();
                }
            }
        });

        window.addEventListener('resize', () => {
            if (lightboxModal && lightboxModal.classList.contains('active') && activeModalPanZoom) {
                activeModalPanZoom.resize();
            }
        });

        lightboxModal = modal;
        return modal;
    }

    function openMermaidLightbox(svgElement, originalSvgHtml) {
        if (typeof svgPanZoom === 'undefined') {
            console.warn("svgPanZoom is not loaded yet.");
            return;
        }

        const modal = getOrCreateLightbox();
        const body = modal.querySelector('#mermaid-lightbox-body');
        body.innerHTML = '';

        // Clone the SVG element from DOM directly to preserve all styled/math-rendered DOM nodes
        let modalSvg = null;
        if (svgElement) {
            modalSvg = svgElement.cloneNode(true);
        } else if (originalSvgHtml) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(originalSvgHtml, 'image/svg+xml');
            modalSvg = doc.querySelector('svg');
        }

        if (!modalSvg) {
            console.error("Failed to parse SVG for lightbox");
            return;
        }

        // Clean up pan-zoom artifacts on the cloned SVG
        modalSvg.removeAttribute('style');
        modalSvg.removeAttribute('data-zoom-initialized');
        modalSvg.style.width = '100%';
        modalSvg.style.height = '100%';
        modalSvg.style.display = 'block';

        const existingViewport = modalSvg.querySelector('.svg-pan-zoom_viewport');
        if (existingViewport) {
            existingViewport.removeAttribute('transform');
            existingViewport.removeAttribute('style');
            existingViewport.classList.remove('svg-pan-zoom_viewport');
        }

        body.appendChild(modalSvg);

        if (typeof renderMathInElement !== 'undefined') {
            try {
                renderMathInElement(body, {
                    delimiters: [
                        { left: "$$", right: "$$", display: true },
                        { left: "$", right: "$", display: false },
                        { left: "\\(", right: "\\)", display: false },
                        { left: "\\[", right: "\\]", display: true }
                    ],
                    throwOnError: false
                });
            } catch (e) {}
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        const initModalPanZoom = () => {
            if (activeModalPanZoom) {
                try { activeModalPanZoom.destroy(); } catch (e) {}
                activeModalPanZoom = null;
            }

            activeModalPanZoom = svgPanZoom(modalSvg, {
                zoomEnabled: true,
                controlIconsEnabled: false,
                fit: true,
                center: true,
                minZoom: 0.05,
                maxZoom: 40,
                zoomScaleSensitivity: 0.22,
                mouseWheelZoomEnabled: true,
                preventMouseEventsDefault: true,
                dblClickZoomEnabled: false
            });

            activeModalPanZoom.resize();
            activeModalPanZoom.fit();
            activeModalPanZoom.center();
        };

        requestAnimationFrame(() => {
            initModalPanZoom();
            setTimeout(() => {
                if (activeModalPanZoom && modal.classList.contains('active')) {
                    activeModalPanZoom.resize();
                    activeModalPanZoom.fit();
                    activeModalPanZoom.center();
                }
            }, 260);
        });

        modalSvg.addEventListener('dblclick', () => {
            if (activeModalPanZoom) {
                activeModalPanZoom.reset();
                activeModalPanZoom.fit();
                activeModalPanZoom.center();
            }
        });
    }

    function closeMermaidLightbox() {
        if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
        if (activeModalPanZoom) {
            try { activeModalPanZoom.destroy(); } catch (e) {}
            activeModalPanZoom = null;
        }
        const body = lightboxModal.querySelector('#mermaid-lightbox-body');
        if (body) body.innerHTML = '';
    }

    function setupZoomableContainer(container) {
        if (!container) return;
        const svg = container.querySelector('svg');
        if (!svg || svg.hasAttribute('data-zoom-initialized')) return;
        svg.setAttribute('data-zoom-initialized', 'true');

        if (!container._originalSvgXml) {
            container._originalSvgXml = svg.outerHTML;
        }

        // Set responsive height
        let vbHeight = 0;
        if (svg.viewBox && svg.viewBox.baseVal && svg.viewBox.baseVal.height > 0) {
            vbHeight = svg.viewBox.baseVal.height;
        } else if (svg.getAttribute('viewBox')) {
            const parts = svg.getAttribute('viewBox').split(/\s+|,/);
            if (parts.length === 4) {
                vbHeight = parseFloat(parts[3]) || 0;
            }
        }

        if (vbHeight > 900) {
            container.style.height = '72vh';
            container.classList.add('zoomable-mermaid-large');
        } else if (vbHeight > 550) {
            container.style.height = '68vh';
            container.classList.add('zoomable-mermaid-large');
        } else if (vbHeight > 350) {
            container.style.height = `${Math.min(vbHeight + 40, 620)}px`;
        } else {
            container.style.height = '460px';
        }

        // Clean up svg style
        svg.removeAttribute('style');
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.display = 'block';

        // Floating custom toolbar
        if (!container.querySelector('.mermaid-zoom-toolbar')) {
            const toolbar = document.createElement('div');
            toolbar.className = 'mermaid-zoom-toolbar';
            toolbar.innerHTML = `
                <button type="button" class="mermaid-zoom-btn" data-action="zoom-in" title="Zoom In (+)" aria-label="Zoom In">
                    <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2.5" fill="none"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    <span class="mermaid-btn-text">Zoom In</span>
                </button>
                <button type="button" class="mermaid-zoom-btn" data-action="zoom-out" title="Zoom Out (-)" aria-label="Zoom Out">
                    <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2.5" fill="none"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    <span class="mermaid-btn-text">Zoom Out</span>
                </button>
                <button type="button" class="mermaid-zoom-btn" data-action="reset" title="Reset View" aria-label="Reset View">
                    <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                    <span class="mermaid-btn-text">Reset</span>
                </button>
                <button type="button" class="mermaid-zoom-btn mermaid-fullscreen-btn" data-action="fullscreen" title="Expand diagram viewer" aria-label="Expand diagram viewer">
                    <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                    <span class="mermaid-btn-text">Expand</span>
                </button>
            `;
            container.appendChild(toolbar);
        }

        // Hint bar
        if (!container.querySelector('.mermaid-zoom-hint')) {
            const hint = document.createElement('div');
            hint.className = 'mermaid-zoom-hint';
            hint.innerHTML = `<span>🖱️ Drag to pan &bull; Scroll to zoom &bull; Expand for readable labels</span>`;
            container.appendChild(hint);
        }

        // Initialize svg-pan-zoom
        if (typeof svgPanZoom !== 'undefined') {
            let panZoomInstance = null;
            try {
                panZoomInstance = svgPanZoom(svg, {
                    zoomEnabled: true,
                    controlIconsEnabled: false,
                    fit: true,
                    center: true,
                    minZoom: 0.05,
                    maxZoom: 35,
                    zoomScaleSensitivity: 0.22,
                    mouseWheelZoomEnabled: true,
                    preventMouseEventsDefault: true,
                    dblClickZoomEnabled: false
                });
            } catch (err) {
                console.warn("svgPanZoom init warning:", err);
            }

            if (panZoomInstance) {
                svg.addEventListener('dblclick', () => {
                    panZoomInstance.reset();
                    panZoomInstance.fit();
                    panZoomInstance.center();
                });

                const toolbar = container.querySelector('.mermaid-zoom-toolbar');
                if (toolbar) {
                    toolbar.querySelector('[data-action="zoom-in"]')?.addEventListener('click', (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        panZoomInstance.zoomIn();
                    });
                    toolbar.querySelector('[data-action="zoom-out"]')?.addEventListener('click', (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        panZoomInstance.zoomOut();
                    });
                    toolbar.querySelector('[data-action="reset"]')?.addEventListener('click', (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        panZoomInstance.reset();
                        panZoomInstance.fit();
                        panZoomInstance.center();
                    });
                    toolbar.querySelector('[data-action="fullscreen"]')?.addEventListener('click', (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        openMermaidLightbox(svg, container._originalSvgXml);
                    });
                }

                window.addEventListener('resize', () => {
                    panZoomInstance.resize();
                    panZoomInstance.fit();
                    panZoomInstance.center();
                });
            }
        }
    }

    async function renderAndInitMermaid() {
        if (isProcessingMermaid) return;
        if (typeof mermaid === 'undefined') return;
        isProcessingMermaid = true;

        try {
            mermaid.initialize({
                startOnLoad: false,
                theme: 'base',
                securityLevel: 'loose'
            });

            // Find all unrendered mermaid blocks
            const blocks = Array.from(document.querySelectorAll('pre.mermaid:not([data-processed="true"]), .mermaid:not([data-processed="true"])'));

            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                if (block.hasAttribute('data-processed') || block.closest('.zoomable-mermaid')) continue;
                block.setAttribute('data-processed', 'true');
                if (block.querySelector('code')) {
                    block.querySelector('code').setAttribute('data-processed', 'true');
                }

                const rawCode = (block.querySelector('code')?.textContent || block.textContent || '').trim();
                if (!rawCode) continue;

                const renderId = 'mermaid-svg-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now();

                try {
                    const { svg, bindFunctions } = await mermaid.render(renderId, rawCode);

                    const wrapper = document.createElement('div');
                    wrapper.className = 'zoomable-mermaid';
                    wrapper._originalSvgXml = svg;
                    wrapper.innerHTML = svg;

                    if (block.parentNode) {
                        block.parentNode.insertBefore(wrapper, block);
                        block.remove();
                    }

                    if (typeof bindFunctions === 'function') {
                        try { bindFunctions(wrapper); } catch (e) {}
                    }

                    if (typeof renderMathInElement !== 'undefined') {
                        try {
                            renderMathInElement(wrapper, {
                                delimiters: [
                                    { left: "$$", right: "$$", display: true },
                                    { left: "$", right: "$", display: false },
                                    { left: "\\(", right: "\\)", display: false },
                                    { left: "\\[", right: "\\]", display: true }
                                ],
                                throwOnError: false
                            });
                        } catch (e) {}
                    }

                    setupZoomableContainer(wrapper);
                } catch (err) {
                    console.warn("Mermaid render error for block:", err);
                }
            }

            // Also check for standalone SVGs if any
            const standaloneSvgs = Array.from(document.querySelectorAll('.mermaid svg, svg[id^="mermaid-"]'));
            standaloneSvgs.forEach(svg => {
                if (svg.hasAttribute('data-zoom-initialized') || svg.closest('#mermaid-lightbox-modal') || svg.closest('.zoomable-mermaid')) return;
                let wrapper = document.createElement('div');
                wrapper.className = 'zoomable-mermaid';
                wrapper._originalSvgXml = svg.outerHTML;
                if (svg.parentNode) {
                    svg.parentNode.insertBefore(wrapper, svg);
                    wrapper.appendChild(svg);
                }
                setupZoomableContainer(wrapper);
            });
        } catch (e) {
            console.warn("Mermaid general error:", e);
        } finally {
            setTimeout(() => {
                isProcessingMermaid = false;
            }, 100);
        }
    }

    // Mermaid might render after a delay or dynamic changes
    const observer = new MutationObserver((mutations) => {
        if (isProcessingMermaid) return;
        let shouldRun = false;
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.matches?.('pre.mermaid:not([data-processed="true"]), pre.mermaid > code:not([data-processed="true"]), .mermaid:not([data-processed="true"])') ||
                        node.querySelector?.('pre.mermaid:not([data-processed="true"]), pre.mermaid > code:not([data-processed="true"]), .mermaid:not([data-processed="true"])')) {
                        shouldRun = true;
                        break;
                    }
                }
            }
            if (shouldRun) break;
        }
        if (shouldRun) {
            renderAndInitMermaid();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
    // Also try immediately and after staggered delays
    renderAndInitMermaid();
    setTimeout(renderAndInitMermaid, 200);
    setTimeout(renderAndInitMermaid, 600);
    setTimeout(renderAndInitMermaid, 1500);
}

// Support both instant navigation (document$) and standard page loads
if (typeof document$ !== 'undefined') {
    document$.subscribe(function() {
        initExtraFeatures();
    });
} else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExtraFeatures);
} else {
    initExtraFeatures();
}