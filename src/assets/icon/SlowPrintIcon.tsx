import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ItechSlowPrintIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon color="inherit" {...props}>
      <rect x="3.8147e-06" y="6" width="24" height="10.8" rx="1" />
      <path
        d="M4.57143 11.8C4.57143 11.2477 5.01915 10.8 5.57143 10.8H18.4286C18.9809 10.8 19.4286 11.2477 19.4286 11.8V16.8H4.57143V11.8Z"
        fill="white"
      />
      <ellipse cx="2.85715" cy="9" rx="0.571429" ry="0.6" fill="white" />
      <path d="M5.71429 12H18.2857V23.5C18.2857 23.7761 18.0619 24 17.7857 24H6.21429C5.93814 24 5.71429 23.7761 5.71429 23.5V12Z" />
      <line
        x1="7.35715"
        y1="19.9"
        x2="16.6429"
        y2="19.9"
        stroke="white"
        strokeLinecap="round"
      />
      <line x1="8.5" y1="16.3" x2="15.5" y2="16.3" stroke="white" strokeLinecap="round" />
      <path d="M5.71429 0.5C5.71429 0.223857 5.93814 0 6.21429 0H17.7857C18.0619 0 18.2857 0.223858 18.2857 0.5V4.8H5.71429V0.5Z" />
    </SvgIcon>
  );
};

ItechSlowPrintIcon.displayName = 'ItechSlowPrintIcon';

export default ItechSlowPrintIcon;
