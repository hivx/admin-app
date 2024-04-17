import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ResendIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon color="inherit" {...props}>
      <path d="M10.5 0C4.71 0 0 6.28 0 14C0 8.48 3.36 4 7.5 4C11.64 4 15 8.48 15 14V16H12L18 24L24 16H21V14C21 6.28 16.29 0 10.5 0Z" />
    </SvgIcon>
  );
};

ResendIcon.displayName = 'ResendIcon';

export default ResendIcon;
