import { Outlet } from 'react-router-dom';
import {
  FooterContainer,
  LayoutContainer,
  MainContent,
  NavbarBrand,
  NavbarContainer,
} from './layout.styles';

const Layout = () => {
  return (
    <LayoutContainer>
      <NavbarContainer>
        <NavbarBrand to="/app/suppliers">
          <img src="/logo-white.png" alt="" />
        </NavbarBrand>
      </NavbarContainer>
      <MainContent>
        <Outlet />
      </MainContent>
      <FooterContainer>
        <p> 2024 - Desafio VExpenses. Feito por Victor Batista</p>
      </FooterContainer>
    </LayoutContainer>
  );
};

export default Layout;