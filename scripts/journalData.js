/*
 *   Journal data for Daily Journal application
 *
 *      Holds the raw data about each entry and exports
 *      functions that other modules can use to filter
 *      the entries for different purposes.
 */

// This is the original data.
const journal = [
    {
        id: 1,
        date: "02/25/2022",
        concept: "HTML & CSS",
        entry: "We talked about HTML components and how to make grid layouts with Flexbox in CSS.",
        mood: "Intrepid"
    },
    {
        id: 2,
        date: "02/28/2022",
        concept: "Objects to HTML",
        entry: "More work on Martn's aquarium, turning objects into HTML elemnets.",
        mood: "Bold"
    },
    {
        id: 3,
        date: "03/01/2022",
        concept: "Fat Tuesday",
        entry: "We made a mock-up madrigras page with a countdown timer.",
        mood: "Adventurous"
    }

]

/*
    You export a function that provides a version of the
    raw data in the format that you want
*/
export const getJournalEntries = () => {
    const sortedByDate = journal.sort(
        (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
    )
    return sortedByDate
}
