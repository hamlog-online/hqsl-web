<script lang="ts">
    export let date: string;
    const parts = date.split(" ");
</script>

<span class="nowrap">{parts[0]}</span> <span class="nowrap">{parts[1]}</span>
