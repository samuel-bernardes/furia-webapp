export interface IUser {
    id: string;
    name: string;
    cpf: string;
    phone: string;
    email: string;
    document: string;
    avatar?: string;
    isTemporary: boolean;
    address?: Address;
    interests?: Game[];
    socials?: ISocial[],
    eventInterests?: EventInterest[];
}

export interface IBasicUser {
    id: string;
    name: string;
    email: string;
    socials?: ISocial[],
    interests?: Game[];
    eventInterests?: EventInterest[];
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

export interface Game {
    name: string;
}

export interface EventInterest {
    eventName: string;
    date?: string;
    location?: string;
}

export interface ICompleteUserDTO {
    name: string;
    cpf: string;
    phone: string;
    email: string;
    document: string;
    address: Address;
    interests?: string[];
    eventInterests?: EventInterest[];
}

export interface IUpdateUserDTO {
    name?: string;
    phone?: string;
    address?: Partial<Address>;
    interests?: string[];
    eventInterests?: EventInterest[];
}
