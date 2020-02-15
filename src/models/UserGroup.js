module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {})
  UserGroup.associate = () => {}
  return UserGroup
}
