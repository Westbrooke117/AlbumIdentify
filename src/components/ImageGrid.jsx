import {useRef, useEffect, useState} from "react";
import axios from "axios";

class AlbumQuestion {
    constructor(url, album_name, artist) {
        this.url = url;
        this.album_name = album_name;
        this.artist = artist;
    }
    CheckAnswer(userResponse){
        return userResponse === this.album_name;
    }
}
const ImageGrid = (props) => {
    const width = props.width;
    const height = props.height;
    const timebetween = 3000; // time between revealing of tiles
    let [squares, setSquares] = useState((new Array(width*height)).fill(0).map((_,i)=>i)); // list of squares left to reveal (1D array)
    const [url, setUrl] = useState(null);
    
    
    let refs = useRef({}); // keeps track of tiles, this intitializes it
    let interval = false; // interval that repeatedly calls to reveal tiles 
    useEffect(() => {
        (async ()=>{
            const api = axios.create();
            try {
                const response = await api.get(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=${props.artist}&album=${props.album}&api_key=82d112e473f59ade0157abe4a47d4eb5&format=json`);
                setUrl(response.data.album.image[5]["#text"]);
                if(interval === false) interval = setInterval(()=>{ // if not already done, set and save interval
                    let i = Math.floor(Math.random()*squares.length); // get random place in squares left (as squares index not tiles id)
                    refs.current[squares[i]].classList.add('revealed') // get ref with squares[i] (the tiles id) and add revealed class
                    squares.splice(i, 1); // remove tile from squares
                    setSquares(squares);
                    if(squares.length === 0) clearInterval(interval); // if over: be over
                }, timebetween)
            } catch (err) {
                console.log(err);
            }
        })();
    }, [props.artist, props.album]);

    if (url === null) {
        return (<p>Loading...</p>);
    } else {
        // setrefs(refs);
        return (
            <div id="totalContainer">
                <div id="background-container" style={{background: `url(${url}) no-repeat center center`, backgroundSize:"100%"}}>
                    {Array(height).fill(0).map((row, i) => ( // Array of rows size height, mapping w/ y=i
                        <div key={i} className="blocks">
                            {Array(width).fill(0).map((col, j) => // Array of tiles in row, mapping w/ x=j
                                <div className="block"
                                    id={`${i},${j}`}
                                    key = {j}
                                    ref = {e=>refs.current[i+j*width]=e} // sets the tile div into refs to be gotten later (with 1D id)
                                    style={{ // set size
                                        width: `${100 / width}%`,
                                        height: `${100 / height}%`,
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>  
        );
    }
};

export default ImageGrid;