import UpperBar from "@/components/UpperBar";
import sections from "@/styles/upperBarSectionColors.module.css";
import InstructionBar from "@/components/InstructionBar";
import styles from "@/styles/styles.module.css";
import button from "@/styles/button.module.css";
import axios from "axios";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Button from "@/components/Button";
import Swal from "sweetalert2";
import useVoiceReader from "@/effects/useVoiceReader";
import UseSpeechSynthesis from "@/effects/useSpeechSynthesis";

export default function MenuOpcionesTest() {
    const router = useRouter();
    let id;
    let id_t_n;
    let id_test;
    let nombre_seccion;
    const text = "Selecciona una opción";
    const {speak, speaking} = UseSpeechSynthesis();
    /*------------------- ESTADOS -------------------*/
    const [test, setTest] = useState('');
    const [idNinio, setIdNinio] = useState(id);
    const [idTest, setIdTest] = useState('');
    const [nombreSeccion, setNombreSeccion] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    // Estados para generar el color
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
        getTest();
        showInstructions();
    }, []);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            id = localStorage.getItem('id_ninio');
            setIdNinio(id);
            id_t_n = localStorage.getItem('id_t_n');
            id_test = localStorage.getItem('id_test');
            setIdTest(id_test);
        } else {
            router.push('/modulos').then(r => console.log(r));
        }
    }, []);
    /*------------------- FUNCIONES -------------------*/
    const getTest = () => {
        axios({
            method: 'post',
            data: {
                id_test: id_t_n,
            },
            withCredentials: true,
            url: `http://poliquizzes.com:3001/getNinioTestById`,
        }).then((res) => {
            console.log(res);
            setTest(res.data[0]);
            nombre_seccion = res.data[0].nombre_seccion;
            setNombreSeccion(res.data[0].nombre_seccion);
            localStorage.setItem('id_ninio', res.data[0].id_ninio);
            generateColor().then(r => console.log(r));
        }).catch((err) => {
            console.log(err);
        })
    }
    const goInstructions = () => {
        localStorage.setItem('seccion', test.nombre_seccion);
        localStorage.setItem('informacion', test.informacion);
        router.push(`/instrucciones`).then(r => console.log(r));
        shutUp();
    }
    const goBack = () => {
        router.push(`/select/selectNinio`).then(r => console.log(r));
        shutUp();
    }
    const goTest = () => {
        localStorage.setItem('id_evaluated_test', idTest);
        localStorage.setItem('nombre_test', test.nombre_test);
        switch (test.nombre_seccion) {
            case "Información":
                router.push(`/read/preguntas/readPreguntaInformacion`).then(r => console.log(r));
                shutUp();
                break;
            case "Semejanzas":
                router.push(`/read/preguntas/readPreguntaSemejanzas`).then(r => console.log(r));
                shutUp();
                break;
            case "Vocabulario":
                router.push(`/read/preguntas/readPreguntaVocabulario`).then(r => console.log(r));
                shutUp();
                break;
            case "Comprensión":
                router.push(`/read/preguntas/readPreguntaComprension`).then(r => console.log(r));
                shutUp();
                break;
            case "Dibujos":
                router.push(`/read/preguntas/readPreguntaDibujos`).then(r => console.log(r));
                shutUp();
                break;
            case "Nombres":
                router.push(`/read/preguntas/readPreguntaNombres`).then(r => console.log(r));
                shutUp();
                break;
            case "Matrices":
                router.push(`/read/preguntas/readPreguntaMatrices`).then(r => console.log(r));
                shutUp();
                break;
            case "Conceptos":
                router.push(`/read/preguntas/readPreguntaConceptos`).then(r => console.log(r));
                shutUp();
                break;
            case "Reconocimiento":
                router.push(`/read/preguntas/readPreguntaReconocimiento`).then(r => console.log(r));
                shutUp();
                break;
            case "Búsqueda":
                router.push(`/read/preguntas/readPreguntaBusqueda`).then(r => console.log(r));
                shutUp();
                break;
        }
    }
    const generateColor = async () => {
        switch (nombre_seccion) {
            case "Información":
                setInformationTitle(true);
                break;
            case "Semejanzas":
                setSemejanzasTitle(true);
                break;
            case "Vocabulario":
                setVocabularioTitle(true);
                break;
            case "Comprensión":
                setComprensionTitle(true);
                break;
            case "Dibujos":
                setDibujosTitle(true);
                break;
            case "Nombres":
                setNombresTitle(true);
                break;
            case "Matrices":
                setMatricesTitle(true);
                break;
            case "Conceptos":
                setConceptosTitle(true);
                break;
            case "Reconocimiento":
                setReconocimientoTitle(true);
                break;
            case "Búsqueda":
                setBusquedaTitle(true);
                break;
        }
    }
    const showInstructions = () => {
        Swal.fire({
            icon: "info",
            html: "<div>\n" +
                "                <p>En la parte izquierda de la pantalla encontrarás el nombre de la <strong>Evaluación</strong> y\n" +
                "                    el puntaje actual del <strong>Jugador</strong></p>\n" +
                "                <p>Selecciona una de las tres opciones para continuar</p>\n" +
                "                <h5>Iniciar Evaluación</h5>\n" +
                "                <p>Permite iniciar la <strong>Evaluación</strong></p>\n" +
                "                <h5>Instrucciones</h5>\n" +
                "                <p>Permite ver las instrucciones relacionadas a la sección a la que pertenece la <strong>Evaluación</strong></p>\n" +
                "                <h5>Salir</h5>\n" +
                "                <p>Permite volver a la página de selección de Jugador y Evaluación</p>\n" +
                "            </div>",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "black",
            footer: "Puedes volver a ver estas instrucciones dando clic en el botón de información en la parte " +
                "superior derecha de la pantalla",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const confirmGetBack = () => {
        router.push('/select/selectNinio').then(r => console.log(r));
        shutUp();
    }
    useVoiceReader(text, isSpeaking);
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
            {informationTitle &&
                <div>
                    <UpperBar color={sections.informacion}
                              silenceVoice={shutUp}/>
                    <InstructionBar confirmation={confirmGetBack}
                                    instruction={`Selecciona una opción`}
                                    information={showInstructions}
                                    info_color={button.btn_red}
                                    voiceCommand={hearVoice}
                                    silenceCommand={shutUp}
                                    silenceVoice={shutUp}/>
                    <br/>
                    <div className={`container-fluid px-5`}>
                        <div className={`row`}>
                            <div className={`col-6 ${styles.test_info} self-center`}>
                                <br/>
                                <h5 className={`font-bold`}>Nombre de la Evaluación</h5>
                                <div className={`text-3xl italic`}>
                                    {test.nombre_test}
                                </div>
                                <br/>
                                <h5 className={`font-bold`}>Puntaje actual de {test.nombre}</h5>
                                <div className={`text-3xl italic`}>
                                    {test.puntaje}
                                </div>
                            </div>
                            <div className={`col-6 self-center ${styles.btns_div}`}>
                                <div className={`d-flex justify-content-center`}>
                                    <Button text={`Iniciar Evaluación`} bg_color={button.btn_red}
                                            instruction={goTest}></Button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <Button text={`Instrucciones`} bg_color={button.btn_red}
                                            instruction={goInstructions}></Button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <Button text={`Salir`} bg_color={button.btn_red} instruction={goBack}></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {semejanzasTitle &&
                <div>
                    <UpperBar color={sections.semejanzas}
                              silenceVoice={shutUp}/>
                    <InstructionBar confirmation={confirmGetBack}
                                    instruction={`Selecciona una opción`}
                                    information={showInstructions}
                                    info_color={button.btn_green}
                                    voiceCommand={hearVoice}
                                    silenceCommand={shutUp}/>
                    <br/>
                    <div className={`container-fluid px-5`}>
                        <div className={`row`}>
                            <div className={`col-6 ${styles.test_info} self-center`}>
                                <br/>
                                <h5 className={`font-bold`}>Nombre de la Evaluación</h5>
                                <div className={`text-3xl italic`}>
                                    {test.nombre_test}
                                </div>
                                <br/>
                                <h5 className={`font-bold`}>Puntaje actual de {test.nombre}</h5>
                                <div className={`text-3xl italic`}>
                                    {test.puntaje}
                                </div>
                            </div>
                            <div className={`col-6 self-center ${styles.btns_div}`}>
                                <div className={`d-flex justify-content-center`}>
                                    <Button text={`Iniciar Evaluación`} bg_color={button.btn_green}
                                            instruction={goTest}></Button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <Button text={`Instrucciones`} bg_color={button.btn_green}
                                            instruction={goInstructions}></Button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <Button text={`Salir`} bg_color={button.btn_green} instruction={goBack}></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {vocabularioTitle &&
                <div>
                    <UpperBar color={sections.vocabulario}
                              silenceVoice={shutUp}/>
                    <InstructionBar confirmation={confirmGetBack}
                                    instruction={`Selecciona una opción`}
                                    information={showInstructions}
                                    info_color={button.btn_blue}
                                    voiceCommand={hearVoice}
                                    silenceCommand={shutUp}
                                    silenceVoice={shutUp}/>
                    <br/>
                    <div className={`container-fluid px-5`}>
                        <div className={`row`}>
                            <div className={`col-6 ${styles.test_info} self-center`}>
                                <br/>
                                <h5 className={`font-bold`}>Nombre de la Evaluación</h5>
                                <div className={`text-3xl italic`}>
                                    {test.nombre_test}
                                </div>
                                <br/>
                                <h5 className={`font-bold`}>Puntaje actual de {test.nombre}</h5>
                                <div className={`text-3xl italic`}>
                                    {test.puntaje}
                                </div>
                            </div>
                            <div className={`col-6 self-center ${styles.btns_div}`}>
                                <div className={`d-flex justify-content-center`}>
                                    <Button text={`Iniciar Evaluación`} bg_color={button.btn_blue}
                                            instruction={goTest}></Button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <Button text={`Instrucciones`} bg_color={button.btn_blue}
                                            instruction={goInstructions}></Button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <Button text={`Salir`} bg_color={button.btn_blue} instruction={goBack}></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {comprensionTitle &&
                <div>
                    <UpperBar color={sections.comprension}
                              silenceVoice={shutUp}/>
                    <InstructionBar confirmation={confirmGetBack}
                                    instruction={`Selecciona una opción`}
                                    information={showInstructions}
                                    info_color={button.btn_orange}
                                    voiceCommand={hearVoice}
                                    silenceCommand={shutUp}
                                    silenceVoice={shutUp}/>
                    <br/>
                    <div className={`container-fluid px-5`}>
                        <div className={`row`}>
                            <div className={`col-6 ${styles.test_info} self-center`}>
                                <br/>
                                <h5 className={`font-bold`}>Nombre de la Evaluación</h5>
                                <div className={`text-3xl italic`}>
                                    {test.nombre_test}
                                </div>
                                <br/>
                                <h5 className={`font-bold`}>Puntaje actual de {test.nombre}</h5>
                                <div className={`text-3xl italic`}>
                                    {test.puntaje}
                                </div>
                            </div>
                            <div className={`col-6 self-center ${styles.btns_div}`}>
                                <div className={`d-flex justify-content-center`}>
                                    <Button text={`Iniciar Evaluación`} bg_color={button.btn_orange}
                                            instruction={goTest}></Button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <Button text={`Instrucciones`} bg_color={button.btn_orange}
                                            instruction={goInstructions}></Button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <Button text={`Salir`} bg_color={button.btn_orange} instruction={goBack}></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {dibujosTitle &&
                <div>
                    <UpperBar color={sections.dibujos}
                              silenceVoice={shutUp}/>
                    <InstructionBar confirmation={confirmGetBack}
                                    instruction={`Selecciona una opción`}
                                    information={showInstructions}
                                    info_color={button.btn_purple}
                                    voiceCommand={hearVoice}
                                    silenceCommand={shutUp}
                                    silenceVoice={shutUp}/>
                    <div className={`container-fluid px-5`}>
                        <div className={`row`}>
                            <div className={`col-6 ${styles.test_info} self-center`}>
                                <br/>
                                <h5 className={`font-bold`}>Nombre de la Evaluación</h5>
                                <div className={`text-3xl italic`}>
                                    {test.nombre_test}
                                </div>
                                <br/>
                                <h5 className={`font-bold`}>Puntaje actual de {test.nombre}</h5>
                                <div className={`text-3xl italic`}>
                                    {test.puntaje}
                                </div>
                            </div>
                            <div className={`col-6 self-center ${styles.btns_div}`}>
                                <div className={`d-flex justify-content-center`}>
                                    <Button text={`Iniciar Evaluación`} bg_color={button.btn_purple}
                                            instruction={goTest}></Button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <Button text={`Instrucciones`} bg_color={button.btn_purple}
                                            instruction={goInstructions}></Button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <Button text={`Salir`} bg_color={button.btn_purple} instruction={goBack}></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {nombresTitle &&
                <div>
                    <UpperBar color={sections.nombres}
                              silenceVoice={shutUp}/>
                    <InstructionBar confirmation={confirmGetBack}
                                    instruction={`Selecciona una opción`}
                                    information={showInstructions}
                                    info_color={button.btn_electric_blue}
                                    voiceCommand={hearVoice}
                                    silenceCommand={shutUp}
                                    silenceVoice={shutUp}/>
                    <div className={`container-fluid px-5`}>
                        <div className={`row`}>
                            <div className={`col-6 ${styles.test_info} self-center`}>
                                <br/>
                                <h5 className={`font-bold`}>Nombre de la Evaluación</h5>
                                <div className={`text-3xl italic`}>
                                    {test.nombre_test}
                                </div>
                                <br/>
                                <h5 className={`font-bold`}>Puntaje actual de {test.nombre}</h5>
                                <div className={`text-3xl italic`}>
                                    {test.puntaje}
                                </div>
                            </div>
                            <div className={`col-6 self-center ${styles.btns_div}`}>
                                <div className={`d-flex justify-content-center`}>
                                    <Button text={`Iniciar Evaluación`} bg_color={button.btn_electric_blue}
                                            instruction={goTest}></Button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <Button text={`Instrucciones`} bg_color={button.btn_electric_blue}
                                            instruction={goInstructions}></Button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <Button text={`Salir`} bg_color={button.btn_electric_blue}
                                            instruction={goBack}></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {matricesTitle &&
                <div>
                    <UpperBar color={sections.matrices}
                              silenceVoice={shutUp}/>
                    <InstructionBar confirmation={confirmGetBack}
                                    instruction={`Selecciona una opción`}
                                    information={showInstructions}
                                    info_color={button.btn_olive}
                                    voiceCommand={hearVoice}
                                    silenceCommand={shutUp}
                                    silenceVoice={shutUp}/>
                    <br/>
                    <div className={`container-fluid px-5`}>
                        <div className={`row`}>
                            <div className={`col-6 ${styles.test_info} self-center`}>
                                <br/>
                                <h5 className={`font-bold`}>Nombre de la Evaluación</h5>
                                <div className={`text-3xl italic`}>
                                    {test.nombre_test}
                                </div>
                                <br/>
                                <h5 className={`font-bold`}>Puntaje actual de {test.nombre}</h5>
                                <div className={`text-3xl italic`}>
                                    {test.puntaje}
                                </div>
                            </div>
                            <div className={`col-6 self-center ${styles.btns_div}`}>
                                <div className={`d-flex justify-content-center`}>
                                    <Button text={`Iniciar Evaluación`} bg_color={button.btn_olive}
                                            instruction={goTest}></Button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <Button text={`Instrucciones`} bg_color={button.btn_olive}
                                            instruction={goInstructions}></Button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <Button text={`Salir`} bg_color={button.btn_olive} instruction={goBack}></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {conceptosTitle &&
                <div>
                    <UpperBar color={sections.conceptos}
                              silenceVoice={shutUp}/>
                    <InstructionBar confirmation={confirmGetBack}
                                    instruction={`Selecciona una opción`}
                                    information={showInstructions}
                                    info_color={button.btn_blue}
                                    voiceCommand={hearVoice}
                                    silenceCommand={shutUp}
                                    silenceVoice={shutUp}/>
                    <br/>
                    <div className={`container-fluid px-5`}>
                        <div className={`row`}>
                            <div className={`col-6 ${styles.test_info} self-center`}>
                                <br/>
                                <h5 className={`font-bold`}>Nombre de la Evaluación</h5>
                                <div className={`text-3xl italic`}>
                                    {test.nombre_test}
                                </div>
                                <br/>
                                <h5 className={`font-bold`}>Puntaje actual de {test.nombre}</h5>
                                <div className={`text-3xl italic`}>
                                    {test.puntaje}
                                </div>
                            </div>
                            <div className={`col-6 self-center ${styles.btns_div}`}>
                                <div className={`d-flex justify-content-center`}>
                                    <Button text={`Iniciar Evaluación`} bg_color={button.btn_blue}
                                            instruction={goTest}></Button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <Button text={`Instrucciones`} bg_color={button.btn_blue}
                                            instruction={goInstructions}></Button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <Button text={`Salir`} bg_color={button.btn_blue} instruction={goBack}></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {reconocimientoTitle &&
                <div>
                    <UpperBar color={sections.reconocimiento}
                              silenceVoice={shutUp}/>
                    <InstructionBar confirmation={confirmGetBack}
                                    instruction={`Selecciona una opción`}
                                    information={showInstructions}
                                    info_color={button.btn_red}
                                    voiceCommand={hearVoice}
                                    silenceCommand={shutUp}
                                    silenceVoice={shutUp}/>
                    <br/>
                    <div className={`container-fluid px-5`}>
                        <div className={`row`}>
                            <div className={`col-6 ${styles.test_info} self-center`}>
                                <br/>
                                <h5 className={`font-bold`}>Nombre de la Evaluación</h5>
                                <div className={`text-3xl italic`}>
                                    {test.nombre_test}
                                </div>
                                <br/>
                                <h5 className={`font-bold`}>Puntaje actual de {test.nombre}</h5>
                                <div className={`text-3xl italic`}>
                                    {test.puntaje}
                                </div>
                            </div>
                            <div className={`col-6 self-center ${styles.btns_div}`}>
                                <div className={`d-flex justify-content-center`}>
                                    <Button text={`Iniciar Evaluación`} bg_color={button.btn_red}
                                            instruction={goTest}></Button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <Button text={`Instrucciones`} bg_color={button.btn_red}
                                            instruction={goInstructions}></Button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <Button text={`Salir`} bg_color={button.btn_red} instruction={goBack}></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {busquedaTitle &&
                <div>
                    <UpperBar color={sections.busqueda}
                              silenceVoice={shutUp}/>
                    <InstructionBar confirmation={confirmGetBack}
                                    instruction={`Selecciona una opción`}
                                    information={showInstructions}
                                    info_color={button.btn_orange}
                                    voiceCommand={hearVoice}
                                    silenceCommand={shutUp}
                                    silenceVoice={shutUp}/>
                    <br/>
                    <div className={`container-fluid px-5`}>
                        <div className={`row`}>
                            <div className={`col-6 ${styles.test_info} self-center`}>
                                <br/>
                                <h5 className={`font-bold`}>Nombre de la Evaluación</h5>
                                <div className={`text-3xl italic`}>
                                    {test.nombre_test}
                                </div>
                                <br/>
                                <h5 className={`font-bold`}>Puntaje actual de {test.nombre}</h5>
                                <div className={`text-3xl italic`}>
                                    {test.puntaje}
                                </div>
                            </div>
                            <div className={`col-6 self-center ${styles.btns_div}`}>
                                <div className={`d-flex justify-content-center`}>
                                    <Button text={`Iniciar Evaluación`} bg_color={button.btn_orange}
                                            instruction={goTest}></Button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <Button text={`Instrucciones`} bg_color={button.btn_orange}
                                            instruction={goInstructions}></Button>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <Button text={`Salir`} bg_color={button.btn_orange} instruction={goBack}></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </main>
    )
}