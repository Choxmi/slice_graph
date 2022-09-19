import 'styles/graph.scss'
import GraphArea from './graphArea';
import HorizontalLabels from './horizontalLabels';
import Scissor from './scissor.png';

const Graph = ({graphs, addSlice, slices}) => {
    return <div className='graph-card'>
        <img className='graph-scissor' src={Scissor} alt="Scissor button" onClick={()=>addSlice()}/>
        <p>Selected Channels</p>
        <div className='graph-container'>
            <GraphArea graphs={graphs} slices={slices}/>
            <HorizontalLabels/>
            <h6 style={{ textAlign: 'center' }}>TIME</h6>
        </div>
    </div>
}

export default Graph;