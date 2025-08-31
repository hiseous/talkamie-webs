import * as icons from 'react-bootstrap-icons';

export type iconName = keyof typeof icons;
interface IconProps extends icons.IconProps {
  // Cannot use "name" as it is a valid SVG attribute
  // "iconName", "filename", "icon" will do it instead
  iconName: iconName;
}

const Icon = ({ iconName, ...props }: IconProps) => {
  const BootstrapIcon = icons[iconName];
  if(!props.fill){
    props.fill = undefined;
  }
  return <BootstrapIcon {...props} />;
}

export default Icon;
