import "bootstrap/dist/css/bootstrap.min.css";
import styles from '@/styles/styles.module.css'
import button from '@/styles/button.module.css'
import axios from "axios";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Button from "@/components/Button";
import SweetAlert from "sweetalert2";
import configurationServices from "@/public/config/configurationServices";
import configurationPort from "@/public/config/configurationPort";

export default function UpperBar({color, questionType, silenceVoice}) {
    const router = useRouter();
    const getUserPath = configurationServices.url + configurationPort.port +'/getUser';
    const logoutPath = configurationServices.url + configurationPort.port +'/logout';
    /*------------------- ESTADOS -------------------*/
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    /*------------------- EFECTOS -------------------*/
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        getUser();
    });
    /*------------------- FUNCIONES -------------------*/
    const getUser = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: getUserPath
        }).then(res => {
            setUserId(res.data.id);
            setUsername(res.data.username);
            setName(res.data.name);
        }).catch(err => {
            console.log(err);
            router.push('/').then(r => r);
        });
    }
    const cerrarSesion = () => {
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
                axios({
                    method: "post",
                    url: logoutPath,
                }).then(res => {
                    if (res.data.message === "Sesión cerrada exitosamente") {
                        router.push('/').then(r => r);
                        shutUp();
                    } else {
                        SweetAlert.fire({
                            title: 'Error',
                            text: 'No se pudo cerrar la sesión. Por favor, inténtalo de nuevo.',
                            icon: 'error',
                            confirmButtonColor: '#1D4ED8'
                        });
                    }
                });
            }
        }).catch(err => {
            console.log(err);
        })
    }
    const shutUp = () => {
        silenceVoice();
    }
    return (
        <div className={`${color} container-fluid px-4 py-3 shadow-md rounded-b-2xl border-2 border-black border-opacity-10`}>
            <div className={`row justify-content-between`}>
                <div className={`col-4 flex justify-center p-3 self-center`}>
                    <div className={`ps-2 pt-2`}>
                        <h5 className={styles.welcome_text}>¡Bienvenido, {name}!</h5>
                    </div>
                </div>
                <div className={`col-4 flex justify-center self-center`}>
                    <h4 className={`font-medium`}>{questionType}</h4>
                </div>
                <div className={`col-4 flex justify-center self-center`}>
                    <Button text={`Cerrar Sesión`} bg_color={button.btn_black} instruction={cerrarSesion}></Button>
                </div>
            </div>
        </div>
    )
}