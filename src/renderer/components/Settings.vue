<template>
    <div class="wrapper settings">
        <div class="top-cont">
            <h1>
                Settings
            </h1>
            <button class="btn-save" v-on:click="() => applySettings()">
                Apply
            </button>
        </div>
        <div class="s-setting">
            <h3>
                Subtitle Language
            </h3>
            <p>
                Subtitles will be loaded in the selected language.
            </p>
            <select v-model="selectedSubtitle">
                <option v-for="option in subtitleOptions" v-bind:key="option.val" v-bind:value="option.val">
                    {{option.name}}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'vue-settings',
    data: function() {
        return {
            selectedSubtitle: localStorage.getItem("subLanguageId") || "tur",
            subtitleOptions: [
                {
                    name: "Turkish",
                    val: "tur"
                },
                {
                    name: "English",
                    val: "eng"
                },
                {
                    name: "French",
                    val: "fre"
                }
            ]
        }
    },
    methods: {
        changeSub: function() {
            localStorage.setItem("subLanguageId", this.selectedSubtitle);
        },
        applySettings: function() {
            this.changeSub();
        }
    },
}
</script>

<style scoped>
    .settings {
        display: flex;
        flex-direction: column;
    }
    .top-cont {
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        align-items: center;
        padding: 10px;
    }
    .top-cont > h1 {
        margin: 5px;
    }
    .inp-fs {
        padding: 5px;
        background-color: #fff;
        outline: none;
        width: 30px;
        height: 30px;
        font-size: 14pt;
        text-align: center;
    }
    .btn-save {
        padding: 10px 15px;
        color: #fff;
        font-weight: 500;
        background-color: #0288d1;
        font-size: 11pt;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: opacity .2s;
        outline: none;
    }
    .btn-save:hover {
        opacity: .7;
    }
    .btn-save:active {
        opacity: .4;
    }
    .s-setting {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #ddd;
        padding: 20px;
        background-color: #f5f5f5;
    }
    .s-setting > select {
        font-size: 14pt;
        outline: none;
        background-color: #fff;
    }
    .s-setting > h3 {
        margin: 5px;
    }
    .s-setting > p {
        margin: 0;
        padding: 5px;
    }
</style>