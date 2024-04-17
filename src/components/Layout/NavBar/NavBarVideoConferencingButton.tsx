import React from 'react';

import { useLazyGetUrlJitsiQuery } from '@/api/jitsi';
import { ItechVideoConferenceIcon } from '@/assets/icon';
import { useTranslate } from '@/hooks';
import { useHospitalProvider } from '@/providers/HospitalConfigProvider';
import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';

import { StyledIconButtonWithToolTip } from './NavBar';

const NavBarVideoConferencingButton = () => {
  const translate = useTranslate();
  const [trigger] = useLazyGetUrlJitsiQuery();
  const { isEnabledConference } = useHospitalProvider();

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.notification.getConsultationUrl(),
  );

  const handleClick = async () => {
    const { data: url, isError } = await trigger(undefined);
    if (isError) {
      notifyError();
      return;
    }
    if (url) window.open(url, '_blank');
  };

  return isEnabledConference ? (
    <StyledIconButtonWithToolTip
      title={translate.buttons.videoConference()}
      color="primary"
      onClick={handleClick}
    >
      <ItechVideoConferenceIcon />
    </StyledIconButtonWithToolTip>
  ) : (
    <></>
  );
};

export default NavBarVideoConferencingButton;

// const StyledIconButtonWithToolTip = styled(IconButtonWithToolTip)`
//   svg {
//     color: ${(props) => props.theme.pacs?.customColors.iconDefaultColor};
//   }
//   &:hover {
//     svg {
//       color: ${(props) => props.theme.pacs?.customColors.textTableRowHoverColor};
//     }
//   }
// `;
