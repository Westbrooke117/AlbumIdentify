import {createRef, useEffect, useState} from "react";
import {getAlbumData} from "../GetAlbumData.jsx";
import {Button, Container, Flex, FormLabel, Heading, Input, Text} from "@chakra-ui/react";
import ImageGrid from "../components/ImageGrid.jsx";
import PlaceholderImageGrid from "../components/PlaceholderImageGrid.jsx";
import {Link, redirect, useParams} from "react-router-dom";

function GamePage() {
    const { username,period, size } = useParams();

    let [albums, setAlbums] = useState([]);
    let [artistSim, setArtistSim] = useState("");
    let [albumSim, setAlbumSim] = useState("");
    let [doneArtist, setDoneArtist] = useState(false);
    let [doneAlbum, setDoneAlbum] = useState(false);
    let [finished, finish] = useState(false);
    let [index, setIndex] = useState(0);
    let [receivedResponse, setResponseStatus] = useState(false);

    useEffect(() => {
        (async () => {
            const fetchedAlbums = await getAlbumData(username, period);
            setAlbums(fetchedAlbums);
            setResponseStatus(true);

            const randomIndex = Math.floor(Math.random() * fetchedAlbums.length);
            setIndex(randomIndex);
        })();
    }, []);

    let rf1 = createRef()
    let artistRef = createRef()
    let albumRef = createRef()

    let [score, setScore] = useState([0, 3]);

    function submitPressed() {
        if (finished) {
            nextAlbum();
        } else {
            // give up
            albumRef.current.disabled = true;
            artistRef.current.value = albums[index].artist;

            artistRef.current.disabled = true;
            albumRef.current.value = albums[index].album;

            finished = true;
            finish(true);
            rf1.current.revealAll();

        }
    }

    function artistSubmit(e) {
        e.preventDefault()

        let artistInput = artistRef.current.value;
        let artistAnswer = albums[index].artist;

        if (artistInput === "") return
        artistInput = artistInput.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
        artistAnswer = artistAnswer.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");

        artistSim = stringSimilarity.compareTwoStrings(artistInput, artistAnswer);
        setArtistSim(artistSim);
        switch (manageClass(artistRef.current, artistSim)) {
            case 0:
                artistRef.current.value = albums[index].artist;
                doneArtist = true;
                setDoneArtist(true);
                score[0] += 1;
                setScore(score);
                if (doneAlbum) {
                    finished = true;
                    finish(true)
                    rf1.current.revealAll();
                    return;
                }
                albumRef.current.focus();
                break;
        }
    }

    function albumSubmit(e) {
        e.preventDefault();

        let albumInput = albumRef.current.value
        let albumAnswer = albums[index].album;

        if (albumInput === "") return;

        albumInput = albumInput.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
        albumAnswer = albumAnswer.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");

        albumSim = stringSimilarity.compareTwoStrings(albumInput, albumAnswer);
        setAlbumSim(albumSim);
        switch (manageClass(albumRef.current, albumSim)) {
            case 0:
                albumRef.current.value = albums[index].album;
                doneAlbum = true;
                setDoneAlbum(true);
                score[0] += 2;
                setScore(score);
                if (doneArtist) {
                    finished = true;
                    finish(true);
                    rf1.current.revealAll();
                    return;
                }
                artistRef.current.focus();
                break;
        }
    }

    function manageClass(div, sim) {
        if (sim >= 0.75) {
            div.disabled = true;
            div.classList.remove("incorrect");
            div.classList.remove("semicorrect");
            div.classList.add("correct");
            return 0;
        } else if (sim >= 0.5) {
            div.classList.remove("incorrect");
            div.classList.add("semicorrect");
            return 1;
        } else {
            div.classList.remove("semicorrect");
            div.classList.add("incorrect");
            return 2;
        }
    }

    function nextAlbum() {
        score[1] += 3
        setScore(score);

        albums.splice(index, 1);
        setAlbums(albums);
        setIndex(Math.floor(Math.random() * albums.length))
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

        console.log(albums.length)
    }

    if(albums.length === 0 && receivedResponse){
        return(
            <>
                <Container>
                    <Heading mt={5} mb={5} textAlign={"center"}>You scored {score[0]} out of {score[1] - 3}!</Heading>
                    <Flex justifyContent={"space-between"} alignItems={"center"}>
                        <Button onClick={() => {window.location.reload()}}>Play again with same settings</Button>
                        <Link to={"/"}>
                            <Button>Back to start menu</Button>
                        </Link>
                    </Flex>
                </Container>
            </>
        )
    } if (receivedResponse){
        return (
            <Container>
                <ImageGrid itsover={submitPressed} ref={rf1} delay={5000} width={parseInt(size)} height={parseInt(size)} data={albums[index]}/>
                <form onSubmit={artistSubmit}>
                    <Flex alignItems={'baseline'} justifyContent={'space-between'} mb={2}>
                        <FormLabel>Artist</FormLabel>
                        <Input style={{opacity: 1}} w={425} id={"artistinput"} type={"text"} ref={artistRef}
                               list={"artist-input"} autoComplete="off"/>
                    </Flex>
                </form>
                <form onSubmit={albumSubmit}>
                    <Flex alignItems={'baseline'} justifyContent={'space-between'}>
                        <FormLabel>Album</FormLabel>
                        <Input style={{opacity: 1}} w={425} id={"albuminput"} type={"text"} ref={albumRef}
                               list={"album-input"} autoComplete="off"/>
                    </Flex>
                </form>
                <Flex mt={2} justifyContent={'space-between'} alignItems={'center'}>
                    <Text>Score: {score[0]} out of {score[1]} points</Text>
                    <Button className={`submitbutton${finished ? " finished" : ""} submitbutton`}
                            onClick={submitPressed}>{finished ? "Next" : "Give Up"}</Button>
                </Flex>
            </Container>
        )
    } else {
        return(
            <Container>
                <PlaceholderImageGrid/>
            </Container>
        )
    }
}

export default GamePage;
