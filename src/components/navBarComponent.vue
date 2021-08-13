<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                    <router-link class="navbar-brand" to="/"> <h2>Escuelita</h2></router-link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav ">
                        <!--<router-link to="" class="nav-link active" aria-current="page">Home</router-link>-->
                        <router-link to="/Students" class="nav-link">Estudiantes</router-link>
                        <router-link to="/Teacher" class="nav-link">Profesores</router-link>
                        <router-link to="/MatterAsigment" class="nav-link">Asignar Materias</router-link>
                        <router-link to="/MattersView" class="nav-link">Materias</router-link>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>