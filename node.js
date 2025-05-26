const { spawn } = require('child_process');
const express = require('express');
const app = express();
const path = require("path")
const { Sequelize, DataTypes } = require('sequelize');
app.use(express.json())
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sqlite.db' // ✅ 自動建立 sqlite 檔案
});

const userAccounts = sequelize.define('userAccounts',{
  userID:{
    primaryKey :true,
    autoIncrement :true,
    type: DataTypes.STRING,
  },
  userAcc:{
    type: DataTypes.STRING,
    allowNull:false
  },
  userPsd:{
    type:DataTypes.STRING,
    allowNull:false
  }
});

const fileInfo = sequelize.define('fileInfo' , {
  fileID:{
    primaryKey :true , 
    autoIncremen :true,
    type:DataTypes.STRING
  },
  fileOwner:{
    type:DataTypes.STRING,
    allowNull:false
  },
  fileType:{
    type:DataTypes.ENUM('Excel' , 'Word'),
    allowNull:false
  },
  fileName:{
    type:DataTypes.STRING,
    allowNull:false
  }
  
})

 app.get('/' , async(req,res)=>{
  res.sendFile(path.join(__dirname, 'test.html'));
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  console.log(`visitor:${ip}`)
});

app.listen(5500 , ()=>{
  console.log("server start at http://localhost:5500"); 
}) 

app.get('/testpost', (req, res) => {

 
  console.log(req.query.name);
  res.send('Received');
});

app.post('/upload' , (req , res) =>{
 console.log('123')
  const funcToRun = "getDataTable";
  // const filePath = "./convert_content/1.中壢高商(14901).xlsx"
  const getFilePath = req.body['filePath']
  // const py = spawn('python' , ['process.py' , funcToRun , filePath])
  // let outputData = ''
  // py.stdout.on('data' , (data) =>{
  //   outputData += data.toString('utf-8')
  // })
  // py.stderr.on('data', (data) => {
  //   outputData += data.toString()
  // });

  // py.stdout.on('end', () => {
  //   try {
  //     const jsonData = JSON.parse(outputData);
  //     console.log('接收到 JSON:', jsonData);
  //   } catch (err) {
  //     console.error('JSON 解析失敗:', err);
  //   }
  // });
})

