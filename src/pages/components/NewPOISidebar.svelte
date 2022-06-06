<script>
    import { push } from "svelte-spa-router";
    import {getContext} from "svelte";
    import {PointOnMap,  newPOI} from "/src/services/stores.js"
    import Select from 'svelte-select';

    let items = [
        {value: 'public', label: 'Public'},
        {value: 'nonpublic', label: 'Non Public'},
        {value: 'rollingshot', label: 'Rollingshot'},

    ];

    let value = {value: 'public', label: 'Public'};


    let description = "";
    let name = "";
    let long = "";
    let lat = "";
    let img;

    let errorMessage;

    const placemarkservice = getContext("PlacemarkService");
    let category = undefined;

    function handleSelect(event) {
        category = event.detail;

    }

    const form = document.querySelector("form");

    function cancel() {
        newPOI.set(false)
    }

    async function create() {
        let success = await placemarkservice.create(name, description, category.label, lat, long);
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

<div>
    <h1 class="is-inline title is-5">Share a new spot!</h1> <button class="is-inline is-pulled-right" on:click|once={cancel}><i class="fa fa-times" aria-hidden="true" style="font-size:30px;"></i></button>
</div>
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
        <Select {items} {value} on:select={handleSelect} ></Select>
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
