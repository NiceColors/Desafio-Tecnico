import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";


interface IUseFetch<T extends Record<string, any>> {
    data: T[],
    loading: boolean,
    refetch: (search?: string) => void
}

export const useFetch = <T extends Record<string, any>>(route: string, searchTerm: string): IUseFetch<T> => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    const getData = useCallback(async (search?: string) => {
        try {
            setLoading(true);
            const { data: res } = await axios.get(route, {
                params: { ...(search && { name_like: search }) },
            });
            setData(res);
        } catch (error) {
            toast.error('Erro ao carregar fornecedores!');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getData(searchTerm);
    }, [searchTerm, getData]);

    return { data, loading, refetch: getData };
};
