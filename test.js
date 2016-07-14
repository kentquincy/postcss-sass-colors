import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

function run(t, input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
      .then( result => {
          t.same(result.css, output);
          t.same(result.warnings().length, 0);
      });
}

// Write tests here
test('darken()', t => {
    return run(t, 'a{ color: color( darken( #666666, 10 ) ) }',
               'a{ color: #5C5C5C }', { });
});

test('lighten()', t => {
    return run(t, 'a{ color: color( lighten( #666666, 10 ) ) }',
               'a{ color: #707070 }', { });
});

test('rgba()', t => {
    return run(t, 'a{ color: color( rgb( #666666, 10 ) ) }',
               'a{ color: rgba(102, 102, 102, 0.9) }', { });
});

test('rgb()', t => {
    return run(t, 'a{ color: color( rgb( #666666 ) ) }',
               'a{ color: rgb(102, 102, 102) }', { });
});

test('multiple', t => {
    return run(t, 'a{ border-color: color( darken( #666666, 10 ) )' +
               ' color( lighten( #569e3d, 20 ) ) }',
               'a{ border-color: #5C5C5C #6ABA4F }', { });
});

test('multiple', t => {
    return run(t, 'a{ border: 1px solid color( lighten( #569e3d, 20 ) ) }',
               'a{ border: 1px solid #6ABA4F }', { });
});
