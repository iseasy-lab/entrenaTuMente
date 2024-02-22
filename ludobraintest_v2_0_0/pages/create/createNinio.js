import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import {useEffect, useState} from "react";
import axios from "axios";
import navstyles from "@/styles/navstyles.module.css";
import styles from "@/styles/styles.module.css";
import {useRouter} from "next/router";
import Button from "@/components/Button";
import button from "@/styles/button.module.css";
import Swal from "sweetalert2";
import configurationServices from "@/public/config/configurationServices";
import configurationPort from "@/public/config/configurationPort";

export default function CreateNinio() {
    const router = useRouter();
    const basePath = configurationServices.url + configurationPort.port;
    /*------------------- ESTADOS -------------------*/
    const [registerName, setRegisterName] = useState('');
    const [registerAge, setRegisterAge] = useState('');
    const [registerEducatorId, setRegisterEducatorId] = useState('');
    /*------------------- EFECTOS -------------------*/
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        getUser();
        showInstructions();
    }, []);
    /*------------------- FUNCIONES -------------------*/
    const getUser = () => {
        axios({
            method: "get",
            withCredentials: true,
            url: basePath + "/getUser"
        }).then(res => {
            setRegisterEducatorId(res.data.id);
        }).catch(err => {
            console.log(err);
        });
    }
    const clearFields = () => { /* Función para limpiar los campos */
        setRegisterName('');
        setRegisterAge('');
    };
    const crearNinio = () => {
        console.log("registerName", registerName);
        console.log("registerAge", registerAge);
        if (registerName === '' || registerAge === '') {
            Swal.fire({
                icon: 'warning',
                title: "Llena todos los campos para continuar",
                confirmButtonText: "<div class='text-amber-950'>¡De acuerdo!<div>",
                confirmButtonColor: "rgba(246, 218, 39, 0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        } else if (registerAge <= 1) {
            Swal.fire({
                icon: 'warning',
                title: "El niño debe tener mínimo 2 años para poder registrarse",
                confirmButtonText: "<div class='text-amber-950'>¡De acuerdo!<div>",
                confirmButtonColor: "rgba(246, 218, 39, 0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        } else if (registerAge >= 8) {
            Swal.fire({
                icon: 'warning',
                title: "El niño debe tener máximo 7 años para poder registrarse",
                confirmButtonText: "<div class='text-amber-950'>¡De acuerdo!<div>",
                confirmButtonColor: "rgba(246, 218, 39, 0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            axios({
                method: "post",
                data: {
                    nombre: registerName,
                    edad: registerAge,
                },
                withCredentials: true,
                url: basePath + "/crearNinio"
            }).then((res) => {
                console.log(res);
                if (res.data.message === 'Niño creado correctamente') {
                    let timerInterval;
                    Swal.fire({
                        icon: 'success',
                        title: "¡Niño registrado Correctamente!",
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
                    clearFields();
                    setTimeout(() => {
                        router.push('/read/readNinio').then(r => console.log(r));
                    }, 3000);
                } else if(res.data.message === 'Este niño ya se encuentra registrado') {
                    let timerInterval;
                    Swal.fire({
                        icon: 'warning',
                        title: "¡Este niño ya se encuentra registrado!",
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
                    clearFields();
                }
            }).catch((err) => {
                console.log("No Exitoso", err);
            })
        }
    }
    const confirmGetBack = () => {
        Swal.fire({
            title: '¿Estás seguro que quieres regresar?',
            text: "¡Todos los cambios se perderán!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgba(255,67,49)',
            cancelButtonColor: '#9CA3AF',
            confirmButtonText: 'Sí, quiero regresar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/read/readNinio').then(r => console.log(r));
            }
        })
    }
    const showInstructions = () => {
        Swal.fire({
            icon: "info",
            html: "<div>\n" +
                "                <h5>Paso 1</h5>\n" +
                "                <p> Coloca el nombre y el apellido del niño que vas a registrar" +
                "                <h5>Paso 2</h5>\n" +
                "                <p> Coloca la edad del niño" +
                "                <h5>Paso 3</h5>\n" +
                "                <p> Dale clic en el botón <strong>\"Registrar Niño\"</strong> para finalizar el" +
                "                 proceso de registro</p>   " +
                "            </div>",
            confirmButtonText: "<div class='text-amber-950'>¡De acuerdo!<div>",
            confirmButtonColor: "rgba(246, 218, 39, 0.75)",
            footer: "Puedes volver a ver estas instrucciones dando clic en el botón de información en la parte " +
                "superior derecha de la pantalla",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar color={navstyles.upper_bar_yellow}/>
            <InstructionBar confirmation={confirmGetBack}
                            instruction={`Registra a un niño`}
                            information={showInstructions}
                            info_color={button.btn_yellow}
                            hiddenVoice={`hidden`}
                            hiddenHome={`hidden`}/>
            <div className={`container-fluid text-black px-5`}>
                <br/>
                <div className={`row justify-content-center px-5`}>
                    <div className={`col-sm-2 col-lg-1 flex justify-end self-center`}>
                        <label className={`font-bold ${styles.label_red} ${styles.label}`}>
                            Nombre
                        </label>
                    </div>
                    <div className={`col-sm-9 col-md-8 col-lg-8 flex justify-center self-center`}>
                        <input value={registerName}
                               type="text"
                               onChange={e => setRegisterName(e.target.value)}
                               className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-black border-opacity-10  
                           text-black ${styles.input_yellow} ${styles.input_text}`}/>
                    </div>
                </div>
                <br/>
                <div className={`row justify-content-center px-5`}>
                    <div className={`col-sm-2 col-lg-1 d-flex justify-content-end pt-1`}>
                        <label className={`font-bold ${styles.label_red} ${styles.label}`}>
                            Edad
                        </label>
                    </div>
                    <div className={`col-sm-9 col-md-8 col-lg-8 d-flex justify-content-center`}>
                        <input value={registerAge}
                               type="number"
                               onChange={e => setRegisterAge(e.target.value)}
                               className={`w-100 px-3 py-2 rounded-xl shadow-md border-2 border-black border-opacity-10  
                           text-black ${styles.input_yellow} ${styles.input_text}`}/>
                    </div>
                </div>
                <br/>
                <br/>
                <div className={`flex justify-center`}>
                    <div className={`w-25`}>
                        <Button text={`Registrar Niño`} instruction={crearNinio}
                                bg_color={button.btn_yellow}></Button>
                    </div>
                </div>
                <br/>
            </div>
        </main>
    )
}