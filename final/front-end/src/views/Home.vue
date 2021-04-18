<template>
<div class="home">
  <marketplace :photos="photos" />
  <p v-if="error">{{error}}</p>
</div>
</template>


<script>
import axios from 'axios';
import Marketplace from '@/components/Marketplace.vue';
export default {
  name: 'Home',
  components: {
    Marketplace,
  },
    data() {
    return {
      photos: [],
      error: '',
    }
  },
    created() {
    this.getPhotos();
  },
  methods: {
    async getPhotos() {
      try {
        let response = await axios.get("/api/photos/all");
        this.photos = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  },
}
</script>
