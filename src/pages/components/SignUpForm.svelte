<script>
    import { push } from "svelte-spa-router";
    import { getContext } from "svelte";

    let firstName = "";
    let lastName = "";
    let email = ""
    let password = "";
    let username = "";
    let errorMessage = "";
    let successMessage = "";

    const placemarkservice = getContext("PlacemarkService");

    function validateEmail()
    {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


    async function signup() {
        let success = await placemarkservice.signup(firstName, lastName, username, email, password)
        if (validateEmail() === false){
            errorMessage = "Please enter a real email address";
                    }
        else if (success.status == "success") {
            await push("/login");
        } else {
            errorMessage = success.message;
        }
    }
</script>

<form on:submit|preventDefault={signup}>
    <div class="field is-horizontal">
        <div class="field-body">
            <div class="field">
                <label for="firstname" class="label">First Name</label>
                <input bind:value={firstName} autocomplete="given-name" id="firstname" class="input" type="text" placeholder="Enter first name" name="firstName" required>
            </div>
            <div class="field">
                <label for="lastname" class="label">Last Name </label>
                <input bind:value={lastName} autocomplete="family-name" id="lastname" class="input" type="text" placeholder="Enter last name" name="lastName" required>
            </div>
        </div>
    </div>
    <div class="field">
        <label for="username" class="label">Username</label>
        <input bind:value={username} autocomplete="username" id="username" class="input" type="text" placeholder="Enter username" name="username" required>
    </div>
    <div class="field">
        <label for="email" class="label">Email</label>
        <input bind:value={email} autocomplete="email" id="email" class="input" type="email" placeholder="Enter email" name="email" required>
    </div>
    <div class="field">
        <label for="password" class="label">Password</label>
        <input bind:value={password} autocomplete="new-password" id="password" class="input" type="password" placeholder="Enter Password" name="password" required>
    </div>
    <div class="field is-grouped">
        <button class="button is-link">Sign Up</button>
    </div>
</form>
{#if errorMessage}
    <div class="section">
        {errorMessage}
    </div>
{/if}