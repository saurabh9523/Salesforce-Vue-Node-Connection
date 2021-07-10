<template>
    <div class="container py-5 is-fluid" style="height:100vh">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    Login Form
                </p>
            </header>
            <div class="content mx-4 py-4">
                <form @submit.prevent="submit">
                    <b-field label="Username">
                        <b-input v-model="username" data-id="input" maxlength="80" required :has-counter="hasCounter" size="is-medium"></b-input>
                    </b-field>
                    <b-field label="Password">
                        <b-input v-model="password" data-id="input" maxlength="80" required :has-counter="hasCounter" type="password" size="is-medium"></b-input>
                    </b-field>
                    <b-field label="Security Token">
                        <b-input v-model="securityToken" data-id="input" maxlength="80" required :has-counter="hasCounter" size="is-medium"></b-input>
                    </b-field>
                    <div class="slds-align_absolute-center">
                        <b-button type="is-primary" native-type="submit" label="Login"></b-button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {login,validateSession} from '../controllers/authService';

    export default {
        name:"Login",
        components:{
        },
        data(){
            return{
                title:"Login Form",
                username:"",
                password:"",
                hasCounter:false,
                securityToken:""
            }
        },
        methods:{
            submit: function(){
                const res = login({
                    username:this.username,
                    password:this.password,
                    securityToken:this.securityToken
                })
                res.then((response)=>{
                    if(response.data.success){
                        console.log(response.data);
                        this.$emit('login')
                    }
                })
            },
        },
        created(){
            validateSession().then((response)=>{
                if(response.data.success){
                    this.$emit('login')
                }
                this.$emit('loadingcomplete')
            })
        },
    }
</script>

<style lang="scss" scoped>

</style>