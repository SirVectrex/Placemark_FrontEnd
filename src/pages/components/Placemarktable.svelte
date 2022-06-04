<script>

    import {getContext, onMount} from "svelte";

    const placemarkservice = getContext("PlacemarkService");

    let placemarks = [];
    onMount(async () => {
        placemarks = await placemarkservice.getPois();
    });

    async function clickevent(id){
        await placemarkservice.deletePOI(id)
        placemarks = await placemarkservice.getPois();
    }

</script>


<div class="table-container">
    <!-- table for all placemarks and their content-->
    <table class="table is-fullwidth is-hoverable">
        <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Altitude</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {#each placemarks as placemark}
        <tr>
            <td>{placemark.name}</td>
            <td>{placemark.description}</td>
            <td>{placemark.category}</td>
            <td>{placemark.location.coordinates[0]}</td>
            <td>{placemark.location.coordinates[1]}</td>
            <td>
                <button class="button is-small is-danger" on:click={clickevent(placemark._id)}>Delete</button>
            </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>