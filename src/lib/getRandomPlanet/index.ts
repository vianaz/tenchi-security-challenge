export const getRandomPlanet = () => {
  const planets = [
    'planet_1.svg',
    'planet_2.svg',
    'planet_3.svg',
    'planet_4.svg',
    'planet_5.svg',
    'planet_6.svg'
  ]

  const randomIndex = Math.floor(Math.random() * planets.length)
  return planets[randomIndex]
}
