//this will create an area for modifying journal entries


// "date": "2022-03-28",
// "concept": "Test",
// "entry": "The first Test",
// "mood": "bold",
// "id": 5

export const JournalEditField = (postObj) => {
    return`
    <div class="journalHeader">
    <div class="dateBox">
        <form action="">
            <fieldset>
                <label for="journalDate">Today's Date</label>
                <input type="date" name="journalDate" id="journalDate" value="${postObj.date}"></input>
            </fieldset>
        </form>
        <!-- <p>date</p> -->
    </div>
    <div class="moodBox">
        <form action="">   
            <fieldset>
                <label for="moodButton">Mood</label>
                <select id="moodButton" name="moodButton" value="${postObj.mood}">
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
        <input type="text" id="subject" name="subject" value="${postObj.concept}">
    </div>
    <div class="textAreaBox">
        <textarea id="textareaID" name="message" rows="0" cols="0" placeholder="My daring adventures in space. Space the final frontier...">${postObj.entry}</textarea>
    </div>

</div>
<div class="journalFooter">
    <button id="updatePost__${postObj.id}" type="button">Update</button>
    <button id="newPost__cancel">Cancel</button>
</div>
`

}