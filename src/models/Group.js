
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    permissions: {
      type: DataTypes.STRING,
      get() {
        return JSON.parse(this.getDataValue('permissions'))
      },
      set(value) {
        return this.setDataValue('permissions', JSON.stringify(value))
      }
    }
  }, {})
  Group.associate = () => {
    // associations can be defined here
  }
  return Group
}
