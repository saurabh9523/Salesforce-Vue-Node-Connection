<template>
	<div class="slds-card slds-m-top_medium">
		<b-tabs type="is-toggle" animated expanded v-model="selectedIndex">
			<b-tab-item label="Gallery">
				<div
					style="height:100vh"
					class="slds-grid slds-wrap slds-m-around_medium slds-scrollable_y"
					@scroll="handleScroll"
				>
					<template v-for="boat in boatsToLoad">
						<div
							class="slds-col slds-size_12-of-12 slds-large-size_3-of-12 slds-small-size_12-of-12"
							:key="boat.Id"
						>
							<BoatTile
								:boat="boat"
								:selectedBoatId="selectedBoat.Id"
							></BoatTile>
						</div>
					</template>
				</div>
			</b-tab-item>
			<b-tab-item label="Boat Editor">
				<BoatTable :boats="boatsToLoad"/>
			</b-tab-item>
			<b-tab-item label="Boats Near Me">
				<BoatsNearMe :boatTypeId="boatTypeId"/>
			</b-tab-item>
		</b-tabs>
	</div>
</template>

<script>
import { getBoats } from "../controllers/modelService";
import EventBus from "../EventBus";
import BoatTile from "./BoatTile.vue";
import BoatsNearMe from "./BoatsNearMe.vue";
import BoatTable from "./BoatTable.vue";

export default {
	name: "BoatSearchResults",
	props: ["boatTypeId"],
	components: {
		BoatTile,
		BoatsNearMe,
		BoatTable
	},
	data() {
		return {
			boatsToLoad: [],
			allBoats: [],
			selectedBoat: {},
			selectedIndex: 0,
		};
	},
	methods: {
		getBoatData(Id) {
			getBoats(Id)
				.then((response) => {
					if (response.data.success) {
						this.allBoats = response.data.records.map((boat) => {
							boat.Picture =boat.Picture? boat.Picture.replace(
								"/resource",
								""
							) : '';
							return { ...boat };
						});
						console.log(this.allBoats.length);
						this.boatsToLoad =
							this.allBoats.length > 18
								? [...this.allBoats.splice(0, 18)]
								: [...this.allBoats.splice(
									0,
									this.allBoats.length
								)];
					}
				})
				.catch(() => {
					this.$emit("logout");
				});
		},
		selectBoat(value) {
			this.selectedBoat = value;
		},
		handleScroll(el) {
			console.log(Math.round(el.target.offsetHeight + el.target.scrollTop),el.target.scrollHeight)
			if (
				Math.round(el.target.offsetHeight + el.target.scrollTop) >=
				el.target.scrollHeight
			) {
				this.boatsToLoad =
					this.allBoats.length > 18
						? [...this.boatsToLoad, ...this.allBoats.splice(0, 18)]
						: [
								...this.boatsToLoad,
								...this.allBoats.splice(
									0,
									this.allBoats.length
								),
						];
			}
		},

		updateData(boat) {
			this.selectedBoat = boat;
		},
	},
	watch: {
		boatTypeId(value) {
			this.getBoatData(value);
		},
	},
	mounted() {
		this.getBoatData();
		EventBus.$on("BOAT_SELECTED", (boat) => {
			this.updateData(boat);
		});
	},
};
</script>

<style></style>
