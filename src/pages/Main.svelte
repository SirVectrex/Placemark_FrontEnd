<script>
    import SignUpForm from "./components/SignUpForm.svelte";
</script>

<div id="first" class="columns is-vcentered">
    <div class="column">
        <img id="map" alt="homer" src="./src/assets/coolmap.png" width="500">
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

<div id="second" class="columns is-vcentered">

    <div class="column">
        <h1 class=" title is-4 has-text-centered">
            Feature Rich!
        </h1>
        <p class="is-primary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas, modi fugit in veritatis labore perferendis. Minima hic at, nostrum nihil!
        </p>
    </div>
    <div class="column">
        <img id="map2" alt="homer" src="./src/assets/coder_image.png" width="500">
    </div>
</div>

<div class="box has-background-light">
    <div class="columns">
        <div class="column">
            <h1 class="title is-4 has-text-centered">
                Sign up today!
            </h1>
        </div>
        <div class="column">
            <SignUpForm />
        </div>
    </div>
</div>



<style>

    #first {
    }

    #map, #map2 {

        border-radius: 5%;
        margin-top: 10px;
        margin-bottom: 0px;
    }

    #logo {
        margin-top: 0px;
        margin-bottom: 10px;
    }




</style>