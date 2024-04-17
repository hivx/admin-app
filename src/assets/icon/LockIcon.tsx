import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ItechLockIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon color="inherit" viewBox="0 0 20 20" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.66773 10C0.747577 10 0 10.5605 0 11.2508V18.7492C0 19.4393 0.747309 20 1.66773 20H18.3323C19.2524 20 20 19.4395 20 18.7492V11.2508C20 10.5607 19.2527 10 18.3323 10H17.7765V5.83393C17.7765 2.61983 14.2873 0 9.99783 0C5.71234 0 2.22324 2.61963 2.22324 5.83393C2.22324 6.29034 2.30769 10 2.30769 10H5.55453C5.55453 10 5.55453 6.29016 5.55453 5.83393C5.55453 3.99728 7.55277 2.50158 9.99769 2.50158C12.4466 2.50158 14.4445 4.00025 14.4445 5.83393V10H1.66773Z"
      />
    </SvgIcon>
  );
};

ItechLockIcon.displayName = 'ItechLock';

export default ItechLockIcon;
