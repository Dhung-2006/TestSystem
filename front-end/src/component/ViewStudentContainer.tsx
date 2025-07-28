import { use, useEffect, useRef, useState } from "react";
import NavbarComponent from "../component/NavbarComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFile } from '@fortawesome/free-solid-svg-icons'

type stateType = {
    viewFrameState: number,
    setViewFrameState: React.Dispatch<React.SetStateAction<number>>
}



const ViewStudentContainer = ({ viewFrameState, setViewFrameState }: stateType) => {
    return (
        <div className={`viewStudentDetailContainer ${viewFrameState == 0 ? "op0" : ""}`}>
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
                                                <h5>*中文姓名</h5>
                                                <input type="text" disabled />
                                            </div>

                                        </div>
                                        <div className="viewStudentItem">
                                            <div className="viewStudentName">
                                                <h5> *英文姓名</h5>
                                                <input type="text" disabled />
                                            </div>

                                        </div>
                                    </div>

                                    <div className="viewStudentColumn">
                                        <div className="viewStudentItem">
                                            <div className="viewStudentName">
                                                <h5> *身分證字號</h5>
                                                <input type="text" disabled />
                                            </div>

                                        </div>
                                        <div className="viewStudentItem">
                                            <div className="viewStudentName">
                                                <h5> *出生日期</h5>
                                                <input type="date" disabled />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottomSide">
                                <div className="viewStudentColumn">
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h5> *通訊地址</h5>
                                            <input type="text" disabled />
                                        </div>

                                    </div>
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h5> *戶籍地址</h5>
                                            <input type="text" disabled />
                                        </div>

                                    </div>
                                </div>
                                <div className="viewStudentColumn">
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h5> *聯絡電話</h5>
                                            <input type="text" disabled />
                                        </div>

                                    </div>
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h5> *行動電話</h5>
                                            <input type="text" disabled />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="viewTestData">
                                <div className="viewStudentColumn">
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h5> *就讀學校</h5>
                                            <input type="text" disabled />
                                        </div>

                                    </div>
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h5> *就讀科系</h5>
                                            <input type="text" disabled />
                                        </div>

                                    </div>
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h5> *學制</h5>
                                            <input type="text" disabled />
                                        </div>

                                    </div>
                                </div>
                                <div className="viewStudentColumn">
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h5> *年級</h5>
                                            <input type="text" disabled />
                                        </div>

                                    </div>
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h5> *班級</h5>
                                            <input type="text" disabled />
                                        </div>

                                    </div>
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h5> *座號</h5>
                                            <input type="text" disabled />
                                        </div>

                                    </div>
                                </div>
                                <div className="viewStudentColumn">
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h5> *報檢職種</h5>
                                            <input type="text" disabled />
                                        </div>

                                    </div>
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h5> *上課別</h5>
                                            <input type="text" disabled />
                                        </div>

                                    </div>
                                </div>
                                <div className="viewStudentColumn">
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h5> *檢定區別</h5>
                                            <input type="text" disabled />
                                        </div>

                                    </div>
                                    <div className="viewStudentItem">
                                        <div className="viewStudentName">
                                            <h5> *身份別</h5>
                                            <input type="text" disabled />
                                        </div>

                                    </div>
                                </div>
                            </div>
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