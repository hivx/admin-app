import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const PenIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon color="inherit" viewBox="0 0 20 20" {...props}>
      <path d="M19.4507 2.89735L17.1027 0.549315C16.3703 -0.183105 15.1825 -0.183105 14.45 0.549315L12.2411 2.75829L17.2418 7.75906L19.4507 5.55008C20.1831 4.81766 20.1831 3.63016 19.4507 2.89735ZM9.81032 2.0954C9.20018 1.48525 8.21115 1.48525 7.60101 2.0954L2.96128 6.73562C2.71715 6.97976 2.71715 7.37547 2.96128 7.61922L3.84525 8.5032C4.08938 8.74734 4.48507 8.74734 4.72921 8.5032L8.70645 4.52587L9.59041 5.40946L3.67025 11.3294C1.61965 13.38 0.327799 16.0674 0.00706467 18.9496L0.00589283 18.9586C-0.0605117 19.5555 0.443772 20.0602 1.04063 19.9942C3.92654 19.6755 6.61779 18.3832 8.6709 16.3301L16.3578 8.64304L13.1247 5.40985L9.81032 2.0954Z" />
    </SvgIcon>
  );
};

PenIcon.displayName = 'PenIcon';

export default PenIcon;