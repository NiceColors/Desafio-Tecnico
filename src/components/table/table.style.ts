import styled from 'styled-components';
import { spaces } from './table.variables';


export const TableContainer = styled.div`
  width: 100%;
  padding: ${spaces.sm};
`;

export const TableContent = styled.div`
  overflow-x: auto;
  border-radius: ${spaces.sm};
  border: 1px solid ${({ theme }) => theme.colors.greyLight};
  margin-top: ${spaces.md};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const STable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  border-radius: ${spaces.sm};
  table-layout: auto;

  @media (max-width: ${spaces.container.md}) {
    thead>th:first-child,tr>td:first-child {
    position: sticky;
    left: -2px;
    z-index: 100;
    background-color: ${({ theme }) => theme.colors.white};
    }
  }
  

`;

export const SThead = styled.thead`
  position: sticky;
  z-index: 100;
  border-left: 2px solid ${({ theme }) => theme.colors.greyLight};
`;

export const STh = styled.th`
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  padding: ${spaces.md} ${spaces.md};
  color: ${({ theme }) => theme.colors.textLight};
  text-transform: capitalize;
  font-weight: 600;
  border: 1px solid ${({ theme }) => theme.colors.backgroundLight};
  white-space: nowrap;
`;

export const STd = styled.td<{ align?: 'center' | 'left' | 'right'; width?: string | number }>`
  padding: ${spaces.md} ${spaces.md};
  border: 1px solid ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.textLight};
  text-align: ${({ align = 'center' }) => align};
  width: ${({ width = 'auto' }) => (typeof width === 'number' ? `${width}px` : width)};

  @media (max-width: ${spaces.container.md}) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
  }

`;

export const STr = styled.tr`
  background: ${({ theme }) => theme.colors.white};
  &:hover {
    background-color: #f1f1f1;
  }


`;

export const STBody = styled.tbody`
  border-left: 2px solid ${({ theme }) => theme.colors.greenLight};
  border-collapse: separate;

`;

export const TableSearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${spaces.sm};
  border-radius: ${spaces.sm};
  gap: 5px;
  border: 1px solid ${({ theme }) => theme.colors.greyLight};
  max-width: 400px;
  width: 100%;
  &:focus-within {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.blueMedium};
  }

  @media (max-width: ${spaces.container.md}) {
    max-width: 100%;
  }



`;

export const SearchInput = styled.input`
  width: 100%;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  &:focus {
    outline: none;
  }
`;

export const CreateButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blueMedium};
  color: ${({ theme }) => theme.colors.white};
  font-size: small;
  border-radius: ${spaces.sm}; 
  padding:  ${spaces.sm} ${spaces.md};
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.blueDark};
  }

  @media (max-width: ${spaces.container.md}) {
    padding: ${spaces.sm};
    font-size: 14px;
  }

`;


export const STButtonAction = styled.button`
  color: ${({ theme }) => theme.colors.white};
  padding: 5px 10px;
  border-radius: 5px;
  border:  1px solid transparent;
  cursor: pointer;
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 500;
  transition: border 0.3s ease-in-out;
  &:hover {
    border:  1px solid ${({ theme }) => theme.colors.grey};
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${spaces.md};
`;

export const PaginationButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blueMedium};
  font-size: small;
  border-radius: ${spaces.sm};
  color: ${({ theme }) => theme.colors.white};
  padding: ${spaces.sm}  ${spaces.md};
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.blueDark};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.greyLight};
    cursor: not-allowed;
  }
`;

export const PaginationInfo = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 14px;
`;