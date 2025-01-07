import React, { SVGProps } from 'react';
import * as icons from './icons';

export type IconProps = SVGProps<SVGSVGElement> & {
  name: keyof typeof icons;
};

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const DynamicComponent = icons[name];
  if (!DynamicComponent) {
    console.warn(`Icon '${name}' not found.`);
    return null;
  }
  return <DynamicComponent {...props} />;
};

export default Icon;