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
      <div class="bidding">
      <p>Current bid: $X</p>
      <button class="bid"><p>+$X</p></button>
      </div>

      <br/>
      <div class="comments-container">
      <h4>Comments:</h4>
      <div class="comments" v-for="comment in comments" :key="comment._id">
        <p><strong>{{comment.user.firstName}} {{comment.user.lastName}}</strong>
        <em> - {{formatDate(comment.created)}}</em></p>
        <p>{{comment.message}}</p>
        
      </div>
        <div class="form">
            <textarea v-model="message" placeholder="Leave a comment here">
            </textarea>
        </div>
            <button class="post" @click="postComment">Post</button>
        </div>
    </div>
  </section>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Photo',
  /* components: { */
  /* }, */
  data() {
    return {
      message: "",
      photo: null,
      comments: [],
      error: '',
    }
  },
    created() {
    this.getComments();
    this.getPhoto();
  },
  methods: {
    async getComments() {
      try {
        let response = await axios.get("/api/comments/" + this.$route.params.id);
        this.comments = response.data;
      } catch (error) {
          this.error = "Couldn't get comments, cuz " + error;
      }
    },
    async postComment() {
      try {
        await axios.post("/api/comments/" + this.$route.params.id, {
            message: this.message,
        });
        this.message = "";
        this.getComments();
      } catch (error) {
          this.error = "Couldn't post comment, cuz " + error;
      }
    },
    async getPhoto() {
      try {
        let response = await axios.get("/api/photos/" + this.$route.params.id);
        this.photo = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
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
