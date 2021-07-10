<template>
    <div style="height:100vh" class="slds-scrollable_y">
        <b-table
            :data="boats"
            :paginated="true"
            :per-page="10"
            :pagination-simple="false"
            sort-icon="arrow-up"
            :sticky-headers="true"
            default-sort="Name"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            focusable
            :selected.sync="selected"
            aria-current-label="Current page">
            <b-table-column field="Name" label="Boat Name" sortable v-slot="props">
                {{ props.row.Name }}
            </b-table-column>
            <b-table-column field="BoatType.Name" label="Boat Type" sortable v-slot="props">
                {{props.row.BoatType.Name}}
            </b-table-column>
            <b-table-column field="Length" label="Boat Length  (in meters)" sortable v-slot="props">
                {{ props.row.Length +'m'}}  
            </b-table-column>
            <b-table-column field="Price" label="Boat Price (in dollars)" sortable v-slot="props">
                {{'$ '+props.row.Price}}
            </b-table-column>
            <b-table-column field="Contact.Name" label="Contact Name" sortable v-slot="props">
                {{props.row.Contact.Name}}
            </b-table-column>
            <b-table-column field="" label="Actions" sortable centered v-slot="props">
                <b-button type="is-success is-light" outlined icon-right="pencil" @click="clickedRecord(props.row)"/>
            </b-table-column>
        </b-table>
        <b-modal v-model="openModal" trap-focus has-modal-card :can-cancel="false">
            <SaveOrEditBoat @close="openModal=false" :existing-boat="selected"/>
        </b-modal>
    </div>
</template>

<script>
import SaveOrEditBoat from './SaveOrEditBoat.vue'
import EventBus from '../EventBus'

    export default {
        name:'BoatTable',
        props:['boats'],
        components:{
            SaveOrEditBoat  
        },
        data(){
            return{
                selected:{},
                openModal:false
            }
        },
        methods:{
            clickedRecord(row){
                this.selected=row
                this.openModal=true
            }
        },
        watch:{
            selected(value){
                EventBus.$emit('BOAT_SELECTED', value)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>