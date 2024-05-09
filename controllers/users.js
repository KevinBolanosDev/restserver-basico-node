const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
// Se importa modelo USER
const User = require("../models/user");

const usersGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  /*   const users = await User.find(query)
    .skip(Number(desde))
    .limit(Number(limite)); //  con "limit" hacemos un limite de registros, y con "Number" parseamos todo dato string a numero

    const total = await User.countDocuments(query); */

  // Usando promesas
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    users,
  });
};

const usersPost = async (req, res = response) => {
  // Para recibir la respuestas desde el "front" o "body"
  const { nombre, correo, password, rol } = req.body;
  const user = new User({ nombre, correo, password, rol });
  // console.log(user);

  // Encriptar  la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await user.save();

  res.json({
    user,
  });
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  // TO-DO validar contraseña base de datos
  if (password) {
    // Encriptar  la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, resto);

  res.json(user);
};

const usersPatch =
  ("/",
  (req, res = response) => {
    res.json({
      msg: "patch API controlador",
    });
  });

const usersDelete = async (req, res = response) => {
  const { id } = req.params;

  //  Fisicamente lo borramos
  // const user = await User.findByIdAndDelete(id); De esta forma eliminamos completamente el usuario de la DB

  const user = await User.findByIdAndUpdate(id, { estado: false }); // con este metodo eliminamos el usuario, pero mantenemos la DB, para posteriores datos relevantes, lo que hacemos es pasar el user a estado false

  res.json(user);
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
