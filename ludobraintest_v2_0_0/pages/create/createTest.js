import UpperBar from "@/components/UpperBar";
import navstyles from "@/styles/navstyles.module.css";
import styles from "@/styles/styles.module.css";
import button from "@/styles/button.module.css";
import InstructionBar from "@/components/InstructionBar";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import Button from "@/components/Button";
import Swal from "sweetalert2";
import UseSpeechSynthesis from "@/effects/useSpeechSynthesis";
import useVoiceReader from "@/effects/useVoiceReader";
import configurationServices from "@/public/config/configurationServices";
import configurationPort from "@/public/config/configurationPort";

export default function CreateTest() {
    const router = useRouter();
    const basePath = configurationServices.url + configurationPort.port;
    let section;
    const {speak, speaking} = UseSpeechSynthesis();
    /*------------------- ESTADOS -------------------*/
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [nombreTest, setNombreTest] = useState('');
    const [seccion, setSeccion] = useState('');
    const [newPreguntas, setNewPreguntas] = useState([]);
    /* Estados para los arrays */
    const [secciones, setSecciones] = useState([]);
    const [preguntas, setPreguntas] = useState([]);
    /*------------------- EFECTOS -------------------*/
    useEffect(() => {
        getSecciones();
        showInstructions();
    }, []);
    const text = "Dale un nombre a la Evaluación,... " +
        "Luego, Selecciona la Sección a la que pertenece,... " +
        "Agrega preguntas dando clic al botón azul con el símbolo \"más\",... " +
        "Puedes quitar preguntas de la evaluación dando clic en el botón rojo con el símbolo \"menos\",..." +
        "Finalmente, dale clic al botón \"Crear Evaluación\"";
    useVoiceReader(text, isSpeaking);
    /*------------------- FUNCIONES -------------------*/
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
            url: basePath + "/getSections"
        }).then((res) => {
            setSecciones(res.data);
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
                title: "No puedes agregar más de 10 preguntas",
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
    const createTest = () => {
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
                    nombre: nombreTest,
                    seccion: seccion,
                    preguntas: newPreguntas
                },
                url: basePath + "/createTest",
            }).then((res) => {
                console.log(res);
                if (res.data.message === "Test creado correctamente") {
                    let timerInterval;
                    Swal.fire({
                        icon: 'success',
                        title: "¡Evaluación creada Correctamente!",
                        timer: 3000,
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
                        router.push('/read/readTest').then(r => console.log(r));
                        shutUp();
                    }, 3000);
                } else if (res.data.message === "Este test ya ha sido creado") {
                    Swal.fire({
                        icon: 'warning',
                        title: "Esta Evaluación ya ha sido creada",
                        confirmButtonText: "¡De acuerdo!",
                        confirmButtonColor: "rgba(4,187,3,0.75)",
                    }).then((result) => {
                        console.log("result", result);
                    }).catch((err) => {
                        console.log(err);
                    })
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
                "                <p>Una vez hayas agregado todas las preguntas, dale clic al botón <strong>Crear Evaluación</strong>.</p>" +
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
                router.push('/read/readTest').then(r => console.log(r));
                shutUp();
            }
        })
    }
    const hearVoice = () => {
        if (isSpeaking === false) {
            setIsSpeaking(true);
            if (!speaking) {
                do {
                    speak(text);
                } while (isSpeaking);
            }
        }
    };
    const shutUp = () => {
        if (isSpeaking === true) {
            setIsSpeaking(false);
        }
    }
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar color={navstyles.upper_bar_green}
                      silenceVoice={shutUp}/>
            <InstructionBar confirmation={confirmGetBack}
                            instruction={`Crea una nueva Evaluación`}
                            information={showInstructions}
                            info_color={button.btn_green}
                            voiceCommand={hearVoice}
                            silenceCommand={shutUp}
                            silenceVoice={shutUp}
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
                                }}
                                className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}>
                            <option value="">Selecciona una sección</option>
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
                                                            className={`${styles.add_btn} py-2 px-3 font-bold h-fit`}>
                                                        +
                                                    </button>
                                                </div>
                                                <div className={`col-11 self-center`}>
                                                    <div className={`font-medium`}>
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
                                            <div className={`row flex py-2 px-5 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_green}`}>
                                                <div className={`col-1 flex justify-end self-center`}>
                                                    <button onClick={() => {
                                                        deleteQuestionFromTest(pregunta)
                                                    }}
                                                            className={`${styles.minus_btn} py-2 px-3 font-bold h-fit`}>
                                                        -
                                                    </button>
                                                </div>
                                                <div className={`col-11 self-center`}>
                                                    <div className={`font-medium`}>
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
                        <Button text={`Crear Evaluación`} instruction={createTest} bg_color={button.btn_green}></Button>
                    </div>
                </div>
                <br/>
            </div>
        </main>
    )
}