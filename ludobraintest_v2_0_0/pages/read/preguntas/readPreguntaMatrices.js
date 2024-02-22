import axios from "axios";
import {useEffect, useState} from "react";
import sections from "@/styles/upperBarSectionColors.module.css";
import styles from "@/styles/styles.module.css";
import UpperBar from "@/components/UpperBar";
import QuestionBar from "@/components/QuestionBar";
import {useRouter} from "next/router";
import Swal from "sweetalert2";
import UseSpeechSynthesis from "@/effects/useSpeechSynthesis";
import useVoiceReader from "@/effects/useVoiceReader";
import Image from "next/image";
import configurationServices from "@/public/config/configurationServices";
import configurationPort from "@/public/config/configurationPort";

export default function ReadPreguntaMatrices() {
    const router = useRouter();
    const basePath = configurationServices.url + configurationPort.port;
    let id_test;
    let id_ninio;
    let arregloPreguntas;
    const {speak, speaking} = UseSpeechSynthesis();
    const texto = "¿Qué imagen completa la secuencia de imágenes que observas a continuación?";
    /*------------------- ESTADOS -------------------*/
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [samples, setSamples] = useState([]);
    const [preguntaActual, setPreguntaActual] = useState('');
    const [totalPreguntas, setTotalPreguntas] = useState(0); // Estado para el total de preguntas
    const [preguntaActualIndex, setPreguntaActualIndex] = useState(1); // Estado para el índice de la pregunta actual
    const [puntaje, setPuntaje] = useState(0); // Estado para el puntaje final
    const [nombre_test, setNombreTest] = useState(''); // Estado para el nombre del test
    /*------------------- EFECTOS -------------------*/
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        getTestNameById();
        getQuestionsbyTestId();
    }, []);
    useEffect(() => {
        localStorage.setItem('puntaje', puntaje.toString());
    }, [puntaje]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            id_test = localStorage.getItem('id_evaluated_test');
            id_ninio = localStorage.getItem('id_ninio');
        } else {
            router.push('/modulos').then(r => console.log(r));
        }
    }, []);
    /*------------------- FUNCIONES -------------------*/
    const getTestNameById = () => {
        axios({
            method: 'post',
            data: {
                id_test: id_test,
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
    const getQuestionsbyTestId = () => {
        axios({
            method: 'post',
            data: {
                id: id_test,
                id_ninio: id_ninio,
            },
            withCredentials: true,
            url: basePath + '/getQuestionsbyTestId',
        }).then(res => {
            setQuestions(res.data);
            arregloPreguntas = res.data;
            setTotalPreguntas(res.data.length);
            if (arregloPreguntas.length > 0) {
                const firstQuestionId = res.data[0].id_pregunta;
                getAnswersbyQuestionId(firstQuestionId);
            }
        }).catch(err => {
            console.log(err);
        });
    }
    const getAnswersbyQuestionId = (id_question) => {
        axios({
            method: 'post',
            data: {
                id: id_question,
            },
            withCredentials: true,
            url: basePath + '/getAnswersbyQuestionId',
        }).then(res => {
            console.log(res.data);
            setAnswers(res.data);
            showQuestion()
        }).catch(err => {
            console.log(err);
        })
    }
    const getSamplesByQuestionId = (id_question) => {
        axios({
            method: 'post',
            data: {
                id: id_question,
            },
            withCredentials: true,
            url: basePath + '/getSamplesByQuestionId',
        }).then(res => {
            console.log(res.data);
            setSamples(res.data);
            showQuestion()
        }).catch(err => {
            console.log(err);
        })
    }
    const showQuestion = async () => {
        if (questions.length === 0 && arregloPreguntas) {
            setPreguntaActual(arregloPreguntas[0].pregunta);
        } else {
            if (questions.length > 0) {
                setPreguntaActual(questions[0].pregunta);
            }
        }
    }
    const verifyAnswer = (correct) => {
        if (correct === 1) {
            setIsSpeaking(false);
            console.log("Respuesta correcta");
            setPuntaje(prevPuntaje => prevPuntaje + 1);
            let timerInterval;
            Swal.fire({
                icon: 'success',
                title: "¡Respuesta correcta!",
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
        } else {
            setIsSpeaking(false);
            console.log("Respuesta incorrecta");
            let timerInterval;
            Swal.fire({
                icon: 'error',
                title: "¡Respuesta incorrecta!",
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
        }
        // Verificar si hay elementos en arregloPreguntas antes de hacer shift
        if (questions.length > 0) {
            // Hacer shift solo si hay elementos
            questions.shift();
        }
        setTimeout(() => {
            if (questions.length > 0) {
                getAnswersbyQuestionId(questions[0].id_pregunta);
                getSamplesByQuestionId(questions[0].id_pregunta);
                setPreguntaActualIndex(prevPreguntaActualIndex => prevPreguntaActualIndex + 1);
            } else {
                console.log("No hay más preguntas");
                router.push('/puntajeFinal').then(r => console.log(r));
                shutUp();
            }
        }, 3000);
    }
    const confirmGetBack = () => {
        Swal.fire({
            title: '¿Estás seguro que quieres regresar?',
            text: "¡Perderás todo el progreso de esta Evaluación!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgba(255,67,49)',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Sí, quiero regresar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/menuOpcionesTest').then(r => console.log(r));
                shutUp();
            }
        })
    }
    const repeatVoice = () => {
        if (isSpeaking === false) {
            setIsSpeaking(true);
            if (!speaking) {
                do {
                    speak(texto);
                } while (isSpeaking);
            }
        }
    }
    const shutUp = () => {
        if (isSpeaking === true) {
            setIsSpeaking(false);
        }
    }
    useVoiceReader(texto, isSpeaking);
    return (
        <div className={`bg-amber-50 min-h-screen`}>
            <UpperBar color={sections.matrices}
                      silenceVoice={shutUp}/>
            <br/>
            <div className={`container-fluid px-5`}>
                <div className={`row`}>
                    <div className={`col-sm-3 col-lg-2`}>
                        <QuestionBar confirmGetBack={confirmGetBack}
                                     voiceCommand={repeatVoice}
                                     silenceCommand={shutUp}
                                     hiddenHome={`hidden`}/>
                    </div>
                    <div className={`col-sm-3 col-lg-2 self-center`}>
                        <div className={`border-1 border-black rounded-2xl bg-white p-5 shadow-inner h-100
                        ${styles.semejanza_instruction_text}`}>
                            ¿Qué imagen completa la secuencia de imágenes que observas a continuación?
                        </div>
                    </div>
                    <div className={`col-6`}>
                        <h5>
                            Pregunta {preguntaActualIndex} / {totalPreguntas}
                        </h5>
                        <div className={`grid grid-cols-2 border-2 border-black rounded-2xl bg-white p-4
                        justify-center shadow-inner`}>
                            {samples.map((sample, index) => (
                                <div key={index} className={`border-1 border-black bg-white px-3 py-3
                        flex justify-center shadow-inner h-100`}>
                                    <Image src={`/images/${sample.imagen}`}
                                           width={400}
                                           height={400}
                                           alt={`${sample.imagen}`}
                                           className={`image-fluid ${styles.sample_img}`}/>
                                </div>
                            ))}
                            <div className={`border-1 border-black bg-white flex justify-center
                            shadow-inner h-100`}>
                                <h1 className={`self-center italic`}>?</h1>
                            </div>
                        </div>
                    </div>
                    <div className={`col-lg-2 flex self-center`}>
                        <h3 className={`${styles.label_olive}`}>
                            {nombre_test}
                        </h3>
                    </div>
                </div>
            </div>
            <br/>
            <div className={`container-fluid px-5`}>
                <h4 className={`d-flex justify-content-center font-bold ${styles.label_olive}`}>
                    Opciones de respuesta
                </h4>
                <br/>
                <div className={`row gy-5 justify-content-center`}>
                    {answers.map((answer, index) => (
                        <div className={`col-sm-6 col-md-3`} key={index}>
                            <button onClick={() => verifyAnswer(answer.respuesta_correcta)}
                                    className={`${styles.answer_btn_matrices} flex justify-center 
                                shadow-md w-100 h-100`}>
                                <Image src={`/images/${answer.imagen}`}
                                       width={500}
                                       height={500}
                                       className={`${styles.answer_img}`}
                                       alt={`${answer.imagen}`}/>
                            </button>
                        </div>
                    ))}
                </div>
                <br/>
            </div>
        </div>
    )
}