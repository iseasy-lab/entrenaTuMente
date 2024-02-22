import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import navstyles from '@/styles/navstyles.module.css'
import styles from '@/styles/styles.module.css'
import button from '@/styles/button.module.css'
import AddButton from "@/components/AddButton";
import {useState, useEffect} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import Swal from "sweetalert2";
import UseSpeechSynthesis from "@/effects/useSpeechSynthesis";
import useVoiceReader from "@/effects/useVoiceReader";
import Image from "next/image";

export default function ReadTest() {
    const router = useRouter();
    let section;
    const {speak, speaking} = UseSpeechSynthesis();
    /*------------------- ESTADOS -------------------*/
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [sectionSelected, setSectionSelected] = useState('');
    const [sections, setSections] = useState([]);
    // Estados para mostrar las preguntas
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
    /*------------------- EFECTOS -------------------*/
    useEffect(() => {
        getSections();
        showInstructions();
    }, []);
    const text = "¡Bienvenido al módulo de Administración de Evaluaciones!" +
        "Selecciona una sección para ver la lista de evaluaciones creadas,..." +
        "Dale clic al botón con el símbolo \"más\" que se encuentra en la parte superior central de la pantalla " +
        "para crear una nueva evaluación.";
    useVoiceReader(text, isSpeaking);
    /*------------------- FUNCIONES -------------------*/
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
    const eliminarTest = (idTest) => {
        Swal.fire({
            title: '¿Estás seguro que deseas eliminar esta Evaluación?',
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
                        id_test: idTest,
                    },
                    withCredentials: true,
                    url: "http://poliquizzes.com:3001/deleteTest"
                }).then((res) => {
                    console.log(res);
                    if (res.data.message === 'Test eliminado exitosamente') {
                        let timerInterval;
                        Swal.fire({
                            icon: 'success',
                            title: "¡Evaluación eliminada Correctamente!",
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
                            refreshTest();
                        }, 3000);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        })
    }
    const refreshTest = () => {
        switch (sectionSelected) {
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
    const goActualizarTest = (idTest) => {
        sessionStorage.setItem('dataToPass', idTest);
        router.push('/update/updateTest').then(r => console.log(r));
        shutUp();
    }
    const showInstructions = () => {
        Swal.fire({
            icon: "info",
            title: "Bienvenido al Módulo de Administración de Evaluaciones",
            html: "<div>\n" +
                "                <p>En la parte izquierda de la pantalla encontrarás la lista de <strong>Secciones</strong>, dale\n" +
                "                    clic para desplegarla.</p>\n" +
                "                <p>Cuando selecciones una <strong>Sección</strong>, en la parte derecha de la pantalla aparecerán\n" +
                "                    todas las <strong>Evaluaciones</strong> asociadas a dicha sección.</p>\n" +
                "                <p>Para <strong>Crear una nueva Evaluación</strong>, dale clic al botón con el símbolo\n" +
                "                    <strong>+</strong> que se encuentra en la parte superior central de la pantalla.</p>\n" +
                "                <p>Para <strong>Actualizar una Evaluación</strong>, dale clic al botón con el\n" +
                "                    símbolo <strong>✏️</strong> que se encuentra al lado derecho de cada tarjeta.</p>\n" +
                "                <p>Para <strong>Eliminar una Evaluación</strong>, dale clic al botón con el\n" +
                "                    símbolo <strong>🗑️</strong> que se encuentra al lado derecho de cada tarjeta.</p>\n" +
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
    const goCreateTest = () => {
        router.push("/create/createTest").then(r => console.log(r));
        shutUp();
    }
    const confirmGetBack = () => {
        router.push('/modulosCreacion').then(r => console.log(r));
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
            <UpperBar color={navstyles.upper_bar_green}
                      silenceVoice={shutUp}/>
            <InstructionBar confirmation={confirmGetBack}
                            instruction={`Crea una nueva Evaluación`}
                            information={showInstructions}
                            info_color={button.btn_green}
                            voiceCommand={hearVoice}
                            silenceCommand={shutUp}
                            silenceVoice={shutUp}/>
            <AddButton createPage={goCreateTest}
                       color={button.btn_green}/>
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
                                    ${styles.input_green} mt-4 h-min  text-white`}>
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
                                    {informacionTests.map((test, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_green}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div
                                                                    className={`col-sm-4 col-md-6 col-lg-6 col-xl-7 self-center`}>
                                                                    <div
                                                                        className={`font-medium card-title ${styles.card_test_text}`}>
                                                                        {test.nombre_test}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-4 col-xl-3 d-md-flex d-lg-flex justify-content-between self-center`}>
                                                                    <button onClick={() => eliminarTest(test.id_test)}>
                                                                        <Image src="/images/eliminar.png"
                                                                               alt="trashIcon"
                                                                               className={`${styles.manage_icon}`}
                                                                               width={100}
                                                                               height={100}/>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => goActualizarTest(test.id_test)}>
                                                                        <Image src="/images/lapiz.png" alt="editIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon} shadow-2xl pt-sm-2 pt-md-0`}/>
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
                                    {semejanzasTests.map((test, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_green}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div
                                                                    className={`col-sm-4 col-md-6 col-lg-6 col-xl-7 self-center`}>
                                                                    <div
                                                                        className={`font-medium card-title ${styles.card_test_text}`}>
                                                                        {test.nombre_test}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-4 col-xl-3 d-md-flex d-lg-flex justify-content-between self-center`}>
                                                                    <button onClick={() => eliminarTest(test.id_test)}>
                                                                        <Image src="/images/eliminar.png"
                                                                               alt="trashIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => goActualizarTest(test.id_test)}>
                                                                        <Image src="/images/lapiz.png" alt="editIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon} shadow-2xl pt-sm-2 pt-md-0`}/>
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
                                    {vocabularioTests.map((test, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_green}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div
                                                                    className={`col-sm-4 col-md-6 col-lg-6 col-xl-7 self-center`}>
                                                                    <div
                                                                        className={`font-medium card-title ${styles.card_test_text}`}>
                                                                        {test.nombre_test}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-4 col-xl-3 d-md-flex d-lg-flex justify-content-between self-center`}>
                                                                    <button onClick={() => eliminarTest(test.id_test)}>
                                                                        <Image src="/images/eliminar.png"
                                                                               alt="trashIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => goActualizarTest(test.id_test)}>
                                                                        <Image src="/images/lapiz.png" alt="editIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon} shadow-2xl pt-sm-2 pt-md-0`}/>
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
                                    {comprensionTests.map((test, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_green}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div
                                                                    className={`col-sm-4 col-md-6 col-lg-6 col-xl-7 self-center`}>
                                                                    <div
                                                                        className={`font-medium card-title ${styles.card_test_text}`}>
                                                                        {test.nombre_test}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-4 col-xl-3 d-md-flex d-lg-flex justify-content-between self-center`}>
                                                                    <button onClick={() => eliminarTest(test.id_test)}>
                                                                        <Image src="/images/eliminar.png"
                                                                               alt="trashIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => goActualizarTest(test.id_test)}>
                                                                        <Image src="/images/lapiz.png" alt="editIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon} shadow-2xl pt-sm-2 pt-md-0`}/>
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
                                    {dibujosTests.map((test, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_green}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div
                                                                    className={`col-sm-4 col-md-6 col-lg-6 col-xl-7 self-center`}>
                                                                    <div
                                                                        className={`font-medium card-title ${styles.card_test_text}`}>
                                                                        {test.nombre_test}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-4 col-xl-3 d-md-flex d-lg-flex justify-content-between self-center`}>
                                                                    <button onClick={() => eliminarTest(test.id_test)}>
                                                                        <Image src="/images/eliminar.png"
                                                                               alt="trashIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => goActualizarTest(test.id_test)}>
                                                                        <Image src="/images/lapiz.png" alt="editIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon} shadow-2xl pt-sm-2 pt-md-0`}/>
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
                                    {nombresTests.map((test, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_green}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div
                                                                    className={`col-sm-4 col-md-6 col-lg-6 col-xl-7 self-center`}>
                                                                    <div
                                                                        className={`font-medium card-title ${styles.card_test_text}`}>
                                                                        {test.nombre_test}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-4 col-xl-3 d-md-flex d-lg-flex justify-content-between self-center`}>
                                                                    <button onClick={() => eliminarTest(test.id_test)}>
                                                                        <Image src="/images/eliminar.png"
                                                                               alt="trashIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => goActualizarTest(test.id_test)}>
                                                                        <Image src="/images/lapiz.png" alt="editIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon} shadow-2xl pt-sm-2 pt-md-0`}/>
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
                                    {matricesTests.map((test, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_green}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div
                                                                    className={`col-sm-4 col-md-6 col-lg-6 col-xl-7 self-center`}>
                                                                    <div
                                                                        className={`font-medium card-title ${styles.card_test_text}`}>
                                                                        {test.nombre_test}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-4 col-xl-3 d-md-flex d-lg-flex justify-content-between self-center`}>
                                                                    <button onClick={() => eliminarTest(test.id_test)}>
                                                                        <Image src="/images/eliminar.png"
                                                                               alt="trashIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => goActualizarTest(test.id_test)}>
                                                                        <Image src="/images/lapiz.png" alt="editIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon} shadow-2xl pt-sm-2 pt-md-0`}/>
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
                                    {conceptosTests.map((test, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_green}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div
                                                                    className={`col-sm-4 col-md-6 col-lg-6 col-xl-7 self-center`}>
                                                                    <div
                                                                        className={`font-medium card-title ${styles.card_test_text}`}>
                                                                        {test.nombre_test}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-4 col-xl-3 d-md-flex d-lg-flex justify-content-between self-center`}>
                                                                    <button onClick={() => eliminarTest(test.id_test)}>
                                                                        <Image src="/images/eliminar.png"
                                                                               alt="trashIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => goActualizarTest(test.id_test)}>
                                                                        <Image src="/images/lapiz.png" alt="editIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon} shadow-2xl pt-sm-2 pt-md-0`}/>
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
                                    {reconocimientoTests.map((test, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_green}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div
                                                                    className={`col-sm-4 col-md-6 col-lg-6 col-xl-7 self-center`}>
                                                                    <div
                                                                        className={`font-medium card-title ${styles.card_test_text}`}>
                                                                        {test.nombre_test}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-4 col-xl-3 d-md-flex d-lg-flex justify-content-between self-center`}>
                                                                    <button onClick={() => eliminarTest(test.id_test)}>
                                                                        <Image src="/images/eliminar.png"
                                                                               alt="trashIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => goActualizarTest(test.id_test)}>
                                                                        <Image src="/images/lapiz.png" alt="editIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon} shadow-2xl pt-sm-2 pt-md-0`}/>
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
                                    {busquedaTests.map((test, index) => (
                                        <div key={index} className={`row justify-content-center`}>
                                            <div className={`col-9`}>
                                                <div className={`p-3 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                            ${styles.card_body_green}`}>
                                                    <div className={`card-body`}>
                                                        <div className={`container-fluid`}>
                                                            <div className={`row justify-content-between`}>
                                                                <div
                                                                    className={`col-sm-4 col-md-6 col-lg-6 col-xl-7 self-center`}>
                                                                    <div
                                                                        className={`font-medium card-title ${styles.card_test_text}`}>
                                                                        {test.nombre_test}
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`col-sm-4 col-md-5 col-lg-4 col-xl-3 d-md-flex d-lg-flex justify-content-between self-center`}>
                                                                    <button onClick={() => eliminarTest(test.id_test)}>
                                                                        <Image src="/images/eliminar.png"
                                                                               alt="trashIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon}`}/>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => goActualizarTest(test.id_test)}>
                                                                        <Image src="/images/lapiz.png" alt="editIcon"
                                                                               width={100}
                                                                               height={100}
                                                                               className={`${styles.manage_icon} shadow-2xl pt-sm-2 pt-md-0`}/>
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