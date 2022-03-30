/*
 *  Purpose: To render a single journal entry as an
 *           HTML representation of the data
 */
export const userJournalEntryComponent = (entry) => {
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            <div class="entryName"><h5><p>Logged By:${entry.user.name}      Date:${entry.date}</p></h5></div>
            <div><p>${entry.entry}</p></div>
            <div class="journalButtons">
                <div class="editBtn"><button id="edit--${entry.id}" type="button" >Edit</button></div>
                <div class="deleteBtn"><button id="delete--${entry.id}" type="button" >Delete</button></div>
            </div>
        </section>
    `
}

export const JournalEntryComponent = (entry) => {
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            <div class="entryName"><h5><p>Logged By:${entry.user.name}      Date:${entry.date}</p></h5></div>
            <div><p>${entry.entry}</p></div>
        </section>
    `
}

