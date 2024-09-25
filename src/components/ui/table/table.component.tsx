import { ChevronLeft, ChevronRight, ScanEye, Search, Trash2, UserRoundPen } from 'lucide-react';
import { HTMLProps, ReactNode, useEffect, useRef, useState } from 'react';
import { theme } from '../../../theme/theme';

import { Space } from '../../../styles/globalStyle';
import { LoadingSpinner } from '../loading/loading.component';
import { PageNumberButton, PageNumbersContainer, PaginationButton } from './pagination.styles';
import {
    PaginationContainer,
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
    align?: 'center' | 'left' | 'right',
    width?: string,
    exampandable?: boolean,
    dataRender?: (data: any) => React.ReactNode
}

interface ITableSearchInput extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
}


export const TableSearchInput: React.FC<ITableSearchInput> = ({ placeholder, ...props }) => {
    const ref = useRef<HTMLInputElement>(null);

    return (
        <TableSearchContainer>
            <Search
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

    const ActualIcon = ActionIcons[type];

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
    // expandedRowRender?: (data: T) => ReactNode
}


export const Table = <T extends Record<string, any>>({
    dataSource,
    columns,
    loading,
    // expandedRowRender
}: ITable<T>) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.max(Math.ceil(dataSource.length / ITEMS_PER_PAGE), 1);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [dataSource.length, currentPage, totalPages]);

    const paginatedData = dataSource.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };


    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <PageNumberButton
                    key={i}
                    active={i === currentPage}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </PageNumberButton>
            );
        }
        return pageNumbers;
    };

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
                            <>
                                <STr key={index}>
                                    {columns.map((column, columnIndex) => (
                                        <STd
                                            key={columnIndex}
                                            align={column.align}
                                            width={column.width}
                                        >
                                            {column.dataRender ? column.dataRender(data) : (data as Record<string, any>)[column.dataIndex]}
                                        </STd>
                                    ))}
                                </STr>



                                {/* 
                                {expandedRowRender && (
                                    <STr>
                                        <STd colSpan={columns.length}>
                                            {expandedRowRender(data)}
                                        </STd>
                                    </STr>
                                )} */}
                            </>
                        ))}

                        {!loading && paginatedData.length === 0 && (
                            <STr
                                style={{
                                    backgroundColor: 'white',
                                    border: 'none',
                                    height: '300px',
                                }}
                            >
                                <STd align="center" colSpan={columns.length}>
                                    Nenhum resultado encontrado
                                </STd>
                            </STr>
                        )}
                    </STBody>
                </STable>
            </TableContent>

            {totalPages > 1 && (
                <PaginationContainer>

                    <PaginationButton
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >     <ChevronLeft size={24} color={theme.colors.blueDark} />
                    </PaginationButton>

                    <Space>
                        <PageNumbersContainer>{renderPageNumbers()}</PageNumbersContainer>

                        <PaginationButton
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >     <ChevronRight size={24} color={theme.colors.blueMedium} />
                        </PaginationButton>
                    </Space>
                </PaginationContainer>
            )}
        </>
    );
};
