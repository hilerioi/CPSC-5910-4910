# CPSC-5910-4910
Persistant Sessions management using connect-mongo.  This sample stored the session data on the same mongo connection you create for your data.

Pre-requisite to run this app:
* You need to run my mongo script to pre-populate the data and create user accounts: "createToDoSampleData.user.js"
* You will need to modify the "db.toDoSample.config" file with your db information.

To run this sample do the following:
* Initialize the pre-requisite modules by running "npm install"
* Run sample app using the following command "node app.js"

Test the sample app by going to a browser and accessing the following URLs:
* http://localhost:3000/
* Login with one of the following user accounts: user1, user2, or user3
* The password for these accounts is 'test'
