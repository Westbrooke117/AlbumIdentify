import axios from "axios";

const getTopAlbums = async (username) => {
    const api = axios.create();
    let albumData = [];

    try {
        const response = await api.get(`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&api_key=82d112e473f59ade0157abe4a47d4eb5&format=json`);
        const album = response.data.topalbums.album;

        for (let i = 0; i < 15; i++){
            albumData.push({artist: album[i].artist.name, album: album[i].name})
        }

        return albumData
    } catch (err) {
        console.log(err);
    }
}

export default getTopAlbums;