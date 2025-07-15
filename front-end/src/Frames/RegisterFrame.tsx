import { use, useRef, useState } from "react";
import NavbarComponent from "../component/NavbarComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faCircleQuestion, faDatabase, faGear, faMagnifyingGlass, faPaperPlane, faPrint, faUser, faX } from '@fortawesome/free-solid-svg-icons'
import SwiperCarousel from '../component/SwiperCarousel.tsx';
import ViewComponent from "../component/ViewComponent.tsx";
import DataTable, { type ExportDataType } from "../component/DataTable.tsx";
import Loading, { type LoadingType } from "../component/Loading.tsx";
import { useSwiper } from "swiper/react";


const RegisterFrame = () => {
    const swiper = useSwiper();


    const [progressionValue, setProgressionValue] = useState(0);
    const [carouselItemDone, setCarouselItemDone] = useState<number[]>([0, 0, 0, 0, 0]);

    const [modalShow, setModalShow] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [alertFrameShow0, setAlertFrameShow0] = useState(0);
    const [alertFrameShow1 , setAlertFrameShow1] = useState(0);

    // useRef 
    const triggerExportRef = useRef<ExportDataType | null>(null);
    const loadingRef = useRef<LoadingType | null>(null);

    const handleAlertFrame = (arg : number): void => {
        console.log(123213);
        switch(arg){
            case 0:
                setAlertFrameShow0(1);
                break;
            case 1:
                setAlertFrameShow1(1);
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
            a.href = "../../public/template.xlsx";
            // template.xlsx
            // a.href = "../../public/test.pdf";
            a.download = "桃竹區在校生技能檢定網路報名系統範本1";
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
                            <button className="registerSubmit">送出資料  <FontAwesomeIcon icon={faPaperPlane} /></button>
                            {/* 我submit鍵到底要放哪 右下角 還是卡片的最後一個 */}
                        </div>
                    </div>
                );
                break;
            case 1:
                return (
                    <div className="dataTableContainer">
                        {/* <h2>報名資料</h2> */}

                        {/* <div className="progressionContainer">
                                <div className="progression">
                                    <div className="progression_percent" style={{width:"0%"}} />
                                </div>
                                <div className="percent_value"><h5>{0}%</h5></div>
                            </div> */}
                        <DataTable triggerModalShow={triggerModalShow} ref={triggerExportRef} />
                        <div className="dataButtonContainer">
                            <button className="dataButton" type="button">報名狀況統計</button>
                            <button className="dataButton" type="button" onClick={triggerExportButton}>匯出報名資料</button>
                        </div>
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

                        {/* <SwiperCarousel /> */}
                    </div>
                )
            default:
                break;
        }
    }
    return (

        <div className="registerFrameContainer">
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
            <Loading ref={loadingRef} />
            <div className="innerContainer">
                <NavbarComponent />
                <div className="bottomContainer">
                    <div className="leftSideContainer">
                        <div className="selectionComponent">
                            <div className="itemContainer ">
                                {/* 
                                regist
                                data
                                print
                                search
                                 */}

                                <div className={`item ${currentPage == 0 ? "currentC" : 0}`} onClick={() => { triggerChange(0) }}><div className="decoration"><FontAwesomeIcon icon={faUser} /></div><h4>報名登錄</h4></div>
                                <div className={`item ${currentPage == 1 ? "currentC" : 0}`} onClick={() => { triggerChange(1) }}><div className="decoration"><FontAwesomeIcon icon={faDatabase} /></div><h4>報名資料</h4></div>
                                <div className={`item ${currentPage == 2 ? "currentC" : 0}`} onClick={() => { triggerChange(2) }}><div className="decoration"><FontAwesomeIcon icon={faPrint} /></div><h4>資料列印</h4></div>
                                <div className={`item ${currentPage == 3 ? "currentC" : 0}`} onClick={() => { triggerChange(3) }}><div className="decoration"><FontAwesomeIcon icon={faMagnifyingGlass} /></div><h4>代碼查詢</h4></div>
                                {/* <a href=""><div className="allCenter"><div className="decoration"><FontAwesomeIcon icon={faDownload} /></div><h4>下載範本</h4></div></a> */}
                            </div>
                            <div className="line" />
                            <div className="settingContainer">
                                <div className="item"><div className="decoration"><FontAwesomeIcon icon={faGear} /></div><h4>設 定</h4></div>
                            </div>

                        </div>
                        {/* <div className="functionComponent">
                            <div className="icon"><FontAwesomeIcon icon={faCircleHalfStroke} /></div>
                            <div className="icon"><FontAwesomeIcon icon={faUser} /></div>
                            
                            </div> */}
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