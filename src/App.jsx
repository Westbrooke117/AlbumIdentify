import './App.css'
import ImageGrid from "./components/ImageGrid.jsx";
import {useEffect, useState, createRef} from "react";
import {getAlbumData} from "./GetAlbumData.jsx";

function App() {
    const [albums, setAlbums] = useState([]);
    const [index, setIndex] = useState(Math.floor(Math.random()*50));

    useEffect(() => { //Fetches data required for getting image, artist, and album title
        const fetchData = async () => {
            const data = await getAlbumData("nichowas12");
            setAlbums(data);
        };
        fetchData();
    }, []);
    let rf1 = createRef()
    let rf2 = createRef()
    let onsubmit = (e) => {
        e.preventDefault();
        let text = rf2.current.value, answer = albums[index].album;
        text = text.toLowerCase().replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ");
        answer = answer.toLowerCase().replace(/[^\w\s\']|_/g, "").replace(/\s+/g, " ");
        let compare = stringSimilarity.compareTwoStrings(text, answer);
        if(compare >= 0.7) {
            rf2.current.value = "";
            console.log(answer);
            // console.log(`${text} - ${answer} => ${compare}`);
            albums.splice(index, 1);
            setAlbums(albums);

            setIndex(Math.floor(Math.random()*albums.length))
            rf1.current.newImage();
        } else {
            console.log(compare);
        }
    };
    let itsover = ()=>{
        console.log(":(")
    }
    return (
        <div className="App">
            { albums.length > 0 && <ImageGrid itsover={itsover} ref={rf1} delay={5000} width={3} height={3} data={albums[index]}/> }
            <div className={"centerContent"}>
                <form onSubmit={onsubmit}>
                    <input type={"text"} ref={rf2} list={"guess-input"} size={40}></input>
                    {/* <datalist id={"guess-input"}>
                        {albums.map((album, i) => (
                            <option key={i} value={album.album} />
                            ))}
                    </datalist> */}
                    <button type = "submit">Next Album</button>
                </form>
            </div>
        </div>
    )
}


export default App
