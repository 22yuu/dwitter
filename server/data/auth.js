// abcd1234: $2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm
import SQ from 'sequelize';
import { db } from "../db/mysql.js";
import { sequelize } from '../db/sequelize.js';
const DataTypes = SQ.DataTypes;

export const User = sequelize.define('user', {
  // 자동으로 user뒤에 s를 붙여줌
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type:DataTypes.STRING(45),
    allowNull:false,
  },
  password: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  url: DataTypes.TEXT,
},
{timestamps:false})

export async function findByUsername(username) {
  // Sequelize
  return User.findOne({where:{username}});
  // MySQL
  return db.execute('SELECT * FROM users WHERE username=?', [username]) //
  .then(result => result[0][0])
}

export async function findById(id) {
  // Sequelize
  return User.findByPk(id);
  // MySQL
  return db.execute('SELECT * FROM users WHERE id=?', [id]) //
  .then(result => result[0][0])
}

export async function createUser(user) {
  // Sequelize
  return User.create(user).then(data => {console.log(data); return data});
  // MySQL
  const {username, password, name, email, url} = user;
  return db.execute('INSERT INTO users (username, password, name, email, url) VALUES (?, ?, ?, ?, ?)', [
    username, password, name, email, url
  ]).then(result => result[0].insertId)
}
