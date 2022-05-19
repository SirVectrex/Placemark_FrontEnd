<script>
    import Main from "./pages/Main.svelte"
    import Login from "./pages/Login.svelte"
    import Signup from "./pages/Signup.svelte"
    import Router from "svelte-spa-router";
    import Navbar from "./pages/components/Navbar.svelte";
    //import { PlacemarkService } from "./services/placemarkService.js";
    import {getContext, setContext} from "svelte";
    //const placemarkService = getContext("PlaceMarkService");
    //setContext("DonationService", new placemarkService("http://localhost:4000"));

    let routes = {
        "/": Main,
        "/login": Login,
        "/signup": Signup,
        "/main": Main
    }
</script>



<div class="container">

    <div class="container">
        <Navbar/>
        <Router {routes}/>
    </div>
</div>