import { useEffect, useState } from "react";
const Loading = ()=>{
        const [fadeoutAnimate , setFadeoutAnimate] = useState(false);
        useEffect(()=>{
            setTimeout(() => {
                setFadeoutAnimate(true);
            }, 800);

    },[])
    return(
        <div className={`loading ${fadeoutAnimate?"op0":"none"}`}>
                <div className="loader" />
        </div>
    )
}
export default Loading;