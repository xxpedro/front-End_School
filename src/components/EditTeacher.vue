<template>
    <div class="row d-flex justify-content-center pt-5">
        <div class="col-6">
            <div class="mb-3" >
                <input type="text" v-model="name" placeholder="Escriba su nombre" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
             </div>

            <div class="mb-3" >
                <input type="text" v-model="lastName" placeholder="Escriba su Apellido" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
             </div>

             <div class="mb-3" >
                <input type="text" v-model="enrollment" placeholder="Escriba su Apellido" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
             </div>

            <div class="d-grid gap-2">
                <button @click="updateTeachers()" class="btn btn-primary" type="button">Agregar</button>
            </div>
    </div>
</div>
    
</template>

<script>
import axios from 'axios'
    export default {
        data() {
            return {
                teacherId: this.$route.params.id,
                name:'',
                lastName:'',
                enrollment:''
            }
        },
        methods:{
            getTeachers()
            {
                axios.get(`https://localhost:44325/api/Teacher/GetById/${this.teacherId}`).then(data=>{
                    console.log(data)
                        this.name = data.data.name
                        this.lastName = data.data.lastName
                        this.enrollment = data.data.enrollment
                    }
                );
            },
            updateTeachers()
            {
                const teacherData = {
                    name: this.name,
                    lastName:this.lastName,
                    enrollment:this.enrollment
                }
                axios.put(`https://localhost:44325/api/Teacher/Put/${this.teacherId}`, teacherData).then(data=>{
                    if(data.status == 200)
                    {
                        alert('Editado con exito')
                        this.cleanData();
                    }
                });
            },
            cleanData()
            {
                this.name = ''
                this.lastName = '',
                this.enrollment = '';
            }
        },
        created(){
            this.getTeachers()
        }

    }
</script>

<style lang="scss" scoped>
.content
{
    max-width: 400px;
}
</style>