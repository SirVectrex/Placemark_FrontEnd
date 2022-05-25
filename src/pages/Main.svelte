<script>
    import SignUpForm from "./components/SignUpForm.svelte";
</script>










<div id="first" class="columns  section is-vcentered">
    <div class="column ">
        <!-- get img from assets-->
        <img id="map" alt="homer" src="/public/coolmap.png" width="450">
    </div>
    <div class="column">
        <div class="container has-text-centered">
                <img class="inline-block" id="logo" alt="Logo" src="./src/assets/logo.png" width="60%">
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
            All about automotive Photography? So are we.
            <br>
            Most important about taking photos of an object is the location and light you position it in. Whilst
            we can't help with changing the weather, we can surely help you to find a great spot!
            <br>
            <br>
            Curated by the photographer <a href="https://newtonmaniac.com">NewtonManiac</a>
        </p>
    </div>
    <div class="column">
        <div class="container has-text-centered">
            <img class="inline-block" id="code" alt="Logo" src="./src/assets/ferrari.jpg" width="80%">
        </div>
    </div>
</div>

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