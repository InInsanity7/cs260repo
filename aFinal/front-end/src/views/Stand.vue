<template>
<div class="home">
  <section class="marketplace">
    <div class="image">

      <div class="photoTitle">
        <p>{{photo.title}}</p>
      </div>
        <img :src="photo.path" />
              <p class="photoDescription">{{photo.description}}</p>
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
      <button v-else class="bid"><p>Log in to Bid</p></button>
      </div>

      <br/>

    <div class="comments-container">
      <div v-if="comments.length > 0">
      <h4>Comments:</h4>
      <div class="comments" v-for="comment in comments" :key="comment._id">
        <p><strong>{{comment.user.firstName}} {{comment.user.lastName}}</strong>
        <em> - {{formatDate(comment.created)}}</em></p>
        <p>{{comment.message}}</p>
      </div>
      </div>

      <div v-if="user">
        <div class="form">
            <textarea v-model="message" placeholder="Leave a comment here">
            </textarea>
        </div>
            <button class="post" @click="postComment">Post</button>
      </div>
    </div>

    </div>
  </section>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Stand',
  /* components: { */
  /* }, */
  data() {
    return {
      message: "",
      stand: null,
      photos: [],
      numPhotos: '',
      photo: null,
      atPhoto: 0,
      comments: [],
      error: '',
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
    created() {
    this.getStand();
    /* this.getPhotos(); */
    /* this.getComments(); */
  },
  methods: {

    //COMMENTS
    async getComments() {
      try {
        let response = await axios.get("/api/comments/" + this.photo._id);
        this.comments = response.data;
      } catch (error) {
          this.error = "Couldn't get comments, cuz " + error;
      }
    },
    async postComment() {
      try {
        await axios.post("/api/comments/" + this.photo._id, {
            message: this.message,
        });
        this.message = "";
        this.getComments();
      } catch (error) {
          this.error = "Couldn't post comment, cuz " + error;
      }
    },

   //STAND 
    async getStand() {
      try {
        let response = await axios.get("/api/stands/" + this.$route.params.id);
        this.stand = response.data;
        this.getPhotos();
      } catch (error) {
        this.error = error.response.data.message;
      }
    },

    //PHOTO ITEMS
    async getPhotos() {
      try {
        let response = await axios.get("/api/photos/one/" + this.$route.params.id);
        this.photos = response.data;
        this.getPhoto();
        this.numPhotos = this.photos.length;
        this.getComments();
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
        this.comments.length = 0;
        this.getPhotos();
        this.$forceUpdate();
    },
    prevPhoto() {
        if (this.atPhoto === 0) {
            this.atPhoto = this.numPhotos - 1;
        } else {
            this.atPhoto--;
        }
        this.comments.length = 0;
        this.getPhotos();
        this.$forceUpdate();
    },

    async putBid() {
        try {
            this.photo.bid += this.photo.increment;
            await axios.put("/api/photos/bid/" + this.photo._id, {
                bid: this.photo.bid,
            });
            this.$forceUpdate();
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
.home {
    justify-content: center;
    margin: 0 5% 0 5%;
}

.arrows {
    justify-content: space-between;
}

.arrows button {
    background-color: #1d3557;
    color: #f1faee;
    border-style: none;
    margin: 0 1em 0 1em;
    padding: 0 1em 0 1em;
    border-radius: 3.5px;
}

.arrows button:hover {
    background-color: #0d2547;
    margin: 0 1em 0 1em;
    padding: 0 1.1em 0 1.1em;
}

.photoInfo {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
  padding-right: 0.85em;
  padding-left: 0.85em;
}

.photoTitle {
    justify-content: center;
    font-size: 3em;
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

.bidding {
    margin: 2em;
    font-size: 2em;
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

.image {
  margin: 0 auto;
  display: block; 
  width: 100%;
  background-color: #558bad;
  border-radius: 100px;
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

.comments {
    font-size: 1.25em;
    text-align: start;
    margin: 0 0 1.5em 1em;
    }

.comments-container {
    padding: 0 0 1.5em;
}

.comments-container > h4 {
    font-size: 1.5em;
    font-weight: 100;
}

.form {
    margin: 0 0 1em;
}

.form > textarea {
    color: #f1faee;
    background-color: #f1faee;
    color: #1d3557;

}

.post {
    background-color: #1d3557;
    color: #f1faee;
    border: 0px;
    padding: 0.5em 1em 0.5em 1em;
}

.post:hover {
    background-color: #0d2547;
    padding: 0.6em 1.1em 0.6em 1.1em;
}

</style>
