import { DataTypes } from 'sequelize'
import { sequelize } from '../database/index.js'

export const Task = sequelize.define('task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: DataTypes.STRING
  },
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0
  }
})
