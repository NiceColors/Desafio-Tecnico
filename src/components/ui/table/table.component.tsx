import { ChevronLeft, ChevronRight, ScanEye, Search, Trash2, UserRoundPen } from 'lucide-react';
import { HTMLProps, ReactNode, useEffect, useRef, useState } from 'react';
import { theme } from '../../../theme/theme';

import { ITableColumns, ITableSearchInput } from '../../../@types/table';
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
    TableNoContentContainer,
    TableSearchContainer
} from './table.style';

const ITEMS_PER_PAGE = 8;

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
    columns: ITableColumns[],
    loading?: boolean
}


export const Table = <T extends Record<string, any>>({
    dataSource,
    columns,
    loading,
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
                    $active={i === currentPage}
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
                        <tr>
                            {columns.map((column, index) => (
                                <STh key={index}>{column.title}</STh>
                            ))}
                        </tr>
                    </SThead>
                    <STBody>
                        {loading && (
                            <TableNoContentContainer>
                                <STd $align="center" colSpan={columns.length}>
                                    <LoadingSpinner />
                                </STd>
                            </TableNoContentContainer>
                        )}

                        {!loading && paginatedData.map((data) => (
                            <STr key={data.id}>
                                {columns.map((column, columnIndex) => (
                                    <STd
                                        key={columnIndex}
                                        $align={column.align}
                                        $width={column.width}
                                    >
                                        {column.dataRender ? column.dataRender(data) : (data as Record<string, any>)[column.dataIndex]}
                                    </STd>
                                ))}
                            </STr>
                        ))}

                        {!loading && paginatedData.length === 0 && (
                            <TableNoContentContainer>
                                <STd $align="center" colSpan={columns.length}>
                                    Nenhum resultado encontrado
                                </STd>
                            </TableNoContentContainer>
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
