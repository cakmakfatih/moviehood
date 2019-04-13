class TorrentSearch {
    torrentSearch;
    constructor() {
        this.torrentSearch = require('torrent-search-api');
        this.torrentSearch.enableProvider('1337x');
    }

    search = async (keyword) => {
        return await this.torrentSearch.search(keyword, 'All', 30);
    }

    getMagnetUri = async (torrent) => {
        return await this.torrentSearch.getMagnet(torrent);
    }
}

export default TorrentSearch;