// Check if input modalityType is one of type:
// Siêu âm, nội soi, điện tim, do loãng xương
// US, ES, ED, ECG, SC, BMD, BDUS
export const filterModalCreateNonDicom = (modalityType: string) => {
  const filterArr = ['US', 'ES', 'ED', 'ECG', 'SC', 'BMD', 'BDUS'];
  return filterArr.some((type) => type === modalityType);
};
