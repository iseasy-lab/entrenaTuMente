require('dotenv').config({path:'./.env'});
const express = require('express');
const boddParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const db = require('./db');
const multer = require("multer");

const app = express();

const path = process.env.REACT_APP_BACKEND_URL;
const frontEndPort = process.env.REACT_APP_FRONTEND_PORT;
const port = process.env.REACT_APP_BACKEND_PORT;

app.use(boddParser.urlencoded({extended: true}));
app.use(boddParser.json());
app.use(expressSession({secret: 'mySecretKey', resave: false, saveUninitialized: false}));

const completePath = path + ':' + frontEndPort;
app.use(cors({
    origin: completePath,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser('mySecretKey'));

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.get('/', (req, res) => {
    res.send("Hello World");
})
app.listen(port, () => {
    console.log(completePath);
    console.log('Server started at' + port + ' port');
})


/* Función para obtener el usuario de la sesión */
app.get('/getUser', (req, res) => {
    if (req.isAuthenticated()) {
        // Si el usuario está autenticado, envía la información del usuario
        res.send({
            id: req.user.id,  // Asumiendo que el ID del usuario está disponible en req.user
            username: req.user.username,
            name: req.user.name
        });
    } else {
        // Si el usuario no está autenticado, envía un objeto vacío o un código de error
        res.status(401).send({message: "Usuario no autenticado"});
    }
})
/* Función para el Login */
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            throw err;
        }
        if (!user) {
            res.send('Este usuario no existe');
        }
        if (user) {
            req.login(user, (err) => {
                if (err) {
                    throw err;
                }
                res.send("Usuario logeado");
            })
        }
    })(req, res, next)
});
/* Función para cerrar sesión */
app.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.clearCookie('connect.sid');
        res.send({message: "Sesión cerrada exitosamente"});
    });
});
/* Funciones de registro */
app.post('/registrarEducador', (req, res) => {
    const {usuario, user_password, nombre, apellido} = req.body;
    const querySelect = "SELECT * FROM educador WHERE usuario = ?"
    db.query(querySelect, [usuario], (err, result) => {
        if (err) { /* La consulta no pudo ejecutarse */
            throw err;
        }
        if (result.length > 0) { /* La consulta encontró un dato en la base */
            res.send({message: 'El usuario ya se encuentra registrado'});
        }
        if (result.length === 0) {
            const queryInsert = "INSERT INTO educador (usuario, user_password, nombre, apellido) VALUES (?,?,?,?)";
            db.query(queryInsert, [usuario, user_password, nombre, apellido], (err, result) => {
                if (err) {
                    throw err;
                }
                res.send({message: "Usuario creado correctamente"});
            });
        }
    });
});
app.post('/crearNinio', (req, res) => {
    const id_educador = req.user.id;
    console.log("id_educador: ", id_educador);
    const {nombre, edad} = req.body;
    console.log("nombre: ", nombre);
    console.log("edad: ", edad);
    const querySelect = "SELECT * FROM niño WHERE nombre = ?"
    db.query(querySelect, [nombre], (err, result) => {
        if (err) { /* La consulta no pudo ejecutarse */
            throw err;
        }
        if (result.length > 0) { /* La consulta encontró un niño en la base */
            const querySelect2 = 'SELECT * FROM educador_niño WHERE id_educador = ? AND id_niño = ?';
            db.query(querySelect2, [id_educador, result[0].id_ninio], (err, result3) => {
                if (err) {
                    throw err;
                }
                if (result3.length > 0) {
                    res.send({message: 'Este niño ya se encuentra registrado'});
                }
                if (result3.length === 0) {
                    const queryInsert2 = 'INSERT INTO educador_niño (id_educador, id_niño) VALUES (?, ?)';
                    db.query(queryInsert2, [id_educador, result[0].id_ninio], (err, result4) => {
                        if (err) {
                            throw err;
                        }
                        res.send({message: 'Niño creado correctamente'});
                    })
                }
            })
        }
        if (result.length === 0) {
            const queryInsert = "INSERT INTO niño (nombre, edad) VALUES (?,?)";
            db.query(queryInsert, [nombre, edad], (err, result) => {
                if (err) {
                    throw err;
                }
                // Se selecciona el id del niño ingresado recientemente
                const querySelectNinio = 'SELECT id_ninio FROM niño WHERE nombre = ?';
                db.query(querySelectNinio, [nombre], (err, result2) => {
                    if (err) {
                        throw err;
                    }
                    const id_ninio = result2[0].id_ninio;
                    // Se inserta el id del educador y del niño en la tabla auxiliar
                    const queryInsertAuxTable = 'INSERT INTO educador_niño (id_educador, id_niño) VALUES (?, ?)';
                    db.query(queryInsertAuxTable, [id_educador, id_ninio], (err, result2) => {
                        if (err) {
                            throw err;
                        }
                    })
                });
                res.send({message: "Niño creado correctamente"});
            });
        }
    });
});
//const upload = multer({storage: storage}).array("files", 5);
//const upload = multer({dest: path.join(__dirname, 'images')}).array('imagen_$',5);
// Configuración de multer para guardar archivos en una carpeta
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images"); // La carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        const index = req.body.imagenIndex || 0; // Obtener el índice del campo imagenIndex
        cb(null, `${file.originalname}`); // ${path.extname(file.originalname)} Esta es la extensión del archivo
    },
});
const upload = multer({storage}).array('imagenes', 100);

app.post('/uploadQuestion', upload, (req, res) => {
    const pregunta = req.body;
    if (pregunta.idSection === '3' || pregunta.idSection === '6' || pregunta.idSection === '10') {
        pregunta.imagenIndex.pop();
        pregunta.respuestaCorrecta.pop();
        pregunta.fila.pop();
        pregunta.esMuestra.pop();
        req.files.pop();
    }
    const querySelectPregunta = 'SELECT * FROM pregunta WHERE pregunta = ?'; // Consulta para verificar si la pregunta ya se encuentra registrada
    db.query(querySelectPregunta, [pregunta.pregunta], (err, result) => {
        if (err) {
            throw err;
        }
        if (result.length > 0) {
            res.send({message: 'Esta pregunta ya se encuentra registrada'});
        }
        if (result.length === 0) {
            const queryInsertQuestion = 'INSERT INTO pregunta (id_seccion, pregunta) VALUES (?,?)';
            db.query(queryInsertQuestion, [pregunta.idSection, pregunta.pregunta], (err, result) => {
                if (err) {
                    throw err;
                }
                const querySelectQuestion = 'SELECT id_pregunta FROM pregunta WHERE pregunta = ?';
                db.query(querySelectQuestion, [pregunta.pregunta], (err, result1) => {
                    if (err) {
                        throw err;
                    }
                    const id_pregunta = result1[0].id_pregunta;
                    const respuestas = req.files;
                    const querySelectImage = 'SELECT * FROM respuesta WHERE imagen = ?'; // Consulta para verificar si la imagen ya se encuentra registrada
                    pregunta.imagenIndex.forEach((img, index) => {
                        const muestra = pregunta.esMuestra[index];
                        db.query(querySelectImage, [respuestas[index].originalname], (err, result2) => {
                            if (err) {
                                throw err;
                            }
                            if (result2.length > 0) { /*Si la imagen ya existe*/
                                if (muestra === '0') {
                                    const queryInsertQuestionAnswer = 'INSERT INTO pregunta_respuesta (id_pregunta, id_respuesta, respuesta_correcta, numero_fila) VALUES (?,?,?,?)';
                                    db.query(queryInsertQuestionAnswer, [id_pregunta, result2[0].id_respuesta, pregunta.respuestaCorrecta[index], pregunta.fila[index]], (err, result3) => {
                                        if (err) {
                                            throw err;
                                        }
                                    })
                                } else { /*Estoy insertando una muestra*/
                                    const querySelectMuestra = 'SELECT * FROM muestra WHERE imagen = ?'; /*Verificar si la muestra ya existe*/
                                    db.query(querySelectMuestra, [respuestas[index].originalname], (err, result3) => {
                                        if (err) {
                                            throw err;
                                        }
                                        if (result3.length > 0) {
                                            const queryInsertQuestionMuestra = 'INSERT INTO pregunta_muestra (id_pregunta, id_muestra) VALUES (?,?)';
                                            db.query(queryInsertQuestionMuestra, [id_pregunta, result3[0].id_muestra], (err, result4) => {
                                                if (err) {
                                                    throw err;
                                                }
                                            })
                                        } else {
                                            const queryInsertMuestra = 'INSERT INTO muestra (imagen) VALUES (?)';
                                            db.query(queryInsertMuestra, [respuestas[index].originalname], (err, result4) => {
                                                if (err) {
                                                    throw err;
                                                }
                                                const queryInsertQuestionMuestra = 'INSERT INTO pregunta_muestra (id_pregunta, id_muestra) VALUES (?,?)';
                                                db.query(queryInsertQuestionMuestra, [id_pregunta, result4.insertId], (err, result5) => {
                                                    if (err) {
                                                        throw err;
                                                    }
                                                })
                                            })
                                        }
                                    })
                                }
                            } else { /* Si la imagen no existe */
                                if (muestra === '0') {
                                    const queryInsertImage = 'INSERT INTO respuesta (imagen) VALUES (?)';
                                    db.query(queryInsertImage, [respuestas[index].originalname], (err, result4) => {
                                        if (err) {
                                            throw err;
                                        }
                                        const queryInsertQuestionAnswer = 'INSERT INTO pregunta_respuesta (id_pregunta, id_respuesta, respuesta_correcta, numero_fila) VALUES (?,?,?,?)';
                                        db.query(queryInsertQuestionAnswer, [id_pregunta, result4.insertId, pregunta.respuestaCorrecta[index], pregunta.fila[index]], (err, result5) => {
                                            if (err) {
                                                throw err;
                                            }
                                        })
                                    })
                                } else {
                                    const queryInsertImage = 'INSERT INTO muestra (imagen) VALUES (?)';
                                    db.query(queryInsertImage, [respuestas[index].originalname], (err, result4) => {
                                        if (err) {
                                            throw err;
                                        }
                                        const queryInsertQuestionMuestra = 'INSERT INTO pregunta_muestra (id_pregunta, id_muestra) VALUES (?,?)';
                                        db.query(queryInsertQuestionMuestra, [id_pregunta, result4.insertId], (err, result5) => {
                                            if (err) {
                                                throw err;
                                            }
                                        })
                                    })
                                }
                            }
                        })
                    })
                    res.send({message: "Pregunta creada correctamente"});
                })
            })
        }
    });
})

app.post('/createTest', upload, (req, res) => {
    const {nombre, seccion, preguntas} = req.body;
    const querySelect = 'SELECT * FROM test WHERE nombre_test = ?';
    db.query(querySelect, [nombre], (err, result1) => {
        if (err) {
            throw err;
        }
        if (result1.length > 0) {
            res.send({message: 'Este test ya ha sido creado'});
        }
        if (result1.length === 0) {
            /* Primero, obtener el id de la sección*/
            const querySelectSection = 'SELECT * FROM seccion WHERE nombre_seccion = ?';
            db.query(querySelectSection, [seccion], (err, result2) => {
                if (err) {
                    throw err;
                }
                const id_seccion = result2[0].id_seccion;
                const queryInsert = 'INSERT INTO test (nombre_test, id_seccion) VALUES (?,?)';
                db.query(queryInsert, [nombre, id_seccion], (err, result2) => {
                    if (err) {
                        throw err;
                    }
                    const querySelectTest = 'SELECT id_test FROM test WHERE nombre_test = ?';
                    db.query(querySelectTest, [nombre], (err, result3) => {
                        if (err) {
                            throw err;
                        }
                        const id_test = result3[0].id_test;
                        const querySelectQuestion = 'SELECT * FROM pregunta WHERE pregunta = ?';
                        preguntas.forEach((pregunta, index) => {
                            db.query(querySelectQuestion, [pregunta.pregunta], (err, result4) => {
                                if (err) {
                                    throw err;
                                }
                                if (result4.length > 0) {
                                    const queryInsertTestQuestion = 'INSERT INTO test_pregunta (id_test, id_pregunta) VALUES (?,?)';
                                    db.query(queryInsertTestQuestion, [id_test, result4[0].id_pregunta], (err, result5) => {
                                        if (err) {
                                            throw err;
                                        }
                                    })
                                }
                            })
                        })
                        res.send({message: "Test creado correctamente"});
                    })
                })
            })
        }
    })
})
/* Funciones de Lectura */
app.post('/getTestNameById', (req, res) => {
    const id_test = req.body.id_test;
    console.log(id_test);
    const query = 'SELECT nombre_test FROM test WHERE id_test = ?';
    db.query(query, [id_test], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
});
app.get('/getChildren', (req, res) => {
    const id_educador = req.user.id;
    const query = 'SELECT niño.id_ninio, niño.nombre, niño.edad ' +
        'FROM niño JOIN educador_niño ' +
        'ON niño.id_ninio = educador_niño.id_niño ' +
        'WHERE educador_niño.id_educador = ? ' +
        'ORDER BY niño.edad;';
    db.query(query, [id_educador], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.post('/getChildrenById', (req, res) => {
    const id = req.body.id_ninio;
    const querySelect = 'SELECT * FROM niño WHERE id_ninio = ?';
    db.query(querySelect, [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
})
app.get('/getSections', (req, res) => {
    const query = 'SELECT * FROM seccion';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.post('/getPreguntasBySeccion', (req, res) => {
    const seccion = req.body.seccion;
    const query = 'SELECT pregunta.id_pregunta, pregunta.pregunta FROM pregunta JOIN seccion ON pregunta.id_seccion = seccion.id_seccion ' +
        'WHERE seccion.nombre_seccion = ?';
    db.query(query, [seccion], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.get('/getTests', (req, res) => {
    const query = 'SELECT * FROM test';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});
app.get('/getInformacionTests', (req, res) => {
    const query = 'SELECT * FROM test WHERE id_seccion = 1 ORDER BY nombre_test';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
})
app.get('/getSemejanzasTests', (req, res) => {
    const query = 'SELECT * FROM test WHERE id_seccion = 2 ORDER BY nombre_test';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})
app.get('/getVocabularioTests', (req, res) => {
    const query = 'SELECT * FROM test WHERE id_seccion = 3';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })

})
app.get('/getComprensionTests', (req, res) => {
    const query = 'SELECT * FROM test WHERE id_seccion = 4';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})
app.get('/getDibujosTests', (req, res) => {
    const query = 'SELECT * FROM test WHERE id_seccion = 5';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})
app.get('/getNombresTests', (req, res) => {
    const query = 'SELECT * FROM test WHERE id_seccion = 6';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})
app.get('/getMatricesTests', (req, res) => {
    const query = 'SELECT * FROM test WHERE id_seccion = 7';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})
app.get('/getConceptosTests', (req, res) => {
    const query = 'SELECT * FROM test WHERE id_seccion = 8';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})
app.get('/getReconocimientoTests', (req, res) => {
    const query = 'SELECT * FROM test WHERE id_seccion = 9';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})
app.get('/getBusquedaTests', (req, res) => {
    const query = 'SELECT * FROM test WHERE id_seccion = 10';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})

app.get('/getInformacionQuestions', (req, res) => {
    const query = 'SELECT * FROM pregunta WHERE id_seccion = 1 ORDER BY pregunta';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
})
app.get('/getSemejanzasQuestions', (req, res) => {
    const query = 'SELECT * FROM pregunta WHERE id_seccion = 2 ORDER BY pregunta';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
})
app.get('/getVocabularioQuestions', (req, res) => {
    const query = 'SELECT * FROM pregunta WHERE id_seccion = 3 ORDER BY pregunta';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
})
app.get('/getComprensionQuestions', (req, res) => {
    const query = 'SELECT * FROM pregunta WHERE id_seccion = 4 ORDER BY pregunta';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
})
app.get('/getDibujosQuestions', (req, res) => {
    const query = 'SELECT * FROM pregunta WHERE id_seccion = 5 ORDER BY pregunta';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
})
app.get('/getNombresQuestions', (req, res) => {
    const query = 'SELECT * FROM pregunta WHERE id_seccion = 6 ORDER BY pregunta';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
})
app.get('/getMatricesQuestions', (req, res) => {
    const query = 'SELECT * FROM pregunta WHERE id_seccion = 7 ORDER BY pregunta';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
})
app.get('/getConceptosQuestions', (req, res) => {
    const query = 'SELECT * FROM pregunta WHERE id_seccion = 8 ORDER BY pregunta';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
})
app.get('/getReconocimientoQuestions', (req, res) => {
    const query = 'SELECT * FROM pregunta WHERE id_seccion = 9 ORDER BY pregunta';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
})
app.get('/getBusquedaQuestions', (req, res) => {
    const query = 'SELECT * FROM pregunta WHERE id_seccion = 10 ORDER BY pregunta';
    db.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
})
app.post('/startTest', (req, res) => {
    const id_ninio = req.body.id_ninio;
    const id_test = req.body.id_test;
    const querySelect = 'SELECT * FROM test_ninio WHERE id_ninio = ? AND id_test = ?';
    db.query(querySelect, [id_ninio, id_test], (err, result) => {
        if (err) {
            throw err;
        }
        if (result.length > 0) {
            res.send({message: 'Test iniciado correctamente'});
        }
        if (result.length === 0) {
            const queryInsert = 'INSERT INTO test_ninio (id_test, id_ninio) VALUES (?, ?)';
            db.query(queryInsert, [id_test, id_ninio], (err, result) => {
                if (err) {
                    throw err;
                }
                res.send({message: 'Test iniciado correctamente'});
            })
        }
    })
})
app.post('/getTestSession', (req, res) => {
    const id_ninio = req.body.id_ninio;
    const id_test = req.body.id_test;
    const querySelect = 'SELECT * FROM test_ninio WHERE id_ninio = ? AND id_test = ?';
    db.query(querySelect, [id_ninio, id_test], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})
app.post('/getNinioTestById', (req, res) => {
    const id_test = req.body.id_test;
    const querySelect = 'SELECT test.nombre_test, test_ninio.id_ninio, test_ninio.puntaje, niño.nombre, seccion.nombre_seccion, seccion.informacion\n' +
        'FROM test_ninio JOIN test ON test_ninio.id_test = test.id_test\n' +
        'JOIN seccion ON test.id_seccion = seccion.id_seccion\n' +
        'JOIN niño ON test_ninio.id_ninio = niño.id_ninio\n' +
        'WHERE test_ninio.id_t_n = ?';
    db.query(querySelect, [id_test], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})
app.post('/goInstructions', (req, res) => {
    const id_test = req.body.id_test;
    const querySelect = 'SELECT * FROM test_ninio WHERE id_test = ?';
    db.query(querySelect, [id_test], (err, result) => {
        if (err) {
            throw err;
        }
        if (result.length > 0) {
            res.send({message: 'Test iniciado correctamente'});
        }
        if (result.length === 0) {
            res.send({message: 'Test no iniciado'});
        }
    })
});
app.post('/getQuestionsbyTestId', (req, res) => {
    const id_test = req.body.id;
    const id_ninio = req.body.id_ninio;
    const querySelect = 'SELECT pregunta.id_pregunta, pregunta.pregunta, test_ninio.puntaje\n' +
        'FROM test JOIN test_pregunta ON test.id_test = test_pregunta.id_test\n' +
        'JOIN pregunta ON test_pregunta.id_pregunta = pregunta.id_pregunta\n' +
        'JOIN test_ninio ON test.id_test = test_ninio.id_test\n' +
        'WHERE test_pregunta.id_test = ? AND test_ninio.id_ninio = ?\n' +
        'ORDER BY pregunta.pregunta';
    db.query(querySelect, [id_test, id_ninio], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})
app.post('/getAnswersbyQuestionId', (req, res) => {
    const id_pregunta = req.body.id;
    const querySelect = 'SELECT respuesta.id_respuesta, respuesta.imagen , pregunta_respuesta.respuesta_correcta, pregunta_respuesta.numero_fila\n' +
        'FROM pregunta JOIN pregunta_respuesta ON pregunta.id_pregunta = pregunta_respuesta.id_pregunta\n' +
        'JOIN respuesta ON respuesta.id_respuesta = pregunta_respuesta.id_respuesta\n' +
        'WHERE pregunta.id_pregunta = ? \n' +
        'ORDER BY respuesta.imagen';
    db.query(querySelect, [id_pregunta], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})
app.post('/getSamplesByQuestionId', (req, res) => {
    const id_pregunta = req.body.id;
    const querySelect = 'SELECT muestra.imagen\n' +
        'FROM pregunta JOIN pregunta_muestra ON pregunta.id_pregunta = pregunta_muestra.id_pregunta\n' +
        'JOIN muestra ON muestra.id_muestra = pregunta_muestra.id_muestra\n' +
        'WHERE pregunta.id_pregunta = ?';
    db.query(querySelect, [id_pregunta], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})
app.post('/getCurrentInformation', (req, res) => {
    const id_test = req.body.id_test;
    const querySelect = 'SELECT test.nombre_test, seccion.nombre_seccion\n' +
        'FROM test JOIN seccion ON test.id_seccion = seccion.id_seccion\n' +
        'WHERE test.id_test = ?';
    db.query(querySelect, [id_test], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})
app.post('/getPreguntasByIdTest', (req, res) => {
    const id_test = req.body.id_test;
    const querySelect = 'SELECT pregunta.id_pregunta, pregunta.pregunta from test_pregunta\n' +
        'JOIN pregunta ON test_pregunta.id_pregunta = pregunta.id_pregunta\n' +
        'WHERE id_test = ? ' +
        'ORDER BY pregunta.pregunta';
    db.query(querySelect, [id_test], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})
app.post('/getScoreTable', (req, res) => {
    const id_test = req.body.id_test;
    const id_educador = req.user.id;
    const querySelect = 'SELECT niño.nombre, niño.edad, test_ninio.puntaje\n' +
        'FROM test_ninio JOIN niño ON test_ninio.id_ninio = niño.id_ninio\n' +
        'JOIN educador_niño ON test_ninio.id_ninio = educador_niño.id_niño\n' +
        'WHERE test_ninio.id_test = ? AND educador_niño.id_educador = ?\n' +
        'ORDER BY test_ninio.puntaje DESC;';
    db.query(querySelect, [id_test, id_educador], (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    })
})
/* Funciones de actualización */
app.post('/updateChildren', (req, res) => {
    const {id_ninio, nombre, edad} = req.body;
    // Construye la consulta de actualización
    const queryUpdate = `UPDATE niño SET nombre = ?, edad = ? WHERE id_ninio = ?;`;
    // Ejecuta la consulta de actualización con los valores correspondientes
    db.query(queryUpdate, [nombre, edad, id_ninio], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({message: "Niño actualizado exitosamente"});
    });
});
app.post('/finishTest', (req, res) => {
    const id_test = req.body.id_test;
    const id_ninio = req.body.id_ninio;
    const puntaje = req.body.puntaje;
    const queryUpdate = 'UPDATE test_ninio SET puntaje = ? WHERE id_test = ? AND id_ninio = ?';
    db.query(queryUpdate, [puntaje, id_test, id_ninio], (err, result) => {
        if (err) {
            throw err;
        }
        res.send({message: 'Test finalizado correctamente'});
    })
})
app.post('/updateEducador', (req, res) => {
    const {usuario, user_password} = req.body;
    // Construye la consulta de actualización
    const queryUpdate = `UPDATE educador SET user_password = ? WHERE usuario = ?;`;
    // Ejecuta la consulta de actualización con los valores correspondientes
    db.query(queryUpdate, [user_password, usuario], (err, result) => {
        if (err) {
            throw err;
        }
        if (result.changedRows > 0) {
            res.send({message: "Contraseña actualizada exitosamente"});
        } else {
            res.send({message: "¡Este usuario no existe!"});
        }
    });
})
app.post('/updateTest', (req, res) => {
    const {id_test, nombre, seccion, viejasPreguntas, nuevasPreguntas} = req.body;
    console.log("id_test: ", id_test);
    console.log("nombre: ", nombre);
    console.log("seccion: ", seccion);
    console.log("Viejas preguntas: ", viejasPreguntas);
    console.log("Nuevas preguntas: ", nuevasPreguntas);
    const querySelect = 'SELECT id_seccion FROM seccion WHERE nombre_seccion = ?';
    db.query(querySelect, [seccion], (err, result) => {
        if (err) {
            throw err;
        }
        const id_seccion = result[0].id_seccion;
        const queryUpdate = 'UPDATE test SET nombre_test = ?, id_seccion = ? WHERE id_test = ?';
        db.query(queryUpdate, [nombre, id_seccion, id_test], (err, result) => {
            if (err) {
                throw err;
            }
            viejasPreguntas.forEach((pregunta) => {
                const queryDelete = 'DELETE FROM test_pregunta WHERE id_test = ? AND id_pregunta = ?';
                db.query(queryDelete, [id_test, pregunta.id_pregunta], (err, result) => {
                    if (err) {
                        throw err;
                    }
                })
            })
            nuevasPreguntas.forEach((pregunta) => {
                const queryInsert = 'INSERT INTO test_pregunta (id_test, id_pregunta) VALUES (?, ?)';
                db.query(queryInsert, [id_test, pregunta.id_pregunta], (err, result) => {
                    if (err) {
                        throw err;
                    }
                })
            })
            res.send({message: 'Test actualizado correctamente'});
        })
    })
})
/* Funciones de eliminación */
app.post('/deleteChild', (req, res) => {
    const id_educador = req.user.id;
    const id_ninio = req.body.id_ninio;
    const queryDelete = 'DELETE FROM educador_niño WHERE id_educador = ? AND id_niño = ?';
    db.query(queryDelete, [id_educador, id_ninio], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json({message: 'Niño eliminado exitosamente'});
    })
})
app.post('/deleteTest', (req, res) => {
    const id_test = req.body.id_test;
    const queryDelete = 'DELETE FROM test_ninio WHERE id_test = ?';
    db.query(queryDelete, [id_test], (err, result) => {
        if (err) {
            throw err;
        }
        const queryDelete2 = 'DELETE FROM test_pregunta WHERE id_test = ?';
        db.query(queryDelete2, [id_test], (err, result) => {
            if (err) {
                throw err;
            }
            const queryDelete3 = 'DELETE FROM test WHERE id_test = ?';
            db.query(queryDelete3, [id_test], (err, result) => {
                if (err) {
                    throw err;
                }
                res.send({message: 'Test eliminado exitosamente'});
            })
        })
    })
})
app.post('/deleteQuestion', (req, res) => {
    const id_pregunta = req.body.id_pregunta;
    const queryDelete = 'DELETE FROM test_pregunta WHERE id_pregunta = ?';
    db.query(queryDelete, [id_pregunta], (err, result) => {
        if (err) {
            throw err;
        }
        const queryDelete2 = 'DELETE FROM pregunta_respuesta WHERE id_pregunta = ?';
        db.query(queryDelete2, [id_pregunta], (err, result) => {
            if (err) {
                throw err;
            }
            const queryDelete3 = 'DELETE FROM pregunta_muestra WHERE id_pregunta = ?';
            db.query(queryDelete3, [id_pregunta], (err, result) => {
                if (err) {
                    throw err;
                }
                const queryDelete4 = 'DELETE FROM pregunta WHERE id_pregunta = ?';
                db.query(queryDelete4, [id_pregunta], (err, result) => {
                    if (err) {
                        throw err;
                    }
                    res.send({message: 'Pregunta eliminada exitosamente'});
                })
            })
        })
    })
})