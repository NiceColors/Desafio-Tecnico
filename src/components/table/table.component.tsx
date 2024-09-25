import { ScanEye, Trash2, UserRoundPen, UserSearch } from 'lucide-react';
import { HTMLProps, ReactNode, useRef, useState } from 'react';
import { theme } from '../../theme/theme';

import { Button } from '../../styles/globalStyle';
import { LoadingSpinner } from '../loading.component';
import {
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
    TableContent,
    TableSearchContainer
} from './table.style';

const ITEMS_PER_PAGE = 8;

export interface IColumns {
    title: string,
    dataIndex: string,
    key: string,
    align?: string,
    width?: string,
    fixed?: boolean,
    dataRender?: (data: any) => React.ReactNode
}

interface ITableSearchInput extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
}

export const TableSearchInput: React.FC<ITableSearchInput> = ({ placeholder, ...props }) => {
    const ref = useRef<HTMLInputElement>(null);

    return (
        <TableSearchContainer>
            <UserSearch
                onClick={() => {
                    ref.current?.focus()
                }}
                color='grey'
            />
            <SearchInput ref={ref} placeholder={placeholder} {...props} />
        </TableSearchContainer>
    );
}

interface IButtonAction extends HTMLProps<HTMLButtonElement> {
    type: 'view' | 'edit' | 'delete';
    children?: ReactNode;
}


export const TButtonAction: React.FC<IButtonAction> = ({ children, type, ...props }) => {

    const ActionIcons = {
        'delete': <Trash2 size={18} color={theme.colors.red} />,
        'edit': <UserRoundPen size={18} color={theme.colors.primary} />,
        'view': <ScanEye size={18} color={theme.colors.primary} />
    }

    const ActualIcon = ActionIcons[type]

    return (
        <STButtonAction {...props}>
            {ActualIcon}
            {children}
        </STButtonAction>
    );
}


interface ITable<T extends Record<string, any>> {
    dataSource: T[],
    columns: IColumns[],
    loading?: boolean
}

export const Table = <T extends Record<string, any>>({ dataSource, columns, loading }: ITable<T>) => {

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(dataSource.length / ITEMS_PER_PAGE);

    const paginatedData = dataSource.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <>
            <TableContent>

                <STable>
                    <SThead>
                        {columns.map((column, index) => (
                            <STh key={index}>{column.title}</STh>
                        ))}
                    </SThead>
                    <STBody>

                        {loading && (
                            <STr
                                style={{
                                    backgroundColor: 'white',
                                    border: 'none',
                                    height: '300px',
                                }}
                            >
                                <STd align="center" colSpan={columns.length}>
                                    <LoadingSpinner />
                                </STd>
                            </STr>
                        )}

                        {!loading && paginatedData.map((data, index) => (
                            <STr key={index}>
                                {columns.map((column, columnIndex) => (
                                    <STd
                                        key={columnIndex}
                                        align={column.align as any}
                                        width={column.width}
                                    >
                                        {column.dataRender ? column.dataRender(data) : (data as Record<string, any>)[column.dataIndex]}
                                    </STd>

                                ))}
                            </STr>
                        ))}

                        {!loading && paginatedData.length === 0 && (
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


                    </STBody>
                </STable>
            </TableContent>

            <PaginationContainer>
                <Button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                    Anterior
                </Button>
                <PaginationInfo>
                    Página {currentPage} de {totalPages}
                </PaginationInfo>
                <Button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Próxima
                </Button>
            </PaginationContainer>
        </>
    );
}



