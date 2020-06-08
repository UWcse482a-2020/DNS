# Setup
To run the application locally, first clone this Github repository
You must have node (https://nodejs.org/) installed in order to run this node application

Once node is installed, issue the following commands in your terminal: 
1. `cd DNS` to navigate to the DNS folder
2. `npm init` to download the necessary packages for the application
3. `npm run start` to start a server on your machine, hosted on port 8081
You should see the message “server successfully started on port 8081” returned in the terminal
Access the website by accessing `localhost:8081` in your browser

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
│   │   index.html
│   │   categories.html
|
└───js
│   │   main.js contains the front end javascript used across all html pages
│   │   buildProductGrid.js dynamically populates the categories.html page based on the user query
│   │   buildProductPage.js dynamically populates the product-page.html page based on the user click
|
└───css contains the styling for the website
└───fonts contains the fonts used on the website
|
```
