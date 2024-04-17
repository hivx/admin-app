import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ItechFolderIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon color="inherit" {...props}>
      <path d="M21.75 4H12.75L9.75 0H2.25C1.00734 0 0 1.34312 0 3V21C0 22.6569 1.00734 24 2.25 24H21.75C22.9927 24 24 22.6569 24 21V7C24 5.34312 22.9927 4 21.75 4Z" />
    </SvgIcon>
  );
};

ItechFolderIcon.displayName = 'ItechFolder';

export default ItechFolderIcon;
