import styled from 'styled-components';

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const PaginationInfo = styled.div`
    margin: 0 10px;
`;

export const PageNumbersContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

export const PageNumberButton = styled.button<{ $active: boolean }>`

    color: ${({ $active, theme }) => ($active ? theme.colors.primary : '#000')};
    border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.blueMedium : 'transparent')};
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        border: ${({ $active, theme }) => ($active && `1px solid ${theme.colors.blueDark}`)};
        background-color: ${({ $active, theme }) => ($active ? 'none' : theme.colors.greyLight)};
        color: ${({ theme }) => theme.colors.primary};
    }


    &:disabled {
        cursor: not-allowed;
        background-color:  ${({ theme }) => theme.colors.greyLight};
        color: ${({ theme }) => theme.colors.textLight};
    }
`;


export const PaginationButton = styled.button`
    color: ${({ theme }) => theme.colors.textLight};
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 4px;
    padding: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border: 1px solid  transparent;
    background-color: none;

    &:hover {
        background-color:  ${({ theme }) => theme.colors.greyLight};
    }

    &:disabled {
        cursor: not-allowed;
        color:  ${({ theme }) => theme.colors.textLight};

        svg{
            stroke: ${({ theme }) => theme.colors.grey};
        }

    }
`;

