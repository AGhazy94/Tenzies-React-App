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


	// Win condition
	useEffect(() => {
		const allHeld = allDice.every((die) => die.isHeld);
		const allSameValue = allDice.every((die) => die.value === allDice[0].value);
		allHeld && allSameValue && setTenzies(true);
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
			setTenzies(false);
			setAllDice(diceGenerator);
			setRollsCounter(0);
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
				<Header rollCount={rollsCounter}/>
				<div className={classes.dice__wrapper}>{randomDice}</div>
				<Roll reroll={rerollHandler} value={tenzies ? 'New Game' : 'Roll'} />
			</div>
		</main>
	);
};

export default App;
