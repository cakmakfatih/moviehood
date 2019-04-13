const WebTorrent = require('webtorrent');

class TorrentStream {
    client;

    constructor() {
        this.client = new WebTorrent();
    }

    sleep = (ms) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }

    getFiles = async (torrent) => {
        if(torrent.files.length === 0) {
            await this.sleep(500);
            return this.getFiles(torrent);
        } else {
            return torrent.files;
        }
    }

    getInfo = async (magnetUri) => {
        let d = await this.client.add(magnetUri, (t) => t);
        await this.getFiles(d);
        return d;
    }

    remove = async (torrent) => {
        return await this.client.remove(torrent);
    }
}

export default TorrentStream;