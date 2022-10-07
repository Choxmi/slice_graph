import { useState } from 'react';
import 'styles/channels.scss';
import Close from './close.png';

const Channels = ({ channels = [], addChannel, disableChannel, pool = [], removeChannel }) => {
    const [alts, setAlts] = useState(false);

    const ChannelButton = ({ channel }) => {
        return <div className='channel-btn' style={{ background: channel.active ? channel.color : 'gray', color: channel.text }}>
            <button style={{ zIndex: 1000 }} className='channel-close-btn' onClick={() => removeChannel(channel)}>
                <img src={Close} alt="Close Channel" style={{ width: 15, height: 15 }} />
            </button>
            <div onClick={() => disableChannel(channel.id)}>
                {channel.name}
            </div>
        </div>
    }

    const AltButton = ({ channel }) => {
        return <button className='channel-btn' style={{ background: channel.active ? channel.color : 'gray', color: channel.text }} onClick={() => addChannel(channel)}>
            {channel.name}
        </button>
    }

    return <div>
        <div className='channel-container'>
            <p className='channel-title'>Select Channels</p>
            <div className='channel-box'>
                {channels.map((channel) => {
                    return <ChannelButton channel={channel} />
                })}
                <button style={{ fontSize: 15 }} className='channel-add' onClick={() => setAlts(!alts)}>{alts ? "X" : "+"}</button>
            </div>
            {/* <DialogBox/> */}
        </div>
        {alts ? <div className='channel-container'>
            <p className='channel-title'>Other Channels</p>
            <div className='channel-box'>
                {pool.map((channel) => {
                    return <AltButton channel={channel} />
                })}
            </div>
            {/* <DialogBox/> */}
        </div> : null}
    </div>
}

export default Channels;