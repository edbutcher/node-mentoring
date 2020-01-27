import { DataTypes } from 'sequelize'

export default (connection) => {
  const queryInterface = connection.getQueryInterface()

  queryInterface.createTable('users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
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
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    freezeTableName: true
  })
}
