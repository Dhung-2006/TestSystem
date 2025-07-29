import { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import type { IconName } from '@fortawesome/fontawesome-svg-core';
import DataTable, { type ExportDataType } from "../component/DataTable.tsx";
import type { Swiper as SwiperClass } from "swiper/types";
import Datas from "../json/swiperData.json";

library.add(fas);
type dispatchType = {
    text:string,
    status: boolean
}
type reactNodeType = {
    swiperRef: any,
    arg1: React.ReactNode,
    arg2: React.ReactNode;
    setText:React.Dispatch<React.SetStateAction<dispatchType>>
}

const TableSwiper = ({ swiperRef , arg1, arg2 , setText}: reactNodeType) => {


    // const [isDone, setIsDone] = useState(false);

    return (
        <Swiper
            spaceBetween={30}
            slidesPerView={1}
            allowSlidePrev={true}
            allowSlideNext={true}
            allowTouchMove={false}
            modules={[Navigation]}
            // navigation={{
            //     nextEl: '.next',
            //     prevEl: '.prev',
            // }}
            ref={swiperRef}
            // pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSlideChange={(swiper) => {
                if (swiper.activeIndex == 1) {
                    // setText(`報名資料 / ${123}`);
                    setText(prev=>({
                        ...prev,
                        status:true,
                        text: `報名資料 / 學生資料`
                    }));
                }
                else{
                   setText(prev=>({
                        ...prev,
                        status:false,
                        text: `報名資料`
                    }));
                }
            }}
            // onSwiper={(swiper) => console.log(swiper)}
            onSwiper={(swiper) => {
                swiperRef.current = swiper;
            }}>
            <SwiperSlide>
                {arg1}
            </SwiperSlide>
            <SwiperSlide>
                {arg2}
            </SwiperSlide>

            {/* <button onClick={() => { swiperRef.current?.slideNext() }}>click</button> */}
        </Swiper>

    )
}

export default TableSwiper;