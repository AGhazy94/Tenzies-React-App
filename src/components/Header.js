import React from 'react';
import classes from './Header.module.css';

const Header = (props) => {
	return (
		<div className={classes.container}>
			<div className={classes.counter}>
				<p className={classes.rollCounter}>
					<span>{props.rollCount}</span>{' '}
					{props.rollCount === 1 ? 'Roll' : 'Rolls'}
				</p>
			</div>
			<h1>Tenzies</h1>
			<p>
				Roll until all dice are the same. Click each die to freeze it at its
				current value between rolls.
			</p>
		</div>
	);
};

export default Header;
