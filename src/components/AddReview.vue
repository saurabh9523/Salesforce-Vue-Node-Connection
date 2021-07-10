<template>
	<div style="height:67vh">
		<form @submit.prevent="submitReview">
			<div class="columns">
				<div class="column is-6">
					<b-field label="Review Subject">
						<b-input
							type="text"
							v-model="review.subject"
							placeholder="Subject"
							min="1"
							required
						>
						</b-input>
					</b-field>
				</div>
				<div class="column is-4">
					<b-field label="Rating">
						<b-rate v-model="review.rating"></b-rate>
					</b-field>
				</div>
			</div>
			<div class="mx-2">
				<b-field label="Comment">
					<quill-editor v-model="review.comment" :options="options">
					</quill-editor>
				</b-field>
			</div>
			<div class="slds-align_absolute-center">
				<b-button
					native-type="submit"
					type="is-success"
					class="mx-6 my-3"
					>Submit
				</b-button>
			</div>
		</form>
	</div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import { createRecord } from "../controllers/modelService";

export default {
	name: "AddReview",
	props: ["selectedBoatId"],
	components: {
		quillEditor,
	},
	data() {
		return {
			review: {
				subject: "",
				rating: 0,
				comment: ""
			},
			options: {
				theme: "snow",
				placeholder: "Enter review comment",
				modules: {
					toolbar: {
						container: [
							["bold", "italic", "underline", "strike"],
							["blockquote"], // reference
							[{ header: 1 }, { header: 2 }],
							[{ list: "ordered" }, { list: "bullet" }], // List
							[{ indent: "-1" }, { indent: "+1" }],
						],
					},
				},
			},
		};
	},
	methods: {
		submitReview() {
			createRecord("BoatReview__c", {
				Name: this.review.subject,
				Rating__c: this.review.rating,
				Comment__c: this.review.comment,
				Boat__c: this.selectedBoatId,
			})
				.then((response) => {
					if (response.data.success) {
                        this.review= {subject: "",rating: 0,comment: ""}   
						this.$buefy.toast.open({
							duration: 3000,
							message: "Review submitted successfully!",
							type: "is-success",
						});
					} else {
						console.log(response.data);
						this.$buefy.toast.open({
							duration: 3000,
							message: "Review submission failed!",
							type: "is-danger",
						});
					}
					this.$emit("allreviews");
				})
				.catch((err) => {
					console.log(err);
					this.$buefy.toast.open({
						duration: 3000,
						message: "Review submission failed!",
						type: "is-danger",
					});
				});
		},
	},
};
</script>

<style scoped>
	/deep/ .ql-container {
	height: 20vh;
}
</style>
