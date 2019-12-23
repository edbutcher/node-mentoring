import { User, UserI } from './user'

interface UpdateUser {
    id: string;
    login?: string;
    password?: string;
    age?: number;
    isDeleted?: boolean;
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
        Users._users = [...Users._users, user]

        return user
    }

    updateUser({ id, login, password, age }: UpdateUser): User {
        Users._users = Users._users.map(user => {
            if (user.id === id) {
                return {
                    ...user,
                    login: login || user.login,
                    password: password || user.password,
                    age: age || user.age
                }
            }
            return user
        })

        return this.getUser(id)
    }

    deleteUser(id: string) {
        // check if user exist
        this.getUser(id)
        Users._users = Users._users.map(user => {
            if (user.id === id) {
                return {
                    ...user,
                    isDeleted: true
                }
            }
            return user
        })
    }
}

const users =  new Users()

// Add few fake users
const user1 = new User({ login: 'login1', password: 'password1', age: 100 })
const user2 = new User({ login: 'login2', password: 'password2', age: 18 })
users.addUser(user1)
users.addUser(user2)

export default users
