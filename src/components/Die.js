import React from 'react';
import classes from './Die.module.css';
import { nanoid } from 'nanoid';


const Die = (props) => {
	const changeBgIfHeld = {
		backgroundColor: props.isHeld ? '#59E391' : '#fff',
	};

	// Render pips depending on die value
	const diceFace = () => {
		let faces = [];
		for (let i = 0; i < props.value; i++) {
			faces.push(`face${props.value}`);
		}
		return faces.map(() => <span className={classes.pip} key={nanoid()}></span>);
	};

	return (
		<div
			className={`${classes['die']}`}
			style={changeBgIfHeld}
			onClick={props.holdDiceHandler}
		>
			<div className={`${classes['die__face']} ${classes[`die__face-${props.value}`]}`}>
				{/* <h2>{props.value}</h2> */}
				{diceFace()}
			</div>
		</div>
	);
};

export default Die;
