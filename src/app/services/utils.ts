export const getFrontImage = (id: string) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export const capitalise = (str: string) =>
  str.charAt(0).toUpperCase() + str.substring(1);
