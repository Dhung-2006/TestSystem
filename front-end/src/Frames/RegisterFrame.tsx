import { use, useRef, useState } from "react";
import NavbarComponent from "../component/NavbarComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faCircleQuestion, faDatabase, faGear, faMagnifyingGlass, faPaperPlane, faPrint, faUpload, faUser, faWarning, faX } from '@fortawesome/free-solid-svg-icons'
import SwiperCarousel from '../component/SwiperCarousel.tsx';
import ViewComponent from "../component/ViewComponent.tsx";
import DataTable, { type ExportDataType } from "../component/DataTable.tsx";
import Loading, { type LoadingType } from "../component/Loading.tsx";
import { useSwiper } from "swiper/react";
// import { NULL } from "sass";

type uploadType = {
    "status": boolean,
    "fileName": string | undefined
}

const RegisterFrame = () => {
    const swiper = useSwiper();

    const [progressionValue, setProgressionValue] = useState(0);
    const [carouselItemDone, setCarouselItemDone] = useState<number[]>([0, 0, 0, 0, 0]);

    const [modalShow, setModalShow] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const [nonFillout, setNonFillout] = useState(0);
    const [repeatAlert, setRepeatAlert] = useState(0);
    const [alertFrameShow0, setAlertFrameShow0] = useState(0);
    const [alertFrameShow1, setAlertFrameShow1] = useState(0);
    const [uploadStatus, setUploadStatus] = useState<uploadType>({ "status": false, "fileName": "" });


    // useRef 
    const triggerExportRef = useRef<ExportDataType | null>(null);
    const loadingRef = useRef<LoadingType | null>(null);
    const uploadFileNameRef = useRef<HTMLInputElement>(null);
    const uploadFileRef = useRef<HTMLInputElement>(null);
    const uploadPhotoRef = useRef<HTMLInputElement>(null);


    // photo upload //
    const photoUpload = ():void =>{
        
        handleCarouselItemSep(2);
        // files deliver
    }

    // upload Events //

    const submitUpload = (): void => {
        if (uploadStatus.status && uploadStatus.fileName != "") {
            const uploadName: string | undefined = uploadFileNameRef.current?.value;
            const uploadFile: FileList | null | undefined = uploadFileRef.current?.files;
            const URL = "";
            if (uploadName != undefined && (uploadFile?.length != null || uploadFile?.length != undefined)) {
                const formData = new FormData();
                formData.append("uploadFileName", uploadName);
                formData.append("uploadFile", uploadFile[0]);
                console.log(uploadFile);
                console.log(uploadName);


                fetch(URL,
                    {
                        headers: {}
                    }
                )
                // if throw success
                handleCarouselItemSep(1);
                // 上傳成功 frame
                setAlertFrameShow1(0);
                // clearUploadRef(0);
                
            }
        }
        else{
            setNonFillout(1);
        }
    }
    const uploadTextChange = (): void => {
        setUploadStatus((prev) => {
            const pending = prev;
            uploadFileNameRef.current?.value != "" ? pending["status"] = true : pending["status"] = false;
            return pending
        });
        console.log(uploadStatus);

    }
    const verifyUpload = (): void => {
        if (uploadStatus.status) {
            setAlertFrameShow1(0);
            setRepeatAlert(1);
        }
        else {
            setAlertFrameShow1(0)
        }
    }
    const clearUploadRef = (arg: number): void => {
        console.log(uploadStatus.status);

        if (arg) {

            setRepeatAlert(0);
            setUploadStatus({ "status": false, "fileName": "" });
            if (uploadFileNameRef.current) {
                uploadFileNameRef.current.value = "";
            }
        }
        else {
            setRepeatAlert(0);
            setAlertFrameShow1(1);
        }
    }
    const fileChange = () => {

        const file: string | undefined = uploadFileRef.current?.files?.[0]?.name;

        console.log(file);
        // setUploadStatus((prev) => {
        //     const pending = prev;
        //     pending["status"] = true;
        //     pending["fileName"] = "file";
        //     return pending;
        // })
        setUploadStatus({ "status": true, "fileName": file });



    }
    ///////////////////////////////////////////


    const clickAlertRef = (): void => {
        if (uploadFileRef) {
            uploadFileRef.current?.click();
        }
    }
    const clickPhotoRef = (): void => {
        if (uploadPhotoRef) {
            uploadPhotoRef.current?.click();
        }
    }

    const handleAlertFrame = (arg: number): void => {
        switch (arg) {
            case 0:
                setAlertFrameShow0(1);
                break;
            case 1:
                setAlertFrameShow1(1);
                break;
            case 2:
                clickPhotoRef();
                break;
            default:
                console.error("there's an error of argument deliever");
        }
    }
    const handleCarouselItemSep = (index: number) => {

        setCarouselItemDone((prev) => {
            if (!prev[index]) {
                const newArr = [...prev];
                newArr[index] += 1;
                setProgressionValue(progressionValue + 20);
                return newArr;
            }
            return prev;
        })
    }
    const handleDownloadTemplate = (arg: number): void => {
        if (arg) {
            const a = document.createElement("a");
            // a.href = "../../public/template.xlsx";
            a.href = "../../public/convertTemplate.7z";
            // template.xlsx
            // a.href = "../../public/test.pdf";
            a.download = "桃竹區在校生技能檢定網路報名系統範本";
            a.click();
        }
        setAlertFrameShow0(0);
        handleCarouselItemSep(0);

    }
    // const [pageContent , setPageContent] = useState();
    // useEffect(()=>{
    //     changePage(currentPage);
    //     console.log(currentPage);
    // },[currentPage])
    const triggerModalShow = () => {
        setModalShow(1);
    }
    const triggerExportButton = () => {
        triggerExportRef.current?.triggerExport();
    }
    const triggerChange = (e: number) => {
        loadingRef.current?.triggerChange();
        setCurrentPage(e);
    }



    const changePage = (crt: number) => {
        switch (crt) {
            case 0:
                return (
                    <div className="registerContainer">
                        <h2>報名登錄</h2>

                        {/* modal out event */}


                        <div className="progressionContainer">
                            <div className="progression">
                                <div className="progression_percent" style={{ width: `${progressionValue}%` }} />
                            </div>
                            <div className="percent_value"><h5>{progressionValue}%</h5></div>
                        </div>
                        <SwiperCarousel handleAlertFrame={handleAlertFrame} carouselDone={carouselItemDone} />
                        <div className="line" />
                        <div className="submitDiv">
                            <div className="carouselIconContainer">
                                <div className="carouselIcon icon_prev"><FontAwesomeIcon icon={faAngleLeft} /></div>
                                <div className="carouselIcon icon_next"><FontAwesomeIcon icon={faAngleRight} /></div>
                            </div>
                            {/* <button className="registerSubmit">送出資料  <FontAwesomeIcon icon={faPaperPlane} /></button> */}
                            {/* 我submit鍵到底要放哪 右下角 還是卡片的最後一個 */}
                        </div>
                    </div>
                );
                break;
            case 1:
                return (
                    <div className="dataTableContainer">
                        <h4>報名資料 - </h4>
                        {/* <h2>報名資料</h2> */}

                        {/* <div className="progressionContainer">
                                <div className="progression">
                                    <div className="progression_percent" style={{width:"0%"}} />
                                </div>
                                <div className="percent_value"><h5>{0}%</h5></div>
                            </div> */}
                        <DataTable triggerModalShow={triggerModalShow} ref={triggerExportRef} />
                        {/* <div className="dataButtonContainer">
                            <button className="dataButton" type="button">報名狀況統計</button>
                            <button className="dataButton" type="button" onClick={triggerExportButton}>匯出報名資料</button>
                        </div> */}
                    </div>
                )
                break;
            case 2:
                return (
                    <>
                        <ViewComponent />
                    </>
                )
                break;
            case 3:
                return (
                    <div>
                        <h2>代碼查詢</h2>

                        <div className="progressionContainer">
                            <div className="progression">
                                <div className="progression_percent" style={{ width: "0%" }} />
                            </div>
                            <div className="percent_value"><h5>{0}%</h5></div>
                        </div>

                    </div>
                )
            default:
                break;
        }
    }
    return (

        <div className="registerFrameContainer">
            <input type="file" id="hiddenInput" style={{ display: "none" }} ref={uploadFileRef} onChange={fileChange} />
            <input type="file" id="uploadPhotoRef" style={{ display: "none" }} ref={uploadPhotoRef} onChange={photoUpload}/>

            <div className={`alertFrameContainer ${!alertFrameShow1 ? "op0" : ""}`}>
                <div className="uploadFrame">
                    <div className="uploadFrameText">
                        <h2>上傳學生資料</h2>
                        <h5>請上傳範本編輯後的學生資料，支援 Excel 格式，請確保符合規範</h5>
                    </div>
                    <div className="line" />
                    <div className="uploadColumn">
                        <h3><span style={{ color: "red" }}>*</span>檔案名稱</h3>
                        <input type="text" ref={uploadFileNameRef} onChange={uploadTextChange} />
                    </div>
                    <div className="uploadColumn">
                        <h3><span style={{ color: "red" }}>*</span>上傳檔案</h3>
                        {/* 原生 */}
                        {/* ///////////////////////////// */}
                        {/* <div className="uploadInput">
                            <div className="uploadIcon"><FontAwesomeIcon icon={faUpload} /></div>
                            <h4><label htmlFor="hiddenInput"><span >點擊</span></label>或拖拉上傳檔案</h4>
                            <h5>( 檔案限定 *.csv *xlsx )</h5>
                        </div> */}
                        {/* ///////////////////////////// */}
                        <div className="uploadInput" onClick={clickAlertRef}>
                            <div className={`uploadbg ${!uploadStatus["status"] ? "hide" : ""}`}><h4>{uploadStatus["fileName"]}</h4></div>
                            <div className="uploadIcon" ><FontAwesomeIcon icon={faUpload} /></div>
                            <h4><span>點擊</span>或拖拉上傳檔案</h4>
                            <h5>( 檔案限定 *.xlsx )</h5>
                        </div>


                    </div>
                    <div className="uploadButtonContainer">
                        <div className="uploadButton" onClick={verifyUpload}>取 消</div>
                        <div className="uploadButton" onClick={submitUpload}>上 傳</div>
                    </div>
                </div>
            </div>

            {/* ** alertFrame repeat problem */}
            <div className={`alertFrameContainer ${!alertFrameShow0 ? "op0" : ""}`}>
                <div className="alertFrame">
                    <div className="alert_icon">
                        <FontAwesomeIcon icon={faCircleQuestion} />
                    </div>
                    <div className="alert_text">
                        <h2>您是否已下載過範本？</h2>
                        <h4>( 若已下載過即可略過 )</h4>
                    </div>
                    <div className="alert_option">
                        <div className="alert_option_button" onClick={() => handleDownloadTemplate(0)}>略 過</div>
                        <div className="alert_option_button" onClick={() => handleDownloadTemplate(1)}>下 載</div>
                    </div>
                </div>
            </div>
            <div className={`alertFrameContainer repeat ${!repeatAlert ? "op0" : ""}`}>
                <div className="alertFrame">
                    <div className="alert_icon">
                        <FontAwesomeIcon icon={faWarning} />
                    </div>
                    <div className="alert_text">
                        {/* <h2>您已經輸入/上傳資料<br/>確定要退出嗎？</h2> */}
                        <h2>您已經輸入 / 上傳資料，確定要退出嗎？</h2>
                        <h4>( 未儲存的資料可能會遺失 )</h4>
                    </div>
                    <div className="alert_option">
                        <div className="alert_option_button" onClick={() => clearUploadRef(0)}>取 消</div>
                        <div className="alert_option_button" onClick={() => clearUploadRef(1)}>確 定</div>
                    </div>
                </div>
            </div>
            <div className={`alertFrameContainer repeat ${!nonFillout ? "op0" : ""}`}>
                <div className="alertFrame">
                    <div className="alert_icon">
                        <FontAwesomeIcon icon={faWarning} />
                    </div>
                    <div className="alert_text">
                        {/* <h2>您已經輸入/上傳資料<br/>確定要退出嗎？</h2> */}
                        <h2>您有欄位尚未填寫完畢</h2>
                        {/* <h4>( 未儲存的資料可能會遺失 )</h4> */}
                    </div>
                    <div className="alert_option">
                        <div className="alert_option_button" onClick={() => setNonFillout(0)}>取 消</div>
                        {/* <div className="alert_option_button" onClick={() => clearUploadRef(1)}>確 定</div> */}
                    </div>
                </div>
            </div>

            <div className="uploadFileFrameContainer"></div>
            <Loading ref={loadingRef} />
            <div className="innerContainer">
                <NavbarComponent />
                <div className="bottomContainer">
                    <div className="leftSideContainer">
                        <div className="selectionComponent">
                            <div className="itemContainer ">
                                <div className={`item ${currentPage == 0 ? "currentC" : 0}`} onClick={() => { triggerChange(0) }}><div className="decoration"><FontAwesomeIcon icon={faUser} /></div><h4>報名登錄</h4></div>
                                <div className={`item ${currentPage == 1 ? "currentC" : 0}`} onClick={() => { triggerChange(1) }}><div className="decoration"><FontAwesomeIcon icon={faDatabase} /></div><h4>報名資料</h4></div>
                                <div className={`item ${currentPage == 2 ? "currentC" : 0}`} onClick={() => { triggerChange(2) }}><div className="decoration"><FontAwesomeIcon icon={faPrint} /></div><h4>資料列印</h4></div>
                                <div className={`item ${currentPage == 3 ? "currentC" : 0}`} onClick={() => { triggerChange(3) }}><div className="decoration"><FontAwesomeIcon icon={faMagnifyingGlass} /></div><h4>代碼查詢</h4></div>
                            </div>
                            <div className="line" />
                            <div className="settingContainer">
                                <div className="item"><div className="decoration"><FontAwesomeIcon icon={faGear} /></div><h4>設 定</h4></div>
                            </div>

                        </div>
                    </div>
                    <div className="rightSideContainer">
                        {changePage(currentPage)}
                    </div>
                </div>
            </div>
            <div className={`viewDataToggler ${!modalShow ? "hidden" : ""}`}>
                <div className="closeBtn" onClick={() => setModalShow(0)}>
                    <FontAwesomeIcon icon={faX} />
                </div>
            </div>
        </div>
    )
}

export default RegisterFrame;