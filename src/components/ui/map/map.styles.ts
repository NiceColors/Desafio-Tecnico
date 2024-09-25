import styled from "styled-components";

export const MapContainer = styled.div`
    width:100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.greyLight};
    border-radius: 8px;
`