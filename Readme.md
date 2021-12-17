# Carcool

## Website to rate Cars ? 

## Description

This is an app to rate Cars you like or dont like and share your experience of the Car with other Users. 

## User Stories

- **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
- **Homepage:** As a User the Homepage displays images of rated cars by other users and a list of rated cars.
- **Signup:** As an anonymous user I can sign up on the platform so that I can start creating and ratings.
- **Login:** As a user I can login to the platform so that I can access my profile and start creating and managing ratings.
- **Logout:** As a logged in user I can logout from the platform so no one else can use it.
- **Profile Page**: As a logged in user I can visit my profile page so that I can access the edit page and see the list of ratings I have created.
- **Add Ratings:** As a logged in user I can access the add tournament page so that I can create a new tournament.
- **Edit Ratings:** As a logged in user I can access the edit ratings page so that I can edit the rating I created.
- **All Cars:** As a user I can list all the cars and filter them.
- **One Car:** As a user I can see the average ratings of one car.
- **One Rating:** As a user I can see one specific rating and all the details that the other user added to the rating.

## Backlog

- Add admin Page
- Make page more secure



# Client / Frontend

## React Router Routes (React App)

| Path          | Component         | Permissions              | Behavior                                          |
| ------------- | ----------------- | ------------------------ | ------------------------------------------------- |
| `/login`      | LoginPage         | anon only `<AnonRoute>`  | Login form, navigates to home page after login.   |
| `/signup`     | SignupPage        | anon only `<AnonRoute>`  | Signup form, navigates to home page after signup. |
| `/`           | HomePage          | public `<Route>`         | Home page.                                        |
| `/user`       | ProfilePage       | user only `<isLoggedIn>` | User and player profile for the current user.     |
| `/user/edit`  | EditProfilePage   | user only `<isLoggedIn>` | Edit user profile form.                           |
| `/user/:id`   | EditOneRatingPage | user only `<isLoggedIn>` | Edit one rating by user                           |
| `/newrating`  | CreateRatingtPage | user only `<isLoggedIn>` | Create a new rating.                              |
| `/allcars`    | RatingListPage    | user only `<isLoggedIn>` | All cars list.                                    |
| `/car/:carId` | CarRatingsPage    | user only `<isLoggedIn>` | All the ratings of one car                        |
| `/rating/:id` | OneRatingPage     | user only `<isLoggedIn>` | One rating of one car                             |

## Components

Pages:

- LoginPage
- SignupPage
- HomePage
- ProfilePage
- EditProfilePage
- EditRatingPage
- CreateRatingPage
- RatingListPage
- OneCarRatingPage
- OneRatingPage

Components:

- Navbar

## Services

- **Auth Service**

  - ```
    auth.service.js
    ```

    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.verify()`

- File Service

  - ```
    file.service.js
    ```

    - `.uploadImage()`

**External API Endpoints**

Cars by brand

- https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/honda?format=json

## Colors

- Darkblue #1f3075 
- Lightblue #c9dfec 
- Grey #343f5c 
- Orange #ec5e04 
- White #ffffff 

# Server / Backend

## Models

**User model**

```javascript
const userSchema = new Schema({
  email: { type: String, unique: true, required: true }, 
  password: { type: String, required: true }, 
  name: { type: String, required: true }, 
  role: { type: String, enum: ["admin", "user"], default: "user" }, 
  image: { type: String, default: "https://i.imgur.com/w3UEu8o.jpeg" }, 
  ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }], 
});
```

**Car model**

```javascript
const carSchema = new Schema({
  brand: { type: String, required: true }, 
  model: { type: String, required: true }, 
  image: [{ type: String }], 
  ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }], 
});
```

**Rating model**

```javascript
const ratingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  carId: { type: Schema.Types.ObjectId, ref: "Car" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  totalScore: { type: Number },
  ratings: {
    weekend: {
      style: { type: Number, required: true },
      acceleration: { type: Number, required: true },
      handling: { type: Number, required: true },
      funfactor: { type: Number, required: true },
      coolfactor: { type: Number, required: true },
      totalweekend: { type: Number },
    },
    daily: {
      features: { type: Number, required: true },
      comfort: { type: Number, required: true },
      quality: { type: Number, required: true },
      practicality: { type: Number, required: true },
      value: { type: Number, required: true },
      totaldaily: { type: Number },
    },
  },
});
```



## API Endpoints (backend routes)

| HTTP Method | URL                            | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | ------------------------------ | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| POST        | `/auth/signup`                 | {email, password, name}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                  | {email, password}            | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/verify`                 | token                        | 204            | 400          | Logs out the user                                            |
| GET         | `/api/cars`                    |                              |                | 400          | Show all cars                                                |
| GET         | `/api/onecar/:id`              |                              |                |              | Show specific car                                            |
| GET         | `/api/rating/:ratingID`        | { name, img, players }       | 201            | 400          | Show rating                                                  |
| PUT         | `/api/rating/:ratingID`        | { name, img, players }       | 200            | 400          | edit rating                                                  |
| GET         | `/api/newrating`               |                              | 201            | 400          | show create new rating                                       |
| POST        | `/api/newrating`               |                              |                |              | create new rating                                            |
| DELETE      | `/api/delete/:ratingID`        | { name, img, tournamentId }  | 200            | 404          | delete rating                                                |
| GET         | `/api/user`                    | { name, img }                | 201            | 400          | show user page                                               |
| GET         | `/api/user/edit`               |                              | 200            | 400          | show edit user page                                          |
| PUT         | `/api/user/edit`               |                              | 201            | 400          | edit user page                                               |
| DELETE      | `/api/user/delete`             |                              |                |              | delete user                                                  |
| GET         | `/api/rating/edit/:ratingID`   | {player1,player2,winner,img} |                |              | show edit rating page                                        |
| PUT         | `/api/rating/edit/:ratingID`   | {winner,score}               |                |              | edit rating                                                  |
| DELETE      | `/api/rating/delete/:ratingID` |                              |                |              | delete rating                                                |





## Links

### Git

[Client repository Link](https://github.com/heiligerhuegel/Carcool-client)

[Server repository Link](https://github.com/heiligerhuegel/Carcool-server)

[Deployed App Link](https://carcool.netlify.app//)

### Slides

[Slides Link](http://slides.com/) - The url to your *public* presentation slides

