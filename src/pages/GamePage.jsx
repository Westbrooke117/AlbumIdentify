import {createRef, useEffect, useState} from "react";
import {getAlbumData} from "../GetAlbumData.jsx";
import {
    Button,
    Container,
    Fade,
    Flex,
    FormLabel,
    Heading,
    Input,
    Text
} from "@chakra-ui/react";
import ImageGrid from "../components/ImageGrid.jsx";
import PlaceholderImageGrid from "../components/PlaceholderImageGrid.jsx";
import {Link, useParams} from "react-router-dom";

function GamePage() {
    const { username,period, size } = useParams();

    let [albums, setAlbums] = useState([]);
    let [artistSimilarity, setArtistSimilarity] = useState("");
    let [albumSimilarity, setAlbumSimilarity] = useState("");
    let [doneArtist, setDoneArtist] = useState(false);
    let [doneAlbum, setDoneAlbum] = useState(false);
    let [finished, finish] = useState(false);
    let [albumIndex, setAlbumIndex] = useState(0);
    let [receivedResponse, setResponseStatus] = useState(false);

    useEffect(() => {
        (async () => {
            const fetchedAlbums = await getAlbumData(username, period);
            setAlbums(fetchedAlbums);
            setResponseStatus(true);

            const randomIndex = Math.floor(Math.random() * fetchedAlbums.length);
            setAlbumIndex(randomIndex);
        })();
    }, []);

    let imgGridRef = createRef()
    let artistRef = createRef()
    let albumRef = createRef()

    let [score, setScore] = useState([0, 3]);

    function submitPressed() {
        if (finished) {
            nextAlbum();
        } else {
            // give up
            albumRef.current.disabled = true;
            artistRef.current.value = albums[albumIndex].artist;

            artistRef.current.disabled = true;
            albumRef.current.value = albums[albumIndex].album;

            finished = true;
            finish(true);
            imgGridRef.current.revealAll();

        }
    }

    function artistSubmit(e) {
        e.preventDefault()

        let artistInput = artistRef.current.value;
        let artistAnswer = albums[albumIndex].artist;

        if (artistInput === "") return
        artistInput = artistInput.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
        artistAnswer = artistAnswer.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");

        artistSimilarity = stringSimilarity.compareTwoStrings(artistInput, artistAnswer);
        setArtistSimilarity(artistSimilarity);
        switch (updateInputStyles(artistRef.current, artistSimilarity)) {
            case 0:
                artistRef.current.value = albums[albumIndex].artist;
                doneArtist = true;
                setDoneArtist(true);
                score[0] += 1;
                setScore(score);
                if (doneAlbum) {
                    finished = true;
                    finish(true)
                    imgGridRef.current.revealAll();
                    return;
                }
                albumRef.current.focus();
                break;
        }
    }

    function albumSubmit(e) {
        e.preventDefault();

        let albumInput = albumRef.current.value
        let albumAnswer = albums[albumIndex].album;

        if (albumInput === "") return;

        albumInput = albumInput.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
        albumAnswer = albumAnswer.toLowerCase().replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");

        albumSimilarity = stringSimilarity.compareTwoStrings(albumInput, albumAnswer);
        setAlbumSimilarity(albumSimilarity);
        switch (updateInputStyles(albumRef.current, albumSimilarity)) {
            case 0:
                albumRef.current.value = albums[albumIndex].album;
                doneAlbum = true;
                setDoneAlbum(true);
                score[0] += 2;
                setScore(score);
                if (doneArtist) {
                    finished = true;
                    finish(true);
                    imgGridRef.current.revealAll();
                    return;
                }
                artistRef.current.focus();
                break;
        }
    }

    function updateInputStyles(div, sim) {
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

        albums.splice(albumIndex, 1);
        setAlbums(albums);
        setAlbumIndex(Math.floor(Math.random() * albums.length))
        imgGridRef.current.newImage();
        artistRef.current.classList.remove('correct');
        artistRef.current.classList.remove('incorrect');
        artistRef.current.classList.remove('semicorrect');

        artistRef.current.disabled = false;
        artistRef.current.value = "";
        artistRef.current.focus();

        albumRef.current.classList.remove('correct');
        albumRef.current.classList.remove('incorrect');
        albumRef.current.classList.remove('semicorrect');
        albumRef.current.disabled = false;
        albumRef.current.value = "";

        doneAlbum = false;
        doneArtist = false;
        setDoneAlbum(false);
        setDoneArtist(false);
        finished = false;
        finish(false);

        // console.log(albums.length)
    }

    if(albums.length === 0 && receivedResponse){
        return(
            <>
                <Container>
                    <Heading mt={5} mb={5} textAlign={"center"}>
                        {/*-3 added to the end since the game attempts to start a new round with no albums left in array.*/}
                        {/*This is bad since this means that the score is incremented by 3 despite game ended. So the -3 negates that.*/}
                        You scored {score[0]} out of {score[1] - 3}!
                    </Heading>
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
                <ImageGrid itsover={submitPressed} ref={imgGridRef} delay={5000} width={parseInt(size)} height={parseInt(size)} data={albums[albumIndex]}/>
                <Fade in={true}>
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
                </Fade>
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
