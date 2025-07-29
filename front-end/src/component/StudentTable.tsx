import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender, getSortedRowModel  } from "@tanstack/react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFileExport, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import type { ColumnDef, ColumnFiltersState, SortingState  } from "@tanstack/react-table";
import DATA from "../json/tableData.json";
import { forwardRef, useState, useImperativeHandle, useEffect } from "react";

export type ExportDataType = {
    triggerExport: () => void;
}
// type triggerPDFmodal = {
//     triggerModalShow : () => void;
// }
// type globalFilterType = {
//     globalFilter : string,
//     setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
// }

// 加篩選 跟 設計 查看/編輯 ui
type rowType = {
    value1: string,
    value2: string
}


type rowData = {
    // "name": string,
    // "type": string;
    // "identity": string;
    // "number": number;
    // "photo_n": number;
    // "all": number;
    // "pass_a": number;
    // "pass_s": number;
    "身分證號碼" : string;
    "中文姓名" : string;
    "出生日期" : string;
    "報簡職類" : string;
    "英文姓名" : string;
    "檢定區別" : string;
    "通訊地址" : string;
    "戶籍地址" : string;
    "聯絡電話(住宅)" : string;
    "聯絡電話(手機)" : string;
    "就讀學校" : string;
    "就讀科系" : string;
    "上課別" : string;
    "年級" : string;
    "班級" : string;
    "座號" : string;
    "身分別" : string;
    "學制" : string;
}
type allProps = {
    // triggerModalShow: () => void;
    data: rowData[],
    handleViewData: Function,
    EditViewData: Function,
    setData: React.Dispatch<React.SetStateAction<rowData[]>>,
    studentFilter: string,
    setStudentFilter: React.Dispatch<React.SetStateAction<string>>,
    setCalRows: React.Dispatch<React.SetStateAction<rowType>>,
    setModalShow: React.Dispatch<React.SetStateAction<number>>,
}

// higher order function only receive two arguments , props needs to become a set.
const StudentTable = forwardRef<ExportDataType, allProps>(({EditViewData, handleViewData, data, setData, studentFilter, setStudentFilter, setCalRows, setModalShow }, ref) => {
    // const { modalOut } = props; 
    // const [data, setData] = useState<rowData[]>(inputData);
    const [exportData, setExportData] = useState(false);
    const [columnFilter, setColumnFilter] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);


    //  ▲
    //  ▼
    const [columns, setColumn] = useState<ColumnDef<any>[]>([
        {
            accessorKey: "no",
            header: "準考證號碼",
            cell: (props: any) => <p>{props.row.index + 1 + "00499"}</p>
        }
        ,
        {
            accessorKey: "身分證號碼",
            header: "身分證號碼",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        ,
        {
            accessorKey: "中文姓名",
            header: "中文姓名",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        ,
        {
            accessorKey: "報簡職類",
            header: "報簡職類",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        ,
        {
            accessorKey: "檢定區別",
            header: "檢定區別",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        ,
        {
            accessorKey: "身分別",
            header: "身分別",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        ,

        {
            accessorKey: "",
            header: "報名狀態",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        ,
        {
            header: "Status",
            id: "status",
            size: 1,
            // maxSize: 100,
            cell: (props: any) =>
            (
                <div className="functionBtn">
                    <div className="editButton" onClick={() => handleViewData()}>查看</div>
                    <div className="editButton" onClick={() =>  EditViewData() }>編輯</div>
                    <div className="editButton" onClick={() => deleteEditData()}>刪除</div>
                </div>
            )
        }

        // ,
        // {
        //     accessorKey: "number",
        //     header: "報名人數",
        //     cell: (props: any) => <p>{props.getValue()}</p>
        // }
        // ,
        // {
        //     accessorKey: "photo_n",
        //     header: "未傳照片",
        //     cell: (props: any) => <p>{props.getValue()}</p>
        // }
        // ,
        // {
        //     accessorKey: "all",
        //     header: "全測",
        //     cell: (props: any) => <p>{props.getValue()}</p>
        // }
        // ,
        // {
        //     accessorKey: "pass_a",
        //     header: "免學",
        //     cell: (props: any) => <p>{props.getValue()}</p>
        // }
        // ,
        // {
        //     accessorKey: "pass_s",
        //     header: "免術",
        //     cell: (props: any) => <p>{props.getValue()}</p>
        // }
        // ,
        // {

        //     accessorKey: "pass_s",
        //     header: "",
        //     cell: (props: any) => <p>{props.getValue()}</p>
        // }
    ])

    const table = useReactTable({
        data,
        columns,
        state: { globalFilter:studentFilter, sorting },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onGlobalFilterChange: setStudentFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });


    const totalRows = data.length; // 全部資料筆數
    const filteredRows = table.getRowModel().rows.length; // 過濾後資料筆數

    // setCalRows((prev) => ({
    //     ...prev,
    //     value1: String(totalRows),
    //     value2: String(filteredRows)
    // }))
    const enterDetailData = () => {

    }

    useEffect(() => {
        setCalRows((prev) => ({
            ...prev,
            value1: String(totalRows),
            value2: String(filteredRows)
        }))
    }, [totalRows, filteredRows])

    // const [totalRows] = useState(data.length); 
    // const [filteredRows] = useState(table.getRowModel().rows.length); 


    useImperativeHandle(ref, () => ({
        triggerExport: () => {
            setExportData(exportData => !exportData);
            console.log(exportData);
        }
    }), [])

    console.log(data);
    return (
        <div className="tableContainer">
            <table border={1} cellPadding={6} >
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} >
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    style={{ cursor: 'pointer', userSelect: 'none' }}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {{
                                        asc: ' ▲',
                                        desc: ' ▼',
                                    }[header.column.getIsSorted() as string] ?? null}
                                </th>
                            ))}

                            {/* ------------------測資------------------ */}


                            {/* {exportData ? <th /> : <></>}

                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))} */}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, index) => (
                        <tr key={row.id}>
                            {exportData ?

                                <td>
                                    <input type="checkbox" name={`checkbox-${index + 1}`} />
                                </td>
                                :
                                <></>
                            }

                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                            {/* <td>
                                <div style={{ display: "flex" }}>
                                <div className="iconEye next" onClick={enterDetailData}>
                                    <FontAwesomeIcon icon={faRightToBracket} />
                                </div>
                            </td> */}

                        </tr>

                    ))}
                </tbody>
            </table>

        </div>
    )
})
export default StudentTable;


