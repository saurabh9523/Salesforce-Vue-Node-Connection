<template>
		<div @click="selectBoat" :class="tileClass">
			<div class="tile"  :style="{backgroundImage:`url(${boat.Picture})`}"></div>
			<div class="lower-third">
				<h1 class="slds-truncate slds-text-heading_medium">{{boat.Name}}</h1>
				<h1 class="slds-truncate slds-text-heading_small">{{boat.Contact.Name}}</h1>
				<div class="slds-text-body_small">Price: {{price}}</div>
				<div class="slds-text-body_small">Length: {{boat.Length}}</div>
				<div class="slds-text-body_small">Type: {{boat.BoatType.Name}}</div>
			</div>
		</div>
</template>

<script>
import EventBus from '../EventBus'

export default {
	name: "BoatTile",
	props: ["boat", "selectedBoatId"],
    methods:{
        selectBoat() {
            EventBus.$emit('BOAT_SELECTED', this.boat)
        }
    },
	computed: {
		tileClass() {
            return this.boat.Id===this.selectedBoatId?'tile-wrapper selected':'tile-wrapper';
        },
        price(){
            return new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'}).format(this.boat.Price);
        }
	},
};
</script>

<style scoped>

.tile {
	width: 100%;
	height: 220px;
	padding: 1px !important;
	background-position: center;
	background-size: cover;
	border-radius: 5px;
}
.selected {
	border: 3px solid rgb(0, 95, 178);
	border-radius: 5px;
}
.tile-wrapper {
	cursor: pointer;
	padding: 5px;
}
</style>
