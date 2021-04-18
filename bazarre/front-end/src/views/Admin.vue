<template>
<-- MarketAlert Bar -->
<MarketAlert :market-start="market-start"/>
<-- EDIT changed admin to stand -->





<div class="staging">
  <div class="page-header">
  <h1>Set up your stand!</h1>
  <-- FIXME add class -->
    <div class="rules"><p>Here you can create your market stand.
    Items added to your stand can be added/modified/removed until you finalize your stand. 
    Once finalized, your stand will be sent to market to await the start of the next flea auction. 
    Feel free to make as many stands as you like! </p>
    </div>
    </div>
    <div class="form">
        <input v-model="standTitle" placeholder="Stand name">
        <p></p>
        <button @click="addStand">Create Stand</button>
    </div>



    <div class="form" >
        <input v-model="findStandTitle" placeholder="Search your stands">
            <div class="stand-suggestions" v-if="standSuggestions.length > 0">
                <div class="stand-suggestion" v-for="a in standSuggestions" :key="a.id" @click="selectStand(a)">{{a.title}}</div>
            </div>
    </div>
    <div class="upload" v-if="findStand">
        <input v-model="findStand.title">
        <p></p>
    </div>
    <div class="actions" v-if="findStand">
        <button @click="deleteStand(findStand)">Delete stand</button>
        <button @click="editStand(findStand)">Change stand name</button>
    </div>
  <div class="add-item" v-if="findStand">
    <div class="heading">
      <div class="circle">1</div>
      <h2>Add an item to {{findStand.title}}</h2>
    </div>
    <div class="add-form">
      <div class="form">
        <input v-model="title" placeholder="Item title">
        <p></p>
        <textarea v-model="description" placeholder="Describe your item here!"></textarea>
        <input type="file" name="photo" @change="fileChanged">
        <--FIXME added BID -->
        <div class="bid">
            <h3>Starting Bid:</h3>
            <input v-model="bid" placeholder="0.00">
            <p></p>
            <h3>Price increase per bid:</h3>
            <input v-model="increment" placeholder="0.00">
            <p></p>
        </div>
        <button @click="upload">Add to Stand</button>
      </div>
      <div class="upload" v-if="addItem">
        <h2>{{addItem.title}}</h2>
        <img :src="addItem.path" />
        <p>{{addItem.description}}</p>
        <p>{{addItem.bid}}</p>
      </div>
    </div>
    <div class="modify">
        <div class="heading">
      <div class="circle">2</div>
      <h2>Edit/Remove an Item</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findItem">
        <input v-model="findItem.title">
        <p></p>
        <textarea v-model="findItem.description" placeholder="Describe your item here!"></textarea>
        <input v-model="findItem.bid" placeholder="Starting bid">
        <p></p>
        <img :src="findItem.path" />
      </div>
      <div class="actions" v-if="findItem">
        <button @click="deleteItem(findStand, findItem)">Delete</button>
        <button @click="editItem(findStand, findItem)">Edit</button>
      </div>
    </div>
    </div>
    </div>
    <div class="preview" v-if="showPreview">
        <div class="heading">
      <div class="circle">3</div>
      <h2>Preview Stand</h2>
    </div>
    <-- UserStand Preview -->
    <UserStand :user-stand="user-stand" :items="items">
    </div>
</div>
</template>


<script>
import axios from 'axios';
import UserStand from "../components/UserStand.vue"
// import MarketAlert from "../components/MarketAlert.vue"

export default {
  name: 'admin',
  components: {
      UserStand,
      // MarketAlert,
  },
  data() {
    return {
      addStand: null,
      standTitle: "",
      findStandTitle: "",
      findStand: "",
      title: "",
      description: "",
      bid: "",
      increment "",
      file: null,
      addItem: null,
      findTitle: "",
      findItem: null,
      items: [],
      stands: [],
    }
  },
  computed: {
    standSuggestions() {
      let stands = this.stands.filter(stand => stand.title.toLowerCase()
                       .startsWith(this.findStandTitle.toLowerCase()));
      return stands.sort((a, b) => a.title > b.title);
    }
    suggestions() {
      let items = this.items.filter(item => item.title.toLowerCase()
                      .startsWith(this.findTitle.toLowerCase()));
      return items.sort((a, b) => a.title > b.title);
    }
  },
  created() {
      this.getStands();
  },
  methods: {
    /* async toMarket(stand) { */
    /*     try { */
    /*         await axios.put("api/stands/${stand._id}", { */
    /*             //FIXME findStand?? */
    /*             title: this.findStand.title, */
    /*             atMarket: true; */
    /*             expired: false; */
    /*         }); */
    /*     } catch (error) { */
    /*         /1* console.log(error); *1/ */
    /*     } */
    /* }, */
    async addStand() {
      try {
        let r1 = await axios.post("/api/stands", {
          atMarket: false,
          expired: false,
          title: this.standTitle,
        });
        this.addStand = r1.data;
      } catch (error) {
          /* console.log(error); */
      }
    },
    async deleteStand(stand) {
        try {
            this.getItems(stand);
               for (item in items) {
                   this.deleteItem(item);
               }
            await axios.delete("/api/stands/${stand._id}");
            this.findStand = null;
            this.getStands();
        } catch (error) {
            /* console.log(error); */
        }
    },
    async getStands() {
        try {
            let response = await axios.get("/api/stands");
            this.stands = response.data;
            return true;
        } catch (error) {
            /* console.log(error); */
        }
    },
    async editStands(stand) {
      try {
        await axios.put("/api/stands/${stand._id}", {
          title: this.findStand.title,
          atMarket: false,
          expired: false,
        });
        this.findStand = null;
        this.getStands();
        return true;
      } catch (error) {
        /* console.log(error); */
      }
    },
    selectStand(stand) {
        this.findStandTitle = "";
        this.findStand = stand;
        this.items = this.getItems(stand);
    },
    async editItem(stand, item) {
      try {
        await axios.put("/api/stands/${stand._id}/items/${item._id}", {
          title: this.findItem.title,
          description: this.findItem.description,
          bid: this.findItem.bid,
          increment: this.findItem.increment,
          hasBid: false,
        });
        this.findItem = null;
        this.getItems(stand);
        return true;
      } catch (error) {
        /* console.log(error); */
      }
    },
    async deleteItem(stand, item) {
      try {
        await axios.delete("/api/stands/${stand._id}/items/${item._id}");
        this.findItem = null;
        this.getItems(stand);
        return true;
      } catch (error) {
        /* console.log(error); */
      }
    },
    selectStand(stand) {
        this.findStandTitle = "";
        this.findStand = stand;
    },
    selectItem(stand, item) {
      this.findTitle = "";
      this.findItem = item;
    },
     async getItems(stand) {
        try {
            let response = await axios.get("/api/${stand._id}/items");
            this.items = response.data;
            return true;
        } catch (error) {
            /* console.log(error); */
        }
     },
     fileChanged(event) {
         this.file = event.target.files[0]
     },
    async upload() {
        try {
            const formData = new FormData();
            formData.append('photo', this.file, this.file.name);
            let r1 = await axios.post('/api/photos', formData);
            let r2 = await axios.post('/api/${stand._id}/items', {
            title: this.title,
            description: this.description,
            path: r1.data.path,
            bid: this.bid,
            increment: this.increment,
            hasBid: false,
        });
        this.addItem = r2.data;
      } catch (error) {
        /* console.log(error); */
      }
    },

  },
}
</script>






<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}
/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>
