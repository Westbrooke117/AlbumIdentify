import {useEffect, useState} from "react";
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

    const [url, setUrl] = useState(null);

    useEffect(() => {
        async function getAlbumURL(){
            const api = axios.create();
            try {
                const response = await api.get(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=${props.artist}&album=${props.album}&api_key=82d112e473f59ade0157abe4a47d4eb5&format=json`);
                setUrl(response.data.album.image[5]["#text"]);
            } catch (err) {
                console.log(err);
            }
        }
        getAlbumURL()
    }, [props.artist, props.album]);

    if (url === null) {
        return (<p>Loading...</p>);
    } else {
        return (
            <div id="totalContainer">
                <div id="background-container" style={{background: `url(${url}) no-repeat center center`, backgroundSize:"100%"}}>
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
    }
};

export default ImageGrid;