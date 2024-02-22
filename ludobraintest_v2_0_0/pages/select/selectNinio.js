import UpperBar from "@/components/UpperBar";
import navstyles from "@/styles/navstyles.module.css";
import InstructionBar from "@/components/InstructionBar";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import styles from "@/styles/styles.module.css";
import button from "@/styles/button.module.css";
import Button from "@/components/Button";
import Swal from 'sweetalert2'
import SweetAlert from "sweetalert2";
import UseSpeechSynthesis from "@/effects/useSpeechSynthesis";
import useVoiceReader from "@/effects/useVoiceReader";

export default function SelectNinio() {
    const router = useRouter();
    const {speak, speaking} = UseSpeechSynthesis();
    let section;
    const text = "¡Bienvenido al módulo de Evaluación! En la parte izquierda de la pantalla, selecciona al niño que realizará la evaluación. " +
        "En la parte derecha, selecciona la sección y la evaluación que realizará el niño, ," +
        "Una vez seleccionados, presiona el botón \"Iniciar sesión de evaluación\".";
    /*------------------- ESTADOS -------------------*/
    const [children, setChildren] = useState([]);
    const [childSelected, setChildSelected] = useState('');
    const [testSelected, setTestSelected] = useState('');
    const [sections, setSections] = useState([]);
    const [sectionSelected, setSectionSelected] = useState('');
    const [selectedChild, setSelectedChild] = useState(null);
    const [selectedTest, setSelectedTest] = useState(null);
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
    // Estado para el texto de las instrucciones
    const [isSpeaking, setIsSpeaking] = useState(false);
    /*------------------- EFECTOS -------------------*/
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        getNinios();
        getSections();
        showInstructions();
    }, []);
    /*------------------- FUNCIONES -------------------*/
    const getNinios = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: "http://poliquizzes.com:3001/getChildren"
        }).then((res) => {
            if (res.data) {
                setChildren(res.data); // Establece el estado con los resultados
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
    const getTestSession = () => {
        axios({
            method: "post",
            data: {
                id_ninio: childSelected,
                id_test: testSelected
            },
            withCredentials: true,
            url: "http://poliquizzes.com:3001/getTestSession"
        }).then((res) => {
            localStorage.setItem('id_t_n', res.data[0].id_t_n);
            localStorage.setItem('id_test', testSelected);
            localStorage.setItem('id_ninio', childSelected);
            router.push(`/menuOpcionesTest`).then(r => console.log(r));
            shutUp();
        }).catch((err) => {
            console.log(err);
        })
    }
    const startTest = () => {
        if (!selectedChild && selectedTest) {
            SweetAlert.fire({
                icon: "warning",
                title: "Debes seleccionar un Jugador antes de empezar",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(25,169,182,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            });
        } else if (selectedChild && !selectedTest) {
            SweetAlert.fire({
                icon: "warning",
                title: "Debes seleccionar una Evaluación antes de empezar",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(25,169,182,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            });
        } else if (!selectedChild && !selectedTest) {
            SweetAlert.fire({
                icon: "warning",
                title: "Debes seleccionar un Jugador y una Evaluación antes de empezar",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(25,169,182,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            });
        } else {
            axios({
                method: "post",
                withCredentials: true,
                url: "http://poliquizzes.com:3001/startTest",
                data: {
                    id_ninio: childSelected,
                    id_test: testSelected
                }
            }).then((res) => {
                console.log("Test iniciado correctamente");
                getTestSession();
                shutUp();
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    const handleChildClick = (childId) => {
        // Si el niño ya estaba seleccionado, lo deselecciona; de lo contrario, lo selecciona
        setSelectedChild((prevSelectedChild) => (prevSelectedChild === childId ? null : childId));
    };
    const handleTestClick = (testId) => {
        // Si el test ya estaba seleccionado, lo deselecciona; de lo contrario, lo selecciona
        setSelectedTest((prevSelectedTest) => (prevSelectedTest === testId ? null : testId));
    };
    const showInstructions = () => {
        Swal.fire({
            icon: "info",
            title: "Bienvenido al Módulo de Evaluación",
            html: "<div>\n" +
                "                <h5>Paso 1</h5>\n" +
                "                <p>En el lado izquierdo aparecerá la lista de niños registrados por ti. <strong>Selecciona un\n" +
                "                    niño para que realice la evaluación.</strong></p>\n" +
                "                <h5>Paso 2</h5>\n" +
                "                <p>En el lado derecho, deberás seleccionar un tipo de sección para que aparezcan las evaluaciones\n" +
                "                    asociadas a dicha sección. Luego, aparecerá la lista de evaluaciones disponibles. <strong>Selecciona\n" +
                "                        la evaluación que realizará el niño.</strong></p>\n" +
                "                <h5>Paso 3</h5>\n" +
                "                <p>Una vez seleccionado el niño y la evaluación, presiona el botón <strong>\"Iniciar sesión de Evaluación\"</strong></p>" +
                "                " +
                "            </div>",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(25,169,182,0.75)",
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
    useVoiceReader(text, isSpeaking);
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar color={navstyles.upper_bar_skyblue}
                      silenceVoice={shutUp}/>
            <InstructionBar confirmation={confirmGetBack}
                            instruction={`Selecciona al niño y la evaluación que realizará`}
                            information={showInstructions}
                            info_color={button.btn_blue}
                            voiceCommand={hearVoice}
                            silenceCommand={shutUp}
                            hiddenHome={`hidden`}/>
            <div className={`container-fluid`}>
                <div className={`row`}>
                    <div className={`col-6 ${styles.overflow_col}`}>
                        <h4 className={`d-flex justify-content-center`}>Niños</h4>
                        <div className={`container-fluid border-1 border-black shadow-md rounded-2xl bg-white px-4
                        ${styles.overflow_container}`}>
                            <br/>
                            {children.map((child, index) => (
                                <div key={index} className={`justify-content-center`}>
                                    <div className={`p-0 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_blue}
                                ${selectedChild === child.id_ninio ? styles.selected_child_card : ''}`}>
                                        <div className={`card-body`}>
                                            <div className={`d-flex justify-content-center`}>
                                                <button onClick={() => {
                                                    setChildSelected(child.id_ninio);
                                                    handleChildClick(child.id_ninio)
                                                }}
                                                        className={`d-flex justify-content-center py-3 w-100`}>
                                                    <h5 className={`card-title pt-1`}>{child.nombre} - {child.edad} años</h5>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`col-6 ${styles.overflow_col}`}>
                        <h4 className={`d-flex justify-content-center`}>Evaluaciones</h4>
                        <div className={`flex justify-center`}>
                            <select value={sectionSelected}
                                    onChange={e => {
                                        setSectionSelected(e.target.value);
                                        section = e.target.value;
                                        showTests();
                                    }}
                                    className={`border-2 border-black border-opacity-50 rounded-full font-bold w-75 px-4 py-2 shadow-md
                                    ${styles.input_sky_blue}`}>
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
                        <div className={`container-fluid border-1 border-black shadow-md rounded-2xl bg-white
                        ${styles.overflow_container_test}`}>
                            <br/>
                            {informationTitle &&
                                <div className={`col-12 px-2`}>
                                    {informacionTests.map((test) => (
                                        <div key={test.id_test} className={`justify-content-center`}>
                                            <div className={`border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_blue}
                                ${selectedTest === test.id_test ? styles.selected_test_card : ''}`}>
                                                <div className={`card-body`}>
                                                    <div
                                                        className={`container-fluid p-0 d-flex justify-content-center`}>
                                                        <button onClick={() => {
                                                            setTestSelected(test.id_test);
                                                            handleTestClick(test.id_test);
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
                                ${styles.card_body_blue}
                                ${selectedTest === test.id_test ? styles.selected_test_card : ''}`}>
                                                <div className={`card-body`}>
                                                    <div
                                                        className={`container-fluid p-0 d-flex justify-content-center`}>
                                                        <button onClick={() => {
                                                            setTestSelected(test.id_test);
                                                            handleTestClick(test.id_test);
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
                                ${styles.card_body_blue}
                                ${selectedTest === test.id_test ? styles.selected_test_card : ''}`}>
                                                <div className={`card-body`}>
                                                    <div
                                                        className={`container-fluid p-0 d-flex justify-content-center`}>
                                                        <button onClick={() => {
                                                            setTestSelected(test.id_test);
                                                            handleTestClick(test.id_test);
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
                                ${styles.card_body_blue}
                                ${selectedTest === test.id_test ? styles.selected_test_card : ''}`}>
                                                <div className={`card-body`}>
                                                    <div
                                                        className={`container-fluid p-0 d-flex justify-content-center`}>
                                                        <button onClick={() => {
                                                            setTestSelected(test.id_test);
                                                            handleTestClick(test.id_test);
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
                                ${styles.card_body_blue}
                                ${selectedTest === test.id_test ? styles.selected_test_card : ''}`}>
                                                <div className={`card-body`}>
                                                    <div
                                                        className={`container-fluid p-0 d-flex justify-content-center`}>
                                                        <button onClick={() => {
                                                            setTestSelected(test.id_test);
                                                            handleTestClick(test.id_test);
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
                                ${styles.card_body_blue}
                                ${selectedTest === test.id_test ? styles.selected_test_card : ''}`}>
                                                <div className={`card-body`}>
                                                    <div
                                                        className={`container-fluid p-0 d-flex justify-content-center`}>
                                                        <button onClick={() => {
                                                            setTestSelected(test.id_test);
                                                            handleTestClick(test.id_test);
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
                                ${styles.card_body_blue}
                                ${selectedTest === test.id_test ? styles.selected_test_card : ''}`}>
                                                <div className={`card-body`}>
                                                    <div
                                                        className={`container-fluid p-0 d-flex justify-content-center`}>
                                                        <button onClick={() => {
                                                            setTestSelected(test.id_test);
                                                            handleTestClick(test.id_test);
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
                                ${styles.card_body_blue}
                                ${selectedTest === test.id_test ? styles.selected_test_card : ''}`}>
                                                <div className={`card-body`}>
                                                    <div
                                                        className={`container-fluid p-0 d-flex justify-content-center`}>
                                                        <button onClick={() => {
                                                            setTestSelected(test.id_test);
                                                            handleTestClick(test.id_test);
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
                                ${styles.card_body_blue}
                                ${selectedTest === test.id_test ? styles.selected_test_card : ''}`}>
                                                <div className={`card-body`}>
                                                    <div
                                                        className={`container-fluid p-0 d-flex justify-content-center`}>
                                                        <button onClick={() => {
                                                            setTestSelected(test.id_test);
                                                            handleTestClick(test.id_test);
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
                                ${styles.card_body_blue}
                                ${selectedTest === test.id_test ? styles.selected_test_card : ''}`}>
                                                <div className={`card-body`}>
                                                    <div
                                                        className={`container-fluid p-0 d-flex justify-content-center`}>
                                                        <button onClick={() => {
                                                            setTestSelected(test.id_test);
                                                            handleTestClick(test.id_test);
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
                <br/>
                <div className={`flex justify-center`}>
                    <div className={`${styles.div_btn}`}>
                        <Button text={`Iniciar sesión de Evaluación`} instruction={startTest}
                                bg_color={button.btn_blue}></Button>
                    </div>
                </div>
                <br/>
            </div>
        </main>
    )
}