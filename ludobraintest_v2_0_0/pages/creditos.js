import "bootstrap/dist/css/bootstrap.min.css";
import styles from '@/styles/styles.module.css'
import Image from 'next/image'

export default function Creditos() {
    return (
        <main className={`min-h-screen bg-white`}>
            <div className={`container-fluid px-5 py-3`}>
                <div className={`row`}>
                    <div className={`col-4 flex justify-center`}>
                        <Image src="/images/epn_log_credits.png" alt="EPN LOGO" className={`${styles.logo_credits}`}
                               width={1000} height={100}/>
                    </div>
                    <div className={`col-4 flex justify-center`}>
                        <Image src="/images/fis_logo_credits.png" alt="FIS LOGO" className={`${styles.logo_credits}`}
                               width={1000} height={100}/>
                    </div>
                    <div className={`col-4 flex justify-center`}>
                        <Image src="/images/ludolab_logo_credits.png" alt="LUDOLAB LOGO" className={`${styles.logo_credits}`}
                               width={1000} height={100}/>
                    </div>
                </div>
                <div className={`row`}>
                    <div className={`flex justify-center`}>
                        <h1>Créditos</h1>
                    </div>
                </div>
                <div className={`row py-3`}>
                    <div className={`flex justify-center self-center text-lg ${styles.middle_text}`}>
                        <div>El presente proyecto tiene como objetivo desarrollar una aplicación para mejorar y trabajar
                            habilidades cognitivas como memoria de trabajo, velocidad de procesamiento, razonamiento
                            perceptual basado en la evaluación psicológica WPPSI (Escala de Inteligencia de Wechsler
                            para Preescolares y Primarios) que permita su preparación, seguimiento y evaluación; y fue
                            elaborado con el apoyo del laboratorio LudoLab.</div>
                    </div>
                </div>
                <div className={`row py-3`}>
                    <div className={`flex justify-center self-center text-lg ${styles.middle_text}`}>
                        <div>LUDOLAB, un laboratorio de Sistemas de Información e Inclusión Social, que responde a los
                            desafíos actuales con un enfoque en investigación, creatividad y responsabilidad. Su misión
                            es contribuir al desarrollo mediante Sistemas de Información centrados en el usuario.</div>
                    </div>
                </div>
                <div className={`row`}>
                    <div className={`col-4 justify-center`}>
                        <h4 className={`flex justify-center`}>Tutor/a</h4>
                        <div className={`flex justify-center text-lg`}>Ph.D Marco Oswaldo Santorum Gaibor</div>
                        <div className={`flex justify-center text-lg`}>Ph.D Mayra del Cisne Carrión Toro</div>
                    </div>
                    <div className={`col-4`}>
                        <h4 className={`flex justify-center`}>Autor</h4>
                        <div className={`flex justify-center text-lg`}>Sr. Cristopher Santiago Pérez Nieto</div>
                    </div>
                    <div className={`col-4`}>
                        <h4 className={`flex justify-center`}>Colaboradores</h4>
                        <div className={`flex justify-center text-lg`}>Psc. Verónica Maldonado</div>
                    </div>
                </div>
                <div className={`pt-3 row`}>
                    <div className={`col-12`}>
                        <div className={`flex justify-center text-lg`}>
                            Dra. Mayra Carrión Toro
                        </div>
                        <div className={`flex justify-center text-lg`}>
                            Directora LudoLab
                        </div>
                    </div>
                </div>
                <div className={`row py-3`}>
                    <div className={`col-12 flex justify-center`}>
                        <button>
                            <Image src="/images/facebook.png" alt="Facebook LOGO" className={`h-10`}
                                   width={40} height={100}/>
                        </button>
                        <button>
                            <Image src="/images/instagram.png" alt="Facebook LOGO" className={`h-10`}
                                   width={40} height={100}/>
                        </button>
                        <button>
                            <Image src="/images/gorjeo.png" alt="Facebook LOGO" className={`h-10`}
                                   width={40} height={100}/>
                        </button>
                    </div>
                </div>
                <div className={`row`}>
                    <div className={`col-4 flex justify-center self-center`}>
                        <Image src="/images/footer_logo_credits.png" alt="Creative_Commons_Logo"
                               width={1000} height={100}/>
                    </div>
                    <div className={`col-4 flex justify-center self-center`}>
                        <div className={`font-bold text-3xl`}>ludolab.epn.edu.ec</div>
                    </div>
                    <div className={`col-4 flex justify-center self-center`}>
                        <div className={`font-bold text-3xl`}>ludolab@epn.edu.ec</div>
                    </div>
                </div>
            </div>
        </main>
    )
}