import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import StudentsForm from '../views/StudentView.vue'
import TeacherForm from '../views/TeacherView.vue'
import MatterAsigmentView from '../views/MatterAsigmentView.vue'
import MattersView from '../views/MattersView.vue'
import EditCourses from '../components/EditCourses.vue'
import EditTeachers from '../components/EditTeacher.vue'
import StudentsEdit from '../components/StudentsEdit.vue'




const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Students',
    name: 'Students',
    component: StudentsForm
  },
  {
    path: '/Teacher',
    name: 'Teacher',
    component: TeacherForm
  },
  {
    path: '/MatterAsigment',
    name: 'MatterAsigment',
    component: MatterAsigmentView
  },
  {
    path: '/MattersView',
    name: 'MattersView',
    component: MattersView
  },
  {
    path: '/EditCourses/:id',
    name: 'EditCourses',
    component: EditCourses
  },
  {
    path: '/EditTeachers/:id',
    name: 'EditTeachers',
    component: EditTeachers
  },
  {
    path: '/EditStudent/:id',
    name: 'EditStudent',
    component: StudentsEdit
  }



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
