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
