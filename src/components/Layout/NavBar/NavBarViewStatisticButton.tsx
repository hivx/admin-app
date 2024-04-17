import { Link } from 'react-router-dom';

import ItechViewStatisticIcon from '@/assets/icon/ViewStatisticIcon';
import { ROUTE_STATISTIC_TAB } from '@/features/statistic';
import { useTranslate } from '@/hooks';
import { useUserPermission } from '@/providers/AuthProvider';

import { StyledIconButtonWithToolTip } from './NavBar';

const NavBarViewStatisticButton = () => {
  const translate = useTranslate();
  const userPermissions = useUserPermission();

  return userPermissions?.userCanViewStatistic ? (
    <Link to={ROUTE_STATISTIC_TAB} target="_itech_statistic">
      <StyledIconButtonWithToolTip
        title={translate.buttons.viewStatistic()}
        color="primary"
      >
        <ItechViewStatisticIcon />
      </StyledIconButtonWithToolTip>
    </Link>
  ) : (
    <></>
  );
};

export default NavBarViewStatisticButton;
