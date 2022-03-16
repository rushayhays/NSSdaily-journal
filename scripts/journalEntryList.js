/**/
// import { getJournalEntries } from "./journalData.js";
import { JournalEntryComponent } from "./journalEntry.js";


//This was from when the code referenced a non api database
// export const EntryWriter = () => {
//     const entrylog = document.querySelector(".entryList");
//     /*This renders the list of objects*/
//     const entries = getJournalEntries();
//     let htmlJournal = "";
//     for (const entry of entries) {
//         htmlJournal += JournalEntryComponent(entry);
//     }
//     entrylog.innerHTML += `${htmlJournal}`
// }

export const EntryList = ((allEntries) => {
	let entryHTML = "";
		//Loop over the array of posts and for each one, invoke the Post component which returns HTML representation
		for (const entryObject of allEntries) {
			//what is a entryObject?
			entryHTML += JournalEntryComponent(entryObject)
		}
		return entryHTML;
	
})