<template>
	<div id="app">
    <b-loading is-full-page v-model="isLoading"></b-loading>
		<b-navbar type="is-dark">
			<template #end>
				<b-navbar-item tag="div">
					<div class="buttons">
						<b-button v-if="sessionId===true"
							type="is-danger"
							outlined
							class="slds-float_right"
							label="Logout"
							@click="logout"
						></b-button>
					</div>
				</b-navbar-item>
			</template>
		</b-navbar>
		<template v-if="!sessionId">
			<Login v-on:login="validateSession" v-on:loadingcomplete="loadingcomplete" />
		</template>
		<template v-if="sessionId">
			<BoatsApp v-on:logout="logout" v-on:loadingcomplete="loadingcomplete" v-on:loadingbegin="loadingbegin"/>
		</template>
	</div>
</template>

<script>
import Login from "./components/Login.vue";
import BoatsApp from "./components/BoatsApp.vue";
import { logout } from "./controllers/authService";

export default {
	name: "App",
	components: {
		Login,
		BoatsApp,
	},
	data() {
		return {
			sessionId: false,
			isLoading: true
		};
	},
	methods: {
		validateSession() {
			this.sessionId = true;
		},
    loadingcomplete(){
      this.isLoading=false;
    },
    loadingbegin(){
      this.isLoading=true;
    },
		async logout() {
      this.loadingbegin()
			await logout()
      this.sessionId = false;
      this.loadingcomplete()
		},
	},
};
</script>

<style>
@import url("../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css");
#app{
	background-color:lightgrey;
}
</style>
