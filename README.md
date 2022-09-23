# E-commerce API

Basic REST API implementation with JWT token authentication for learning purposes.

## How to check it out

Clone the project from this repository. Run `npm install` after that `npm start`. DB is hosted on MongoDB Atlas.

## Endpoints:
### Auth
- `POST` http://localhost:3001/auth/login 
- `POST` http://localhost:3001/auth/register
### Products
- `GET` http://localhost:3001/products
- `GET` http://localhost:3001/products/newest
- `GET` http://localhost:3001/products/id
- `POST` http://localhost:3001/products/{data}
- `PUT` http://localhost:3001/products/id
- `DELETE` http://localhost:3001/products/id
### Cart
- `GET` http://localhost:3001/cart/id
- `POST` http://localhost:3001/cart
- `PATCH` http://localhost:3001/cart
- `DELETE` http://localhost:3001/cart/id
### Order
- `GET` http://localhost:3001/order
- `POST` http://localhost:3001/order
### Contact
- `POST` http://localhost:3001/contact


Provide token in request headers:
```
X-Authorization: {token}
```

In order for the `/contact` endpoint to send emails with `mailjet`, public and private keys need to be provided in env.js file:
```
exports.MJ_APIKEY_PUBLIC = 'your API key'
exports.MJ_APIKEY_PRIVATE = 'your API secret'
```

Initially created users:
```
Admin
username: Gosho
pass: 123456
```
```
Normal user
username: Chris
pass: 123456
```

## Client

For frontend i use my other project [https://github.com/chrisbgvt/React-shop](https://github.com/chrisbgvt/React-shop).