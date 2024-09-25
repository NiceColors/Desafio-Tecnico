import styled, { createGlobalStyle } from 'styled-components';
import { device } from './breakpoints';

export const GlobalStyles = createGlobalStyle`
 
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 100%;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  font-family: ${({ theme }) => theme.fonts.primary}, sans-serif;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
}
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
figure,
blockquote,
dl,
dd {
  padding: 0;
  margin: 0;
}

p{
  font-size: 1rem;
  line-height: 1.5;
}

strong {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.blueDark};
}

button {
  border: none;
  background-color: transparent;
  font-family: inherit;
  padding: 0;
  cursor: pointer;
}
ul[role="list"],
ol[role="list"] {
  list-style: none;
}
li {
  list-style-type: none;
}
html:focus-within {
  scroll-behavior: smooth;
}
a:not([class]) {
  text-decoration-skip-ink: auto;
}

img,
picture {
  max-width: 100%;
  display: block;
}

input,
button,
textarea,
select {
  font: inherit;
}
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`

interface ContainerProps {
  backgroundColor?: string;
}



export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.blueMedium};
  color: ${({ theme }) => theme.colors.white};
  font-size: small;
  border-radius: .5rem;
  padding: .725rem 1rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 5px;
  word-break: keep-all;

  * {
    word-break: keep-all;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.blueDark};
    > {
      color: ${({ theme }) => theme.colors.greyLighter};
    }
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.greyLight};
    cursor: not-allowed;
  }



`;

export const Space = styled.div<{
  $justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  $alignItems?: 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';
  $margin?: string | number;
  $wrap?: boolean;
}>`
  display: flex;
  justify-content: ${({ $justifyContent = 'center' }) => $justifyContent};
  align-items: ${({ $alignItems = 'center' }) => $alignItems};
  gap: 5px;
  margin: ${({ $margin }) => $margin};
  flex-wrap:  ${({ $wrap }) => $wrap ? 'wrap' : 'nowrap'};
`;


export const Container = styled.div<ContainerProps>`
  width: 100%;
  padding: 0 ${({ theme }) => theme.paddings.container};
  padding-bottom: 50px;
  background-color: ${({ backgroundColor, theme }) => backgroundColor ?? theme.colors.backgroundDark};

  @media ${device.md} {
    padding: 0 .5rem;
  }




`


export const Content = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding-top: ${({ theme }) => theme.margins.pageTop};
`

export const SmallContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding-top: ${({ theme }) => theme.margins.pageTop};
`
