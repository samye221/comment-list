// fetched data from a fake-data json file and logs an error if it fails. 
export const getList = () => {
    return fetch('./fake-data.json', {mode: 'no-cors'})
		 .then(async response => {
			 if (response.ok) {
				const data = await response.json();
				
				return data;
			 }
		 }).catch(err => console.log(err))
}

// adds the original fetched list and the created comment to the localStorage. 
export const addComment = async (comment) => {
	const originalList = await getList();
	return localStorage.setItem('newComment', JSON.stringify([...originalList, comment]));
} 

// when called, returns the list from the localStorage instead of the original static list
export const updateList = async() => {
	const updatedList = await JSON.parse(localStorage.getItem('newComment'));
	return updatedList
}

//deletes created message from the localStorage
export const deleteMessage = () => {
	console.log('delete')
	localStorage.clear()
} 