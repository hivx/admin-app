import { useTheme } from '@mui/material';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ItechSelectTemplateIcon = (props: SvgIconProps) => {
  const theme = useTheme();
  return (
    <SvgIcon color="inherit" viewBox="0 0 15 15" {...props}>
      <path d="M13.5093 12.1747V12.7779C13.5093 13.3018 13.0063 13.7303 12.3913 13.7303H2.60871C1.99377 13.7303 1.49073 13.3018 1.49073 12.7779V2.22236C1.49073 1.69852 1.99377 1.27 2.60871 1.27H12.3913C13.0063 1.27 13.5093 1.69852 13.5093 2.22236V12.3424H14.1779C14.1779 12.3424 14.8509 10.8412 15 10.7619V2.22222C15 1.00002 13.8261 0 12.3913 0H2.60869C1.17393 0 0 1.00002 0 2.22222V12.7778C0 14 1.17393 15 2.60869 15H13.0808C14.5156 15 15 14 15 12.7778V10.7619L13.9565 11.8096C13.8262 11.9366 13.677 12.0637 13.5093 12.1747Z" />
      <path
        d="M4.21924 10.9151H10.3377"
        strokeWidth="1.5"
        stroke={theme.palette.primary.main}
        strokeLinecap="round"
      />
      <path
        d="M4.21924 7.55658H10.3377"
        strokeWidth="1.5"
        stroke={theme.palette.primary.main}
        strokeLinecap="round"
      />
      <path
        d="M4.21924 4.1981H10.3377"
        strokeWidth="1.5"
        stroke={theme.palette.primary.main}
        strokeLinecap="round"
      />
    </SvgIcon>
  );
};

ItechSelectTemplateIcon.displayName = 'ItechSelectTemplateIcon';

export default ItechSelectTemplateIcon;
