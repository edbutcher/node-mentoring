const Sequelize = require('sequelize')

class Group extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        name: DataTypes.STRING,
        permissions: {
          type: DataTypes.ARRAY(DataTypes.STRING)
        }
      },
      {
        modelName: 'Group',
        tableName: 'Groups',
        sequelize
      }
    )
  }

  static associate(models) {
    this.belongsToMany(models.User, {
      through: 'UserGroups',
      as: 'users',
      foreignKey: 'groupId',
      otherKey: 'userId',
      onDelete: 'CASCADE',
      hooks: true
    })
  }
}

module.exports = Group
