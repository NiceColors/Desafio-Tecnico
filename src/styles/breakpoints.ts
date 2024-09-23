interface Sizes {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    xxl: string
}

const sizes: Sizes = {
    xs: '400px', //  Celular pequeno
    sm: '600px', // Celular 
    md: '900px', // Tablett
    lg: '1280px', //  Notebook
    xl: '1440px', // Desktop
    xxl: '1920px', // Desktop / Telas maiores
}

export const device = {
    xs: `(max-width: ${sizes.xs})`,
    sm: `(max-width: ${sizes.sm})`,
    md: `(max-width: ${sizes.md})`,
    lg: `(max-width: ${sizes.lg})`,
    xl: `(max-width: ${sizes.xl})`,
    xxl: `(max-width: ${sizes.xxl})`,
}