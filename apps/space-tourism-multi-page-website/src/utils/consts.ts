export const basePath = '/frontendmentor/space-tourism-multi-page-website'
export const headerNavData = [
  { to: basePath, key: 'home', label: 'Home' },
  { to: `${basePath}/destination/moon`, key: 'destination', label: 'Destination' },
  { to: `${basePath}/crew/commander`, key: 'crew', label: 'Crew' },
  { to: `${basePath}/technology/vehicle`, key: 'technology', label: 'Technology' },
]
export const destinationNavData = [
  { to: `${basePath}/destination/moon`, key: 'moon', label: 'Moon' },
  { to: `${basePath}/destination/mars`, key: 'mars', label: 'Mars' },
  { to: `${basePath}/destination/europa`, key: 'europa', label: 'Europa' },
  { to: `${basePath}/destination/titan`, key: 'titan', label: 'Titan' },
]
export const crewSteps = [
  { to: `${basePath}/crew/commander`, key: 'commander' },
  { to: `${basePath}/crew/specialist`, key: 'specialist' },
  { to: `${basePath}/crew/pilot`, key: 'pilot' },
  { to: `${basePath}/crew/engineer`, key: 'engineer' },
]
export const technologySteps = [
  { to: `${basePath}/technology/vehicle`, key: 'vehicle' },
  { to: `${basePath}/technology/spaceport`, key: 'spaceport' },
  { to: `${basePath}/technology/capsule`, key: 'capsule' },
]
