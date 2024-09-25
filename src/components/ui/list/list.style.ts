import styled from "styled-components";
import { spaces } from "../table/table.variables";


export const ListContainer = styled.div`
  width: 100%;
  padding: ${spaces.sm};
`;

export const ListHeader = styled.header`
    padding: 20px 0px;
`;

export const ListHeaderTitle = styled.h1`
    font-size: xx-large;
    font-weight: bold;
    color:  ${({ theme }) => theme.colors.primary};
`;

export const ListHeaderDescription = styled.p`
    font-size: medium;
    color: ${({ theme }) => theme.colors.textLight};
`;