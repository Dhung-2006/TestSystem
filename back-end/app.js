const { spawn } = require('child_process');
// import { firebasedataconnect } from 'googleapis/build/src/apis/firebasedataconnect';
// import { useImperativeHandle } from 'react';
const express = require('express');
const app = express();
const path = require("path")
const session  = require("express-session");
const nodemailer = require("nodemailer")
const { sequelize, userAccounts  , fileInfo , jsonFile} = require('./sqlSetting');
const { where, json } = require('sequelize');
const { stat } = require('fs');
const { count, log } = require('console');
const cors = require('cors');
const fs = require('fs');
const { verbose } = require('sqlite3');
const { Json } = require('sequelize/lib/utils');
// const { assuredworkloads } = require('googleapis/build/src/apis/assuredworkloads');


app.use(express.urlencoded({extended:true}))

app.use(cors({
  origin: "http://localhost:5173", // 只允許這個來源的前端請求
  credentials : true
}));
app.use(express.json())


app.get('/' , async(req,res)=>{
  res.sendFile(path.join(__dirname, 'test.html'));
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  console.log(`visitor:${ip}`)
});

app.get('/cleanAllData', (req, res) => {
  fs.unlink('./sqlite.db', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('刪除資料庫失敗');
      return;
    }

    fs.rm('./user_data/dexter', { recursive: true, force: true }, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('刪除資料夾失敗');
        return;
      }

      res.send('刪除成功');
    });
  });
});

// app.get('/autoset' , async(req,res) =>{
//   const createOneAcc =await fetch('http://localhost:3000/createOneAcc')
//   const upload = await fetch('http://localhost:3000/upload')
// })



app.get('/upload', async (req, res) => {  
  // -----------------------------------------------
  const funcToRun = "getDataTable";
  const filePath = "./convert_content/1.中壢高商(14901).xlsx"
  const userName = "dexter"
  const cFileName = "test-1"
  // const getFilePath = req.body['filePath']
  // const py = spawn('python' , ['process.py' , funcToRun , filePath])
  // -------------------------------------------------
  const py = spawn('python', ['process.py', filePath, userName, cFileName])
  const folderName = path.join(__dirname, "user_data" , userName , cFileName)
  const fullTest  = path.join(__dirname, "user_data" , userName , cFileName , "full_Test")
  const studyTest = path.join(__dirname, "user_data" , userName , cFileName , "study_Test")
  const technicalTest = path.join(__dirname, "user_data" , userName , cFileName , "technical_Test")
  const imagePath = path.join(__dirname, "user_data" , userName , cFileName , "image")
  await fs.mkdirSync(folderName, { recursive: true });
  await fs.mkdirSync(fullTest, { recursive: true });
  await fs.mkdirSync(studyTest, { recursive: true });   
  await fs.mkdirSync(technicalTest, { recursive: true });   
  await fs.mkdirSync(imagePath, { recursive: true });   
  let outputData = ''
  py.stdout.on('data', (data) => {
    outputData += data.toString('utf-8')
  })

  py.stderr.on('data' , (data) =>{
    console.log(data.toString('utf-8'));
  })

  py.on('close', () => {
    console.log(outputData)
    sequelize.sync().then(() => {
      jsonFile.create({
        jsonName: cFileName,
        userAcc: userName
      }).then(() => {
        console.log("Json File has already prepared")
      }).catch(err => {
        console.log(err.name)
      })
    })
  })
})

app.post('/signup' , (req,res) =>{
  const applier  = req.body.signEmail;
  // console.log(req.body.signEmail);
  
  console.log(applier);
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "systemyuntech@gmail.com",
      pass: "mgve yqhw btkx jycf"
    }
  })

  const randomCode = Math.floor(Math.random()*9000)+1000;
  console.log(randomCode)
  const mailOptions = {
    from: "TestSystem",
    to: applier,
    subject: "TestSystem驗證碼",
    text: `驗證碼為"${randomCode}`
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.json(false)
    } else {
      res.json(randomCode);
    }
  })
})

app.post("/login" ,async (req, res) =>{
  const reqAcc = req.body.loginAccount;
  const reqPsd  = req.body.loginPassword;
  sequelize.sync().then(async()=>{
    const targetAcc = await userAccounts.findOne({where:{
      userAcc:reqAcc
      }
    });
    console.log(`targetAcc:${targetAcc.userAcc}`);
    console.log(`targetPsd:${targetAcc.userPsd}`)
    if (targetAcc.userPsd === reqPsd){
      res.json({
        'useraccount':targetAcc.userAcc,
        "status" : "true"
      })
      }else{
        res.json({"status": "false"})
      }
  })
})

app.post("/createOneAcc" , async(req, res) => {
  const userAccount = req.body.signAccount
  const userPassword = req.body.signPassword
  const newFolderPath = path.join(__dirname , "user_data" , userAccount)
  sequelize.sync().then(() => {
    userAccounts.create({
      userAcc : userAccount,
      userPsd : userPassword
    }).then(()=>{
      fs.mkdirSync(newFolderPath, { recursive: true }); 
      console.log("account already ready")
      res.cookie("userAccount" , userAccount ,{
        httpOnly:false,
        sameSite:"None",
        secure :true
      })   
      res.status(200).send("成功了!!")
    }).catch(err=>{
      if(err.name === "SequelizeUniqueConstraintError"){
        console.log('帳號重複')
        return;
      };
    })
  });
})


app.get("/desTestAcc", async (req, res) => {
  try {
    const accounts = await userAccounts.findAll();
    for (const account of accounts) {
      console.log(`useracc: ${account.userAcc} has been deleted`);
      await account.destroy();  
    }
    res.json({ message: "All accounts deleted" });
  } catch (error) {
    console.error("刪除帳號時發生錯誤:", error);
    res.status(500).json({ error: "刪除失敗" });
  }
});

app.get("/showAllAcc" , async(req,res)=>{
    sequelize.sync().then(async()=>{
      const accounts = await userAccounts.findAll();
      var counter=0 ;
      for (const account of accounts){
        counter++;
        console.log(`userID ${counter}:${account.userID}`)
        console.log(`userAccount ${counter} :${account.userAcc}`);
        console.log(`userPassword ${counter} :${account.userPsd}`);
      }
    })
})

app.get("/seeAllJson" , async(req,res)=>{
  sequelize.sync().then(async()=>{
      const files = await jsonFile.findAll();
      var counter=0 ;
      for (const file of files){
        counter++;
        console.log(` ${counter}:${file.jsonID}`)
        console.log(` ${counter} :${file.jsonName}`);
        console.log(` ${counter} :${file.userAcc}`);
      }
  })
})

// function verify_regular(){
  
// }

app.get("/fillWd" , async(req,res)=>{
  const userName = "dexter" ;//req.body['username']
  const chooseFile = "test-1" ;//req.body['test-1.json]
  // const filePath = path.join(__dirname  , "user_data" , userName , )
  const py = spawn('python' , ['fillWord.py' , userName , chooseFile]);
  let outputData =''
  py.stdout.on('data' , (data)=>{
    outputData += data.toString('utf-8')
  });

  py.stderr.on('data', (data) => {
    console.error("Python error:", data.toString('utf-8'));  
  });

  py.on('close' , ()=>{
    console.log(outputData)
  })
});

app.get("/verifyData", (req, res) => {
  const userName = "dexter";
  const chooseFile = "test-1";
  let badInfoList = []
  fs.readFile(`./user_data/${userName}/${chooseFile}/${chooseFile}.json`, "utf8", (err, loadJsonList) => {
    if (err) {
      console.log(err)
      return;
    }
    const jsonList =JSON.parse(loadJsonList)
    jsonList.forEach((jsonData , idx) => {
      const badInfo = verify_data(jsonData, idx)
      if (badInfo != null){
        badInfoList.push(badInfo)
      }
    });
  })
  // verify_data()
})

function verify_data(json_data ,idx){
  const idRegex = /^[A-Z][12]\d{8}$/;
  const id = json_data["身分證號碼"];
  let badContent = []
  if (!idRegex.test(id)) {
    // console.log("格式錯誤");
    badContent.push("身分證號碼")
  }

  const birthRegex = /^\d{5}$/
  const birthDay = json_data["出生日期"]  
  // if (!birthRegex.test(b))
}

app.listen(3000 , ()=>{
  console.log("server is running"); 
})

