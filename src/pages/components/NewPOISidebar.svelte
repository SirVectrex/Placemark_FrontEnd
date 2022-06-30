<script>
    import { push } from "svelte-spa-router";
    import {getContext} from "svelte";
    import {PointOnMap, newPOI, reloadMap} from "/src/services/stores.js"
    import Select from 'svelte-select';
    import Message from "./Message.svelte";

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
    let filename;
    $: currentstate = null;

    let errorMessage;

    $: message = {
        type: "",
        message: "",
        show: false
    }

    const placemarkservice = getContext("PlacemarkService");
    let category = {value: 'public', label: 'Public'};

    function handleSelect(event) {
        category = event.detail;

    }

    const form = document.querySelector("form");

    function cancel() {
        newPOI.set(false)
    }

    let curr;
    // get value of store
    reloadMap.subscribe( (value) => {
        curr = value;
    });

    async function create() {
        let success = await placemarkservice.create(name, description, category.label, lat, long)
        if (success.status == "success") {
            await uploadImage(success.newid)
            cancel()
            reloadMap.set(!curr);

            /*
            message.type = "is-primary";
            message.message = "Successfully created";
            message.show = true;
             */
        } else if (success.status == "error") {
            message.type = "is-danger";
            message.message = "Error creating";
            message.show = true;
        }
        else {
            errorMessage = success.message;
            message.type = "is-danger";
            message.message =  success.message
            message.show = true;
        }

    }

    let files = null;
    async function uploadImage(newID){
        // check if file size > 5 MB
        if(files == null )
            return;
        if(files[0].size > 5000000) {
            currentstate = {
                message: "Image is too big.",
                klass: "is-danger is-light",
                type: "error",
                show: true
            }
            return;
        }

        try {
            currentstate = {
                message: "Currently uploading image...",
                klass: "is-warning is-light",
                type: "loading",
                show: true
            }
            let formData = new FormData();
            formData.append("image", files[0]);
            let success = await placemarkservice.addImage(newID, formData)
            currentstate = {
                message: "Image uploaded",
                klass: "is-success is-light",
                type: "success",
                show: true
            }
        } catch (error) {
            currentstate = {
                message: "Error uploading image",
                klass: "is-danger is-light",
                type: "error",
                show: true
            }
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

    function updateFilename(){
        // wait for 1s
        setTimeout(() => {
            console.log(files);

            filename = files[0].name;
        }, 100);
    }

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
        <textarea bind:value={description}  id="description" class="textarea" type="textarea" placeholder="Enter POI Description" name="description"></textarea>
    </div>
    <div class="field">
        <label id="category"  for="category" class="label">Category</label>
        <Select {items} {value} on:select={handleSelect} ></Select>
        <!-- <input bind:value={category} id="category" class="input" type="text" placeholder="Pick category" name="category"> -->
    </div>
    <div class="field is-horizontal">
        <div class="field-body">
            <div class="field">
                <label for="lon" class="label">Lon.</label>
                <input bind:value={long} id="lon" class="input" type="text" placeholder="Longitude" name="longitute">
            </div>
            <div class="field">
                <label for="lat" class="label">Lat. </label>
                <input bind:value={lat}  id="lat" class="input" type="text" placeholder="Latitude" name="latitude">
            </div>
        </div>
    </div>

    Upload an image too!
    <div class="">
        <form on:submit|preventDefault>
            <div id="file-select" class="file has-name is-fullwidth">
                <label class="file-label ">
                    <input class="file-input" on:change={updateFilename} name="imagefile" bind:files id="imagefile" type="file" accept="image/png, image/jpeg">
                    <span class="file-cta ">
                         <span class="file-icon">
                           <i class="fas fa-upload "></i>
                         </span>
                         <span class="file-label">
                           Choose a file…
                         </span>
                        </span>
                </label>
            </div>
        </form>

        <span class="">You have selected: <br> {filename}</span>

    </div>
    <span class="">Maximum Size: 5 MB</span>

    {#if currentstate != null || currentstate != undefined}
        <Message message={currentstate.message} klass={currentstate.klass} type={currentstate.type}/>
    {/if}

    <div class="field is-grouped">
        <button class="button is-link">Create</button>
    </div>
</form>
{#if message.show}

    <div class="box {message.type}">
        {message.message}
    </div>
{/if}
