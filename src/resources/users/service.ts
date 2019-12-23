import { Request, Response } from 'express'
import { ValidatedRequest } from 'express-joi-validation'
import { UserSchema } from './model'
import usersService from '../../common/fakeDB/users'

export const getAutoSuggestUsers = (loginSubstring: string, limit = 10) => {
    const foundUsers = usersService.getAll()
        .filter(({ login }) => login.includes(loginSubstring))
        .sort((firstUser, secondUser) => {
            if (firstUser.login < secondUser.login) return -1
            if (firstUser.login > secondUser.login) return 1
            return 0
        })

    if (limit && limit < foundUsers.length) return foundUsers.splice(0, limit)

    return foundUsers
}

export const getAllUser = (req: Request, res: Response) => {
    try {
        const { loginSubstring, limit } = req.query
        let users = usersService.getAll()

        if (loginSubstring) {
            users = getAutoSuggestUsers(loginSubstring, Number(limit))
        }

        res.status(200).json({ users })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getUserById = (req: Request, res: Response) => {
    try {
        const user = usersService.getUser(req.params.userId)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const createUser = (req: ValidatedRequest<UserSchema>, res: Response) => {
    try {
        const { login, password, age } = req.body
        const user = usersService.addUser({ login, password, age })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const updateUser = (req: ValidatedRequest<UserSchema>, res: Response) => {
    try {
        const id = req.params.userId
        if (!id) throw Error('"id" field is required')
        const { login, password, age } = req.body
        const user = usersService.updateUser({ id, login, password, age })

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const deleteUser = (req: Request, res: Response) => {
    try {
        usersService.deleteUser(req.params.userId)
        res.sendStatus(200)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
