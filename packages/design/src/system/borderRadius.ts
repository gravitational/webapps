import { compose, style } from 'styled-system';

export const borderTopLeftRadius = style({
  prop: 'borderTopLeftRadius',
  key: 'radii',
});

export const borderTopRightRadius = style({
  prop: 'borderTopRightRadius',
  key: 'radii',
});

export const borderRadiusBottomRight = style({
  prop: 'borderBottomRightRadius',
  key: 'radii',
});

export const borderBottomLeftRadius = style({
  prop: 'borderBottomLeftRadius',
  key: 'radii',
});

export const borderRadiusAll = style({
  prop: 'borderRadius',
  key: 'radii',
});

export const borderRadius = compose(
  borderRadiusAll,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderRadiusBottomRight,
  borderBottomLeftRadius
);
