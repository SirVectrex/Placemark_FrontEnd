<script>

    import Placemarktable from "./components/Placemarktable.svelte";
    import Usertable from "./components/Usertable.svelte";
    import {push} from "svelte-spa-router";
    import {onMount} from "svelte";
    import {isAdmin} from "../services/stores.js";

    let admin
    isAdmin.subscribe(value => {
        admin = value
    })

    // on mount function of svelte
    onMount(async () => {
        if(admin == false){
            push("/");
        }
    });


</script>

<div class="columns">
    <div class="column">
        First column: Chart to follow
    </div>
    <div class="column">
        Second column: Chart to follow
    </div>
    <div class="column">
        Third column: Chart to follow
    </div>
</div>
<Placemarktable/>
<Usertable/>

