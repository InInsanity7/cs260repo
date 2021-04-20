<template>
<div class="home">
  <marketplace :stands="stands" />
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
      stands: [],
      
      error: '',
    }
  },
    created() {
    this.getStands();
  },
  methods: {
    async getStands() {
      try {
        let response = await axios.get("/api/stands/");
        this.stands = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  },
}
</script>

<style scoped>
.home {
    color: #1d3557;
}
</style>
