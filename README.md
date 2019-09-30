# cost-tracker

Cost tracker is an app built to keep track of your transactions and manage your budget.

This is a Work In Progress with some features to be developed. Suggestions are welcome.

At this moment these are the features:
* Transactions: add, edit, delete, list, search
* Salary: add, edit, delete
* Subscriptions (recurring payments): add, edit, delete, pay


This app is containerized using Docker and there are four services running:
* Client - built using React with Typescript
* Backend - using Java Spring
* Database - MongoDB 
* Database admin interface - Mongo-Express

In order to run it, execute:
``` docker-compose up ```
If it is the first time you run it you might need to add the flag ```--build```

To access it, browse into http://localhost:3000/

