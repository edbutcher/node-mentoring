import { User, UserI } from './user'

interface UpdateUser {
    id: string;
    login: string;
    password: string;
    age: number;
}

class Users {
    static _users: Array<User> = []

    getAll(): Array<User> {
        return Users._users.filter(user => !user.isDeleted)
    }

    getUser(id: string): User {
        const foundUser = Users._users.find(user => user.id === id)
        if (!foundUser) throw Error('No such user id')

        return foundUser
    }

    addUser({ login, password, age }: UserI): User {
        const user = new User({ login, password, age })
        Users._users.push(user)

        return user
    }

    updateUser({ id, login, password, age }: UpdateUser): User {
        const userIndex = Users._users.findIndex(user => user.id === id && !user.isDeleted)
        if (userIndex === -1) throw Error('No such user id')

        Users._users[userIndex].login = login
        Users._users[userIndex].password = password
        Users._users[userIndex].age = age

        return Users._users[userIndex]
    }

    deleteUser(id: string) {
        const userIndex = Users._users.findIndex(user => user.id === id)
        if (userIndex === -1) throw Error('No such user id')
        Users._users[userIndex].isDeleted = true

        return Users._users[userIndex]
    }
}

const users =  new Users()

// Add few fake users
const user1 = new User({ login: 'login1', password: 'password1', age: 100 })
const user2 = new User({ login: 'login2', password: 'password2', age: 18 })
users.addUser(user1)
users.addUser(user2)

export default users
