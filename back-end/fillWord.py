from docx import *

inputJson = {
     
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
# worddic={
#     '身分證號碼':'身分證號',
#     '中文姓名':'姓名',
#     '出生日期':'出生日期',
#     '英文姓名':'英文姓名',
#     '原住民傳統姓名並列之羅馬拼音':'身分證上原住民姓名之羅馬拼音',
#     '通訊地址':'通訊地址',
#     '戶籍地址':'戶籍地址',
#     '就讀學校':'報檢人參檢學校',
#     '就讀科系':'科系',
#     '年級':'年級',
#     '班別':'班別',
#     '上課別':'部別'
#     }
wordPath = './back-end/convert_content/5.報名表正面.docx'
wordDoc = Document(wordPath)
table = wordDoc.tables[0]
nowCommand = ''
filledInfo = set()
for idxr, row in enumerate(table.rows):
    for idxc , cell in enumerate(table._cells):
        if cell.text == "" and table.cell(idxr,idxc-1) not in filledInfo:
            fillitemIdx = table.cell(idxr,idxc-1).text
            try:
                cell.text = inputJson[fillitemIdx]
                filledInfo.add(inputJson[fillitemIdx])
            except:
                pass
wordDoc.save("./back-end/convert_content/testdoc.docx")
