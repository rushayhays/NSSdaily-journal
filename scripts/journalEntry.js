/*
 *  Purpose: To render a single journal entry as an
 *           HTML representation of the data
 */
export const JournalEntryComponent = (entry) => {
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            <div class="entryName"><h5><p>Date:${entry.date}</p></h5></div>
            <div><p>${entry.entry}</p></div>
            <div class="journalButtons">
                <div class="editBtn"><button type="button" >Edit</button></div>
                <div class="deleteBtn"><button type="button" >Delete</button></div>
            </div>
        </section>
    `
}


{/* <div class="journalEntry">
    <div class="entryName"><h5>Journal Entry Number</h5></div>
    <div class="editBtn"><button type="button" >Edit</button></div>
    <div class="deleteBtn"><button type="button" >Delete</button>></div>
</div> */}