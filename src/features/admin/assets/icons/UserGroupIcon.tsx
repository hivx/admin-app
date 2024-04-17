import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
{
  /* <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
</svg> */
}

const UserGroupIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon color="inherit" viewBox="0 0 15 13" {...props}>
      <path d="M4.5 7.5C5.95078 7.5 7.125 6.32578 7.125 4.875C7.125 3.42422 5.95078 2.25 4.5 2.25C3.04922 2.25 1.875 3.42422 1.875 4.875C1.875 6.32578 3.04922 7.5 4.5 7.5ZM6.3 8.25H6.10547C5.61797 8.48438 5.07656 8.625 4.5 8.625C3.92344 8.625 3.38438 8.48438 2.89453 8.25H2.7C1.20937 8.25 0 9.45938 0 10.95V11.625C0 12.2461 0.503906 12.75 1.125 12.75H7.875C8.49609 12.75 9 12.2461 9 11.625V10.95C9 9.45938 7.79062 8.25 6.3 8.25ZM11.25 7.5C12.4922 7.5 13.5 6.49219 13.5 5.25C13.5 4.00781 12.4922 3 11.25 3C10.0078 3 9 4.00781 9 5.25C9 6.49219 10.0078 7.5 11.25 7.5ZM12.375 8.25H12.2859C11.9602 8.3625 11.6156 8.4375 11.25 8.4375C10.8844 8.4375 10.5398 8.3625 10.2141 8.25H10.125C9.64688 8.25 9.20625 8.38828 8.81953 8.61094C9.39141 9.22734 9.75 10.0453 9.75 10.95V11.85C9.75 11.9016 9.73828 11.9508 9.73594 12H13.875C14.4961 12 15 11.4961 15 10.875C15 9.42422 13.8258 8.25 12.375 8.25Z" />
    </SvgIcon>
  );
};

UserGroupIcon.displayName = 'UserGroupIcon';

export default UserGroupIcon;
