import { EntryList, userEntryList } from "./journalEntryList.js";
import { getLoggedInUser, getPosts, getSinglePost, updatePost, logoutUser, setLoggedInUser, loginUser, registerUser } from "./data/dataManager.js";
import { createPost, deletePost } from "./data/dataManager.js";
import { JournalEditField } from "./journalEdit.js"
import { JournalEntryBoxWriter } from "./journalEntryBox.js";
import { header } from "./header/header.js"
import { LoginForm } from "./auth/LoginForm.js"
import { RegisterForm } from "./auth/RegisterForm.js"
import { resetMain } from "./setMain.js"




const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".entryList");
	const archiveElement = document.querySelector(".sideGraphicBox")
	let currentUser = JSON.parse(sessionStorage.getItem("user"))
	
	getPosts().then((allPosts) => {
		let userPosts= []
		for(let post of allPosts){
			if(post.userId === currentUser.id){
				userPosts.push(post)
			}

		}
		postElement.innerHTML = userEntryList(userPosts);
		archiveElement.innerHTML = EntryList(allPosts);
	})
}


const startDailyJournal = () => {
	header();
	JournalEntryBoxWriter();
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
	mood: "",
	userId: 1
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
		let user = JSON.parse(sessionStorage.getItem("user"))
		console.log(user.name)
		console.log(user.id)
		journalEntryInProgress.userId = user.id;
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
			startDailyJournal();

		})
	
	}
})

//Now we build in the ability to register/login multiple users

//first you need to be able to log out
applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
	  logoutUser();
	  console.log(getLoggedInUser());
	  sessionStorage.clear();
	  checkForUser();
	}
  })

//If no one is logged in show the Login/Register Forms
const showLoginRegister = () => {
	header();
	const entryElement = document.querySelector(".journalEntryBox");
	//template strings can be used here too
	entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
	//make sure the post list is cleared out too
const postElement = document.querySelector(".journalListBox");
postElement.innerHTML = "";
}

//You need to know if a user is logged in
const checkForUser = () => {
	if (sessionStorage.getItem("user")){
		setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
		startDailyJournal();
	}else {
		 showLoginRegister();
	}
}

//calling this here instead of startDailyJournal on line 27
checkForUser();

//Now that you can log out you need to be able to log in
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "login__submit") {
	  //collect all the details into an object
	  const userObject = {
		name: document.querySelector("input[name='name']").value,
		email: document.querySelector("input[name='email']").value
	  }
	  loginUser(userObject)
	  .then(dbUserObj => {
		if(dbUserObj){
		  sessionStorage.setItem("user", JSON.stringify(dbUserObj));
		  resetMain();
		  startDailyJournal();
		}else {
		  //got a false value - no user
		  const entryElement = document.querySelector(".sideGraphicBox");
		  entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p>;`
		  //this resets the entry forms
		  const entryElementRL = document.querySelector(".journalEntryBox");
		  entryElementRL.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
		
		}
	  })
	}
})

//This will allow a new user to register
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "register__submit") {
	  //collect all the details into an object
	  const userObject = {
		name: document.querySelector("input[name='registerName']").value,
		email: document.querySelector("input[name='registerEmail']").value
	  }
	  registerUser(userObject)
	  .then(dbUserObj => {
		sessionStorage.setItem("user", JSON.stringify(dbUserObj));
		resetMain();
		startDailyJournal();
	  })
	}
})