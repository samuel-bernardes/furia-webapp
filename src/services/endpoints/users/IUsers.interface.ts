export interface IUser {
    id: string;
    name: string;
    cpf: string;
    phone: string;
    email: string;
    document: string;
    avatar?: string;
    isTemporary: boolean;
    address: Address;
    interests: string[];
    socials: ISocial[],
    eventInterests: string[];
}

export interface IBasicUser {
    id: string;
    name: string;
    email: string;
    socials?: ISocial[],
    interests?: string[];
    eventInterests?: string[];
}

export interface ISocial {
    id: string,
    platform: string
    url: string
    userId: string
    username: string
}

export interface Address {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface ICompleteUserDTO {
    name: string;
    cpf: string;
    phone: string;
    email: string;
    avatar?: string;
    document: string;
    address: Address;
    interests?: string[];
    eventInterests?: string[];
}

export interface IUpdateUserDTO {
    name?: string;
    phone?: string;
    address?: Partial<Address>;
    interests?: string[];
    eventInterests?: string[];
}
