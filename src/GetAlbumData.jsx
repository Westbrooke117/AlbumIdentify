import axios from 'axios';

export const getAlbumData = async (username) => {
    const api = axios.create();
    let albumData = [];

    try {
        const response = await api.get(
            `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&api_key=82d112e473f59ade0157abe4a47d4eb5&format=json`
        );
        const album = response.data.topalbums.album;

        for (let i = 0; i < 50; i++) { //Iterate over top 50 albums
            albumData.push({
                artist: album[i].artist.name,
                album: album[i].name,
                url: album[i].image[3]['#text'], //largest available image URL
            });
        }
        return albumData;
    } catch (err) {
        console.log(err);
        return [];
    }
};