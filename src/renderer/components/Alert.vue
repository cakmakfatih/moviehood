<template>
    <div class="modal" v-on:click="(e) => handleClick(e)" ref="modal">
        <div class="alert">
            <i class="fas fa-times close-btn btn-ico" v-on:click="dismissAlert"></i>
            <span class="alert-title">
                {{data.title}}
            </span>
            <span class="alert-message">
                {{data.message}}
            </span>
            <button class="btn-default" style="background-color: transparent; color: rgb(90, 200, 250); align-self: flex-end; font-weight: 700;" v-on:click="dismissAlert">
                {{data.btn}}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'vue-alert',
    props: {
        data: {
            type: Object,
            required: true
        },
        dismissAlert: {
            type: Function,
            required: true
        }
    },
    methods: {
        handleClick: function(e) {
            if(e.target === this.$refs.modal) {
                this.dismissAlert();
            }
        }
    }
}
</script>

<style scoped>
    .alert {
        width: 30%;
        background-color: #fff;
        display: flex;
        padding: 30px;
        color: #23202a;
        flex-direction: column;
        cursor: default;
    }
    .close-btn {
        align-self: flex-end;
        margin-bottom: 10px;
    }
    .alert-title {
        font-size: 11pt;
    }
    .alert-message {
        font-weight: 500;
        margin: 10px 0px;
        font-size: 14pt;
    }
</style>


