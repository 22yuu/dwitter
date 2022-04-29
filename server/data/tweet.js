import { db } from '../db/mysql.js';
import * as userRepository from './auth.js';
import SQ from 'sequelize';
import { sequelize } from '../db/sequelize.js';
import {User} from './auth.js';
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const Tweet = sequelize.define('tweet', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull:false,
  },
});
Tweet.belongsTo(User); // 자동적으로 users 테이블의 id(pk) 값을 가지고 외래키를 만들어 참조 시켜준다.

// const SELECT_JOIN = 'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id';
// const ORDER_DESC = 'ORDER BY tw.createdAt DESC';

const INCLUDE_USER = {
  attributes: [
    'id',
    'text',
    'createdAt',
    'userId',
    [Sequelize.col('user.name'), 'name'], [Sequelize.col('user.username'), 'username'], [Sequelize.col('user.url'), 'url'],
  ],
  include: {
    model: User,
    attributes:[],
  },
}

const ORDER_DESC = {
  order:[['createdAt', 'DESC']],
};

export async function getAll() {
  return Tweet.findAll({...INCLUDE_USER, ...ORDER_DESC});
  }

export async function getAllByUsername(username) {
  return Tweet.findAll({...INCLUDE_USER, ...ORDER_DESC, include: {
    ...INCLUDE_USER.include,
    where: {username},
  },
  });
}

export async function getById(id) {
  return Tweet.findOne({
    where: {id},
    ...INCLUDE_USER,
  });
}

export async function create(text, userId) {
  return Tweet.create({text, userId}).then((data) => {
    this.getById(data.dataValues.id);
  })
}

export async function update(id, text) {
  return Tweet.findByPk(id, INCLUDE_USER) //
  .then(tweet => {
    tweet.text = text;
    return tweet.save();
  })
}

export async function remove(id) {
  return Tweet.findByPk(id, INCLUDE_USER) //
  .then(tweet => {
    tweet.destroy();
  })
}
