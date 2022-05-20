<script>

    import {getContext} from "svelte";
    import {push} from "svelte-spa-router";
    import {loggedin} from "/src/services/stores.js";

    const placemarkservice = getContext("PlacemarkService");

    let stat;
    loggedin.subscribe(value => {
        stat = value;
    });


    async function funclogout() {
        await placemarkservice.logout();
    }


</script>


<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="/#/">
            <img src="./src/assets/logo_white.png" >
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
            <a class="navbar-item" href="/#/">
                Main
            </a>
            <a class="navbar-item" href="/#/explore">
                Explore
            </a>
            <a class="navbar-item" href="/#/about">
                About Us
            </a>
        </div>

        <div class="navbar-end">
            <div class="navbar-item">
                status: {stat}
                <div class="buttons">
                    {#if !stat}
                        <a class="button is-light" href="/#/login">
                            Log in
                        </a>
                        <a class="button is-light" href="/#/signup">
                            Sign up
                        </a>

                    {/if}
                    {#if stat}
                        <div>
                        <button id="logout" class="button is-light" on:click|once={funclogout}>
                            Log Out
                        </button>
                        </div>
                    {/if}



                </div>
            </div>
        </div>
    </div>

</nav>

<style>
    .navbar
    {
        margin-top : 5px;
        margin-bottom: 10px;
    }
</style>