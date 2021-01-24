<script>
		let questions = [
				 {
						"question":"Who is the inventor of C Language?",
						"options":[
							 "Rasmus Lerdorf",
							 "James Gosling",
							 "Dennis Ritchie",
							 "Grace Hopper"
						],
						"correctIndex":2
				 },
				 {
						"question":"Who is the father of PHP?",
						"options":[
							 "Rasmus Lerdorf",
							 "James Gosling",
							 "Dennis Ritchie",
							 "Grace Hopper"
						],
						"correctIndex":0
				 },
				 {
						"question":"Who created Linux?",
						"options":[
							 "Steve Jobs",
							 "Bill Gates",
							 "Mark Zuckerberg",
							 "Linus Torvalds"
						],
						"correctIndex":3
				 },
				 {
						"question":"Who is the founder of Amazon?",
						"options":[
							 "Steve Jobs",
							 "Elon Musk",
							 "Jack Ma",
							 "Jeff Bezos"
						],
						"correctIndex":3
				 },
				 {
						"question":"Who is the founder of Alibaba?",
						"options":[
							 "Steve Jobs",
							 "Elon Musk",
							 "Jack Ma",
							 "Jeff Bezos"
						],
						"correctIndex":2
				 }
			];
			let answers = new Array(questions.length).fill(null);
			let currPosition = -1;

			function getScore(){
					let score = answers.reduce((total, val, index) => {
							if(questions[index].correctIndex == val)
								return total+1;
							return total;
						},0);

					return `${score/questions.length*100}%`;
				}

			function restartQuiz(){
				answers = new Array(questions.length).fill(null);
				currPosition = 0;
			}

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

</style>

<div class="quiz">
	{#if currPosition == -1}
		<div class="menu">
			<button on:click={() => currPosition = 0}>Start Quiz</button>
		</div>
	{:else if (currPosition < answers.length)}
		<div class="attempt">
			<div class="items">
				<div class="question">
					<h2>
						{questions[currPosition].question}
					</h2>
				</div>

				<div class="options">
					{#each questions[currPosition].options as choices, index}
						<button class="{answers[currPosition]==index ? 'selected' : ''}" on:click={() => answers[currPosition]=index}>
							{choices}
						</button>
					{/each}
				</div>
			</div>

			<div class="footer">
				<div class="progress-bar">
					<div style="width:{currPosition/questions.length*100}%"></div>
				</div>

				<div class="item-control">
					<button disabled={currPosition==0} on:click={() => currPosition--}>&lt;</button>
					<button on:click={() => currPosition++}>&gt;</button>
				</div>
			</div>
		</div>
	{:else}
		<div class="scoreboard">
			<h1>
				Your Score: {getScore()}
			</h1>
			<button on:click={() => restartQuiz()}>Restart Quiz</button>
		</div>
	{/if}
</div>
