const innerMain = () => {
    return `
        <div class="journalBox">
            <div class="journalEntryBox"></div>
            
            <div class="journalListBox">
                <div class="listTitle">
                    <h3>Previous Entries</h3>
                </div>
                <div class="entryList">
                    <!-- This is where JS inserts the journal Entries -->
                </div>
            </div>
        </div>
        <div class="sideGraphicBox">
            <p>This is where</p>
            <p>The cool graphic</p>
            <p>on the side of</p>
            <p>the page goes</p>
            <image src="" alt="scifi logo"></image>
        </div>
    `
}

export const resetMain = () => {
    const htmlposition = document.querySelector("main")
    htmlposition.innerHTML = innerMain();

}