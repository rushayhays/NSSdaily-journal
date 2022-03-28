import { EntryList } from "./journalEntryList.js";
import { getLoggedInUser, getPosts } from "./data/dataManager.js";
import { createPost, deletePost } from "./data/dataManager.js";

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


const startDailyJournal = () => {
	showPostList();
}

startDailyJournal();

const applicationElement = document.querySelector(".daily-journal")


//This listens for Edits
applicationElement.addEventListener("click", (event) => {
	
	if (event.target.id.startsWith("edit")){
		console.log("edit button clicked", event.target.id.split("--"))
		console.log("the id is", event.target.id.split("--")[1])
	}
})

//This listens for deletes
applicationElement.addEventListener("click", (event) => {
	
	if (event.target.id.startsWith("delete")){
		console.log("delete button clicked", event.target.id.split("--"))
		console.log("the id is", event.target.id.split("--")[1])
	}
})

let journalEntryInProgress = {
	date: "",
	concept: "",
	entry: "",
	mood: ""
};

//This detects a change in date
applicationElement.addEventListener("change", (event) => {
	
	if (event.target.id === "journalDate"){
		console.log(event.target.value)
		journalEntryInProgress.date = event.target.value;
	}
})

//This detects a change in mood
applicationElement.addEventListener("change", (event) => {
	
	if (event.target.id === "moodButton"){
		console.log(event.target.value)
		journalEntryInProgress.mood=event.target.value;
	}
})

//This keeps track of the textarea
applicationElement.addEventListener("keyup", (event) => {
	
	if (event.target.id === "textareaID"){
		console.log(event.target.value)
		journalEntryInProgress.entry = event.target.value
	}
})

applicationElement.addEventListener("keyup", (event) => {
	
	if (event.target.id === "subject"){
		console.log(event.target.value)
		journalEntryInProgress.concept = event.target.value;
	}
})

// This clears the journal entry area
const clearJournalEntryArea = () => {
	let textArea = document.querySelector("#textareaID")
	let subjectArea = document.querySelector("#subject")
	let moodArea = document.querySelector("#moodButton")
	let dateArea = document.querySelector("#journalDate")
	textArea.value = "";
	subjectArea.value = "";
	moodArea.value = "";
	dateArea.value = "";
}

//This notes if thr record button was pushed
applicationElement.addEventListener("click", (event) => {
	
	if (event.target.id === "record"){
		console.log("Recorded")
		createPost(journalEntryInProgress).then(showPostList)
		clearJournalEntryArea()
	}
})

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("delete")) {
	  const postId = event.target.id.split("--")[1];
	  deletePost(postId)
		.then(response => {
		  showPostList();
		})
	}
  })