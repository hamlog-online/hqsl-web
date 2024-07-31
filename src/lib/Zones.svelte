<script lang="ts">
    import { GridZone } from "./zone";
    import { zones } from "../geodata/geodata";

    export let grid: string | undefined;

    // Produces a list of zone values for each known zonelist.
    // This way adding new maps can happen automatically.
    function zoneLoop(g: string) {
        const zoneTable = [];
        if (g) {
            for (const zoneList of zones) {
                const zoneName = GridZone(zoneList, g);
                if (zoneName !== null) {
                    zoneTable.push({
                        l: zoneList,
                        n: zoneName,
                        c: true,
                    });
                }
            }
        }
        // This is a silly way to pre-compute commas.
        zoneTable[zoneTable.length - 1].c = false;

        return zoneTable;
    }
</script>

{#if grid}
    <span class="footnote">
        <br />
        {#each zoneLoop(grid) as zoneInfo}
            <span class="nowrap">
                <b>{zoneInfo.l}</b>: {zoneInfo.n}{zoneInfo.c ? "," : ""}
            </span>
            {zoneInfo.c ? " " : ""}
        {/each}
    </span>
{/if}

<style lang="scss">
    .footnote {
        font-size: 75%;
    }
</style>
