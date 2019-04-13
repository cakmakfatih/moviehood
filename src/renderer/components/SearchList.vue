<template>
    <div class="wrapper" ref="wrapper">
        <section class="search-list" v-if="searchResults.length > 0" ref="searchListRef">
            <article class="list-item" v-for="(val, index) in searchResults" :key="index" v-on:click="() => playItem(val)">
                <span class="list-span">
                    <b class="list-span-t list-ord">{{index + 1}}</b>
                    <span class="list-t">{{val.title}}</span>
                </span>
                <section class="list-end">
                    <span class="list-span">
                        <b class="list-span-t">P:</b> {{val.peers}}
                    </span>
                    <span class="list-span">
                        <b class="list-span-t">S:</b> {{val.seeds}}
                    </span>
                </section>
            </article>
        </section>
        <section v-else class="home-page">
            <h1>movie<b>hood</b></h1>
            <span>
                Start searching for a movie or a TV show
            </span>
            <form class="hp-form" @submit="(e) => searchItem(e)">
                <input class="inp-hp" type="text" placeholder="Search" ref="s">
                <button>
                    <i class="fas fa-search"></i>
                </button>
            </form>
            <div class="hp-settings">
                <ul>
                    <h3>
                        About the program
                    </h3>
                    <li>
                        This program searches and tries to stream any mp4 containing torrent file with automatic matched subtitles.
                    </li>
                    <li>
                        All of the source code is available at <a href="https://github.com/cakmakfatih/moviehood" target="_blank">here</a>.
                    </li>
                    <li>
                        Moviehood can only stream torrents that contain <b>mp4</b> file(s).
                    </li>
                    <li>
                        If the selected torrent can't be played, it's probably because of it's seeder value.
                    </li>
                    <li>
                        We don't own or control any of the torrents that are being shared.
                    </li>
                    <li>
                        You can change your <b>default subtitle language</b> from the settings section of the app.
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    name: 'vue-search-list',
    props: {
        'searchResults': {
            type: Array,
            required: true
        },
        'playItem': {
            type: Function,
            required: true
        },
        'search': {
            type: Function,
            required: true
        }
    },
    methods: {
        async playSelected(val) {
            await this.playItem(val);
            this.$refs.searchListRef.scrollTo(0, 0);
        },
        searchItem(e) {
            e.preventDefault();
            this.search(this.$refs.s.value);
        }
    }
}
</script>
<style scoped>
    .search-list {
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    border: 1px solid #ddd;
  }
  .hp-form {
      display: flex;
      align-items: stretch;
      background-color: #fff;
      margin-top: 10px;
      min-width: 40%;
      border-radius: 8px;
      border: 1px solid #ddd;
  }
  .hp-settings > ul > h3 {
      margin: 0px;
      margin-bottom: 10px;
  }
  .hp-settings {
      background-color: #fff;
      margin-top: 20px;
      padding: 20px;
      max-width: 50%;
      border: 1px solid #ddd;
  }
  .hp-settings > ul {
      padding: 0px 20px;
  }
  .hp-form > button {
      font-size: 14pt;
      border: none;
      color: #404040;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      padding: 10px 15px;
      background-color: #fff;
      transition: color .2s;
      outline: none;
      cursor: pointer;
  }
  .hp-form > button:hover {
      color: #aaa;
  }
  .hp-form > button:active {
      color: #eee;
  }
  .inp-hp {
      padding: 10px 15px;
      flex: 1;
      outline: none;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      font-size: 14pt;
      box-sizing: border-box;
      background-color: transparent;
      border: none;
  }
  .home-page {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding-bottom: 50px;
      flex: 1;
  }
  .home-page > h1 {
      margin: 0;
      font-weight: normal;
      font-size: 4rem;
  }
  .list-t {
      padding-left: 10px;
  }
  .list-item:last-child {
    border-bottom: none;
  }
  .list-ord {
      display: flex; 
      justify-content: center; 
      width: 20px; 
      padding-right: 10px; 
      border-right: 1px solid #ddd;
  }
  .list-item {
    padding: 10px;
    cursor: pointer;
    transition: opacity .2s;
    min-height: 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    justify-content: space-between;
    background-color: #fff;
  }
  .list-item:nth-child(2n) {
    background-color: #f9f9f9;
  }
  .list-item:hover {
    opacity: .5;
  }
  .list-item:active {
    opacity: .2;
  }
  .list-end {
      display: flex;
  }
  .list-span {
    font-weight: 600;
    margin: 0px;
    padding: 0;
    font-size: 0.9rem;
    color: #23202a;
    display: flex;
    align-items: center;
  }
  .list-span > i {
      margin-right: 10px;
  }
  .list-end > .list-span {
      justify-content: space-between;
      width: 55px;
      overflow: hidden;
      padding: 0px 20px;
      border-left: 1px solid #ddd;
  }
  .list-end > .list-span:last-child {
      padding-right: 0px;
  }
  .list-span-t {
    font-weight: 900;
    margin-right: 2.5px;
  }
</style>

