<script>

    import Chart from 'svelte-frappe-charts';
    import {getContext, onDestroy, onMount} from "svelte";
    const placemarkservice = getContext("PlacemarkService");

/*
received data = "categoryAmount": [
    {
      "_id": "Garage",
      "count": 1
    },
    {
      "_id": "Night, Day",
      "count": 1
    },
    {
      "_id": "Public",
      "count": 2
    },


 */

    onMount(async () => {
        const rawdata = await placemarkservice.getCategoryStats();
        // console.log(rawdata.categoryAmount);
        // map received data to category_data
        category_data = {
            labels: [],
            datasets: [
                {
                    values: []
                }
            ]
        };
        rawdata.categoryAmount.forEach(category => {
            category_data.labels.push(category._id)
            category_data.datasets[0].values.push(category.count);
        })
        // console.log(category_data);



    });

    let category_data;



</script>

<div class="columns">
    <div class="column">
        <Chart data={category_data} type="pie" />
    </div>
    <div class="column">
        Second column: Chart to follow
    </div>
    <div class="column">
        Third column: Chart to follow
    </div>
</div>