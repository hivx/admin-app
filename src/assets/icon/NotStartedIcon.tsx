import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ItechNotStartedIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon color="inherit" {...props} fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM10 12.8991V6H12V11.8904L16.7368 15.3917L15.5479 17L10 12.8991Z"
      />
    </SvgIcon>
  );
};

ItechNotStartedIcon.displayName = 'ItechNotStartedIcon';

export default ItechNotStartedIcon;
