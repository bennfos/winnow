# winnow: a react app by Bennett Foster

Most of us have an idea of what we believe concerning the fundamental questions of life: Why am I here? What kind of life do I want to live? What gives my actions purpose and my experiences meaning? On the surface, **winnow** is a lifestyle app that allows users to create a daily book of quotations from their favorite authors, speakers and thinkers, to which they can add their own thoughts and reflections. On a deeper level, it is an invitation to year-long project, whose purpose is to help users clarify and solidify their personal philosophy of life by drawing from and engaging with the wisdom of the past.

## Technologies Used

1. React
2. JSON-Server
3. Fetch JSONP (https://github.com/camsong/fetch-jsonp)
4. Forismatic API (https://forismatic.com/en/api/)
5. Reactstrap
6. Semantic UI React


## How to launch **winnow**

1. Clone the repo from GitHub
2. In your terminal, type the following command to install the dependencies associated with the project:
```
npm install
```
3. Install JSON-Server:
```
npm install -g json-server
```
4. In the main project directory, create a new directory called "api":
```
mkdir api
```
5. In the api directory, create a file called "database.json":
```
touch database.json
```
6. Copy/paste the data structure below into the database.json file
7. From the api directory start JSON server using the following command:
```
json-server -p 5002 database.json
```
8. In another terminal tab or window, from the main project directory, type the the following command:
```
npm start
```
9. You can now register an account and begin using **winnow**!

## Data structure (copy/paste into database.json)
```
{
  "users": [

  ],
  "books": [

  ],
  "pages": [

  ],
  "quotes": [

  ],
  "pageQuotes": [

  ]
}
```
