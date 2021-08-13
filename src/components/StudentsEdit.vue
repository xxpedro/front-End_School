<template>
    <div class="row d-flex justify-content-center pt-5">

        <div class=" col-6 shadow p-3 mb-5  rounded">
            <div class="mb-3" >
                <input type="text" v-model="name" placeholder="Escriba su nombre" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>

            <div class="mb-3">
                <input type="text" v-model="lastName" placeholder="Escriba su Apellido" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>

            <div class="mb-3">
                <input  type="text" v-model="enrollment" placeholder="Escriba su Matricula" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>

            <div class="d-grid gap-2">
                <button @click="Update()" class="btn btn-primary" type="button">Agregar</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data(){
            return{
                studentId: this.$route.params.id,
                name:'',
                lastName:'',
                enrollment:'',
            }
        },
        methods:{
            
            getStudentData(){
                axios.get(`https://localhost:44325/api/Student/${this.studentId}`).then(data=>{
                    this.name = data.data.name
                    this.lastName = data.data.lastName,
                    this.enrollment = data.data.enrollment
                })
            },
            Update(){
                const StudentData={
                        name:this.name,
                        lastName:this.lastName,
                        enrollment:this.enrollment
                }
                axios.put(`https://localhost:44325/api/Student/${this.studentId}`,StudentData).then(data=>{
                    if(data.status==200){
                        alert("Editado con exito")
                            this.cleanData();
                    }
                });
            },
             cleanData(){
                this.name =''
                this.lastName=''
                this.enrollment=''
                
            }
        },
        created(){
            this.getStudentData();
        }


    }
</script>

<style lang="scss" scoped>
.content{
max-width: 300px;
}
</style>