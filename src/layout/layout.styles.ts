import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const NavbarContainer = styled.nav`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position:  sticky;
  top: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }

`;

export const NavbarBrand = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
`;



export const MainContent = styled.main`
  flex: 1;
  padding: 1rem;
`;

export const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  text-align: center;
`;

