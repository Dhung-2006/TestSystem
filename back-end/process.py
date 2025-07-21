import pandas as pd 
import numpy as np
import sys
import json

userName = ""
cFileName = ""
sys.stdout.reconfigure(encoding='utf-8')  # ✅ 保證輸出為 UTF-8（避免 Windows 預設 gbk/cp950）

def getDataTable(filePath):
    # print("im in")
    fullTestTable = pd.read_excel(filePath, sheet_name='套印用資料-全測')
    getData(filePath,fullTestTable)
    # studyTestTable = pd.read_excel(filePath, sheet_name='套印用資料-免學')
    # getData(filePath,studyTestTable)
    # technicalTestTable = pd.read_excel(filePath, sheet_name='套印用資料-免術')
    # getData(filePath,technicalTestTable)
    
def getMajorCode(filePath):
    dataframe= pd.read_excel(filePath,sheet_name='代號',usecols=[0])
    majorLst = [data[0] for data in dataframe.values]
    return majorLst

def testTypeCode(filePath):
    dataframe = pd.read_excel(filePath , sheet_name="代號"  , usecols=[15])
    testTypeLst = [data[0] for data in dataframe.values]
    return testTypeLst

def classCode(filePath):
    dataframe = pd.read_excel(filePath , sheet_name= "代號" , usecols= [4])
    classCodeLst = [data[0] for data in dataframe.values]
    return classCodeLst

def getSchCode(filePath):
    dataframe = pd.read_excel(filePath,sheet_name="代號" , usecols=[8,9,10])
    SchCodeLst = [data[1] for data in dataframe.values]
    return SchCodeLst

def getStudyType(filePath):
    dataframe = pd.read_excel(filePath ,sheet_name="代號" , usecols=[18])
    StudyType = [data[0] for data in dataframe.values]
    return StudyType

def getSpecificCode(filePath):
    dataframe = pd.read_excel(filePath , sheet_name="代號" , usecols=[21])
    SpecificLst = [ data[0] for data in dataframe.values]
    return SpecificLst

def getSchoolCode( filePath):
    dataframe = pd.read_excel(filePath , sheet_name="代號" , usecols=[12])
    schoolTypeLst = [data[0] for data in dataframe.values]
    return schoolTypeLst

def getData(filePath,dataFrame):
    dataRows = dataFrame.shape[0]
    dataJsonLst = []
    for i in range(dataRows):
        identification = dataFrame.loc[i , '身分證號碼']
        chName = dataFrame.loc[i, '中文姓名']
        birthYear = str(dataFrame.loc[i,'出生年'])
        birthMounth = str(dataFrame.loc[i,'出生月'])
        birthDay = str(dataFrame.loc[i, '出生日'])
        testTypeLst = testTypeCode(filePath)    
        testTypeID = int(dataFrame.loc[i,"測驗類別"])
        testType = testTypeLst[testTypeID-1]
        engName = str(dataFrame.loc[i,"英文姓名"])
        testSubject = testType[:-2]
        testType  = testType[-2:]
        callAdr = str(dataFrame.loc[i,"通訊地址"])
        liveAdr = str(dataFrame.loc[i,"戶籍地址"])
        teleArea  = str(dataFrame.loc[i , "電話(區域號碼)"])
        teleNum = str(dataFrame.loc[i,"電話"])
        cellNum = str(dataFrame.loc[i,"行動電話"])
        schCode = str(dataFrame.loc[i,"學校"])
        SchCodeLst = getSchCode(filePath)
        stdSch = SchCodeLst[int(schCode)-1]
        majorCodeLst = getMajorCode(filePath)
        majorCode = int(dataFrame.loc[i,"科系"]) 
        major = majorCodeLst[majorCode-1]
        StudyTypeLst = getStudyType(filePath)
        studyCode = int(dataFrame.loc[i, "學制"])
        studyType  = StudyTypeLst[studyCode-1]
        year = str(dataFrame.loc[i, "年級"])
        sclass = str(dataFrame.loc[i,"班級"])
        number  = str(dataFrame.loc[i,"座號"])
        specificLst = getSpecificCode(filePath)
        specificCode = int(dataFrame.loc[i,"特定對象"])
        specificType = "無"
        specificType = specificLst[specificCode-1 ]if specificCode!=0 else "無"
        schoolTypeCode = dataFrame.loc[i,"學制"]
        schoolTypeLst = getSchoolCode(filePath)
        schoolType = schoolTypeLst[schoolTypeCode]
        datajson = {
            '身分證號碼':identification,
            '中文姓名':chName,
            '出生日期':birthYear + birthMounth + birthDay,  
            '報簡職類':testSubject,
            '英文姓名':engName,
            '檢定區別':testType,
            '通訊地址':callAdr,
            '戶籍地址':liveAdr,
            '聯絡電話(住宅)':"0" + teleArea + teleNum,
            '聯絡電話(手機)':cellNum,
            '就讀學校':stdSch,
            '就讀科系':major,
            '上課別':studyType,
            '年級':year,
            '班級':sclass,
            '座號':number,
            '身分別':specificType,
            '學制':schoolType
        }
        dataJsonLst.append(datajson)
    # print(json.dumps(dataJsonLst, ensure_ascii=False))
    with open(f"./user_data/{userName}/{cFileName}/{cFileName}.json" , "w" , encoding="utf-8") as jason_f:
        json.dump(dataJsonLst , jason_f , ensure_ascii=False , indent= 4)
    



if __name__ == "__main__":
    filePath = sys.argv[1]
    userName  = sys.argv[2]
    cFileName = sys.argv[3]
    try:
        getDataTable(filePath)
    except Exception as e :
        print(str(e))
# getDataTable("./back-end/convert_content/1.中壢高商(14901).xlsx")



