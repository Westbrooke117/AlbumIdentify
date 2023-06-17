import axios from 'axios';

export const getAlbumData = async (username, period) => {
    const api = axios.create();
    let albumData = [];

    try {
        const response = await api.get(
            `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&period=${period}&api_key=82d112e473f59ade0157abe4a47d4eb5&format=json`
        );
        const albumList = response.data.topalbums.album;
        const numberOfAlbums = 15;

        for (let i = 0; i < numberOfAlbums; i++) {
            let randomValue = Math.floor(Math.random() * albumList.length);

            albumData.push({
                artist: albumList[randomValue].artist.name,
                album: albumList[randomValue].name,
                url: GenerateHighResURL(albumList[randomValue].image[3]['#text'])
            });

            albumList.splice(randomValue, 1); // Remove the selected album from albumList
        }
        return albumData;
    } catch (err) {
        console.log(err);
        return [];
    }

    function GenerateHighResURL(url){
        const imageID = url.substring(46, 78)
        return(`https://lastfm.freetls.fastly.net/i/u/770x0/${imageID}.jpg#${imageID}`)
        //Im sorry last.fm. Don't kill me. Just let us have higher res images with the api. 500x500 even.
    }
};