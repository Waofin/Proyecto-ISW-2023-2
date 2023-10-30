"use strict";
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const path = require("path");

// Crear la conexión a MongoDB
const conn = mongoose.createConnection(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Inicializar gridfs
let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Crear el almacenamiento
const storage = new GridFsStorage({
  url: process.env.DB_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = Date.now() + path.extname(file.originalname);
      const fileInfo = {
        filename: filename,
        bucketName: "uploads",
      };
      resolve(fileInfo);
    });
  },
});

// Crear el filtro de archivos
const fileFilter = (req, file, cb) => {
  // Tipos de archivo permitidos
  const filetypes = /jpeg|jpg|png|pdf/;
  // Comprobar extensión
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Comprobar tipo mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Solo se permiten imágenes (jpeg, jpg, png) y archivos PDF");
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter, 
});

exports.uploadFile = (req, res) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    res.status(200).json({ message: "Archivo subido con éxito" });
  });
};
