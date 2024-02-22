import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import InstructionBar from "@/components/InstructionBar";
import navstyles from "@/styles/navstyles.module.css";
import buttons from "@/styles/button.module.css";
import styles from "@/styles/styles.module.css";
import Button from "@/components/Button";
import button from "@/styles/button.module.css";
import Swal from "sweetalert2";

export default function RegistrarEducador() {
    const router = useRouter();
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
            url: "http://poliquizzes.com:3001/registrarEducador"
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
        router.push('/').then(r => console.log(r));
    }
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <InstructionBar confirmation={confirmGetBack}
                            instruction={`¡Regístrate!`}
                            hiddenVoice={`hidden`}
                            hiddenInfo={`hidden`}
                            hiddenHome={`hidden`}/>
            <br/> <br/>
            <div className={`container-fluid`}>
                <div className={`row justify-content-center text-black`}>
                    <div className={`col-sm-2 col-lg-1 d-flex justify-content-center`}>
                        <label className={`font-bold ${styles.label_red} ${styles.label}`}>
                            Nombre
                        </label>
                    </div>
                    <div className={`col-sm-9 col-md-8 col-lg-8 d-flex justify-content-center`}>
                        <input value={nombre}
                               type="text"
                               onChange={e => setNombre(e.target.value)}
                               className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-black border-opacity-10  
                           text-black ${styles.input_yellow} ${styles.input_text}`}/>
                    </div>
                </div>
                <br/>
                <div className={`row justify-content-center text-black`}>
                    <div className={`col-sm-2 col-lg-1 d-flex justify-content-center`}>
                        <label className={`font-bold ${styles.label_red} ${styles.label}`}>
                            Apellido
                        </label>
                    </div>
                    <div className={`col-sm-9 col-md-8 col-lg-8 d-flex justify-content-center`}>
                        <input value={apellido}
                               type="text"
                               onChange={e => setApellido(e.target.value)}
                               className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-black border-opacity-10  
                           text-black ${styles.input_yellow} ${styles.input_text}`}/>
                    </div>
                </div>
                <br/>
                <div className={`row justify-content-center text-black`}>
                    <div className={`col-sm-2 col-lg-1 d-flex justify-content-center`}>
                        <label className={`font-bold ${styles.label_red} ${styles.label}`}>
                            Usuario
                        </label>
                    </div>
                    <div className={`col-sm-9 col-md-8 col-lg-8 d-flex justify-content-center`}>
                        <input value={usuario}
                               type="text"
                               placeholder={`example@gmail.com`}
                               onChange={e => setUsuario(e.target.value)}
                               className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-black border-opacity-10  
                           text-black ${styles.input_yellow} ${styles.input_text}`}/>
                    </div>
                </div>
                <br/>
                <div className={`row justify-content-center text-black`}>
                    <div className={`col-sm-2 col-lg-1 d-flex justify-content-center`}>
                        <label className={`font-bold ${styles.label_red} ${styles.label}`}>
                            Contraseña
                        </label>
                    </div>
                    <div className={`col-sm-9 col-md-8 col-lg-8 d-flex justify-content-center`}>
                        <input value={password}
                               type="password"
                               onChange={e => setPassword(e.target.value)}
                               className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-black border-opacity-10  
                           text-black ${styles.input_yellow} ${styles.input_text}`}/>
                    </div>
                </div>
                <br/><br/>
                <div className={`flex justify-center`}>
                    <div className={`${styles.div_btn}`}>
                        <Button text={`Registrar Educador`} instruction={registrarEducador}
                                bg_color={button.btn_yellow}></Button>
                    </div>
                </div>
            </div>
        </main>
    )
}