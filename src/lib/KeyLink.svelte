<script lang="ts">
    import { getContext } from "svelte";
    export let fp: string;
    export let uid: string;
    const keyserver = (getContext("keyservers") as string[])[0];
</script>

<a href={`${keyserver}/pks/lookup?search=0x${fp}&fingerprint=on&op=index`}
    >{uid}</a
>
