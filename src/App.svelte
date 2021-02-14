<script>
	import {faceDetected} from './store/FaceDetectionStore.js';

	import FaceDetection from "./components/Face-Detection.svelte"
	import Quiz from "./components/Quiz.svelte";

</script>

<main>
	{#if $faceDetected > 0}
		<Quiz/>
	{:else}
		<FaceDetection />
	{/if}
</main>
