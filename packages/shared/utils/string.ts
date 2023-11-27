export const slugify = (text: string): string => text?.toLocaleLowerCase().replaceAll(' ', '-')
export const unslugify = (slug: string): string => slug?.charAt(0).toUpperCase() + slug?.slice(1).replaceAll('-', ' ')
