module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
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
  }, {})
  Group.associate = (models) => {
    Group.belongsToMany(models.User, {
      through: 'UserGroups',
      as: 'users',
      foreignKey: 'groupId',
      otherKey: 'userId',
      onDelete: 'CASCADE',
      hooks: true
    })
  }
  return Group
}
