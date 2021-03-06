# assistance-requests
This is a simple React application to submit new assistance requests. 

`Service Type` in the request form is populated dynamically from an API response. The form is submitted by a `POST` request to the API, which will randomly return a `201`, `401`, `500` or `503` response.

# To run
Start the [mock API](https://hub.docker.com/r/uniteus/fake_api/) on port 49567. You will need to have [Docker](https://www.docker.com/) installed.
```
docker run -p 49567:49567 uniteus/fake_api:latest
```

Install the required dependencies:
```
npm install
```

Run the app in development mode:
```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Tests
```
npm test
```
