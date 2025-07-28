import React, { use, useEffect, useImperativeHandle, useRef, useState } from "react";
import NavbarComponent from "../component/NavbarComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faAngleLeft, faAngleRight, faBackward, faCheck, faCheckCircle, faCircleChevronLeft, faCirclePlus, faCircleQuestion, faDatabase, faFile, faGear, faMagnifyingGlass, faPaperPlane, faPen, faPrint, faRecycle, faRepeat, faTrash, faUpload, faUser, faUserCircle, faWarning, faX } from '@fortawesome/free-solid-svg-icons'
import SwiperCarousel from '../component/SwiperCarousel.tsx';
import ViewComponent from "../component/ViewComponent.tsx";
import TableSwiper from "../component/TableSwiper.tsx";
import StudentTable from "../component/StudentTable.tsx"
import DataTable, { type ExportDataType, type rowData } from "../component/DataTable.tsx";
// import Loading from "../component/Loading.tsx";
import DATA from "../json/tableData.json";
import { json } from "react-router-dom";

type rowType = {
    value1: string,
    value2: string
}
type InputProps = {
    setLoadingState: Function,
    modalShow: number,
    setModalShow: React.Dispatch<React.SetStateAction<number>>,
    setFillInFrame: React.Dispatch<React.SetStateAction<boolean>>,
}


const DataTableContainer = ({ setLoadingState, modalShow, setModalShow, setFillInFrame }: InputProps) => {
    const [data, setData] = useState<rowData[]>(DATA);
    // const [modalShow, setModalShow] = useState(0);
    const [currentTable, setCurrentTable] = useState({ text: "報名資料", status: false });
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const [calRows, setCalRows] = useState<rowType>({ value1: "", value2: "" });


    const triggerExportRef = useRef<ExportDataType | null>(null);
    const tableHeightRef = useRef<HTMLDivElement>(null);

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
    const enterDetailData = async () => {
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

    const handleViewData = () => {

    }

    const insertData = () => {
        const newRow = {
            "身分證號碼": "H126312469",
            "中文姓名": "卓z3",
            "出生日期": "95830",
            "報簡職類": "會計人工",
            "英文姓名": "ZHUO,YU-CHEN",
            "檢定區別": "全測",
            "通訊地址": "桃園市中壢區中北",
            "戶籍地址": "桃園市中壢區中北路",
            "聯絡電話(住宅)": "034551238",
            "聯絡電話(手機)": "953083990",
            "就讀學校": "中壢家商",
            "就讀科系": "商業經營科",
            "上課別": "日間部",
            "年級": "1",
            "班級": "19",
            "座號": "5",
            "身分別": "身心障礙",
            "學制": "高級中學"
        }
        setData(prevData => [...prevData, newRow]);
        // alert(1)
        // useEffect(() => {
        // alert()
        if (tableHeightRef.current) {
            tableHeightRef.current.scrollTop = tableHeightRef.current?.scrollHeight;
        }
        // }, [data])
    }

    return (
        <div className="dataTableContainer">



            <div className="navigation">
                <div className="navigationItem">
                    <div className={`backlast prev ${!currentTable.status ? "divNone" : ""}`}><FontAwesomeIcon icon={faCircleChevronLeft} /> 返回</div>
                    <div className="icon"><FontAwesomeIcon icon={faFile} />
                    </div>
                    <h4>{currentTable.text}</h4>
                </div>
                <div className="searchBarContainer">
                    <div className="searchBar">
                        <input type="text" className="searchInput" value={globalFilter} onChange={(e) => { setGlobalFilter(e.target.value) }} placeholder="請輸入要搜尋的資料" />
                        <div className="mag-icon"><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                    </div>
                    <div className="totalRows">

                        <div className={`addNewItem ${!currentTable.status ? "divNone" : ""}`} onClick={() => setFillInFrame(true)} ><FontAwesomeIcon icon={faCirclePlus} /> 新增</div>

                    </div>
                </div>
            </div>
            <div className="tableSwiperContainer" ref={tableHeightRef}>
                <TableSwiper
                    arg1={<DataTable globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} setCalRows={setCalRows} ref={triggerExportRef}
                        enterDetailData={enterDetailData} />}
                    arg2={<StudentTable globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} setCalRows={setCalRows} setModalShow={setModalShow} ref={triggerExportRef}
                        data={data} setData={setData} handleViewData={handleViewData} />}

                    setText={setCurrentTable}

                // tableSwiper > studentTable - datatable
                />
            </div>
        </div>
    )
}
export default DataTableContainer;