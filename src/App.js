import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import classes from './App.module.css';
import Die from './components/Die';
import Roll from './components/Roll';
import Header from './components/Header';

const App = () => {
	const [allDice, setAllDice] = useState(diceGenerator);
	const [tenzies, setTenzies] = useState(false);
	const [rollsCounter, setRollsCounter] = useState(0);
	const [time, setTime] = useState({ mins: 0, secs: 0, total: 0 });
	const [bestTime, setBestTime] = useState(
		JSON.parse(localStorage.getItem('bestTime'))
	);

	// Time counter
	let updatedSecs = time.secs;
	let updatedMins = time.mins;
	let totalTime = time.total;
	let timer;

	const run = () => {
		if (updatedSecs === 60) {
			updatedMins++;
			updatedSecs = 0;
		}
		updatedSecs++;
		totalTime++;
		return setTime((prevState) => ({
			...prevState,
			secs: updatedSecs,
			mins: updatedMins,
			total: totalTime,
		}));
	};

	// Win condition
	useEffect(() => {
		timer = setInterval(run, 1000);
		const allHeld = allDice.every((die) => die.isHeld);
		const allSameValue = allDice.every((die) => die.value === allDice[0].value);

		if (allHeld && allSameValue) {
			
			// Getting best time score & set the lowest value in LocalStorage
			if (bestTime.total === undefined) {
				setBestTime(localStorage.setItem('bestTime', JSON.stringify(time)));
			} else if (time.total < +bestTime.total) {
				setBestTime(localStorage.setItem('bestTime', JSON.stringify(time)));
			}
			// Pause Time and display winning
			setTenzies(true);
			clearInterval(timer);
		}

		return () => {
			clearInterval(timer);
		};
	}, [allDice]);
	// Generating an array with 10 random numbers between 1 ~ 6
	function diceGenerator() {
		let dice = [];
		while (dice.length < 10) {
			dice.push({
				value: Math.floor(Math.random() * 6) + 1,
				isHeld: false,
				id: nanoid(),
			});
		}
		return dice;
	}

	// Changing held value if selected
	function holdHandler(id) {
		setAllDice((prevState) => {
			return prevState.map((die) => {
				return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
			});
		});
	}

	// Rerolling and restarting game
	const rerollHandler = () => {
		if (tenzies) {
			// Resetting the game
			setTenzies(false);
			setAllDice(diceGenerator);
			setRollsCounter(0);
			setTime({ secs: 0, mins: 0, total: 0 });
			setBestTime(JSON.parse(localStorage.getItem('bestTime')));
		} else {
			setAllDice((prevState) =>
				prevState.map((die) =>
					die.isHeld
						? die
						: {
								value: Math.floor(Math.random() * 6) + 1,
								isHeld: false,
								id: nanoid(),
						  }
				)
			);
			setRollsCounter((prevState) => prevState + 1);
		}
	};

	// Rendering Dice
	const randomDice = allDice.map((die) => (
		<Die
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			holdDiceHandler={() => holdHandler(die.id)}
		/>
	));

	return (
		<main className={classes.container}>
			{tenzies && <Confetti />}
			<div className={classes.game}>
				<Header
					rollCount={rollsCounter}
					mins={time.mins}
					secs={time.secs}
					bestTime={bestTime}
				/>
				<div className={classes.dice__wrapper}>{randomDice}</div>
				<Roll reroll={rerollHandler} value={tenzies ? 'New Game' : 'Roll'} />
			</div>
		</main>
	);
};

export default App;
