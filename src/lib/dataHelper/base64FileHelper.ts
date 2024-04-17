const signatures: {
  [key: string]: string;
} = {
  JVBERi0: 'application/pdf',
  R0lGODdh: 'image/gif',
  R0lGODlh: 'image/gif',
  iVBORw0KGgo: 'image/png',
  '/9j/': 'image/jpg',
  PD94b: 'image/svg+xml',
  PHN2ZyB: 'image/svg+xml',
};

/**
 * detect mime type from Base64 string
 */

export const detectMimeTypeBase64 = (b64string: string) => {
  for (const s in signatures) {
    if (b64string.indexOf(s) === 0) {
      return signatures[s];
    }
  }
  return '';
};

/**
 * example : convert from 'data:image/png;base64,iVBORw0KGgoAAA' to 'iVBORw0KGgoAAA'
 */
export const base64Coded = (url: string) => url.slice(url.indexOf(',') + 1);

/**
 * example : convert from 'iVBORw0KGgoAAA' to 'data:image/png;base64,iVBORw0KGgoAAA'
 */
export const base64toURI = (b64string: string) => {
  const mimeType = detectMimeTypeBase64(b64string);
  return `data:${mimeType};base64,${b64string}`;
};

export const convertFileToBase64 = (file: File | Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (file instanceof Blob) {
      reader.readAsDataURL(file);
    }
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      }
    };
    reader.onerror = (error) => reject(error);
  });

export const base64ToBlob = (base64: string, type = 'application/octet-stream') => {
  const binStr = atob(base64);
  const len = binStr.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }
  return new Blob([arr], { type: type });
};
