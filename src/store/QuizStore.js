import {writable, readable, derived} from 'svelte/store';
import {startTimer, quizTime, minutesToSeconds, QUIZ_TIME} from './TimerStore.js';

function getStoreValue(store){
	let $val
	store.subscribe($ => $val = $);
	return $val
}

export const questions = readable([
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
	]);

export let value_questions = getStoreValue(questions);

export let answers = writable(new Array(value_questions.length).fill(null));
export let currPosition = writable(-1);

export function startQuiz(){
		currPosition.set(0);
		startTimer();
	}
let value_answers = getStoreValue(answers);

export function getScore(){
	let score = value_answers.reduce((total, val, index) => {
			if(value_questions[index].correctIndex == val)
				return total+1;
			return total;
		},0);

	return `${score/value_questions.length*100}%`;
}

export function restartQuiz(){
	reset();
	currPosition.set(0);
	startTimer();
}

export function backToMenu(){
	reset();
	currPosition.set(-1);
}

function reset(){
	value_questions = getStoreValue(questions);
	answers.set(new Array(value_questions.length).fill(null));
	value_answers = getStoreValue(answers);
	quizTime.set(minutesToSeconds(QUIZ_TIME));
}

