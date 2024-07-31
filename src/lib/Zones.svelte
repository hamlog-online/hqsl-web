<script lang="ts">
    import { GridZone } from "./zone";
    import { zones } from "../geodata/geodata";

    export let grid;
</script>

{#if grid}
    <span class="footnote">
        <br />
        <ul class="zones">
            {#each zones as zone}
                <li class="nowrap"><b>{zone}</b>: {GridZone(zone, grid)}</li>
            {/each}
        </ul>
    </span>
{/if}

<style lang="scss">
    .zones {
        padding-left: 0;
        display: inline;
        list-style: none;
        li {
            display: inline;
            
        }
        li:after {
            content: ", ";
        }
        li:last-child:after {
            content: "";
        }
    }

    .footnote {
        font-size: 75%;
    }
</style>
