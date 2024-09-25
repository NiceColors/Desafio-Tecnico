import axios from "axios";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import styled from "styled-components";
import { ISupplier, ISupplierAddress } from "../../@types/suppliers";
import SupplierForm from "../../components/form/supplier-form.component";
import Modal from "../../components/modal/modal.component";
import { IColumns, Table, TableSearchInput, TButtonAction } from "../../components/table/table.component";
import { ListContainer } from "../../components/table/table.style";
import Tooltip from "../../components/tooltip.component";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useFetch } from "../../hooks/useFetch";
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
    
    h1 strong {
        font-size: 2rem;
        color: ${theme.colors.redDark};
        
    }
    
    p {
        font-size: 1rem;
        text-align: center;
        color: ${theme.colors.textLight};
        margin-bottom: 18px;
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

const renderAddressField = (field: keyof ISupplierAddress) => ({ address }: ISupplier) => <span>{address[field]}</span>;


const SuppliersListPage: React.FC = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedSupplier, setSelectedSupplier] = useState<ISupplier | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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


    const handleDeleteSupplierById = (supplier: ISupplier) => {
        setSelectedSupplier(supplier);
        setIsDeleteModalOpen(true);
    }



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
            dataRender: (data) => (
                <Space>



                    <Tooltip text="Visualizar" >
                        <TButtonAction type="view" />
                    </Tooltip>

                    <Tooltip text="Editar" >
                        <TButtonAction type="edit" />
                    </Tooltip>

                    <Tooltip text="Deletar" type="danger" >
                        <TButtonAction type="delete" onClick={() => handleDeleteSupplierById(data)} />
                    </Tooltip>
                </Space>
            ),
        },
    ];


    return (
        <Content>
            <ListContainer>
                <Space justifyContent="space-between" alignItems="center" margin="16px 0">
                    <TableSearchInput
                        placeholder="Pesquisar..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                    <Button type="button" onClick={() => setIsModalOpen(true)}>
                        <Space>
                            <CirclePlus size={18} />
                            <span>Criar Fornecedor</span>
                        </Space>
                    </Button>
                </Space>
                <Table dataSource={providers} columns={columns} loading={loading} />
            </ListContainer>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                hasCloseBtn={true}
                closeOnOutsideClick={true}
            >
                <SupplierForm refetchData={refetch} />
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                hasCloseBtn={true}
                closeOnOutsideClick={true}

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
