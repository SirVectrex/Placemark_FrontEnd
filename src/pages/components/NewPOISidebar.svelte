<script>
    import { push } from "svelte-spa-router";
    import {getContext, onDestroy} from "svelte";
    import {PointOnMap} from "/src/services/stores.js"
    import Select from 'svelte-select';
    import axios from "axios";

    let items = [
        {value: 'public', label: 'Public'},
        {value: 'nonpublic', label: 'Non Public'},
        {value: 'rollingshot', label: 'Rollingshot'},

    ];

    let value = {value: 'public', label: 'Public'};


    let description = "";
    let name = "";
    let category = ""
    let long = "";
    let lat = "";
    let img;

    let errorMessage;

    const placemarkservice = getContext("PlacemarkService");

    const form = document.querySelector("form");


    async function create() {

        let success = await placemarkservice.create(name, description, value.label, lat, long);
        if (success) {
            push("/");
        } else {
            errorMessage = "Error Trying to sign up";
        }

    }
    let pos;
    PointOnMap.subscribe(value => {
        try {
            long = value.lng;
            lat = value.lat;

        }
        catch (e) {
            //console.log(e);
        }


    });

</script>

<p class = "title">Create a new placemark </p>
<p>
    Please enter the needed data below and select a point by clicking on the map.
</p>

<form id="form" on:submit|preventDefault={create}>
    <div class="field">
        <label for="name" class="label">Name</label>
        <input bind:value={name} id="name" class="input" type="text" placeholder="Enter POI Name" name="name">
    </div>
    <div class="field">
        <label for="description" class="label">Description </label>
        <input bind:value={description}  id="description" class="input textarea" type="text" placeholder="Enter POI Description" name="description">
    </div>
    <div class="field">
        <label id="category"  for="category" class="label">Category</label>
        <Select {items} {value}></Select>
        <!-- <input bind:value={category} id="category" class="input" type="text" placeholder="Pick category" name="category"> -->
    </div>
    <div class="field is-horizontal">
        <div class="field-body">
            <div class="field">
                <label for="lon" class="label">Name</label>
                <input bind:value={long} id="lon" class="input" type="text" placeholder="Longitude" name="longitute">
            </div>
            <div class="field">
                <label for="lat" class="label">Last Name </label>
                <input bind:value={lat}  id="lat" class="input" type="text" placeholder="Latitude" name="latitude">
            </div>
        </div>
    </div>


    <div class="field is-grouped">
        <button class="button is-link">Create</button>
    </div>
</form>
{#if errorMessage}
    <div class="section">
        {errorMessage}
    </div>
{/if}
