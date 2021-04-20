<template>
  <section class="marketplace">
    <div class="stand-container" v-for="stand in stands" v-bind:key="stand._id">
      <button @click="editStand(stand.title)">Change stand name</button>
      <OwnerEditor :stand="stand" :show="show" @close="close" @uploadFinished="uploadFinished" />
      <p>Stand name: {{stand.title}}</p>
      <OwnerEachStand :stand="stand" />
    </div>




    <!--  <div class="photoTitle">
        <p>{{photo.title}}</p>
      </div>
      <router-link :to="{ name: 'stand', params: { id: stand._id }}">
        <img :src="photo.path" />
      </router-link>
      <div class="photoInfo">
        <p class="photoName">{{photo.user.firstName}} {{photo.user.lastName}}</p>
      <p class="photoDate">{{formatDate(photo.created)}}</p>
      </div>
      <div class="bidding">
      <p>Current bid: ${{photo.bid}}  -<em>{{photo.bidder}}</em></p>
      <button class="bid"><p>+${{photo.increment}}</p></button>
    </div> -->




  </section>
</template>

<script>
import OwnerEachStand from '@/components/OwnerEachStand.vue';
import OwnerEditor from '@/components/OwnerEditor.vue';

export default {
  name: 'OwnerMarketPlace',
  props: {
    stands: Array,
  },
  components: {
    OwnerEachStand,
    OwnerEditor,
  },
  data() {
      return {
          show: 'false',
      }
  },
  methods: {
    //UPLOAD
    async uploadFinished() {
      this.show = 'false';
      this.$emit('getStands');
    },
    close() {
      this.show = 'false';
    },
    editStand(title) {
      this.show = title;
    },
  },
}
</script>

<style scoped>
.photoInfo {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
  padding-right: 0.85em;
  padding-left: 0.85em;
}

.photoTitle {
    justify-content: center;
    font-size: 15px;
    font-weight: bold;
    max-width: 100%;
}

.photoInfo p {
  margin: 0px;
}

.photoDate {
  font-size: 0.7em;
  font-weight: normal;
}

p {
  margin: 0px;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.marketplace {
  column-gap: 1em;
}

.image {
  margin: 0 0 1em;
  display: grid;
  width: 100%;
  background-color: #457b9d;
}

.image img {
  max-width: 90%;
  height: auto;
  border-color: #1d3557;
  border: 0.55em solid #1d3557;
}
/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .marketplace {
    column-count: 3;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .marketplace{
    column-count: 2;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .marketplace {
    column-count: 1;
  }
}
.stand-container button {
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
.stand-container button:hover {
    padding: 0.65em 1.75em 0.65em 1.75em;
    background-color: #558bad;
    
}
.stand-container {
    background-color: #1d3557;
    color: #f1faee;
    margin: 0 0 10px 0;
  border-radius: 10px;
}
</style>
