import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from "react";
import ViewTable from "./ViewTable";
import jsonData from "../json/tableData.json"
const ViewComponent = () => {
    const URL = "/public/test.pdf";
    
    const [viewData, setViewData] = useState(jsonData);
    console.log("viewData",viewData);
    const [viewHeightCSS, setViewHeightCSS] = useState<number | undefined>(0);
    const viewHeightRef = useRef<HTMLDivElement>(null);
    // 優化使用者點擊輸入框UX
    const inputRef = useRef<HTMLInputElement>(null);
    const userFocus = () => {
        inputRef.current?.focus();
    }
    
    const [userInputValue , setUserInputValue ] = useState("");
    const userSearchEvent = (e:React.ChangeEvent<HTMLInputElement>):void =>{
        const inputValue : string = e.target.value;
        setUserInputValue(inputValue);
        
        
        
    }
    // 優化
    useEffect(() => {
        // setPdfURL()
        if (inputRef.current) {
            const viewHeight = viewHeightRef.current?.offsetHeight;
            setViewHeightCSS(viewHeight);
        }
    }, [])

    return (
        <div className="viewContainer">
            <div className="leftsideContainer">
                <div className="searchBarContainer">
                    <div className="searchBar" onClick={userFocus}>
                        <input type="text" value={userInputValue} ref={inputRef} onChange={(e)=>{userSearchEvent(e)}} 
                        placeholder={"請輸入要搜尋的學生資料"} />
                        <div className="mag-icon"><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                    </div>
                </div>
                <div className="previewDatas" ref={viewHeightRef} ><ViewTable /></div>
            </div>
            <div className="rightsideContainer">
                <iframe  src={URL}  />
            </div>
        </div>
    )
}
export default ViewComponent;