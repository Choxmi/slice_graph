import { useEffect, useState } from "react";

const SliceRange = ({ position }) => {
    const [min,setMin] = useState(0);
    const [max,setMax] = useState(0);
    const [primary, setPrimary] = useState(false);

    const changeRange = (e,type) => {
        const val = e.target.value;
        if(type === "min") {
            setMin(val);
            window.sessionStorage.setItem('min',val);
        } else {
            setMax(val);
            window.sessionStorage.setItem('max',val);
        }
    }

    useEffect(()=>{
        const pos = position - 111;
        // console.log("MIN",(min * 1360)/120, "MAX", (max * 1360)/120, "POS", pos);
        if(max === 0) {
            setPrimary(false);
        } else if(pos > max) {
            setPrimary(false);
        } else if(primary <= min) {
            setPrimary(true);
        } else {
            if(pos - min > max - pos) {
                setPrimary(false);
            } else {
                setPrimary(true);
            }
        }
    // eslint-disable-next-line
    },[position]);

    useEffect(()=>{
        console.log("PRIMARY",primary);
    },[primary]);

    return <div className="slice-container">
        <input className="slider top-slider" type="range" min="0" max="120" value={min} style={{ width: '1360px', zIndex: primary ? 1000 : 100 }} onChange={(e)=>changeRange(e,"min")}/>
        <div className="slider-filler" style={{ width: (max-min) * 11.3, left: min * 11.3 }}></div>
        <input className="slider bottom-slider" type="range" min="0" max="120" value={max} style={{ width: '1360px', zIndex: primary ? 100 : 1000 }} onChange={(e)=>changeRange(e,"max")}/>
    </div>
}

export default SliceRange;