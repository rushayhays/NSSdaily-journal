/**/
import { getJournalEntries } from "./journalData.js";
import { JournalEntryComponent } from "./journalEntry.js";

export const EntryWriter = () => {
    const entrylog = document.querySelector(".entryList");
    /*This renders the list of objects*/
    const entries = getJournalEntries();
    let htmlJournal = "";
    for (const entry of entries) {
        htmlJournal += JournalEntryComponent(entry);
    }
    entrylog.innerHTML += `${htmlJournal}`
}
