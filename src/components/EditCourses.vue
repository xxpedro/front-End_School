<template>
    <div class="row d-flex justify-content-center pt-5">
        <div class="col-6">
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
                <input type="number" v-model="quota" placeholder="Cupos disponibles" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <div class="mb-3" >
                <input type="number" v-model="quotaTeachers" placeholder="Cupos disponibles" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>

            <div class="d-grid gap-2">
                <button @click="updateCourses()" class="btn btn-primary" type="button">Agregar</button>
            </div>
    </div>
</div>
    
</template>

<script>
import axios from 'axios'
    export default {
        data() {
            return {
                courseId: this.$route.params.id,
                userData:[],
                name:'',
                day:'',
                initialTime:'',
                finalTime:'',
                quota:'',
                quotaTeachers:''
            }
        },
        methods:{
            getcourses()
            {
                axios.get(`https://localhost:44325/api/Courses/${this.courseId}`).then(data=>{
                    console.log(data)
                        this.name = data.data.name
                        this.day = data.data.day
                        this.initialTime = data.data.initialTime
                        this.finalTime = data.data.finalTime
                        this.quota = data.data.quota
                        this.quotaTeachers= data.data.quotaTeachers
                    }
                );
            },
            updateCourses()
            {
                const courseData = {
                    name: this.name,
                    day:this.day,
                    initialTime:this.initialTime,
                    finalTime:this.finalTime,
                    quota:this.quota,
                    quotaTeachers:this.quotaTeachers

                }
                axios.put(`https://localhost:44325/api/Courses/${this.courseId}`, courseData).then(data=>{
                    if(data.status == 200){
                         alert('Editado con exito')
                        this.cleanData();
                    }
                });
            },
            cleanData()
            {
                this.name= ''
                this.day=''
                this.initialTime=''
                this.finalTime=''
                this.quota=''
                this.quotaTeachers=''
            }
            
        },
        created(){
            this.getcourses()
        }

    }
</script>

<style lang="scss" scoped>
.content
{
    max-width: 400px;
}
</style>