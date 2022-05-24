<script>
    import SignUpForm from "./components/SignUpForm.svelte";
</script>










<div id="first" class="columns  section is-vcentered">
    <div class="column ">
        <img id="map" alt="homer" src="./src/assets/coolmap.png" width="450">
    </div>
    <div class="column">
        <div class="container has-text-centered">
                <img class="inline-block" id="logo" alt="Logo" src="./src/assets/logo.png" width="60%">
        </div>
        <h1 class=" title is-4 has-text-centered">
            Stop the search.
        </h1>
        <p class="is-primary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, modi fugit in veritatis labore perferendis. Minima hic at, nostrum nihil!

            incididunt ut labore et dolore magna. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, modi fugit in veritatis labore perferendis. Minima hic at, nostrum nihil!

        </p>
    </div>
</div>

<div id="second" class="box  has-background-dark section columns is-vcentered">

    <div class="column has-text-white">
        <h1 class="has-text-white title is-4 has-text-centered">
            Feature Rich!
        </h1>
        <p class="is-primary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, modi fugit in veritatis labore perferendis. Minima hic at, nostrum nihil!
        </p>
    </div>
    <div class="column">
        <div class="container has-text-centered">
            <img class="inline-block" id="code" alt="Logo" src="./src/assets/coder_image.png" width="80%">
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incid
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