import React, { use, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper/types";
import NavbarComponent from "../component/NavbarComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faAngleLeft, faAngleRight, faBackward, faCheck, faCheckCircle, faCircleChevronLeft, faCirclePlus, faCircleQuestion, faDatabase, faFile, faGear, faMagnifyingGlass, faPaperPlane, faPen, faPrint, faRecycle, faRepeat, faTrash, faUpload, faUser, faUserCircle, faWarning, faX } from '@fortawesome/free-solid-svg-icons'
import SwiperCarousel from '../component/SwiperCarousel.tsx';
import ViewComponent from "../component/ViewComponent.tsx";
import TableSwiper from "../component/TableSwiper.tsx";
import StudentTable from "../component/StudentTable.tsx"
import DataTable, { type ExportDataType, type rowData } from "../component/DataTable.tsx";
import { DeclareContextType } from "../types/DeclareContextType.tsx";

import DATA from "../json/testPigID.json";
import type { _ReloadStudentType } from "../types/_ReloadStudentType.ts";
import type { _ReloadStudentTypeList } from "../types/_ReloadStudentType.ts";
import type { _EditType } from "../types/_EditType.ts";


type currentTableType = {
    text: string,
    status: boolean
}
type rowType = {
    value1: string,
    value2: string
}
type InputProps = {
    setLoadingState: Function,
    modalShow: number,
    deleteEditData: (index : number , arg : string ) => void,
    setEditViewData: React.Dispatch<React.SetStateAction<_EditType>>,
    setModalShow: React.Dispatch<React.SetStateAction<number>>,
    setFillInFrame: React.Dispatch<React.SetStateAction<boolean>>,
    setViewFrameState: React.Dispatch<React.SetStateAction<number>>,
    setEditFrameState: React.Dispatch<React.SetStateAction<number>>,
    setDoubleCheck: React.Dispatch<React.SetStateAction<number>>;
}


const DataTableContainer = ({ deleteEditData, setEditViewData, setDoubleCheck, setEditFrameState, setViewFrameState, setLoadingState, modalShow, setModalShow, setFillInFrame }: InputProps) => {

    const [data, setData] = useState<_ReloadStudentType[]>(DATA as _ReloadStudentType[]);
    // const [modalShow, setModalShow] = useState(0);
    const [currentTable, setCurrentTable] = useState<currentTableType>({ text: "報名資料", status: false });
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const [studentFilter, setStudentFilter] = useState<string>("");
    const [changePage, setChangePage] = useState<number>(0);
    const [calRows, setCalRows] = useState<rowType>({ value1: "", value2: "" });
    // const [pigID, setPigID] = useState("");

    const triggerExportRef = useRef<ExportDataType | null>(null);
    const tableHeightRef = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<SwiperClass>(null);

    // const enterDetailData = () => {
    //     try {
    //         const URL: string = "";
    //         fetch(URL, {
    //             headers: new Headers({
    //                 "Content-Type": "application/json",
    //                 method: "GET",
    //             })
    //         })
    //             .then(res => { res.json() })
    //             .then((jsonData:rowData[]) => { setData(jsonData) });
    //         handleLoading();
    //     }
    //     catch (err) {
    //         console.error(err);
    //     }
    // }
    const enterDetailData = async (arg: string) => {
        setCurrentTable(prev => ({
            ...prev,
            status: false,
            text: `報名資料 / ${arg}`
        }));

        setChangePage(1);
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
        try {

            setLoadingState(false);
            const URL: string = "";
            const headers = new Headers({
                "Content-Type": "application/json",
            })
            const fetchData = await fetch(URL, { headers: headers, method: "POST" });
            const getData = await fetchData.json();
            setData(getData);
            setLoadingState(true);
        }
        catch (err) {
            console.error("enterDetailData", err);
            setLoadingState(true);
        }


    }
    // 查看
    const handleViewData = () => {
        // fetch -> setState
        // setEditViewData(prev=>({
        //     ...prev,

        // }))
        // 反正這邊就是明天要跟豬串起來的fetch 明天再用 更新資料而已
        setViewFrameState(1);
    }
    // 編輯
    const EditViewData = (arg: number) => {
        // console.log(data[arg][0]);
        const sendData = data[arg][0];
        setEditViewData(prev => ({
            ...prev,
            insertFile: [sendData, prev.insertFile[1]]
        }));
        setEditFrameState(1);
    }
    // const deleteEditData =  (index: number, arg: string) => {
    //     console.log(arg);

    //     if (index == 0) {
    //         // 1 save & asking
    //         setPigID(arg);
    //         setDoubleCheck(1);
    //     }
    //     else {
    //         // 2 submit
    //         console.log(10000000);
    //         setDoubleCheck(0);
    //         submitDeleteEditData(pigID);

    //     }
    // }
    // const submitDeleteEditData = async (arg: string) => {

    //     setLoadingState(false);
    //     const URL: string = "";
    //     try {
    //         const res = await fetch(URL, {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ "deleteName": arg })
    //         })

    //         if (!res.ok) throw new Error("500 server error");

    //         console.log("成功", data)
    //         setLoadingState(true);

    //     }
    //     catch (err) {
    //         console.error("123", err);
    //         setLoadingState(true);
    //     }
    // }
    // const insertData = () => {
    //     const newRow = {
    //         "pigID":
    //         "身分證號碼": "H126312469",
    //         "中文姓名": "卓z3",
    //         "出生日期": "95830",
    //         "報簡職類": "會計人工",
    //         "英文姓名": "ZHUO,YU-CHEN",
    //         "檢定區別": "全測",
    //         "通訊地址": "桃園市中壢區中北",
    //         "戶籍地址": "桃園市中壢區中北路",
    //         "聯絡電話(住宅)": "034551238",
    //         "聯絡電話(手機)": "953083990",
    //         "就讀學校": "中壢家商",
    //         "就讀科系": "商業經營科",
    //         "上課別": "日間部",
    //         "年級": "1",
    //         "班級": "19",
    //         "座號": "5",
    //         "身分別": "身心障礙",
    //         "學制": "高級中學"
    //     }
    //     setData(prevData => [...prevData, newRow]);
    //     // alert(1)
    //     // useEffect(() => {
    //     // alert()
    //     if (tableHeightRef.current) {
    //         tableHeightRef.current.scrollTop = tableHeightRef.current?.scrollHeight;
    //     }
    //     // }, [data])
    // }

    return (
        <DeclareContextType.Provider value={{ deleteEditData }}>
            <div className="dataTableContainer">
                <div className="navigation">
                    <div className="navigationItem">
                        <div className={`backlast prev ${!currentTable.status ? "divNone" : ""}`} onClick={() => { setChangePage(0); swiperRef.current ? swiperRef.current.slidePrev() : null }}><FontAwesomeIcon icon={faCircleChevronLeft} /> 返回</div>
                        <div className="icon"><FontAwesomeIcon icon={faFile} />
                        </div>
                        <h4>{currentTable.text}</h4>
                    </div>
                    <div className="searchBarContainer">
                        <div className="searchBar">
                            {changePage == 0 ?
                                <input type="text" className="searchInput" value={globalFilter} onChange={(e) => { setGlobalFilter(e.target.value) }} placeholder="請輸入要搜尋的資料夾" />
                                :
                                <input type="text" className="searchInput" value={studentFilter} onChange={(e) => { setStudentFilter(e.target.value) }} placeholder="請輸入要搜尋的資料" />
                            }
                            <div className="mag-icon"><FontAwesomeIcon icon={faMagnifyingGlass} /></div>

                        </div>
                        <div className="totalRows">

                            <div className={`addNewItem ${!currentTable.status ? "divNone" : ""}`} onClick={() => setFillInFrame(true)} ><FontAwesomeIcon icon={faCirclePlus} /> 新增</div>

                        </div>
                    </div>
                </div>
                <div className="tableSwiperContainer" ref={tableHeightRef}>
                    <TableSwiper
                        swiperRef={swiperRef}
                        arg1={<DataTable swiperRef={swiperRef.current} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} setCalRows={setCalRows} ref={triggerExportRef}
                            enterDetailData={enterDetailData} />}
                        arg2={<StudentTable EditViewData={EditViewData} studentFilter={studentFilter} setStudentFilter={setStudentFilter} setCalRows={setCalRows} setModalShow={setModalShow} ref={triggerExportRef}
                            data={data} setData={setData} handleViewData={handleViewData} />}

                        setText={setCurrentTable}

                    // tableSwiper > studentTable - datatable
                    />
                </div>
            </div>
        </DeclareContextType.Provider>
    )
}
export default DataTableContainer;