import React from 'react';
import classes from './Header.module.css';

const Header = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.container__bestScore}>
				<p>
					Best Score:{' '}
					{props.bestTime ? (
						<span>
							{props.bestTime.mins}:{props.bestTime.secs}
						</span>
					) : (
						''
					)}
				</p>
			</div>
			<div className={classes.counter}>
				<p className={classes.rollCounter}>
					<span>{props.rollCount}</span>{' '}
					{props.rollCount === 1 ? 'Roll' : 'Rolls'}
				</p>
				<p className={classes.counter__timer}>
					{props.mins < 10 ? `0${props.mins}` : props.mins}:
					{props.secs < 10 ? `0${props.secs}` : props.secs}
				</p>
			</div>

			<div>
				<h1 className={classes.lead}>Tenzies</h1>
				<p>
					Roll until all dice are the same. Click each die to freeze it at its
					current value between rolls.
				</p>
			</div>
		</div>
	);
};

export default Header;
