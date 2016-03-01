# PostCSS Sass Colors [![Build Status][ci-img]][ci]

[PostCSS] plugin Sass like color functions.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/kentquincy/postcss-sass-colors.svg
[ci]:      https://travis-ci.org/kentquincy/postcss-sass-colors

```css
.foo {
  color: color( darken( #ffffff , 100% ) );
}
```

```css
.foo {
  color: #000000;
}
```

## Usage

```js
postcss([ require('postcss-sass-colors') ])
```

See [PostCSS] docs for examples for your environment.
