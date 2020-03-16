const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        login: {
          type: DataTypes.STRING,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        age: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        isDeleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        }
      },
      {
        modelName: 'User',
        tableName: 'Users',
        sequelize
      }
    )
  }

  static associate(models) {
    this.belongsToMany(models.Group, {
      through: 'UserGroups',
      as: 'groups',
      foreignKey: 'userId',
      otherKey: 'groupId',
      onDelete: 'CASCADE',
      hooks: true
    })
  }

  static async generateHash(password) {
    return await bcrypt.hash(password, bcrypt.genSalt())
  }

  static beforeCreate() {
    return super.beforeCreate(async (user) => {
      const hashedPassword = await User.generateHash(user.password)
      user.password = hashedPassword
    })
  }

  static beforeBulkCreate() {
    return super.beforeBulkCreate(async (users) => {
      for (const user of users) {
        const hashedPassword = await User.generateHash(user.password)
        user.password = hashedPassword
      }
    })
  }

  validPassword(passwordToCompare) {
    return bcrypt.compare(passwordToCompare, this.password)
  }
}

module.exports = User
