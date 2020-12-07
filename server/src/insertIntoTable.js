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


// function insertIntoDatabase(data) {

//     console.log(data)

//     knex.schema.dropTableIfExists('users', true)
//     .then(function(){
//         return knex.schema.createTable('users',function(t) {
//             t.integer('numéro').primary()
//             for(let i = 1; i<keys.length; i++){
//                 t.string(keys[i],300)
//             }
//         })


//     // })
//     // .then(() => {
//     //     for(let i = 0; i < file.length; i++){
//     //         knex('users').insert({numéro : file[i].numéro, nom : file[i].nom, nomen : file[i].nomen }).then(() => {
//     //             console.log(`${file[i].nom} added`)
//     //         })
//     //         for(let j = 0; j < keys.length; j++){
//     //             if (file[i][keys[j]] != undefined){
//     //                 knex('users').where({numéro : file[i].numéro}).update({[keys[j]] : file[i][keys[j]]}).then(() =>{
//     //                 })
//     //             }
//     //         }
//     //     }
//      })
// }




module.exports = function insertIntoTable(data) {
    var keys = Object.keys(data)
  
    knex.schema.hasTable('users').then((bool) => {
      console.log("bool = " + bool)
      if(bool){
        console.log('existe')
      }else{
        console.log('n\'existe pas')
        knex.schema.createTable('users',function(t) {
          t.integer('id').primary()
          for(let i = 0; i<keys.length; i++){
            if (keys[i] != 'id')
              t.string(keys[i],300)
          }
        }).then(function(){
          console.log("database created")
        })
      }
    }).then(()=>{
    knex.select("id").from("users").where("id", data['id']).then(userList => {
      if (userList.length === 0) {
        return knex('users').insert({id : data['id']}).then(() => {
          for (i = 0;i < keys.length;i++){
            if (keys[i] != 'id'){
              console.log("data = " + data[keys[i]])
              console.log('keys = ' + keys[i])
              knex('users').where({id : data['id']}).update({[keys[i]] : data[keys[i]]})
              .then(() =>{
                console.log("inséré dans la bd")
              })
            }
          }
        })
      }
    })
  })
  }


  