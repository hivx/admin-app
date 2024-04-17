import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ItechSaveBookmarkedIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon color="inherit" {...props}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M10.7125 0.834866L7.78319 7.04035L1.22918 8.03866C0.053853 8.21677 -0.417174 9.73064 0.435161 10.5977L5.17683 15.4252L4.05534 22.2447C3.85347 23.4774 5.09609 24.4007 6.13683 23.8242L12 20.6043L17.8632 23.8242C18.9039 24.396 20.1465 23.4774 19.9447 22.2447L18.8232 15.4252L23.5648 10.5977C24.4172 9.73064 23.9461 8.21677 22.7708 8.03866L16.2168 7.04035L13.2875 0.834866C12.7626 -0.271247 11.2419 -0.285308 10.7125 0.834866Z"
        fill="#ED6C02"
      />
    </SvgIcon>
  );
};

ItechSaveBookmarkedIcon.displayName = 'ItechSaveBookmarked';

export default ItechSaveBookmarkedIcon;
