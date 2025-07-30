import { useReactTable, getCoreRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFileExport, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import type { ColumnDef, ColumnFiltersState, GlobalFiltering } from "@tanstack/react-table";
import DATA from "../json/tableData.json";
import { forwardRef, useState, useImperativeHandle, useRef } from "react";

// import ViewTable from "./ViewTable";
import CodeTableSearchContainer from "./codeTableSearchContainer";
import jsonData from "../json/tableData.json"

const SearchCode = () => {
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const [viewData, setViewData] = useState(jsonData);
    console.log("viewData", viewData);
    const [viewHeightCSS, setViewHeightCSS] = useState<number | undefined>(0);
    const viewHeightRef = useRef<HTMLDivElement>(null);

    // 優化使用者點擊輸入框UX
    const inputRef = useRef<HTMLInputElement>(null);
    const userFocus = () => {
        inputRef.current?.focus();
    }

    const [userInputValue, setUserInputValue] = useState("");
    const userSearchEvent = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = e.target.value;
        setUserInputValue(inputValue);



    }

    return (
        <div className="SearchCode">
            <div className="leftsideContainer">
                <div className="searchBarContainer">
                    <div className="searchBar" onClick={userFocus}>
                        <input type="text" value={globalFilter} ref={inputRef} onChange={(e) => { setGlobalFilter(e.target.value) }}
                            placeholder={"請輸入要搜尋的學生資料"} />
                        <div className="mag-icon"><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                    </div>
                </div>
                <div className="previewDatas" ref={viewHeightRef} ><CodeTableSearchContainer globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} /></div>
            </div>
            <div className="rightsideContainer">
                {/* <iframe src={URL} /> */}
                <div className="header">結果：</div>
            </div>
        </div>
    )
}
export default SearchCode;