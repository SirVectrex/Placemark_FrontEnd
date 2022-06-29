<script>
    import SignUpForm from "./components/SignUpForm.svelte";
    import {loggedin} from "../services/stores.js";

    let stat;
    loggedin.subscribe(value => {
        stat = value;
    });

</script>

<div id="first" class="columns  section is-vcentered">
    <div class="column ">
        <!-- get img from assets-->
        <img id="map" alt="homer" src="/coolmap.png" width="450">
    </div>
    <div class="column">
        <div class="container has-text-centered">
                <img class="inline-block" id="logo" alt="Logo" src="/logo.png" width="60%">
        </div>
        <h1 class=" title is-4 has-text-centered">
            Stop the search.
        </h1>

    </div>
</div>

<div id="second" class="box  has-background-dark section columns is-vcentered">

    <div class="column has-text-white">
        <h1 class="has-text-white title is-4 has-text-centered">
            Feature Rich!
        </h1>
        <p class="is-primary">
            All about Photography? So are we.
            <br>
            A good shot is a composition of many aspects. Whilst lighting, angles and the object are extremely important, the location itself plays a major role too.
            <br>
            That's what WAHI is here for. Helping you find the perfect spot.
            <br>
            Curated and developed by photographer <a href="https://newtonmaniac.com">NewtonManiac</a>
        </p>
    </div>
    <div class="column">
        <div class="container has-text-centered">
            <img class="inline-block" id="code" alt="Logo" src="/ferrari.jpg" width="80%">
        </div>
    </div>
</div>
{#if !stat}
<div class="section " id="third">
    <div class="columns">
        <div class="column">
            <h1 class="title is-4 has-text-centered">
                Sign up today!
            </h1>
            <br>
            Whilst our location database is free to explore for all users, we offer registered users the ability to:
            <div class="content">
            <ul>
                <li>
                    Upload photos
                </li>
                <li>
                    Share new spots
                </li>
                <li>
                    Review locations
                </li>
            </ul>
            </div>
        </div>
        <div class="column">
            <SignUpForm />
        </div>
    </div>
</div>
    {/if}


<style>

    #first {
    }

    #second {
        font-color: white;
    }

    #third  {
        margin-bottom: 50px;
    }

    #map, #code {

        border-radius: 5%;
        margin-top: 10px;
        margin-bottom: 0px;
    }


    #logo {
        margin-top: 0px;
        margin-bottom: 10px;
    }

    .section {
        width: 100%;
        height: 40vh;
    }



</style>