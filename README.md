[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Staff Track 
## Description

This is a content management system (CMS) interface tool to help you create/manage a database of emploees.

## Video Walkthrough

https://www.youtube.com/watch?v=s6sntHqI5rQ

## Table of Contents
   
- [Installation](#installation)
- [Usage](#usage-instructions)
- [License](#license)
- [Contributions](#contributions)
- [Test](#test-instructions)
- [Contact](#contact)


## Installation

1. If you don't want to create a ".env" file, please enter your credentials to login to mysql into the connection.js file so that you can access databases on your own machine. If you're not sure how to do that, [Check this out!](https://dev.mysql.com/doc/mysql-getting-started/en/#mysql-getting-started-installing).

2. ```npm install OR npm i``` to install the correct dependencies.

3. Open terminal in the root of the project and enter ```mysql -u root -p```. Login with your mysql password to access the mysql command line interface (CLI).

4. Enter each of these commands in order to create a database, create three tables (department, roles, employees), and give the tables some fake data. (If you don't want fake data and want to make your own, do not source the seeds.sql file!)

```
SOURCE db/db.sql;
SOURCE db/schema.sql;
SOURCE db/seeds.sql;
quit;
```
5. You are all setup and ready to start seeing the program in action! If you want to see me do these steps, please follow along in the video walkthrough (I start on step 4 of these instructions.)

## Usage Instructions

```npm start``` to start!

## License
  This project uses the MIT license.
https://opensource.org/licenses/MIT
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Contributions

Christopher Kimball

## Test Instructions

There are no tests written for this project.

## Contact
Questions? Please email me at kimballc3@yahoo.com.
Do you like this project and want to see what else I'm doing? Here is my Github: [axdot](https://github.com/axdot).
