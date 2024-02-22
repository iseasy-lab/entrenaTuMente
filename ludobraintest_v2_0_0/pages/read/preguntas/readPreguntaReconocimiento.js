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

export default function ReadPreguntaReconocimiento() {
    const router = useRouter();
    let id_test;
    let id_ninio;
    let arregloPreguntas;
    const { speak, speaking } = UseSpeechSynthesis();
    const texto1 = "¡Observa con atención las imágenes que aparecen en pantalla!";
    const texto2 = "Del siguiente conjunto de imágenes, ¿Cuáles aparecieron en pantalla hace unos segundos?";
    /*------------------- ESTADOS -------------------*/
    const [isSpeaking1, setIsSpeaking1] = useState(false);
    const [isSpeaking2, setIsSpeaking2] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [samples, setSamples] = useState([]);
    const [preguntaActual, setPreguntaActual] = useState('');
    const [selectedAnswers, setSelectedAnswers] = useState([]); // Estado para respuestas seleccionadas
    const [totalPreguntas, setTotalPreguntas] = useState(0); // Estado para el total de preguntas
    const [preguntaActualIndex, setPreguntaActualIndex] = useState(1); // Estado para el índice de la pregunta actual
    const [puntaje, setPuntaje] = useState(0); // Estado para el puntaje final
    const [showSamples, setShowSamples] = useState(false); // Estado para mostrar las muestras
    const [goQuestion, setGoQuestion] = useState(false); // Estado para mostrar la pregunta
    const [nombre_test, setNombreTest] = useState(''); // Estado para el nombre del test
    /*------------------- EFECTOS -------------------*/
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        getTestNameById();
        getQuestionsbyTestId();
        showSamplesHandler();
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
            url: 'http://poliquizzes.com:3001/getTestNameById',
        }).then(res => {
            console.log("Nombre del test", res.data);
            setNombreTest(res.data[0].nombre_test);
        }).catch(err => {
            console.log(err);
        });
    }
    const showSamplesHandler = () => {
        setGoQuestion(false);
        setShowSamples(true);
        setTimeout(() => {
            setShowSamples(false);
            setGoQuestion(true);
            setIsSpeaking1(false);
        }, 10000);
    }
    const getQuestionsbyTestId = () => {
        axios({
            method: 'post',
            data: {
                id: id_test,
                id_ninio: id_ninio,
            },
            withCredentials: true,
            url: 'http://poliquizzes.com:3001/getQuestionsbyTestId',
        }).then(res => {
            setQuestions(res.data);
            arregloPreguntas = res.data;
            setTotalPreguntas(res.data.length);
            if (arregloPreguntas.length > 0) {
                const firstQuestionId = res.data[0].id_pregunta;
                getAnswersbyQuestionId(firstQuestionId);
                getSamplesByQuestionId(firstQuestionId);
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
            url: 'http://poliquizzes.com:3001/getAnswersbyQuestionId',
        }).then(res => {
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
            url: 'http://poliquizzes.com:3001/getSamplesByQuestionId',
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
        // Limpiar respuestas seleccionadas al mostrar una nueva pregunta
        setSelectedAnswers([]);
    }
    const handleAnswerClick = (answerId) => {
        // Verificar si la respuesta ya está seleccionada
        if (selectedAnswers.includes(answerId)) {
            // Si ya está seleccionada, quitarla
            setSelectedAnswers(selectedAnswers.filter(id => id !== answerId));
        } else {
            // Si no está seleccionada, agregarla (máximo 2 respuestas)
            if (selectedAnswers.length < 2) {
                setSelectedAnswers([...selectedAnswers, answerId]);
            }
        }
    }
    const isAnswerSelected = (answerId) => {
        return selectedAnswers.includes(answerId);
    }
    const verifyAnswer = () => {
        // Verificar si las respuestas seleccionadas son correctas
        const isCorrect = selectedAnswers.length === 2 &&
            selectedAnswers.every(answerId => answers.find(a => a.id_respuesta === answerId)?.respuesta_correcta === 1);
        if (isCorrect) {
            setIsSpeaking2(false);
            console.log("Respuestas correctas");
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
            setIsSpeaking2(false);
            console.log("Respuestas incorrectas");
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
                showSamplesHandler();
                getSamplesByQuestionId(questions[0].id_pregunta)
                getAnswersbyQuestionId(questions[0].id_pregunta);
                setPreguntaActualIndex(prevPreguntaActualIndex => prevPreguntaActualIndex + 1);
            } else {
                console.log("No hay más preguntas");
                router.push('/puntajeFinal').then(r => console.log(r));
                shutUp2();
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
                shutUp1();
                shutUp2();
            }
        })
    }
    const repeatVoice1 = () => {
        if (isSpeaking1 === false) {
            setIsSpeaking1(true);
            if (!speaking) {
                do {
                    speak(texto1);
                } while (isSpeaking1);
            }
        }
    }
    const repeatVoice2 = () => {
        if (isSpeaking2 === false) {
            setIsSpeaking2(true);
            if (!speaking) {
                do {
                    speak(texto2);
                } while (isSpeaking2);
            }
        }
    }
    const shutUp1 = () => {
        if (isSpeaking1 === true) {
            setIsSpeaking1(false);
        }
    }
    const shutUp2 = () => {
        if (isSpeaking2 === true) {
            setIsSpeaking2(false);
        }
    }
    useVoiceReader(texto1, isSpeaking1);
    useVoiceReader(texto2, isSpeaking2);
    return (
        <div className={`bg-amber-50 min-h-screen`}>
            <UpperBar color={sections.reconocimiento}
                      silenceVoice={shutUp2}/>
            <br/>
            {showSamples && (
                <div>
                    <div className={`container-fluid px-5`}>
                        <div className={`row`}>
                            <div className={`col-sm-3 col-lg-2`}>
                                <QuestionBar confirmGetBack={confirmGetBack}
                                             nombreTest={nombre_test}
                                             labelColor={styles.label_red}
                                             voiceCommand={repeatVoice1}
                                             silenceCommand={shutUp1}
                                             hiddenHome={`hidden`}/>
                            </div>
                            <div className={`col-sm-9 col-lg-10`}>
                                <h5>
                                    Pregunta {preguntaActualIndex} / {totalPreguntas}
                                </h5>
                                <div className={`border-1 border-black rounded-2xl bg-white px-5 py-4
                        flex justify-center shadow-inner h-fit text-xl`}>
                                    ¡Observa con atención las imágenes que aparecen en pantalla!
                                </div>
                                <div className={`container-fluid p-0`}>
                                    <br/>
                                    <div className={`grid grid-cols-2 gap-x-5 gap-y-5`}>
                                        {samples.map((sample, index) => (
                                            <div key={index}
                                                 className={`flex justify-center shadow-md w-100 h-100 ${styles.sample_btn_busqueda}`}>
                                                <Image src={`/images/${sample.imagen}`}
                                                       width={500}
                                                       height={500}
                                                       className={`${styles.sample_img}`}
                                                       alt={`${sample.imagen}`}/>
                                            </div>
                                        ))}
                                    </div>
                                    <br/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {goQuestion && (
                <div>
                    <div className={`container-fluid px-5`}>
                        <div className={`row`}>
                            <div className={`col-sm-3 col-lg-2`}>
                                <QuestionBar confirmGetBack={confirmGetBack}
                                             nombreTest={nombre_test}
                                             labelColor={styles.label_red}
                                             voiceCommand={repeatVoice2}
                                             silenceCommand={shutUp2}
                                             hiddenHome={`hidden`}/>
                            </div>
                            <div className={`col-sm-9 col-lg-10`}>
                                <h5>
                                    Pregunta {preguntaActualIndex} / {totalPreguntas}
                                </h5>
                                <div className={`border-1 border-black rounded-2xl bg-white px-5 py-4
                        flex justify-center shadow-inner h-fit text-xl`}>
                                    Del siguiente conjunto de imágenes, ¿Cuáles aparecieron en pantalla hace unos
                                    segundos?
                                </div>
                                <div className={`container-fluid p-0`}>
                                    <br/>
                                    <div className={`grid grid-cols-4 gap-x-5 gap-y-5`}>
                                        {answers.map((answer, index) => (
                                            <button
                                                key={index}
                                                className={`flex justify-center shadow-md w-100 h-100 
                                               ${isAnswerSelected(answer.id_respuesta) ? styles.selected_answer_card_recon : styles.answer_btn}`}
                                                onClick={() => {
                                                    handleAnswerClick(answer.id_respuesta)
                                                }}>
                                                <Image src={`/images/${answer.imagen}`}
                                                       width={500}
                                                       height={500}
                                                       className={`${styles.answer_img}`}
                                                       alt={`${answer.imagen}`}/>
                                            </button>
                                        ))}
                                    </div>
                                    <br/>
                                </div>
                                <div className={`flex justify-center`}>
                                    <div className={`${styles.div_btn}`}>
                                        <Button text={`Verificar Respuestas`} instruction={verifyAnswer}
                                                bg_color={button.btn_red}></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>
            )
            }
        </div>
    )
}