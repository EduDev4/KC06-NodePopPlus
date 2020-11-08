
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


# API v2 info  

    API V2 es la versión 2 de la API relacionada con la práctica de Backend Avanzado  
    - Se crea autenticación de la API con JWT. Metodo authenticate para generar el Token.  
    - El token es requerido en el Header para obtener respuestas de la API.  
    - Sin token se responde error 401  
    - Si el token está caducado se responde error 401  
    - Interncionalización con i18n. Dos idiomas, inglés y español.  
    - Se crea selector de idioma en el fron-end que funciona llamando a la ruta /change-locale la cual renueva el valor en la cookie y recarga la página.  
    - Subida de imagen, creación de Thumbnail y asociación de ambas imagenes al anuncio para mostrarla actualizada en el front-end.
    - Utilizado Sharp para la creación del thumbnail.
    

### POST /apiv2/authenticate  

**Input Body:** 

  email: {string}  
  password: {string}  

**Result:**  

    {
        "tokenJWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmE3MGNmZTQyNWU5NjMwY2M5N2JlZDYiLCJpYXQiOjE2MDQ3ODU0NTksImV4cCI6MTYwNDk1ODI1OX0.QKgMFVNRlw0o00Ja22mCTyYbLoaUjlgUpuloeOHNkwU"
    }

    - Token will expire in 5min after JWT was created

### GET /apiv2/anuncios  

**Input Header:**

  Authorization: {string} (Token JWT)

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

### GET /change-locale/{locale}

    Given 'en' or 'es' will change locale in user's cookie. The website will reload and i18n will retrieve the updated locale from cookie.

**Example:**

    GET /change-locale/en

**Result:**

  Change Cookie locale value and reloads the site


### POST /upload

**Input Query**:

    id: {string} id del anuncio 

**Input Body**:
    
    image: {file}

**Input Header**:

    Authorization: {string} (Token JWT)

**Result:**

    You have uploaded this image: <br> <img src="public\images\ad_5fa7164f75ab594540bebd42_images.jpg" width="500">  (We created this thumbnail: thumbnail_ad_5fa7164f75ab594540bebd42_images.jpg)

### GET /anuncios/tags

 **Input Header:**

  Authorization: {string} (Token JWT)

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
