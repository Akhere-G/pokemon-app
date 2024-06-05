## Pokemon App

An app that shows the first 150 pokemon. Built by Akhere Ihoeghinlan.

## MoSoCoWo list:

### Must:

1. Displays list of Pokemon that displays name and image
2. have separate page for each pokemon that displays:
   1. name, image, color background, flavour text accordions, evolves from genera (nickname), habitat, tags (is legendary, is mythical, is baby), base_happiness, capture_rate
3. Search based on name
4. Scroll based pagination

### Should:

1. Search page based on the available pages
2. Sound
3. Abilities

### Could:

1. Display Shiny
2. Evolves into

### Would:

1. Moves information (too much information)

## Approach:

# Nextjs
Nextjs was chosen as it provides fast serverside rendering, a built in easy to use router and iamge optimization

# Tailwind CSS
Tailwind provides easy to use, responsive styling 

# React-Query
React Query allows for caching queries, which makes the application more performant by reducing calls to APIs

#Axios
Axios provides easier error handling then fetch and auto rejects requests when the status code is not in the 200s

#ZOD
Zod provides a fast and scalable way to describe schemas an provides type safety
