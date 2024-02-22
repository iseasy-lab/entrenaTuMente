import {useRouter} from "next/router";
import UpperBar from "@/components/UpperBar";
import {useEffect} from "react";
import navstyles from "@/styles/navstyles.module.css";
import styles from "@/styles/styles.module.css";
import Image from "next/image";

export default function Presentacion() {
    const router = useRouter();
    /*------------------- ESTADOS -------------------*/
    /*------------------- EFECTOS -------------------*/
    useEffect(() => {
        const nextPage = () => {
            setTimeout(() => {
                router.push('/modulos')
                    .then(r => console.log('Redirigiendo...'));
            }, 3000);
        }
        nextPage();
    }, [router]);
    /*------------------- FUNCIONES -------------------*/
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar color={navstyles.upper_bar_yellow}/>
            <div className={`container-fluid`}>
                <br/><br/><br/>
                <div className={`d-flex justify-content-center`}>
                    <Image src="/images/asistente-de-robot.png"
                           alt="Echo"
                           className={`${styles.echo_logo}`}
                           width={500} height={100}
                    />
                </div>
                <div className={`d-flex justify-content-center`}>
                    <h1>¡Hola, soy Echo!</h1>
                </div>
            </div>
        </main>
    )
}