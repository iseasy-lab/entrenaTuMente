import InstructionBar from "@/components/InstructionBar";
import styles from "@/styles/styles.module.css";
import {useRouter} from "next/router";
import axios from "axios";
import {useState} from "react";
import Button from "@/components/Button";
import button from "@/styles/button.module.css";
import Swal from "sweetalert2";
import configurationServices from "@/public/config/configurationServices";
import configurationPort from "@/public/config/configurationPort";

export default function ChangePassword() {
    const router = useRouter();
    const updateEducadorPath = configurationServices.url + configurationPort.port + '/updateEducador';
    /*------------------- ESTADOS -------------------*/
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    /*------------------- EFECTOS -------------------*/
    /*------------------- FUNCIONES -------------------*/
    const clearFields = () => { /* Funciòn para limpiar los campos */
        setUsuario('');
        setNombre('');
        setApellido('');
        setPassword('');
    };
    const updateEducador = () => {
        axios({
            method: "post",
            data: {
                usuario: usuario,
                user_password: password,
            },
            withCredentials: true,
            url: updateEducadorPath,
        }).then(res => {
            console.log(res);
            if (res.data.message === 'Contraseña actualizada exitosamente') {
                let timerInterval;
                Swal.fire({
                    icon: 'success',
                    title: "¡Contraseña actualizada Correctamente!",
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
                    router.push('/');
                }, 3000);
            } else {
                let timerInterval;
                Swal.fire({
                    icon: 'warning',
                    title: "¡Nombre de usuario incorrecto, vuelve a intentar!",
                    timer: 2000,
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
                clearFields();
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const confirmGetBack = () => {
        router.push('/')
            .then(r => r);
    }
    return (
        <main className={`bg-amber-50 min-h-screen ${styles.bg_robot_image} px-5`}>
            <header>
                <InstructionBar confirmation={confirmGetBack}
                                instruction={`¡Cambia tu contraseña!`}
                                hiddenInfo={`hidden`}
                                hiddenVoice={`hidden`}
                                hiddenHome={`hidden`}/>
            </header>
            <br/><br/>
            <section className={`container-fluid flex justify-center`}>
                <div className={`w-[60%] px-5 pt-4 pb-5 border-2 border-black bg-white bg-opacity-75
                rounded-2xl border-opacity-50`}>
                    <label className={`font-bold ${styles.label_red} ${styles.label}`}>
                        Usuario
                    </label>
                    <div className={`flex justify-center bg-white p-0 rounded-2xl`}>
                        <input value={usuario}
                               type="text"
                               placeholder={`example@gmail.com`}
                               onChange={e => setUsuario(e.target.value)}
                               className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-black border-opacity-10  
                           text-black ${styles.input_yellow} ${styles.input_text}`}/>
                    </div>
                    <br/>
                    <div className={`flex justify-start`}>
                        <label className={`font-bold ${styles.label_red} ${styles.label}`}>
                            Nueva Contraseña
                        </label>
                    </div>
                    <div className={`flex justify-center bg-white p-0 rounded-2xl`}>
                        <input value={password}
                               type="password"
                               onChange={e => setPassword(e.target.value)}
                               className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-black border-opacity-10  
                           text-black ${styles.input_yellow} ${styles.input_text}`}/>
                    </div>
                    <br/>
                    <div className={`flex justify-center`}>
                        <div className={`w-50`}>
                            <Button text={`Actualizar Contraseña`} instruction={updateEducador}
                                    bg_color={button.btn_yellow}></Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}