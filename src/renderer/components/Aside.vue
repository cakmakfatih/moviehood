<template>
  <aside id="sidebar">
    <section class="sidebar-section">
      <button :class="'btn-ico' + (active == page.title ? ' active' : '')" v-for="(page, index) in pages.top" :key="index" @click="() => setPage(page)">
        <i :class="page.icon"></i>
      </button>
    </section>
    <section class="sidebar-section">
      <button :class="'btn-ico' + (active == page.title ? ' active' : '')" v-for="(page, index) in pages.bottom" :key="index" @click="() => setPage(page)">
        <i :class="page.icon"></i>
      </button>
    </section>
  </aside>
</template>

<script>
export default {
    name: 'vue-aside',
    props: {
      active: {
        type: String,
        required: true
      },
      setPage: {
        type: Function,
        required: true
      }
    },
    data: function() {
      return {
        pages: {
          top: [
            {
              title: "MAIN",
              icon: "fas fa-list"
            },
            {
              title: "PLAYER",
              icon: "fas fa-play"
            },
          ],
          bottom: [
            {
              title: "SETTINGS",
              icon: "fas fa-cog"
            },
          ],
        },
      };
    },
}
</script>

<style scoped>
    #sidebar {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 30px;
    padding: 10px;
    display: flex;
    height: calc(100vh - 20px);
    background-color: #fff;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #ddd;
    z-index: 5;
  }
  .sidebar-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .sidebar-section > button {
    width: 30px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  .sidebar-section > button:last-child {
    border-bottom: none;
  }
  .sidebar-section > button.active {
    opacity: 1;
  }
</style>

