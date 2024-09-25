export interface ITableColumns {
    title: string,
    dataIndex: string,
    key: string,
    align?: 'center' | 'left' | 'right',
    width?: string,
    exampandable?: boolean,
    dataRender?: (data: any) => React.ReactNode
}

export interface ITableSearchInput extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder: string;
}
