import './App.css'
import ImageGrid from "./components/ImageGrid.jsx";
import {useEffect, useState} from "react";
import {getAlbumData} from "./GetAlbumData.jsx";

function App() {
    const [albums, setAlbums] = useState([]);
    const [index, setIndex] = useState(Math.floor(Math.random()*50));

    useEffect(() => { //Fetches data required for getting image, artist, and album title
        const fetchData = async () => {
            const data = await getAlbumData("westbrooke117");
            setAlbums(data);
        };
        fetchData();
    }, []);

    return (
        <div className="App">
            {albums.length > 0 && <ImageGrid width={9} height={9} data={albums[index]}/>}
            <div className={"centerContent"}>
                <input type={"text"} list={"guess-input"} size={40}></input>
                <datalist id={"guess-input"}>
                    {albums.map((album) => (
                        <option value={album.album} />
                    ))}
                </datalist>
                <button onClick={() => {setIndex(Math.floor(Math.random()*50))}}>Next Album</button>
            </div>
        </div>
    )
}


export default App
