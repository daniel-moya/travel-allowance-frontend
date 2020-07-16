
# Description
Create a small application which provides a monthly overview of the travel allowance for the employees of a
company for the current year.

## Compensation Rates.
People who commute by bike will get a compensation of € 0,33 per km per day. For distances between 5 to 10
km the compensation will even double! However, for distances over 10 km employees prefer a different way
of commuting. Some employees commute by bus or train, for which the compensation is € 0,25 per km per
day. If you would commute by car the compensation would be € 0,10 per km per day.

### Using the Compensation Rates API.
Since the compensation can change over time, there’s an API GET endpoint that is hooked up to the Curious
Inc. administration and returns the current compensation at
https://api.staging.yeshugo.com/applicant/travel_types.

## Features
- Overview of monthly travel allowances per Employee.
- The output of the application should be a CSV file which should contain the following columns:
employee, transport, travelled distance, compensation for the entire month and the payment date.

# DOCS 
You can check the **frontend docs** [here](https://github.com/daniel-moya/travel-allowance-frontend/blob/master/docs)

## Requirements
### 1. MySQL DATABASE
You need a server with a MySQL Database Manager, such as XAMPP.  After the installation, you must create a new database with the name `travel_allowance`. Then import the database backup file into the created database. You will the file `travel_allowance.sql` inside the root of this project.

Please make sure the database name it's `travel_allowance` to be sure the backend will make connection with the DB. 


After you imported the `trave_allowance.sql` into the DB successfully, please move to next step.


### 2.[Travel Allowance Backend](https://github.com/daniel-moya/travel-allowance-backend)
Clone the Backend repo. `travel-allowance-backend`. You can use the above link to the github repo.
<br>
`git clone https://github.com/daniel-moya/travel-allowance-backend`
`cd travel-allowance-backend`

### Additional
For this step you need:
- Nodejs
- npm


### Install Dependencies
`npm install`

### Run the project locally
`bash-$ npm run start`


## 3.[Travel Allowance Frontend](https://github.com/daniel-moya/travel-allowance-frontend)
Clone the Backend repo. `travel-allowance-frontend`. You can use the above link to the github repo.
<br>
`git clone https://github.com/daniel-moya/travel-allowance-frontend`
`cd travel-allowance-frontend`

### Additional
For this step you need:
- Nodejs
- npm

### Install Dependencies
`npm install`


### Run the project locally
`bash-$ npm run start`

### IMPORTANT
You must run 3 servers at the same time.
- Travel Allowance Backend (Default: http://localhost:5000/)
- Travel Allowance Frontend (Default: http://localhost:3000/)
- MySQL Database with `travel_allowance.sql`



