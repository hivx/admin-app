import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ItechNotReadyIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon color="inherit" {...props} fill="none">
      <circle
        cx="12"
        cy="12"
        r="10.5"
        stroke="#8e8e9c"
        strokeWidth="3"
        fill="transparent"
      />
    </SvgIcon>
  );
};

ItechNotReadyIcon.displayName = 'ItechNotReadyIcon';

export default ItechNotReadyIcon;
