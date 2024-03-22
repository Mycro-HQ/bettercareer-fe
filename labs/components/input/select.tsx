import React from 'react';
import classNames from 'classnames';

import { forwardRefWrapper, useDynamicStyle } from '@labs/utils/index';

import styles from './input.module.scss';

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  align?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: string;
  casing?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  color?: string;
  inheritFont?: boolean;
  fontSize?: string;
  size?: number | undefined;
  animate?: 'fade' | 'slide' | 'none';
  label?: {
    text: string;
    align?: 'top' | 'bottom' | 'left' | 'right';
  };
  containerClassName?: string;
  data: { key: string; value: string }[];
}

const SelectBase = forwardRefWrapper<HTMLSelectElement, SelectProps>(
  'Select',
  {
    
  },
  (
    {
      casing,
      color,
      inheritFont,
      fontSize,
      lineHeight,
      align,
      children,
      animate = 'none',
      label,
      data,
      ...rest
    },
    ref
  ) => {
    const labelAlign = label?.align ? label.align : 'top';
    const dynamicClass = useDynamicStyle({
      fontSize,
      textTransform: casing,
      textAlign: align,
      color,
      lineHeight,
    });

    const _class = classNames([
      styles.Select,
      inheritFont && styles.adapt,
      animate && styles[`animate--${animate}`],
      rest.className,
      dynamicClass,
    ]);

    const _containerClass = classNames([
      labelAlign === 'top' && styles.top,
      labelAlign === 'bottom' && styles.bottom,
      labelAlign === 'right' && styles.right,
      labelAlign === 'left' && styles.left,
      styles.SelectContainer,
      rest.containerClassName,
    ]);

    return (
      <div className={_containerClass}>
        {label && label.align && <label>{label.text}</label>}
        <select ref={ref} className={_class} {...rest}>
          {data.map(({ key, value }) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export const Select = Object.assign(SelectBase, {
  select: ({ as, ...props }: SelectProps & { as?: never }) => (
    <SelectBase {...props} />
  ),
});
