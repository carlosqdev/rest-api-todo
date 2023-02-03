import { Sequelize } from 'sequelize'
import { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST } from '../config.js'

export const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql'
})
