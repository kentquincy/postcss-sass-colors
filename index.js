var postcss = require('postcss');

module.exports = postcss.plugin('sass-colors', function (opts) {
  opts = opts || {};

  return function ( css ) {
    css.walkDecls( function ( decl ) {

      // Regex for searching the color values.
      var regEx = /((^|)color)+\((.*?)+(\))/;
      var index = decl.value.search( regEx );

      if ( !decl.value || index === -1 ) {
        return;
      }

      // Calls the plugin logic and returns the new color
      decl.value = colorInit( decl.value );
    });
  };

  function colorInit( declValue ) {
    var color, percentage, colorArgs, colorValue, cssString;
    var balanced = require( 'balanced-match' );

    //
    cssString  = balanced( '(', ')', declValue );
    colorArgs  = balanced( '(', ')', cssString.body );
    colorValue = balanced( '(', ')', colorArgs.body );

    // If colorValue is undefined, the value is an rbg or similar color.
    if ( undefined !== colorValue ) {
      color      =  colorValue.pre + '( ' + colorValue.body + ' )';
      percentage = colorValue.post;

    } else {
      // The value is an hexadecimal sting or html color
      var hexColor = colorArgs.body.split( ',' );
      color        = hexColor[0].trim();
      percentage   = hexColor[1].trim();
    }

    // Cleans the variable
    if ( percentage ) {
      percentage = percentage.replace( ',', '' ).trim();
      percentage = percentage.replace( '%', '' ) / 100;

    } else {
      // Check if the percentage is undefine or empty and set it to 0
      percentage = '0';
    }

    return colorConvert( percentage, colorArgs.pre, color );
  }

  function colorConvert( percentage, option, colorValue ) {
    // Calls the Color.js library for the conversion
    var Color    = require( 'color' );
    var newColor = Color( colorValue.trim() );

    switch ( option.trim() ) {
      case 'darken':
        newValue = newColor.darken( percentage ).hexString();
        break;

      case 'lighten':
        newValue = newColor.lighten( percentage ).hexString();
        break;

      case 'rgb':
        newValue = newColor.clearer( percentage ).rgbString();
        break;

      default:
        return '';
    }

    return newValue;
  }
});
