
[![MIT License][license-shield]][license-url]

<h1 align="center">MOVIES - Nowy_projekt</h1>
<br/>


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This is testbed for RESTfull Movies application. It use 3 endpoints and 2 services collated together in one dockey-compose file.
After authentication user has an option to create a Movie entry in DataBase. Once filled user can fetch all available data.

### Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
* [Node](https://https://nodejs.org/)
* [Express](https:/expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [Axios](https://www.npmjs.com/package/axios)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [Mocha](https://mochajs.org/)
* [Chai](https://www.chaijs.com/)


## Getting Started

1. Clone repository.
2. Run from root dir. Please not that MONGODB password and OMDB_KEY is to be provided privately. Both services/applications use
the same secret value.

```
JWT_SECRET=secret MONGODB_PASSWORD=passwordHERE OMDB_KEY=keyHERE docker-compose up -d
```

Movies service is available on port 4000 and Authorization can be found on post 3000.




### Users

The auth service defines two user accounts that you should us. Only those users will be authorized to use the API. No registration is provided
as of yet.

Basic user
 username: 'basic-thomas'
 password: 'sR-_pcoow-27-6PAwCD8'
Premium user
username: 'premium-jim'
password: 'GBLtTyq3E_UNjFnpo9m6'

## Usage

Example request should always consist of Authorization header. 

```
Authorization: Bearer <token>
```

1. Fetch token first with GET /Movies endpoint.
2. Use the token to make POST /Movies request. POST request need to have movieName in the body eg.

```
{
    "movieName" : "Inception"
}

```

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

Marcin Szyc - szyc.marcin@gmail.com
