export const getResizedImageUrl = (imageUrl, width = 100, height = 80) => {
  if (!imageUrl) return;
  return `${imageUrl}?width=${width}&height=${height}`;
};
