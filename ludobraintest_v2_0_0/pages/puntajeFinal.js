import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import Button from "@/components/Button";
import styles from "@/styles/styles.module.css";
import navstyles from "@/styles/navstyles.module.css";
import button from "@/styles/button.module.css";
import {useRouter} from "next/router";
import axios from "axios";
import UseSpeechSynthesis from "@/effects/useSpeechSynthesis";
import useVoiceReader from "@/effects/useVoiceReader";
import {useEffect, useState} from "react";

export default function PuntajeFinal() {
    const router = useRouter();
    let puntaje;
    let idTest;
    let idNinio;
    const { speak, speaking } = UseSpeechSynthesis();
    /*------------------- ESTADOS -------------------*/
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [puntuacion, setPuntuacion] = useState(puntaje);
    const [id_test, setIdTest] = useState(idTest);
    const [id_ninio, setIdNinio] = useState(idNinio);
    /*------------------- EFECTOS -------------------*/
    const text = "¡Felicitaciones! Completaste la Evaluación. Tu puntuación final es " + puntuacion;
    useVoiceReader(text, isSpeaking);
    useEffect(() => {
        console.log('puntaje', puntaje);
        console.log('puntuacion', puntuacion);
        if (typeof window !== 'undefined') {
            puntaje = localStorage.getItem('puntaje');
            setPuntuacion(puntaje);
            idTest = localStorage.getItem('id_test');
            setIdTest(idTest);
            idNinio = localStorage.getItem('id_ninio');
            setIdNinio(idNinio);
        } else {
            router.push('/modulos').then(r => console.log(r));
        }
    }, []);
    /*------------------- FUNCIONES -------------------*/
    const finishTest = () => {
        console.log('idTest', idTest);
        console.log('idNinio', idNinio);
        console.log('puntuacion', puntuacion);
        console.log('puntaje', puntaje);
        axios({
            method: 'post',
            data: {
                id_test: id_test,
                id_ninio: id_ninio,
                puntaje: puntuacion,
            },
            withCredentials: true,
            url: 'http://poliquizzes.com:3001/finishTest',
        }).then(res => {
            console.log(res.data);
            router.push(`/menuOpcionesTest`).then(r => console.log(r));
            shutUp();
        }).catch(err => {
            console.log(err);
        })
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
            <UpperBar color={navstyles.upper_bar_skyblue}
                      silenceVoice={shutUp}/>
            <InstructionBar previousPage={`#`}
                            instruction={`Observa la puntuación final`}
                            hiddenInfo={`hidden`}
                            voiceCommand={hearVoice}
                            silenceCommand={shutUp}
                            hiddenHome={`hidden`}/>
            <br/>
            <div className={`container-fluid flex flex-col justify-center`}>
                <div className={`row ${styles.test_info} self-center`}>
                    <h2 className={`font-bold`}>¡Felicitaciones!</h2>
                    <div className={`text-3xl italic`}>
                        Completaste la Evaluación
                    </div>
                    <br/> <br/> <br/>
                    <h2 className={`font-bold`}>Tu puntuación final es</h2>
                    <div className={`text-3xl italic`}>
                        {puntuacion}
                    </div>
                </div>
            </div>
            <br/><br/>
            <div className={`flex justify-center`}>
                <div className={`${styles.div_btn}`}>
                    <Button text={`Finalizar Sesión de Evaluación`}
                            instruction={finishTest}
                            bg_color={button.btn_blue}/>
                </div>
            </div>
        </main>
    )
}