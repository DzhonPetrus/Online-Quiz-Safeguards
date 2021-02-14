<script>
	/* STORES */
	import {faceDetected} from '../store/FaceDetectionStore.js';
	import {pushLog, getDateTime} from '../store/ActivityLogStore.js';
	import { currPosition, questions, answers, startQuiz, getScore, restartQuiz, backToMenu } from '../store/QuizStore.js';

		/* COMPONENTS */
	import ActivityLog from './ActivityLog.svelte';
	import Timer from './Timer.svelte';

	/* ACTIVITY LOG */
	window.onfocus = () =>  pushLog("Focused",`User refocused on the window at ${getDateTime()}`, getDateTime());
	window.onblur = () =>  pushLog("Defocused",`User left the window at ${getDateTime()}`, getDateTime());

</script>

<style>
	.quiz {
		position: absolute;
		top:0px;
		left:0px;
		width	:100vw;
		height:100vh;
		overflow:hidden;
	}
	.quiz > div {
		height:100vh;
	}
	.quiz .scoreboard ,
	.quiz .menu {
		display:flex;
		justify-content:center;
		align-items: center;
	}
	.quiz .scoreboard button ,
	.quiz .menu button {
		padding: 25px 20px;
		cursor: pointer;
	}

	.quiz .attempt {
		padding: 50px;
	}

	.quiz .attempt .options {
		display:flex;
		justify-content: space-between;
		flex-wrap:wrap;
	}

	.quiz .attempt .options button {
		width: 45%;
		cursor: pointer;
		margin:10px 0px;
	}
	.quiz .attempt .options button.selected {
		background:#111;
		color:#eee;
	}

	.quiz .attempt .footer {
		position:fixed;
		bottom:50px;
		left:0px;
		width:95%;
		height:50px;
		display:flex;
		justify-content: space-between;
		align-items:center;
	}

	.quiz .attempt .footer {
		margin:0px 10px;
	}

	.quiz .attempt .footer .progress-bar {
		width:200px;
		height:15px;
		background:#aaa;
		overflow:hidden;
	}

	.quiz .attempt .footer .progress-bar div {
		height:100%;
		background:#111;
	}

	.quiz .scoreboard {
		flex-direction:column;
	}
	.quiz .scoreboard h1 {
		margin-bottom:10px;
	}

</style>


<ActivityLog ></ActivityLog>



<div class="quiz">
	{#if $currPosition == -1}
		<div class="menu">
			<button on:click={() => startQuiz()} disabled={!$faceDetected}>Start Quiz</button>
		</div>
	{:else if ($currPosition < $answers.length)}
		<div class="attempt">
			<div class="items">
				<div class="question">
					<h2>
						{$questions[$currPosition].question}
					</h2>
				</div>

				<div class="options">
					{#each $questions[$currPosition].options as choices, index}
						<button class="{$answers[$currPosition]==index ? 'selected' : ''}" on:click={() => $answers[$currPosition]=index}>
							{choices}
						</button>
					{/each}
				</div>
			</div>

			<div class="footer">
				<div class="progress-bar">
					<div style="width:{$currPosition/$questions.length*100}%"></div>
				</div>

				<Timer></Timer>

				<div class="item-control">
					<button disabled={$currPosition==0} on:click={() => currPosition.update(n=>n-1) }>&lt;</button>
					<button on:click={() => currPosition.update(n=>n+1)}>&gt;</button>
				</div>
			</div>
		</div>
	{:else}
		<div class="scoreboard">
			<h1>
				Your Score: {getScore()}
			</h1>
			<button on:click={() => restartQuiz()}>Restart Quiz</button>
			<button on:click={() => backToMenu()}>Back to menu</button>
		</div>
	{/if}
</div>
