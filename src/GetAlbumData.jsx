import axios from 'axios';

export const getAlbumData = async (username, period) => {
    const api = axios.create();
    let albumData = [];

    try {
        const response = await api.get(
            `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&period=${period}&api_key=82d112e473f59ade0157abe4a47d4eb5&format=json`
        );
        const album = response.data.topalbums.album;
        for (let i = 0; i < 15; i++) { //Iterate over albums (15 good for game length?)
            albumData.push({
                artist: album[i].artist.name,
                album: album[i].name,
                url: GenerateHighResURL(album[i].image[3]['#text']), //largest available image URL
            });
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