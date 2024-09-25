import { ISupplier } from "../../@types/suppliers";
import { ContactCard, ContactName, ContactPhone, ContactsContainer, ContactsWrapper, ContactTitle } from "./suppliers-contacts.styles";



interface SupplierContactsProps {
    data: ISupplier | null;
}

export const SupplierContacts: React.FC<SupplierContactsProps> = ({ data }) => {
    return (
        <ContactsContainer>
            <ContactTitle>Contatos do Fornecedor: <span>{data?.name}</span></ContactTitle>
            <ContactsWrapper>
                {data?.contacts.map((contact) => (
                    <ContactCard
                        key={contact.id}
                        onClick={() => window.open(`https://wa.me/${contact.phoneNumber.replace(/\D/g, '')}`, '_blank')}
                    >
                        <ContactName>{contact.name}</ContactName>
                        <ContactPhone>{contact.phoneNumber}</ContactPhone>
                    </ContactCard>
                ))}
            </ContactsWrapper>
        </ContactsContainer>
    );
}
