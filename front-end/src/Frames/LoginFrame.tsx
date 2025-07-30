import { json, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from '@fortawesome/free-solid-svg-icons'
import Loading from "../component/Loading";
import { useEffect, useState, useRef } from "react";
const LoginFrame = () => {

    // const [loginAccount , setLoginAccount] = useState("");
    // const [LoginPassword , setLoginPassword] = useState("");

    const [loading, setLoading] = useState(true);
    const [formValue, setFormValue] = useState({ loginAccount: "", loginPassword: "" });

    useEffect(() => { 
        setLoading(false);
        setTimeout(()=>{
            setLoading(true);
        },800)
    }, [])

    const handleFormValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        // name => get element裡面的name
        // value => get element裡面的value
        const { name, value } = e.target;
        setFormValue((prev) => ({ ...prev, [name]: value }));
    }



    const handleFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = {
            'loginAccount': formValue.loginAccount,
            'loginPassword': formValue.loginPassword
        }
        // formData.append("loginAccount" , formValue.loginAccount);
        // formData.append("loginPassword" , formValue.loginPassword);
        const URL: string = "http://localhost:3000/login";
        try {
            const res = await fetch(URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials:"include" ,
                body: JSON.stringify(formData)
            })

            if (!res.ok) throw new Error("500 server error");
            const data = await res.json();
            console.log("成功", data)

        }
        catch (err) {
            console.error("123", err);
        }
    }
    // useEffect(()=>{console.log(loginAccount)},[loginAccount])
    // const submitForm = ():void =>{
    //     const URL = '';
    //     fetch(URL,{
    //         method:'POST',
    //         // headers:{
    //         //     'Content-Type':
    //         // }
    //     })
    // }
    return (
        <div className="LoginFrameContainer">
            <Loading arg={loading} />
            {/* 要判斷login/regist */}
            <form className="loginbox" onSubmit={(handleFormSubmit)}>
                <div className="boxContainer">
                    <div className="logoName">
                        <div className="logo"><FontAwesomeIcon icon={faGear} /></div>
                        <h3>桃竹檢定管理系統</h3>
                    </div>
                    <div className="loginDataContainer">
                        <div className="loginData">
                            <label>帳號</label>
                            <input type="text" name="loginAccount" onChange={handleFormValue} value={formValue.loginAccount} required />
                        </div>
                        <div className="loginData">

                            <label>密碼</label>
                            <input type="password" name="loginPassword" onChange={handleFormValue} value={formValue.loginPassword} required />
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
                        <Link to="/signupframe"><span>沒有帳號嗎？<u>註冊一個帳號</u></span></Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default LoginFrame;