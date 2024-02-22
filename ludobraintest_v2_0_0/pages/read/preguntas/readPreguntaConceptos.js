import axios from "axios";
import {useEffect, useState} from "react";
import sections from "@/styles/upperBarSectionColors.module.css";
import styles from "@/styles/styles.module.css";
import button from "@/styles/button.module.css";
import UpperBar from "@/components/UpperBar";
import QuestionBar from "@/components/QuestionBar";
import {useRouter} from "next/router";
import Swal from "sweetalert2";
import Button from "@/components/Button";
import UseSpeechSynthesis from "@/effects/useSpeechSynthesis";
import useVoiceReader from "@/effects/useVoiceReader";
import Image from "next/image";
import configurationServices from "@/public/config/configurationServices";
import configurationPort from "@/public/config/configurationPort";

const initialSelectedAnswers = {
    fila1: null,
    fila2: null,
    fila3: null,
};
const correctAnswersByRow = {
    fila1: null,
    fila2: null,
    fila3: null,
}
export default function ReadPreguntaConceptos() {
    const router = useRouter();
    const basePath = configurationServices.url + configurationPort.port;
    let id_test;
    let id_ninio;
    let arregloPreguntas;
    const { speak, speaking } = UseSpeechSynthesis();
    const texto = "¡Selecciona una imagen de cada fila! Recuerda que las imágenes deben tener alguna relación entre sí.";
    /*------------------- ESTADOS -------------------*/
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [preguntaActual, setPreguntaActual] = useState('');
    const [totalPreguntas, setTotalPreguntas] = useState(0); // Estado para el total de preguntas
    const [preguntaActualIndex, setPreguntaActualIndex] = useState(1); // Estado para el índice de la pregunta actual
    const [puntaje, setPuntaje] = useState(0); // Estado para el puntaje final
    const [nombre_test, setNombreTest] = useState(''); // Estado para el nombre del test
    //
    const [selectedAnswers, setSelectedAnswers] = useState(initialSelectedAnswers);
    const [correctAnswers, setCorrectAnswers] = useState(correctAnswersByRow);
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
        setSelectedAnswers(initialSelectedAnswers);
        setCorrectAnswers(initialSelectedAnswers);
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
            console.log("Estas son las opciones de respuesta", res.data);
            setAnswers(res.data);
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
    const verifyAnswer = () => {
        if (correctAnswers.fila1 === 1 && correctAnswers.fila2 === 1 && correctAnswers.fila3 === 1) {
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
                setPreguntaActualIndex(prevPreguntaActualIndex => prevPreguntaActualIndex + 1);
            } else {
                console.log("No hay más preguntas");
                router.push('/puntajeFinal').then(r => console.log(r));
                shutUp();
            }
        }, 3000);
    }
    const handleSelectedAnswer = (e, respuestaCorrecta, fila) => {
        const selectedAnswerId = e;
        const correctAnswer = respuestaCorrecta;
        // Desmarca la respuesta previamente seleccionada en la misma fila
        setSelectedAnswers((prevSelectedAnswers) => ({
            ...prevSelectedAnswers,
            [fila]: selectedAnswerId,
        }));
        setCorrectAnswers((prevCorrectAnswers) => ({
            ...prevCorrectAnswers,
            [fila]: correctAnswer,
        }));
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
            <UpperBar color={sections.conceptos}
                      silenceVoice={shutUp}/>
            <br/>
            <div className={`container-fluid px-5`}>
                <div className={`row`}>
                    <div className={`col-sm-3 col-lg-2`}>
                        <QuestionBar confirmGetBack={confirmGetBack}
                                     nombreTest={nombre_test}
                                     labelColor={styles.label_blue}
                                     voiceCommand={repeatVoice}
                                     silenceCommand={shutUp}
                                     hiddenHome={`hidden`}/>
                    </div>
                    <div className={`col-2 self-center`}>
                        <div className={`px-4 flex-col justify-center h-fit ${styles.instruction_matrix_text}`}>
                            <p><strong>¡Selecciona una imagen de cada fila!</strong></p>
                            <p>Recuerda que las imágenes deben tener alguna
                                relación entre sí.</p>
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <Button text={`Verificar Respuestas`} bg_color={button.btn_blue}
                                    instruction={verifyAnswer}></Button>
                        </div>
                    </div>
                    <div className={`col-sm-9 col-lg-8`}>
                        <div className={`container-fluid`}>
                            <h5>
                                Pregunta {preguntaActualIndex} / {totalPreguntas}
                            </h5>
                            <h4 className={`${styles.label_blue}`}>Fila 1</h4>
                            <div className={`row justify-content-center`}>
                                {answers.map((answer, index) => (
                                    answer.numero_fila <= 1 && (
                                        <div className={`col-3`} key={index}>
                                            <button
                                                className={`flex justify-center shadow-md w-100 h-100 
                                                ${selectedAnswers.fila1 === answer.id_respuesta ? styles.selected_answer_card : styles.answer_btn_conceptos}`}
                                                onClick={() => {
                                                    /*verifyAnswer(answer.respuesta_correcta);*/
                                                    handleSelectedAnswer(answer.id_respuesta, answer.respuesta_correcta, 'fila1')
                                                }}>
                                                <Image src={`/images/${answer.imagen}`}
                                                       width={500}
                                                       height={500}
                                                       className={`${styles.answer_img}`}
                                                       alt={`${answer.imagen}`}/>
                                            </button>
                                        </div>
                                    )
                                ))}
                            </div>
                            <br/>
                            <h4 className={`${styles.label_blue}`}>Fila 2</h4>
                            <div className={`row justify-content-center`}>
                                {answers.map((answer, index) => (
                                    answer.numero_fila === 2 && (
                                        <div className={`col-3`} key={index}>
                                            <button
                                                className={`flex justify-center shadow-md w-100 h-100 
                                                ${selectedAnswers.fila2 === answer.id_respuesta ? styles.selected_answer_card : styles.answer_btn_conceptos}`}
                                                onClick={() => {
                                                    /*verifyAnswer(answer.respuesta_correcta);*/
                                                    handleSelectedAnswer(answer.id_respuesta, answer.respuesta_correcta, 'fila2')
                                                }}>
                                                <Image src={`/images/${answer.imagen}`}
                                                       width={500}
                                                       height={500}
                                                       className={`${styles.answer_img}`}
                                                       alt={`${answer.imagen}`}/>
                                            </button>
                                        </div>
                                    )
                                ))}
                            </div>
                            <br/>
                            <h4 className={`${styles.label_blue}`}>Fila 3</h4>
                            <div className={`row justify-content-center`}>
                                {answers.map((answer, index) => (
                                    answer.numero_fila === 3 && (
                                        <div className={`col-3`} key={index}>
                                            <button
                                                className={`flex justify-center shadow-md w-100 h-100 
                                                ${selectedAnswers.fila3 === answer.id_respuesta ? styles.selected_answer_card : styles.answer_btn_conceptos}`}
                                                onClick={() => {
                                                    /*verifyAnswer(answer.respuesta_correcta);*/
                                                    handleSelectedAnswer(answer.id_respuesta, answer.respuesta_correcta, 'fila3')
                                                }}>
                                                <Image src={`/images/${answer.imagen}`}
                                                       width={500}
                                                       height={500}
                                                       className={`${styles.answer_img}`}
                                                       alt={`${answer.imagen}`}/>
                                            </button>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}