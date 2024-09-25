import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ThemeProvider } from 'styled-components'
import Layout from './layout/layout'
import SuppliersListPage from './pages/suppliers/suppliers-list.page'
import { GlobalStyles } from './styles/globalStyle'
import { theme } from './theme/theme'
function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Toaster richColors position='top-right' />
        <Routes>
          <Route element={<Layout />}>
            <Route path="*" element={<SuppliersListPage />} />
          </Route>
        </Routes>
      </ThemeProvider>

    </>
  )
}

export default App
