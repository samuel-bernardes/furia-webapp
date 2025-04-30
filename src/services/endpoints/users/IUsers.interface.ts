export interface IUser {
    id: string;
    name: string;
    cpf: string;
    phone: string;
    email: string;
    document: string;
    isTemporary: boolean;
    address?: Address;
    interests?: Game[];
    eventInterests?: EventInterest[];
}

export interface Address {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface Game {
    name: string;
}

export interface EventInterest {
    eventName: string;
    date?: string;
    location: string;
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
