import styled from 'styled-components';
import { device } from '../../styles/breakpoints';



export const FormContainer = styled.form`

  display: grid;
  gap: 10px;

  margin: 0 auto;
  padding: 0px 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  max-width: 1200px;
  width: 100%;
  @media (max-width: 768px) {
    padding: 15px;
  }


`;


export const SectionTitleContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 10px;
`

export const SectionTitle = styled.article`
    font-size: 1.225rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.blueDark};
`


export const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: block;
`;

export const FormGroup = styled.div<{
  columns?: number;
  gap?: number;
}>`
    display: grid;
    grid-template-columns: repeat(${({ columns }) => columns ?? 1}, 1fr);
    gap: ${({ gap }) => gap ?? 20}px;
    margin-bottom: 1.5rem;

    @media (${device.md}) {
        grid-template-columns: repeat(${({ columns }) => columns ? columns - 1 : 1}, 1fr);
    }

    @media (${device.sm}) {
        grid-template-columns: 1fr;
    }
    
    :has(${ErrorMessage}) {
      > input {
        border: 1px solid ${({ theme }) => theme.colors.red};
      }
    }


 `

export const FormItem = styled.div<{ width?: string }>`
  > input {
    width: ${({ width }) => width ?? '100%'};
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: normal;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.blueDark};
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.greyLight};
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.35s ease-in-out;
    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.blueMedium};
        background-color: ${({ theme }) => theme.colors.white};
    }


`;



export const RemoveContactButton = styled.button`
    background-color:  ${({ theme }) => theme.colors.red};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    color:  ${({ theme }) => theme.colors.white};
    padding: .75rem 1rem;
    width: 130px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease-in-out;
    &:hover {
     filter: brightness(0.9);
    }
    `;


export const ActionContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const AddContactButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    color:  ${({ theme }) => theme.colors.primary};
    border: 2px dashed ${({ theme }) => theme.colors.greyLight};
    padding: .75rem 1rem;
    width: auto;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: border 0.3s ease-in-out;
    &:hover {
        border: 2px dashed ${({ theme }) => theme.colors.blueMedium};
    }
    margin-bottom: 10px;
`;



export const ContactList = styled.div`
`;

export const ContactItem = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.greyLight};
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.blueDark};
`;

export const FormSection = styled.div`
`

export const Required = styled.span`
    color: ${({ theme }) => theme.colors.red};
    font-weight: bold;
    &::before {
        content: '*';
    }
`