<script lang="ts">
    import { GridZone } from "./zone";
    import { zones } from "../geodata/geodata";

    export let grid: string | undefined;

    // Produces a list of zone values for each known zonelist.
    // This way adding new maps can happen automatically.
    function zoneLoop(g: string) {
        const zoneTable = [];
        if (g) {
            for (const zone of zones) {
                zoneTable.push({
                    z: zone,
                    v: GridZone(zone, g),
                });
            }
        }
        return zoneTable;
    }
</script>

{#if grid}
    <span class="footnote">
        <br />
        <ul class="zones">
            {#each zoneLoop(grid) as zoneInfo}
                {#if zoneInfo.v !== null}
                    <li class="nowrap"><b>{zoneInfo.z}</b>: {zoneInfo.v}</li>
                {/if}
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
