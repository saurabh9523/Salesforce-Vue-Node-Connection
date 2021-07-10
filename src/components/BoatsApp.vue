<template>
	<div>
		<div class="columns py-4 px-4">
			<div class="column is-8">
				<BoatSearchForm
					v-if="boatTypes.length > 0"
					:boatTypes="boatTypes"
					@selected="select"
				></BoatSearchForm>

				<BoatSearchResults :boatTypeId="selected"></BoatSearchResults>
			</div>
			<div class="column">
				<div class="pb-4">
					<BoatDetailTabs :selectedBoat="selectedBoat" />
				</div>
				<div>
					<div class="card">
						<header class="card-header">
							<p class="card-header-title">
								<span><b-icon icon="map-marker" type="is-primary"/>Current Boat Location</span>
							</p>
						</header>
						<div v-show="markers.length === 0" class="card-content">
							Please select a boat to see its location!
						</div>
						<div v-show="markers.length > 0" class="card-content">
							<Maps :markers="markers" :zoom="1" :maxZoom="15" :minZoom="6" :useBounds="true"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import EventBus from "../EventBus";
import { getBoatTypes } from "../controllers/modelService";
import BoatSearchForm from "./BoatSearchForm.vue";
import BoatSearchResults from "./BoatSearchResults.vue";
import BoatDetailTabs from "./BoatDetailTabs.vue";
import Maps from "./Maps.vue";

export default {
	name: "BoatsApp",
	data() {
		return {
			boatTypes: [],
			selected: "",
			boats: [],
			selectedBoat: {},
			markers: [],
		};
	},
	components: {
		BoatSearchForm,
		BoatSearchResults,
		BoatDetailTabs,
		Maps,
	},
	methods: {
		select(selected) {
			this.selected = selected;
		},

		updateData(boat) {
			this.selectedBoat = boat;
		},
	},
	created() {
		this.$emit("loadingbegin");
		getBoatTypes()
			.then((response) => {
				if (response.data.success) {
					this.boatTypes = response.data.records;
				}
				this.$emit("loadingcomplete");
			})
			.catch(() => {
				this.$emit("logout");
			});
	},
	mounted() {
		EventBus.$on("BOAT_SELECTED", (boat) => {
			this.updateData(boat);
		});
	},
	watch: {
		selectedBoat(value) {
			console.log(value);
			this.markers = [
				{
					lat: value.Geolocation__Latitude,
					lng: value.Geolocation__Longitude,
					name:value.Name,
					contact:value.Contact.Name,
					boatType:value.BoatType.Name
				},
			];
			console.log(this.markers);
		},
	},
};
</script>

<style scoped>
	/deep/ .modal{
		z-index: 1400;
	}
</style>
