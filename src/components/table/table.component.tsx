import { CirclePlus, ScanEye, Trash2, UserRoundPen, UserSearch } from 'lucide-react';
import { useRef, useState } from 'react';
import { Space } from '../../styles/globalStyle';
import { theme } from '../../theme/theme';

import {
    CreateButton,
    PaginationButton,
    PaginationContainer,
    PaginationInfo,
    SearchInput,
    STable,
    STBody,
    STButtonAction,
    STd,
    STh,
    SThead,
    STr,
    TableContainer,
    TableContent,
    TableSearchContainer,
} from './table.style';


export interface IColumns {
    title: string,
    dataIndex: string,
    key: string,
    align?: string,
    width?: string,
    fixed?: boolean,
    dataRender?: (data: any) => React.ReactNode
}

const ITEMS_PER_PAGE = 10;

const TableSearchInput = ({ placeholder, onChange }: { placeholder: string; onChange: (value: string) => void }) => {
    const ref = useRef<HTMLInputElement>(null);

    return (
        <TableSearchContainer>
            <UserSearch
                onClick={() => {
                    ref.current?.focus()
                }}
                color='grey'
            />
            <SearchInput ref={ref} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
        </TableSearchContainer>
    );
}


export const TButtonAction = ({ children, type }: {
    type: 'view' | 'edit' | 'delete';
    children?: React.ReactNode;
}) => {
    const ActionIcons = {
        'delete': <Trash2 size={18} color={theme.colors.red} />,
        'edit': <UserRoundPen size={18} color={theme.colors.primary} />,
        'view': <ScanEye size={18} color={theme.colors.primary} />
    }

    const ActualIcon = ActionIcons[type]

    return (
        <STButtonAction>
            {ActualIcon}
            {children}
        </STButtonAction>
    );
}

export const Table = ({ dataSource = [], columns }: {
    dataSource: any[],
    columns: IColumns[],
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const filteredData = dataSource.filter((data) =>
        Object.values(data).some((value: any) =>
            value.toString().toLowerCase().includes(search.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    const paginatedData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <TableContainer>
            <Space justifyContent="space-between" alignItems="center" margin={'16px 0px'}>
                <TableSearchInput placeholder="Pesquisar..." onChange={setSearch} />
                <CreateButton>
                    <Space>
                        <CirclePlus />
                        <span>Criar</span>
                    </Space>
                </CreateButton>
            </Space>
            <TableContent>

                <STable>
                    <SThead>
                        {columns.map((column, index) => (
                            <STh key={index}>{column.title}</STh>
                        ))}
                    </SThead>
                    <STBody>

                        {paginatedData.length === 0 && (
                            <STr
                                style={{
                                    backgroundColor: 'white',
                                    border: 'none',
                                    height: '300px',
                                }}
                            >
                                <STd align="center" colSpan={columns.length}>Nenhum resultado encontrado</STd>
                            </STr>
                        )}

                        {paginatedData.map((data, index) => (
                            <STr key={index}>
                                {columns.map((column, index) => (
                                    <>
                                        <STd
                                            key={index}
                                            align={column.align as any}
                                            width={column.width}
                                        >{column.dataRender ? column.dataRender(data) : data[column.dataIndex]}</STd>

                                    </>
                                ))}
                            </STr>
                        ))}
                    </STBody>
                </STable>
            </TableContent>
            <PaginationContainer>
                <PaginationButton
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                    Anterior
                </PaginationButton>
                <PaginationInfo>
                    Página {currentPage} de {totalPages}
                </PaginationInfo>
                <PaginationButton
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Próxima
                </PaginationButton>
            </PaginationContainer>
        </TableContainer>
    );
}



