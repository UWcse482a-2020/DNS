# Setup
1. To run the application locally, first clone or download the master folder from the Github repository https://github.com/UWcse482a-2020/DNS. 
2. Download and install nodejs from https://nodejs.org/en/download/
3. Navigate to the DNS folder in the terminal using the command `cd DNS`.
4. Run `npm init` to download the necessary packages for the application
5. Run `npm run start` to start a server on your machine, hosted on localhost port 8081
6. You should see the message “server successfully started on port 8081” returned in the terminal
7. Access the website by accessing `localhost:8081` in your browser
8. To view the website hosted at a public url, visit https://assistivetechlib.herokuapp.com/


# About the application
File structure breakdown:
```
project
│   README.md
│   products.csv is the sample product csv file, it is used to populate the mongodb database
│
└───backend
│   │   server.js contains the express server used to route pages and handle GET requests
│   │   connect.js uses the mongodb nodejs driver to make all of the application's database calls
│   │   imgur.js is a one-time script that is run to generate an imgur link for each product in the database that has a google drive image link
|
└───src
│   │   index.html homepage
│   │   categories.html search results page
│   │   product-page.html individual product page
|   ...
|
└───js
│   │   main.js contains the front end javascript used across all html pages
│   │   buildProductGrid.js dynamically populates the categories.html page based on the user query
│   │   buildProductPage.js dynamically populates the product-page.html page based on the user click
|   ...
|
└───css contains the styling for the website
└───fonts contains the fonts used on the website
└───img contains the locally saved images used on the website
```
