<template>
    <section class="EachStand">


    <div v-if="photo" class="image">
    <div class="stand-title">
    <p>{{stand.title}}</p>
    </div>
      <div class="photoTitle">
        <p>{{photo.title}}</p>
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
        <button v-if="user" @click="putBid" class="bid"><p>Bid ${{photo.bid}}</p></button>
      <button v-else class="bid"><p>Log in to bid</p></button>
      </div>
    </div>
    </section>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
    name: 'EachStand',
    props: {
        stand: Object,
    },
    data() {
        return {
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
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
    methods: {
    //PHOTO ITEMS
    async getPhotos() {
      try {
        let response = await axios.get("/api/photos/all/" + this.stand._id);
        this.photos = response.data;
        this.numPhotos = this.photos.length;
        this.getPhoto();
      } catch (error) {
        this.error = error.response.data.message;
      }
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

    /* getPhoto() { */
    /*     this.photo = this.photos[this.atPhoto]; */
    /* }, */
    /* nextPhoto() { */
    /*     if (this.atPhoto === this.numPhotos - 1) { */
    /*         this.atPhoto = 0; */
    /*     } else { */
    /*         this.atPhoto++; */
    /*     } */
    /*     this.getPhoto(); */
    /* }, */
    /* prevPhoto() { */
    /*     if (this.atPhoto === 0) { */
    /*         this.atPhoto = this.numPhotos - 1; */
    /*     } else { */
    /*         this.atPhoto--; */
    /*     } */
    /*     this.getPhoto(); */
    /* }, */

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

    /* async bid() { */
    /*     try { */
    /*         this.photo.bid += this.photo.increment; */
    /*         await axios.put("/api/photos/bid/" + this.photo.id, { */
    /*             bid: this.photo.bid, */
    /*         }); */
    /*     } catch (error) { */
    /*         this.error = "Bidding issues! Look: " + error; */
    /*     } */
    /* }, */

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
  border-radius: 10px;
}

.image img {
  max-width: 90%;
  height: auto;
  border-color: #1d3557;
  border: 0.55em solid #1d3557;
}
.bid {
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
.bid:hover {
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
.stand-title {
    background-color: #1d3557;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}
</style>
