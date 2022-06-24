<script>

    import {getContext} from "svelte";
    const placemarkservice = getContext("PlacemarkService");

    import {push} from "svelte-spa-router";
    import {onMount} from "svelte";

    let newmail;
    let errorMessage = ""
    let user = {}

    onMount(async () => {
        user = await placemarkservice.getUserInfo();
        console.log(user)
    });

    async function deleteUser(){
        await placemarkservice.deleteUser(user._id);
        await placemarkservice.logout()
        push("/")
        // sleep for 1000ms to wait for server change
    }

    async function submitNewMail() {
        await placemarkservice.updateMail(newmail)
        user = await placemarkservice.getUserInfo();
        await placemarkservice.logout()
        push("/login")
    }

</script>
<div class="section">
    <div class="box">
        <div>
            <h1 class="title is-4">Your Account details: </h1>
            <!-- user stats table -->
            <table class="table">
                <tr>
                    <td>Username: </td>
                    <td>{user.username}</td>
                </tr>
                <tr>
                    <td>Email: </td>
                    <td>{user.email}</td>
            </table>
        </div>
    </div>
    <div class="columns">
    <div class="column">
        <div class="box">
            <h1 class="title is-3">User Settings.</h1>
            <div class="content">
                <p>
                    Not happy with your email used? Change it here.
                    <br>
                    Please note, that you will be asked to login again afterwards.
                </p>
                <form on:submit|once|preventDefault={submitNewMail} >
                    <!-- show current Email -->
                    <div class="field">
                        <label for="email" class="label">Email</label>
                        <input bind:value={newmail} autocomplete="email" id="email" class="input" type="text" placeholder="Enter email" name="email">
                    </div>
                    <div class="field is-grouped">
                        <button class="button is-link">Change is Imminent!</button>
                    </div>
                </form>
                {#if errorMessage != ""}
                    <div class="section">
                        {errorMessage}
                    </div>
                {/if}
            </div>
        </div>
    </div>

    </div>

    <div class="box">
        <h1 class="title is-3">Delete Account.</h1>
        <div class="content">
            <p>
                Are you sure you want to delete your account?

            </p>
                <div class="field is-grouped is-danger">
                    <button on:click={deleteUser} class="button is-danger is-link">Delete Account</button>
                </div>
            {#if errorMessage != ""}
                <div class="section">
                    {errorMessage}
                </div>
            {/if}
        </div>

    </div>
</div>



