import { EntryList } from "./journalEntryList.js";
import { getLoggedInUser, getPosts, getSinglePost, updatePost } from "./data/dataManager.js";
import { createPost, deletePost } from "./data/dataManager.js";
import { JournalEditField } from "./journalEdit.js"

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
		journalEntryInProgress.date = event.target.value;
	}
})

//This detects a change in mood
applicationElement.addEventListener("change", (event) => {
	
	if (event.target.id === "moodButton"){
		journalEntryInProgress.mood=event.target.value;
	}
})

//This keeps track of the textarea
applicationElement.addEventListener("keyup", (event) => {
	
	if (event.target.id === "textareaID"){
		journalEntryInProgress.entry = event.target.value
	}
})

//This updates the subject
applicationElement.addEventListener("keyup", (event) => {
	
	if (event.target.id === "subject"){
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

//Record button, posts a new entry to the local database and reloads the entry list
applicationElement.addEventListener("click", (event) => {
	
	if (event.target.id === "record"){
		createPost(journalEntryInProgress).then(showPostList)
		clearJournalEntryArea()
	}
})


//This allows you to delete a Post
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

//This controls the edit features
const showEdit = (postObj) => {
	const entryElement = document.querySelector(".journalEntryBox");
	entryElement.innerHTML = JournalEditField(postObj);
}
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("edit")) {
	  const postId = event.target.id.split("--")[1];
	  getSinglePost(postId)
		.then(response => {
		  showEdit(response);
		})
	}
})


//This area grabs the info entered into the DOM, shoves it into an object and uses that
//object to update the database
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id.startsWith("updatePost")) {
	  const postId = event.target.id.split("__")[1];
	  //collect all the details into an object
	  const date = document.querySelector("#journalDate").value
	  const  concept= document.querySelector("#subject").value
	  const entry = document.querySelector("#textareaID").value
	  const mood = document.querySelector("#moodButton").value
	  
	  const postObject = {
		date: date,
		concept: concept,
		entry: entry,
		mood:mood,
		id:postId
	  }
	  
	  updatePost(postObject)
		.then(response => {
		  showPostList();
		})
		clearJournalEntryArea();
	}
})

