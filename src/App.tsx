import { APIProvider } from '@vis.gl/react-google-maps'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ThemeProvider } from 'styled-components'
import Layout from './layout/layout'
import SuppliersListPage from './pages/suppliers/suppliers-list.page'
import { GlobalStyles } from './styles/globalStyle'
import { theme } from './theme/theme'
function App() {

  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

  return (
    <>
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Toaster richColors position='top-right' />
          <Routes>
            <Route element={<Layout />}>
              <Route path="*" element={<SuppliersListPage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </APIProvider>
    </>
  )
}

export default App
