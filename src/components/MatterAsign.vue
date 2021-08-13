<template>
    <div>
        <div class="row container pt-5">
            <div class="col-4 d-flex justify-content-center rounded">
                <div class="bg-light radius shadow p-3 mb-5  rounded">
                    <select class="form-select mb-5" @change="getByUserByEnrollment" v-model="enrollment" aria-label="Default select example">
                        <option  v-for="(StudentData, index) in StudentData.data" :value="StudentData" :key="index">{{StudentData.enrollment}}</option>
                    </select>
                    <div class="card radius" style="width: 18rem;">
                        <img src="../assets/StudentProfile.png" class="card-img-top" alt="...">
                        <div class="card-body text-dark" v-for="(currentUser, index) in UserByEnroll" :key="index">
                            <p class="card-text">Nombre: {{currentUser.data.name}} {{currentUser.lastName}}</p>
                            <p class="card-text">Matricula: {{currentUser.data.enrollment}}</p>
                        </div>
                    </div>
                    <hr>
                    <h4>Horario de este Profesor</h4>
                    <hr>
                    <!--<buttonComponent></buttonComponent>-->      
                     <table class="table container shadow p-3 mb-5 rounded">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Materia</th>
                        <th scope="col">Dia</th>
                        <th scope="col">Horario</th>
                        </tr>
                    </thead>
                    
                    <tbody >
                        <tr v-for="(data, index) in selectedMatter.data" :key="index">
                            <td>{{index + 1}}</td>
                            <td>{{data.courseName}}</td>
                            <td>{{data.day}}</td>
                            <td>
                                {{data.inicial}}-{{data.final}} 
                            </td>

                            <td>
                                <button class="btn btn-danger" @click="deleteSelectedMatter(data.courseId)">x</button>
                            </td>
                        </tr>
                    </tbody>
                </table>      
                </div>
                
            </div>
            <div class="col-8">
                <table class="table container shadow p-3 mb-5 rounded">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Seleccion</th>
                        <th scope="col">Materia</th>
                        <th scope="col">Dia</th>
                        <th scope="col">Horario</th>
                        <th scope="col">Cupos</th>
                        </tr>
                    </thead>
                    
                    <tbody >
                        <tr v-for="(data, index) in TeacherData.data" :key="index">
                            <td>{{index + 1}}</td>
                            <th>
                                <div class=" form-switch">
                                    <input class="form-check-input" :disabled="data.numberOfTeachers==data.quotaTeachers ? '' : disabled"  @click="SelecionarMateria(data.id, data.name)" type="checkbox" :id="data.name" >
                                </div>
                            </th>
                            <td>{{data.name}}</td>
                            <td>{{data.day}}</td>
                            <td>
                                {{data.initialTime}}:00-{{data.finalTime}}:00 
                            </td>
                            <td>{{data.numberOfTeachers}}/{{data.quotaTeachers}}</td>
                        </tr>
                    </tbody>
                </table>
               
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
//import buttonComponent from '../components/ButtonComponent.vue'
    export default {
        data() {
            return {
                TeacherData:[],
                StudentData:[],
                UserByEnroll:[],
                enrollment:'',
                checked:'',
                selectedMatter:[]
                

            }
        },
        components:{
            //buttonComponent
        },
        methods: {
            GetData()
            {
                axios.get('https://localhost:44325/api/Courses').then(courseInfo=>{
                    this.TeacherData =courseInfo;
                    console.log(this.TeacherData)
                })
            },
            UserData(){
                axios.get('https://localhost:44325/api/Teacher/GetAll').then(UserInfo=>{
                    this.StudentData = UserInfo;
                    console.log(UserInfo)
                })
            },
            getByUserByEnrollment(){  
                axios.get(`https://localhost:44325/api/Teacher/getByEnroll/${this.enrollment.enrollment}`).then(UserByEnroll=>{
                    this.UserByEnroll=[]
                    this.UserByEnroll.push(UserByEnroll);
                    this.getSelectedMatter(this.enrollment.id);
                    this.GetData();

                })
            },
            SelecionarMateria(id, name)
            {
                                
                console.log(id);
                const SelectedMatter={

                    teachersId:this.enrollment.id,
                    coursesId:id
                }

                var isChecked = document.getElementById(name).checked
                if(isChecked)
                {
                    if(this.enrollment != '')
                    {
                        axios.post('https://localhost:44325/api/MatterAssigment', SelectedMatter).then(message=>{
                        alert(message.data.message)
                        this.getSelectedMatter(this.enrollment.id);
                        this.GetData();
                        })
                    }
                    else
                    {
                        alert("Selecione una matricula")
                        document.getElementById(name).checked = false
                        return
                    }
                    
                }
            },
            getSelectedMatter(id)
            {
                console.log(id)
                axios.get(`https://localhost:44325/api/MatterAssigment/${id}`).then(data=>{
                    this.selectedMatter = data;
                    this.GetData();
                })
            },
            deleteSelectedMatter(id){
                const SelectedMatter={
                    teachersId:this.enrollment.id,
                    coursesId:id
                }
                axios.post('https://localhost:44325/api/MatterAssigment/api/MatterAssigment/updateQuota', SelectedMatter).then(()=>{
                    this.getSelectedMatter(this.enrollment.id);
                    this.GetData();
                    alert('Eliminado')
                })
            }



        },
        created(){

            this.GetData();
            this.UserData();
        },
        
    }
</script>

<style lang="scss" scoped>
.radius
{
    border-radius: 20px;
}
</style>