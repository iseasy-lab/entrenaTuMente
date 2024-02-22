import UpperBar from "@/components/UpperBar";
import navstyles from "@/styles/navstyles.module.css";
import InstructionBar from "@/components/InstructionBar";
import styles from "@/styles/styles.module.css";
import score from "@/styles/score.module.css";
import button from "@/styles/button.module.css";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import UseSpeechSynthesis from "@/effects/useSpeechSynthesis";
import useVoiceReader from "@/effects/useVoiceReader";
import Image from "next/image";

export default function Resultados() {
    const router = useRouter();
    let section;
    const {speak, speaking} = UseSpeechSynthesis();
    const [isSpeaking, setIsSpeaking] = useState(false);
    /*------------------- ESTADOS -------------------*/
    const [testSelected, setTestSelected] = useState('');
    const [sections, setSections] = useState([]);
    const [sectionSelected, setSectionSelected] = useState("");
    const [selectedTest, setSelectedTest] = useState(null);
    const [podiumChildren, setPodiumChildren] = useState([]);
    const [children, setChildren] = useState([]);
    const [goldenChild, setGoldenChild] = useState(null);
    const [silverChild, setSilverChild] = useState(null);
    const [bronzeChild, setBronzeChild] = useState(null);
    const [noResults, setNoResults] = useState(false);
    const [justOneChild, setJustOneChild] = useState(false);
    /**/
    const [informacionTests, setInformacionTests] = useState([]);
    const [semejanzasTests, setSemejanzasTests] = useState([]);
    const [vocabularioTests, setVocabularioTests] = useState([]);
    const [comprensionTests, setComprensionTests] = useState([]);
    const [dibujosTests, setDibujosTests] = useState([]);
    const [nombresTests, setNombresTests] = useState([]);
    const [matricesTests, setMatricesTests] = useState([]);
    const [conceptosTests, setConceptosTests] = useState([]);
    const [reconocimientoTests, setReconocimientoTests] = useState([]);
    const [busquedaTests, setBusquedaTests] = useState([]);
    // Estados para generar los títulos de los tests
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
        getScoreTable();
        showInstructions();
    }, []);
    const text = "¡Bienvenido al Módulo de Resultados! " +
        "Selecciona una sección para ver la lista de evaluaciones. " +
        "Luego, selecciona una de las evaluaciones para ver la tabla de puntuaciones con los resultados de los niños. ";
    useVoiceReader(text, isSpeaking);
    /*------------------- FUNCIONES -------------------*/
    const getScoreTable = (idTest) => {
        axios({
            method: "post",
            data: {
                id_test: idTest,
            },
            withCredentials: true,
            url: "http://poliquizzes.com:3001/getScoreTable"
        }).then((res) => {
            console.log(res.data);
            setNoResults(false);
            setJustOneChild(false);
            setPodiumChildren([]);
            setChildren([]);
            setGoldenChild(null);
            setSilverChild(null);
            setBronzeChild(null);
            if (res.data.length > 2) {
                for (let i = 0; i < 3; i++) {
                    setPodiumChildren((prevPodiumChildren) => [...prevPodiumChildren, res.data[i]]);
                    if (i === 0) setGoldenChild(res.data[i]);
                    if (i === 1) setSilverChild(res.data[i]);
                    if (i === 2) setBronzeChild(res.data[i]);
                }
                for (let i = 3; i < res.data.length; i++) {
                    setChildren((prevChildren) => [...prevChildren, res.data[i]]);
                }
            } else {
                for (let i = 0; i < res.data.length; i++) {
                    setPodiumChildren((prevPodiumChildren) => [...prevPodiumChildren, res.data[i]]);
                    if (i === 0) setGoldenChild(res.data[i]);
                    if (i === 1) setSilverChild(res.data[i]);
                    if (i === 2) setBronzeChild(res.data[i]);
                }
            }
            if (res.data.length === 0) {
                setNoResults(true);
            }
            if (res.data.length < 3) {
                setJustOneChild(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getSections = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://poliquizzes.com:3001/getSections"
        }).then((res) => {
            setSections(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
    const getInformacionTests = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://poliquizzes.com:3001/getInformacionTests"
        }).then((res) => {
            setInformacionTests(res.data);
            if (res.data.length !== 0) {
                setInformationTitle(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getSemejanzasTests = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://poliquizzes.com:3001/getSemejanzasTests"
        }).then((res) => {
            setSemejanzasTests(res.data);
            if (res.data.length !== 0) {
                setSemejanzasTitle(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getVocabularioTests = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://poliquizzes.com:3001/getVocabularioTests"
        }).then((res) => {
            setVocabularioTests(res.data);
            if (res.data.length !== 0) {
                setVocabularioTitle(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getComprensionTests = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://poliquizzes.com:3001/getComprensionTests"
        }).then((res) => {
            setComprensionTests(res.data);
            if (res.data.length !== 0) {
                setComprensionTitle(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getDibujosTests = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://poliquizzes.com:3001/getDibujosTests"
        }).then((res) => {
            setDibujosTests(res.data);
            if (res.data.length !== 0) {
                setDibujosTitle(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getNombresTests = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://poliquizzes.com:3001/getNombresTests"
        }).then((res) => {
            setNombresTests(res.data);
            if (res.data.length !== 0) {
                setNombresTitle(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getMatricesTests = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://poliquizzes.com:3001/getMatricesTests"
        }).then((res) => {
            setMatricesTests(res.data);
            if (res.data.length !== 0) {
                setMatricesTitle(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getConceptosTests = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://poliquizzes.com:3001/getConceptosTests"
        }).then((res) => {
            setConceptosTests(res.data);
            if (res.data.length !== 0) {
                setConceptosTitle(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getReconocimientoTests = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://poliquizzes.com:3001/getReconocimientoTests"
        }).then((res) => {
            setReconocimientoTests(res.data);
            if (res.data.length !== 0) {
                setReconocimientoTitle(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const getBusquedaTests = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://poliquizzes.com:3001/getBusquedaTests"
        }).then((res) => {
            setBusquedaTests(res.data);
            if (res.data.length !== 0) {
                setBusquedaTitle(true);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const showTests = () => {
        switch (section) {
            case "Información":
                getInformacionTests();
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
                getSemejanzasTests();
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
                getVocabularioTests();
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
                getComprensionTests();
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
                getDibujosTests();
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
                getNombresTests();
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
                getMatricesTests();
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
                getConceptosTests();
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
                getReconocimientoTests();
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
                getBusquedaTests();
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
    const handleTestClick = (testId) => {
        // Si el test ya estaba seleccionado, lo deselecciona; de lo contrario, lo selecciona
        setSelectedTest((prevSelectedTest) => (prevSelectedTest === testId ? null : testId));
    };
    const showInstructions = () => {
        Swal.fire({
            icon: "info",
            title: "Bienvenido al Módulo de Resultados",
            html: "<div>\n" +
                "                <h5>Paso 1</h5>\n" +
                "                <p>En el lado izquierdo de la pantalla, selecciona una sección." +
                "                   A continuación aparecerá la <strong>Lista de Evaluaciones</strong>. </p>\n" +
                "                <h5>Paso 2</h5>\n" +
                "                <p>Selecciona una de las evaluaciones para poder observar sus resultados " +
                "                   haciendo clic sobre la tarjeta." +
                "                <h5>Paso 3</h5>\n" +
                "                <p>Revisa la <strong>Tabla de Puntuaciones</strong>. Los tres mejores puntajes obtenidos" +
                "                de cada evaluación aparecerán en la parte superior a manera de <strong>Podio</strong>.</p>" +
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
    const confirmGetBack = () => {
        router.push('/modulos').then(r => console.log(r));
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
                            instruction={`Resultados de los niños`}
                            information={showInstructions}
                            info_color={button.btn_red}
                            voiceCommand={hearVoice}
                            silenceCommand={shutUp}
                            hiddenHome={`hidden`}/>
            <div className={`container-fluid px-5`}>
                <div className={`row px-5 h-fit`}>
                    <div className={`col-4 self-center p-0`}>
                        <div className={`${styles.overflow_col_results} px-4`}>
                            <br/>
                            <div className={`flex justify-center px-0`}>
                                <select value={sectionSelected}
                                        onChange={e => {
                                            setSectionSelected(e.target.value);
                                            section = e.target.value;
                                            showTests();
                                        }}
                                        className={`border-2 border-black border-opacity-50 rounded-full font-bold w-100 px-4 py-2 shadow-md
                                    ${styles.input_red}`}>
                                    <option value="">Selecciona una sección</option>
                                    {sections.map((section, index) => (
                                        <option key={index}
                                                value={section.nombre_seccion}>
                                            {section.nombre_seccion}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <br/>
                            <h3 className={`flex justify-center`}>Lista de Evaluaciones</h3>
                            <div className={`container-fluid border-1 border-black shadow-md rounded-2xl bg-white
                        ${styles.overflow_container_test}`}>
                                <br/>
                                {informationTitle &&
                                    <div className={`col-12 px-2`}>
                                        {informacionTests.map((test) => (
                                            <div key={test.id_test} className={`justify-content-center`}>
                                                <div className={`border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}
                                ${selectedTest === test.id_test ? styles.selected_test_card_results : ''}`}>
                                                    <div className={`card-body`}>
                                                        <div
                                                            className={`container-fluid p-0 d-flex justify-content-center`}>
                                                            <button onClick={() => {
                                                                setTestSelected(test.id_test);
                                                                handleTestClick(test.id_test);
                                                                getScoreTable(test.id_test);
                                                            }} className={`py-4 w-100`}>
                                                                <h5 className={`card-title`}>
                                                                    {test.nombre_test}
                                                                </h5>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        ))}
                                    </div>
                                }
                                {semejanzasTitle &&
                                    <div className={`col-12 px-2`}>
                                        {semejanzasTests.map((test) => (
                                            <div key={test.id_test} className={`justify-content-center`}>
                                                <div className={`border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}
                                ${selectedTest === test.id_test ? styles.selected_test_card_results : ''}`}>
                                                    <div className={`card-body`}>
                                                        <div
                                                            className={`container-fluid p-0 d-flex justify-content-center`}>
                                                            <button onClick={() => {
                                                                setTestSelected(test.id_test);
                                                                handleTestClick(test.id_test);
                                                                getScoreTable(test.id_test);
                                                            }} className={`py-4 w-100`}>
                                                                <h5 className={`card-title`}>
                                                                    {test.nombre_test}
                                                                </h5>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        ))}
                                    </div>
                                }
                                {vocabularioTitle &&
                                    <div className={`col-12 px-2`}>
                                        {vocabularioTests.map((test) => (
                                            <div key={test.id_test} className={`justify-content-center`}>
                                                <div className={`border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}
                                ${selectedTest === test.id_test ? styles.selected_test_card_results : ''}`}>
                                                    <div className={`card-body`}>
                                                        <div
                                                            className={`container-fluid p-0 d-flex justify-content-center`}>
                                                            <button onClick={() => {
                                                                setTestSelected(test.id_test);
                                                                handleTestClick(test.id_test);
                                                                getScoreTable(test.id_test);
                                                            }} className={`py-4 w-100`}>
                                                                <h5 className={`card-title`}>
                                                                    {test.nombre_test}
                                                                </h5>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        ))}
                                    </div>
                                }
                                {comprensionTitle &&
                                    <div className={`col-12 px-2`}>
                                        {comprensionTests.map((test) => (
                                            <div key={test.id_test} className={`justify-content-center`}>
                                                <div className={`border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}
                                ${selectedTest === test.id_test ? styles.selected_test_card_results : ''}`}>
                                                    <div className={`card-body`}>
                                                        <div
                                                            className={`container-fluid p-0 d-flex justify-content-center`}>
                                                            <button onClick={() => {
                                                                setTestSelected(test.id_test);
                                                                handleTestClick(test.id_test);
                                                                getScoreTable(test.id_test);
                                                            }} className={`py-4 w-100`}>
                                                                <h5 className={`card-title`}>
                                                                    {test.nombre_test}
                                                                </h5>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        ))}
                                    </div>
                                }
                                {dibujosTitle &&
                                    <div className={`col-12 px-2`}>
                                        {dibujosTests.map((test) => (
                                            <div key={test.id_test} className={`justify-content-center`}>
                                                <div className={`border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}
                                ${selectedTest === test.id_test ? styles.selected_test_card_results : ''}`}>
                                                    <div className={`card-body`}>
                                                        <div
                                                            className={`container-fluid p-0 d-flex justify-content-center`}>
                                                            <button onClick={() => {
                                                                setTestSelected(test.id_test);
                                                                handleTestClick(test.id_test);
                                                                getScoreTable(test.id_test);
                                                            }} className={`py-4 w-100`}>
                                                                <h5 className={`card-title`}>
                                                                    {test.nombre_test}
                                                                </h5>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        ))}
                                    </div>
                                }
                                {nombresTitle &&
                                    <div className={`col-12 px-2`}>
                                        {nombresTests.map((test) => (
                                            <div key={test.id_test} className={`justify-content-center`}>
                                                <div className={`border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}
                                ${selectedTest === test.id_test ? styles.selected_test_card_results : ''}`}>
                                                    <div className={`card-body`}>
                                                        <div
                                                            className={`container-fluid p-0 d-flex justify-content-center`}>
                                                            <button onClick={() => {
                                                                setTestSelected(test.id_test);
                                                                handleTestClick(test.id_test);
                                                                getScoreTable(test.id_test);
                                                            }} className={`py-4 w-100`}>
                                                                <h5 className={`card-title`}>
                                                                    {test.nombre_test}
                                                                </h5>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        ))}
                                    </div>
                                }
                                {matricesTitle &&
                                    <div className={`col-12 px-2`}>
                                        {matricesTests.map((test) => (
                                            <div key={test.id_test} className={`justify-content-center`}>
                                                <div className={`border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}
                                ${selectedTest === test.id_test ? styles.selected_test_card_results : ''}`}>
                                                    <div className={`card-body`}>
                                                        <div
                                                            className={`container-fluid p-0 d-flex justify-content-center`}>
                                                            <button onClick={() => {
                                                                setTestSelected(test.id_test);
                                                                handleTestClick(test.id_test);
                                                                getScoreTable(test.id_test);
                                                            }} className={`py-4 w-100`}>
                                                                <h5 className={`card-title`}>
                                                                    {test.nombre_test}
                                                                </h5>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        ))}
                                    </div>
                                }
                                {conceptosTitle &&
                                    <div className={`col-12 px-2`}>
                                        {conceptosTests.map((test) => (
                                            <div key={test.id_test} className={`justify-content-center`}>
                                                <div className={`border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}
                                ${selectedTest === test.id_test ? styles.selected_test_card_results : ''}`}>
                                                    <div className={`card-body`}>
                                                        <div
                                                            className={`container-fluid p-0 d-flex justify-content-center`}>
                                                            <button onClick={() => {
                                                                setTestSelected(test.id_test);
                                                                handleTestClick(test.id_test);
                                                                getScoreTable(test.id_test);
                                                            }} className={`py-4 w-100`}>
                                                                <h5 className={`card-title`}>
                                                                    {test.nombre_test}
                                                                </h5>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        ))}
                                    </div>
                                }
                                {reconocimientoTitle &&
                                    <div className={`col-12 px-2`}>
                                        {reconocimientoTests.map((test) => (
                                            <div key={test.id_test} className={`justify-content-center`}>
                                                <div className={`border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}
                                ${selectedTest === test.id_test ? styles.selected_test_card_results : ''}`}>
                                                    <div className={`card-body`}>
                                                        <div
                                                            className={`container-fluid p-0 d-flex justify-content-center`}>
                                                            <button onClick={() => {
                                                                setTestSelected(test.id_test);
                                                                handleTestClick(test.id_test);
                                                                getScoreTable(test.id_test);
                                                            }} className={`py-4 w-100`}>
                                                                <h5 className={`card-title`}>
                                                                    {test.nombre_test}
                                                                </h5>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        ))}
                                    </div>
                                }
                                {busquedaTitle &&
                                    <div className={`col-12 px-2`}>
                                        {busquedaTests.map((test) => (
                                            <div key={test.id_test} className={`justify-content-center`}>
                                                <div className={`border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}
                                ${selectedTest === test.id_test ? styles.selected_test_card_results : ''}`}>
                                                    <div className={`card-body`}>
                                                        <div
                                                            className={`container-fluid p-0 d-flex justify-content-center`}>
                                                            <button onClick={() => {
                                                                setTestSelected(test.id_test);
                                                                handleTestClick(test.id_test);
                                                                getScoreTable(test.id_test);
                                                            }} className={`py-4 w-100`}>
                                                                <h5 className={`card-title`}>
                                                                    {test.nombre_test}
                                                                </h5>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={`col-8 h-fit p-0`}>
                        <div className={`${styles.overflow_col_results} px-4 `}>
                            <h3 className={`flex justify-center`}>Tabla de puntuaciones</h3>
                            <div className={`container-fluid border-1 border-black shadow-md rounded-2xl bg-white
                        ${styles.overflow_container_test_results_2}`}>
                                <br/>
                                {testSelected !== '' && (
                                    <div className={`px-2`}>
                                        {noResults && (
                                            <div>
                                                <h5>No hay resultados para esta evaluación</h5>
                                            </div>
                                        )}
                                        {goldenChild !== null && silverChild !== null && bronzeChild !== null && (
                                            <div>
                                                {!noResults && (
                                                    <div>
                                                        <div className="row justify-content-evenly">
                                                            <div className={`col-3 self-end p-0`}>
                                                                <div
                                                                    className={`d-flex justify-content-center`}>
                                                                    <div
                                                                        className={`border-2 border-black border-opacity-10 rounded-full p-2 ${score.silver_star}`}>
                                                                        <Image alt={`medalla de plata`}
                                                                               width={50}
                                                                               height={50}
                                                                               className={`${score.medal}`}
                                                                               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAVRJREFUSEvFluFRwzAMhV8nATaBTegkhUnoJu0mpZNQHmflhGNJtpJcfNdrfiT+/KQnyQfstA47cbEE/F4Ofc4cPgt+BXApwDcA11F4Fkwo4VyEEj60MmCtVmDDqjPgLwCSXwEzz8cRyRnwTwPwXcLN/641Cv4AcDJ2HlI9Cm6plXNQ7UuXXGBWxzSOuPWpbPIMQH7RvhJq/svzXT1PNa8V0zA0zpZrcr8Gt8pk7UMwFX+RqHPsmWfpIf7VestcW4R81mAsV68FZ1jZWGa93CunpXC3qUR1nIWHgyMC01Be07AMF3axCJxVHHaxrcCMhDsqI3BrBPbW8+fvi+wLzRWBb6VP98L0e67BIrBlLG4qg59RkcGiwW6eM3XcCqHVas08e+A6v6LSumVwdNbqzbLywPom6RqlMoBWnwJTAXNHpd13KXV54LfmZT8yV8bNXd/sBn4AJNlEH49DWZ4AAAAASUVORK5CYII="/>
                                                                    </div>
                                                                    <div
                                                                        className={`border-2 border-black border-opacity-10 rounded-full p-2 ${score.silver_star}`}>
                                                                        <Image alt={`medalla de plata`}
                                                                               width={50}
                                                                               height={50}
                                                                               className={`${score.medal}`}
                                                                               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAVRJREFUSEvFluFRwzAMhV8nATaBTegkhUnoJu0mpZNQHmflhGNJtpJcfNdrfiT+/KQnyQfstA47cbEE/F4Ofc4cPgt+BXApwDcA11F4Fkwo4VyEEj60MmCtVmDDqjPgLwCSXwEzz8cRyRnwTwPwXcLN/641Cv4AcDJ2HlI9Cm6plXNQ7UuXXGBWxzSOuPWpbPIMQH7RvhJq/svzXT1PNa8V0zA0zpZrcr8Gt8pk7UMwFX+RqHPsmWfpIf7VestcW4R81mAsV68FZ1jZWGa93CunpXC3qUR1nIWHgyMC01Be07AMF3axCJxVHHaxrcCMhDsqI3BrBPbW8+fvi+wLzRWBb6VP98L0e67BIrBlLG4qg59RkcGiwW6eM3XcCqHVas08e+A6v6LSumVwdNbqzbLywPom6RqlMoBWnwJTAXNHpd13KXV54LfmZT8yV8bNXd/sBn4AJNlEH49DWZ4AAAAASUVORK5CYII="/>
                                                                    </div>

                                                                </div>
                                                                <br/>
                                                                <div className={`${score.bg_plata}`}>
                                                                    <div
                                                                        className={`pt-3 font-bold px-2`}>{silverChild.nombre}</div>
                                                                    <div
                                                                        className={`pt-2 font-medium`}>{silverChild.edad} años
                                                                    </div>
                                                                    <div
                                                                        className={`font-normal ${score.puntaje_plata}`}>{silverChild.puntaje} puntos
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={`col-3 p-0`}>
                                                                <div
                                                                    className={`d-flex justify-content-center`}>
                                                                    <div
                                                                        className={`border-2 border-black border-opacity-10 rounded-full p-2 ${score.golden_star}`}>
                                                                        <Image alt={`medalla de plata`}
                                                                               width={50}
                                                                               height={50}
                                                                               className={`${score.medal}`}
                                                                               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAVRJREFUSEvFluFRwzAMhV8nATaBTegkhUnoJu0mpZNQHmflhGNJtpJcfNdrfiT+/KQnyQfstA47cbEE/F4Ofc4cPgt+BXApwDcA11F4Fkwo4VyEEj60MmCtVmDDqjPgLwCSXwEzz8cRyRnwTwPwXcLN/641Cv4AcDJ2HlI9Cm6plXNQ7UuXXGBWxzSOuPWpbPIMQH7RvhJq/svzXT1PNa8V0zA0zpZrcr8Gt8pk7UMwFX+RqHPsmWfpIf7VestcW4R81mAsV68FZ1jZWGa93CunpXC3qUR1nIWHgyMC01Be07AMF3axCJxVHHaxrcCMhDsqI3BrBPbW8+fvi+wLzRWBb6VP98L0e67BIrBlLG4qg59RkcGiwW6eM3XcCqHVas08e+A6v6LSumVwdNbqzbLywPom6RqlMoBWnwJTAXNHpd13KXV54LfmZT8yV8bNXd/sBn4AJNlEH49DWZ4AAAAASUVORK5CYII="/>
                                                                    </div>
                                                                    <div
                                                                        className={`border-2 border-black border-opacity-10 rounded-full p-2 ${score.golden_star}`}>
                                                                        <Image alt={`medalla de plata`}
                                                                               width={50}
                                                                               height={50}
                                                                               className={`${score.medal}`}
                                                                               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAVRJREFUSEvFluFRwzAMhV8nATaBTegkhUnoJu0mpZNQHmflhGNJtpJcfNdrfiT+/KQnyQfstA47cbEE/F4Ofc4cPgt+BXApwDcA11F4Fkwo4VyEEj60MmCtVmDDqjPgLwCSXwEzz8cRyRnwTwPwXcLN/641Cv4AcDJ2HlI9Cm6plXNQ7UuXXGBWxzSOuPWpbPIMQH7RvhJq/svzXT1PNa8V0zA0zpZrcr8Gt8pk7UMwFX+RqHPsmWfpIf7VestcW4R81mAsV68FZ1jZWGa93CunpXC3qUR1nIWHgyMC01Be07AMF3axCJxVHHaxrcCMhDsqI3BrBPbW8+fvi+wLzRWBb6VP98L0e67BIrBlLG4qg59RkcGiwW6eM3XcCqHVas08e+A6v6LSumVwdNbqzbLywPom6RqlMoBWnwJTAXNHpd13KXV54LfmZT8yV8bNXd/sBn4AJNlEH49DWZ4AAAAASUVORK5CYII="/>
                                                                    </div>
                                                                    <div
                                                                        className={`border-2 border-black border-opacity-10 rounded-full p-2 ${score.golden_star}`}>
                                                                        <Image alt={`medalla de plata`}
                                                                               width={50}
                                                                               height={50}
                                                                               className={`${score.medal}`}
                                                                               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAVRJREFUSEvFluFRwzAMhV8nATaBTegkhUnoJu0mpZNQHmflhGNJtpJcfNdrfiT+/KQnyQfstA47cbEE/F4Ofc4cPgt+BXApwDcA11F4Fkwo4VyEEj60MmCtVmDDqjPgLwCSXwEzz8cRyRnwTwPwXcLN/641Cv4AcDJ2HlI9Cm6plXNQ7UuXXGBWxzSOuPWpbPIMQH7RvhJq/svzXT1PNa8V0zA0zpZrcr8Gt8pk7UMwFX+RqHPsmWfpIf7VestcW4R81mAsV68FZ1jZWGa93CunpXC3qUR1nIWHgyMC01Be07AMF3axCJxVHHaxrcCMhDsqI3BrBPbW8+fvi+wLzRWBb6VP98L0e67BIrBlLG4qg59RkcGiwW6eM3XcCqHVas08e+A6v6LSumVwdNbqzbLywPom6RqlMoBWnwJTAXNHpd13KXV54LfmZT8yV8bNXd/sBn4AJNlEH49DWZ4AAAAASUVORK5CYII="/>
                                                                    </div>
                                                                </div>
                                                                <br/>
                                                                <div className={`${score.bg_oro}`}>
                                                                    <div
                                                                        className={`pt-3 font-bold px-2`}>{goldenChild.nombre}</div>
                                                                    <div
                                                                        className={`pt-2 font-medium`}>{goldenChild.edad} años
                                                                    </div>
                                                                    <div
                                                                        className={`font-normal ${score.puntaje_oro}`}>{goldenChild.puntaje} puntos
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={`col-3 self-end p-0`}>
                                                                <div
                                                                    className={`d-flex justify-content-center`}>
                                                                    <div
                                                                        className={`border-2 border-black border-opacity-10 rounded-full p-2 ${score.bronze_star}`}>
                                                                        <Image alt={`medalla de plata`}
                                                                               width={50}
                                                                               height={50}
                                                                               className={`${score.medal}`}
                                                                               src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAVRJREFUSEvFluFRwzAMhV8nATaBTegkhUnoJu0mpZNQHmflhGNJtpJcfNdrfiT+/KQnyQfstA47cbEE/F4Ofc4cPgt+BXApwDcA11F4Fkwo4VyEEj60MmCtVmDDqjPgLwCSXwEzz8cRyRnwTwPwXcLN/641Cv4AcDJ2HlI9Cm6plXNQ7UuXXGBWxzSOuPWpbPIMQH7RvhJq/svzXT1PNa8V0zA0zpZrcr8Gt8pk7UMwFX+RqHPsmWfpIf7VestcW4R81mAsV68FZ1jZWGa93CunpXC3qUR1nIWHgyMC01Be07AMF3axCJxVHHaxrcCMhDsqI3BrBPbW8+fvi+wLzRWBb6VP98L0e67BIrBlLG4qg59RkcGiwW6eM3XcCqHVas08e+A6v6LSumVwdNbqzbLywPom6RqlMoBWnwJTAXNHpd13KXV54LfmZT8yV8bNXd/sBn4AJNlEH49DWZ4AAAAASUVORK5CYII="/>
                                                                    </div>
                                                                </div>
                                                                <br/>
                                                                <div className={`${score.bg_bronce}`}>
                                                                    <div
                                                                        className={`pt-3 font-bold px-2`}>{bronzeChild.nombre}</div>
                                                                    <div
                                                                        className={`font-medium`}>{bronzeChild.edad} años
                                                                    </div>
                                                                    <div
                                                                        className={`font-normal ${score.puntaje_bronce}`}>{bronzeChild.puntaje} puntos
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                <br/>
                                                <br/>
                                                {children.map((child, index) => (
                                                    <div key={index} className={`justify-content-center px-5`}>
                                                        <div className={`border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}`}>
                                                            <div className={`card-body`}>
                                                                <div
                                                                    className={`container-fluid px-5 d-flex justify-content-center`}>
                                                                    <div className={`py-4 w-100`}>
                                                                        <div className={`row`}>
                                                                            <div className={`col-7`}>
                                                                                <h5 className={`card-title`}>
                                                                                    {child.nombre} - {child.edad} años
                                                                                </h5>
                                                                            </div>
                                                                            <div className={`col-5 flex justify-end`}>
                                                                                <h5 className={`card-title`}>
                                                                                    Puntaje: <strong>{child.puntaje}</strong>
                                                                                </h5>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <br/>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {justOneChild && (
                                            <div>
                                                {podiumChildren.map((child, index) => (
                                                    <div key={index} className={`justify-content-center`}>
                                                        <div className={`border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}`}>
                                                            <div className={`card-body`}>
                                                                <div
                                                                    className={`container-fluid p-0 d-flex justify-content-center`}>
                                                                    <button className={`py-4 w-100`}>
                                                                        <div className={`row`}>
                                                                            <div className={`col-7`}>
                                                                                <h5 className={`card-title`}>
                                                                                    {child.nombre} - {child.edad} años
                                                                                </h5>
                                                                            </div>
                                                                            <div className={`col-5`}>
                                                                                <h5 className={`card-title`}>
                                                                                    Puntaje: <strong>{child.puntaje}</strong>
                                                                                </h5>
                                                                            </div>
                                                                        </div>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <br/>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}