const { response } = require("express");

const usersGet = (req, res = response) => {

    const { q, nombre = "no name", apikey, page= 4, limit} = req.query;

  res.json({
    msg: "get API controlador",
    q,
    nombre,
    apikey,
    page,
    limit
  });
};

const usersPost = ("/", (req, res = response) => {
    // Para recibir la respuestas desde el "front" o "body"
    const { nombre, apellido, edad, altura } = req.body;
    console.log(nombre, apellido, edad, altura)

    res.json({
      msg: "post API controlador",
      nombre,
      apellido,
      edad,
      altura
    });
});

const usersPut = ("/", (req, res = response) => {

    const id = req.params.id;

    res.json({
      msg: "put API controlador",
    });
  });

const usersPatch = ("/", (req, res = response) => {
    res.json({
      msg: "patch API controlador",
    });
  });


const usersDelete = ("/", (req, res) => {
    res.json({
      msg: "delete API controlador",
    });
  });


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}
