🧾 Project Overview: Pokémon Search Web App
This project is a client-side web application that allows users to search for Pokémon by name or id and view basic information about them. It interacts with the PokéAPI to fetch data dynamically and display it on the page in a styled format. The layout includes a banner, a search input, and a result container where Pokémon cards appear after a successful search.

📐 HTML Structure
The HTML sets up a responsive layout using basic semantic tags.

Key sections:

Banner image: Visually introduces the theme.

Search input and button: Allows the user to enter a Pokémon name or id and trigger a search.

Result container: Dynamically fills with Pokémon cards based on user input.

⚙️ JavaScript Functionality
🔍 1. Search & API Integration
The searchQuery() function is triggered when the user clicks the Submit button.

It validates input and calls getData() if the input is not blank.

getData() uses fetch() to request Pokémon data from the PokéAPI.

If a match is found, the Pokémon's name, type, and image are extracted and passed into the pokemon class to create a visual card.

If no results are found or an error occurs, an error message is displayed using showError().

🧱 2. pokemon Class
This class handles the creation, rendering, and removal of Pokémon result cards.

Each card includes:

Image

Name

Type

New cards are appended to the DOM and stored in a static collection for future removal.

The class includes remove() and removeAll() methods to clean up the display when needed.

🧼 3. UI Reset & Error Handling
clearContainer() removes all existing Pokémon from the DOM and clears any error messages.

showError() adds an error message element to the page when needed.