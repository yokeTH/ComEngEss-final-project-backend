export const parseIntPlus = (data) => {
  let result;
  if (typeof data === 'string') {
    result = parseInt(data);
  } else {
    result = data;
  }
  return result;
};
