<template>
    <div>
        <b-field :label="label">
            <b-autocomplete
                :required="required"
                :data="data"
                :placeholder="placeholder"
                :field="fieldToDisplay"
                :value="defaultValue"
                :loading="isFetching"
                @typing="getAsyncData"
                open-on-focus
                icon="magnify"
                @select="updateData"
                :clearable="!disabled"
                :disabled="disabled"
                >
                <template #empty>No results found</template>
                <template slot-scope="props">
                    <div class="media">
                        <div class="media-content">
                            <span><b-icon size="is-small" :icon="iconName" :type="iconType"/> {{ props.option.Name }}</span>
                        </div>
                    </div>
                </template>
            </b-autocomplete>
        </b-field>
    </div>
</template>

<script>
import {searchRecord} from '../controllers/modelService'

    export default {
        name:'LookupField',
        props:['placeholder','label','fieldToDisplay','apiName','disabled','iconName','iconType','value','required','fieldForValue','defaultValue'],
        data(){
            return{
                searchText:'',
                data:[],
                isFetching:false
            }
        },
        methods:{
            getAsyncData(name){
                this.isFetching=true
                searchRecord(this.apiName,name)
                .then((response)=>{
                    if(response.data.success){
                        this.data=response.data.records
                        console.log(this.data)
                    }
                    this.isFetching=false
                })
            },
            updateData(value){
                this.$emit('input',value[this.fieldForValue])
            }
        },
    }
</script>

<style scoped>

</style>