<script>


    import Main from "./pages/Main.svelte"
    import Login from "./pages/Login.svelte"
    import Signup from "./pages/Signup.svelte"
    import Router from "svelte-spa-router";
    import Navbar from "./pages/components/Navbar.svelte";
    import About from "./pages/About.svelte";
    import Map from "./pages/Map.svelte";
    import Dashboard from "./pages/Dashboard.svelte";
    import { PlacemarkService } from "./services/placemarkService.js";
    import {setContext} from "svelte";
    import {wrap} from 'svelte-spa-router/wrap'
    import {isAdmin} from "./services/stores.js";

    let admin = false;
    isAdmin.subscribe(value => {
        admin = value;
    });

    // for dev only
    // setContext("PlacemarkService", new PlacemarkService("http://localhost:4000"));

    setContext("PlacemarkService", new PlacemarkService("https://wahi-backend.herokuapp.com"));




    let routes = {
        "/": Main,
        "/login": Login,
        "/signup": Signup,
        "/main": Main,
        "/about": About,
        "/map": Map,
        "/map/:id": Map,
        "/dashboard": wrap({
            // Use a dynamically-loaded component for this
            asyncComponent: () => import('./pages/Dashboard.svelte'),
            conditions: [
                async (detail) => {
                    // Return true to continue loading the component, or false otherwise
                    if (admin) {
                        return true
                    }
                    else {
                        alert("You must be an admin to access this page");
                        return false
                    }
                }
            ]
        })
    }
</script>



<div class="container is-fullhd">

    <div class="container">
        <Navbar/>
    </div>
    <div class="container is-fullhd">
        <Router {routes}/>
    </div>

</div>

<style>
   * {
       font-family: 'Quicksand', sans-serif;
   }

</style>