export const getThemeColor= () => typeof window !== 'undefined' &&  window?.matchMedia && window?.matchMedia('(prefers-color-scheme: dark)')?.matches ? '#FFF':'#000'
