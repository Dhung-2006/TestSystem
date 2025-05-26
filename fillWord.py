from docx import *

initial_json = {
     
    '身分證號碼': 'H126312469',
    '中文姓名': '卓宸宸',
    '出生日期': '95830',
    '報簡職類': '會計人工',
    '英文姓名': 'ZHUO,YU-CHEN',
    '檢定區別': '全測',
    '通訊地址': '桃園市中壢區中北',
    '戶籍地址': '桃園市中壢區中北路',
    '聯絡電話(住宅)': '034551238',
    '聯絡電話(手機)': '953083990',
    '就讀學校': '中壢家商',
    '就讀科系': '商業經營科',
    '上課別': '日間部',
    '年級': '1',
    '班級': '19',
    '座號': '5',
    '身分別': '身心障礙',
    '學制': '高級中學'
  
}

wordPath = './convert_content/5.報名表正面.docx'
wordDoc = Document(wordPath)
table = wordDoc.tables[0]
nowCommand = ''
testSet = set()
for idxr, row in enumerate(table.rows):
    for idxc , cell in enumerate(table._cells):
      
      pass