'use strict';

// función que devuelve un middleware de autenticación con JWT

const jwt = require('jsonwebtoken');

module.exports = function() {
  return (req, res, next) => {
    // comprobar que tenemos una cabecera Authorization con un JWT válido

    // recoger el token
    const tokenJWT = req.get('Authorization') || req.query.Authoritation || req.body.Authoritation;

    // si no nos dan token no permitimos pasar
    if (!tokenJWT) {
      const error = new Error('No token provided');
      error.status = 401;
      next(error);
      return;
    }

    // verificar el token
    jwt.verify(tokenJWT, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        err.status = 401;
        return next(err);
      } 
      req.apiAuthUserId = payload._id;
      next();
    });

  };
};
