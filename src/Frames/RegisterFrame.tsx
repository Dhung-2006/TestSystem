import { useEffect, useState } from "react";
import NavbarComponent from "../component/NavbarComponent";
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke , faDatabase, faDownload, faGear, faMagnifyingGlass, faPrint, faUser } from '@fortawesome/free-solid-svg-icons'
import SwiperCarousel from '../component/SwiperCarousel.tsx';
const RegisterFrame = () => {
    const [currentPage , setCurrentPage] = useState(0);
    // const [pageContent , setPageContent] = useState();
    // useEffect(()=>{
    //     changePage(currentPage);
    //     console.log(currentPage);
    // },[currentPage])
    const changePage  = (crt : number)=>{
        switch (crt) {
            case 0:
                return (
                     <div>
                            <h2>報名登錄</h2>

                            <div className="progressionContainer">
                                <div className="progression">
                                    <div className="progression_percent" style={{width: "0%"}} />
                                </div>
                                <div className="percent_value"><h5>{0}%</h5></div>
                            </div>

                            <SwiperCarousel />
                        </div>
                );
                break;
            case 1:
                return(
                     <div>
                            <h2>1</h2>

                            <div className="progressionContainer">
                                <div className="progression">
                                    <div className="progression_percent" style={{width:"0%"}} />
                                </div>
                                <div className="percent_value"><h5>{0}%</h5></div>
                            </div>

                            <SwiperCarousel />
                        </div>
                )
                break;
            case 2:
                return(
                     <div>
                            <h2>2</h2>

                            <div className="progressionContainer">
                                <div className="progression">
                                    <div className="progression_percent" style={{width:"0%"}} />
                                </div>
                                <div className="percent_value"><h5>{0}%</h5></div>
                            </div>

                            <SwiperCarousel />
                        </div>
                )
                break;
            case 3:    
                return(
                     <div>
                            <h2>3</h2>

                            <div className="progressionContainer">
                                <div className="progression">
                                    <div className="progression_percent" style={{width:"0%"}} />
                                </div>
                                <div className="percent_value"><h5>{0}%</h5></div>
                            </div>

                            <SwiperCarousel />
                        </div>
                )
            default:
                break;
        }
    }
    return (
        
        <div className="registerFrameContainer">
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
                                <div className="item currentC" onClick={()=>{setCurrentPage(0)}}><div className="decoration"><FontAwesomeIcon icon={faUser} /></div><h4>報名登錄</h4></div>
                                <div className="item" onClick={()=>{setCurrentPage(1)}}><div className="decoration"><FontAwesomeIcon icon={faDatabase} /></div><h4>報名資料</h4></div>
                                <div className="item" onClick={()=>{setCurrentPage(2)}}><div className="decoration"><FontAwesomeIcon icon={faPrint} /></div><h4>資料列印</h4></div>
                                <div className="item" onClick={()=>{setCurrentPage(3)}}><div className="decoration"><FontAwesomeIcon icon={faMagnifyingGlass} /></div><h4>代碼查詢</h4></div>
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
                        {/* <div>
                            <h2>報名登錄</h2>

                            <div className="progressionContainer">
                                <div className="progression">
                                    <div className="progression_percent" style={{width:"0%"}} />
                                </div>
                                <div className="percent_value"><h5>{0}%</h5></div>
                            </div>

                            <SwiperCarousel />
                        </div> */}
                    </div>
                </div>



            </div>
        </div>
    )
}

export default RegisterFrame;
// 我是你的piyan