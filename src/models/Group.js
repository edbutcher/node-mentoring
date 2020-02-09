module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
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
