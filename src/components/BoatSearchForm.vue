<template>
	<div>
		<b-modal v-model="openModal" trap-focus has-modal-card :can-cancel="canCancel">
            <SaveOrEditBoat @close="openModal=false"/>
        </b-modal>
		<div class="slds-card">
			<div class="slds-card__header slds-grid">
				<header
					class="slds-media slds-media_center slds-has-flexi-truncate"
				>
					<div class="slds-media__body">
						<h2 class="title is-3 slds-m-around_small">
							<span>
								<b-icon type="is-primary" icon="ferry" size="is-medium"/>
								Find a Boat
							</span>
						</h2>
					</div>
					<div class="slds-float_right">
						<b-button @click="openModal=true" type="is-info" label="New Boat"></b-button>
					</div>
				</header>
			</div>
			<div
				class="slds-card__body slds-card__body_inner slds-align_absolute-center slds-m-around_large"
			>
				<b-select v-model="selected">
					<option
						v-for="boatType in boatTypeList"
						:value="boatType.value"
						:key="boatType.value"
					>
						{{ boatType.name }}
					</option>
				</b-select>
			</div>
		</div>
	</div>
</template>

<script>
import SaveOrEditBoat from './SaveOrEditBoat.vue'
export default {
    name: 'BoatSearchForm',
    props:['boatTypes'],
    data(){
        return {
            selected:'',
            boatTypeList:[],
			openModal:false,
			canCancel:false
        }
    },
	components:{
		SaveOrEditBoat
	},
    watch:{
        selected(value){
            this.$emit('selected',value)
        }
    },
    created(){
        this.boatTypeList = this.boatTypes.map((record) => {
			return { name: record.Name, value: record.Id };
		});
		this.boatTypeList.unshift({ name: "All Types", value: "" });
    },
};
</script>

<style lang="scss" scoped></style>
