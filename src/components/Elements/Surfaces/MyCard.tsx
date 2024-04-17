import { Card, CardProps, styled } from '@mui/material';

type IMyCardProps = CardProps;

const StyledCard = styled(Card)``;

export const MyCardDefaults: IMyCardProps = {
  sx: { maxWidth: 275 },
};

export const MyCard = (props: IMyCardProps) => {
  return (
    <StyledCard {...MyCardDefaults} {...props}>
      {props.children}
    </StyledCard>
  );
};
