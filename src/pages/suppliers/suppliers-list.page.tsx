import axios from "axios";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import styled from "styled-components";
import { ISupplier, ISupplierAddress } from "../../@types/suppliers";
import Modal from "../../components/modal/modal.component";
import { SupplierContacts } from "../../components/supplier/supplier-contacts.component";
import SupplierForm from "../../components/supplier/supplier-form.component";
import { IColumns, Table, TableSearchInput, TButtonAction } from "../../components/table/table.component";
import { ListContainer, TableListActionsSpace } from "../../components/table/table.style";
import Tooltip from "../../components/tooltip.component";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useFetch } from "../../hooks/useFetch";
import { device } from "../../styles/breakpoints";
import { Button, Content, Space } from "../../styles/globalStyle";
import { theme } from "../../theme/theme";

const DeleteSupplierContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px;
    max-width: 350px;
    margin: 0 auto;
    
    h1, h1 strong {
        font-size: xx-large;
        color: ${theme.colors.redDark};
        text-align: center;
        @media ${device.sm}{
            font-size:x-large
        }
    }
    
    p {
        text-align: center;
        color: ${theme.colors.textLight};
        margin-bottom: 18px;

        @media ${device.sm}{
            font-size: small;
        }
    }

    ${Space} {
        width: 100%;
    }

    ${Button}{
        background-color: ${theme.colors.greyLight};
        color: ${theme.colors.textLight};
        &:hover {
            background-color: ${theme.colors.greyLight};
            filter: brightness(0.9);
        }
    }

   ${Button} + ${Button} {
        background-color: ${theme.colors.red};
        color: ${theme.colors.white};
        &:hover {
            background-color: ${theme.colors.red};
            filter: brightness(0.9);
        }
    }
`

const ViewContact = styled.button`
    color: ${theme.colors.blueMedium};
    font-size: medium;
    cursor: pointer;
    border: none;
    background-color: transparent;
`

const renderAddressField = (field: keyof ISupplierAddress) => ({ address }: ISupplier) => <span>{address[field]}</span>;



const SuppliersListPage: React.FC = () => {


    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    const [selectedSupplier, setSelectedSupplier] = useState<ISupplier | null>(null);

    const { data: providers, loading, refetch } = useFetch<ISupplier>('http://localhost:3000/suppliers', debouncedSearchTerm);


    const deleteSupplierById = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/suppliers/${id}`);
            toast.success('Fornecedor deletado com sucesso!');
            refetch();
        } catch (error) {
            toast.error('Erro ao deletar fornecedor!');
        }
    }


    const handleDeleteSupplier = (supplier: ISupplier): void => {
        setSelectedSupplier(supplier);
        setIsDeleteModalOpen(true);
    }

    const handleViewSupplierContacts = (supplier: ISupplier): void => {
        setSelectedSupplier(supplier);
        setIsContactModalOpen(true);
    }

    const handleCloseViewContact = (): void => {
        setIsContactModalOpen(false);
        setSelectedSupplier(null);
    }

    const handleCreateSupplier = (): void => {
        setIsModalOpen(true);
    }



    const columns: IColumns[] = [
        { title: 'Nome', dataIndex: 'name', key: 'name' },
        { title: 'Descrição', dataIndex: 'description', key: 'description' },
        {
            title: 'Contatos',
            dataIndex: 'contato',
            key: 'contato',
            align: 'center',
            dataRender: (record: ISupplier) => (
                <div>
                    <ViewContact onClick={() => handleViewSupplierContacts(record)}>
                        Visualizar
                    </ViewContact>
                </div>
            )
        },
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
            dataRender: (data: ISupplier) => (
                <Space>
                    <Tooltip text="Visualizar" >
                        <TButtonAction type="view" />
                    </Tooltip>

                    <Tooltip text="Editar" >
                        <TButtonAction type="edit" />
                    </Tooltip>

                    <Tooltip text="Deletar" type="danger" >
                        <TButtonAction type="delete" onClick={() => handleDeleteSupplier(data)} />
                    </Tooltip>
                </Space>
            ),
        },
    ];


    return (
        <Content>
            <ListContainer>
                <TableListActionsSpace justifyContent="space-between" alignItems="center" margin="16px 0">
                    <TableSearchInput
                        placeholder="Pesquisar..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                    <Button type="button" onClick={handleCreateSupplier}>
                        <CirclePlus size={18} />
                        <span>Criar</span>
                    </Button>
                </TableListActionsSpace>
                <Table
                    dataSource={providers}
                    columns={columns}
                    loading={loading}
                />
            </ListContainer>

            <Modal
                isOpen={isContactModalOpen}
                onClose={() => handleCloseViewContact()}
                hasCloseBtn={true}
                closeOnOutsideClick={true}
                width="600px"
            >
                <SupplierContacts data={selectedSupplier} />
            </Modal>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                hasCloseBtn={true}
                closeOnOutsideClick={true}
                width="1300px"
            >
                <SupplierForm refetchData={refetch} />
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                hasCloseBtn={true}
                closeOnOutsideClick={true}
                width="380px"
            >
                <DeleteSupplierContainer>
                    <h1><strong>Deletar Fornecedor</strong></h1>
                    <p>Você tem certeza que deseja deletar o fornecedor <strong>{selectedSupplier?.name}</strong>?</p>
                    <Space justifyContent="space-between">
                        <Button type="button" onClick={() => setIsDeleteModalOpen(false)}>Cancelar</Button>
                        <Button type="button" onClick={() => {
                            deleteSupplierById(selectedSupplier?.id!);
                            setIsDeleteModalOpen(false);
                        }}>Deletar</Button>
                    </Space>
                </DeleteSupplierContainer>
            </Modal>

        </Content>
    );
};

export default SuppliersListPage;
