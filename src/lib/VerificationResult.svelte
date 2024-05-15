<script lang="ts">
    import { HQSLState, type HQSLVerification } from "hqsl-ts";

    import KeyLink from "./KeyLink.svelte";

    export let result: HQSLVerification;
    let certifierName: string;
    let certifierFingerprint: string;
    let signerFingerprint: string;
    let signerName: string;

    const getKeyData = async () => {
        if (result.certifierKey) {
            certifierName =
                (await result.certifierKey?.getPrimaryUser()).user.userID
                    ?.userID || "";
            certifierFingerprint = result.certifierKey.getFingerprint();
        }
        if (result.signerKey) {
            signerName =
                (await result.signerKey.getPrimaryUser()).user.userID?.userID ||
                "";
            signerFingerprint = result.signerKey.getFingerprint();
        }
    };

    $: if (result) {
        getKeyData();
    }
</script>

{#if result.verdict == HQSLState.Valid}
    <p class="text-success">
        Signed by:<br /><span class="font-monospace"
            ><KeyLink fp={signerFingerprint} uid={signerName} /></span
        ><br />
        Certified by: <br /><span class="font-monospace"
            ><KeyLink fp={certifierFingerprint} uid={certifierName} /></span
        >
    </p>
{:else if result.verdict == HQSLState.NotSigned}
    <p class="text-info">This HQSL is not signed.</p>
{:else if result.verdict == HQSLState.Invalid}
    <p class="text-danger">
        Signature could not be verified:<br />
        The QSL data was altered after signing or signature was made incorrectly.
    </p>
{:else if result.verdict == HQSLState.KeyNotFound}
    <p class="text-warning">
        Signature could not be verified:<br />
        Signer key not available.
    </p>
{:else if result.verdict == HQSLState.KeyNotCertified}
    <p class="text-warning">
        Signed by:<br /><span class="font-monospace"
            ><KeyLink fp={signerFingerprint} uid={signerName} /></span
        >.
        <br />
        This key is not certified for this callsign and QSO time.
    </p>
{/if}
