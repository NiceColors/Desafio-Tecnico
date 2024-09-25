
export interface ISupplierContact {
    id: number;
    name: string;
    phone: string;
}

export interface ISupplierAddress {
    cep: string;
    city: string;
    state: string;
    street: string;
    number: string;
    reference?: string;
}

export interface ISupplier {
    id: string;
    name: string;
    description: string;
    contacts: ISupplierContact[];
    address: ISupplierAddress;
}
