import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import SectionList from "@/components/SectionList";
import {useRouter} from "next/router";
import Swal from "sweetalert2";
import {useEffect} from "react";
import navstyles from "@/styles/navstyles.module.css";
import button from "@/styles/button.module.css";

export default function SelectSeccionPregunta(){
    const router = useRouter();
    /*------------------- ESTADOS -------------------*/
    /*------------------- EFECTOS -------------------*/
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        showInstructions();
    }, []);
    /*------------------- FUNCIONES -------------------*/
    const showInstructions = () => {
        Swal.fire({
            icon: "info",
            html: "<div>\n" +
                "                <p>Puedes crear diferentes tipos de preguntas con base en las diez secciones que se te" +
                "                   presentan a continuación.</p>\n" +
                "                <p>Selecciona un tipo de <strong>Sección</strong> para continuar.</p>\n" +
                "            </div>",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
            footer: "Puedes volver a ver estas instrucciones dando clic en el botón de información en la parte " +
                "superior derecha de la pantalla.",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const confirmGetBack = () => {
        router.push('/read/readPregunta').then((r) => console.log("Sección de preguntas"));
    }
    const goHome = () => {
        router.push('/modulos').then((r) => console.log("Inicio"));
    }
    const voidFunction = () => {
        console.log("Cerrando Sesión");
    }
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar color={navstyles.upper_bar_red}
                      silenceVoice={voidFunction}/>
            <InstructionBar confirmation={confirmGetBack}
                            instruction={`¿Qué tipo de pregunta quieres crear?`}
                            information={showInstructions}
                            info_color={button.btn_red}
                            hiddenVoice={`hidden`}
                            silenceVoice={goHome}/>
            <br/>
            <SectionList informationPage={`/create/preguntas/createInformacion`}/>
        </main>
    )
}