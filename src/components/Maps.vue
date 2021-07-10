<template>
	<div>
		<template v-if="markers.length>0">
			<l-map ref="map" :style="style" :bounds="bounds" :minZoom="minZoom" 
			:maxZoom="maxZoom" :zoom="zoom" zoomAnimation :center="center">
				<l-tile-layer :url="url"></l-tile-layer>
				<l-marker :options="{'id':index}" @ready="ready" v-for="(marker,index) of markers" :key="index" :lat-lng="marker">
					<l-tooltip>
						<b v-if="marker.yourLocation">Your Location</b>
						<p v-if="marker.name"><b>Name:</b>{{marker.name}}</p>
						<p v-if="marker.contact"><b>Contact:</b>{{marker.contact}}</p>
						<p v-if="marker.boatType"><b>Type:</b>{{marker.boatType}}</p>
					</l-tooltip>
				</l-marker>
			</l-map>
		</template>
	</div>
</template>

<script>
import {LMap, LTileLayer, LMarker,LTooltip} from 'vue2-leaflet';

export default {
	name: "Maps",
    props:['markers','minZoom','maxZoom','zoom','useBounds','center'],
	components: {
    LMap,
    LTileLayer,
    LMarker,
	LTooltip
	},
	data() {
		return {
			url: 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
			bounds:null,
			style:{'height': "100vh"},
			markerElements:[]
		};
	},
	methods:{
		ready(event){
			this.markerElements[event.options.id]=event
			console.log(this.markerElements)
		},
		hoverOverLocation(index){
			this.markerElements.forEach((element)=>{
				if(this.markerElements.indexOf(element)===index){
					element.fire("mouseover");
				}
				else{
					element.fire("mouseout");
				}
			})
			let marker=this.markers[index];
			this.center=[marker.lat,marker.lng]
		}
	},
	watch:{
		markers(value){
			if(this.useBounds){
				this.bounds=value.map((marker)=>{
					return [marker.lat,marker.lng]
				})
			}
			else{
				this.bounds=[[...this.center]]
			}
			this.style=this.markers.length>1?{'height': "100vh"}:{'height': "48vh"}
		}
	},
	
};
</script>

<style lang="scss" scoped></style>
