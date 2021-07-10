<template>
	<div>
		<div class="card" v-if="Object.keys(boat).length>0">
			<header class="card-header">	
				<h1 class="card-header-title title is-4">
                    <span> <b-icon size="is-medium" icon="anchor"/> {{ boat.Name }}</span>
                </h1>
                <b-button type="is-info" label="Full details" @click="goToBoatRecord">
                </b-button>
			</header>
			<div class="card-content">
				<div class="content slds-scrollable_y" style="height:43vh">
					<div class="field pb-2">
						<label class="label">Boat Type</label>
                        <p class="subtitle is-6">{{ boat.BoatType.Name }}</p>
					</div>
                    <div class="field pb-2">
						<label class="label">Length</label>
                        <p class="subtitle is-6">{{ boat.Length }}</p>
					</div>
                    <div class="field pb-2">
						<label class="label">Price</label>
                        <p class="subtitle is-6">{{price }}</p>
					</div>
                    <div class="field pb-2">
						<label class="label">Description</label>
                        <p class="subtitle is-6">{{ boat.Description }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {navigateToRecord} from '../controllers/authService';
export default {
	name: "BoatDetail",
	props: ["boat"],
    methods:{
        goToBoatRecord(){
            const res= navigateToRecord(this.boat.Id);
            res.then((response)=>{
                if(response.data.success){
                    window.open(response.data.message,'_blank')
                }
            })
        }
    },
    computed:{
        price(){
            return new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(this.boat.Price);
        }
    }
};
</script>

<style scoped>
.card,
.card-header {
	box-shadow: none;
}
</style>
