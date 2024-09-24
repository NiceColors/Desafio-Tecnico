import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Providers from './pages/providers/providers.page'
import { GlobalStyles } from './styles/globalStyle'
import { theme } from './theme/theme'
function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Providers />} />
        </Routes>
      </ThemeProvider>

    </>
  )
}

export default App
