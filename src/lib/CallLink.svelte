<script lang="ts">
    import { getContext } from "svelte";
    export let call: string | undefined;
    const callbook: string = getContext("callbook");
</script>

<a href="{callbook}{call}">{call}</a>
