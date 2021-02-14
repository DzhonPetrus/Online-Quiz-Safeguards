<script>
	import {faceDetected} from '../store/FaceDetectionStore.js';

	let video;
	function startVideo(){
			console.log(video);

			navigator.getUserMedia(
					{ video : {} },
					stream => (video.srcObject = stream),
					err => console.error(err)
				)
		}

		Promise.all([
				faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
				faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
				faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
				faceapi.nets.faceExpressionNet.loadFromUri("/models"),
			]).then(startVideo);


		function faceDetection(){
				let interval = setInterval(async () => {
						const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
						$faceDetected = detections.length;
				if ($faceDetected > 0){
						clearInterval(interval);
					}
						console.log($faceDetected);
					}, 500);

			}

</script>


<style>
	.face-detection {
		margin:0;
		padding:0;
		width:100vw;
		height:100vh;
		display:flex;
		justify-content:center;
		align-items:center;
	}

</style>


<div class="face-detection">
	<video id="video" width="720" height="560" autoplay muted bind:this="{video}" on:play="{faceDetection()}"></video>
</div>
