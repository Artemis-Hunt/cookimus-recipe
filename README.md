# Orbital 2020 Cookimus App

![OrbitalPoster](https://user-images.githubusercontent.com/60423568/85918703-aa013600-b897-11ea-9a1e-fcfd065d0bbc.png)

## Motivation

As we turn towards the internet to search for the perfect recipe, we end up flooding our browser with large numbers of tabs, and filling up our bookmarks with many unsorted saved pages of the recipes that we like. This, while completely functional, is a very crude way of organising our recipes and oftentimes leads to a lot of confusion. 

Furthermore, when we finally decide on the recipes we want to prepare and head out to purchase the required ingredients, we would have to fill in a grocery list ingredient by ingredient. Don’t we wish we had something that can automatically import a recipe into a grocery list?

## Aim

Our team aims to create an app that targets these problems as mentioned, by **streamlining the searching and saving process into a single app,** allowing users to search, sort and save recipes found on the web. Grocery lists are also made much easier with features that allow users to add all ingredients into a compiled Grocery list with one tap.

## Target Audience

Aspiring home cooks who want to cook at home.

## Scope of project

The **mobile app** will be the platform on which the user interacts to search for and save recipes, as well as the users grocery list which are saved locally on the users device.

The **backend** will store the profiles of the user (including usernames and passwords), as well as perform web-scraping and sorting functions.

## How are we different from similar platforms
As of now, while there exist many recipe websites that include their own search and sorting system, these sites usually feature their own or user submitted recipes. Our app is looking to combine the available information from multiple sites into one search platform allowing users to be able to access multiple sources in a single instance.

## Features of App
### User Login
#### User authentication with email and password, guest login
#### In-app updating of email and name
### Home page
#### Recipes displayed based on time of day e.g. breakfast recipes in the morning
#### Popular recipes displayed
### Search page
#### Pull recipes from 2 popular recipe websites, AllRecipes and Epicurious
#### Display the picture, title, ratings in a card format
### Recipes
#### Ingredients and preparation methods are shown when user taps on a recipe
#### Convenient importing of ingredients into grocery list
#### Save recipes for reference later on
### My Recipes
#### Saved recipes displayed here
#### View ingredients and preparation methods
### Grocery list
#### Combined grocery list / recipe-categorized list
#### Add custom recipe
#### Check off ingredients that have been purchased
#### Scale recipe serving size
#### Edit ingredient name, quantity and units
### Cloud sync
#### Saved recipes and grocery list synced to the cloud - accessible across multiple devices

## Details of Features
### Authentication
#### Front-end
Users will first register with their email and password, after which they can login with the same email and password to retrieve user data on a separate device. Guest login without registration and without data syncing is also available.
![Screenshot_20200629-162235437](https://user-images.githubusercontent.com/62279011/114505604-392edd00-9c63-11eb-95c3-c8be58056bee.jpg)![Screenshot_20200629-162125792](https://user-images.githubusercontent.com/62279011/114505626-4055eb00-9c63-11eb-8980-54293a15ed33.jpg =400x)


#### Back-end
Firebase Authentication is used to authenticate users, with corresponding user data stored in the Cloud Firestore database. The Firestore security rules are configured such that the currently authenticated user is only able to modify their own data, and not other users’ data.

---

### Home Screen
#### Front-end
Upon login or registration, users are first brought to the home screen in the app, where they are shown popular recipes as well as recommendations based on time of day *(e.g. breakfast recipes during morning, dinner recipes during evening).* 
![Screenshot_20200629-162420540](https://user-images.githubusercontent.com/62279011/114505632-44820880-9c63-11eb-8795-69fa8a06c985.jpg =400x)


#### Back-end
Recommendations are scraped from the recommended section in the recipe sites. For example, breakfast recipes are scraped from the breakfast section of the websites, and so on. Current implementation only scrapes from AllRecipes.com, however other recipe sites will be included in the final product.


---

### Search Function
#### Front-end
The search page allows users to search for recipes based on both recipe name and ingredients. For instance, searching “chicken” will bring up both recipes with “chicken” in the name as well as recipes which include “chicken” as one of the ingredients. The matching recipes are displayed in a card format with the image, name, source website, as well as ratings info.
![Screenshot_20200629-162456411](https://user-images.githubusercontent.com/62279011/114505659-4ba91680-9c63-11eb-9340-c1329df4eca9.jpg =400x)


#### Back-end
Search terms are run through the web scraper and recipe data is returned to construct the search cards in the app. Additional information not shown on the cards, such as list of ingredients and preparation methods, are asynchronously loaded in the background. 

---

### Detailed Recipe View
#### Front-end
Users can tap on any of the recipe cards, either on the home screen or on the search screen, to view more detailed information of the recipe, including preparation time, serving portions and preparation methods. 

This information is presented in a visually consistent format regardless of the source website formatting. Unnecessary details such as long preambles and backstories are omitted.

![Screenshot_20200629-162959498](https://user-images.githubusercontent.com/62279011/114505670-4f3c9d80-9c63-11eb-98a0-8d9dcc5a217a.jpg =400x)
![Screenshot_20200629-163102470](https://user-images.githubusercontent.com/62279011/114505674-52d02480-9c63-11eb-807c-1d238857e4e1.jpg =400x)


#### Back-end
Information fetched from the individual recipe webpages are processed and sorted into categories which allows for a consistent and clean UI. Details can be found in the “Web scraper” section below.

---

### One Tap Add Ingredients
#### Front-end
Found in the detailed recipe view, users can tap on the “Add To Grocery List” button to add all ingredients in the recipe into the grocery list. Here, the ingredients are split into name/amount/unit and added into the list.

![Screenshot_20200629-163116118](https://user-images.githubusercontent.com/62279011/114506747-cc1c4700-9c64-11eb-9737-8733bb904905.jpg =400x)

---

### Grocery List
#### Front-end
Ingredients from recipes are added here. Users have the option to add their own ingredients into the recipe list; the name, amount and units are manually specified. They can tap on the individual ingredients to check them off, to signify that the ingredient has been purchased. In the final product, ingredients can be added to individual recipes and custom recipes can be created, however this is not supported currently.

On the top right, users can press the toggle button  to switch between the recipe categorised list, and the combined list which combines all items with the same name, allowing for convenient shopping.

To delete items from the grocery list, users can either delete items individually, by swiping left on the ingredient and tapping the delete icon, or delete the entire recipe at once by tapping the recipe header. All amounts are automatically updated in the combined list.


#### Back-end
The grocery list is currently stored locally in a .js file - this will be migrated to the cloud in the future and stored under user data in Firestore. As such, the user will have access to the grocery list across devices.

The combined list is dynamically generated from the list of recipes - a change in the recipe list triggers an update in the combined list. Upon deletion of a single ingredient from the recipe list, the corresponding amount will be subtracted from the combined list. Similarly, when a recipe is added to the grocery list, the ingredient will be inserted into the combined list (if not already present) or the amounts incremented (if present in other recipes)

---

### Portion Changing
Users can tap on the bowl icon on the recipe section headers to bring up a pop-up. Here, users can scale the recipe portions, which scales the ingredients proportionally. For instance, selecting 2x scales the ingredients by a factor of 2, and a subsequent selection of 1x will bring the ingredient quantities back down to the original amount.

## Technical Details
### Web Scraper
One of the core components of our app, the web scraper is based on Node.js. The library “Got” is utilized to load webpages, after which the library “Cheerio” parses the webpages and provides the relevant text. The text is then run through a site-specific cleanup algorithm, which formats the raw text and places them into the appropriate categories (e.g. ingredients, preparation method, serving size etc).

As the app features the ability to add ingredients from a recipe into the grocery list, the text cleanup algorithm also extracts the name, quantity and units of the ingredient, from a raw string. For example, “3 tablespoons of olive oil” will be processed and written into an object formatted as such:
```javascript
  recipeObject = {name: “Olive oil”, amount: 3, unit: “tablespoon”};
```
The web scraper script is stored remotely on Firebase, which acts as a Node.js server. When a user enters a search term, it is passed to the web scraper via Firebase. On script completion, Firebase returns the processed results back to the app to be displayed on the search screen.
> *(Note: The actual web scraper script, including text cleanup and processing, is entirely coded by us. Firebase only hosts the script remotely and does not scrape or process any data.)*

To facilitate faster loading times, the web scraper returns only the basic essential info to build the recipe search cards (Name, URL, Image, Ratings), before returning all the other additional info such as preparation methods, serving portions and ingredients.

This bifurcation of “main” data fetching (to be shown on the cards) and “ancillary” data fetching (not shown on cards) allows for improved performance as the list of search results can be rendered without needing the “ancillary” data to be loaded (which can take up to 10-20s).

### Combined List
In order to build the combined list efficiently when many ingredients are added, we used a hash function to allow for amortized O(1) lookup times. When a new item is added into the grocery list, the ingredient names are processed to ensure consistent capitalisation and formatting. 

The names are then fed into our hashing function, which takes the unicode index of each character in the name and multiplies it by a large prime number to generate hash keys with a minimal chance of duplicates. The ingredient data, which consists of the amount and unit, is then inserted into the hash table according to its hash key. 

![OrbitalFlowchart](https://user-images.githubusercontent.com/60423568/85918704-acfc2680-b897-11ea-8a55-62b838239a0c.png)
