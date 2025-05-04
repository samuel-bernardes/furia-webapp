import { createContext, ReactNode, useContext, useState, useEffect, useCallback } from 'react';
import RestApi from '../../services/ApiBase';
import useDoRequest from '../../hooks/useDoRequest';
import { IBasicUser } from '../../services/endpoints/users/IUsers.interface';

interface UserContextType {
    user: IBasicUser | null;
    loading: boolean;
    login: (token: string) => void; // <-- recebe apenas o token
    logout: () => void;
    updateUser: () => void;
}
const UserContext = createContext<UserContextType | null>(null);

export function UserContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IBasicUser | null>(() => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const GetLoggedUser = useDoRequest((api) => api.UsersRequest.getLoggedUser);

    const getLoggedUser = useCallback(async () => {
        try {
            const response = await GetLoggedUser.doRequest("");
            if (response.data) {
                //@ts-ignore
                const userData = response.data.data as IBasicUser;
                setUser(userData);
                sessionStorage.setItem('user', JSON.stringify(userData));
                return true;
            }
        } catch (error) {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            setUser(null);
            return false;
        }
    }, [GetLoggedUser.doRequest]);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            RestApi.setAuthToken();
            getLoggedUser();
        }
    }, []);

    // No UserContextProvider, modifique a função login para retornar uma Promise
    const login = useCallback(async (token: string) => {
        sessionStorage.setItem("token", token);
        RestApi.setAuthToken();
        await getLoggedUser(); // Garante que o usuário será carregado
    }, [getLoggedUser]);

    const logout = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        RestApi.setAuthToken();
        setUser(null);
    };


    const updateUser = useCallback(async () => {
        RestApi.setAuthToken();
        return await getLoggedUser();
    }, [getLoggedUser]);

    return (
        <UserContext.Provider value={{ user, loading: GetLoggedUser.loading, login, logout, updateUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext deve ser usado dentro de um UserContextProvider');
    }
    return context;
};
