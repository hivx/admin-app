import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const UserGroupIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon color="inherit" viewBox="0 0 15 13" {...props}>
      <path d="M7.5 8.4375C9.8291 8.4375 11.7188 6.54785 11.7188 4.21875C11.7188 1.88965 9.8291 0 7.5 0C5.1709 0 3.28125 1.88965 3.28125 4.21875C3.28125 6.54785 5.1709 8.4375 7.5 8.4375ZM11.25 9.375H9.63574C8.98535 9.67383 8.26172 9.84375 7.5 9.84375C6.73828 9.84375 6.01758 9.67383 5.36426 9.375H3.75C1.67871 9.375 0 11.0537 0 13.125V13.5938C0 14.3701 0.629883 15 1.40625 15H13.5938C14.3701 15 15 14.3701 15 13.5938V13.125C15 11.0537 13.3213 9.375 11.25 9.375Z" />
    </SvgIcon>
  );
};

UserGroupIcon.displayName = 'UserGroupIcon';

export default UserGroupIcon;
