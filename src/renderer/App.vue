<template>
  <div>
    <vue-aside :active="page" :setPage="setPage"></vue-aside>
    <vue-header :search="search"></vue-header>
    <vue-alert :data="alertData" :dismissAlert="dismissAlert" v-if="alertData !== null"></vue-alert>
    <div id="container">
      <vue-search-list :search="search" v-show="page === 'MAIN'" :searchResults="searchResults" :playItem="playItem"></vue-search-list>
      <vue-player v-show="page === 'PLAYER'"></vue-player>
      <vue-settings v-show="page === 'SETTINGS'"></vue-settings>
      <div v-if="loading" class="modal">
        <div class="loader"></div>
        <span class="loading-span">
          LOADING
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchList from './components/SearchList';
  import Header from './components/Header';
  import Aside from './components/Aside';
  import Alert from './components/Alert';
  import Player from './components/Player';
  import Settings from './components/Settings';

  import TorrentSearch from './lib/TorrentSearch';
  import TorrentStream from './lib/TorrentStream';
  import SearchResult from './models/SearchResult';

  const torrentStream = new TorrentStream();
  const torrentSearch = new TorrentSearch();

  export default {
    name: 'app',
    components: {
      'vue-header': Header,
      'vue-aside': Aside,
      'vue-search-list': SearchList,
      'vue-alert': Alert,
      'vue-player': Player,
      'vue-settings': Settings
    },
    data: function() {
      return {
        torrent: null,
        searchResults: [],
        loading: false,
        page: 'MAIN',
        alertData: null,
      };
    },
    methods: {
      dismissAlert: function() {
        this.alertData = null;
      },
      async playItem(t) {
        this.loading = true;
        let magnetUri = await torrentSearch.getMagnetUri(t);
        let torrent = await torrentStream.getInfo(magnetUri);
        let mp4Files = torrent.files.filter(e => e.name.endsWith(".mp4"));
        this.loading = false;
        if(mp4Files.length === 0) {
          this.alertData = {
              title: "Error occurred",
              message: "Selected torrent does not contain a streamable video file.",
              btn: "OKAY"
            };
            await torrentStream.remove(torrent);
          } else {
            if(this.torrent !== null) {
              await torrentStream.remove(this.torrent);
              this.torrent = null;
            }
            this.torrent = torrent;
            this.page = "PLAYER";
            this.$root.$emit("playVideo", mp4Files);
          }
      },
      async search(val) {
        if(val.length !== 0) {
          this.loading = true;
          let res = await torrentSearch.search(val);
          if(res.length > 0) {
            let results = [];
            res.forEach((i) => results.push(new SearchResult(i)));
            this.searchResults = results;
          }
          this.loading = false;
          this.page = 'MAIN';
        }
      },
      setPage: function(page) {
        if(page.title === "MAIN" && this.page === "MAIN")
          this.searchResults = [];
        this.page = page.title;
      }
    },
  }
</script>

<style>
  * {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  .loading-span {
    margin: 0px; 
    font-size: 9pt; 
    margin-top: 10px; 
    font-weight: 700;
  }
  .loader {
    border: 4px solid #f3f3f3;
    border-radius: 50%;
    border-top: 4px solid #23202a;
    width: 20px;
    height: 20px;
    -webkit-animation: spin .5s linear infinite; /* Safari */
    animation: spin .5s linear infinite;
  }
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .modal {
    width: 100vw;
    height: 100vh;
    left: 0px;
    top: 0px;
    background-color: rgba(0,0,0, .7);
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-direction: column;
    color: #fff;
    z-index: 30;
  }
  body {
    margin: 0px;
    padding: 0px;
    color: #23202a;
  }
  #container {
    position: absolute;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    background-color: #eee;
    flex-direction: column;
  }
  .btn-ico {
    background: transparent;
    border: none;
    font-size: 1rem;
    display: flex;
    align-items: center;
    color: #23202a;
    justify-content: center;
    opacity: .3;
    transition: opacity .2s;
    outline: none;
    cursor: pointer;
  }
  .btn-ico:hover {
    opacity: .6;
  }
  .btn-ico:active {
    opacity: 1;
  }
  .wrapper {
    margin: 5px;
    margin-left: 55px;
    margin-top: 45px;
    width: calc(100vw - 60px);
    height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
    overflow-y: hidden;
  }
  .btn-default {
    padding: 10px;
    font-size: 1rem;
    font-weight: 500;
    outline: none;
    background-color: rgb(0, 122, 255);
    color: #fff;
    border: none;
    margin-top: 15px;
    cursor: pointer;
    transition: opacity .2s;
  }
  .btn-default:hover {
    opacity: .6;
  }
  .btn-default:active {
    opacity: .2;
  }
  video::cue {
    font-size: 50px !important;
    background: transparent;
    text-shadow: 3px 3px 3px #333;
  }
</style>
