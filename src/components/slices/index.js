import 'styles/slices.scss'
import Close from './close.png';

const Slices = ({ slices, addSlice, removeSlice }) => {
    return <div>
        {
            slices.map((slice)=>{
                return <div className='slices-card' style={{ alignItems: 'center' }}>
                    <div style={{ display: 'flex', flex: 2 }}>
                        <h5 style={{ marginRight: 5 }}>ID</h5>
                        <input disabled placeholder={slice.id}/>
                    </div>
                    <div style={{ display: 'flex', flex: 1 }}>
                        <h5 style={{ marginRight: 5 }}>Start</h5>
                        <input placeholder={slice.start}/>
                    </div>
                    <div style={{ display: 'flex', flex: 1 }}>
                        <h5 style={{ marginRight: 5 }}>End</h5>
                        <input type="number" placeholder={slice.end}/>
                    </div>
                    <div style={{ display: 'flex', flex: 1 }}>
                        <h5 style={{ marginRight: 5 }}>MIN START</h5>
                        <input type="text" disabled placeholder={slice.min_start}/>
                    </div>
                    <div style={{ display: 'flex', flex: 1 }}>
                        <h5 style={{ marginRight: 5 }}>MIN END</h5>
                        <input type="text" disabled placeholder={slice.min_end}/>
                    </div>
                    <img src={Close} alt="Close" style={{ width: 20, height: 20, cursor: 'pointer' }} onClick={()=>removeSlice(slice.id)} />
                </div>
            })
        }
        <button style={{ marginTop: '1em', fontSize: 10, justifyContent: 'center' }} className='slices-card' onClick={()=>{
            window.sessionStorage.setItem('min',0);
            window.sessionStorage.setItem('max',120);
            addSlice();
        }}>+</button>
    </div>
}

export default Slices;