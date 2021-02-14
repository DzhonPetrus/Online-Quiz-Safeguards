<script>
	import {activityLog} from '../store/ActivityLogStore.js';
</script>

{#if $activityLog.length > 0}
	{#each $activityLog as log}
		{log.event}
		<br>

		{log.description}
		<br>

	{/each}
{/if}
