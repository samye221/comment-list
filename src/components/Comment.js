import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {addComment} from '../services/api';
import './Comment.css'

const Message = (props) => {
	const [values, setValues] = useState({message: '', isPrivate: false});

	const handleCommentChange = (event) => {
		const value = event.target.value;
		setValues({...values, message: value});
	}

	const handleCheckboxChange = (event) => {
		const isPrivate = event.target.checked;
		console.log('isPrivate', isPrivate)
		setValues({...values, isPrivate: isPrivate});
	}

	const redirect = () => props.history.push({pathname: '/', otherProps: {isUpdated: true}})
	const submitHandler = () => {
		addComment(values).then(() => redirect());
	} 

	return (
		<div className="container">
			<div className="topButton btn">
				<Button variant='contained' color='primary' onClick={() => props.history.push({pathname: '/'})}>BACK TO LIST</Button>
			</div>
			<div className="commentBlock">
				<TextField
					rows="20"
					id="standard-multiline-flexible"
					label="Write your message"
					multiline
					color="primary"
					value={values.message}
					name='comment'
					variant="outlined"
					onChange={handleCommentChange}
				/>
				<FormControlLabel
					control={<Checkbox color="primary" checked={values.isPrivate} onChange={handleCheckboxChange} name='isPrivate' />}
					label="Private"
					labelPlacement="start"
				/>

				<Button className="bottomButton" disabled={!values.message.length} onClick={() => submitHandler()}>SEND</Button>
			</div>
			

		</div>
		
	)
}

Message.displayName = "Comment"

export default Message