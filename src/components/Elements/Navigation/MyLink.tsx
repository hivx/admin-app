import { Link, LinkProps, styled } from '@mui/material';

type IMyLinkProps = LinkProps;

const StyledLink = styled(Link)``;

export const MyLinkDefaults: IMyLinkProps = {};

export const MyLink = (props: IMyLinkProps) => {
  return <StyledLink {...MyLinkDefaults} {...props} />;
};
