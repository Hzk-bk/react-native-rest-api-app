# React Native REST API App


# project description

This application demonstrates communication between a React Native mobile application and a REST API server.

The app:
- fetches posts from an API using the GET method,
- displays data using FlatList,
- allows users to create a new post,
- sends data using the POST method,
- handles loading states and network errors.

  ## Review Questions

### 1. What is the difference between the GET and POST methods?

The GET method is used to retrieve data from a server. It does not change the data on the server. In this project, GET was used to fetch posts from the API.

The POST method is used to send new data to the server. In this project, POST was used to create a new post and send it in JSON format.

### 2. Why is API data usually received in JSON format?

JSON is lightweight, easy to read, and easy for applications to process. It is supported by many programming languages and is commonly used for communication between mobile applications and servers.

### 3. Why is useEffect used in React Native when fetching data?

useEffect is used to execute code after the component loads. In this project, it was used to automatically fetch posts from the API when the application started.

### 4. Why should network errors be handled in a mobile application?

Network errors should be handled because internet connections may fail or servers may not respond correctly. Error handling improves user experience and prevents the application from crashing.

### 5. What is the difference between a successful HTTP status 200 and 201?

HTTP status 200 means the request was successful, usually for fetching data. HTTP status 201 means a new resource was successfully created on the server, usually after a POST request.


  Hzkiyas Kebede 58443
