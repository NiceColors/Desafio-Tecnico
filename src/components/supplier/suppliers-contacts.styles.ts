import styled from "styled-components";

export const ContactsContainer = styled.div`
    padding: 1rem;
`;

export const ContactTitle = styled.h1`
    font-size: x-large;
    margin-bottom: 1rem;
    color:  ${({ theme }) => theme.colors.primary};

    > span {
        color: ${({ theme }) => theme.colors.blueMedium};
    }

`;

export const ContactsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: .75rem;
`;

export const ContactCard = styled.div`
    padding: 12px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.2s ease-in-out;

    &:hover {
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
    }
`;

export const ContactName = styled.p`
    font-weight: bold;
    margin: 0;
    font-size: medium;
    color: #007bff;
`;

export const ContactPhone = styled.p`
    font-size: small;
    margin: 4px 0 0 0;
    color: #555;
`;
