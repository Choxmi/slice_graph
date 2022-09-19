import { useEffect, useState } from "react";
import Channels from "./components/channels";
import Graph from "./components/graph";
import Slices from "./components/slices";
import Content from "./constants/content.json"

function Slicer() {
  const [slices,setSlices] = useState([]);
  const [content,setContent] = useState(Content);

  useEffect(()=>{
    window.sessionStorage.setItem("min",0);
    window.sessionStorage.setItem("max",0);
  },[]);

  const addSlice = () => {
    const tempSlices = slices;
    let maxId = Math.max(...tempSlices.map(obj => obj.id));
    if(maxId < 0) maxId = 0;
    tempSlices.push({
      id: maxId+1,
      start: window.sessionStorage.getItem("min"),
      end: window.sessionStorage.getItem("max"),
      min_start: 0.1,
      min_end: 0.1
    });
    setSlices([...tempSlices]); 
  }

  const removeSlice = (id) => {
    const tempSlices = slices.filter((item)=>item.id !== id);
    setSlices([...tempSlices]); 
  }

  const disableChannel = (id) => {
    const channels = [];
    content.forEach((slice)=>{
      if(slice.id === id) {
        if(slice.active) {
          slice.active = false;
        } else {
          slice.active = true;
        }
      }
      channels.push(slice);
    })
    setContent(channels);
  }

  return (
    <div className="App">
      <Channels channels={content} addChannel={setContent} disableChannel={disableChannel} />
      <Graph graphs={content} addSlice={addSlice} slices={slices}/>
      <Slices slices={slices} addSlice={addSlice} removeSlice={removeSlice}/>
    </div>
  );
}

export default Slicer;
