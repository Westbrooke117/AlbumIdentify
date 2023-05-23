const ImageGrid = (props) => {
    const width = props.width;
    const height = props.height;

    return (
        <div className="centerContent">
            <div id="background-container" style={{backgroundImage: `url(${props.data.url})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: '100%'}}>
            {Array(height).fill(0).map((row, i) => (
                    <div className="blocks">
                        {Array(width).fill(0).map((col, j) => (
                            <div
                                className="block"
                                key={`${i+1},${j+1}`}
                                id={`${i+1},${j+1}`}
                                style={{
                                    width: `${100 / width}%`,
                                    height: `${100 / height}%`,
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGrid;