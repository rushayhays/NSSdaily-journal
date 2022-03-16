import { EntryList } from "./journalEntryList.js";
import { getLoggedInUser, getPosts } from "./data/dataManager.js";

// EntryList();
console.log(getLoggedInUser());
console.log(getPosts());

const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".entryList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = EntryList(allPosts);
	})
}


const startGiffyGram = () => {
	showPostList();
}

startGiffyGram();