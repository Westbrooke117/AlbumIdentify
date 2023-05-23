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
    let inputRef = createRef()

    const handleSubmit = (e) => {
        e.preventDefault();
        GetStringSimilarity();
    };
    let itsover = ()=>{
        console.log(":(")
    }

    const [ score, setScore ] = useState(0);

    return (
        <div className="App">
            <h2 className={"centerContent"}>Score: {score}</h2>
            <div className={"centerContent"}>
                <button onClick={() => {NextAlbum()}}>Skip Album</button>
            </div>
            { albums.length > 0 && <ImageGrid itsover={itsover} ref={rf1} delay={5000} width={7} height={7} data={albums[index]}/> }
            <div className={"centerContent"}>
                <form onSubmit={handleSubmit}>
                    <input type={"text"} ref={inputRef} list={"guess-input"} size={40}></input>
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
        let userInput = inputRef.current.value, answer = albums[index].album;

        userInput = userInput.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
        answer = answer.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");

        let compare = stringSimilarity.compareTwoStrings(userInput, answer);
        if(compare >= 0.75) {
            inputRef.current.value = "";
            setSimilarityValue(`Correct! Answer was "${albums[index].album}" by ${albums[index].artist}`)

            NextAlbum();
            setScore(score + 1);
        } else {
            setSimilarityValue(Math.floor((compare/1)*100)+"% similar")
        }
    }

    function NextAlbum(){
        albums.splice(index, 1);
        setAlbums(albums);
        setIndex(Math.floor(Math.random()*albums.length))
        rf1.current.newImage();
    }
}


export default App
