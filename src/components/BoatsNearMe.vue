<template>
	<div class="card" v-if="mapMarkers && center">
		<div class="columns">
			<div class="column is-8" >
				<Maps ref="maps"
					:markers="mapMarkers"
					:useBounds="false"
					:center="center"
				/>
			</div>
			<div class="column is-4">
				<div class="card">
					<header class="card-header">
						<p class="card-header-title">
                            Markers ({{mapMarkers.length}})
						</p>
					</header>
					<div class="slds-scrollable_y" style="height:100vh">
						<template v-for="(marker, index) in mapMarkers">
							<div :key="index" class="mx-3 my-3 ml-3 mr-3 buttons">
								<b-button  expanded  size="is-medium" outlined @click="selectLocation(index)"
                                :icon-left="marker.yourLocation?'map-marker-circle':'map-search'">
									{{
										marker.name
											? marker.name
											: marker.yourLocation
											? "Your Location"
											: ""
									}}
								</b-button>
							</div>
						</template>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Maps from "./Maps.vue";
import { getBoatsByLocation } from "../controllers/modelService";

export default {
	name: "BoatsNearMe",
	props: ["boatTypeId"],
	components: {
		Maps,
	},
	data() {
		return {
			center: null,
			mapMarkers: null,
		};
	},
    methods:{
        selectLocation(index){
            this.$refs.maps.hoverOverLocation(index)
        }
    },
	created() {
		this.center = navigator.geolocation.getCurrentPosition((location) => {
			this.center = [location.coords.latitude, location.coords.longitude];
			getBoatsByLocation(
				this.boatTypeId,
				this.center[0],
				this.center[1]
			).then((response) => {
				if (response.data.success) {
					this.mapMarkers = response.data.records.map((boat) => {
						return {
							lat: boat.Geolocation__Latitude,
							lng: boat.Geolocation__Longitude,
							name: boat.Name,
							contact: boat.Contact.Name,
							boatType: boat.BoatType.Name,
						};
					});
					this.mapMarkers.unshift({
						lat: this.center[0],
						lng: this.center[1],
						yourLocation: true,
					});
				}
			});
		});
	},
};
</script>

<style lang="scss" scoped></style>
