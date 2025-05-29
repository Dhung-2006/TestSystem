import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../component/Loading";
const SignupFrame = () =>{


    const [formValue , setFormValue] = useState({signEmail:"",signAccount:"" , signPassword:""});

    // const account = useRef(null);

    const handleFormValue = (e:React.ChangeEvent<HTMLInputElement>)=>{
        // name => get element裡面的name
        // value => get element裡面的value
        const {name , value } = e.target;
        setFormValue((prev)=>({ ...prev , [name]:value }));
    }


    const handleFormSubmit = async(e:React.ChangeEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("signEmail" , formValue.signEmail);
        formData.append("signAccount" , formValue.signAccount);
        formData.append("signPassword" , formValue.signPassword);
        const URL : string = "";
        try{
            const res = await fetch(URL,{
                method:"POST",
                body: formData
            })
            
            if(!res.ok) throw new Error("500 server error");
            const data = await res.json();
            console.log("成功",data)
            
        }
        catch(err){
            console.error("123",err);
        }
    }
    return(
        <div className="LoginFrameContainer">
                <Loading />
                    {/* 要判斷login/regist */}
                    <form className="loginbox" onSubmit={handleFormSubmit}>
                        <div className="boxContainer">
                            <div className="logoName">
                                {/* <div className="logo"><FontAwesomeIcon icon={faGear} /></div> */}
                                <h3>註冊帳號</h3>
                            </div>
                            <div className="loginDataContainer">
                                <div className="loginData">
                                    <label>Email</label>
                                    <input type="email" name="signEmail" onChange={handleFormValue} value={formValue.signEmail}/>
                                </div>
                                <div className="loginData">
                                    <label>帳號</label>
                                    <input type="text" name="signAccount" onChange={handleFormValue} value={formValue.signAccount}/>
                                </div>
                                <div className="loginData">
        
                                    <label>密碼</label>
                                    <input type="password" name="signPassword" onChange={handleFormValue} value={formValue.signPassword}/>
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
                                <button type="submit">註冊</button>
                                <div className="line"></div>
                                <Link to="/login"><span><u>返回登入頁面</u></span></Link>
                            </div>
                        </div>
                    </form>
                </div>
    )
}
export default SignupFrame; 