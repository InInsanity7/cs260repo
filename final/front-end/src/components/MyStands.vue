<template>
<div class="main">
  <div class="menu">
    <p><button @click="toggleUpload">New Stand</button></p>
    <p>{{user.firstName}} {{user.lastName}}</p>
    <button @click="logout">Logout</button>
    <OwnerUploader :show="show" @close="close" @uploadFinished="uploadFinished" />
  </div>
  <OwnerMarketPlace @getStands="getStands" :stands="stands" />
</div>
</template>

<script>
import axios from 'axios';
import OwnerUploader from '@/components/OwnerUploader.vue';
import OwnerMarketPlace from '@/components/OwnerMarketPlace.vue';

export default {
  name: 'MyStands',
    components: {
    /* Uploader, */
    OwnerMarketPlace,
    OwnerUploader,
  },
  data() {
    return {
      show: false,
      stands: [],
      error: '',
    }
  },
  created() {
    this.getStands();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async uploadFinished() {
      this.show = false;
      this.getStands();
    },
    close() {
      this.show = false;
    },
    toggleUpload() {
      this.show = true;
    },
    async getStands() {
      try {
        this.response = await axios.get("/api/stands/user");
        this.stands = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  }
}
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
    /* color: #457b9d; */
    color: #555;
}

.menu h2 {
  font-size: 14px;
    /* color: #457b9d; */
    color: #555;
}
.menu button {
    background-color: #457b9d;
    margin: 0.55em 0 0.55em;
    border: 0px;
    padding: 0.5em 1.5em 0.5em 1.5em;
    border-radius: 10px;
    font-weight: 500;
    font-size: 1em;
    font-family: 'Work Sans', sans-serif;
    color: #f1faee;
}
.menu button:hover {
    padding: 0.65em 1.75em 0.65em 1.75em;
    background-color: #558bad;
    
}
      
</style>
