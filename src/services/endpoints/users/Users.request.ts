import RestApi, { IResponse } from "../../ApiBase";
import { IBasicUser, ICompleteUserDTO, IUpdateUserDTO, IUser } from "./IUsers.interface";

export default class UsersRequest {
    // Buscar dados do usuário autenticado
    public static getLoggedUser(): Promise<IResponse<IBasicUser>> {
        return RestApi.httpGet("/users");
    }

    public static getUserDetails(id: string): Promise<IResponse<IUser>> {
        return RestApi.httpGet(`/users/${id}`);
    }

    // Completar cadastro do usuário temporário
    public static completeRegistration(data: ICompleteUserDTO): Promise<IResponse<IUser>> {
        return RestApi.httpPost("/users/complete-registration", data);
    }

    // Atualizar usuário autenticado
    public static updateUser(data: IUpdateUserDTO): Promise<IResponse<IUser>> {
        return RestApi.httpPut("/users", data);
    }

    // Deletar conta do usuário autenticado
    public static deleteUser(): Promise<IResponse<IUser>> {
        return RestApi.httpDelete("/users");
    }
}
