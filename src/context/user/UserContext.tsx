import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import RestApi from '../../services/ApiBase';

export interface IUser {
    id: string;
    nome: string;
    sobrenome: string;
    email: string;
    isProfessor: boolean;
}

interface UserContextType {
    user: IUser | null;
    login: (user: IUser, token: string) => void;
    logout: () => void;
    updateUser: (updatedUser: Partial<IUser>) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUser | null>(() => {
        const storedUser = sessionStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    /* const snackbar = useSnackbar(); */

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            RestApi.setAuthToken();
        }
    }, []);

    const login = (userData: IUser, token: string) => {
        sessionStorage.setItem('user', JSON.stringify(userData));
        sessionStorage.setItem('token', token);
        RestApi.setAuthToken();
        setUser(userData);
    };

    const logout = () => {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        RestApi.setAuthToken();
        setUser(null);
        /* snackbar.showSnackbar('Usuário deslogado com sucesso!', 'success'); */
    };

    const updateUser = (updatedUser: Partial<IUser>) => {
        if (!user) return;

        const newUserData = {
            ...user,
            ...updatedUser
        };

        sessionStorage.setItem('user', JSON.stringify(newUserData));
        setUser(newUserData);
        /* snackbar.showSnackbar('Dados do usuário atualizados com sucesso!', 'success'); */
    };

    return (
        <UserContext.Provider value={{ user, login, logout, updateUser }
        }>
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