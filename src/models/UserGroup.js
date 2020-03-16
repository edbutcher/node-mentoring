const Sequelize = require('sequelize')

class UserGroup extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        userId: DataTypes.INTEGER,
        groupId: DataTypes.INTEGER
      },
      {
        modelName: 'UserGroup',
        tableName: 'UserGroups',
        sequelize
      }
    )
  }
}

module.exports = UserGroup
