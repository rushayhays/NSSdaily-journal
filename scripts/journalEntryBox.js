// For Postertiy
//all of this forms inside of journalEntryBox

const JournalEntryBox = () => {
    return`
        <div class="journalHeader">
        <div class="dateBox">
            <form action="">
                <fieldset>
                    <label for="journalDate">Today's Date</label>
                    <input type="date" name="journalDate" id="journalDate"></input>
                </fieldset>
            </form>
            <!-- <p>date</p> -->
        </div>
        <div class="moodBox">
            <form action="">   
                <fieldset>
                    <label for="moodButton">Mood</label>
                    <select id="moodButton" name="moodButton">
                        <option value="intrepid">Intrepid</option>
                        <option value="daring">Daring</option>
                        <option value="bold">Bold</option>
                        <option value="marvelous">Marvelous</option>
                    </select>
                </fieldset>
            </form>
        </div>
        </div>
        <div class="journalMain">
        <div class="inputBox">
            <label for="subject">Subject:</label>
            <input type="text" id="subject" name="subject">
        </div>
        <div class="textAreaBox">
            <textarea id="textareaID" name="message" rows="0" cols="0" placeholder="My daring adventures in space. Space the final frontier..."></textarea>
        </div>
        
        </div>
        <div class="journalFooter">
        <button id="record" type="button" >Record Journal Entry</button>
        </div>
    `

}

export const JournalEntryBoxWriter = () => {
    const htmlPosition = document.querySelector(".journalEntryBox")
    htmlPosition.innerHTML = JournalEntryBox();
}