import { Building2, MapPin, Phone, User } from 'lucide-react'
import { ISupplier } from '../../@types/suppliers'
import { AddressGrid, AddressItem, AddressLabel, AddressValue, Card, CardContent, CardHeader, CardTitle, ContactItem, ContactList, ContactName, ContactPhone, Description, ScrollArea, Section, SectionTitle, Separator } from './supplier-view.styles'

const SupplierView: React.FC<{ supplier: ISupplier }> = ({ supplier }) => {
    return (
        <ScrollArea>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <Building2 size={24} />
                        {supplier.name}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Section>
                        <SectionTitle>Descrição</SectionTitle>
                        <Description>{supplier.description}</Description>
                    </Section>

                    <Separator />

                    <Section>
                        <SectionTitle>
                            <User size={20} />
                            Contatos
                        </SectionTitle>
                        <ContactList>
                            {supplier.contacts.map((contact, index) => (
                                <ContactItem key={index}>
                                    <Phone size={16} color="#666" />
                                    <ContactName>{contact.name}:</ContactName>
                                    <ContactPhone
                                        onClick={() => window.open(`https://wa.me/${contact.phone.replace(/\D/g, '')}`, '_blank')}
                                    >{contact.phone}</ContactPhone>
                                </ContactItem>
                            ))}
                        </ContactList>
                    </Section>

                    <Separator />

                    <Section>
                        <SectionTitle>
                            <MapPin size={20} />
                            Endereço
                        </SectionTitle>
                        <AddressGrid>
                            <AddressItem>
                                <AddressLabel>CEP:</AddressLabel>
                                <AddressValue>{supplier.address.cep}</AddressValue>
                            </AddressItem>
                            <AddressItem>
                                <AddressLabel>Estado:</AddressLabel>
                                <AddressValue>{supplier.address.state}</AddressValue>
                            </AddressItem>
                            <AddressItem>
                                <AddressLabel>Cidade:</AddressLabel>
                                <AddressValue>{supplier.address.city}</AddressValue>
                            </AddressItem>
                            <AddressItem>
                                <AddressLabel>Logradouro:</AddressLabel>
                                <AddressValue>{supplier.address.street}</AddressValue>
                            </AddressItem>
                            <AddressItem>
                                <AddressLabel>Número:</AddressLabel>
                                <AddressValue>{supplier.address.number}</AddressValue>
                            </AddressItem>
                            {supplier.address.reference && (
                                <AddressItem>
                                    <AddressLabel>Referência:</AddressLabel>
                                    <AddressValue>{supplier.address.reference}</AddressValue>
                                </AddressItem>
                            )}
                        </AddressGrid>
                    </Section>
                </CardContent>
            </Card>
        </ScrollArea>
    )
}

export default SupplierView