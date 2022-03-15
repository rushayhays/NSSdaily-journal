import { EntryWriter } from "./journalEntryList.js";
import { getLoggedInUser, getPosts } from "./data/dataManager.js";

EntryWriter();
console.log(getLoggedInUser());
console.log(getPosts());

