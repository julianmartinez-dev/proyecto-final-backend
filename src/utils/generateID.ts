//Generate a numeric random ID
export const generateID = () => {
  const uuid: string = (Math.random() * 1046.3 - Math.random() * 35.3)
    .toString()
    .replace(".", "")
    .slice(0, 6);
  return Number(uuid);
};
