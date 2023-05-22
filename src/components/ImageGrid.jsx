const ImageGrid = (props) => {
    const w = props.width;
    const h = props.height;

    return(
        <div id="totalContainer">
            <div id="background-container">
                {
                    new Array(h).fill(0).map((x,i1)=>
                        <div className="blocks">
                            {(new Array(w)).fill(0).map((y,i2)=><div className="block" id={`block(${i2},${i1})`} style={{width:`${100/w}%`, height: `${100/h}%`}}></div>)}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ImageGrid;