import print from 'print-js';

/**
 * Execute print command from input pdf blob
 */
export const printPDF = (pdfBlob: Blob) => {
  const url = URL.createObjectURL(pdfBlob);
  print(url, 'pdf');
};
