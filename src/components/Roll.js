import React from 'react';
import classes from './Roll.module.css';

const Roll = (props) => {
	return (
		<button className={classes.btn} onClick={(e) => props.reroll(e)}>
			{props.value}
		</button>
	);
};

export default Roll;
