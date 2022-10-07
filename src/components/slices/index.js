import 'styles/slices.scss'
import Close from './close.png';

const Slices = ({ slices, addSlice, removeSlice, updateSlice }) => {

    const convertToTime = (num) => {
        if (num === 120) {
            return '11.00'
        } else {
            return `10.${(num / 2).toFixed(0)}`
        }
    }

    const onChange = (e, field, slice) => {
        let start = slice.start;
        let end = slice.end;
        let min_start = slice.min_start;
        let min_end = slice.min_end;
        const val = parseFloat(e.target.value);
        if (field === "start") {
            if (val >= 10 && val <= 11) {
                if (val === 11) {
                    start = 120;
                } else if (val < 10.6) {
                    start = ((val - 10) * 100 / 60) * 120;
                } else {
                    console.log("Invalid value");
                }
            }
        } else if (field === "end") {
            if (val >= 10 && val <= 11) {
                if (val === 11) {
                    end = 120;
                } else if (val < 10.6) {
                    end = ((val - 10) * 100 / 60) * 120;
                } else {
                    console.log("Invalid value");
                }
            }
        } else if (field === "min_start") {
            if (min_end > val) {
                min_start = val;
            }
        } else if (field === "min_end") {
            if (min_start < val) {
                min_end = val;
            }
        }
        updateSlice({ id: slice.id, start, end, min_start, min_end });
    }

    return <div className='slices-container'>
        {
            slices.map((slice) => {
                return <div className='slices-card' style={{ alignItems: 'center' }}>
                    <div className="slices-input">
                        <h5 style={{ marginRight: 5 }}>ID</h5>
                        <input disabled placeholder={slice.id} />
                    </div>
                    <div className="slices-input">
                        <h5 style={{ marginRight: 5 }}>Start</h5>
                        <input type="number" onChange={(e) => onChange(e, "start", slice)} placeholder={convertToTime(slice.start)} />
                    </div>
                    <div className="slices-input">
                        <h5 style={{ marginRight: 5 }}>End</h5>
                        <input type="number" onChange={(e) => onChange(e, "end", slice)} placeholder={convertToTime(slice.end)} />
                    </div>
                    <div className="slices-input">
                        <h5 style={{ marginRight: 5 }}>MIN START (%)</h5>
                        <input type="number" onChange={(e) => onChange(e, "min_start", slice)} placeholder={slice.min_start} />
                    </div>
                    <div className="slices-input">
                        <h5 style={{ marginRight: 5 }}>MIN END (%)</h5>
                        <input type="number" onChange={(e) => onChange(e, "min_end", slice)} placeholder={slice.min_end} />
                    </div>
                    <div style={{ width: '10%' }}>
                        <img src={Close} alt="Close" style={{ width: 20, height: 20, cursor: 'pointer' }} onClick={() => removeSlice(slice.id)} />
                    </div>
                </div>
            })
        }
        <button style={{ margin: 'auto', marginTop: '1em', fontSize: 20, justifyContent: 'center', padding: 5 }} className='slices-card' onClick={() => {
            window.sessionStorage.setItem('min', 0);
            window.sessionStorage.setItem('max', 120);
            addSlice();
        }}>+</button>
    </div>
}

export default Slices;