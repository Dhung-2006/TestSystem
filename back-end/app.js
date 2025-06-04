const { spawn } = require('child_process');
const express = require('express');
const app = express();
const path = require("path")
const session  = require("express-session");
const nodemailer = require("nodemailer")
const { sequelize, userAccounts  , fileInfo} = require('./sqlSetting');
const { where } = require('sequelize');
const { stat } = require('fs');
const { count } = require('console');
const cors = require('cors')


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

app.post('/signup' , (req,res) =>{
  const applier  = req.body.signEmail;
  console.log(applier);
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "systemyuntech@gmail.com",
      pass: "mgve yqhw btkx jycf"
    }
  })

  const randomCode = Math.floor(Math.random()*9000)+1000;

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

app.get("/createOneAcc" , async(req, res) => {
  sequelize.sync().then(() => {
    userAccounts.create({
      userAcc : "dexter",
      userPsd : "dexter"
    }).then(()=>{
      console.log("account already ready")
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

app.listen(3000 , ()=>{
  console.log("server start at http://localhost:3000"); 
}) 