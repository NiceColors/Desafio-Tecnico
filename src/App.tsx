import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Home from './pages/home.page'
import { GlobalStyles } from './styles/globalStyle'
import { theme } from './theme/Theme'


function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </ThemeProvider>

    </>
  )
}

export default App
