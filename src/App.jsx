import './App.css'
import ImageGrid from "./components/ImageGrid.jsx";
import { useEffect, useState, createRef } from "react";
import { getAlbumData } from "./GetAlbumData.jsx";

function App() {
    let [albums, setAlbums] = useState([]);
    let [artistSim, setArtistSim] = useState("");
    let [albumSim, setAlbumSim] = useState("");
    let [doneArtist, setDoneArtist] = useState(false);
    let [doneAlbum, setDoneAlbum] = useState(false);
    let [finished, finish] = useState(false);
    let [index, setIndex] = useState(0);

    useEffect(() => {
        (async () => {
            const fetchedAlbums = await getAlbumData("westbrooke117", "overall");
            setAlbums(fetchedAlbums);

            const randomIndex = Math.floor(Math.random() * fetchedAlbums.length);
            setIndex(randomIndex);
        })();
    }, []);

    let rf1 = createRef()
    let artistRef = createRef()
    let albumRef = createRef()

    let [ score, setScore ] = useState([0, 6]);

    return (
        <div className="App">
            <div className={"centerContent"}>
                <h2 id="scoreheader" className={"centerContent"}>Score: {score[0]}/{score[1]}</h2>
                { albums.length > 0 && <ImageGrid itsover={submitPressed} ref={rf1} delay={3000} width={7} height={7} data={albums[index]}/> }
                <div id="textinputs">
                <form onSubmit={artistSubmit}>
                    <label htmlFor="artistinput">Artist</label>
                    <input id={"artistinput"} className={"textinput"} type={"text"} ref={artistRef} list={"artist-input"} size={30} autoComplete="off"></input>
                </form>
                <form onSubmit={albumSubmit}>
                    <label htmlFor="albuminput">Album</label>
                    <input id={"albuminput"} className={"textinput"} type={"text"} ref={albumRef} list={"album-input"} size={30} autoComplete="off"></input>
                </form>
                    <button className={`submitbutton${finished?" finished":""} submitbutton`} onClick={submitPressed}>{finished?"Next":"Give Up"}</button>
                </div>
            </div>
            {/* <p className={"centerContent"}>{artistSim}</p> */}
        </div>
    )
    function submitPressed(){
        if(finished){
            nextAlbum();
        } else {
            // give up
            artistRef.current.value = albums[index].artist;
            albumRef.current.disabled = true;
            albumRef.current.value = albums[index].album;
            artistRef.current.disabled = true;
            finished = true;
            finish(true);
            rf1.current.revealAll();

        }
    }
    function artistSubmit(e=false) {
        if(e !== false)e.preventDefault();

        let artistInput = artistRef.current.value;
        let artistAnswer = albums[index].artist;

        if(artistInput === "") return
        artistInput = artistInput.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
        artistAnswer = artistAnswer.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");       

        artistSim = stringSimilarity.compareTwoStrings(artistInput, artistAnswer);
        setArtistSim(artistSim);
        switch(manageClass(artistRef.current, artistSim)){
            case 0:
                artistRef.current.value = albums[index].artist;
                doneArtist = true;
                setDoneArtist(true);
                score[0] += 2;
                setScore(score);
                if(doneAlbum){
                    finished = true;
                    finish(true)
                    rf1.current.revealAll();
                    return;
                }
                albumRef.current.focus();
                break;
            }
    }
    function albumSubmit(e=false){
        if(e !== false)e.preventDefault();

        let albumInput = albumRef.current.value
        let albumAnswer = albums[index].album;

        if(albumInput === "") return;
        
        albumInput = albumInput.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
        albumAnswer = albumAnswer.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");

        albumSim = stringSimilarity.compareTwoStrings(albumInput, albumAnswer);
        setAlbumSim(albumSim);
        switch(manageClass(albumRef.current, albumSim)){
            case 0:
                albumRef.current.value = albums[index].album;
                doneAlbum = true;
                setDoneAlbum(true);
                score[0] += 4;
                setScore(score);
                if(doneArtist){
                    finished = true;
                    finish(true);
                    rf1.current.revealAll();
                    return;
                }
                artistRef.current.focus();
                break;
        }
    }

    function manageClass(div, sim){
        if (sim >= 0.75) {            
            div.disabled = true;
            div.classList.remove("incorrect");
            div.classList.remove("semicorrect");
            div.classList.add("correct");
            return 0;
        } else if(sim >= 0.5) {
            div.classList.remove("incorrect");
            div.classList.add("semicorrect");
            return 1;
        } else {
            div.classList.remove("semicorrect");
            div.classList.add("incorrect");
            return 2;
        }
    }
    function nextAlbum(){
        score[1] += 6
        setScore(score);

        albums.splice(index, 1);
        setAlbums(albums);
        setIndex(Math.floor(Math.random()*albums.length))
        rf1.current.newImage();
        artistRef.current.classList.remove('correct');
        artistRef.current.disabled = false;
        artistRef.current.value = "";
        artistRef.current.focus();

        albumRef.current.classList.remove('correct');
        albumRef.current.disabled = false;
        albumRef.current.value = "";

        doneAlbum = false;
        doneArtist = false;
        setDoneAlbum(false);
        setDoneArtist(false);
        finished = false;
        finish(false);
    }
}


export default App
