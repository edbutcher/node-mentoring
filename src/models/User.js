module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
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
    {}
  )
  User.associate = (models) => {
    User.belongsToMany(models.Group, {
      through: 'UserGroups',
      as: 'groups',
      foreignKey: 'userId',
      otherKey: 'groupId',
      onDelete: 'CASCADE',
      hooks: true
    })
  }
  return User
}
