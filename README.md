# Cookimus

![Poster A1 Final](https://user-images.githubusercontent.com/62279011/120449318-e8657600-c3c1-11eb-8d40-819b8b201f70.png)

*Further details, screenshots and back-end implementation can be [found here](https://docs.google.com/document/d/1hirAgWnsMoe-4WmmEGymmSHDvvHcXmdSV2wHG8y7Hg0/edit?usp=sharing)*

*Product introduction and demo video can be [found here](https://www.youtube.com/watch?v=C21VhkXhti4)*

## Motivation

As we turn towards the internet to search for the perfect recipe, we end up flooding our browser with large numbers of tabs, and filling up our bookmarks with many unsorted saved pages of the recipes that we like. This, while completely functional, is a very crude way of organising our recipes and oftentimes leads to a lot of confusion. 

Furthermore, when we finally decide on the recipes we want to prepare and head out to purchase the required ingredients, we would have to fill in a grocery list ingredient by ingredient. Don’t we wish we had something that can automatically import a recipe into a grocery list?

## Aim

Our team aims to create an app that targets these problems as mentioned, by **streamlining the searching and saving process into a single app,** allowing users to search, sort and save recipes found on the web. Grocery lists are also made much easier with features that allow users to add all ingredients into a compiled Grocery list with one tap.

## Target Audience

Aspiring home cooks

## Scope of project

The **mobile app** will be the platform on which the user interacts to search for and save recipes, as well as the users grocery list which are saved locally on the users device.

The **backend** will store the profiles of the user (including usernames and passwords), as well as web-scraped recipes.

## How are we different from similar platforms
As of now, while there exist many recipe websites that include their own search and sorting system, these sites usually feature their own or user submitted recipes. Our app is looking to combine the available information from multiple sites into one search platform allowing users to be able to access multiple sources in a single instance.

## Features of App

* User Login
  * User authentication with email and password, guest login
  * In-app updating of email and name
* Home page
  * Recipes displayed based on time of day e.g. breakfast recipes in the morning
  * Popular recipes displayed
* Search page
  * Pull recipes from 2 popular recipe websites, AllRecipes and Epicurious
  * Display the picture, title, ratings in a card format
* Recipes
  * Ingredients and preparation methods are shown when user taps on a recipe
  * Convenient importing of ingredients into grocery list
  * Save recipes for reference later on
* My Recipes
  * Saved recipes displayed
  * View ingredients and preparation methods
* Grocery list
  * Combined grocery list / recipe-categorized list
  * Add custom recipe
  * Check off ingredients that have been purchased
  * Scale recipe serving size
  * Edit ingredient name, quantity and units
* Cloud sync
  * Saved recipes and grocery list synced to the cloud - accessible across multiple devices

## Details of Features
### Authentication
#### Front-end
Users will first register with their email and password, after which they can login with the same email and password to retrieve user data on a separate device. Guest login without registration and without data syncing is also available.
<img src="https://user-images.githubusercontent.com/62279011/120449713-442fff00-c3c2-11eb-9d4d-4c3abce798f6.png" width="300"> <img src="https://user-images.githubusercontent.com/62279011/120449802-59a52900-c3c2-11eb-98c0-a0203cc3f5ed.png" width="300">


#### Back-end
Firebase Authentication is used to authenticate users, with corresponding user data stored in the Cloud Firestore database. The Firestore security rules are configured such that the currently authenticated user is only able to modify their own data, and not other users’ data.

---

### Home Screen
#### Front-end
Upon login or registration, users are first brought to the home screen in the app, where they are shown popular recipes as well as recommendations based on time of day *(e.g. breakfast recipes during morning, dinner recipes during evening).* 
<img src="https://user-images.githubusercontent.com/62279011/120449935-77728e00-c3c2-11eb-9996-e0e13f09696e.jpg" width="300">



#### Back-end
Recommendations are scraped from the recommended section in the recipe sites. For example, breakfast recipes are scraped from the breakfast section of the websites, and so on. Current implementation only scrapes from AllRecipes.com, however other recipe sites will be included in the final product.


---

### Search Function
#### Front-end
The search page allows users to search for recipes based on both recipe name and ingredients. For instance, searching “cheese” will bring up both recipes with “cheese” in the name as well as recipes which include “chicken” as one of the ingredients. The matching recipes are displayed in a card format with the image, name, source website, as well as ratings info.

<img src="https://user-images.githubusercontent.com/62279011/120455994-cb33a600-c3c7-11eb-834c-66f267f38457.jpg" width="300">


#### Back-end
Search terms are run through the web scraper and recipe data is returned to construct the search cards in the app. Additional information not shown on the cards, such as list of ingredients and preparation methods, are asynchronously loaded in the background. 

---

### Detailed Recipe View
#### Front-end
Users can tap on any of the recipe cards, either on the home screen or on the search screen, to view more detailed information of the recipe, including preparation time, serving portions and preparation methods. 

This information is presented in a visually consistent format regardless of the source website formatting. Unnecessary details such as long preambles and backstories are omitted.

<img src="https://user-images.githubusercontent.com/62279011/114505670-4f3c9d80-9c63-11eb-98a0-8d9dcc5a217a.jpg" width="300"> <img src="https://user-images.githubusercontent.com/62279011/114505674-52d02480-9c63-11eb-807c-1d238857e4e1.jpg" width="300">


#### Back-end
Information fetched from the individual recipe webpages are processed and sorted into categories which allows for a consistent and clean UI. Details can be found in the “Web scraper” section below.

---

### One Tap Add Ingredients
#### Front-end
Found in the detailed recipe view, users can tap on the “Add To Grocery List” button to add all ingredients in the recipe into the grocery list. The ingredients are split into name/amount/unit, and the user can confirm or edit the entires before adding into the grocery list.

<img src="https://user-images.githubusercontent.com/62279011/120450200-d0422680-c3c2-11eb-8139-ce3508d39bf9.gif" width="300">

---

### Save recipe
#### Front-end
Found in the detailed recipe view, users can tap on the “Save this Recipe” to save the recipe to “My Recipes”. The entire recipe page can then be accessed from the “My Recipes” tab.

<img src="https://user-images.githubusercontent.com/62279011/120454984-f4076b80-c3c6-11eb-8772-9e9487d0ab5b.gif" width="300">


#### Back-end
Saved recipes are stored in the user’s data in Firebase. As such, the user will have access to the saved recipes across devices, as long as the same account is used.

---

### Grocery List
#### Front-end
Ingredients from recipes are added here. Users have the option to add their own ingredients into the recipe list; the name, amount and units are manually specified. They can tap on the individual ingredients to check them off, to signify that the ingredient has been purchased. 

On the top right, users can press the toggle button  to switch between the recipe categorised list, and the combined list which combines all items with the same name, allowing for convenient shopping.

<img src="https://user-images.githubusercontent.com/62279011/120450252-dfc16f80-c3c2-11eb-94cc-38d8e6fb7e43.gif" width="300">

#### Back-end
The grocery list is currently stored locally in a .js file - this will be migrated to the cloud in the future and stored under user data in Firestore. As such, the user will have access to the grocery list across devices.

The combined list is dynamically generated from the list of recipes - a change in the recipe list triggers an update in the combined list. Upon deletion of a single ingredient from the recipe list, the corresponding amount will be subtracted from the combined list. Similarly, when a recipe is added to the grocery list, the ingredient will be inserted into the combined list (if not already present) or the amounts incremented (if present in other recipes)

![OrbitalFlowchart](https://user-images.githubusercontent.com/60423568/85918704-acfc2680-b897-11ea-8a55-62b838239a0c.png)
