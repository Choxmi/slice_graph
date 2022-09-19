import 'styles/channels.scss';
import Close from './close.png';

const Channels = ({ channels = [], addChannel, disableChannel }) => {

    const ChannelButton = ({ channel }) => {
        return <button className='channel-btn' style={{ background: channel.active ? channel.color : 'gray' }} onClick={()=>disableChannel(channel.id)}>
            <button className='channel-close-btn'>
                <img src={Close} alt="Close Channel" style={{ width: 15, height: 15 }}/>
            </button>
            {channel.name}
        </button>
    }

    return <div className='channel-container'>
        <p className='channel-title'>Select Channels</p>
        <div className='channel-box'>
            {channels.map((channel)=>{
                return <ChannelButton channel={channel}/>
            })}
            <button className='channel-add'>+</button>
        </div>
    </div>
}

export default Channels;