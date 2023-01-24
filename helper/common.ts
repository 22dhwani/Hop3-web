export const createArray = (numberOfArray: number) => {
  const array = [];
  for (let i = 1; i <= numberOfArray; i++) {
    array.push(i);
  }
  return array;
};

export const findHashtags = (searchText: string) => {
  const regexp = /\B#\w\w+\b/g;
  const result = searchText.match(regexp);
  if (result) {
    return result.join(',');
  }
  return '';
};
