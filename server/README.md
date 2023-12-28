
# Server Development

## Setup

### Install dependencies

```bash
npm install
```

### Create the environment file and update the environment variables

```bash
cp ./config/.env.example ./config/.env
```

Update the environment variables in the `.env` file.

`GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are required for Google OAuth2. These can be obtained from the [Google API Console](https://console.developers.google.com/).

`MONGO_URI` is required for MongoDB connection. By default, the database is hosted in a Docker container. If you want to use a different database, update the `MONGO_URI` variable.

### Run the database (if using MongoDB from Docker)

```bash
docker-compose up -d
```

### Run the server

```bash
npm start
```

### Run client

```bash
cd ../client
npm run dev
```

## Authentication and client-server communication

This server uses Google OAuth2 for authentication. The algorithm is as follows:

1. The `client` sends a request to the `server` to authenticate with Google via `GET server:port/auth/google`.
2. Neccessary steps are performed by Passport.js behind the scenes to authenticate the user with Google.
3. If the user is authenticated, the `server` creates or updates the user in the database.
4. The `server` then redirects the user to the client's home page, which is specified in the `CLIENT_HOME_PAGE_URL` environment variable.
5. The `client` receives the response and stores the user's information in a state.
6. Before each operation that requires authentication, the `client` sends a request to the `server` to check if the user is authenticated via `GET server:port/auth/user`.
   - If the user is authenticated, the `server` responds with the user's information, client considers the user to be authenticated.
    - If the user is not authenticated, the `server` responds with a 401 status code, client considers the user to be unauthenticated, displays a login dialog.




