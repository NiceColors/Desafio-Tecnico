import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";


interface IUseFetch<T extends Record<string, any>> {
    data: T[],
    loading: boolean,
}

export const useFetch = <T extends Record<string, any>>(searchTerm: string,): IUseFetch<T> => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = useCallback(async (search: string) => {
        try {
            setLoading(true);
            const { data: res } = await axios.get(`http://localhost:3000/suppliers`, {
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

    return { data, loading };
};
