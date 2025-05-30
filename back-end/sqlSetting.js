const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sqlite.db' // ✅ 自動建立 sqlite 檔案
});

const userAccounts = sequelize.define('userAccounts',{
  userID:{
    primaryKey :true,
    autoIncrement :true,
    type: DataTypes.INTEGER,
  },
  userAcc:{
    type: DataTypes.STRING,
    unique : true, 
    allowNull:false
  },
  userPsd:{
    type:DataTypes.STRING,
    unique : true, 
    allowNull:false
  }
});

const fileInfo = sequelize.define('fileInfo' , {
  fileID:{
    primaryKey :true , 
    autoIncrement :true,
    type:DataTypes.INTEGER
  },
  fileOwner:{
    type:DataTypes.STRING,
    unique : true, 
    allowNull:false
  },
  fileType:{
    type:DataTypes.ENUM('Excel' , 'Word'),
    unique : true,
    allowNull:false
  },
  fileName:{
    type:DataTypes.STRING,
    unique : true,
    allowNull:false
  }
  
})

module.exports ={
    sequelize , userAccounts , fileInfo
}

