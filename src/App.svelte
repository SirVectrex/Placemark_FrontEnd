<script>
    import Main from "./pages/Main.svelte"
    import Login from "./pages/Login.svelte"
    import Signup from "./pages/Signup.svelte"
    import Router from "svelte-spa-router";
    import Navbar from "./pages/components/Navbar.svelte";
    import About from "./pages/About.svelte";
    import { PlacemarkService } from "./services/placemarkService.js";
    import {setContext} from "svelte";
    // setContext("PlacemarkService", new PlacemarkService("http://localhost:4000"));
    setContext("PlacemarkService", new PlacemarkService("https://wahi-backend.herokuapp.com"));




    let routes = {
        "/": Main,
        "/login": Login,
        "/signup": Signup,
        "/main": Main,
        "/about": About
    }
</script>



<div class="container">

    <div class="container">
        <Navbar/>
        <Router {routes}/>
    </div>
</div>

<style>
   * {
       font-family: 'Quicksand', sans-serif;
   }

</style>