import uuid from 'uuid'

export interface UserI {
    login: string;
    password: string;
    age: number;
}

export interface User {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export class User implements User {
    id: string
    login: string
    password: string
    age: number
    isDeleted: boolean

    constructor({ login, password, age }: UserI) {
        this.id = uuid()
        this.login = login
        this.password = password
        this.age = age
        this.isDeleted = false
    }
}
