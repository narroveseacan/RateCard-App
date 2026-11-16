/* @ds-bundle: {"format":4,"namespace":"Perbekasian","components":[{"name":"Button"},{"name":"Chip"},{"name":"Card"},{"name":"Input"}]} */
(function () {
  var h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }
  function omit(p, keys) { var o = {}; for (var k in p) if (keys.indexOf(k) < 0) o[k] = p[k]; return o; }
  function Button(p) {
    var rest = omit(p, ['variant', 'size', 'className']);
    return h('button', Object.assign({ type: 'button' }, rest, { className: cx('pb-btn', 'pb-btn--' + (p.variant || 'primary'), 'pb-btn--' + (p.size || 'md'), p.className) }), p.children);
  }
  function Chip(p) {
    return h('div', { className: 'pb-chip' },
      p.n !== undefined ? h('span', { className: 'pb-chip__n' }, p.n) : null,
      h('span', null, h('span', { className: 'pb-chip__t' }, p.title), p.sub ? h('span', { className: 'pb-chip__s' }, p.sub) : null));
  }
  function Card(p) {
    return h('section', { className: 'pb-card' },
      p.eyebrow ? h('p', { className: 'pb-card__e' }, p.eyebrow) : null,
      p.title ? h('h3', { className: 'pb-card__h' }, p.title) : null,
      h('div', { className: 'pb-card__b' }, p.children));
  }
  function Input(p) {
    var uid = React.useId(), id = p.id || uid;
    var rest = omit(p, ['label', 'hint', 'error', 'id']);
    var desc = p.error ? id + '-err' : p.hint ? id + '-hint' : undefined;
    return h('div', { className: 'pb-field' },
      h('label', { htmlFor: id }, p.label),
      h('input', Object.assign({ id: id, className: 'pb-input', 'aria-invalid': p.error ? true : undefined, 'aria-describedby': desc }, rest)),
      p.error ? h('p', { id: id + '-err', className: 'pb-err' }, p.error) : p.hint ? h('p', { id: id + '-hint', className: 'pb-hint' }, p.hint) : null);
  }
  window.Perbekasian = { Button: Button, Chip: Chip, Card: Card, Input: Input };
})();
