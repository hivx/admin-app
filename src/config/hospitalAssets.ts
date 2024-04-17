import bvbdLogo from '../assets/images/bvbd/logo-login-bvdkbd.svg';
import bvbdLogoWithName from '../assets/images/bvbd/logo-main-bvdkbd.svg';
import hhLogoWithTitle from '../assets/images/dkhh/logo-honghung-with-title.svg';
import dkhhLogo from '../assets/images/dkhh/logo_honghung.png';
import dkqtLogo from '../assets/images/dkqthp/dkqt-hp.svg';
import dkqtLogoWithName from '../assets/images/dkqthp/logo_big.svg';
import itechLogoWithName from '../assets/images/itech/itech_logo_with_title.png';
import itechLogo from '../assets/images/itech/logo-Itech.svg';
import ntkLogoWithName from '../assets/images/ntk/ntk-logo-main.svg';
import ntkLogo from '../assets/images/ntk/ntk-logo.svg';
import visnamLogo from '../assets/images/visnam/visnam.png';
import yhctLogoWithName from '../assets/images/yhctna/yhct-logo-with-title.svg';
import yhctLogo from '../assets/images/yhctna/yhct-logo.svg';

import { HOSPITAL_IDS } from './hospitalIDs';

type HospitalAsset = {
  name: {
    vi: string;
    en: string;
  };
  logo: {
    /**
     * Light and dark theme
     */
    light: string | null;
    dark: string | null;
  };
  logoWithName: {
    /**
     * Logo with the name next to it for light and dark theme
     */
    light: string | null;
    dark: string | null;
  };
  favicon: string | null;
};
/**
 * Định nghĩa các hình, logo riêng của bệnh viện
 * Key theo HOSPITAL_ID
 * https://wiki.ipacs.com.vn/en/trienkhai/hospital-list
 */
export const HOSPITAL_ASSETS = {
  /**
   *  Cloud ITECH
   */
  [HOSPITAL_IDS.ITECH]: {
    name: {
      vi: 'ITECH',
      en: 'ITECH',
    },
    logo: {
      light: itechLogo,
      dark: itechLogo,
    },
    logoWithName: {
      light: itechLogoWithName,
      dark: itechLogoWithName,
    },
    favicon: itechLogo,
  },
  /**
   * Bệnh viện Đa khoa Quốc tế Hải Phòng
   */
  [HOSPITAL_IDS.DKQT]: {
    name: {
      vi: 'Bệnh viện Đa khoa Quốc tế Hải Phòng',
      en: 'Hai Phong International Hospital',
    },
    logo: {
      light: dkqtLogo,
      dark: dkqtLogo,
    },
    logoWithName: {
      light: dkqtLogoWithName,
      dark: dkqtLogoWithName,
    },
    favicon: dkqtLogo,
  },
  /**
   * Bệnh viện Đa khoa Hồng Hưng
   */
  [HOSPITAL_IDS.DKHH]: {
    name: {
      vi: 'Bệnh viện Đa khoa Hồng Hưng',
      en: 'Hong Hung Hospital',
    },
    logo: {
      light: dkhhLogo,
      dark: dkhhLogo,
    },
    logoWithName: {
      light: hhLogoWithTitle,
      dark: hhLogoWithTitle,
    },
    favicon: dkhhLogo,
  },
  /**
   * phòng khám đa khoa Phước Đông
   */
  [HOSPITAL_IDS.PKPD]: {
    name: {
      vi: 'Phòng khám đa khoa Phước Đông',
      en: 'Phuoc Dong Clinic',
    },
    logo: {
      light: dkhhLogo,
      dark: dkhhLogo,
    },
    logoWithName: {
      light: hhLogoWithTitle,
      dark: hhLogoWithTitle,
    },
    favicon: dkhhLogo,
  },
  /**
   *  BV Chuyên khoa Ngoại Thần Kinh Quốc tế
   */
  [HOSPITAL_IDS.NTK]: {
    name: {
      vi: ' BV Chuyên khoa Ngoại Thần Kinh Quốc tế',
      en: 'International Neurosurgery Hospital',
    },
    logo: {
      light: ntkLogo,
      dark: ntkLogo,
    },
    logoWithName: {
      light: ntkLogoWithName,
      dark: ntkLogoWithName,
    },
    favicon: ntkLogo,
  },
  /**
   *  BV Bình định
   */ [HOSPITAL_IDS.BVDB]: {
    name: {
      vi: 'Bệnh viện Bình Định',
      en: 'Binh Dinh Hospital',
    },
    logo: {
      light: bvbdLogo,
      dark: bvbdLogo,
    },
    logoWithName: {
      light: bvbdLogoWithName,
      dark: bvbdLogoWithName,
    },
    favicon: bvbdLogo,
  },
  /**
   * YHCT Nghệ An
   */
  [HOSPITAL_IDS.YHCT]: {
    name: {
      vi: 'Bệnh viện y học cổ truyền Nghệ An',
      en: 'Nghe An tranditional medicine hospital',
    },
    logo: {
      light: yhctLogo,
      dark: yhctLogo,
    },
    logoWithName: {
      light: yhctLogoWithName,
      dark: yhctLogoWithName,
    },
    favicon: yhctLogo,
  },
  [HOSPITAL_IDS.VISNAM]: {
    name: {
      vi: 'VISNAM PACS',
      en: 'VISNAM PACS',
    },
    logo: {
      light: visnamLogo,
      dark: visnamLogo,
    },
    logoWithName: {
      light: visnamLogo,
      dark: visnamLogo,
    },
    favicon: visnamLogo,
  },
  [HOSPITAL_IDS.TTYB]: {
    name: {
      vi: 'Bệnh viện tâm thần Yên Bái',
      en: 'Yen Bai mental hospital',
    },
    logo: {
      light: itechLogo,
      dark: itechLogo,
    },
    logoWithName: {
      light: itechLogoWithName,
      dark: itechLogoWithName,
    },
    favicon: itechLogo,
  },
} satisfies Record<HOSPITAL_IDS, HospitalAsset>;
