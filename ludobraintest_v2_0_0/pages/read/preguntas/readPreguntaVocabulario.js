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

export default function ReadPreguntaVocabulario() {
    const router = useRouter();
    const basePath = configurationServices.url + configurationPort.port;
    let id_test;
    let id_ninio;
    let arregloPreguntas;
    const {speak, speaking} = UseSpeechSynthesis();
    const texto = "¿Qué es esta figura? ¿Podrías definirla? ";
    /* ------------------- ESTADOS ------------------- */
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [questions, setQuestions] = useState([]);
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
                getSamplesByQuestionId(firstQuestionId);
            }
        }).catch(err => {
            console.log(err);
        });
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
            <UpperBar color={sections.vocabulario}
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
                    <div className={`col-sm-3 col-lg-3 pt-0`}>
                        <div className={`border-1 border-black rounded-2xl bg-white p-5
                        flex-col justify-center shadow-inner`}>
                            <div className={`font-bold flex justify-center`}>
                                ¿Qué es esta figura?
                            </div>
                            <div className={`font-bold flex justify-center`}>
                                ¿Podrías definirla?
                            </div>
                        </div>
                        <br/> <br/>
                        <button onClick={() => verifyAnswer(0)}
                                className={`w-100 font-bold ${styles.incorrect_btn}`}>
                            Incorrecto
                        </button>
                        <br/> <br/>
                        <button onClick={() => verifyAnswer(1)}
                                className={`w-100 font-bold ${styles.correct_btn}`}>
                            Correcto
                        </button>
                    </div>
                    <div className={`col-5 pt-0 pe-0`}>
                        <h5>
                            Pregunta {preguntaActualIndex} / {totalPreguntas}
                        </h5>
                        <div className={`grid grid-cols-1 h-100`}>
                            {samples.map((sample, index) => (
                                <div key={index} className={`border-1 border-black rounded-2xl bg-white px-4 py-4
                        flex justify-center shadow-inner h-100`}>
                                    <Image src={`/images/${sample.imagen}`}
                                           width={500}
                                           height={500}
                                           className={`${styles.sample_img}`}
                                           alt={`${sample.imagen}`}/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`col-lg-2 flex self-center`}>
                        <h3 className={`${styles.label_blue}`}>
                            {nombre_test}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}