# Landrup Dans App Coding Flow

## Technologies and libraries used

- Javascript
- React
- Sass
- Axios
- @reach/router
- React Hook Form
- Local API
- Github
- Netlify

### Start phase
The first commit on github after installing create-react-app and cleaning the files, having a clean start.
### Login flow
React Hook Form was installed to handle userinput on formsubmitting. A TokenContext was created. A function expression named onSubmit is created to handle the data input and validations. Fetching with axios to set the token in the context and also to navigate to home page once logged in. Username and password validation is handled after user tries to submit form - a simple primary (handled by if statement) and a secondary (handled by API) validation. Once user or instructor logs in with the right credentials, it will navigate them to Home page, then the Calender page will be available for the user.
### Routing and linking the pages
Setting up the router on App.js and linking the right pages with minimal content. 
### Fetching
Minimal content - mostly fetching to evaluate. Furthermore, the checkpoints to navigate to login or calender page depending on user authentification. Also checking if subscribing is possible or not. Fetching activities for the Activities page with axios using following endpoint: http://localhost:4000/api/v1/activities. Fetching for Details page: http://localhost:4000/api/v1/activities: http://localhost:4000/api/v1/activities/id. Fetching for Calender page: http://localhost:4000/api/v1/activities/token.userId. Fetching for Search page and using filter and includes functions to display the results. The purpose of these fetch calls are to either get info from api, to navigate or to validate checkpoints for authentification. 
### Creating components
4 components are created
- Activity.js to incapsulate and replicate an activity
- Buttons component is replicated three times on three pages
- Navigation component is found on 5 pages
- User.js component is found several places
### Styling components
The styling on the forementioned components and on the rest of the website using sass and the stylesheet as guide.
### Limiting the age group to the appropriate activity
Ternary operator is used to block unauthorised age groups from signing up to activities.
### Cookie functionality
A cookie is created on the login page "Husk mig". Once the box is checked a cookie is saved on the local computer with an object that is the respective user that has logged in before. Once this is saved in setToken this info can be put into an if statement that will allow the user to be logged in the second time he visits the site without logging in. The cookie can be removed to test this functionality. 
### Deployment Netlify
On netlify a new site is added by connecting to my github account and importing the project in question. Afterwards the site is deployed.https://danseapp.netlify.app


