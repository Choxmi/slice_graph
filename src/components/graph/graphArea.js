import { useRef, useState } from "react";
import SliceRange from "./sliceRange";

const GraphArea = ({ graphs, slices }) => {

    const [MousePosition, setMousePosition] = useState(0);
    const container = useRef();

    const BackgroundGrid = () => {
        return <table className="graph-grid">
            {[...Array(8)].map((e, i) => <tr>{[...Array(12)].map((e, i) => <td></td>)}</tr>)}
        </table>
    }

    const Graph = ({ data, color }) => {
        let pointStr = "";
        data.forEach(dat => {
            pointStr += `${(dat[1] - 10) * (container && container.current ? container.current.offsetWidth : 1360)},${dat[0] * 250} `
        });
        return <svg className="graph-line">
            <polyline fill="none" points={pointStr} stroke={color} />
        </svg>
    }

    const SlicedArea = ({ slice }) => {
        const sliceWidth = `${((slice.end - slice.start) / 120) * 100}%`;
        const slideLeft = `${((slice.start / 120) * 100)}%`;
        const startCorrection = `${((slice.start / 120) * 100) + ((slice.end - slice.start) * (slice.min_start/100))}%`;
        const actualWidth = `${(((slice.end - slice.start) * ((slice.min_end - slice.min_start)/100))/120)*100}%`;
        return <>
            <div style={{
                left: slideLeft, height: '250px',
                background: '#adadad', opacity: 0.3, top: 0, position: 'absolute', width: sliceWidth
            }}>
            </div>
            <div style={{
                left: startCorrection, height: '250px',
                background: '#636363', opacity: 0.8, top: 0, position: 'absolute', width: actualWidth
            }}>
            </div>
        </>
    }

    return <div className="graph-row graph-expanded">
        <div className="graph-ylabel">
            <p>1</p>
            <p>0</p>
        </div>
        <div className="graph-content" ref={container} onMouseMove={(ev) => {
            setMousePosition(ev.pageX);
        }}>
            <BackgroundGrid />
            <div className="graph-area">
                {graphs.map((graph) => graph.active ? <Graph color={graph.color} data={graph.data} /> : null)}
            </div>
            <SliceRange position={MousePosition} />
            {slices.map((slice) => <SlicedArea slice={slice} />)}
        </div>
        <div className="graph-ylabel"></div>
    </div>
}

export default GraphArea;