import pandas as pd 
import numpy as np

def getDataTable(filePath):
    fullTestTable = pd.read_excel(filePath, sheet_name='套印用資料-全測')
    getData(filePath,fullTestTable)
    studyTestTable = pd.read_excel(filePath, sheet_name='套印用資料-免學')
    getData(filePath,studyTestTable)
    technicalTestTable = pd.read_excel(filePath, sheet_name='套印用資料-免術')
    getData(filePath,technicalTestTable)
    
def getMajorCode(filePath):
    dataframe= pd.read_excel(filePath,sheet_name='代號',usecols=[0])
    majorLst = [data[0] for data in dataframe.values]
    return majorLst

def getData(filePath,dataFrame):
    dataRows = dataFrame.shape[0]
    dataJsonLst = []
    for i in range(dataRows):
        identification = dataFrame.loc[i , '身分證號碼']
        chName = dataFrame.loc[i, '中文姓名']
        birthYear = str(dataFrame.loc[i,'出生年'])
        birthMounth = str(dataFrame.loc[i,'出生月'])
        birthDay = str(dataFrame.loc[i, '出生日'])
        datajson = {
            '身分證號碼':identification,
            '中文姓名':chName,
            '出生日期':birthYear + birthMounth + birthDay,
            '報簡職類':'',
            '英文姓名':'',
            '戶籍地址':'',
            '聯絡電話(住宅)':'',
            '聯絡電話(手機)':'',
            '就讀學校':'',
            '就讀科系':'',
            '上課別':'',
            '年級':'',
            '班級':'',
            '座號':'',
            '身分別':'',
            '學制':''
        }
        pass

filePath= "./convert_content/1.中壢高商(14901).xlsx"
getClassCode(filePath)
