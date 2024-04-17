import { styled } from '@mui/material';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ItechVideoConferenceIcon = (props: SvgIconProps) => {
  return (
    <StyledSvgIcon viewBox="0 0 20 20" color="inherit" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 3C13 4.65685 11.6569 6 10 6C8.34315 6 7 4.65685 7 3C7 1.34315 8.34315 0 10 0C11.6569 0 13 1.34315 13 3ZM5 6C5 7.10457 4.10457 8 3 8C1.89543 8 1 7.10457 1 6C1 4.89543 1.89543 4 3 4C4.10457 4 5 4.89543 5 6ZM17 8C18.1046 8 19 7.10457 19 6C19 4.89543 18.1046 4 17 4C15.8954 4 15 4.89543 15 6C15 7.10457 15.8954 8 17 8ZM15 20H5.04762C4.62857 9.36595 7.28572 6.90435 8.66667 7.0028H11C15 6.88464 15.3333 15.6184 15 20ZM0 15.126C0.266667 9.57264 2.90476 9.2674 4.19048 9.80895C3.88571 11.1087 3.74603 13.8952 3.71429 15.126V20H0V15.126ZM15.762 9.95679C17.0001 9.31677 19.581 9.54324 20.0001 15.5692V19.8523H16.2382V15.5692C16.2699 14.3877 16.2191 11.611 15.762 9.95679Z"
      />
    </StyledSvgIcon>
  );
};

ItechVideoConferenceIcon.displayName = 'ItechVideoConferenceIcon';

const StyledSvgIcon = styled(SvgIcon)`
  width: 18px;
  height: 18px;
`;

export default ItechVideoConferenceIcon;
