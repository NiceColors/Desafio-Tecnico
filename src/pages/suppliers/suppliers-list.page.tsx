import axios from "axios";
import { CirclePlus, FileDown } from "lucide-react";
import React, { useCallback, useState } from "react";
import { toast } from "sonner";
import styled from "styled-components";
import { ISupplier, ISupplierAddress } from "../../@types/suppliers";
import { SupplierContacts } from "../../components/supplier/supplier-contacts.component";
import SupplierForm from "../../components/supplier/supplier-form.component";
import SupplierView from "../../components/supplier/supplier-view.component";
import Tooltip from "../../components/ui/loading/tooltip.component";
import Modal from "../../components/ui/modal/modal.component";
import { IColumns, Table, TableSearchInput, TButtonAction } from "../../components/ui/table/table.component";
import { ListContainer, TableListActionsSpace } from "../../components/ui/table/table.style";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useFetch } from "../../hooks/useFetch";
import { Button, Content, Space } from "../../styles/globalStyle";
import { theme } from "../../theme/theme";
import { exportToCSV } from "../../utils/functions/exports";

const DeleteContainer = styled.div`
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
    }
    
    p {
        text-align: center;
        color: ${theme.colors.textLight};
        margin-bottom: 18px;
    }

    ${Space} {
        width: 100%;
    }

    ${Button} {
        background-color: ${theme.colors.greyLight};
        color: ${theme.colors.textLight};
        &:hover {
            filter: brightness(0.9);
        }
    }

   ${Button} + ${Button} {
        background-color: ${theme.colors.red};
        color: ${theme.colors.white};
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

interface ModalState {
    type: 'create' | 'edit' | 'delete' | 'view' | 'contacts' | null;
    isOpen: boolean;
}

const SuppliersListPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebouncedValue(searchTerm, 700);

    const [modalState, setModalState] = useState<ModalState>({ type: null, isOpen: false });
    const [selectedSupplier, setSelectedSupplier] = useState<ISupplier | null>(null);

    const { data: providers, loading, refetch } = useFetch<ISupplier>('http://localhost:3000/suppliers', debouncedSearchTerm);


    const exportSuppliersToCSV = () => {
        const formattedProviders = providers.map(provider => {

            const contacts = provider.contacts.map(contact => {
                return `${contact.name}: ${contact.phone}`;
            }).join(' - ');

            return {
                Nome: provider.name,
                Descrição: provider.description,
                Contatos: contacts,
                CEP: provider.address.cep,
                Estado: provider.address.state,
                Cidade: provider.address.city,
                Logradouro: provider.address.street,
                Número: provider.address.number,
                Referência: provider.address.reference,
            }
        });

        exportToCSV('fornecedores', formattedProviders);
    }

    const deleteSupplierById = useCallback(async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/suppliers/${id}`);
            toast.success('Fornecedor deletado com sucesso!');
            refetch();
        } catch (error) {
            toast.error('Erro ao deletar fornecedor!');
        }
    }, [refetch]);

    const handleModalOpen = useCallback((type: ModalState['type'], supplier?: ISupplier) => {
        setSelectedSupplier(supplier || null);
        setModalState({ type, isOpen: true });
    }, []);

    const handleModalClose = useCallback(() => {
        setModalState({ type: null, isOpen: false });
        setSelectedSupplier(null);
    }, []);

    const columns: IColumns[] = [
        { title: 'Nome', dataIndex: 'name', key: 'name' },
        { title: 'Descrição', dataIndex: 'description', key: 'description' },
        {
            title: 'Contatos',
            dataIndex: 'contato',
            key: 'contato',
            align: 'center',
            dataRender: (record: ISupplier) => (
                <ViewContact onClick={() => handleModalOpen('contacts', record)}>
                    Visualizar
                </ViewContact>
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
                    <Tooltip text="Visualizar">
                        <TButtonAction type="view" onClick={() => handleModalOpen('view', data)} />
                    </Tooltip>
                    <Tooltip text="Editar">
                        <TButtonAction type="edit" onClick={() => handleModalOpen('edit', data)} />
                    </Tooltip>
                    <Tooltip text="Deletar" type="danger">
                        <TButtonAction type="delete" onClick={() => handleModalOpen('delete', data)} />
                    </Tooltip>
                </Space>
            ),
        },
    ];


    const modalSize = {
        contacts: "700px",
        create: "1300px",
        edit: "1300px",
        view: "800px",
        delete: "380px",
    }

    return (
        <Content>
            <ListContainer>
                <TableListActionsSpace justifyContent="space-between" alignItems="center" margin="16px 0">
                    <TableSearchInput
                        placeholder="Pesquisar..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                    <Space>

                        <Tooltip text="Exportar para CSV">
                            <Button type="button" onClick={exportSuppliersToCSV}>
                                <FileDown size={16} />
                            </Button>
                        </Tooltip>

                        <Button type="button" onClick={() => handleModalOpen('create')}>
                            <CirclePlus size={16} />
                            <span>Criar</span>
                        </Button>
                    </Space>
                </TableListActionsSpace>
                <Table
                    dataSource={providers}
                    columns={columns}
                    loading={loading}
                />
            </ListContainer>

            <Modal
                isOpen={modalState.isOpen}
                onClose={handleModalClose}
                hasCloseBtn={true}
                closeOnOutsideClick={true}
                width={modalSize[modalState.type!]}
            >
                {modalState.type === 'contacts' && <SupplierContacts data={selectedSupplier} />}
                {modalState.type === 'create' && <SupplierForm refetchData={refetch} />}
                {modalState.type === 'edit' && <SupplierForm refetchData={refetch} edit={{ id: selectedSupplier?.id!, data: selectedSupplier! }} />}
                {modalState.type === 'view' && <SupplierView supplier={selectedSupplier!} />}

                {modalState.type === 'delete' && (
                    <DeleteContainer>
                        <h1><strong>Deletar Fornecedor</strong></h1>
                        <p>Você tem certeza que deseja deletar o fornecedor <strong>{selectedSupplier?.name}</strong>?</p>
                        <Space justifyContent="space-between">
                            <Button type="button" onClick={handleModalClose}>Cancelar</Button>
                            <Button type="button" onClick={() => {
                                deleteSupplierById(selectedSupplier?.id!);
                                handleModalClose();
                            }}>Deletar</Button>
                        </Space>
                    </DeleteContainer>
                )}
            </Modal>
        </Content>
    );
};

export default SuppliersListPage;