import './App.css'
import ImageGrid from "./components/ImageGrid.jsx";
import {useEffect, useState, createRef} from "react";
import {getAlbumData} from "./GetAlbumData.jsx";

function App() {
    const [albums, setAlbums] = useState([]);
    const [index, setIndex] = useState(Math.floor(Math.random()*50));
    const [similarityValue, setSimilarityValue] = useState("");

    useEffect(() => { //Fetches data required for getting image, artist, and album title
        const fetchData = async () => {
            const data = await getAlbumData("westbrooke117");
            setAlbums(data);
        };
        fetchData();
    }, []);

    let rf1 = createRef()
    let rf2 = createRef()

    const handleSubmit = (e) => {
        e.preventDefault();
        GetStringSimilarity();
    };
    let itsover = ()=>{
        console.log(":(")
    }

    return (
        <div className="App">
            { albums.length > 0 && <ImageGrid itsover={itsover} ref={rf1} delay={5000} width={5} height={5} data={albums[index]}/> }
            <div className={"centerContent"}>
                <form onSubmit={handleSubmit}>
                    <input type={"text"} ref={rf2} list={"guess-input"} size={40}></input>
                    {/* <datalist id={"guess-input"}>
                        {albums.map((album, i) => (
                            <option key={i} value={album.album} />
                            ))}
                    </datalist> */}
                    <button type={"submit"}>Next Album</button>
                </form>
            </div>
            <p className={"centerContent"}>{similarityValue}</p>
        </div>
    )

    function GetStringSimilarity(){
        let userInput = rf2.current.value, answer = albums[index].album;

        userInput = userInput.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
        answer = answer.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");

        let compare = stringSimilarity.compareTwoStrings(userInput, answer);
        if(compare >= 0.75) {
            rf2.current.value = "";
            setSimilarityValue(`Correct! Answer was "${albums[index].album}" by ${albums[index].artist}`)
            // console.log(`${text} - ${answer} => ${compare}`);
            albums.splice(index, 1);
            setAlbums(albums);

            setIndex(Math.floor(Math.random()*albums.length))
            rf1.current.newImage();
        } else {
            setSimilarityValue(Math.floor((compare/1)*100)+"% similar")
        }
    }
}

export default App
