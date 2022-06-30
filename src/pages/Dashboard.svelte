<script>

    import Placemarktable from "./components/Placemarktable.svelte";
    import Usertable from "./components/Usertable.svelte";
    import Analytics from "./components/Analytics-charts.svelte";
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
            await push("/");
        }
    });


</script>

<Analytics/>
<Placemarktable/>
<Usertable/>

