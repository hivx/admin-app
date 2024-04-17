import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ItechEditFolderIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon color="inherit" {...props}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M21.75 4H12.75L9.75 0H2.25C1.00734 0 0 1.34312 0 3V21C0 22.6569 1.00734 24 2.25 24H21.75C22.9927 24 24 22.6569 24 21V7C24 5.34312 22.9927 4 21.75 4ZM17.25 14.5C17.25 15.0525 16.9144 15.5 16.5 15.5H7.5C7.08562 15.5 6.75 15.0525 6.75 14.5V13.5C6.75 12.9475 7.08562 12.5 7.5 12.5H16.5C16.9144 12.5 17.25 12.9475 17.25 13.5V14.5Z"
      />
    </SvgIcon>
  );
};

ItechEditFolderIcon.displayName = 'ItechEditFolder';

export default ItechEditFolderIcon;
