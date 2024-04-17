import { useGenericNotifySnackbar } from '@/providers/NotificationProvider';
import { IGetManyResourcesQuery } from '@/types';

import { useGetListQmsModalityQuery } from '../api/qmsModality';
import { useCreateSoundMutation } from '../api/sound';
import { useLazyGetListTicketQuery } from '../api/ticket';
import { ISearchTicketFilter } from '../types';

type useCallSpeakerButtonProps = {
  query: IGetManyResourcesQuery<ISearchTicketFilter>;
};

export const useCallSpeakerButton = (props: useCallSpeakerButtonProps) => {
  const { query } = props;

  const [trigger] = useLazyGetListTicketQuery();
  const [createSound] = useCreateSoundMutation();

  const modalityID = query?.filter?.modalityID;

  const { data: modalityData } = useGetListQmsModalityQuery({ filter: {} });

  const currentModality = modalityData?.list.find(
    (modality) => modality.id === modalityID,
  );

  const notifySuccess = useGenericNotifySnackbar('success', 'Gọi loa');
  const notifyError = useGenericNotifySnackbar('error', 'Gọi loa');
  /**
   * Khi click button gọi loa hoặc nút SPACE
   * nếu đã có phòng chụp (modalityID)
   * Gọi api get list ticket theo phòng chụp,
   * gọi api tạo sound với record đầu tiên sau khi get list ticket
   */

  const callSpeaker = async () => {
    if (query && currentModality) {
      const data = await trigger(query).unwrap();
      const firstTicketID = data.list[0].id;

      try {
        const res = await createSound({ ticketId: firstTicketID });
        if ('error' in res) {
          notifyError();
        } else {
          notifySuccess();
        }
      } catch (e) {
        notifyError();
      }
    }
  };

  return { currentModality, callSpeaker, isDisableButton: !currentModality?.speakerID };
};
