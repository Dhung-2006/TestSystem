import { use, useEffect, useRef, useState } from "react";
import NavbarComponent from "../component/NavbarComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFile } from '@fortawesome/free-solid-svg-icons'

import TestFile from "../json/userUploadTestFile.json";


type ViewType = {
    "身分證號碼": string,
    "中文姓名": string,
    "出生日期": string,
    "報簡職類": string,
    "英文姓名": string,
    "檢定區別": string,
    "通訊地址": string,
    "戶籍地址": string,
    "聯絡電話(住宅)": string,
    "聯絡電話(手機)": string,
    "就讀學校": string,
    "就讀科系": string,
    "上課別": string,
    "年級": string,
    "班級": string,
    "座號": string,
    "身分別": string,
    "學制": string,
    "test-type": string,
    "comfirmStatus": boolean
}


type stateType = {
    viewData: ViewType,
    viewFrameState: number,
    setViewFrameState: React.Dispatch<React.SetStateAction<number>>
}



const ViewStudentContainer = ({ viewData, viewFrameState, setViewFrameState }: stateType) => {
    return (
        <div className={`viewStudentDetailContainer greyBG ${viewFrameState == 0 ? "op0" : ""}`}>
            <div className="viewStudentDetail">
                <div className="viewStudentTitle">
                    <div className="Viewicon"><FontAwesomeIcon icon={faEye} /></div>
                    <h4>檢視學生檔案 - {"張勝宏"}</h4>
                </div>

                <div className="line" />

                <div className="viewStudentContent">
                    {viewFrameState == 1 ?
                        <>
                            <div className="allCenter">
                                <div className="studentImageContainer"><img src="../../public/photo.JPEG" alt="" /></div>
                                <div className="topside" >
                                    <div className="viewStudentColumn deco">
                                        <div className="viewStudentItem">
                                            <div className="viewStudentName">
                                                <h4>*中文姓名</h4>
                                                <input type="text" disabled value={viewData["中文姓名"]} />
                                            </div>

                                        </div>
                                        <div className="viewStudentItem">
                                            <div className="viewStudentName">
                                                <h4> *英文姓名</h4>
                                                <input type="text" disabled value={viewData["英文姓名"]} />
                                            </div>

                                        </div>
                                    </div>

                                    <div className="viewStudentColumn decoR">
                                        <div className="viewStudentItem">

                                            <div className="viewStudentName">
                                                <h4> *身分證字號</h4>
                                                <input type="text" disabled value={viewData["身分證號碼"]} />
                                            </div>
                                        </div>
                                        <div className="viewStudentItem">
                                            <div className="viewStudentName">
                                                <h4> *出生日期</h4>
                                                <input type="date" disabled value={viewData["出生日期"]} />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottomSide">
                                <div className="viewStudentColumn">
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h4> *通訊地址</h4>
                                            <input type="text" disabled value={viewData["通訊地址"]} />
                                        </div>

                                    </div>
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h4> *戶籍地址</h4>
                                            <input type="text" disabled value={viewData["戶籍地址"]} />
                                        </div>

                                    </div>
                                </div>
                                <div className="viewStudentColumn">
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h4> *聯絡電話</h4>
                                            <input type="text" disabled value={viewData["聯絡電話(住宅)"]} />
                                        </div>

                                    </div>
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h4> *行動電話</h4>
                                            <input type="text" disabled value={viewData["聯絡電話(手機)"]} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <>

                                <div className="fillInData">
                                    <div className="fillInTestData">
                                        {TestFile.map((element, index) => (
                                            <div className="viewStudentColumn">
                                                {element.registerName.map((label, index) => (
                                                    <div className={`viewStudentItem ${element.registerCount == 2 ? "split" : element.registerCount == 3 ? "triple" : ""} `}>
                                                        <div className="viewStudentName">
                                                            <h4>*{element.registerName[0]}</h4>
                                                            <input type="text" disabled value={viewData[element.registerName[0]]} />
                                                        </div>
                                                    </div>
                                                ))
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        </>
                    }



                </div>

                <div className="functionBtnContainer">
                    {

                        viewFrameState == 1 ?
                            <>
                                <div className="functionBtn" onClick={() => setViewFrameState(0)}>
                                    關 閉
                                </div>
                                <div className="functionBtn" onClick={() => setViewFrameState(viewFrameState + 1)}>
                                    下一頁
                                </div>
                            </>
                            :
                            <div className="functionBtn" onClick={() => setViewFrameState(viewFrameState - 1)}>
                                上一頁
                            </div>
                    }
                </div>

            </div>
        </div>
    )
}
export default ViewStudentContainer;