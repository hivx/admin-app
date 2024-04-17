import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const CircleIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon color="inherit" {...props}>
      <path d="M10.0022 0C4.48796 0 0.00177002 4.48611 0.00177002 10.0002C0.00177002 15.5142 4.48796 20 10.0021 20C15.5156 20 20.0018 15.5139 20.0018 10.0002C20.0018 4.48611 15.5156 0 10.0022 0Z" />
    </SvgIcon>
  );
};

CircleIcon.displayName = 'CircleIcon';

export default CircleIcon;
