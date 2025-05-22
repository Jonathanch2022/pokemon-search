// Get references to DOM elements
const serach = document.getElementById("search");           // Search input field (note: variable is misspelled, should be "search")
const submit = document.getElementById("submitBtn");        // Submit button
const container = document.getElementById('result-container'); // Container to display results
let errorMessage;                                           // Holds the error message DOM element (if any)

// Add event listener to trigger search on submit
submit.addEventListener("click", searchQuery);

// Define a Pokémon class to manage Pokémon data and rendering
class pokemon {

  // Constructor to initialize a new Pokémon object
  constructor(name, type, image) {
    this.name = name;               // Pokémon name
    this.type = type;               // Pokémon type
    this.image = image;             // Image URL
    this.element = this.create_Element(); // Create visual DOM element
    container.append(this.element);       // Append element to container
    pokemon.collection.push(this);        // Add to static collection
    pokemon.#id++;                        // Increment private ID counter
    this.objectId = pokemon.#id;          // Assign unique ID to object
  }

  // Static collection to store all created Pokémon instances
  static collection = [];

  // Private static ID counter for assigning unique object IDs
  static #id = 0;

  // Instance properties (declared for clarity)
  name;
  image;
  type;
  objectId;
  pokemonid;
  element;

  // Method to create and return the DOM element for a Pokémon
  create_Element() {
    let itemBlock = document.createElement("div");
    itemBlock.className = "item-block";

    let itemImage = document.createElement("div");
    itemImage.className = "item-image";

    let image = document.createElement("img");
    image.alt = "Pokemon Image";
    image.src = this.image;
    itemImage.appendChild(image);

    itemBlock.appendChild(itemImage);

    let itemContent = document.createElement("div");
    itemContent.className = "item-content";

    let labelName = document.createElement("label");
    labelName.className = "item-content-label-name";
    labelName.textContent = this.name.toUpperCase();

    let labelType = document.createElement("label");
    labelType.className = "item-content-label-type";
    labelType.textContent = "TYPE: " + this.type.toUpperCase();

    itemContent.appendChild(labelName);
    itemContent.appendChild(labelType);
    itemBlock.appendChild(itemContent);

    return itemBlock;
  }

  // Method to remove the current Pokémon from the DOM and collection
  remove() {
    this.element.remove();
    pokemon.collection.splice(pokemon.collection.indexOf(this), 1);
  }

  // Static method to remove all Pokémon from the DOM and collection
  static removeAll() {
    for (let t in pokemon.collection) {
      pokemon.collection[t].remove();
    }
  }
}

// Function to fetch Pokémon data from the API using the search keyword
async function getData(keyword) {
  try {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${keyword}/?offset=20&limit=20`)
      .then((a) => {
        if (a.status == 404) {
          showError("No results found!");
        } else {
          return a.json(); // Parse JSON only if request is successful
        }
      })
      .then(b => {
        if (b != undefined) {
          let image_url = b.sprites.front_default; // Get Pokémon image
          let type = b.types[0].type.name;         // Get primary type
          let name = b.name;                       // Get name
          new pokemon(name, type, image_url);      // Create new Pokémon instance
        }
      });
  } catch (e) {
    showError(e); // Show error if fetch fails
  }
}

// Clears all Pokémon from the display and removes error messages if any
function clearContainer() {
  pokemon.removeAll(); // Clear all Pokémon elements
  if (typeof (errorMessage) == "object") {
    errorMessage.remove(); // Remove error message from DOM
  }
}

// Displays an error message in the result container
function showError(er) {
  errorMessage = document.createElement("div");
  errorMessage.className = "error";
  if (er != "" && er != null && er != undefined) {
    errorMessage.textContent = er;
  }
  container.append(errorMessage);
}

// Handles the search logic when the submit button is clicked
function searchQuery() {
  clearContainer(); // Clear previous results
  if (serach.value != "" && serach.value != null) { // Validate search input
    getData(search.value); // Call API with input
    serach.value = "";     // Clear input field
  } else {
    showError("Search value can not be blank!"); // Display validation error
  }
}