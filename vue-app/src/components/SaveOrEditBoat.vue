<template>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">
				<span>
					<b-icon
						icon="sail-boat"
						size="is-medium"
						type="is-primary"
					/>
					{{
						this.isEditMode
							? "Edit Boat Details"
							: "Create New Boat"
					}}</span
				>
			</p>
			<button
				class="delete"
				@click="$emit('close')"
				aria-label="close"
			></button>
		</header>
		<div class="modal-card-body">
			<div
				v-show="errorMessage"
				class="slds-notify slds-notify_alert slds-alert_error"
				role="alert"
			>
				<span class="slds-assistive-text">error</span>
				<span
					class="slds-icon_container slds-icon-utility-error slds-m-right_x-small"
					title="Description of icon when needed"
				>
					<svg class="slds-icon slds-icon_x-small" aria-hidden="true">
						<use
							xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"
						></use>
					</svg>
				</span>
				<h2>
					{{ errorMessage }}
				</h2>
			</div>
			<form @submit.prevent="submit">
				<b-field label="Name" :message="errors.Name.message" :type="errors.Name.type">
					<b-input
						ref="Name"
						type="text"
						v-model="newBoat.Name"
						placeholder="Boat Name"
						required
					>
					</b-input>
				</b-field>
				<div class="mb-4">
					<LookupField required
						ref="Contact"
						v-model="newBoat.Contact.Id"
						:disabled="isEditMode"
						:defaultValue="newBoat.Contact.Name"
						iconName="contacts-outline"
						label="Contact"
						apiName="Contact"
						iconType="is-primary"
						fieldToDisplay="Name"
						fieldForValue="Id"
						placeholder="Select a Contact"
					/>
				</div>
				<div class="mb-4">
					<LookupField required
						ref="BoatType"
						v-model="newBoat.BoatType.Id"
						:defaultValue="newBoat.BoatType.Name"
						iconName="contacts-outline"
						label="Boat Type"
						apiName="BoatType__c"
						iconType="is-primary"
						fieldToDisplay="Name"
						fieldForValue="Id"
						placeholder="Select the Boat type"
					/>
				</div>
				<b-field :message="errors.Price.message" :type="errors.Price.type"
					label="Price (in dollars)"
					ref="field-Price"
				>
					<b-input
						ref="Price"
						type="number"
						v-model="newBoat.Price"
						placeholder="Boat Price"
						min="1"
						required
					>
					</b-input>
				</b-field>
				<b-field :message="errors.Length.message" :type="errors.Length.type"
					label="Length (in meters)"
					ref="field-Length"
				>
					<b-input
						ref="Length"
						type="number"
						v-model="newBoat.Length"
						placeholder="Boat Length"
						min="1"
						required
					>
					</b-input>
				</b-field>
				<b-field label="Picture" ref="field-Picture" :message="errors.Picture.message" :type="errors.Picture.type">
					<b-input
						ref="Picture"
						type="text"
						v-model="newBoat.Picture"
						placeholder="Boat Picture"
						required
					>
					</b-input>
				</b-field>
				<b-field :message="errors.Year_Built.message" :type="errors.Year_Built.type"
					label="Year Built"
					ref="field-Year_Built">
					<b-input
						ref="Year_Built"
						type="number"
						v-model="newBoat.Year_Built"
						placeholder="Year Built"
						min="1"
						required
					>
					</b-input>
				</b-field>
				<b-field :message="errors.Geolocation.message" :type="errors.Geolocation.type"
					label="Geolocation"
					ref="field-Geolocation"
				>
					<b-input
						ref="Geolocation__Latitude"
						type="number"
						v-model="newBoat.Geolocation__Latitude"
						placeholder="Geolocation Latitude"
						step="0.000001"
						required
					>
					</b-input>
					<b-input
						ref="Geolocation__Longitude"
						type="number"
						v-model="newBoat.Geolocation__Longitude"
						placeholder="Geolocation Longitude"
						step="0.000001"
						required
					>
					</b-input>
				</b-field>
				<b-field :message="errors.Description.message" :type="errors.Description.type"
					label="Description"
					ref="field-Description"
				>
					<b-input
						ref="Description"
						type="textarea"
						v-model="newBoat.Description"
						maxlength="200"
					>
					</b-input>
				</b-field>
				<div class="slds-align_absolute-center">
					<b-button
						native-type="submit"
						class="button is-success mr-5" :disabled="saving"
						>Save</b-button
					>
					<b-button
						class="button is-danger is-light"
						@click="onCancel()"
                        :disabled="saving"
						>Cancel</b-button
					>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { createRecord, updateRecord } from "../controllers/modelService";
import LookupField from "./LookupField.vue";

export default {
	name: "SaveOrEditBoat",
	props: ["existingBoat"],
	components: {
		LookupField,
	},
	data() {
		return {
			errorMessage: "",
            saving:false,
            errors:{
				Name: {message:'',type:''},
				Length: {message:'',type:''},
				Price: {message:'',type:''},
				Description:{message:'',type:''},
				Picture:{message:'',type:''},
				Year_Built: {message:'',type:''},
				Geolocation: {message:'',type:''}
            },
			newBoat: {
				Id: "",
				Name: "",
				Length: null,
				Price: null,
				Description: "",
				Contact: {
					Id: "",
					Name: "",
				},
				BoatType: {
					Id: "",
					Name: "",
				},
				Picture: "",
				Year_Built: null,
				Geolocation__Latitude: null,
				Geolocation__Longitude: null,
			},
		};
	},
	methods: {
		onCancel() {
			this.$emit("close");
		},
		submit() {
            this.saving=true;
			const requestObject = {
				Name: this.newBoat.Name,
				Length__c: Number(this.newBoat.Length),
				Price__c: Number(this.newBoat.Price),
				Description__c: this.newBoat.Description,
				BoatType__c: this.newBoat.BoatType.Id,
				Year_Built__c: Number(this.newBoat.Year_Built),
				Picture__c: this.newBoat.Picture,
				Geolocation__latitude__s: Number(
					this.newBoat.Geolocation__Latitude
				),
				Geolocation__longitude__s: Number(
					this.newBoat.Geolocation__Longitude
				),
			};
			if (this.isEditMode) {
				requestObject.Id = this.newBoat.Id;
			} else {
				requestObject.Contact__c = this.newBoat.Contact.Id;
			}
			const res = this.isEditMode
				? updateRecord("Boat__c", requestObject)
				: createRecord("Boat__c", requestObject);
			res.then((response) => {
				if (response.data.success) {
					this.$buefy.toast.open({
						duration: 3000,
						message: "Boat record created successfully!",
						type: "is-success",
					});
					this.$emit("close");
				} else {
					console.log(response.data);
					this.$buefy.toast.open({
						duration: 3000,
						message: "Record creation failed!",
						type: "is-error",
					});
				}
                this.saving=false;
			}).catch((err) => {
				const errorData = err.response.data;
				this.errorMessage = "Please check the errors below";
				if (errorData?.fields?.length > 0) {
					const fieldName = errorData.fields[0]
						?.replace("__c", "")
						.replace("__r", "")
						.replace("__s", "");
					Object.keys(this.$refs).forEach((key) => {
                        key=key.replace('__Latitude','').replace('__Longitude','')
						if (key === fieldName) {
							this.$refs[key].focus();
						}
						if ("field-" + fieldName===key) {
							this.errors[key.replace('field-','')].message = errorData.errorCode;
							this.errors[key.replace('field-','')].type = "is-danger";
						}
                        else if(key.includes('field-')){
                            this.errors[key.replace('field-','')].message ='';
							this.errors[key.replace('field-','')].type = '';
                        }
					});
				}
                this.saving=false;
			});
		},
	},
	mounted() {
		if (this.isEditMode) {
			this.newBoat = { ...this.existingBoat };
		}
		Object.keys(this.$refs).forEach((key) => {
            if(key.includes('field-')){
                this.$refs[key].message ='';
				this.$refs[key].type = "";
            }
        });
	},
	computed: {
		isEditMode() {
			return (
				this.existingBoat && Object.keys(this.existingBoat).length > 0
			);
		},
	},
};
</script>

<style lang="scss" scoped></style>
