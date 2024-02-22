import UpperBar from "@/components/UpperBar";
import navstyles from "@/styles/navstyles.module.css";
import styles from "@/styles/styles.module.css";
import InstructionBar from "@/components/InstructionBar";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import button from "@/styles/button.module.css";
import Swal from "sweetalert2";
import Button from "@/components/Button";
import configurationServices from "@/public/config/configurationServices";
import configurationPort from "@/public/config/configurationPort";

export default function UpdateTest() {
    const router = useRouter();
    const basePath = configurationServices.url + configurationPort.port;
    let section;
    let information;
    /*------------------- ESTADOS -------------------*/
    const [nombreTest, setNombreTest] = useState('');
    const [seccion, setSeccion] = useState('');
    const [oldPreguntas, setOldPreguntas] = useState([]); // Preguntas que ya tiene la evaluación
    const [newPreguntas, setNewPreguntas] = useState([]);
    const [info, setInfo] = useState(information);
    const [nombreActual, setNombreActual] = useState('');
    const [seccionActual, setSeccionActual] = useState('');
    /* Estados para los arrays */
    const [secciones, setSecciones] = useState([]);
    const [preguntas, setPreguntas] = useState([]);
    /*------------------- EFECTOS -------------------*/
    useEffect(() => {
        getTestNameById();
        getSecciones();
        getCurrentInformation();
        getPreguntasByIdTest();
        showInstructions();
        setNombreTest(nombreActual);
        setSeccion(seccionActual);
    }, []);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            information = sessionStorage.getItem("dataToPass");
            setInfo(information);
        } else {
            router.push('/modulos').then(r => console.log(r));
        }
    }, []);
    /*------------------- FUNCIONES -------------------*/
    const getTestNameById = () => {
        axios({
            method: 'post',
            data: {
                id_test: information,
            },
            withCredentials: true,
            url: basePath + '/getTestNameById',
        }).then(res => {
            console.log("Nombre del test", res.data);
            setNombreTest(res.data[0].nombre_test);
        }).catch(err => {
            console.log(err);
        });
    }
    const clearFields = () => {
        setNombreTest('');
        setSeccion('');
        setNewPreguntas([]);
    }
    // Manejar el cambio de archivos para Información
    const getSecciones = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: basePath + '/getSections',
        }).then((res) => {
            setSecciones(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    const getCurrentInformation = () => {
        axios({
            method: "post",
            withCredentials: true,
            data: {
                id_test: information
            },
            url: basePath + '/getCurrentInformation',
        }).then((res) => {
            setNombreActual(res.data[0].nombre_test);
            setSeccionActual(res.data[0].nombre_seccion);
            setNombreTest(res.data[0].nombre_test);
            setSeccion(res.data[0].nombre_seccion)
        }).catch((err) => {
            console.log(err);
        })
    }
    const getPreguntasByIdTest = () => {
        axios({
            method: "post",
            withCredentials: true,
            data: {
                id_test: information
            },
            url: basePath + '/getPreguntasByIdTest'
        }).then((res) => {
            setOldPreguntas(res.data);
            setNewPreguntas(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    const setNombreSeccion = (e) => {
        setSeccion(e.target.value);
    }
    const getPreguntasBySeccion = () => {
        axios({
            method: "post",
            withCredentials: true,
            data: {
                seccion: section
            },
            url: basePath + "/getPreguntasBySeccion",
        }).then((res) => {
            setPreguntas(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    const addQuestionToTest = (pregunta) => {
        if (newPreguntas.length < 10) {
            setNewPreguntas([...newPreguntas, pregunta]);
        } else {
            Swal.fire({
                icon: 'warning',
                title: "¡No puedes agregar más de 10 preguntas a la Evaluación!",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(4,187,3,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    const deleteQuestionFromTest = (pregunta) => {
        setNewPreguntas(newPreguntas.filter((newPregunta) => newPregunta.id_pregunta !== pregunta.id_pregunta));
    }
    const updateTest = () => {
        if (nombreTest === '' && seccion === '' && newPreguntas.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: "Llena todos los campos antes de crear la Evaluación",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(4,187,3,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        } else if (nombreTest === '' && seccion !== '' && newPreguntas.length > 0) {
            Swal.fire({
                icon: 'warning',
                title: "Dale un nombre a la Evaluación antes de crearla",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(4,187,3,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        } else if (newPreguntas.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: "Agrega preguntas antes de crear la Evaluación",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(4,187,3,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        } else if (newPreguntas.length < 3) {
            Swal.fire({
                icon: 'warning',
                title: "Agrega al menos 3 preguntas antes de crear la Evaluación",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(4,187,3,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            axios({
                method: "post",
                withCredentials: true,
                data: {
                    id_test: info,
                    nombre: nombreTest,
                    seccion: seccion,
                    viejasPreguntas: oldPreguntas,
                    nuevasPreguntas: newPreguntas
                },
                url: basePath + "/updateTest",
            }).then((res) => {
                console.log(res);
                if (res.data.message === "Test actualizado correctamente") {
                    let timerInterval;
                    Swal.fire({
                        icon: 'success',
                        title: "¡Evaluación actualizada Correctamente!",
                        timer: 2500,
                        timerProgressBar: true,
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        },
                        willClose: () => {
                            clearInterval(timerInterval);
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log("I was closed by the timer");
                        }
                    });
                    clearFields();
                    setTimeout(() => {
                        router.push("/read/readTest");
                    }, 3000);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    const showInstructions = () => {
        Swal.fire({
            icon: "info",
            html: "<div>\n" +
                "                <h5>Paso 1</h5>\n" +
                "                <p>Dale un <strong>Nombre</strong> a la Evaluación. Recuerda que este debe ser lo suficientemente\n" +
                "                    descriptivo para poder identificarlo.</p>\n" +
                "                <h5>Paso 2</h5>\n" +
                "                <p>Selecciona la <strong>Sección</strong> a la que pertenece la Evaluación. Una vez selecciones\n" +
                "                    la sección, aparecerán preguntas asociadas a la sección en la <strong>Lista de Preguntas</strong>.\n" +
                "                </p>\n" +
                "                <h5>Paso 3</h5>\n" +
                "                <p>Dale clic en el botón con símbolo de <strong>+</strong> al lado izquierdo de cada pregunta para\n" +
                "                    agregar la pregunta a las <strong>Preguntas de la Evaluación</strong>.</p>\n" +
                "                <p>Puedes eliminar una pregunta de las <strong>Preguntas de la Evaluación</strong> dando clic en el\n" +
                "                    botón con símbolo de <strong>-</strong> al lado izquierdo de cada pregunta.</p>\n" +
                "                <h5>Paso 4</h5>\n" +
                "                <p>Una vez hayas editado los campos, dale clic al botón <strong>Actualizar Evaluación</strong>.</p>" +
                "            </div>",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(4,187,3,0.75)",
            footer: "Puedes volver a ver estas instrucciones dando clic en el botón de información en la parte " +
                "superior derecha de la pantalla",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const confirmGetBack = () => {
        Swal.fire({
            title: '¿Estás seguro que quieres regresar?',
            text: "¡Todos los cambios se perderán!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgba(255,67,49)',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Sí, quiero regresar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/read/readTest');
            }
        })
    }
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar color={navstyles.upper_bar_green}/>
            <InstructionBar confirmation={confirmGetBack}
                            instruction={`Actualiza una Evaluación`}
                            information={showInstructions}
                            info_color={button.btn_green}
                            hiddenHome={`hidden`}/>
            <div className={`container-fluid px-5`}>
                <div className={`row`}>
                    <div className={`col-6`}>
                        <h5>Nombre de la Evaluación</h5>
                        <input type="text"
                               value={nombreTest}
                               onChange={(e) => setNombreTest(e.target.value)}
                               className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}/>
                    </div>
                    <div className={`col-6`}>
                        <h5>Sección a la que pertenece la Evaluación</h5>
                        <select value={seccion}
                                onChange={(e) => {
                                    setNombreSeccion(e);
                                    section = e.target.value;
                                    getPreguntasBySeccion();
                                }
                                }
                                className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}>
                            <option value={`${seccionActual}`}>{seccionActual}</option>
                            {secciones.map((seccion) => (
                                <option key={seccion.id_seccion} value={seccion.nombre_seccion}>
                                    {seccion.nombre_seccion}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <br/>
                <div className={`container-fluid p-0`}>
                    <div className={`row justify-content-around`}>
                        <div className={`col-5 p-0`}>
                            <h5>Lista de Preguntas</h5>
                            <div className={`border-1 border-black shadow-md rounded-2xl p-3 bg-white 
                        ${styles.overflow_container_test2}`}>
                                {preguntas.map((pregunta) => (
                                    <div key={pregunta.id_pregunta}>
                                        <div className={`container-fluid px-5`}>
                                            <div className={`row d-flex py-2 px-5 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_green}`}>
                                                <div className={`col-1 flex justify-end self-center`}>
                                                    <button onClick={() => addQuestionToTest(pregunta)}
                                                            className={`${styles.add_btn} py-2 px-3 font-bold`}>
                                                        +
                                                    </button>
                                                </div>
                                                <div className={`col-10 self-center`}>
                                                    <div className={`font-medium text-lg`}>
                                                        {pregunta.pregunta}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                        <div className={`col-5 p-0`}>
                            <h5>Preguntas de la Evaluación</h5>
                            <div className={`border-1 border-black shadow-md rounded-2xl p-3 bg-white
                        ${styles.overflow_container_test2}`}>
                                {newPreguntas.map((pregunta) => (
                                    <div key={pregunta.id_pregunta}>
                                        <div className={`container-fluid px-5`}>
                                            <div className={`row d-flex py-2 px-5 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_green}`}>
                                                <div className={`col-1 flex justify-end self-center`}>
                                                    <button onClick={() => {
                                                        deleteQuestionFromTest(pregunta)
                                                    }}
                                                            className={`${styles.minus_btn} py-2 px-3 font-bold h-fit`}>
                                                        -
                                                    </button>
                                                </div>
                                                <div className={`col-10 self-center`}>
                                                    <div className={`font-medium text-lg`}>
                                                        {pregunta.pregunta}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className={`flex justify-center`}>
                    <div className={`w-25`}>
                        <Button text={`Actualizar Evaluación`} instruction={updateTest}
                                bg_color={button.btn_green}></Button>
                    </div>
                </div>
                <br/>
            </div>
        </main>
    )
}