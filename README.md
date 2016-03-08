# PostCSS Sass Colors [![Build Status][ci-img]][ci]

[PostCSS] Sass like color functions.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/kentquincy/postcss-sass-colors.svg
[ci]:      https://travis-ci.org/kentquincy/postcss-sass-colors

Modify color lightness
```css
.dark {
  color: color( darken( #0189b7, 10% ) );
}

.light {
  color: color( lighten( #0189b7,  ) )
}
```

```css
.dark {
  color: #016384;
}

.light {
  color: #01b2ee;
}
```

Convert hexadecimal values to __rgb()__

```css
.rgb {
  color: color( rgb( #0189b7 ) );
}
```

```css
.rgb {
  color: rgb(1, 137, 183);
}
```
Or to __rgba()__
```css
.rgb {
  color: color( rgb( #0189b7, 10 ) );
}
```

```css
.rgb {
  color: rgba(1, 137, 183, 0.90);
}
```

## Usage

```js
postcss([ require('postcss-sass-colors') ])
```

See [PostCSS] docs for examples for your environment.
