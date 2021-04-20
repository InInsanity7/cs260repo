<template>
    <!-- <section class="OwnerEachStand"> -->
    <section class="image">
    <uploader :show="show" :stand="stand" @close="close" @uploadFinished="uploadFinished" />
    <editor :editing="editing" :photo="photo" @close="close" @uploadFinished="uploadFinished" />

  <!-- <div class="eachstand-menu">
    <p><a @click="toggleUpload"><i class="fas fa-image"></i> Upload Image</a></p>
    <p>{{user.firstName}} {{user.lastName}}: <a @click="logout">Logout <i class="fas fa-sign-out-alt"></i></a></p>
    <uploader :show="show" @close="close" @uploadFinished="uploadFinished" />
  </div> -->
  
        <div class="editButtons">
      <button v-if="photos.length > 0" @click="deletePhoto">Delete NFT</button>
      <button @click="toggleUpload">Add NFT Image</button>
      <button v-if="photos.length > 0" @click="editPhoto(photo.title)">Edit NFT Information</button>
        </div>
    <div v-if="photos.length > 0">
      <div class="photoTitle">
        <p>Image name: {{photo.title}}</p>
      </div>
      <router-link :to="{ name: 'stand', params: { id: stand._id }}">
        <img :src="photo.path" />
      </router-link>
      <div class="photoInfo">
        <p class="photoName">{{photo.user.firstName}} {{photo.user.lastName}}</p>
      <p class="photoDate">{{formatDate(photo.created)}}</p>
      </div>
      <div v-show="numPhotos > 1" class="arrows">
      <button @click="prevPhoto"><i class="fas fa-arrow-left"></i></button>
      <button @click="nextPhoto"><i class="fas fa-arrow-right"></i></button>
      </div>
      <div class="bidding">
      <p v-if="photo.bidder">Last Bid: ${{photo.bid - photo.increment}} - <em>{{photo.bidder.firstName}} {{photo.bidder.lastName}}</em></p>
      <button @click="putBid" id="bid"><p>Bid ${{photo.bid}}</p></button>
      </div>
    </div>
    </section>
</template>

<script>
import axios from 'axios';
import Uploader from '@/components/Uploader.vue';
import Editor from '@/components/Editor.vue';
import moment from 'moment';

export default {
    name: 'OwnerEachStand',
    props: {
        stand: Object,
    },
    components: {
        Uploader,
        Editor,
    },
    data() {
        return {
            show: false,
            editing: 'false',
            photos: [],
            photo: null,
            numPhotos: '',
            atPhoto: 0,
        }
    },
    created() {
        /* this.getStand(); */
        this.getPhotos();
    },
    methods: {

    //UPLOAD
    async uploadFinished() {
      this.show = false;
      this.editing = 'false';
      this.getPhotos();
    },
    close() {
      this.show = false;
      this.editing = 'false';
    },
    toggleUpload() {
      this.show = true;
    },

    //PHOTO ITEMS
    async getPhotos() {
      try {
        let response = await axios.get("/api/photos/" + this.stand._id);
        this.photos = response.data;
        this.numPhotos = this.photos.length;
        this.getPhoto();
      } catch (error) {
        this.error = error.response.data.message;
      }
    },

    async deletePhoto() {
        try {
            await axios.delete("/api/photos/" + this.photo._id);
            this.getPhotos();
            /* this.nextPhoto(); */
        } catch (error) {
            this.error = "Bad delete: " + error;
        }
    },

    editPhoto(title) {
        this.editing = title;
    },

    getPhoto() {
        this.photo = this.photos[this.atPhoto];
    },
    nextPhoto() {
        if (this.atPhoto === this.numPhotos - 1) {
            this.atPhoto = 0;
        } else {
            this.atPhoto++;
        }
        this.getPhoto();
        this.$forceUpdate();
    },
    prevPhoto() {
        if (this.atPhoto === 0) {
            this.atPhoto = this.numPhotos - 1;
        } else {
            this.atPhoto--;
        }
        this.getPhoto();
        this.$forceUpdate();
    },


    async putBid() {
        try {
            this.photo.bid += this.photo.increment;
            await axios.put("/api/photos/bid/" + this.photo._id, {
                bid: this.photo.bid,
            });
            this.getPhotos();
            /* this.$forceUpdate(); */
        } catch (error) {
            this.error = "Bidding issues! Look: " + error;
        }
    },

    //Misc
        formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
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
  display: inline-block;
  width: 100%;
  background-color: #457b9d;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.image img {
  max-width: 90%;
  height: auto;
  border-color: #1d3557;
  border: 0.55em solid #1d3557;
}
.image button {
    background-color: #1d3557;
    margin: 0.55em 0.25em 0.55em 0.25em;
    border: 0px;
    padding: 0.5em 1.5em 0.5em 1.5em;
    border-radius: 10px;
    font-weight: 500;
    font-size: 1em;
    font-family: 'Work Sans', sans-serif;
    color: #f1faee;
}
.image button:hover {
    padding: 0.65em 1.75em 0.65em 1.75em;
    background-color: #2d4567;
    
}
      
.image #bid button{
    background-color: #b61926;
    margin: 0.55em 0 0.55em;
    border: 0px;
    padding: 0.5em 1.5em 0.5em 1.5em;
    border-radius: 10px;
    font-weight: 500;
    font-size: 1em;
    font-family: 'Akaya Kanadaka', sans-serif;
    color: #f1faee;
}
.image #bid button:hover {
    padding: 0.65em 1.75em 0.65em 1.75em;
    background-color: #a60916;
    
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
.menu {
  display: flex;
  justify-content: space-between;
    color: #457b9d;
}

.menu h2 {
  font-size: 14px;
    color: #457b9d;
}
.eachstand-menu {
    background-color: #1d3557;
    margin: 0.55em 0 0.55em;
    border: 0px;
    padding: 0.5em 1.5em 0.5em 1.5em;
    border-radius: 10px;
    font-weight: 500;
    font-size: 1em;
    font-family: 'Work Sans', sans-serif;
    color: #f1faee;
}

.editButtons{
    justify-content: space-between;
}
.editButtons button {
    margin: 0.3em 0.5em 0.1em 0.5em;
    align-self: space-between;
    padding: 0.25em;
    font-size: 0.8em;
}
</style>
