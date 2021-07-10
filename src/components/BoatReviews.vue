<template>
    <div style="height:67vh" class="slds-scrollable_y">
        <template v-for="(review,index) in reviews">
            <div :key="index" class="mb-5">
                <div class="media mb-3">
                    <div class="media-left">
                        <b-image :src="review.CreatedBy.SmallPhotoUrl" :alt="`${review.CreatedBy.Name}'s Photo`" rounded></b-image>
                    </div>
                    <div class="media-content">
                        <span><p class="title is-6"><a @click="goToUserDetailPage(review.CreatedById)">{{review.CreatedBy.Name}}</a> - {{review.CreatedBy.CompanyName}}</p>
                        <p class="subtitle is-7">{{getDate(review.CreatedDate)}}</p>
                        </span>
                    </div>
                </div>
                <div class="content">
                    <p class="slds-text-title_caps mb-2">{{review.Name}}</p>
                    <div v-html="review.Comment" class="mb-2"/>
                    <b-rate v-model="review.Rating" disabled/>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { getAllReviews } from "../controllers/modelService";
import {navigateToRecord } from "../controllers/authService";
import moment from 'moment'
    export default {
        name:'BoatReviews',
        props:['selectedBoatId'],
        data(){
            return{
                reviews:[],
                text:'<b>sdfafdadsa<b>'
            }
        },
        methods:{
            getDate(date){
                return moment(date.slice(0,19)).format('LL')
            },
            goToUserDetailPage(Id){
                console.log(Id)
                const res= navigateToRecord(Id);
                res.then((response)=>{
                if(response.data.success){
                    window.open(response.data.message,'_blank')
                }
            })
            },
            getReviews(Id){
                getAllReviews(Id)
                .then((response)=>{
                    if(response.data.success){
                        this.reviews=response.data.records;
                    }
                })
            }
        },
        watch:{
            selectedBoatId(value){
                this.getReviews(value)
            }   
        },            
    }
</script>

<style lang="scss" scoped>

</style>