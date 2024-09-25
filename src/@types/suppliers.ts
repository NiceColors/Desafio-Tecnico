
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
}

export interface ISupplier {
    id: string;
    name: string;
    description: string;
    contato: ISupplierContact[];
    address: ISupplierAddress;
}
