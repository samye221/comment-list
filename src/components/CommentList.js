import React, {useEffect, useState} from 'react';
import {getList, updateList, deleteMessage} from '../services/api';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import './CommentList.css'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const MessageList = ({location, history}) => {
  const classes = useStyles();
	const [messages, setMessages] = useState([]);
	const [filter, setFilter] = useState('isPublic');
	const [isUpdated, setIsUpdated] = useState(location.otherProps && location.otherProps.isUpdated)

	useEffect(() => {
		const getData = async() => {
			// calls getList or UpdateList conditionnally according to the 'isUpdated' prop set through react-router in the Comment component
			if (isUpdated) {
				const messages = await updateList();
				if (messages && messages.length) {
					if (filter === 'isPrivate') {
						const filteredMessages = messages.filter(message => message.isPrivate === true);
						return setMessages(filteredMessages);
					}
					if (filter === 'isPublic') {
						const filteredMessages =  messages.filter(message => message.isPrivate === false);
						return setMessages(filteredMessages);				
					}
					else return setMessages(messages)
				}
				return []
			}

			if (!isUpdated) {
				const messages = await getList();
				if (messages && messages.length) {
					if (filter === 'isPrivate') {
						const filteredMessages = messages.filter(message => message.isPrivate === true);
						return setMessages(filteredMessages);
					}
					if (filter === 'isPublic') {
						const filteredMessages =  messages.filter(message => message.isPrivate === false);
						return setMessages(filteredMessages);
	
					}
					else return setMessages(messages);
				}
				return []
			}
			
		} 
		getData()
	}, [filter, isUpdated]);

	const toggleFilter = (filter) => {
		setFilter(filter);
		// setIsUpdated(false);
	}

	const redirect = () => history.push({pathname: '/newComment'})

	// calls the delete function and calls the original static fake-data 
	const handleDelete = async () => {
		deleteMessage();
		const messages = await getList();
		setMessages(messages);
		setIsUpdated(false)
	}
 
	return (
		<div className="container">
			<ButtonGroup>
				<Button color={filter === 'isPublic'? 'primary': 'default'} onClick={() => toggleFilter('isPublic')}>Public</Button>
				<Button color={filter === 'isPrivate'? 'primary': 'default'} onClick={() => toggleFilter('isPrivate')}>Private</Button>
				<Button color={filter === 'all'? 'primary': 'default'}  onClick={() => toggleFilter('all')}>All</Button>
			</ButtonGroup>
			
			<div className="messageList">
				<List className={classes.root}>
					{messages && messages.length && messages.map((message, index) => (
						<div key={`message_${index}`}>
							<ListItem>
								<div className="message">
									<div className="privacy">
										{message.isPrivate ? 'Private' : 'Public'}
									</div>
									<div>
										{message.message}
									</div>
								</div>
								
							</ListItem>
						</div>
						
					))}
					{(!messages || messages.length < 1) && (
						<div>
							No data
						</div>
					)}
				</List>
			</div>
			
			<div className="buttonGroup">
				<Button onClick={() => redirect()} variant="contained" color="primary">
					WRITE A MESSAGE
				</Button>
				{isUpdated && (
					<LightTooltip title="Delete new message">
  					<IconButton aria-label="delete" className="icon" onClick={()=> handleDelete()}>
    					<DeleteIcon color="secondary" />
  					</IconButton>
					</LightTooltip>
				)}
			</div>
		</div>
	)
} 

MessageList.displayName = "MessageList";

export default MessageList;
