import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { ISupplier, ISupplierAddress } from "../../@types/suppliers";
import SupplierForm from "../../components/form/supplier-form.component";
import Modal from "../../components/modal/modal.component";
import { IColumns, Table, TableSearchInput, TButtonAction } from "../../components/table/table.component";
import { CreateButton, ListContainer } from "../../components/table/table.style";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useFetch } from "../../hooks/useFetch";
import { Content, Space } from "../../styles/globalStyle";


const renderAddressField = (field: keyof ISupplierAddress) => ({ address }: ISupplier) => <span>{address[field]}</span>;

const SuppliersListPage = () => {

    const columns: IColumns[] = [
        { title: 'Nome', dataIndex: 'name', key: 'name' },
        { title: 'Descrição', dataIndex: 'description', key: 'description' },
        { title: 'Contatos', dataIndex: 'contato', key: 'contato', align: 'center' },
        { title: 'CEP', dataIndex: 'cep', key: 'cep', align: 'center', dataRender: renderAddressField('cep') },
        { title: 'Estado', dataIndex: 'estado', key: 'estado', align: 'center', dataRender: renderAddressField('state') },
        { title: 'Cidade', dataIndex: 'cidade', key: 'cidade', align: 'center', dataRender: renderAddressField('city') },
        { title: 'Logradouro', dataIndex: 'logradouro', key: 'logradouro', align: 'center', dataRender: renderAddressField('street') },
        { title: 'Número', dataIndex: 'number', key: 'number', align: 'center', dataRender: renderAddressField('number') },
        {
            title: 'Ações',
            dataIndex: 'actions',
            key: 'actions',
            align: 'right',
            dataRender: () => (
                <Space>
                    <TButtonAction type="view" />
                    <TButtonAction type="edit" />
                    <TButtonAction type="delete" />
                </Space>
            ),
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

    const { data: providers, loading } = useFetch<ISupplier>(debouncedSearchTerm);



    return (
        <Content>
            <ListContainer>
                <Space justifyContent="space-between" alignItems="center" margin="16px 0">
                    <TableSearchInput
                        placeholder="Pesquisar..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                    <CreateButton type="button" onClick={() => setIsModalOpen(true)}>
                        <Space>
                            <CirclePlus size={18} />
                            <span>Criar</span>
                        </Space>
                    </CreateButton>
                </Space>
                <Table dataSource={providers} columns={columns} loading={loading} />
            </ListContainer>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                hasCloseBtn={true}
                closeOnOutsideClick={true}
            >
                <SupplierForm />
            </Modal>
        </Content>
    );
};

export default SuppliersListPage;
