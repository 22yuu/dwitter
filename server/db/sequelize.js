import mysql from 'mysql2';
import { config } from '../config.js';
import SQ from 'sequelize';


const {host, user, password, database, dialect} = config.db
console.log(`${host}, ${user}, ${password}, ${database}, ${dialect}`);
// default mysql이므로 생략가능
export const sequelize = new SQ.Sequelize(database, user, password, {
    host,
    dialect: 'mysql',
    dialectModule: mysql,
    logging: false,
});