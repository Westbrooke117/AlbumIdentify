import './App.css'
import ImageGrid from "./components/ImageGrid.jsx";
import {useEffect, useState} from "react";
import {getAlbumData} from "./GetAlbumData.jsx";

function App() {
    const [albums, setAlbums] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => { //Fetches data required for getting image, artist, and album title
        const fetchData = async () => {
            const data = await getAlbumData("nichowas12");
            setAlbums(data);
        };
        fetchData();
    }, []);

    return (
        <div className="App">
            {albums.length > 0 && <ImageGrid width={5} height={5} data={albums[count]}/>}
            <div className={"centerContent"}>
                <button onClick={() => {setCount(count + 1)}}>Next Album</button>
            </div>
        </div>
    )
}


export default App
