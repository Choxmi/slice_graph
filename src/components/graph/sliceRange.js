import { useEffect, useState } from "react";

const SliceRange = ({ position }) => {
    const [min, setMin] = useState(0);
    const [minPointer, setMinPointer] = useState(0);
    const [max, setMax] = useState(0);
    const [maxPointer, setMaxPointer] = useState(0);
    const [primary, setPrimary] = useState(false);

    const changeRange = (e, type) => {
        const val = e.target.value;
        if (type === "min") {
            if (position < maxPointer) {
                setMin(val);
                window.sessionStorage.setItem('min', val);
                setMinPointer(position);
            }
        } else {
            setMax(val);
            window.sessionStorage.setItem('max', val);
            setMaxPointer(position);
        }
    }

    useEffect(() => {
        if (max === 0) {
            setPrimary(false);
        } else {
            const half_box = (maxPointer - minPointer) / 2;
            if (position > (minPointer + half_box)) {
                setPrimary(false);
            } else {
                setPrimary(true);
            }
        }
        // eslint-disable-next-line
    }, [position]);

    useEffect(() => {
        console.log("PRIMARY", primary);
    }, [primary]);

    return <div className="slice-container">
        <input className="slider top-slider" type="range" min="0" max="120" value={min} style={{ zIndex: primary ? 1000 : 100 }} onChange={(e) => changeRange(e, "min")} />
        <div className="slider-filler" style={{ width: `${((max - min)/120)*100}%`, left: `${((min/120)*100)}%` }}></div>
        <input className="slider bottom-slider" type="range" min="0" max="120" value={max} style={{ zIndex: primary ? 100 : 1000 }} onChange={(e) => changeRange(e, "max")} />
    </div>
}

export default SliceRange;