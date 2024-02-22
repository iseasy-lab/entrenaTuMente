import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import InstructionBar from "@/components/InstructionBar";
import styles from "@/styles/styles.module.css";
import Button from "@/components/Button";
import button from "@/styles/button.module.css";
import Swal from "sweetalert2";
import configurationServices from "@/public/config/configurationServices";
import configurationPort from "@/public/config/configurationPort";

export default function RegistrarEducador() {
    const router = useRouter();
    const registrarEducadorPath = configurationServices.url + configurationPort.port + '/registrarEducador';
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
    const registrarEducador = () => {
        axios({
            method: "post",
            data: {
                usuario: usuario,
                user_password: password,
                nombre: nombre,
                apellido: apellido,
            },
            withCredentials: true,
            url: registrarEducadorPath,
        }).then(res => {
            console.log(res);
            if (res.data.message === 'Usuario creado correctamente') {
                let timerInterval;
                Swal.fire({
                    icon: 'success',
                    title: "¡Educador registrado correctamente!",
                    timer: 3000,
                    timerProgressBar: true,
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
            } else if (res.data.message === 'El usuario ya se encuentra registrado') {
                let timerInterval;
                Swal.fire({
                    icon: 'warning',
                    title: "¡Este Educador ya se encuentra Registrado!",
                    timer: 3000,
                    timerProgressBar: true,
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
        router.push('/').then(r => r);
    }
    return (
        <main className={`bg-amber-50 min-h-screen px-5 ${styles.bg_robot_image}`}>
            <header>
                <InstructionBar confirmation={confirmGetBack}
                                instruction={`¡Regístrate!`}
                                hiddenVoice={`hidden`}
                                hiddenInfo={`hidden`}
                                hiddenHome={`hidden`}/>
            </header>
            <section className={`container-fluid flex justify-center`}>
                <div className={`w-[60%] px-5 pt-4 pb-4 border-2 border-black bg-white bg-opacity-75
                rounded-2xl border-opacity-50`}>
                    <label className={`font-bold ${styles.label_red} ${styles.label}`}>
                        Nombre
                    </label>
                    <p className={`flex justify-center bg-white p-0 rounded-2xl`}>
                        <input value={nombre}
                               type="text"
                               onChange={e => setNombre(e.target.value)}
                               className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-black border-opacity-10  
                           text-black ${styles.input_yellow} ${styles.input_text}`}/>
                    </p>
                    <label className={`font-bold ${styles.label_red} ${styles.label}`}>
                        Apellido
                    </label>
                    <p
                        className={`flex justify-center bg-white p-0 rounded-2xl`}>
                        <input value={apellido}
                               type="text"
                               onChange={e => setApellido(e.target.value)}
                               className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-black border-opacity-10  
                           text-black ${styles.input_yellow} ${styles.input_text}`}/>
                    </p>
                    <label className={`font-bold ${styles.label_red} ${styles.label}`}>
                        Usuario
                    </label>
                    <p
                        className={`flex justify-center bg-white p-0 rounded-2xl`}>
                        <input value={usuario}
                               type="text"
                               placeholder={`example@gmail.com`}
                               onChange={e => setUsuario(e.target.value)}
                               className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-black border-opacity-10  
                           text-black ${styles.input_yellow} ${styles.input_text}`}/>
                    </p>
                    <label className={`font-bold ${styles.label_red} ${styles.label}`}>
                        Contraseña
                    </label>
                    <p
                        className={`flex justify-center bg-white p-0 rounded-2xl`}>
                        <input value={password}
                               type="password"
                               onChange={e => setPassword(e.target.value)}
                               className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-black border-opacity-10  
                           text-black ${styles.input_yellow} ${styles.input_text}`}/>
                    </p>
                    <br/>
                    <div className={`flex justify-center`}>
                        <div className={`w-50`}>
                            <Button text={`Registrar Educador`} instruction={registrarEducador}
                                    bg_color={button.btn_yellow}></Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}