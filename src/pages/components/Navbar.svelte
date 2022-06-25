<script>

    import {getContext} from "svelte";
    import {loggedin, isAdmin, currentUserName} from "/src/services/stores.js";
    import SidebarPanels from 'svelte-sidebar-panels'

    const placemarkservice = getContext("PlacemarkService");

    let stat;
    loggedin.subscribe(value => {
        stat = value;
    });

    let admin;
    isAdmin.subscribe(value => {
        admin = value;
    });
    let userName
    currentUserName.subscribe(value => {
        userName = value;
    });


    async function funclogout() {
        await placemarkservice.logout();
    }

</script>


<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="/#/">
            <img alt="logo" src="/logo_white.png" >
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
            <a class="navbar-item" href="/#/map">
                Map
            </a>
            <a class="navbar-item" href="/#/about">
                About Us
            </a>
            {#if admin}
            <a class="navbar-item" href="/#/dashboard">
                Administration
            </a>
            {/if}

        </div>

        <div class="navbar-end">
            <div class="navbar-item">
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
                        <div id="welcome" class="tag is-light">
                            <p><i class="fa fa-hand-peace-o" aria-hidden="true"></i> {userName}</p>
                        </div>

                        <div>
                            <a class="navbar-item" href="/#/usersettings">
                                <i class="fa fa-cog" aria-hidden="true"></i>
                            </a>
                        </div>
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