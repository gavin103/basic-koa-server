const USER = 'gavin'
const PW = 'Passw0rd'
const DB = 'db_users'
const MONGO_URI = `mongodb+srv://${USER}:${PW}@gavin-test1.iwsf0.mongodb.net/${DB}?retryWrites=true&w=majority`
const USERS_COLLECTION = 'c_users'
const GOODS_COLLECTION = 'c_goods'
module.exports = {
  MONGO_URI,
  USERS_COLLECTION,
  GOODS_COLLECTION
}