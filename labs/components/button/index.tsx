import React, { forwardRef, ForwardedRef } from 'react';
import classNames from 'classnames';

import { useDynamicStyle } from '@labs/utils';

import styles from './button.module.scss';

type ButtonElements = 'button' | 'a';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  casing?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  align?: 'left' | 'center' | 'right' | 'justify';
  decoration?: 'underline' | 'line-through' | 'none';
  lineHeight?: string;
  as?: ButtonElements;
  color?: string;
  inheritFont?: boolean;
  fontSize?: string;
  animate?: 'fade' | 'slide' | 'none';
}

const ButtonBase = forwardRef(
  (
    {
      as: Element = 'button',
      casing,
      color,
      inheritFont,
      fontSize,
      lineHeight,
      align,
      decoration,
      children,
      animate = 'none',
      ...rest
    }: ButtonProps,
    ref
  ) => {
    const dynamicClass = useDynamicStyle({
      fontSize,
      textTransform: casing,
      textAlign: align,
      color,
      lineHeight,
      textDecoration: decoration,
    });

    const _class = classNames([
      styles.Button,
      inheritFont && styles.adapt,
      animate && styles[`animate--${animate}`],
      rest.className,
      dynamicClass,
    ]);

    return (
      <Element ref={ref} className={_class} {...rest}>
        {children}
      </Element>
    );
  }
);

export const Button = Object.assign(ButtonBase, {
  button: (props: ButtonProps) => <ButtonBase as="button" {...props} />,
  a: (props: ButtonProps) => <ButtonBase as="a" {...props} />,
});
