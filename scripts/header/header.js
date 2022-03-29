const fillHeader = () => {
    return`
        <div class="logo">
            <h2>Logo goes here</h2>
        </div>
        <div class="userView">
            <h2>Username and user number or something</h2>
            <button type="button" id="logout">Logout</button>
        </div>
    `

}

export const header = () => {
    const headerPosition = document.querySelector("header")
    headerPosition.innerHTML = fillHeader();
}