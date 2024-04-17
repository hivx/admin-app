import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ItechApproveIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon color="inherit" {...props} fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM10.8812 16.8623L8.16791 15.0962L5.45461 13.3302L6.54564 11.654L9.25893 13.42L10.6927 14.3533L17.1629 4.45316L18.837 5.5473L11.2925 17.0913L10.8994 16.8344L10.8812 16.8623Z"
      />
    </SvgIcon>
  );
};

ItechApproveIcon.displayName = 'ItechApproveIcon';

export default ItechApproveIcon;
