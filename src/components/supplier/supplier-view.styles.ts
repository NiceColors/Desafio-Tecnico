import styled from "styled-components"

export const ScrollArea = styled.div`
  overflow-y: auto;
  padding-right: 16px;
`

export const Card = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
`

export const CardHeader = styled.div`
  padding: 1.5rem
`

export const CardTitle = styled.h2`
  font-size: x-large;   
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.primary};
`

export const CardContent = styled.div`
  padding: 0 24px 24px;
`

export const Section = styled.div`
  margin-bottom: 24px;
`

export const SectionTitle = styled.h3`
  font-size: medium;
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.primary};
`

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.grey};
`

export const Separator = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 16px 0;
`

export const ContactList = styled.ul`
  list-style-type: none;
  padding: 0;
`

export const ContactItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.grey};
`

export const ContactName = styled.span`
  font-weight: 500;
`

export const ContactPhone = styled.span`
  color: ${({ theme }) => theme.colors.blueMedium};
  cursor: pointer;
`

export const AddressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`

export const AddressItem = styled.div``

export const AddressLabel = styled.p`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`

export const AddressValue = styled.p`
  color: ${({ theme }) => theme.colors.grey};
`

export const ShowMap = styled.button`
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.blueMedium};
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;

    &:hover {
        text-decoration: underline;
    }

`
