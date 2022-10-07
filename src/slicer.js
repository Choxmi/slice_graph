import { useEffect, useState } from "react";
import Channels from "./components/channels";
import Graph from "./components/graph";
import Slices from "./components/slices";
// Initial channels
import Content from "./constants/content.json";
// Channels pool
import ExtraContent from "./constants/extraContent.json";

function Slicer() {
  const [slices, setSlices] = useState([]);
  const [content, setContent] = useState(Content);
  const [pool, setPool] = useState(ExtraContent);

  useEffect(() => {
    window.sessionStorage.setItem("min", 0);
    window.sessionStorage.setItem("max", 0);
  }, []);

  const addSlice = () => {
    const tempSlices = slices;
    let maxId = Math.max(...tempSlices.map(obj => obj.id));
    if (maxId < 0) maxId = 0;
    tempSlices.push({
      id: maxId + 1,
      start: window.sessionStorage.getItem("min"),
      end: window.sessionStorage.getItem("max"),
      min_start: 10,
      min_end: 90
    });
    setSlices([...tempSlices]);
  }

  const updateSlice = ({ id, start, end, min_start, min_end }) => {
    const tempSlices = slices;
    tempSlices.map((obj) => {
      if (obj.id === id) {
        obj.start = start;
        obj.end = end;
        obj.min_start = min_start;
        obj.min_end = min_end;
      }
      return obj;
    });
    setSlices([...tempSlices]);
  }

  const removeSlice = (id) => {
    const tempSlices = slices.filter((item) => item.id !== id);
    setSlices([...tempSlices]);
  }

  const disableChannel = (id) => {
    const channels = [];
    content.forEach((slice) => {
      if (slice.id === id) {
        if (slice.active) {
          slice.active = false;
        } else {
          slice.active = true;
        }
      }
      channels.push(slice);
    })
    setContent(channels);
  }

  const addChannel = (channel) => {
    setContent([...content, channel]);
    const tempPool = pool;
    const filtered = tempPool.filter((item)=>item.id !== channel.id);
    setPool([...filtered]);
  }

  const removeChannel = (channel) => {
    setPool([...pool, channel]);
    const tempContent = content;
    const filtered = tempContent.filter((item)=>item.id !== channel.id);
    setContent([...filtered]);
  }

  return (
    <div className="App">
      <Channels channels={content} addChannel={addChannel} disableChannel={disableChannel} pool={pool} removeChannel={removeChannel} />
      <Graph graphs={content} addSlice={addSlice} slices={slices} />
      <Slices slices={slices} addSlice={addSlice} removeSlice={removeSlice} updateSlice={updateSlice} />
    </div>
  );
}

export default Slicer;
