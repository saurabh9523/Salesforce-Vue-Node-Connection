<template>
    <div class="slds-card">
        <div style="height:25vh"
			v-show="!Object.keys(selectedBoat).length"
			class="card slds-align_absolute-center"
		>
			<p>Please select a boat :)</p>
		</div>
        <b-tabs v-show="Object.keys(selectedBoat).length" type="is-toggle" animated expanded v-model="selectedIndex">
			<b-tab-item label="Details">
                <BoatDetail :boat="selectedBoat"/>
            </b-tab-item>
			<b-tab-item label="Reviews">
                <BoatReviews ref="reviews" :selectedBoatId="selectedBoat.Id"/>
            </b-tab-item>
			<b-tab-item label="Add Review">
                <AddReview @allreviews="changeIndex" :selectedBoatId="selectedBoat.Id"/>
            </b-tab-item>
		</b-tabs>
    </div>
</template>

<script>
import BoatDetail from './BoatDetail.vue'
import BoatReviews from './BoatReviews.vue'
import AddReview from './AddReview.vue'
    export default {
        name:'BoatDetailTabs',
        props:['selectedBoat'],
        data(){
            return {
                selectedIndex:0
            }
        },
        components:{
            BoatDetail,
            AddReview,
            BoatReviews
        },
        methods:{
            changeIndex(){
                this.selectedIndex=1;
                this.$refs.reviews.getReviews(this.selectedBoat.Id)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>