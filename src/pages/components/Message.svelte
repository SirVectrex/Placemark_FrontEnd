<script>

    export let message ="";
    export let klass = "";
    export let type = "";


</script>

<div class="notification {klass}">
    {message}
    {#if type=="loading"}
        <progress class="progress is-small is-dark" max="100">45%</progress>
    {/if}

</div>

