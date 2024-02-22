import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import AddButton from "@/components/AddButton";
import styles from "@/styles/styles.module.css";
import navstyles from '@/styles/navstyles.module.css'
import button from '@/styles/button.module.css'
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UseSpeechSynthesis from "@/effects/useSpeechSynthesis";
import useVoiceReader from "@/effects/useVoiceReader";
import Image from "next/image";
import configurationServices from "@/public/config/configurationServices";
import configurationPort from "@/public/config/configurationPort";

export default function ReadPregunta() {
    const router = useRouter();
    const basePath = configurationServices.url + configurationPort.port;
    let section;
    const {speak, speaking} = UseSpeechSynthesis();
    /*------------------- ESTADOS -------------------*/
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [sectionSelected, setSectionSelected] = useState('');
    const [sections, setSections] = useState([]);
    // Estados para las preguntas
    const [informationQuestions, setInformationQuestions] = useState([]); // Estado para las preguntas de tipo Información
    const [semejanzasQuestions, setSemejanzasQuestions] = useState([]); // Estado para las preguntas de tipo Semejanzas
    const [vocabularioQuestions, setVocabularioQuestions] = useState([]); // Estado para las preguntas de tipo Vocabulario
    const [comprensionQuestions, setComprensionQuestions] = useState([]); // Estado para las preguntas de tipo Comprensión
    const [dibujosQuestions, setDibujosQuestions] = useState([]); // Estado para las preguntas de tipo Dibujos
    const [nombresQuestions, setNombresQuestions] = useState([]); // Estado para las preguntas de tipo Nombres
    const [matricesQuestions, setMatricesQuestions] = useState([]); // Estado para las preguntas de tipo Matrices
    const [conceptosQuestions, setConceptosQuestions] = useState([]); // Estado para las preguntas de tipo Conceptos
    const [reconocimientoQuestions, setReconocimientoQuestions] = useState([]); // Estado para las preguntas de tipo Reconocimiento
    const [busquedaQuestions, setBusquedaQuestions] = useState([]); // Estado para las preguntas de tipo Búsqueda
    // Estados para generar los títulos
    const [informationTitle, setInformationTitle] = useState(false);
    const [semejanzasTitle, setSemejanzasTitle] = useState(false);
    const [vocabularioTitle, setVocabularioTitle] = useState(false);
    const [comprensionTitle, setComprensionTitle] = useState(false);
    const [dibujosTitle, setDibujosTitle] = useState(false);
    const [nombresTitle, setNombresTitle] = useState(false);
    const [matricesTitle, setMatricesTitle] = useState(false);
    const [conceptosTitle, setConceptosTitle] = useState(false);
    const [reconocimientoTitle, setReconocimientoTitle] = useState(false);
    const [busquedaTitle, setBusquedaTitle] = useState(false);
    /*------------------- EFECTOS -------------------*/
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        getSections();
        showInstructions();
    }, []);
    const text = "¡Bienvenido al módulo de Administración de Preguntas!" +
        "Selecciona una sección para ver la lista de preguntas creadas,..." +
        "Dale clic al botón con el símbolo \"más\" que se encuentra en la parte superior central de la pantalla " +
        "para crear una nueva pregunta.";
    useVoiceReader(text, isSpeaking);
    /*------------------- FUNCIONES -------------------*/
    const getInformacionQuestions = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: basePath + "/getInformacionQuestions",
        }).then((res) => {
            if (res.data) {
                setInformationQuestions(res.data);
                if (res.data.length !== 0) {
                    setInformationTitle(true);
                }
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getSemejanzasQuestions = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: basePath + "/getSemejanzasQuestions",
        }).then((res) => {
            if (res.data) {
                setSemejanzasQuestions(res.data);
                if (res.data.length !== 0) {
                    setSemejanzasTitle(true);
                }
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getVocabularioQuestions = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: basePath + "/getVocabularioQuestions",
        }).then((res) => {
            if (res.data) {
                setVocabularioQuestions(res.data);
                if (res.data.length !== 0) {
                    setVocabularioTitle(true);
                }
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getComprensionQuestions = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: basePath + "/getComprensionQuestions",
        }).then((res) => {
            if (res.data) {
                setComprensionQuestions(res.data);
                if (res.data.length !== 0) {
                    setComprensionTitle(true);
                }
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getDibujosQuestions = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: basePath + "/getDibujosQuestions",
        }).then((res) => {
            if (res.data) {
                setDibujosQuestions(res.data);
                if (res.data.length !== 0) {
                    setDibujosTitle(true);
                }
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getNombresQuestions = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: basePath + "/getNombresQuestions",
        }).then((res) => {
            if (res.data) {
                setNombresQuestions(res.data);
                if (res.data.length !== 0) {
                    setNombresTitle(true);
                }
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getMatricesQuestions = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: basePath + "/getMatricesQuestions",
        }).then((res) => {
            if (res.data) {
                setMatricesQuestions(res.data);
                if (res.data.length !== 0) {
                    setMatricesTitle(true);
                }
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getConceptosQuestions = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: basePath + "/getConceptosQuestions",
        }).then((res) => {
            if (res.data) {
                setConceptosQuestions(res.data);
                if (res.data.length !== 0) {
                    setConceptosTitle(true);
                }
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getReconocimientoQuestions = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: basePath + "/getReconocimientoQuestions",
        }).then((res) => {
            if (res.data) {
                setReconocimientoQuestions(res.data);
                if (res.data.length !== 0) {
                    setReconocimientoTitle(true);
                }
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getBusquedaQuestions = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: basePath + "/getBusquedaQuestions",
        }).then((res) => {
            if (res.data) {
                setBusquedaQuestions(res.data);
                if (res.data.length !== 0) {
                    setBusquedaTitle(true);
                }
            } else {
                console.error("No existe información", res);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getSections = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: basePath + "/getSections"
        }).then((res) => {
            setSections(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    const showTests = () => {
        switch (section) {
            case "Información":
                getInformacionQuestions();
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Semejanzas":
                getSemejanzasQuestions();
                setInformationTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Vocabulario":
                getVocabularioQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Comprensión":
                getComprensionQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Dibujos":
                getDibujosQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Nombres":
                getNombresQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Matrices":
                getMatricesQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Conceptos":
                getConceptosQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Reconocimiento":
                getReconocimientoQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setBusquedaTitle(false);
                break;
            case "Búsqueda":
                getBusquedaQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                break;
            default:
                break;

        }
    }
    const eliminarPregunta = (id_pregunta) => {
        Swal.fire({
            title: '¿Estás seguro que deseas eliminar esta Pregunta?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgba(255,67,49)',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios({
                    method: "post",
                    data: {
                        id_pregunta: id_pregunta
                    },
                    withCredentials: true,
                    url: basePath + "/deleteQuestion",
                }).then((res) => {
                    console.log(res);
                    if (res.data.message === 'Pregunta eliminada exitosamente') {
                        let timerInterval;
                        Swal.fire({
                            icon: 'success',
                            title: "¡Pregunta eliminada Correctamente!",
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
                        setTimeout(() => {
                            refreshQuestions();
                        }, 3000);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    const refreshQuestions = () => {
        switch (sectionSelected) {
            case "Información":
                getInformacionQuestions();
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Semejanzas":
                getSemejanzasQuestions();
                setInformationTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Vocabulario":
                getVocabularioQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Comprensión":
                getComprensionQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Dibujos":
                getDibujosQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Nombres":
                getNombresQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Matrices":
                getMatricesQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Conceptos":
                getConceptosQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setReconocimientoTitle(false);
                setBusquedaTitle(false);
                break;
            case "Reconocimiento":
                getReconocimientoQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setBusquedaTitle(false);
                break;
            case "Búsqueda":
                getBusquedaQuestions();
                setInformationTitle(false);
                setSemejanzasTitle(false);
                setVocabularioTitle(false);
                setComprensionTitle(false);
                setDibujosTitle(false);
                setNombresTitle(false);
                setMatricesTitle(false);
                setConceptosTitle(false);
                setReconocimientoTitle(false);
                break;
            default:
                break;

        }
    }
    const showInstructions = () => {
        Swal.fire({
            icon: "info",
            title: "Bienvenido al Módulo de Administración de Preguntas",
            html: "<div>\n" +
                "                <p>En la parte izquierda de la pantalla encontrarás la lista de <strong>Secciones</strong>, dale\n" +
                "                    clic para desplegarla.</p>\n" +
                "                <p>Cuando selecciones una <strong>Sección</strong>, en la parte derecha de la pantalla aparecerán\n" +
                "                    todas las <strong>Preguntas</strong> asociadas a dicha sección.</p>\n" +
                "                <p>Para <strong>Crear una nueva Pregunta</strong>, dale clic al botón con el símbolo\n" +
                "                    <strong>+</strong> que se encuentra en la parte superior central de la pantalla.</p>\n" +
                "                <p>Para <strong>Eliminar una Pregunta</strong>, dale clic al botón con el\n" +
                "                    símbolo <strong>🗑️</strong> que se encuentra al lado derecho de cada tarjeta.</p>\n" +
                "            </div>",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
            footer: "Puedes volver a ver estas instrucciones dando clic en el botón de información en la parte " +
                "superior derecha de la pantalla",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const goCreatePregunta = () => {
        router.push("/select/selectSeccionPregunta")
            .then((result) => console.log(result));
        shutUp();
    }
    const confirmGetBack = () => {
        router.push('/modulosCreacion')
            .then((result) => console.log(result));
        shutUp();
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
            <UpperBar color={navstyles.upper_bar_red}
                      silenceVoice={shutUp}/>
            <InstructionBar confirmation={confirmGetBack}
                            instruction={`Crea una nueva pregunta`}
                            information={showInstructions}
                            info_color={button.btn_red}
                            voiceCommand={hearVoice}
                            silenceCommand={shutUp}
                            silenceVoice={shutUp}/>
            <AddButton createPage={goCreatePregunta}
                       color={button.btn_red}/>
            <br/>
            <div className={`container-fluid px-5`}>
                <div className={`row`}>
                    <div className={`col-6`}>
                        <div
                            className={`flex justify-center border-1 border-black shadow-md rounded-2xl bg-white h-100`}>
                            <select value={sectionSelected}
                                    onChange={e => {
                                        setSectionSelected(e.target.value);
                                        section = e.target.value;
                                        showTests();
                                    }}
                                    className={`border-2 border-black border-opacity-50 rounded-full font-bold w-75 px-4 py-2 shadow-md
                                    ${styles.input_red} mt-4 h-min  text-white`}>
                                <option value="">Selecciona una sección</option>
                                {sections.map((section, index) => (
                                    <option key={index}
                                            value={section.nombre_seccion}>
                                        {section.nombre_seccion}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={`col-6`}>
                        <div className={`border-1 border-black shadow-md rounded-2xl bg-white
                        ${styles.overflow_container_questions} p-0`}>
                            <br/>
                            {informationTitle &&
                                <div className={`col-12 px-2`}>
                                    {informationQuestions.map((question, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div
                                                                    className={`col-sm-4 col-md-6 col-lg-9 px-2 self-center`}>
                                                                    <div
                                                                        className={`font-medium card-title self-center ${styles.card_test_text}`}>
                                                                        {question.pregunta}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-3 d-md-flex d-lg-flex justify-content-center self-center`}>
                                                                    <button
                                                                        onClick={() => eliminarPregunta(question.id_pregunta)}>
                                                                        <Image src="/images/eliminar.png"
                                                                               alt="trashIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {semejanzasTitle &&
                                <div className={`col-12 px-2`}>
                                    {semejanzasQuestions.map((question, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div
                                                                    className={`col-sm-4 col-md-6 col-lg-9 px-2 self-center`}>
                                                                    <div
                                                                        className={`font-medium card-title pt-1 ${styles.card_test_text}`}>
                                                                        {question.pregunta}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-3 d-md-flex d-lg-flex justify-content-center self-center`}>
                                                                    <button
                                                                        onClick={() => eliminarPregunta(question.id_pregunta)}>
                                                                        <Image src="/images/eliminar.png"
                                                                               alt="trashIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {vocabularioTitle &&
                                <div className={`col-12 px-2`}>
                                    {vocabularioQuestions.map((question, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div
                                                                    className={`col-sm-4 col-md-6 col-lg-9 px-2 self-center`}>
                                                                    <div
                                                                        className={`font-medium card-title pt-1 ${styles.card_test_text}`}>
                                                                        {question.pregunta}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-3 d-md-flex d-lg-flex justify-content-center self-center`}>
                                                                    <button
                                                                        onClick={() => eliminarPregunta(question.id_pregunta)}>
                                                                        <Image src="/images/eliminar.png"
                                                                               alt="trashIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {comprensionTitle &&
                                <div className={`col-12 px-2`}>
                                    {comprensionQuestions.map((question, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div
                                                                    className={`col-sm-4 col-md-6 col-lg-9 px-2 self-center`}>
                                                                    <div
                                                                        className={`font-medium card-title pt-1 ${styles.card_test_text}`}>
                                                                        {question.pregunta}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-3 d-md-flex d-lg-flex justify-content-center self-center`}>
                                                                    <button
                                                                        onClick={() => eliminarPregunta(question.id_pregunta)}>
                                                                        <Image src="/images/eliminar.png"
                                                                               alt="trashIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {dibujosTitle &&
                                <div className={`col-12 px-2`}>
                                    {dibujosQuestions.map((question, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div
                                                                    className={`col-sm-4 col-md-6 col-lg-9 px-2 self-center`}>
                                                                    <div
                                                                        className={`font-medium card-title pt-1 ${styles.card_test_text}`}>
                                                                        {question.pregunta}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-3 d-md-flex d-lg-flex justify-content-center self-center`}>
                                                                    <button
                                                                        onClick={() => eliminarPregunta(question.id_pregunta)}>
                                                                        <Image src="/images/eliminar.png"
                                                                               alt="trashIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {nombresTitle &&
                                <div className={`col-12 px-2`}>
                                    {nombresQuestions.map((question, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div
                                                                    className={`col-sm-4 col-md-6 col-lg-9 px-2 self-center`}>
                                                                    <div
                                                                        className={`font-medium card-title pt-1 ${styles.card_test_text}`}>
                                                                        {question.pregunta}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-3 d-md-flex d-lg-flex justify-content-center self-center`}>
                                                                    <button
                                                                        onClick={() => eliminarPregunta(question.id_pregunta)}>
                                                                        <Image src="/images/eliminar.png"
                                                                               alt="trashIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {matricesTitle &&
                                <div className={`col-12 px-2`}>
                                    {matricesQuestions.map((question, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div
                                                                    className={`col-sm-4 col-md-6 col-lg-9 px-2 self-center`}>
                                                                    <div
                                                                        className={`font-medium card-title pt-1 ${styles.card_test_text}`}>
                                                                        {question.pregunta}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-3 d-md-flex d-lg-flex justify-content-center self-center`}>
                                                                    <button
                                                                        onClick={() => eliminarPregunta(question.id_pregunta)}>
                                                                        <Image src="/images/eliminar.png"
                                                                               alt="trashIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {conceptosTitle &&
                                <div className={`col-12 px-2`}>
                                    {conceptosQuestions.map((question, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div
                                                                    className={`col-sm-4 col-md-6 col-lg-9 px-2 self-center`}>
                                                                    <div
                                                                        className={`font-medium card-title pt-1 ${styles.card_test_text}`}>
                                                                        {question.pregunta}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-3 d-md-flex d-lg-flex justify-content-center self-center`}>
                                                                    <button
                                                                        onClick={() => eliminarPregunta(question.id_pregunta)}>
                                                                        <Image src="/images/eliminar.png"
                                                                               alt="trashIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {reconocimientoTitle &&
                                <div className={`col-12 px-2`}>
                                    {reconocimientoQuestions.map((question, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div
                                                                    className={`col-sm-4 col-md-6 col-lg-9 px-2 self-center`}>
                                                                    <div
                                                                        className={`font-medium card-title pt-1 ${styles.card_test_text}`}>
                                                                        {question.pregunta}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-3 d-md-flex d-lg-flex justify-content-center self-center`}>
                                                                    <button
                                                                        onClick={() => eliminarPregunta(question.id_pregunta)}>
                                                                        <Image src="/images/eliminar.png"
                                                                               alt="trashIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {busquedaTitle &&
                                <div className={`col-12 px-2`}>
                                    {busquedaQuestions.map((question, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_red}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div
                                                                    className={`col-sm-4 col-md-6 col-lg-9 px-2 self-center`}>
                                                                    <div
                                                                        className={`font-medium card-title pt-1 ${styles.card_test_text}`}>
                                                                        {question.pregunta}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-3 d-md-flex d-lg-flex justify-content-center self-center`}>
                                                                    <button
                                                                        onClick={() => eliminarPregunta(question.id_pregunta)}>
                                                                        <Image src="/images/eliminar.png"
                                                                               alt="trashIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}