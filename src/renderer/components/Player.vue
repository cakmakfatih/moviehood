<template>
  <div class="wrapper">
        <div class="container">
            <button class="reload-sub" v-on:click="() => reloadSubtitles()" v-if="mp4Files.length > 0">
                Reload Subtitles
            </button>
            <aside class="aside" v-if="mp4Files.length > 1">
                <div class="filterer">
                    <i class="fas fa-sliders-h"></i>
                    <input type="text" class="inp-filter" placeholder="Filter" v-model="filter">
                </div>
                <div class="mp4-l" v-for="(file, index) in filteredFiles" v-bind:key="file.name" :class="index === currentVid ? 'active' : ''" @click="() => playVideo(index)" v-bind:title="file.name">
                    <span class="sub-num" v-show="index !== currentVid">
                        {{index + 1}}
                    </span>
                    <i class="fas fa-play sub-num" v-show="index === currentVid"></i>
                    <span class="sub-name">
                        {{file.name.length > 32 ? file.name.substring(0, 30) + '..' : file.name}}
                    </span>
                </div>
            </aside>
            <div class="player" ref="player">

            </div>
        </div>
  </div>
</template>

<script>
import Subtitles from './../lib/Subtitles';
const subtitles = new Subtitles();

export default {
    name: 'vue-player',
    data: function() {
        return {
            subtitles: [],
            currentSub: undefined,
            mp4Files: [],
            currentVid: 0,
            filter: ""
        };
    },
    computed: {
        filteredFiles: function() {
            return this.mp4Files.filter(i => i.name.toLowerCase().includes(this.filter.toLowerCase()));
        }
    },
    methods: {
        async reloadSubtitles() {
            this.subtitles = await subtitles.search(this.mp4Files[this.currentVid].name);
            this.$refs.player.childNodes[0].removeChild(this.$refs.player.childNodes[0].childNodes[0]);
            this.generateSubtitle();
        },
        addSubtitle(result) {
            if(result.status === 200) {
                let blob = new Blob([result.content], 
                    {
                        type: "text/vtt"
                    }
                );
                let trackUrl = URL.createObjectURL(blob);
                let track = document.createElement("TRACK");
                track.src = trackUrl;
                track.kind = "captions";
                track.srcLang = localStorage.getItem("subLanguageId") || "eng";
                track.label = "Moviehood Captions";
                track.default = true;
                this.$refs.player.childNodes[0].appendChild(track);
            }
            else {
                alert(result.content);
            }
        },
        generateSubtitle() {
            if(this.subtitles.length > 0) {
                if(this.currentSub <= this.subtitles.length - 1)
                    subtitles.zipToSubtitle(this.subtitles[this.currentSub], this.addSubtitle);
                else
                    alert("No more subtitles.");
            } else {
                alert("No subtitles found");
            }
        },
        async playVideo(index) {
            this.currentVid = index;
            this.currentSub = 0;
            let mp4File = this.mp4Files[index];
            this.$refs.player.innerHTML = "";
            this.mp4Files[index].appendTo(this.$refs.player);
            let vp = this.$refs.player.childNodes[0];
            vp.autoplay = true;
            vp.style.flex = 1;
            vp.style.width = "100%";
            this.subtitles = await subtitles.search(this.mp4Files[index].name);
            this.generateSubtitle();
        }
    },
    mounted: function() {
        this.$root.$on('playVideo', async (mp4Files) => {
            this.mp4Files = mp4Files;
            this.playVideo(0);
        });
    }
}
</script>

<style scoped>
    video {
        flex: 1;
        align-self: stretch;
    }
    .aside {
        flex: 1.5;
        overflow-x: hidden;
        overflow-y: auto;
        font-weight: normal;
        display: flex;
        flex-direction: column;
        background-color: #ddd;
    }
    .reload-sub {
        z-index: 10;
        cursor: pointer;
        position: fixed;
        top: 55px;
        left: 65px;
        font-size: 14pt;
        background-color: #000;
        font-weight: 500;
        opacity: 0.6;
        outline: none;
        transition: opacity .2s;
        color: #fff;
        border: none;
        padding: 15px;
    }
    .reload-sub:hover {
        opacity: .8;
    }
    .reload-sub:active {
        opacity: 1;
    }
    .filterer {
        background-color: #fff;
        display: flex;
        padding: 10px;
        min-height: 40px;
        max-height: 40px;
        align-items: center;
    }
    .filterer > i {
        margin-right: 10px;
    }
    .filterer > input {
        flex: 1;
        font-size: 13pt;
        border:none;
        border-bottom: 1px solid #ddd;
        outline: none;
        padding: 10px;
        flex-direction: column;
    }
    .filterer > input:focus {
        border-color: #000;
    }
    .mp4-l {
        align-items: center;
        padding: 10px 20px;
        display: flex;
        min-height: 40px;
        max-height: 40px;
        align-items: center;
        background-color: #fff;
        cursor: pointer;
    }
    .sub-num {
        font-weight: bold;
        font-size: 24px;
        width: 25px;
    }
    .sub-name {
        margin-left: 10px;
        flex: 1;
        font-size: 14px;
    }
    .mp4-l:nth-child(2n):not(.active) {
        background-color: #eee;
    }
    .mp4-l:hover:not(.active):hover {
        background-color: #282c34;
        color: #fff;
    }
    .mp4-l:hover:not(.active):active {
        background-color: #fff;
        color: #23202a;
    }
    .active {
        background-color: #23202a;
        color: #fff;
    }
    .player {
        flex: 4;
        align-self: stretch;
        display: flex;
    }
    .container {
        align-self: stretch;
        flex-direction: row-reverse;
        display: flex;
        flex: 1;
        background-color: #000;
    }
</style>

