import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from '@fortawesome/free-solid-svg-icons'
const LoginFrame = () => {
    return (
        <div className="LoginFrameContainer">
            {/* 要判斷login/regist */}
            <form className="loginbox">
                <div className="boxContainer">
                    <div className="logoName">
                        <div className="logo"><FontAwesomeIcon icon={faGear} /></div>
                        <h3>桃竹檢定管理系統</h3>
                    </div>
                    <div className="loginDataContainer">
                        <div className="loginData">
                            <label>帳號</label>
                            <input type="text" />
                        </div>
                        <div className="loginData">

                            <label>密碼</label>
                            <input type="password" />
                        </div>
                    </div>
                    <div className="otherFunction">
                        {/* 
                        記住帳密
                        忘記密碼
                        用localstorage
                         */}
                        {/* <input type="checkbox" name="" id="" />
                        <label>記住我</label> */}

                    </div>
                    <div className="loginButton">
                        <button type="submit">登入</button>
                        <div className="line"></div>
                        <span>沒有帳號嗎？<u>註冊一個帳號</u></span>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default LoginFrame;