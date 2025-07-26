import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFileExport, faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import type { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";
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

type rowType = {
    value1: string,
    value2: string
}
type allProps = {
    // triggerModalShow: () => void;
    globalFilter: string,
    setGlobalFilter: React.Dispatch<React.SetStateAction<string>>,
    setCalRows: React.Dispatch<React.SetStateAction<rowType>>,
    setModalShow :React.Dispatch<React.SetStateAction<number>>,
}

// higher order function only receive two arguments , props needs to become a set.
const StudentTable = forwardRef<ExportDataType, allProps>(({ globalFilter, setGlobalFilter, setCalRows ,setModalShow }, ref) => {
    // const { modalOut } = props; 
    const [data, setData] = useState<rowData[]>(DATA);
    const [exportData, setExportData] = useState(false);
    const [columnFilter, setColumnFilter] = useState<ColumnFiltersState>([]);



    type rowData = {
        "name": string,
        "type": string;
        "identity": string;
        "number": number;
        "photo_n": number;
        "all": number;
        "pass_a": number;
        "pass_s": number;
    }
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "no",
            header: "No.",
            cell: (props: any) => <p>{props.row.index + 1}</p>
        }
        ,
        {
            accessorKey: "name",
            header: "姓名",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        ,
        {
            accessorKey: "type",
            header: "檔案總數",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        ,
        {
            accessorKey: "type",
            header: "報名種類",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        ,
        {
            accessorKey: "identity",
            header: "身份",
            cell: (props: any) => <p>{props.getValue()}</p>
        }
        ,
        {
            header: "",
            id:"status",
            size:10,
            maxSize:10,
            cell: (props: any) =>
            (
                <div className="functionBtn">
                    <div className="editButton" onClick={()=>{setModalShow(1)}}>編輯</div>
                    <div className="editButton">刪除</div>
                    {/* <div className="editButton">刪除</div> */}
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
    ]

    const table = useReactTable({
        data,
        columns,
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
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
                        <tr key={headerGroup.id}>
                            {exportData ? <th /> : <></>}

                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                            {/* <th /> */}
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
