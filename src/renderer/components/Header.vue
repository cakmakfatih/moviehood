<template>
    <header>
      <section class="header-sec">
        <h1 class="app-title">
          movie<b>hood</b>
          <sup style="font-size: 0.6rem">
            0.1 beta
          </sup>
        </h1>
      </section>
      <section class="header-sec">
        <form class="form-s" v-on:submit="(e) => searchTorrents(e)">
          <input type="text" placeholder="Search" class="inp-search" ref="search">
          <button class="btn-ico">
            <i class="fas fa-search"></i>
          </button>
        </form>
      </section>
    </header>
</template>

<script>
export default {
    name: 'vue-header',
    props: {
      search: {
        type: Function,
        required: true
      }
    },
    methods: {
        searchTorrents: function(e) {
            e.preventDefault();
            this.search(this.$refs.search.value);
        }
    }
}
</script>
<style scoped>
    header {
    padding: 10px;
    background-color: #fff;
    color: #23202a;
    display: flex;
    position: fixed;
    top: 0px;
    left: 50px;
    height: 20px;
    width: calc(100vw - 70px);
    z-index: 4;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
  }
  h1.app-title {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 400;
    cursor: pointer;
  }
  .form-s {
    display: flex;
  }
  .inp-search {
    border: none;
    border-bottom: 1px solid #ddd;
    outline: none;
    color: #23202a;
    font-size: 1rem;
    background-color: transparent;
    transition: border-bottom-color .2s;
    width: 20vw;
  }
  .inp-search:focus {
    border-bottom-color: #23202a;
  }
  .header-sec {
    display: flex;
    align-items: center;
  }
</style>


