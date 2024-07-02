export const formatDate = (date: Date): string => {
  return date.toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};

export const getCurrentDate = (): Date => {
  return new Date();
};
