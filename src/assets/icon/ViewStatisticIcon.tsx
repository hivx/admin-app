import { styled } from '@mui/material';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ItechViewStatisticIcon = (props: SvgIconProps) => {
  return (
    <StyledSvgIcon viewBox="0 0 20 20" color="inherit" {...props}>
      <path d="M19.375 16.6667H2.5V0.833333C2.5 0.372917 2.22031 0 1.875 0H0.625C0.279687 0 0 0.372917 0 0.833333V18.3333C0 19.2536 0.559766 20 1.25 20H19.375C19.7203 20 20 19.6271 20 19.1667V17.5C20 17.0396 19.7203 16.6667 19.375 16.6667ZM18.125 1.66667H13.5133C12.6781 1.66667 12.2598 3.01302 12.8504 3.80052L14.116 5.48802L11.25 9.3099L8.38398 5.48854C7.8957 4.8375 7.1043 4.8375 6.61641 5.48854L3.9332 9.06615C3.68906 9.39167 3.68906 9.91927 3.9332 10.2448L4.8168 11.4229C5.06094 11.7484 5.45664 11.7484 5.70078 11.4229L7.5 9.02344L10.366 12.8448C10.8543 13.4958 11.6457 13.4958 12.1336 12.8448L15.8836 7.84479L17.1492 9.53229C17.7398 10.3198 18.7496 9.76198 18.7496 8.64844V2.5C18.75 2.03958 18.4703 1.66667 18.125 1.66667Z" />
    </StyledSvgIcon>
  );
};

ItechViewStatisticIcon.displayName = 'ItechViewStatistic';

const StyledSvgIcon = styled(SvgIcon)`
  width: 18px;
  height: 18px;
`;

export default ItechViewStatisticIcon;
