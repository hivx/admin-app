import { useEffect, useState } from 'react';

import { useLazyGetListSoundQuery } from '../api/sound';
import { ISoundDTO } from '../types';

type UsePlaySpeakerQueueOptions = {
  speakerId: number;
};

export const usePlaySpeakerQueue = (options: UsePlaySpeakerQueueOptions) => {
  const [trigger] = useLazyGetListSoundQuery();

  const [listSoundData, setListSoundData] = useState<ISoundDTO[]>([]);

  const [currentSoundID, setCurrentSoundID] = useState<ISoundDTO['id'] | undefined>();

  // Không có soundData thì cứ 1s gọi API get sound 1 lần
  // khi có soundData thì sẽ phát hết list âm thanh,
  // sau khi phát hết list thì tiêp tục cứ 1s gọi API get sound 1 lần

  useEffect(() => {
    if (listSoundData.length <= 0) {
      const getSoundInterval = setInterval(() => {
        trigger({
          filter: { speakerId: options.speakerId },
          pagination: { page: 1, perPage: 5 },
        })
          .unwrap()
          .then((soundData) => {
            if (soundData && soundData.list.length > 0) {
              setListSoundData(soundData.list);
              setCurrentSoundID(soundData.list[0].id);
              clearInterval(getSoundInterval);
            }
          });
      }, 1000);
      return () => {
        clearInterval(getSoundInterval);
      };
    }
  }, [listSoundData.length, options.speakerId, trigger]);

  const currentSound = listSoundData.find((sound) => sound.id === currentSoundID);

  /**
   *
   * khi 1 sound kết thúc
   * nếu sound đó ở cuối list sound sẽ set list sound và selectedSound bằng 'undefined',sau đó quay API sound lại tự động gọi sau 1s
   * nếu sound không ở cuối list,sẽ set selectedSound là vị trí tiếp theo trong list
   */
  const onPlayerEnded = (id: ISoundDTO['id']) => {
    const isLastID = listSoundData && listSoundData[listSoundData.length - 1].id === id;
    if (isLastID) {
      setListSoundData([]);
    } else {
      // khi chưa phát hết âm thanh trong bảng,cần phát âm thanh tiếp theo
      setCurrentSoundID((preCurrentSoundId) =>
        preCurrentSoundId ? preCurrentSoundId + 1 : preCurrentSoundId,
      );
    }
  };

  return { onPlayerEnded, currentSound, listSoundData };
};
