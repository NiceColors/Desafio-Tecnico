import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import SupplierForm from "../../components/form/supplier-form.component";
import Modal from "../../components/modal/modal.component";
import { IColumns, Table, TableSearchInput, TButtonAction } from "../../components/table/table.component";
import { CreateButton, ListContainer } from "../../components/table/table.style";
import { Content, Space } from "../../styles/globalStyle";



interface ISupplierContact {
    id: number;
    name: string;
    phone: string;
}

interface ISupplierAddress {
    cep: string;
    city: string;
    state: string;
    street: string;
    number: string;
}

interface ISupplier {
    id: number;
    name: string;
    description: string;
    contato: ISupplierContact[];
    address: ISupplierAddress;

}

export const SuppliersListPage = () => {

    const columns: IColumns[] = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Contatos',
            dataIndex: 'contato',
            key: 'contato',
            align: 'center',
        },
        {
            title: 'CEP',
            dataIndex: 'cep',
            key: 'cep',
            align: 'center',
            dataRender: ({ address }: ISupplier) => <span>{address.cep}</span>
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            align: 'center',
            dataRender: ({ address }: ISupplier) => <span>{address.state}</span>
        },
        {
            title: 'Cidade',
            dataIndex: 'cidade',
            key: 'cidade',
            align: 'center',
            dataRender: ({ address }: ISupplier) => <span>{address.city}</span>
        },

        {
            title: 'Logradouro',
            dataIndex: 'logradouro',
            key: 'logradouro',
            align: 'center',
            dataRender: ({ address }: ISupplier) => <span>{address.street}</span>
        },
        {
            title: 'Número',
            dataIndex: 'number',
            key: 'number',
            align: 'center',
            dataRender: ({ address }: ISupplier) => <span>{address.number}</span>
        },


        {
            title: 'Ações',
            dataIndex: 'actions',
            key: 'actions',
            align: 'right',
            dataRender: () => (
                <Space>
                    <TButtonAction type="view"></TButtonAction>
                    <TButtonAction type="edit"></TButtonAction>
                    <TButtonAction type="delete"></TButtonAction>
                </Space>
            ),
        },
    ]

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [providers, setProviders] = useState<ISupplier[]>([])

    const getProviders = async () => {
        const response = await fetch('http://localhost:3000/suppliers')
        const data = await response.json()
        setProviders(data)
    }

    useEffect(() => {
        getProviders()
    }, [])


    return (
        <Content>

            <ListContainer>
                <Space justifyContent="space-between" alignItems="center" margin={'16px 0px'}>
                    <TableSearchInput placeholder="Pesquisar..." />

                    <CreateButton
                        type="button"
                        onClick={openModal}
                    >
                        <Space>
                            <CirclePlus size={18} />
                            <span>Criar</span>
                        </Space>
                    </CreateButton>

                </Space>
                <Table
                    dataSource={providers}
                    columns={columns}
                />

            </ListContainer>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                hasCloseBtn={true}
                closeOnOutsideClick={true}
            >
                <SupplierForm />
            </Modal>
        </Content>
    );
}

