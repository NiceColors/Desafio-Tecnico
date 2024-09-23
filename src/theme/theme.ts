import { DefaultTheme } from 'styled-components'
import { colors } from './colors'

export const theme: DefaultTheme = {
    colors: {
        primary: colors.blueDark,
        backgroundLight: colors.greyLighter,
        backgroundDark: colors.blueDark,
        text: colors.white,
        textLight: colors.grey,
        heading: colors.white,
        highlightText: colors.blueDark,
        buttonBackground: colors.blueMedium,
        buttonText: colors.white,
        lightBackground: colors.greyLight,
        ...colors
    },

    shadows: {
        activeButton: '3px 2px 22px 1px rgba(0, 0, 0, 0.24)',
    },
    fonts: {
        primary: 'Roboto, sans-serif',
    },
    paddings: {
        container: '15px',
        pageTop: '30px',
    },
    margins: {
        pageTop: '30px',
    },
    fontWeights: {
        normal: 400,
        bold: 700,
    },
    headingFontWeights: {
        xxxl: 400,
        xxl: 400,
        xl: 400,
        l: 400,
        m: 700,
        s: 700,
        xs: 700,
    },
    borders: {
        none: 'none',
        thin: '1px solid',
    },
}