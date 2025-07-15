import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
export type LoadingType = {
    triggerChange : () => void;
}
const Loading = forwardRef<LoadingType>((_,ref) => {
    const [fadeoutAnimate, setFadeoutAnimate] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setFadeoutAnimate(true);
        }, 800);

    }, [])
    
    useImperativeHandle(ref,()=>({
        triggerChange :()=>{
            setFadeoutAnimate(false);
            setTimeout(() => {
                setFadeoutAnimate(true);
            }, 800);
        }

    }),[])
    

    return (
        <div className={`loading ${fadeoutAnimate ? "op0" : "none"}`}>
            <div className="loader" />
        </div>
    )
})
export default Loading;