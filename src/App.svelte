<script>
	let faceDetected = 0;
	import FaceDetection from "./components/Face-Detection.svelte"
	import Quiz from "./components/Quiz.svelte";

		function handleDetected(e){
				faceDetected = e.detail.faceDetected;
			}
</script>

<main>
	{#if faceDetected > 0}
		<Quiz/>
	{:else}
		<FaceDetection on:detected="{handleDetected}"></FaceDetection>
	{/if}
</main>
