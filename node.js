
const xlsx = require("xlsx")
const file_path = "./1.中壢高商(14901).xlsx"

const fileContent  = xlsx.readFile(file_path)
console.log(fileContent.SheetNames[0])