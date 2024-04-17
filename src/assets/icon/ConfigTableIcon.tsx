import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ItechConfigTableIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon color="inherit" {...props}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M15.75 15.1765C14.1 15.1765 12.6 16.4118 12.15 18.3529H0V20.8235H12.15C12.6 22.5882 14.1 24 15.75 24C17.4 24 18.9 22.7647 19.35 20.8235H24V18.1765H19.35C18.9 16.4118 17.4 15.1765 15.75 15.1765ZM11.85 3.17647C11.4 1.41177 9.9 0 8.25 0C6.6 0 5.1 1.41177 4.65 3.17647H0V5.82353H4.65C5.1 7.58824 6.6 9 8.25 9C9.9 9 11.4 7.76471 11.85 5.82353H24V3.17647H11.85Z"
      />
    </SvgIcon>
  );
};
ItechConfigTableIcon.displayName = 'ItechConfigTable';

export default ItechConfigTableIcon;
