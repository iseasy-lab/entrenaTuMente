import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import navstyles from "@/styles/navstyles.module.css";
import styles from "@/styles/styles.module.css";
import button from "@/styles/button.module.css";
import Button from "@/components/Button";
import {useRouter} from "next/router";
import SweetAlert from "sweetalert2";
import UseSpeechSynthesis from "@/effects/useSpeechSynthesis";
import {useEffect, useState} from "react";
import useVoiceReader from "@/effects/useVoiceReader";
export default function Modulos() {
    const router = useRouter();
    const { speak, speaking } = UseSpeechSynthesis();
    /*------------------- ESTADOS -------------------*/
    const [isPresenting, setIsPresenting] = useState(true);
    const [isModule, setIsModule] = useState(true);
    const [isSpeaking, setIsSpeaking] = useState(false);
    /*------------------- EFECTOS -------------------*/
    useEffect(() => {
        if (isPresenting) {
            showPresentationHandler();
        }
    }, []);
    const text = "¡Hola, Bienvenido a \"Entrena Tu Mente\"! "
        + "Esta aplicación le permitirá crear evaluaciones personalizadas para poder evaluar y mejorar el desarrollo " +
        "de habilidades cognitivas en niños preescolares.";
    useVoiceReader(text, isSpeaking);
    /*------------------- FUNCIONES -------------------*/
    const goTest = () => {
        router.push("/select/selectNinio").then(r => console.log(r));
        shutUp();
    }
    const goCreate = () => {
        router.push("/modulosCreacion").then(r => console.log(r));
        shutUp();
    }
    const goResults = () => {
        router.push("/resultados").then(r => console.log(r));
        shutUp();
    }
    const goRegister = () => {
        router.push("/read/readNinio").then(r => console.log(r));
        shutUp();
    }
    const confirmGetBack = () => {
        SweetAlert.fire({
            title: '¿Estás seguro...?',
            text: "Se cerrará tu sesión actual.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1D4ED8',
            cancelButtonColor: '#E11D48',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/').then(r => console.log(r));
                shutUp();
            }
        }).catch(err => {
            console.log(err);
        })
    }
    const showPresentationHandler = () => {
        setIsSpeaking(true);
        setTimeout(() => {
            setIsSpeaking(false);
        }, 13000);
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
            <UpperBar color={navstyles.upper_bar_yellow}
                      silenceVoice={shutUp}/>
            {isModule && (
                <div>
                    <InstructionBar confirmation={confirmGetBack}
                                    info_color={button.btn_speak}
                                    voiceCommand={hearVoice}
                                    silenceCommand={shutUp}
                                    hiddenInfo={`hidden`}
                                    hiddenHome={`hidden`}/>
                    <div className={`container-fluid`}>
                        <div className={`row`}>
                            <div className={`col-6 self-center px-5`}>
                                <div
                                    className={`container-fluid px-4 py-5 justify-center self-center italic ${styles.modules_instruction_text}`}>
                                    <p>¡Hola, Bienvenido a <strong>Entrena tu Mente</strong>!</p>
                                    <p>Esta aplicación le permitirá crear evaluaciones personalizadas para poder evaluar
                                        y mejorar el desarrollo de habilidades cognitivas en niños preescolares.</p>
                                </div>
                                <div className={`px-20`}>
                                    <Button instruction={goTest} bg_color={button.btn_blue}
                                            text={`Empezar`}></Button>
                                </div>
                            </div>
                            <div className={`col-6 self-center`}>
                                <h3 className={`flex justify-center align-middle self-center font-bold`}>
                                    Seleccione un módulo
                                </h3>
                                <br/>
                                <div className={`px-20`}>
                                    <Button instruction={goRegister} bg_color={button.btn_yellow}
                                            text={`Administrar Usuarios`}></Button>
                                </div>
                                <br/>
                                <div className={`px-20`}>
                                    <Button instruction={goCreate} bg_color={button.btn_green}
                                            text={`Administrar Evaluaciones y Preguntas`}></Button>
                                </div>
                                <br/>
                                <div className={`px-20`}>
                                    <Button instruction={goResults} bg_color={button.btn_red}
                                            text={`Ver resultados`}></Button>
                                </div>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}