<template>

<div class="wrapper">
    <div class="preview">
        <div class="stand" v-for="stand in stands" :key="stand.id">
            <div class="stand-header">
                <h3>{{stand.title}}</h3>
            </div>
            <div class="item" v-for="item in items" :key="item.id">
                <div class="item-header">
                    <p>{{item.title}}</p>
                </div>
                <div class="item-img">
                    <img :src="item.path"/>
                </div>
                <div class="item-description">
                    <p>{{item.description}}</p>
                </div>
                <div class="item-bid">
                    <p>Current bid: {{item.bid}}</p>
                </div>
                <div class="item-increment">
                    <button @click="bid(stand, item)">Bid +${{item.bid}}</button>
                </div>
            </div>
            <button @click="toMarket(stand)">Send to market!</button>
        </div>
    </div>
</div>

</template>


<script>
import axios from 'axios';
export default {
        name: 'userstand',
        data() {
            return {
                stands: [],
                items: [],
                currentBid: 0,
            }
        },
        created() {
            this.getStands();
        },
    
methods: {
    async toMarket(stand) {
        try {
            await axios.put("api/stands/${this.stand._id}", {
                //FIXME findStand??
                title: this.stand.title,
                atMarket: true;
                expired: false;
            });
        } catch (error) {
            /* console.log(error); */
        }
    },


        //null in userstand.vue
        bid(stand, item) {
            try {
                currentBid += this.item.bid + this.item.increment;
                await axios.put("api/stands/${this.stand._id}/items/${this.item._id}", {
                    title: this.item.title;
                    description: this.item.description;
                    bid: currentBid;
                    item.increment: this.item.increment;
                    item.hasBid: true;
                });
                currentBid = 0;

            }
        },
        /* next() { */
        /*     if (currentitem === this.stand.length() - 1) { */
        /*         currentitem = 0; */
        /*     } else { */
        /*         currentitem++; */
        /*     } */
        /* } */
        /* previous() { */
        /*     if (currentitem === 0) { */
        /*         currentitem = this.stand.length() - 1; */
        /*     } else { */
        /*         currentItem--; */
        /*     } */
        /* } */
},

}

</script>



<style scoped>

</style>
