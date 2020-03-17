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
          allowNull: false,
          get() {
            return this.getDataValue('password')
          },
          set(password) {
            return this.setDataValue('password', User.generateHash(password))
          }
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

  static generateHash(password) {
    // eslint-disable-next-line no-sync
    return bcrypt.hashSync(password, 8)
  }

  validPassword(passwordToCompare) {
    return bcrypt.compare(passwordToCompare, this.password)
  }
}

module.exports = User
