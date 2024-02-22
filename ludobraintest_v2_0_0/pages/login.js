import "bootstrap/dist/css/bootstrap.min.css";
import styles from '@/styles/styles.module.css'
import button from '@/styles/button.module.css'
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import Link from "next/link";
import Button from "@/components/Button";
import Swal from "sweetalert2";
import Image from "next/image";
import configurationServices from "@/public/config/configurationServices";
import configurationPort from "@/public/config/configurationPort";

export default function Login() {
    const router = useRouter();
    const basePath = configurationServices.url + configurationPort.port + '/login';
    /* ESTADOS */
    const [loginUsuario, setLoginUsuario] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    /* FUNCIONES */
    const login = () => {
        axios({
            method: "post",
            data: {
                username: loginUsuario,
                password: loginPassword
            },
            withCredentials: true,
            url: basePath,
        }).then(res => {
            if (res.data === "Usuario logeado") {
                let timerInterval;
                Swal.fire({
                    icon: 'success',
                    title: "¡Acceso Correcto!",
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
                    startApp();
                }, 3000);
            } else {
                let timerInterval;
                Swal.fire({
                    icon: 'warning',
                    title: "¡Credenciales incorrectas, inténtalo de nuevo!",
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
            }
        }).catch(err => {
            console.log("Error al iniciar sesión");
            console.log(err);
        });
    }
    const startApp = () => {
        router.push('/presentacion')
            .then(r => console.log('Redirigiendo...'));
    }

    const loginAsGuest = () => {
        axios({
            method: "post",
            data: {
                username: 'invitado@hotmail.com',
                password: 'invitado123'
            },
            withCredentials: true,
            url: basePath,
        }).then(res => {
            if (res.data === "Usuario logeado") {
                let timerInterval;
                Swal.fire({
                    icon: 'success',
                    title: "¡Acceso Correcto!",
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
                    startApp();
                }, 3000);
            }
        }).catch(err => {
            console.log("Error al iniciar sesión de Invitado");
            console.log(err);
        });
    }

    return (
        <div className={`container-fluid px-5`}>
            <br/>
            <header className={`row d-flex justify-content-between`}>
                <div className={`col-5 d-flex justify-content-center`}>
                    <Image src="/images/EPN_logo_big.png"
                           alt="EPN LOGO"
                           className={`${styles.epn_logo}`} width={400} height={400}/>
                </div>
                <div className={`col-5 d-flex justify-content-center`}>
                    <Image src="/images/LudoLab.png"
                           alt="LUDOLAB LOGO"
                           className={`${styles.ludolab_logo}`} width={500} height={50}/>
                </div>
            </header>
            <br/><br/>
            <section className={`row px-5`}>
                <div className={`col-7 py-5 flex justify-end self-center border-t-2 border-l-2 border-b-2 border-black bg-white bg-opacity-75
                rounded-l-2xl border-opacity-50`}>
                    <div className={`container-fluid`}>
                        <div className={`row justify-content-end`}>
                            <label className={`col-2 flex justify-center self-center`}>
                                <Image src="/images/usuario.png"
                                       alt="Ícono de usuario"
                                       className={`${styles.user_logo}`} width={100} height={100}/>
                            </label>
                            <div className={`col-10 self-center bg-amber-50 rounded-xl w-fit p-0`}>
                                <input type="text"
                                       placeholder={`Ingresa tu usuario (correo electrónico)`}
                                       onChange={e => setLoginUsuario(e.target.value)}
                                       className={`w-100 p-3 rounded-xl shadow-md border-2 border-opacity-100  
                           text-black text-xl ${styles.input_sky_blue}`}/>
                            </div>
                        </div>
                        <br/>
                        <div className={`row justify-content-end`}>
                            <label className={`col-2 flex justify-center`}>
                                <Image src="/images/llave-de-la-puerta.png"
                                       alt="password icon"
                                       className={`${styles.password_logo}`} width={100} height={100}/>
                            </label>
                            <div className={`col-10 self-center bg-amber-50 rounded-xl w-fit p-0`}>
                                <input name={`password`}
                                       type="password"
                                       onChange={e => setLoginPassword(e.target.value)}
                                       className={`w-100 p-3 rounded-xl shadow-md border-2 border-opacity-100
                           text-black text-xl ${styles.input_sky_blue}`}/>
                            </div>
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={`w-50`}>
                                <Button text={`Iniciar sesión`} instruction={login}
                                        bg_color={button.btn_green}></Button>
                            </div>
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={`w-50`}>
                                <Button text={`Jugar como invitado`} instruction={loginAsGuest}
                                        bg_color={button.btn_green}></Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`col-5 py-5 flex justify-center border-t-2 border-r-2 border-b-2 border-black bg-white 
                    border-opacity-50 bg-opacity-75 rounded-r-2xl`}>
                    <Image src="/images/logo_entrenaTuMente2.png"
                           alt="Logo de Entrena Tu Mente" width={500} height={50}/>
                </div>
            </section>
            <br/><br/>
            <footer className={`self-end`}>
                <div className={`flex justify-center`}>
                    <Link href={`/changePassword`}
                          className={`text-decoration-none hover:font-bold text-lg text-decoration-underline text-black`}>
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
                <div className={`flex justify-center`}>
                    <Link href={`/registrarEducador`}
                          className={`text-decoration-none hover:font-bold text-lg text-decoration-underline text-black`}>
                        ¿No tienes una cuenta? ¡Regístrate!
                    </Link>
                </div>
                <div className={`flex justify-center`}>
                    <Link href={`/creditos`}
                          className={`text-decoration-none hover:font-bold text-lg text-decoration-underline text-black`}>
                        Acerca de...
                    </Link>
                </div>
            </footer>
        </div>
    )
}