const HorizontalLabels = () => {
    const timeList = ['10.00','10.05','10.10','10.15','10.20','10.25','10.30','10.35','10.40','10.45','10.50','10.55','11.00'];
    return <div className="graph-row">
        {timeList.map((time)=><div className="graph-xlabel">{time}</div>)}
    </div>
}

export default HorizontalLabels;