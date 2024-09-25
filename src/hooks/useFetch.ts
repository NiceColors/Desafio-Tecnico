import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface IUseFetch<T> {
    data: T[];
    loading: boolean;
    refetch: (search?: string) => void;
}

export const useFetch = <T extends Record<string, any>>(route: string, searchTerm: string): IUseFetch<T> => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);

    const getData = useCallback(async (search?: string) => {
        setLoading(true);
        try {
            const { data: res } = await axios.get(route, { params: search ? { name_like: search } : {} });
            setData(res);
        } catch {
            toast.error('Erro ao carregar fornecedores!');
        } finally {
            setLoading(false);
        }
    }, [route]);

    useEffect(() => {
        getData(searchTerm);
    }, [searchTerm, getData]);

    return { data, loading, refetch: getData };
};
