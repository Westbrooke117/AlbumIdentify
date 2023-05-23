import {useEffect, useRef, useState} from "react";

const ImageGrid = (props) => {
    const width = props.width;
    const height = props.height;

    const delay = 3000; // time between revealing of tiles
    const [squares, setSquares] = useState(Array.from({ length: width * height }, (_, i) => i)); // list of squares left to reveal (1D array)
    const refs = useRef({}); // keeps track of tiles, this initializes it
    let interval = useRef(null); // interval that repeatedly calls to reveal tiles

    useEffect(() => {
        if (!interval.current) {
            interval.current = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * squares.length); // get random place in squares left (as squares index not tiles id)
                const squareId = squares[randomIndex];

                refs.current[squareId].classList.add('revealed'); // get ref with squareId (the tile's id) and add revealed class
                setSquares(prevSquares => prevSquares.filter(square => square !== squareId)); // remove tile from squares

                if (squares.length === 0) {
                    clearInterval(interval.current); // if over: be over
                }
            }, delay);
        }
    }, []);

    return (
        <div className="centerContent">
            <div id="background-container" style={{backgroundImage: `url(${props.data.url})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: '100%'}}>
            {Array(height).fill(0).map((row, i) => (
                    <div key={i} className="blocks">
                        {Array(width).fill(0).map((col, j) => (
                            <div
                                className="block"
                                id={`${i},${j}`}
                                key={j}
                                ref = {e=>refs.current[i+j*width]=e} // sets the tile div into refs to be gotten later (with 1D id)
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