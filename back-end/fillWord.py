from docx import *
from docx.shared import Pt
from docx.oxml.ns import qn
from docx.enum.text import WD_LINE_SPACING
from docx.shared import Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from docx.shared import Pt
from docx.shared import Cm

inputJsons = [{
    '身分證號碼': 'H126312469',
    '中文姓名': '卓宸宸',
    '出生日期': '95830',
    '報簡職類': '會計資訊',
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
  
},
{
    '身分證號碼': 'H126363073',
    '中文姓名': '石廷廷',
    '出生日期': '94917',
    '報簡職類': '視覺',
    '英文姓名': 'SHI,SHAO-TING',
    '檢定區別': '全測',
    '通訊地址': '桃園市桃園區幸福路',
    '戶籍地址': '桃園市桃園區XXX',
    '聯絡電話(住宅)': '034551235',
    '聯絡電話(手機)': '953083990',
    '就讀學校': '中壢家商',
    '就讀科系': '商業經營科',
    '上課別': '日間部',
    '年級': '1',
    '班級': '19',
    '座號': '2',
    '身分別': '無',
    '學制': '高級中學'
  }]
for inputJson in inputJsons:
    wordPath = './back-end/convert_content/5.報名表正面.docx'
    wordDoc = Document(wordPath)
    table = wordDoc.tables[0]
    nowCommand = ''
    filledInfo = set()
    for idxr, row in enumerate(table.rows):
        for idxc , cell in enumerate(row.cells):
            if cell.text == "" and table.cell(idxr,idxc-1) not in filledInfo:
                fillitemIdx = table.cell(idxr,idxc-1).text.replace('\n','')
                try:
                    cell.text = inputJson[fillitemIdx]
                    filledInfo.add(inputJson[fillitemIdx])
                except:
                    pass
            elif table.cell(idxr,idxc-1).text.replace("\n" , '') == "報檢職類":
                type_dict = {
                    '視覺':'視覺傳達設計',
                    '會計人工':'會計事務 -人工記帳',
                    '會計資訊':'會計事務 -資訊',
                    '會資':'會計事務 -資訊',
                    '門市':'門市服務'
                }
                fillInWd = cell.text
                fillLoc = fillInWd.index(type_dict[inputJson['報簡職類']])
                aboveWd = fillInWd[:fillLoc-1]
                behindWd = fillInWd[fillLoc:]
                fiWd = aboveWd + "■" + behindWd
                fillLoc = fiWd.index('網頁設計')
                aboveWd  = fiWd[:fillLoc-2]
                behindWd = fiWd[fillLoc-1:]
                fiWd = aboveWd + behindWd
                fillLoc = fiWd.index('視覺傳達設計')
                aboveWd  = fiWd[:fillLoc-3]
                behindWd = fiWd[fillLoc-1:]
                fiWd = aboveWd + behindWd
                for paragraph in cell.paragraphs:
                    for run in paragraph.runs:
                        run.clear()
                paragraph  = cell.paragraphs[0]
                paragraph_format = paragraph.paragraph_format
                paragraph_format.line_spacing = Pt(14)
                run = paragraph.add_run(fiWd)
                run.font.size = Pt(11.5)
                run.font.name = 'Times New Roman' 
                run._element.rPr.rFonts.set(qn('w:eastAsia'), '標楷體')
                spacing = OxmlElement('w:spacing')
                spacing.set(qn('w:val'), '0')  
            elif table.cell(idxr,idxc-1).text.replace("\n" , '') == "英文姓名":
                paragraphs = cell.paragraphs
                paragraphs[0].text  = inputJson['英文姓名']
            elif table.cell(idxr,idxc-1).text.replace("\n" , '') == "檢定區別" :
                testTypeDic = {
                    "全測":"學術科全測 ",
                    "免術":"A免試學科",
                    "免學":"B免試術科"
                }
                if cell.text  in filledInfo:
                    continue
                paragraphs = cell.paragraphs
                for idx , paragraph in enumerate(paragraphs):
                    paragraph_format = paragraph.paragraph_format
                    paragraph_format.line_spacing = Pt(8)
                    if idx ==0:
                        finalText = "□" + paragraph.text[1:]
                        paragraph.clear()
                        run = paragraph.add_run(finalText)
                        run.font.size = Pt(11.2)
                        run.font.name = 'Times New Roman' 
                        run._element.rPr.rFonts.set(qn('w:eastAsia'), '標楷體')
                        rPr = run._element.get_or_add_rPr()
                        spacing = OxmlElement('w:spacing')
                        spacing.set(qn('w:val'), '0.5')  
                        rPr.append(spacing)
                    else:
                        finalText = "□" + paragraph.text[1:]
                        paragraph.clear()
                        aboveWord = finalText[:6]
                        behindWord = finalText[6:]
                        run =paragraph.add_run(aboveWord)
                        run.font.size = Pt(11.2)
                        run.font.name = 'Times New Roman' 
                        run._element.rPr.rFonts.set(qn('w:eastAsia'), '標楷體')
                        run = paragraph.add_run(behindWord)
                        run.font.size = Pt(8)
                        run.font.name = 'Times New Roman' 
                        run._element.rPr.rFonts.set(qn('w:eastAsia'), '標楷體')
                        rPr = run._element.get_or_add_rPr()
                        spacing = OxmlElement('w:spacing')
                        spacing.set(qn('w:val'), '0.5')  
                        rPr.append(spacing)
                for paragraph in paragraphs:
                    paragraph_format = paragraph.paragraph_format
                    paragraph_format.line_spacing = Pt(8)
                    if testTypeDic[inputJson['檢定區別']] in paragraph.text:
                        if cell.text in filledInfo:
                            continue
                        if testTypeDic[inputJson['檢定區別']] == "學術科全測":
                            finalText = "■" + paragraph.text[1:]
                            paragraph.clear()
                            run = paragraph.add_run(finalText)
                            run.font.size = Pt(11.2)
                            run.font.name = 'Times New Roman' 
                            run._element.rPr.rFonts.set(qn('w:eastAsia'), '標楷體')
                            rPr = run._element.get_or_add_rPr()
                            spacing = OxmlElement('w:spacing')
                            spacing.set(qn('w:val'), '0.5')  
                            rPr.append(spacing)
                        else:        
                            finalText = "■" + paragraph.text[1:]
                            paragraph.clear()
                            aboveWord = finalText[:6]
                            behindWord = finalText[6:]
                            run =paragraph.add_run(aboveWord)
                            run.font.size = Pt(11.2)
                            run.font.name = 'Times New Roman' 
                            run._element.rPr.rFonts.set(qn('w:eastAsia'), '標楷體')
                            run = paragraph.add_run(behindWord)
                            run.font.size = Pt(7.8)
                            run.font.name = 'Times New Roman' 
                            run._element.rPr.rFonts.set(qn('w:eastAsia'), '標楷體')
                            rPr = run._element.get_or_add_rPr()
                            spacing = OxmlElement('w:spacing')
                            spacing.set(qn('w:val'), '0.5')  
                            rPr.append(spacing)
                filledInfo.add(cell.text)
            elif table.cell(idxr,idxc-1).text.replace("\n" , '') == "聯絡電話" :
                if cell.text.replace("\n" , "")  in filledInfo:
                    print("im jump out")
                    continue
                paragraphs =  cell.paragraphs
                for paragraph in paragraphs:
                    if "住宅" in paragraph.text:
                        paragraph.text += inputJson['聯絡電話(住宅)']
                        runs = paragraph.runs
                        for run in runs:
                            run.font.size = Pt(12)
                            run.font.name = "Times New Roman"
                            run._element.rPr.rFonts.set(qn('w:eastAsia'), '標楷體')

                    elif "手機" in paragraph.text:
                        paragraph.text += inputJson['聯絡電話(手機)']
                        runs = paragraph.runs
                        for run in runs:
                            run.font.size = Pt(12)
                            run.font.name = "Times New Roman"
                            run._element.rPr.rFonts.set(qn('w:eastAsia'), '標楷體')
                filledInfo.add(cell.text.replace("\n" , ""))
                # print(cell.text.replace("\n" , ""))
            elif  "身分別" in  table.cell(idxr,idxc-1).text.replace("\n" , '') :
                paragraphs = cell.paragraphs
                fillin = inputJson['身分別']
                # 先做資料格式設定
                for paragraph in paragraphs :
                    paragraph.paragraph_format.line_spacing = Pt(8.5)
                    for run in paragraph.runs:
                        run.font.size = Pt(8)
                for paragraph in paragraphs:
                    if inputJson['身分別'] in paragraph.text:
                        if cell.text in filledInfo:
                            continue
                        findWdLoc = paragraph.text.index(inputJson['身分別'])
                        aboveWd = paragraph.text[:findWdLoc-3]
                        behindWd = "■" + paragraph.text[findWdLoc-2:]
                        paragraph.text = aboveWd + behindWd
                        for run in paragraph.runs:
                            run.font.size = Pt(8)
                            run.font.name = "Times New Roman"
                            run._element.rPr.rFonts.set(qn('w:eastAsia'), '標楷體')
                for paragraph in paragraphs:
                    newString= ""
                    for wd in paragraph.text:
                        if wd =="□":
                            newString += "□"
                        else:
                            newString += wd
                    paragraph.text = newString
                    for run in paragraph.runs:
                        run.font.size = Pt(8)
                        run.font.name = "Times New Roman"
                        run._element.rPr.rFonts.set(qn('w:eastAsia'), '標楷體')
                filledInfo.add(cell.text)
            elif cell.text  == "上課別":
                targetCell  = table.cell(idxr+1 , idxc)
                paragraphs = targetCell.paragraphs
                paragraphs[0].text = inputJson['上課別']
            elif cell.text  == "年級":
                targetCell  = table.cell(idxr+1 , idxc)
                paragraphs = targetCell.paragraphs
                paragraphs[0].text = inputJson["年級"]
            elif cell.text  == "班別":
                targetCell  = table.cell(idxr+1 , idxc)
                paragraphs = targetCell.paragraphs
                paragraphs[0].text = inputJson['班級']
            elif cell.text  == "座號":
                targetCell  = table.cell(idxr+1 , idxc)
                paragraphs = targetCell.paragraphs
                paragraphs[0].text = inputJson['座號']
            elif  "學制" in  table.cell(idxr,idxc-1).text.replace("\n" , '') :
                paragraphs = cell.paragraphs
                for paragraph in paragraphs :
                    paragraph.paragraph_format.line_spacing = Pt(12)
                    for run in paragraph.runs:
                        run.font.size = Pt(12)
                for paragraph in paragraphs:
                    if inputJson['學制'] in paragraph.text:
                        if cell.text in filledInfo:
                            continue
                        findWdLoc = paragraph.text.index(inputJson['學制'])
                        aboveWd = paragraph.text[:findWdLoc-1]
                        behindWd = "■" + paragraph.text[findWdLoc:]
                        paragraph.text = aboveWd + behindWd
                        for run in paragraph.runs:
                            run.font.size = Pt(12)
                            run.font.name = "Times New Roman"
                            run._element.rPr.rFonts.set(qn('w:eastAsia'), '標楷體')
                for paragraph in paragraphs:
                    newString= ""
                    for wd in paragraph.text:
                        if wd =="□":
                            newString += "□"
                        else:
                            newString += wd
                    paragraph.text = newString
                    for run in paragraph.runs:
                        run.font.size = Pt(12)
                        run.font.name = "Times New Roman"
                        run._element.rPr.rFonts.set(qn('w:eastAsia'), '標楷體')
                filledInfo.add(cell.text)
            elif  "實貼身分證【正面】" in  table.cell(idxr,idxc-1).text.replace("\n" , '') and cell.text =="    ":
                paragraphs = cell.paragraphs
                for paragraph in paragraphs:
                    paragraph.clear()
                
                paragraph = cell.add_paragraph()
                paragraph.alignment  = WD_ALIGN_PARAGRAPH.CENTER
                run = paragraph.add_run()
                run.add_picture(f'./back-end/convert_content/{inputJson["身分證號碼"]}.jpg')
                run = paragraph.add_run()
                run.add_picture(f'./back-end/convert_content/{inputJson["身分證號碼"]}.jpg')
        wordDoc.save(f"./back-end/convert_content/{inputJson['身分證號碼']}.docx")
