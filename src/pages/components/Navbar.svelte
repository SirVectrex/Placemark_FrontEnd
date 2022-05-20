<script>

    import {getContext} from "svelte";

    const placemarkservice = getContext("PlacemarkService");
    $: showLogin = placemarkservice.loggedIn

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
                <div class="buttons">
                    {#if !showLogin}
                        <a class="button is-light" href="/#/login">
                            Log in
                        </a>
                        <a class="button is-light" href="/#/signup">
                            Sign up
                        </a>
                    {/if}
                    {#if showLogin}
                        <a class="button is-light" href="/#/logout">
                            Log Out
                        </a>
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