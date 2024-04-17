import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ItechPendingApproveIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon color="inherit" {...props} fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM11.6856 12.3807V5C7.96239 5.18332 5 8.26012 5 12.0288C5 15.908 8.13861 19.0541 12.0149 19.0662H12.06C13.5209 19.0617 14.8771 18.6119 16 17.8455L11.6856 12.3807Z"
      />
    </SvgIcon>
  );
};

ItechPendingApproveIcon.displayName = 'ItechPendingApproveIcon';

export default ItechPendingApproveIcon;
