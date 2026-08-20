const renderKaTeX = (el) => {
  const target = (el && el.nodeType) ? el : document.body;
  if (typeof renderMathInElement !== 'undefined' && target) {
    renderMathInElement(target, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true }
      ],
      throwOnError: false
    });
  }
};

if (typeof document$ !== 'undefined') {
  document$.subscribe(({ body }) => {
    renderKaTeX(body);
  });
} else if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => renderKaTeX());
} else {
  renderKaTeX();
}