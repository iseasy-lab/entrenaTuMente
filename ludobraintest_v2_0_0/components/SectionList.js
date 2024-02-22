import {useRouter} from "next/router";
import button from "@/styles/button.module.css";

export default function SectionList(
    {
        informationPage,
        similaritiesPage,
        vocabularyPage,
        comprehensionPage,
        drawsPage,
        namesPage,
        arraysPage,
        conceptsPage,
        recognitionPage,
        searchPage
    }
) {
    const router = useRouter();
    const definirPregunta = (tipoPregunta) => {
        localStorage.setItem('dato', tipoPregunta);
        router.push('/create/createPregunta').then(r => r);
    }
    return (
        <div className="px-5 grid gap-x-8 gap-y-5 grid-cols-3 justify-center justify-items-center">
            <button onClick={() => definirPregunta('Información')}
                    className={`py-4 rounded-lg shadow-md font-medium
                            border-2 border-black border-opacity-10 h-100 w-100 ${button.btn_informacion}`}>
                Información
            </button>
            <button onClick={() => definirPregunta('Semejanzas')}
                    className={`py-4 rounded-lg font-bold shadow-md
                            border-2 border-black border-opacity-10 h-100 w-100 ${button.btn_semejanza}`}>
                Semejanzas
            </button>
            <button onClick={() => definirPregunta('Vocabulario')}
                    className={`py-4 rounded-lg font-bold shadow-md
                            border-2 border-black border-opacity-10 h-100 w-100 ${button.btn_vocabulario}`}>
                Vocabulario
            </button>
            <button onClick={() => definirPregunta('Comprensión')}
                    className={`py-4 rounded-lg font-bold shadow-md
                            border-2 border-black border-opacity-10 h-100 w-100 ${button.btn_comprension}`}>
                Comprensión
            </button>
            <button onClick={() => definirPregunta('Dibujos')}
                    className={`py-4 rounded-lg font-bold shadow-md
                            border-2 border-black border-opacity-10 h-100 w-100 ${button.btn_dibujos}`}>
                Dibujos
            </button>
            <button onClick={() => definirPregunta('Nombres')}
                    className={`py-4 rounded-lg font-bold shadow-md
                            border-2 border-black border-opacity-10 h-100 w-100 ${button.btn_nombres}`}>
                Nombres
            </button>
            <button onClick={() => definirPregunta('Matrices')}
                    className={`py-4 rounded-lg font-bold shadow-md
                            border-2 border-black border-opacity-10 h-100 w-100 ${button.btn_matrices}`}>
                Matrices
            </button>
            <button onClick={() => definirPregunta('Conceptos')}
                    className={`py-4 rounded-lg font-bold shadow-md
                            border-2 border-black border-opacity-10 h-100 w-100 ${button.btn_conceptos}`}>
                Conceptos
            </button>
            <button onClick={() => definirPregunta('Reconocimiento')}
                    className={`py-4 rounded-lg font-bold shadow-md
                            border-2 border-black border-opacity-10 h-100 w-100 ${button.btn_reconocimiento}`}>
                Reconocimiento
            </button>
            <div></div>
            <button onClick={() => definirPregunta('Búsqueda')}
                    className={`py-4 rounded-lg font-bold shadow-md
                            border-2 border-black border-opacity-10 h-100 w-100 ${button.btn_busqueda}`}>
                Búsqueda
            </button>
        </div>
    )
}