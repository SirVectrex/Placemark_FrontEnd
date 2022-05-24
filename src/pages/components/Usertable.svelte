<script>

    import {getContext, onMount} from "svelte";

    const placemarkservice = getContext("PlacemarkService");

    let users = [];
    onMount(async () => {
        users = await placemarkservice.getAllUsers();
    });

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
                <td>{user.role}</td>
                <td>
                    <button class="button is-small is-danger" onclick="placemarkservice.deleteUser(user._id)">Delete</button>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>