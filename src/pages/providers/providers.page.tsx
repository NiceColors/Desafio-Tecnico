import { IColumns, Table, TButtonAction } from "../../components/table/table.component";
import { Content, Space } from "../../styles/globalStyle";

const Providers = () => {


    const columns: IColumns[] = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            align: 'left',

        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
            align: 'left',
        },
        {
            title: 'Contato',
            dataIndex: 'contato',
            key: 'contato',
            align: 'center',
        },
        {
            title: 'CEP',
            dataIndex: 'cep',
            key: 'cep',
            align: 'center',
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            align: 'center',
        },
        {
            title: 'Cidade',
            dataIndex: 'cidade',
            key: 'cidade',
            align: 'center',
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
    return (
        <Content>
            <Table
                dataSource={
                    new Array(10).fill(0).map((_, index) => ({
                        name: `Fornecedor ${index + 1}`,
                        description: `Descrição do fornecedor ${index + 1}`,
                        contato: `Contato do fornecedor ${index + 1}`,
                        cep: `CEP do fornecedor ${index + 1}`,
                        estado: `Estado do fornecedor ${index + 1}`,
                        cidade: `Cidade do fornecedor ${index + 1}`,
                    }))
                }
                columns={columns}
            />
        </Content>
    );
}

export default Providers;