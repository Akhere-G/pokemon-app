export const getFrontImage = (id: string) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export const capitalise = (str: string) =>
  str.charAt(0).toUpperCase() + str.substring(1);

const pokemonColorToType = {
  normal: "#9EA19F",
  fighting: "#FF8001",
  flying: "#80B9EF",
  poison: "#9141CB",
  ground: "#905122",
  rock: "#AFA980",
  bug: "#91A119",
  ghost: "#70416F",
  steel: "#60A0B7",
  fire: "#E52829",
  water: "#2880EE",
  grass: "#3FA12A",
  electric: "#FABF00",
  psychic: "#EE4178",
  ice: "#3CCEF3",
  dragon: "#555D9A",
  dark: "#624D4D",
  fairy: "#EF70EE",
};

export const typeToColor = (typeName: string) =>
  typeName in pokemonColorToType
    ? pokemonColorToType[typeName as keyof typeof pokemonColorToType]
    : pokemonColorToType.normal;
