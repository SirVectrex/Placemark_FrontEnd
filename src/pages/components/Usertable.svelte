<script>

    import {getContext, onMount} from "svelte";

    const placemarkservice = getContext("PlacemarkService");

    let users = [];
    onMount(async () => {
        users = await placemarkservice.getAllUsers();
        console.log(users)
    });

    async function promoteUser(user) {
        const res = await placemarkservice.promoteUser(user);
        // sleep for 1000ms to wait for server change
        await new Promise(resolve => setTimeout(resolve, 100));
        users = await placemarkservice.getAllUsers();
        console.log(users)
    }

    async function deleteUser(id){
        await placemarkservice.deleteUser(id);
        // sleep for 1000ms to wait for server change
        await new Promise(resolve => setTimeout(resolve, 100));
        users = await placemarkservice.getAllUsers();
    }

</script>


<div class="table-container">
    <!-- table for all users and their content-->
    <table class="table is-fullwidth is-hoverable">
        <thead>
        <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {#each users as user}
            <tr>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                {#if user.role != "admin"}
                    <td>
                        <button class="button is-small is-primary" on:click={promoteUser(user._id)}>Promote</button>
                    </td>
                {:else}
                    <td>{user.role}</td>
                {/if}

                <td>
                    <button class="button is-small is-danger" on:click={deleteUser(user._id)}>Delete</button>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>