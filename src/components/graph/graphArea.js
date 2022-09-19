import { useState } from "react";
import SliceRange from "./sliceRange";

const GraphArea = ({ graphs, slices }) => {

    const [MousePosition, setMousePosition] = useState(0);

    const BackgroundGrid = () => {
        return <table className="graph-grid">
            {[...Array(8)].map((e, i) => <tr>{[...Array(12)].map((e, i) => <td></td>)}</tr>)}
        </table>
    }

    const Graph = ({ data }) => {
        let pointStr = "";
        data.forEach(dat => {
            pointStr += `${(dat[1] - 10) * 1360},${dat[0] * 250} `
        });
        return <svg width="1360" height="250">
            <polyline fill="none" points={pointStr} stroke="black" />
        </svg>
    }

    const SlicedArea = ({ slice }) => {
        const sliceWidth = ((slice.end - slice.start) * 1360) / 120;
        const slideLeft = ((slice.start * 1360) / 120);
        const startCorrection = sliceWidth * slice.min_start;
        const endCorrection = sliceWidth * slice.min_end;
        return <>
            <div style={{
                left: slideLeft, height: '250px',
                background: '#adadad', opacity: 0.3, top: 0, position: 'absolute', width: sliceWidth
            }}>
            </div>
            <div style={{
                left: slideLeft + startCorrection, height: '250px',
                background: '#636363', opacity: 0.8, top: 0, position: 'absolute', width: sliceWidth - endCorrection - startCorrection
            }}>
            </div>
        </>
    }

    return <div className="graph-row graph-expanded">
        <div className="graph-ylabel">
            <p>1</p>
            <p>0</p>
        </div>
        <div className="graph-content" onMouseMove={(ev) => {
            setMousePosition(ev.pageX);
        }}>
            <BackgroundGrid />
            <div className="graph-area">
                {graphs.map((graph) => graph.active ? <Graph data={graph.data} /> : null)}
            </div>
            <SliceRange position={MousePosition} />
            {slices.map((slice) => <SlicedArea slice={slice} />)}
        </div>
        <div className="graph-ylabel"></div>
    </div>
}

export default GraphArea;