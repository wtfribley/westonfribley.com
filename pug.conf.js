const octicons = require('octicons');

/**
 * Provide templates with custom filters.
 *
 * See https://pugjs.org/language/filters.html#custom-filters
 */
exports.filters = {

  /**
   * Insert a GitHub "octicon" SVG icon.
   *
   * See https://github.com/primer/octicons
   *
   * @param  {String} label           Description of the icon for tool-tip and screen readers.
   * @param  {Object} options         Supports any octicon option, see docs for details.
   * @param  {String} options.icon    Name a valid octicon.
   * @param  {Number} [options.size]  In pixels, if provided sets both height & width.
   * @return {String}                 HTML string used to render the icon.
   */
  octicon: (label, options) => {
    options = options || {};
    if (!options.icon) {
      throw new Error('The octicon filter requires an "icon" option.');
    }

    // use 'size' as shorthand to define a square.
    if (options.size != null) {
      options.height = options.width = options.size;
      delete options.size;
    }

    let icon = octicons[options.icon];
    if (!icon) {
      throw new Error(`The desired octicon "${options.icon}" does not exist.`);
    }
    delete options.icon;

    options['aria-label'] = label;
    let svg = icon.toSVG(options);
    return `<figure title="${label}">${svg}<figcaption>${label}</figcaption></figure>`;
  }
};
