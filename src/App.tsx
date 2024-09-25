import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ThemeProvider } from 'styled-components'
import Layout from './layout/layout'
import SupplierCreatePage from './pages/suppliers/suppliers-create.page'
import { SuppliersListPage } from './pages/suppliers/suppliers-list.page'
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
            <Route path="/app/suppliers" element={<SuppliersListPage />} />
            <Route path="/app/suppliers/create" element={<SupplierCreatePage />} />

          </Route>
        </Routes>
      </ThemeProvider>

    </>
  )
}

export default App
