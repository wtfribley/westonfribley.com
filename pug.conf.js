let octicons = require('octicons');

exports.filters = {
  octicon: (label, options) => {
    let icon = octicons[options.icon] || {toSVG: () => {return '';}};
    options['aria-label'] = label;
    if (options.size != null) options.height = options.width = options.size;
    delete options.icon;
    delete options.size;
    return `<figure title="${label}">
    ${icon.toSVG(options)}
    <figcaption>${label}</figcaption>
    </figure>`;
  }
};