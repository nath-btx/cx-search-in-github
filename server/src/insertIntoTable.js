const initDatabase = require('./database')
const dotenv = require('dotenv')

const knex = require('knex')({
  client :'pg',
connection: {
  host : '127.0.0.1',
  user: 'postgres',
  password: 'trombone',
      database: 'searchgithub',
  }
})


module.exports = function insertIntoTable(data) {
    var keys = Object.keys(data)
  
    knex.schema.hasTable('users').then((bool) => {
      if(bool){
        console.log('existe')
      }else{
        console.log('n\'existe pas')
        knex.schema.createTable('users',function(t) {
          t.integer('id').primary()
          for(let i = 0; i < keys.length; i++){
            if (keys[i] != 'id')
              t.string(keys[i],300)
          }
        }).then(function(){
          console.log("table created")
        })
      }
    }).then(()=>{
    knex.select("id").from("users").where("id", data['id']).then(userList => {
      if (userList.length === 0) {
        return knex('users').insert({id : data['id']}).then(() => {
          for (i = 0;i < keys.length;i++){
            if (keys[i] != 'id'){
              knex('users').where({id : data['id']}).update({[keys[i]] : data[keys[i]]})
              .then(() =>{
              })
            }
          }
        })
      }
    })
  })
  }


  