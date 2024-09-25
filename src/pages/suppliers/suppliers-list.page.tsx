import axios from "axios";
import { CirclePlus, FileDown } from "lucide-react";
import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import styled from "styled-components";
import { ISupplier, ISupplierAddress } from "../../@types/suppliers";
import { SupplierContacts } from "../../components/supplier/supplier-contacts.component";
import SupplierForm from "../../components/supplier/supplier-form.component";
import SupplierView from "../../components/supplier/supplier-view.component";
import { ListContainer, ListHeader, ListHeaderDescription, ListHeaderTitle } from "../../components/ui/list/list.style";
import Tooltip from "../../components/ui/loading/tooltip.component";
import Modal from "../../components/ui/modal/modal.component";
import { IColumns, Table, TableSearchInput, TButtonAction } from "../../components/ui/table/table.component";
import { TableListActionsSpace } from "../../components/ui/table/table.style";
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
    const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);


    const { data: suppliers, loading, refetch } = useFetch<ISupplier>('http://localhost:3000/suppliers', debouncedSearchTerm);


    const suppliersMap = useMemo(() => {
        return new Map<string, ISupplier>(suppliers.map(supplier => [supplier.id, supplier]));
    }, [suppliers]);

    const selectedSupplierData = selectedSupplier ? suppliersMap.get(selectedSupplier) || null : null;

    const exportSuppliersToCSV = () => {
        const formattedSuppliers = suppliers.map(supplier => {

            const contacts = supplier.contacts.map(contact => {
                return `${contact.name}: ${contact.phone}`;
            }).join(' - ');

            return {
                Nome: supplier.name,
                Descrição: supplier.description,
                Contatos: contacts,
                CEP: supplier.address.cep,
                Estado: supplier.address.state,
                Cidade: supplier.address.city,
                Logradouro: supplier.address.street,
                Número: supplier.address.number,
                Referência: supplier.address.reference,
            }
        });

        exportToCSV('fornecedores', formattedSuppliers);
    }

    const deleteSupplierById = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/suppliers/${id}`);
            toast.success('Fornecedor deletado com sucesso!');
            refetch();
        } catch (error) {
            toast.error('Erro ao deletar fornecedor!');
        }
    }

    const handleModalOpen = (type: ModalState['type'], supplierId: string | null = null) => {
        if (supplierId) setSelectedSupplier(supplierId);
        setModalState({ type, isOpen: true });
    }

    const handleModalClose = () => {
        setModalState({ type: null, isOpen: false });
        setSelectedSupplier(null);
    };

    const columns: IColumns[] = [
        { title: 'Nome', dataIndex: 'name', key: 'name' },
        { title: 'Descrição', dataIndex: 'description', key: 'description' },
        {
            title: 'Contatos',
            dataIndex: 'contato',
            key: 'contato',
            align: 'center',
            dataRender: (record: ISupplier) => (
                <ViewContact onClick={() => handleModalOpen('contacts', record.id)}>
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
            dataRender: (record: ISupplier) => (
                <Space>
                    <Tooltip text="Visualizar">
                        <TButtonAction type="view" onClick={() => handleModalOpen('view', record.id)} />
                    </Tooltip>
                    <Tooltip text="Editar">
                        <TButtonAction type="edit" onClick={() => handleModalOpen('edit', record.id)} />
                    </Tooltip>
                    <Tooltip text="Deletar" type="danger">
                        <TButtonAction type="delete" onClick={() => handleModalOpen('delete', record.id)} />
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
                <ListHeader>
                    <ListHeaderTitle>
                        Fornecedores
                    </ListHeaderTitle>
                    <ListHeaderDescription>
                        Lista de fornecedores cadastrados
                    </ListHeaderDescription>
                </ListHeader>

                <TableListActionsSpace justifyContent="space-between" alignItems="center" margin="16px 0">
                    <TableSearchInput
                        placeholder="Pesquisar nome..."
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
                    dataSource={suppliers}
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
                {modalState.type === 'contacts' && <SupplierContacts data={selectedSupplierData} />}
                {modalState.type === 'create' && <SupplierForm refetchData={refetch} />}
                {modalState.type === 'edit' && <SupplierForm refetchData={refetch} edit={{ id: selectedSupplierData?.id!, data: selectedSupplierData! }} />}
                {modalState.type === 'view' && <SupplierView supplier={selectedSupplierData!} />}

                {modalState.type === 'delete' && (
                    <DeleteContainer>
                        <h1><strong>Deletar Fornecedor</strong></h1>
                        <p>Você tem certeza que deseja deletar o fornecedor <strong>{selectedSupplierData?.name}</strong>?</p>
                        <Space justifyContent="space-between">
                            <Button type="button" onClick={handleModalClose}>Cancelar</Button>
                            <Button type="button" onClick={() => {
                                deleteSupplierById(selectedSupplierData?.id!);
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