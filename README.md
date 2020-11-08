
# NodePop

[Demo](/anuncios) of the methods (this link works only if you run the project)

Api for the iOS/Android apps.

## Deploy

### Install dependencies
    
    npm install

### Configure  

Install mongodb and run an instance (i.e):
    
    "C:\Program Files\MongoDB\Server\4.4\bin\mongod.exe" --dbpath .\data\db

Review lib/connectMongoose.js to set database configuration

### Init database

    npm run installDB

## Start

To start a single instance:
    
    npm start

To start in development mode:

    npm run dev (including nodemon & debug log)

## Test

    npm test (pending to create, the client specified not to do now)

## JSHint & JSCS

    npm run hints

## API v1 info

### Base Path

The API can be used with the path:  
Practica Backend -> [API V1](/apiv1/anuncios)  
Práctica Backend Avanzado -> [API V2](/apiv2/anuncios)  

### Error example

    {
      "ok": false,
      "error": {
        "code": 401,
        "message": "This is the error message."
      }
    }

### GET /anuncios

**Input Query**:

start: {int} skip records  
limit: {int} limit to records  
sort: {string} field name to sort by  
includeTotal: {bool} whether to include the count of total records without filters  
tag: {string} tag name to filter  
venta: {bool} filter by venta or not  
precio: {range} filter by price range, examples 10-90, -90, 10-  
nombre: {string} filter names beginning with the string  

Input query example: ?start=0&limit=2&sort=precio&includeTotal=true&tag=mobile&venta=true&precio=-90&nombre=bi

**Result:** 

    {
      "ok": true,
      "result": {
        "rows": [
          {
            "_id": "55fd9abda8cd1d9a240c8230",
            "nombre": "iPhone 3GS",
            "venta": false,
            "precio": 50,
            "foto": "/images/anuncios/iphone.png",
            "__v": 0,
            "tags": [
              "lifestyle",
              "mobile"
            ]
          }
        ],
        "total": 1
      }
    }


### GET /anuncios/tags

Return the list of available tags for the resource anuncios.

**Result:** 

    {
      "ok": true,
      "allowed_tags": [
        "work",
        "lifestyle",
        "motor",
        "mobile"
      ]
    }

## API v2 info  

### POST /apiv2/authenticate  

  **Input Query:**  

  email: {string}  
  password: {string}  

**Result:**  

    {
        "tokenJWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmE3MGNmZTQyNWU5NjMwY2M5N2JlZDYiLCJpYXQiOjE2MDQ3ODU0NTksImV4cCI6MTYwNDk1ODI1OX0.QKgMFVNRlw0o00Ja22mCTyYbLoaUjlgUpuloeOHNkwU"
    }

    - Token will expire in 5min after JWT was created

### GET /apiv2/anuncios  

  **Input Query:**

  [Required] Authenticate: {string} (Token JWT)

**Result if expired:**

    {
    "success": false,
    "error": "jwt expired"
    }

**Result if invalid:**

    {
      "success": false,
      "error": "invalid token"
    }

**Result OK:**

    {
        "ok": true,
        "result": {
            "rows": [
                {
                    "_id": "5fa7164f75ab594540bebd41",
                    "nombre": "Bicicleta",
                    "venta": true,
                    "precio": 23015,
                    "foto": "\\images\\anuncios\\bici.jpg",
                    "__v": 0,
                    "tags": [
                        "lifestyle",
                        "motor"
                    ]
                },
                {
                    "_id": "5fa7164f75ab594540bebd42",
                    "nombre": "iPhone 3GS",
                    "venta": false,
                    "precio": 5000,
                    "foto": "\\images\\anuncios\\iphone.png",
                    "__v": 0,
                    "tags": [
                        "lifestyle",
                        "mobile"
                    ]
                }
            ]
        }
    }