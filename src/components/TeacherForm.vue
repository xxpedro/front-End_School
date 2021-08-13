<template>
    <div class="row container">
        <div class="col-9">
            <table class="table shadow p-3 mb-5  rounded">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Mantenimiento</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, index) in Teachers.data" :key="index">
                    <th scope="row">{{index + 1}}</th>
                    <td>{{data.name}}</td>
                    <td>{{data.lastName}}</td>
                    <td>
                        <button @click="Delete(data.id)" class="btn btn-danger">Eliminar</button> |
                        <RouterLink 
                            class="user__more" 
                            :to="{ path: `/EditTeachers/${data.id}`, params: {username: this.username}}"
                        >Editar Maestro 👁</RouterLink>                    </td>
                </tr>
            </tbody>
            </table>
        </div>
        <div class="col-3 shadow p-3 mb-5  rounded">
            <div class="mb-3" >
                <input type="text" v-model="name" placeholder="Escriba su nombre" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>

            <div class="mb-3">
                <input type="text" v-model="lastName" placeholder="Escriba su Apellido" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>

              <div class="mb-3">
                <input type="text" disabled v-model="enrollment" placeholder="Escriba su Matricula" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>


            <div class="d-grid gap-2">
                <button @click="Add()" class="btn btn-primary" type="button">Agregar</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data(){
            return{
                Teachers:[],
                name:'',
                lastName:'',
                enrollment:new Date().getFullYear()+"-"+ Math.floor((Math.random() * (9999 - 1000 + 1)) + 1000)
            }
        },
        methods:{
            getData(){
                axios.get('https://localhost:44325/api/Teacher/GetAll').then(data=>{
                    this.Teachers = data;
                    console.log(data)
                })
            },
            
            
            Delete(id){
                axios.delete(`https://localhost:44325/api/Teacher/Delete/${id}`).then(data=>{
                    this.Teachers = data;
                    this.getData();
                })
            },
            Add(){
                const StudentData = 
                {
                    name:this.name,
                    lastName:this.lastName,
                    enrollment:this.enrollment
                }
                    axios.post('https://localhost:44325/api/Teacher/Add', StudentData).then(data=>{
                        if(data.status==200)
                        {
                            this.getData();
                            this.cleanData();
                        }
                    })
            },
            Update(){
                axios.get('https://localhost:44325/api/Teacher').then(()=>{
                })
            },
             cleanData()
            {
                this.name = ''
                this.lastName = '',
                this.enrollment = new Date().getFullYear()+"-"+ Math.floor((Math.random() * (9999 - 1000 + 1)) + 1000);
            }
        },
        created(){
            this.getData();
        }


    }
</script>

<style lang="scss" scoped>

</style>