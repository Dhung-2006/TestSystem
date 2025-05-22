const { spawn } = require('child_process');
const express = require('express');
const app = express();





app.listen(5500 , ()=>{
  console.log("server start at http://localhost:5500"); 
}) 

app.get('/testpost', (req, res) => {

 
  console.log(req.query.name);
  res.send('Received');
});

app.post('/upload' , (req , res) =>{
  console.log("imimn");
  const funcToRun = "getDataTable";
  const filePath = "./convert_content/1.中壢高商(14901).xlsx"
  const py = spawn('python' , ['process.py' , funcToRun , filePath])
  let outputData = ''
  py.stdout.on('data' , (data) =>{
    outputData += data.toString('utf-8')
  })
  py.stderr.on('data', (data) => {
    outputData += data.toString()
  });


  py.stdout.on('end', () => {
    try {
      const jsonData = JSON.parse(outputData);
      console.log('接收到 JSON:', jsonData);
    } catch (err) {
      console.error('JSON 解析失敗:', err);
    }
  });
})

