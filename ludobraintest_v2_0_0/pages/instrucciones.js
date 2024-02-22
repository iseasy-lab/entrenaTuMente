import UpperBar from "@/components/UpperBar";
import button from "@/styles/button.module.css";
import sections from "@/styles/upperBarSectionColors.module.css";
import InstructionBar from "@/components/InstructionBar";
import {useEffect, useState} from "react";
import styles from "@/styles/styles.module.css";
import {useRouter} from "next/router";
import Button from "@/components/Button";
import UseSpeechSynthesis from "@/effects/useSpeechSynthesis";
import useVoiceReader from "@/effects/useVoiceReader";

export default function Instrucciones() {
    const router = useRouter();
    let seccion;
    let informacion;
    if (typeof window !== 'undefined') {
        seccion = localStorage.getItem('seccion');
        informacion = localStorage.getItem('informacion');
    }
    const {speak, speaking} = UseSpeechSynthesis();
    /*------------------- ESTADOS -------------------*/
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
    const [text, setText] = useState('');
    /*------------------- EFECTOS -------------------*/
    useEffect(() => {
        generateColor();
        showPresentationHandler();
    }, []);
    useVoiceReader(text, isSpeaking);
    /*------------------- FUNCIONES -------------------*/
    const generateColor = () => {
        setText(informacion);
        switch (seccion) {
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
    const goBack = () => {
        router.push(`/menuOpcionesTest`).then(r => r);
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
    const showPresentationHandler = () => {
        setIsSpeaking(true);
        switch (seccion) {
            case "Información":
                setTimeout(() => {
                    setIsSpeaking(false);
                }, 30000);
                break;
            case "Semejanzas":
                setTimeout(() => {
                    setIsSpeaking(false);
                }, 31000);
                break;
            case "Vocabulario":
                setTimeout(() => {
                    setIsSpeaking(false);
                }, 29000);
                break;
            case "Comprensión":
                setTimeout(() => {
                    setIsSpeaking(false);
                }, 38000);
                break;
            case "Dibujos":
                setTimeout(() => {
                    setIsSpeaking(false);
                }, 27500);
                break;
            case "Nombres":
                setTimeout(() => {
                    setIsSpeaking(false);
                }, 27000);
                break;
            case "Matrices":
                setTimeout(() => {
                    setIsSpeaking(false);
                }, 26000);
                break;
            case "Conceptos":
                setTimeout(() => {
                    setIsSpeaking(false);
                }, 25000);
                break;
            case "Reconocimiento":
                setTimeout(() => {
                    setIsSpeaking(false);
                }, 34000);
                break;
            case "Búsqueda":
                setTimeout(() => {
                    setIsSpeaking(false);
                }, 38500);
                break;
        }
    }
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            {informationTitle &&
                <div>
                    <UpperBar color={sections.informacion}
                              silenceVoice={shutUp}/>
                    <InstructionBar confirmation={goBack}
                                    instruction={`Instrucciones para las Evaluaciones de habilidad de ${seccion}`}
                                    voiceCommand={hearVoice}
                                    silenceCommand={shutUp}
                                    hiddenInfo={`hidden`}
                                    silenceVoice={shutUp}/>
                    <div className={`px-5`}>
                        <div
                            className={`container-fluid px-4 py-5 flex justify-center self-center italic ${styles.section_text}`}>
                            {informacion}
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={styles.div_btn}>
                                <Button instruction={goBack} text={`Regresar`}
                                        bg_color={button.btn_red}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {semejanzasTitle &&
                <div>
                    <UpperBar color={sections.semejanzas}
                              silenceVoice={shutUp}/>
                    <InstructionBar confirmation={goBack}
                                    instruction={`Instrucciones para las Evaluaciones de habilidad de ${seccion}`}
                                    voiceCommand={hearVoice}
                                    silenceCommand={shutUp}
                                    hiddenInfo={`hidden`}
                                    silenceVoice={shutUp}/>
                    <div className={`px-5`}>
                        <div
                            className={`container-fluid px-4 py-5 flex justify-center self-center italic ${styles.section_text}`}>
                            {informacion}
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={styles.div_btn}>
                                <Button instruction={goBack} text={`Regresar`} bg_color={button.btn_green}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {vocabularioTitle &&
                <div>
                    <UpperBar color={sections.vocabulario}
                              silenceVoice={shutUp}/>
                    <InstructionBar confirmation={goBack}
                                    instruction={`Instrucciones para las Evaluaciones de habilidad de ${seccion}`}
                                    voiceCommand={hearVoice}
                                    silenceCommand={shutUp}
                                    hiddenInfo={`hidden`}
                                    silenceVoice={shutUp}/>
                    <div className={`px-5`}>
                        <div
                            className={`container-fluid px-4 py-5 flex justify-center self-center italic ${styles.section_text}`}>
                            {informacion}
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={styles.div_btn}>
                                <Button instruction={goBack} text={`Regresar`} bg_color={button.btn_blue}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {comprensionTitle &&
                <div>
                    <UpperBar color={sections.comprension}
                              silenceVoice={shutUp}/>
                    <InstructionBar confirmation={goBack}
                                    instruction={`Instrucciones para las Evaluaciones de habilidad de ${seccion}`}
                                    voiceCommand={hearVoice}
                                    silenceCommand={shutUp}
                                    hiddenInfo={`hidden`}
                                    silenceVoice={shutUp}/>
                    <div className={`px-5`}>
                        <div
                            className={`container-fluid px-4 py-5 flex justify-center self-center italic ${styles.section_text}`}>
                            {informacion}
                        </div>
                        <div className={`flex justify-center`}>
                            <div className={styles.div_btn}>
                                <Button instruction={goBack} text={`Regresar`} bg_color={button.btn_orange}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {dibujosTitle &&
                <div>
                    <UpperBar color={sections.dibujos}
                              silenceVoice={shutUp}/>
                    <InstructionBar confirmation={goBack}
                                    instruction={`Instrucciones para las Evaluaciones de habilidad de ${seccion}`}
                                    voiceCommand={hearVoice}
                                    silenceCommand={shutUp}
                                    hiddenInfo={`hidden`}
                                    silenceVoice={shutUp}/>
                    <div className={`px-5`}>
                        <div
                            className={`container-fluid px-4 py-5 flex justify-center self-center italic ${styles.section_text}`}>
                            {informacion}
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={styles.div_btn}>
                                <Button instruction={goBack} text={`Regresar`} bg_color={button.btn_purple}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {nombresTitle &&
                <div>
                    <UpperBar color={sections.nombres}
                              silenceVoice={shutUp}/>
                    <InstructionBar confirmation={goBack}
                                    instruction={`Instrucciones para las Evaluaciones de habilidad de ${seccion}`}
                                    voiceCommand={hearVoice}
                                    silenceCommand={shutUp}
                                    hiddenInfo={`hidden`}
                                    silenceVoice={shutUp}/>
                    <div className={`px-5`}>
                        <div
                            className={`container-fluid px-4 py-5 flex justify-center self-center italic ${styles.section_text}`}>
                            {informacion}
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={styles.div_btn}>
                                <Button instruction={goBack} text={`Regresar`}
                                        bg_color={button.btn_electric_blue}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {matricesTitle &&
                <div>
                    <UpperBar color={sections.matrices}
                              silenceVoice={shutUp}/>
                    <InstructionBar confirmation={goBack}
                                    instruction={`Instrucciones para las Evaluaciones de habilidad de ${seccion}`}
                                    voiceCommand={hearVoice}
                                    silenceCommand={shutUp}
                                    hiddenInfo={`hidden`}
                                    silenceVoice={shutUp}/>
                    <div className={`px-5`}>
                        <div
                            className={`container-fluid px-4 py-5 flex justify-center self-center italic ${styles.section_text}`}>
                            {informacion}
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={styles.div_btn}>
                                <Button instruction={goBack} text={`Regresar`}
                                        bg_color={button.btn_olive}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {conceptosTitle &&
                <div>
                    <UpperBar color={sections.conceptos}
                              silenceVoice={shutUp}/>
                    <InstructionBar confirmation={goBack}
                                    instruction={`Instrucciones para las Evaluaciones de habilidad de ${seccion}`}
                                    voiceCommand={hearVoice}
                                    silenceCommand={shutUp}
                                    hiddenInfo={`hidden`}
                                    silenceVoice={shutUp}/>
                    <div className={`px-5`}>
                        <div
                            className={`container-fluid px-4 py-5 flex justify-center self-center italic ${styles.section_text}`}>
                            {informacion}
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={styles.div_btn}>
                                <Button instruction={goBack} text={`Regresar`}
                                        bg_color={button.btn_blue}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {reconocimientoTitle &&
                <div>
                    <UpperBar color={sections.reconocimiento}
                              silenceVoice={shutUp}/>
                    <InstructionBar confirmation={goBack}
                                    instruction={`Instrucciones para las Evaluaciones de habilidad de ${seccion}`}
                                    voiceCommand={hearVoice}
                                    silenceCommand={shutUp}
                                    hiddenInfo={`hidden`}
                                    silenceVoice={shutUp}/>
                    <div className={`px-5`}>
                        <div
                            className={`container-fluid px-4 py-5 flex justify-center self-center italic ${styles.section_text}`}>
                            {informacion}
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={styles.div_btn}>
                                <Button instruction={goBack} text={`Regresar`}
                                        bg_color={button.btn_red}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {busquedaTitle &&
                <div>
                    <UpperBar color={sections.busqueda}
                              silenceVoice={shutUp}/>
                    <InstructionBar confirmation={goBack}
                                    instruction={`Instrucciones para las Evaluaciones de habilidad de ${seccion}`}
                                    voiceCommand={hearVoice}
                                    silenceCommand={shutUp}
                                    hiddenInfo={`hidden`}
                                    silenceVoice={shutUp}/>
                    <div className={`px-5`}>
                        <div
                            className={`container-fluid px-4 py-5 flex justify-center self-center italic ${styles.section_text}`}>
                            {informacion}
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={styles.div_btn}>
                                <Button instruction={goBack} text={`Regresar`}
                                        bg_color={button.btn_orange}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </main>
    )
}