<template>
    <div class="row pt-5 container">
        <div class="col-9">
            <table class="table shadow p-3 mb-5  rounded">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Dia</th>
                <th scope="col">Hora</th>
                <th scope="col">Cupos</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, index) in courses.data" :key="index" >
                    <th scope="row">{{index + 1}}</th>
                    <td>{{data.name}}</td>
                    <td>{{data.day}}</td>
                    <td>{{data.initialTime}}:00 - {{data.finalTime}}:00</td>
                    <td>{{data.quota}}</td>
                    <td>
                        <button @click="Delete(data.id)" class="btn btn-danger">Eliminar</button> |
                        <RouterLink 
                            class="user__more" 
                            :to="{ path: `/EditCourses/${data.id}`, params: {username: this.username}}"
                        >Editar Cursos 👁</RouterLink>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
        
        <div class="col-3 shadow p-3 mb-5  rounded">
            <div class="mb-3" >
                <input type="text" v-model="name" placeholder="Escriba su nombre" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>

            <div class="mb-3">
                <select class="form-select" v-model="day"  name="" id="">
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miercoles">Miercoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                    <option value="Sabados">Sabados</option>
                </select>
            </div>

            <div class="mb-3 d-flex">
                <select class="form-select" v-model="initialTime"  name="" id="">
                    <option selected value="8">8:00</option>
                    <option value="9">9:00</option>
                    <option value="10">10:00</option>
                    <option value="11">11:00</option>
                    <option value="12">12:00</option>
                    <option value="13">13:00</option>
                    <option value="14">14:00</option>
                    <option value="15">15:00</option>
                    <option value="16">16:00</option>
                    <option value="17">17:00</option>
                    <option value="18">18:00</option>
                </select>

                <select class="form-select" v-model="finalTime" name="" id="">
                    <option selected value="8">8:00</option>
                    <option value="9">9:00</option>
                    <option value="10">10:00</option>
                    <option value="11">11:00</option>
                    <option value="12">12:00</option>
                    <option value="13">13:00</option>
                    <option value="14">14:00</option>
                    <option value="15">15:00</option>
                    <option value="16">16:00</option>
                    <option value="17">17:00</option>
                    <option value="18">18:00</option>
                </select>
            </div>

            <div class="mb-3" >
                <input type="number" v-model="quota" placeholder="Cupos disponibles para estudiantes" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <div class="mb-3" >
                <input type="number" v-model="quotaTeachers" placeholder="Cupos disponibles para profesores" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
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
                courses:[],
                name:'',
                day:'',
                initialTime:'',
                finalTime:'',
                quota:'',
                quotaTeachers:'',

                NUM_RESULTS: 4, // Numero de resultados por página
                pag: 1
            }
        },
        methods:{
            totalPages(){
                return Math.ceil(this.courses.length / this.elementPages);
            },


            getData(){
                axios.get('https://localhost:44325/api/Courses').then(data=>{
                    console.log(data)
                    this.courses = data;
                })
            },
            
            Delete(id){
                axios.delete(`https://localhost:44325/api/Courses/${id}`).then(data=>{
                    this.courses = data;
                    this.getData();
                })
            },
            Add(){
                const StudentData = 
                    {
                        Name:this.name,
                        Day:this.day,
                        InitialTime:this.initialTime,
                        FinalTime:this.finalTime,
                        quota:this.quota,
                        quotaTeachers:this.quotaTeachers

                    }

                    if(parseInt(StudentData.FinalTime) <= parseInt(StudentData.InitialTime))
                    {
                        alert('La hora de salida es mayor que la hora de entrada')
                        return;
                    }
                    axios.post('https://localhost:44325/api/Courses', StudentData).then(data=>{
                        this.courses = data;
                        this.getData();
                    })
            },
            Update(){
                axios.get('https://localhost:44325/api/Courses').then(data=>{
                    this.courses = data;
                })
            }
        },
        created(){
            this.getData();
        }


    }
</script>

<style lang="scss" scoped>

</style>