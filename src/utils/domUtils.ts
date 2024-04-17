export const getElementWidthById = (id: string): `${string}px` | undefined => {
  const element = document.getElementById(id);
  if (element) return `${element.clientWidth}px`;
};
