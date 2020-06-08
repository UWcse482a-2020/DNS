To view the website hosted at a public url, visit https://assistivetechlib.herokuapp.com/

# Installation
1. To run the application locally, first clone or download the master folder from the Github repository https://github.com/UWcse482a-2020/DNS. 
2. (Optional) To use your own database refer to the MongoDb instructions
3. Download and install nodejs from https://nodejs.org/en/download/
4. Navigate to the DNS folder in the terminal using the command `cd DNS`.
5. Run `npm init` to download the necessary packages for the application
6. Run `npm run start` to start a server on your machine, hosted on localhost port 8081
7. You should see the message “server successfully started on port 8081” returned in the terminal
8. Access the website by accessing `localhost:8081` in your browser

# MongoDb Setup
## Creating a MongoDB Cloud Atlas instance:
1. Follow the documentation provided by MongoDB to create an account, deploy a free tier cluster, and connect to the cluster https://docs.atlas.mongodb.com/getting-started/
2. Create a database to hold the “Tables”/ “Collections” for the site. Then create the Collections used in the database. This can be done via the Atlas web GUI interface, but it is also possible through the mongo shell. If you would like to connect to your cluster through the mongo shell, follow the documentation to download & install the shell on your machine (https://docs.mongodb.com/manual/administration/install-community/) , and how to interact with the shell (https://docs.mongodb.com/manual/mongo/). We used the following schema:
Database name: “AssistiveTechLib”
Collections: Products, Tags, Users
3. To use the database with the code from this project, get the connection url string for the database you just created. Go to backend/connect.js and set const url to that string. You may have to whitelist IP addresses to allow access to the database.
## Uploading a Products csv file to the Products Collection
1. **Ensure that the products csv file follows the same format as our sample-products.csv located on Github.** 
Required columns:

ProductId, Name, Inventory, Image**, Link, Type, Notes, Cognitive-age, sound-off, sound-loud, Moves, lights-off, lights-bright, av-alt, input-small, input-difficult, touch-input, textured, switch-acc, eye-acc, buyable, buy-link, borrowable, borrow-like, makable, make-link

** The Image field should be a valid, permanent reference to the image. If it is a Google Drive link, consider using the backend/imgur.js script to generate an imgur link for the product. If this option is chosen, an additional field will be added to the Products collection called “ImgurLink”
Feel free to add additional feature columns, as they will be added as new fields for each document in the collection. 

From the original CSV stored by Provail, we have removed all duplicate listings and added a ProductId column to uniquely identify all the listings in our database. If your workflow is going to be deleting all elements of the Product database, then reuploading the entire csv file again to make updates to the table, **make sure** to keep the same ProductId column for each product if possible.
2. The actual upload process can be done multiple ways. One option is to use the mongoimport command on the mongoshell (https://docs.atlas.mongodb.com/import/mongoimport/)

Another option is to use the MongoDB Compass GUI, which should come installed on your machine if you have downloaded the mongo shell. In the Compass GUI, enter the connect string to connect to the cluster, then navigate to the AssistiveTechLib database and click on the Products collection, which should be empty. Then, click on the “ADD DATA” green button and choose “Import File”. Browse to the location of your csv file, set the file type to be “CSV” and click on the “Import” button.

## Designating “type” tags and “feature” tags
1. In order for the application to know what tags represent product types and which tags represent features, as well as having human readable versions of each tag, the database will need a Tags table.
2. Import the tags.csv from the github just as described with the products.csv instructions
3. If you wish to add more tags remember to update the Tags table and categories your tags as a product type tag or a feature tag using the “category” field with either “type” or “feature” and specify the tag with the “value” field. If it is a “feature” tag then also a “readable-value” field should be filled to be an understandable version of the tag. For example “{category:”feature”, value:”sound-loud”, readable-value:”Sounds are loud”}
## Creating a User table
Create an empty table called “Users” under the AssistiveTechLib database.
It will be empty but can be populated through the registration page when running the web application.



# About the application
File structure breakdown:
```
project
│   README.md
|
└───sample_csv_files
│   │   sample-products.csv contains the example csv file that should be used as a model for the Products collection in mongodb
│   │   sample-tags.csv contains the example csv file that should be used as a model for the Tags collection in mongodb
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
