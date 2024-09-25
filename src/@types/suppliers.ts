
export interface ISupplierContact {
    id: number;
    name: string;
    phoneNumber: string;
}

export interface ISupplierAddress {
    cep: string;
    city: string;
    state: string;
    street: string;
    number: string;
}

export interface ISupplier {
    id: string;
    name: string;
    description: string;
    contacts: ISupplierContact[];
    address: ISupplierAddress;
}
