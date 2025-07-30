import { useEffect, useRef, useState } from "react";
import NavbarComponent from "../component/NavbarComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFile, faPen } from '@fortawesome/free-solid-svg-icons'
import Select from "react-select";
import TestFile from "../json/userUploadTestFile.json";

type stateType = {

    submitEditData: Function,
    viewData: ViewType,
    editFrameState: number,
    setEditFrameState: React.Dispatch<React.SetStateAction<number>>
}

// const multipleType = [
//     "身分證號碼", "中文姓名", "出生日期",
//     "報簡職類", "英文姓名", "檢定區別",
//     "通訊地址", "戶籍地址", "聯絡電話(住宅)",
//     "聯絡電話(手機)", "就讀學校", "就讀科系",
//     "上課別", "年級", "班級", "座號", "身分別",
//     "學制"
// ]
// type ViewType = {
//     [k in typeof multipleType[number]]: string;
// }
type ViewType={
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

type selectType = {
    value: string,
    label: string
}

const options: selectType[] = [
    { value: 'A', label: '全冊' },
    { value: 'B', label: '免學' },
    { value: 'C', label: '免術' },
];

const EditViewStudentContainer = ({ submitEditData, viewData, editFrameState, setEditFrameState }: stateType) => {

    return (
        <div className={`viewStudentDetailContainer ${editFrameState == 0 ? "op0" : ""}`}>
            <div className="viewStudentDetail">
                <div className="viewStudentTitle">
                    <div className="Viewicon"><FontAwesomeIcon icon={faPen} /></div>
                    <h4>編輯學生檔案 - {"張勝宏"}</h4>
                </div>

                <div className="line" />

                <div className="viewStudentContent">
                    {editFrameState == 1 ?
                        <>
                            <div className="allCenter">
                                <div className="studentImageContainer"><img src="../../public/photo.JPEG" alt="" /></div>
                                <div className="topside" >
                                    <div className="viewStudentColumn deco">
                                        <div className="viewStudentItem">
                                            <div className="viewStudentName">
                                                <h4>*中文姓名</h4>
                                                <input type="text" value={viewData["中文姓名"]} />
                                            </div>

                                        </div>
                                        <div className="viewStudentItem">
                                            <div className="viewStudentName">
                                                <h4> *英文姓名</h4>
                                                <input type="text" value={viewData["中文姓名"]} />
                                            </div>

                                        </div>
                                    </div>

                                    <div className="viewStudentColumn decoR">
                                        <div className="viewStudentItem">

                                            <div className="viewStudentName">
                                                <h4> *身分證字號</h4>
                                                <input type="text" value={viewData["中文姓名"]} />
                                            </div>
                                        </div>
                                        <div className="viewStudentItem">
                                            <div className="viewStudentName">
                                                <h4> *出生日期</h4>
                                                <input type="date" value={viewData["中文姓名"]} />
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
                                            <input type="text" value={viewData["中文姓名"]} />
                                        </div>

                                    </div>
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h4> *戶籍地址</h4>
                                            <input type="text" value={viewData["中文姓名"]} />
                                        </div>

                                    </div>
                                </div>
                                <div className="viewStudentColumn">
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h4> *聯絡電話</h4>
                                            <input type="text" value={viewData["中文姓名"]} />
                                        </div>

                                    </div>
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h4> *行動電話</h4>
                                            <input type="text" value={viewData["中文姓名"]} />
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
                                                    label != "檢定區別" ?
                                                        (
                                                            <div className={`viewStudentItem ${element.registerCount == 1 ? "single" : element.registerCount == 2 ? "split" : element.registerCount == 3 ? "triple" : ""} `}>
                                                                <div className="viewStudentName">
                                                                    <h4>*{element.registerName[0]}</h4>
                                                                    <input type="text" />
                                                                </div>
                                                            </div>
                                                        ) :
                                                        <div className={`viewStudentItem ${element.registerCount == 1 ? "single" : element.registerCount == 2 ? "split" : element.registerCount == 3 ? "triple" : ""} `}>
                                                            <div className="viewStudentName">
                                                                <h4>*{element.registerName[0]}</h4>
                                                                <Select
                                                                    onChange={(e) => {
                                                                        set
                                                                    }}
                                                                    options={options}
                                                                    placeholder="選擇檢定區別"
                                                                    className="selectClass"
                                                                />
                                                            </div>
                                                        </div>
                                                ))
                                                }
                                            </div>
                                        ))}
                                        {/* <div style={{ width: 200 }}>
                                            <Select
                                                options={options}
                                                placeholder="選擇水果"
                                                className="selectClass"
                                            />
                                        </div> */}
                                    </div>
                                </div>
                            </>
                        </>
                    }



                </div>

                <div className="functionBtnContainer">
                    {

                        editFrameState == 1 ?
                            <>
                                <div className="functionBtn" onClick={() => setEditFrameState(0)}>
                                    關 閉
                                </div>
                                <div className="functionBtn" onClick={() => setEditFrameState(editFrameState + 1)}>
                                    下一頁
                                </div>
                            </>
                            :
                            <>
                                <div className="functionBtn" onClick={() => setEditFrameState(editFrameState - 1)}>
                                    上一頁
                                </div>
                                <div className="functionBtn" onClick={() => submitEditData()}>
                                    更 新
                                </div>
                            </>
                    }
                </div>

            </div>
        </div>
    )
}
export default EditViewStudentContainer;