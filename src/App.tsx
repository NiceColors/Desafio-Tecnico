import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Layout from './layout/layout'
import ProvidersCreatePage from './pages/providers/providers-create.page'
import { ProvidersListPage } from './pages/providers/providers-list.page'
import { GlobalStyles } from './styles/globalStyle'
import { theme } from './theme/theme'
function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/app/providers" element={<ProvidersListPage />} />
            <Route path="/app/providers/create" element={<ProvidersCreatePage />} />

          </Route>
        </Routes>
      </ThemeProvider>

    </>
  )
}

export default App
