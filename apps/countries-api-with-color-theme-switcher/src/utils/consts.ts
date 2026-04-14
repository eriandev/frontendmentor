export const languaguePriority = ['eng', 'fra', 'spa'] as const
export const bordersFields = ['name', 'cca3', 'borders', 'tld'] as const
export const detailFields = [
  'name',
  'nativeName',
  'capital',
  'cca3',
  'currencies',
  'flags',
  'languages',
  'population',
  'region',
  'subregion',
] as const
export const themes = {
  dark: {
    icon: 'moon',
    label: 'Dark Mode',
  },
  light: {
    icon: 'sun',
    label: 'Light Mode',
  },
} as const
