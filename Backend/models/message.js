const Sequelize=require('sequelize')
const sequelize=require('../util/database')
const Message=sequelize.define('messages',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    msg:{
        type:Sequelize.STRING
    },
    
    name:{
        type:Sequelize.STRING
       
        
    },
    gId:{
        type:Sequelize.INTEGER
    }

})
module.exports=Message