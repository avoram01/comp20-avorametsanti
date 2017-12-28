# Sustainable Cooking
[Demo](https://localingredients.herokuapp.com)
### Find recipes that make the best use of locally grown ingredients.
***
## Development Usage :
- In "recipeapp" :
  * npm install
  * npm start
- In "server" :
  * node server

***

## Client-Side Functionality :
- Retrieves user's location.
- Retrieves recipes for the users selected ingredients using the spoocular food API.
- Displays recipes to the user.

## Server-Side Functionality :
- Google Maps reverse-geocoding is used to retrieve the user's current state from their location.
- Local foods data is retrieved from a cached version of the seasonalfoodguide.org lookup table and scraped from the NRDC eat local site.
