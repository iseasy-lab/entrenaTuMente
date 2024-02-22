import {useEffect, useState} from "react";
import navstyles from "@/styles/navstyles.module.css";
import button from "@/styles/button.module.css";
import styles from "@/styles/styles.module.css";
import UpperBar from "@/components/UpperBar";
import InstructionBar from "@/components/InstructionBar";
import axios from "axios";
import {useRouter} from "next/router";
import Button from "@/components/Button";
import Swal from "sweetalert2";

export default function CreatePregunta() {
    let dato;
    const router = useRouter();
    let imagenMuestraVocabulario = [];
    let imagenMuestraBusqueda = [];
    let bandera = false;
    let respCorrecta = 0;
    // Define un estado para manejar las respuestas correctas de cada fila
    /*------------------- ESTADOS -------------------*/
    const [tipoInformacion, setTipoInformacion] = useState(false);
    const [tipoSemejanza, setTipoSemejanza] = useState(false);
    const [tipoVocabulario, setTipoVocabulario] = useState(false);
    const [tipoComprension, setTipoComprension] = useState(false);
    const [tipoDibujos, setTipoDibujos] = useState(false);
    const [tipoNombres, setTipoNombres] = useState(false);
    const [tipoMatrices, setTipoMatrices] = useState(false);
    const [tipoConceptos, setTipoConceptos] = useState(false);
    const [tipoReconocimiento, setTipoReconocimiento] = useState(false);
    const [tipoBusqueda, setTipoBusqueda] = useState(false);
    /* Estados para los inputs */
    const [textareaValue, setTextareaValue] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState({});
    const [correctAnswersConceptos, setCorrectAnswersConceptos] = useState([]);
    const [esMuestra, setEsMuestra] = useState([]);
    const [rowNumber, setRowNumber] = useState([]);
    /* Estados para los inputs de Conceptos */
    const [selectedFiles1, setSelectedFiles1] = useState([]);
    const [selectedFiles2, setSelectedFiles2] = useState([]);
    const [selectedFiles3, setSelectedFiles3] = useState([]);
    /* Estados para los inputs de Semejanzas */
    const [imagenesMuestra, setImagenesMuestra] = useState([]);
    /*------------------- EFECTOS -------------------*/
    useEffect(() => { // useEffect para obtener el usuario de la sesión
        crearInterfaz();
        showGeneralInstructions();
    }, []);
    useEffect(() => {
    }, [selectedFiles]);
    useEffect(() => {
    }, [imagenesMuestra]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            dato = localStorage.getItem('dato');
        } else {
            router.push('/modulos').then(r => console.log(r));
        }
    }, []);
    /*------------------- FUNCIONES -------------------*/
    const clearFields = () => { /* Funciòn para limpiar los campos */
        setTextareaValue('');
        setSelectedFiles([]);
        setCorrectAnswers({});
        setImagenesMuestra([]);
        setEsMuestra([]);
        setRowNumber([]);
    };
    const crearInterfaz = () => {
        switch (dato) {
            case 'Información':
                setTipoInformacion(true);
                setTipoSemejanza(false);
                setTipoVocabulario(false);
                setTipoComprension(false);
                setTipoDibujos(false);
                setTipoNombres(false);
                setTipoMatrices(false);
                setTipoConceptos(false);
                setTipoReconocimiento(false);
                setTipoBusqueda(false);
                break;
            case 'Semejanzas':
                setTipoSemejanza(true);
                setTipoInformacion(false);
                setTipoVocabulario(false);
                setTipoComprension(false);
                setTipoDibujos(false);
                setTipoNombres(false);
                setTipoMatrices(false);
                setTipoConceptos(false);
                setTipoReconocimiento(false);
                setTipoBusqueda(false);
                break;
            case 'Vocabulario':
                setTipoVocabulario(true);
                setTipoInformacion(false);
                setTipoSemejanza(false);
                setTipoComprension(false);
                setTipoDibujos(false);
                setTipoNombres(false);
                setTipoMatrices(false);
                setTipoConceptos(false);
                setTipoReconocimiento(false);
                setTipoBusqueda(false);
                break;
            case 'Comprensión':
                setTipoComprension(true);
                setTipoInformacion(false);
                setTipoSemejanza(false);
                setTipoVocabulario(false);
                setTipoDibujos(false);
                setTipoNombres(false);
                setTipoMatrices(false);
                setTipoConceptos(false);
                setTipoReconocimiento(false);
                setTipoBusqueda(false);
                break;
            case 'Dibujos':
                setTipoDibujos(true);
                setTipoInformacion(false);
                setTipoSemejanza(false);
                setTipoVocabulario(false);
                setTipoComprension(false);
                setTipoNombres(false);
                setTipoMatrices(false);
                setTipoConceptos(false);
                setTipoReconocimiento(false);
                setTipoBusqueda(false);
                break;
            case 'Nombres':
                setTipoNombres(true);
                setTipoInformacion(false);
                setTipoSemejanza(false);
                setTipoVocabulario(false);
                setTipoComprension(false);
                setTipoDibujos(false);
                setTipoMatrices(false);
                setTipoConceptos(false);
                setTipoReconocimiento(false);
                setTipoBusqueda(false);
                break;
            case 'Matrices':
                setTipoMatrices(true);
                setTipoInformacion(false);
                setTipoSemejanza(false);
                setTipoVocabulario(false);
                setTipoComprension(false);
                setTipoDibujos(false);
                setTipoNombres(false);
                setTipoConceptos(false);
                setTipoReconocimiento(false);
                setTipoBusqueda(false);
                break;
            case 'Conceptos':
                setTipoConceptos(true);
                setTipoInformacion(false);
                setTipoSemejanza(false);
                setTipoVocabulario(false);
                setTipoComprension(false);
                setTipoDibujos(false);
                setTipoNombres(false);
                setTipoMatrices(false);
                setTipoReconocimiento(false);
                setTipoBusqueda(false);
                break;
            case 'Reconocimiento':
                setTipoReconocimiento(true);
                setTipoInformacion(false);
                setTipoSemejanza(false);
                setTipoVocabulario(false);
                setTipoComprension(false);
                setTipoDibujos(false);
                setTipoNombres(false);
                setTipoMatrices(false);
                setTipoConceptos(false);
                setTipoBusqueda(false);
                break;
            case 'Búsqueda':
                setTipoBusqueda(true);
                setTipoInformacion(false);
                setTipoSemejanza(false);
                setTipoVocabulario(false);
                setTipoComprension(false);
                setTipoDibujos(false);
                setTipoNombres(false);
                setTipoMatrices(false);
                setTipoConceptos(false);
                setTipoReconocimiento(false);
                break;
        }
    }
    // Funciones de alerta
    const agregaTextoPregunta = () => {
        Swal.fire({
            icon: 'warning',
            title: "Agrega el texto de la Pregunta antes de crearla",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const agregaPalabra = () => {
        Swal.fire({
            icon: 'warning',
            title: "Agrega el Nombre de la imagen antes de crear la Pregunta",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const daleNombrePregunta = () => {
        Swal.fire({
            icon: 'warning',
            title: "Dale un nombre a la Pregunta antes de crearla",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const noSeleccionaRespuestaCorrecta = () => {
        Swal.fire({
            icon: 'warning',
            title: "Debes seleccionar una respuesta correcta antes de crear la Pregunta",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const seleccionaVariasRespuestasCorrectas = () => {
        Swal.fire({
            icon: 'warning',
            title: "Solo puedes seleccionar una respuesta correcta",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const agregaImagenesDeMuestra = (num) => {
        Swal.fire({
            icon: 'warning',
            title: `Agrega ${num} Imágenes de Muestra antes de crear la Pregunta`,
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const agregaUnaImagenDeMuestra = () => {
        Swal.fire({
            icon: 'warning',
            title: "Agrega una Imagen de Muestra antes de crear la Pregunta",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const agregaMinimoOpcionesDeRespuesta = (num) => {
        Swal.fire({
            icon: 'warning',
            title: `Agrega al menos ${num} Opciones de Respuesta antes de crear la Pregunta`,
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const agrega9OpcionesDeRespuesta = () => {
        Swal.fire({
            icon: 'warning',
            title: "Agrega 9 opciones de Respuesta antes de crear la Pregunta",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    // Manejar el cambio de archivos para Información
    const handleChange = (event) => {
        setTextareaValue(event.target.value);
    };
    const handleFileChangeInformacion = (event) => {
        const newFile = event.target.files[0];
        if (selectedFiles.length < 8) {
            if (newFile) {
                setSelectedFiles((prevFiles) => [...prevFiles, newFile]);
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: "No puedes agregar más de 8 opciones de respuesta",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(255,67,49,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        }
    };
    const handleFileChangeSemejanzas = (event) => {
        const newFile = event.target.files[0];
        if (selectedFiles.length < 6) {
            if (newFile) {
                setSelectedFiles((prevFiles) => [...prevFiles, newFile]);
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: "No puedes agregar más de 6 opciones de respuesta",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(255,67,49,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        }
    };
    const handleFileChangeMuestra = (event) => {
        const newFile = event.target.files[0];
        if (imagenesMuestra.length < 3) {
            if (newFile) {
                setImagenesMuestra((prevFiles) => [...prevFiles, newFile]);
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: "No puedes agregar más de 3 imágenes de muestra",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(255,67,49,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    const handleFileChangeMuestraReconocimiento = (event) => {
        const newFile = event.target.files[0];
        if (imagenesMuestra.length < 2) {
            if (newFile) {
                setImagenesMuestra((prevFiles) => [...prevFiles, newFile]);
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: "No puedes agregar más de 2 imágenes de muestra",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(255,67,49,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    const handleFileChangeMuestraBusqueda = (event) => {
        const newFile = event.target.files[0];
        if (imagenesMuestra.length === 0) {
            if (newFile) {
                setImagenesMuestra((prevFiles) => [...prevFiles, newFile]);
                imagenMuestraBusqueda.push(newFile);
                console.log("esta es el arreglo muestra", imagenMuestraBusqueda);
                setImagenesMuestra((prevFiles) => [...prevFiles, newFile]);
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: "Solo puedes agregar una imagen de muestra",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(255,67,49,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    const handleFileChangeMuestraVocabulario = (event) => {
        const newFile = event.target.files[0];
        if (imagenesMuestra.length === 0) {
            if (newFile) {
                setImagenesMuestra((prevFiles) => [...prevFiles, newFile]);
                imagenMuestraVocabulario.push(newFile);
                setImagenesMuestra((prevFiles) => [...prevFiles, newFile]);
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: "No puedes agregar más imágenes de muestra",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(255,67,49,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    const handleFileChangeComprension = (event) => {
        const newFile = event.target.files[0];
        if (selectedFiles.length < 4) {
            if (newFile) {
                setSelectedFiles((prevFiles) => [...prevFiles, newFile]);
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: "No puedes agregar más de 4 opciones de respuesta",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(255,67,49,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        }
    };
    const handleFileChangeDibujos = (event) => {
        const newFile = event.target.files[0];
        if (selectedFiles.length < 9) {
            if (newFile) {
                setSelectedFiles((prevFiles) => [...prevFiles, newFile]);
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: "No puedes agregar más de 9 opciones de respuesta",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(255,67,49,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        }
    };
    const handleFileChangeMatrices = (event) => {
        const newFile = event.target.files[0];
        if (selectedFiles.length < 8) {
            if (newFile) {
                setSelectedFiles((prevFiles) => [...prevFiles, newFile]);
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: "No puedes agregar más de 8 opciones de respuesta",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(255,67,49,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        }
    };
    // Manejar el cambio de archivos para Conceptos
    const handleFileChangeConcept1 = (event) => {
        const newFile = event.target.files[0];
        if (selectedFiles1.length < 4) {
            if (newFile) {
                setSelectedFiles1((prevFiles) => [...prevFiles, newFile]);
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: "No puedes agregar más de 4 opciones de respuesta",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(255,67,49,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        }
    };
    const handleFileChangeConcept2 = (event) => {
        const newFile = event.target.files[0];
        if (selectedFiles2.length < 4) {
            if (newFile) {
                setSelectedFiles2((prevFiles) => [...prevFiles, newFile]);
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: "No puedes agregar más de 4 opciones de respuesta",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(255,67,49,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        }
    };
    const handleFileChangeConcept3 = (event) => {
        const newFile = event.target.files[0];
        if (selectedFiles3.length < 4) {
            if (newFile) {
                setSelectedFiles3((prevFiles) => [...prevFiles, newFile]);
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: "No puedes agregar más de 4 opciones de respuesta",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(255,67,49,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        }
    };
    const handleFileChangeReconocimiento = (event) => {
        const newFile = event.target.files[0];
        if (selectedFiles.length < 8) {
            if (newFile) {
                setSelectedFiles((prevFiles) => [...prevFiles, newFile]);
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: "No puedes agregar más de 8 opciones de respuesta",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(255,67,49,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        }
    };
    const handleFileChangeBusqueda = (event) => {
        const newFile = event.target.files[0];
        if (selectedFiles.length < 6) {
            if (newFile) {
                setSelectedFiles((prevFiles) => [...prevFiles, newFile]);
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: "No puedes agregar más de 6 opciones de respuesta",
                confirmButtonText: "¡De acuerdo!",
                confirmButtonColor: "rgba(255,67,49,0.75)",
            }).then((result) => {
                console.log("result", result);
            }).catch((err) => {
                console.log(err);
            })
        }
    };
    const handleUpload = async () => {
        respCorrecta = 0;
        // Crear un objeto FormData
        const formData = new FormData();
        let data;
        if (tipoInformacion) {
            data = 1;
            if (textareaValue === '') {
                bandera = true;
                agregaTextoPregunta();
            } else if (selectedFiles.length < 3) {
                bandera = true;
                agregaMinimoOpcionesDeRespuesta(3)
            } else {
                fillRespuestaCorrecta();
                if (respCorrecta === 0) {
                    bandera = true;
                    noSeleccionaRespuestaCorrecta();
                } else if (respCorrecta > 1) {
                    bandera = true;
                    seleccionaVariasRespuestasCorrectas();
                } else {
                    bandera = false;
                    /* Llenar el array de esMuestra con las opciones de respuesta */
                    selectedFiles.forEach(() => {
                        esMuestra.push(0);
                    });
                    formData.append("pregunta", textareaValue);
                    formData.append("idSection", data);
                    selectedFiles.forEach((file, index) => {
                        formData.append("imagenes", file); // Usar el mismo nombre de campo para todas las imágenes
                        formData.append("imagenIndex", index + 1); // Agregar información sobre el índice
                        formData.append("respuestaCorrecta", correctAnswers[index] ? 1 : 0); // Agregar la respuesta correcta
                        formData.append("fila", 0);
                        formData.append("esMuestra", esMuestra[index] ? 1 : 0);
                    })
                }
            }
        } else if (tipoSemejanza) {
            data = 2;
            if (textareaValue === '') {
                bandera = true;
                daleNombrePregunta();
            } else if (selectedFiles.length === 0 && imagenesMuestra.length === 0) {
                bandera = true;
                Swal.fire({
                    icon: 'warning',
                    title: "Agrega Imágenes de Muestra y Opciones de Respuesta antes de crear la Pregunta",
                    confirmButtonText: "¡De acuerdo!",
                    confirmButtonColor: "rgba(255,67,49,0.75)",
                }).then((result) => {
                    console.log("result", result);
                }).catch((err) => {
                    console.log(err);
                });
            } else if (imagenesMuestra.length < 3) {
                bandera = true;
                agregaImagenesDeMuestra(3);
            } else if (selectedFiles.length < 3) {
                agregaMinimoOpcionesDeRespuesta(3);
                bandera = true;
            } else {
                fillRespuestaCorrecta();
                if (respCorrecta === 0) {
                    bandera = true;
                    noSeleccionaRespuestaCorrecta();
                } else if (respCorrecta > 1) {
                    bandera = true;
                    seleccionaVariasRespuestasCorrectas();
                } else {
                    /* Llenar el array de esMuestra con las opciones de respuesta */
                    selectedFiles.forEach(() => {
                        esMuestra.push(0);
                    });
                    /* Llenar el array de esMuestra con las muestras*/
                    imagenesMuestra.forEach(() => {
                        esMuestra.push(1);
                    });
                    imagenesMuestra.forEach((file) => {
                        selectedFiles.push(file);
                    });
                    formData.append("pregunta", textareaValue);
                    formData.append("idSection", data);
                    selectedFiles.forEach((file, index) => {
                        formData.append("imagenes", file); // Usar el mismo nombre de campo para todas las imágenes
                        formData.append("imagenIndex", index + 1); // Agregar información sobre el índice
                        formData.append("respuestaCorrecta", correctAnswers[index] ? 1 : 0); // Agregar la respuesta correcta
                        formData.append("fila", 0);
                        formData.append("esMuestra", esMuestra[index] ? 1 : 0);
                    });
                }
            }
        } else if (tipoVocabulario) {
            data = 3;
            if (textareaValue === '') {
                bandera = true;
                daleNombrePregunta();
            } else if (imagenesMuestra.length < 2) {
                bandera = true;
                agregaUnaImagenDeMuestra();
            } else {
                /* Llenar el array de esMuestra con las opciones de respuesta */
                selectedFiles.forEach(() => {
                    esMuestra.push(0);
                });
                /* Llenar el array de esMuestra con las muestras*/
                imagenesMuestra.forEach(() => {
                    esMuestra.push(1);
                });
                imagenesMuestra.forEach((file) => {
                    selectedFiles.push(file);
                });
                formData.append("pregunta", textareaValue);
                formData.append("idSection", data);
                selectedFiles.forEach((file, index) => {
                    formData.append("imagenes", file); // Usar el mismo nombre de campo para todas las imágenes
                    formData.append("imagenIndex", index + 1); // Agregar información sobre el índice
                    formData.append("respuestaCorrecta", correctAnswers[index] ? 1 : 0); // Agregar la respuesta correcta
                    formData.append("fila", 0);
                    formData.append("esMuestra", esMuestra[index] ? 1 : 0);
                });
            }
        } else if (tipoComprension) {
            data = 4;
            if (textareaValue === '') {
                bandera = true;
                agregaTextoPregunta();
            } else if (selectedFiles.length < 3) {
                bandera = true;
                agregaMinimoOpcionesDeRespuesta(3)
            } else {
                fillRespuestaCorrecta();
                if (respCorrecta === 0) {
                    bandera = true;
                    noSeleccionaRespuestaCorrecta();
                } else if (respCorrecta > 1) {
                    bandera = true;
                    seleccionaVariasRespuestasCorrectas();
                } else {
                    bandera = false;
                    /* Llenar el array de esMuestra con las opciones de respuesta */
                    selectedFiles.forEach(() => {
                        esMuestra.push(0);
                    });
                    formData.append("pregunta", textareaValue);
                    formData.append("idSection", data);
                    selectedFiles.forEach((file, index) => {
                        formData.append("imagenes", file); // Usar el mismo nombre de campo para todas las imágenes
                        formData.append("imagenIndex", index + 1); // Agregar información sobre el índice
                        formData.append("respuestaCorrecta", correctAnswers[index] ? 1 : 0); // Agregar la respuesta correcta
                        formData.append("fila", 0);
                        formData.append("esMuestra", esMuestra[index] ? 1 : 0);
                    })
                }
            }
        } else if (tipoDibujos) {
            data = 5;
            if (textareaValue === '') {
                bandera = true;
                agregaPalabra();
            } else if (selectedFiles.length < 9) {
                bandera = true;
                agrega9OpcionesDeRespuesta();
            } else {
                fillRespuestaCorrecta();
                if (respCorrecta === 0) {
                    bandera = true;
                    noSeleccionaRespuestaCorrecta();
                } else if (respCorrecta > 1) {
                    bandera = true;
                    seleccionaVariasRespuestasCorrectas();
                } else {
                    bandera = false;
                    /* Llenar el array de esMuestra con las opciones de respuesta */
                    selectedFiles.forEach(() => {
                        esMuestra.push(0);
                    });
                    formData.append("pregunta", textareaValue);
                    formData.append("idSection", data);
                    selectedFiles.forEach((file, index) => {
                        formData.append("imagenes", file); // Usar el mismo nombre de campo para todas las imágenes
                        formData.append("imagenIndex", index + 1); // Agregar información sobre el índice
                        formData.append("respuestaCorrecta", correctAnswers[index] ? 1 : 0); // Agregar la respuesta correcta
                        formData.append("fila", 0);
                        formData.append("esMuestra", esMuestra[index] ? 1 : 0);
                    })
                }
            }
        } else if (tipoNombres) {
            data = 6;
            if (textareaValue === '') {
                bandera = true;
                daleNombrePregunta();
            } else if (imagenesMuestra.length < 2) {
                bandera = true;
                agregaUnaImagenDeMuestra();
            } else {
                bandera = false;
                /* Llenar el array de esMuestra con las opciones de respuesta */
                selectedFiles.forEach(() => {
                    esMuestra.push(0);
                });
                /* Llenar el array de esMuestra con las muestras*/
                imagenesMuestra.forEach(() => {
                    esMuestra.push(1);
                });
                imagenesMuestra.forEach((file) => {
                    selectedFiles.push(file);
                });
                formData.append("pregunta", textareaValue);
                formData.append("idSection", data);
                selectedFiles.forEach((file, index) => {
                    formData.append("imagenes", file); // Usar el mismo nombre de campo para todas las imágenes
                    formData.append("imagenIndex", index + 1); // Agregar información sobre el índice
                    formData.append("respuestaCorrecta", correctAnswers[index] ? 1 : 0); // Agregar la respuesta correcta
                    formData.append("fila", 0);
                    formData.append("esMuestra", esMuestra[index] ? 1 : 0);
                });
            }
        } else if (tipoMatrices) {
            data = 7;
            if (textareaValue === '') {
                bandera = true;
                daleNombrePregunta();
            } else if (selectedFiles.length === 0 && imagenesMuestra.length === 0) {
                bandera = true;
                Swal.fire({
                    icon: 'warning',
                    title: "Agrega Imágenes de Muestra y Opciones de Respuesta antes de crear la Pregunta",
                    confirmButtonText: "¡De acuerdo!",
                    confirmButtonColor: "rgba(255,67,49,0.75)",
                }).then((result) => {
                    console.log("result", result);
                }).catch((err) => {
                    console.log(err);
                });
            } else if (imagenesMuestra.length < 3) {
                bandera = true;
                agregaImagenesDeMuestra(3);
            } else if (selectedFiles.length < 3) {
                agregaMinimoOpcionesDeRespuesta(3);
                bandera = true;
            } else {
                fillRespuestaCorrecta();
                if (respCorrecta === 0) {
                    bandera = true;
                    noSeleccionaRespuestaCorrecta();
                } else if (respCorrecta > 1) {
                    bandera = true;
                    seleccionaVariasRespuestasCorrectas();
                } else {
                    bandera = false
                    /* Llenar el array de esMuestra con las opciones de respuesta */
                    selectedFiles.forEach(() => {
                        esMuestra.push(0);
                    });
                    /* Llenar el array de esMuestra con las muestras*/
                    imagenesMuestra.forEach(() => {
                        esMuestra.push(1);
                    });
                    imagenesMuestra.forEach((file) => {
                        selectedFiles.push(file);
                    });
                    formData.append("pregunta", textareaValue);
                    formData.append("idSection", data);
                    selectedFiles.forEach((file, index) => {
                        formData.append("imagenes", file); // Usar el mismo nombre de campo para todas las imágenes
                        formData.append("imagenIndex", index + 1); // Agregar información sobre el índice
                        formData.append("respuestaCorrecta", correctAnswers[index] ? 1 : 0); // Agregar la respuesta correcta
                        formData.append("fila", 0);
                        formData.append("esMuestra", esMuestra[index] ? 1 : 0);
                    });
                }
            }
        } else if (tipoConceptos) {
            data = 8;
            console.log("correctAnswersConceptos", correctAnswersConceptos);
            if (textareaValue === '') {
                bandera = true;
                daleNombrePregunta();
            } else if (selectedFiles1.length === 0 && selectedFiles2.length === 0 && selectedFiles3.length === 0) {
                bandera = true;
                Swal.fire({
                    icon: 'warning',
                    title: "Agrega Imágenes de Muestra y Opciones de Respuesta en toda las Filas antes de crear la Pregunta",
                    confirmButtonText: "¡De acuerdo!",
                    confirmButtonColor: "rgba(255,67,49,0.75)",
                }).then((result) => {
                    console.log("result", result);
                }).catch((err) => {
                    console.log(err);
                });
            } else if (selectedFiles1.length < 4 || selectedFiles2.length < 4 || selectedFiles3.length < 4) {
                bandera = true;
                Swal.fire({
                    icon: 'warning',
                    title: `Agrega 4 Opciones de Respuesta en cada Fila antes de crear la Pregunta`,
                    confirmButtonText: "¡De acuerdo!",
                    confirmButtonColor: "rgba(255,67,49,0.75)",
                }).then((result) => {
                    console.log("result", result);
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                fillRespuestaCorrectaConceptos();
                if (respCorrecta === 0) {
                    bandera = true;
                    noSeleccionaRespuestaCorrecta();
                } else if (respCorrecta < 3) {
                    bandera = true;
                    Swal.fire({
                        icon: 'warning',
                        title: "Debes seleccionar una Respuesta Correcta para cada Fila",
                        confirmButtonText: "¡De acuerdo!",
                        confirmButtonColor: "rgba(255,67,49,0.75)",
                    }).then((result) => {
                        console.log("result", result);
                    }).catch((err) => {
                        console.log(err);
                    })
                } else if (respCorrecta > 3) {
                    bandera = true;
                    Swal.fire({
                        icon: 'warning',
                        title: "Solo puedes seleccionar una Respuesta Correcta para cada Fila",
                        confirmButtonText: "¡De acuerdo!",
                        confirmButtonColor: "rgba(255,67,49,0.75)",
                    }).then((result) => {
                        console.log("result", result);
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    bandera = false;
                    selectedFiles1.forEach((file) => {
                        selectedFiles.push(file);
                        rowNumber.push(1);
                    });
                    selectedFiles2.forEach((file) => {
                        selectedFiles.push(file);
                        rowNumber.push(2);
                    });
                    selectedFiles3.forEach((file) => {
                        selectedFiles.push(file);
                        rowNumber.push(3);
                    });
                    /* Llenar el array de esMuestra con las opciones de respuesta */
                    selectedFiles.forEach(() => {
                        esMuestra.push(0);
                    });
                    //
                    formData.append("pregunta", textareaValue);
                    formData.append("idSection", data);
                    selectedFiles.forEach((file, index) => {
                        formData.append("imagenes", file); // Usar el mismo nombre de campo para todas las imágenes
                        formData.append("imagenIndex", index + 1); // Agregar información sobre el índice
                        formData.append("respuestaCorrecta", correctAnswersConceptos[index] ? 1 : 0); // Agregar la respuesta correcta
                        formData.append("fila", rowNumber[index]);
                        formData.append("esMuestra", esMuestra[index] ? 1 : 0);
                    })
                }
            }
        } else if (tipoReconocimiento) {
            data = 9;
            if (textareaValue === '') {
                bandera = true;
                daleNombrePregunta();
            } else if (selectedFiles.length === 0 && imagenesMuestra.length === 0) {
                bandera = true;
                Swal.fire({
                    icon: 'warning',
                    title: "Agrega Imágenes de Muestra y Opciones de Respuesta antes de crear la Pregunta",
                    confirmButtonText: "¡De acuerdo!",
                    confirmButtonColor: "rgba(255,67,49,0.75)",
                }).then((result) => {
                    console.log("result", result);
                }).catch((err) => {
                    console.log(err);
                });
            } else if (imagenesMuestra.length < 2) {
                bandera = true;
                agregaImagenesDeMuestra(2);
            } else if (selectedFiles.length < 3) {
                agregaMinimoOpcionesDeRespuesta(3);
                bandera = true;
            } else {
                fillRespuestaCorrecta();
                if (respCorrecta === 0) {
                    bandera = true;
                    Swal.fire({
                        icon: 'warning',
                        title: "Debes seleccionar las respuestas correctas antes de crear la Pregunta",
                        confirmButtonText: "¡De acuerdo!",
                        confirmButtonColor: "rgba(255,67,49,0.75)",
                    }).then((result) => {
                        console.log("result", result);
                    }).catch((err) => {
                        console.log(err);
                    })
                } else if (respCorrecta > 2) {
                    bandera = true;
                    Swal.fire({
                        icon: 'warning',
                        title: "No puedes seleccionar más opciones de respuesta",
                        confirmButtonText: "¡De acuerdo!",
                        confirmButtonColor: "rgba(255,67,49,0.75)",
                    }).then((result) => {
                        console.log("result", result);
                    }).catch((err) => {
                        console.log(err);
                    })
                } else if (respCorrecta !== imagenesMuestra.length){
                    bandera = true;
                    Swal.fire({
                        icon: 'warning',
                        title: "El número de respuestas correctas debe ser el mismo que el número de imágenes de muestra",
                        confirmButtonText: "¡De acuerdo!",
                        confirmButtonColor: "rgba(255,67,49,0.75)",
                    }).then((result) => {
                        console.log("result", result);
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    bandera = false;
                    /* Llenar el array de esMuestra con las opciones de respuesta */
                    selectedFiles.forEach(() => {
                        esMuestra.push(0);
                    });
                    /* Llenar el array de esMuestra con las muestras*/
                    imagenesMuestra.forEach(() => {
                        esMuestra.push(1);
                    });
                    imagenesMuestra.forEach((file) => {
                        selectedFiles.push(file);
                    });
                    formData.append("pregunta", textareaValue);
                    formData.append("idSection", data);
                    selectedFiles.forEach((file, index) => {
                        formData.append("imagenes", file); // Usar el mismo nombre de campo para todas las imágenes
                        formData.append("imagenIndex", index + 1); // Agregar información sobre el índice
                        formData.append("respuestaCorrecta", correctAnswers[index] ? 1 : 0); // Agregar la respuesta correcta
                        formData.append("fila", 0);
                        formData.append("esMuestra", esMuestra[index] ? 1 : 0);
                    });
                }
            }
        } else if (tipoBusqueda) {
            data = 10;
            if (textareaValue === '') {
                bandera = true;
                daleNombrePregunta();
            } else if (selectedFiles.length === 0 && imagenesMuestra.length === 0) {
                bandera = true;
                Swal.fire({
                    icon: 'warning',
                    title: "Agrega una imagen de muestra y opciones de respuesta antes de crear la Pregunta",
                    confirmButtonText: "¡De acuerdo!",
                    confirmButtonColor: "rgba(255,67,49,0.75)",
                }).then((result) => {
                    console.log("result", result);
                }).catch((err) => {
                    console.log(err);
                });
            } else if (imagenesMuestra.length < 1) {
                bandera = true;
                agregaUnaImagenDeMuestra();
            } else if (selectedFiles.length < 3) {
                agregaMinimoOpcionesDeRespuesta(3);
                bandera = true;
            } else {
                fillRespuestaCorrecta();
                if (respCorrecta === 0) {
                    bandera = true;
                    noSeleccionaRespuestaCorrecta();
                } else if (respCorrecta > 1) {
                    bandera = true;
                    seleccionaVariasRespuestasCorrectas();
                } else {
                    bandera = false;
                    /* Llenar el array de esMuestra con las opciones de respuesta */
                    selectedFiles.forEach(() => {
                        esMuestra.push(0);
                    });
                    /* Llenar el array de esMuestra con las muestras*/
                    imagenesMuestra.forEach(() => {
                        esMuestra.push(1);
                    });
                    imagenesMuestra.forEach((file) => {
                        selectedFiles.push(file);
                    });
                    formData.append("pregunta", textareaValue);
                    formData.append("idSection", data);
                    selectedFiles.forEach((file, index) => {
                        formData.append("imagenes", file); // Usar el mismo nombre de campo para todas las imágenes
                        formData.append("imagenIndex", index + 1); // Agregar información sobre el índice
                        formData.append("respuestaCorrecta", correctAnswers[index] ? 1 : 0); // Agregar la respuesta correcta
                        formData.append("fila", 0);
                        formData.append("esMuestra", esMuestra[index] ? 1 : 0);
                    });
                }
            }
        }
        try {
            if (!bandera) {
                // Enviar la solicitud al servidor
                const response = await axios.post(
                    "http://poliquizzes.com:3001/uploadQuestion",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                // Manejar la respuesta del servidor
                console.log(response.data);
                if (response.data.message === 'Pregunta creada correctamente') {
                    let timerInterval;
                    Swal.fire({
                        icon: 'success',
                        title: "¡Pregunta creada Correctamente!",
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
                        router.push('/select/selectSeccionPregunta');
                    }, 3000);
                    clearFields();
                } else if (response.data.message === 'Esta pregunta ya se encuentra registrada') {
                    Swal.fire({
                        icon: 'warning',
                        title: "Esta Pregunta ya ha sido creada",
                        confirmButtonText: "¡De acuerdo!",
                        confirmButtonColor: "rgba(255,67,49,0.75)",
                    }).then((result) => {
                        console.log("result", result);
                    }).catch((err) => {
                        console.log(err);
                    })
                    setTextareaValue('');
                }
            }
        } catch (error) {
            console.error("Error al subir la pregunta:", error);
        }
    };
    const limpiarSelectedFiles = () => {
        setSelectedFiles([]);
    };
    const limpiarSelectedFiles1 = () => {
        setSelectedFiles1([]);
    }
    const limpiarSelectedFiles2 = () => {
        setSelectedFiles2([]);
    }
    const limpiarSelectedFiles3 = () => {
        setSelectedFiles3([]);
    }
    const limpiarImagenesMuestra = () => {
        setImagenesMuestra([]);
    };
    const showGeneralInstructions = () => {
        Swal.fire({
            icon: "info",
            html: `Para obtener más información sobre cómo crear una <strong>Pregunta de tipo ${dato}</strong>, da clic en el botón de información en la parte superior derecha de la pantalla`,
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const showInformationInstructions = () => {
        Swal.fire({
            icon: "info",
            title: `Crea una Pregunta de tipo ${dato}`,
            html: "<div>\n" +
                "                <h4>Paso 1</h4>\n" +
                `                <p>Coloca una pregunta referente a la sección de ${dato}</p>\n` +
                "                <h4>Paso 2</h4>\n" +
                "                <p>Presiona el botón con el símbolo de <strong>+</strong> para agregar una opción de respuesta\n" +
                "                    (Recuerda que las opciones de respuesta deben ser imágenes alusivas a la pregunta)</p>\n" +
                "                <h4>Paso 3</h4>\n" +
                "                <p>Selecciona la respuesta correcta dando clic en el recuadro que aparece al <strong>lado izquierdo</strong> de la opción de\n" +
                "                    respuesta (Solo puedes escoger una respuesta correcta)</p>\n" +
                "                <h4>Paso 4</h4>\n" +
                "                <p>Puedes presionar el botón <strong>Limpiar Imágenes</strong> para borrar todas las opciones de respuesta</p>\n" +
                "                <p>Una vez esté todo listo, presiona el botón <strong>Crear Pregunta</strong> para crear la pregunta</p>\n" +
                "            </div>",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
            footer: "Puedes volver a ver estas instrucciones dando clic en el botón de información en la parte " +
                "superior derecha de la pantalla",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const showSemejanzasInstructions = () => {
        Swal.fire({
            icon: "info",
            title: `Crea una Pregunta de tipo ${dato}`,
            html: "<div>\n" +
                "                <h4>Paso 1</h4>\n" +
                `                <p><strong>Dale un nombre</strong> a esta Pregunta. Este nombre servirá únicamente como guía para que puedas identificarla más adelante.</p>\n` +
                "                <h4>Paso 2</h4>\n" +
                "                <p>Presiona el botón con el símbolo de <strong>+</strong> en el lado izquierdo de la pantalla\n" +
                "                    para agregar <strong>Imágenes de muestra</strong>.</p>\n" +
                "                <p>Estas imágenes son la referencia que tendrá el niño para poder dar una respuesta.</p>" +
                "                <p>Puedes presionar el botón <strong>Limpiar Imágenes</strong> para borrar todas las imágenes de muestra.</p>\n" +
                "                <h4>Paso 3</h4>\n" +
                "                <p>Presiona el botón con el símbolo de <strong>+</strong> en el lado derecho de la pantalla\n" +
                "                    para agregar <strong>Opciones de Respuesta</strong>.</p>\n" +
                "                <p>Puedes presionar el botón <strong>Limpiar Imágenes</strong> para borrar todas las opciones de respuesta.</p>\n" +
                "                <p>Estas imágenes son las opciones que puede seleccionar el niño para responder a la pregunta.</p>" +
                "                <h4>Paso 4</h4>\n" +
                "                <p>Una vez esté todo listo, presiona el botón <strong>Crear Pregunta</strong> para crear la pregunta</p>\n" +
                "            </div>",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
            footer: "Puedes volver a ver estas instrucciones dando clic en el botón de información en la parte " +
                "superior derecha de la pantalla",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const showVocabularioInstruction = () => {
        Swal.fire({
            icon: "info",
            title: `Crea una Pregunta de tipo ${dato}`,
            html: "<div>\n" +
                "                <h4>Paso 1</h4>\n" +
                `                <p><strong>Dale un nombre</strong> a esta Pregunta. Este nombre servirá únicamente como guía para que puedas identificarla más adelante.</p>\n` +
                "                <h4>Paso 2</h4>\n" +
                "                <p>Presiona el botón con el símbolo de <strong>+</strong> en el lado izquierdo de la pantalla\n" +
                "                    para agregar una <strong>Imagen de muestra</strong>.</p>\n" +
                "                <p>Puedes presionar el botón <strong>Limpiar Imágenes</strong> para borrar la imagen de muestra.</p>\n" +
                "                <h4>Paso 3</h4>\n" +
                "                <p>Una vez esté todo listo, presiona el botón <strong>Crear Pregunta</strong> para crear la pregunta</p>\n" +
                "            </div>",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
            footer: "Puedes volver a ver estas instrucciones dando clic en el botón de información en la parte " +
                "superior derecha de la pantalla",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const showComprensionInstructions = () => {
        Swal.fire({
            icon: "info",
            title: `Crea una Pregunta de tipo ${dato}`,
            html: "<div>\n" +
                "                <h4>Paso 1</h4>\n" +
                `                <p>Coloca una pregunta referente a la sección de ${dato}</p>\n` +
                "                <h4>Paso 2</h4>\n" +
                "                <p>Presiona el botón con el símbolo de <strong>+</strong> para agregar una opción de respuesta\n" +
                "                    (Recuerda que las opciones de respuesta deben ser imágenes alusivas a la pregunta)</p>\n" +
                "                <h4>Paso 3</h4>\n" +
                "                <p>Selecciona la respuesta correcta dando clic en el recuadro que aparece al <strong>lado izquierdo</strong> de la opción de\n" +
                "                    respuesta (Solo puedes escoger una respuesta correcta)</p>\n" +
                "                <h4>Paso 4</h4>\n" +
                "                <p>Puedes presionar el botón <strong>Limpiar Imágenes</strong> para borrar todas las opciones de respuesta</p>\n" +
                "                <p>Una vez esté todo listo, presiona el botón <strong>Crear Pregunta</strong> para crear la pregunta</p>\n" +
                "            </div>",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
            footer: "Puedes volver a ver estas instrucciones dando clic en el botón de información en la parte " +
                "superior derecha de la pantalla",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const showDibujosInstructions = () => {
        Swal.fire({
            icon: "info",
            title: `Crea una Pregunta de tipo ${dato}`,
            html: "<div>\n" +
                "                <h4>Paso 1</h4>\n" +
                `                <p>Escribe el nombre de la imagen que quieres que el niño identifique.</p>\n` +
                "                <h4>Paso 2</h4>\n" +
                "                <p>Presiona el botón con el símbolo de <strong>+</strong> para agregar una opción de respuesta.\n" +
                "                <h4>Paso 3</h4>\n" +
                "                <p>Selecciona la respuesta correcta dando clic en el recuadro que aparece al <strong>lado izquierdo</strong> de la opción de\n" +
                "                    respuesta (Solo puedes escoger una respuesta correcta).</p>\n" +
                "                <p>La respuesta correcta debe coincidir con la <strong>Palabra</strong> que escribiste anteriormente.</p>\n" +
                "                <h4>Paso 4</h4>\n" +
                "                <p>Puedes presionar el botón <strong>Limpiar Imágenes</strong> para borrar todas las opciones de respuesta</p>\n" +
                "                <p>Una vez esté todo listo, presiona el botón <strong>Crear Pregunta</strong> para crear la pregunta</p>\n" +
                "            </div>",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
            footer: "Puedes volver a ver estas instrucciones dando clic en el botón de información en la parte " +
                "superior derecha de la pantalla",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const showNombresInstructions = () => {
        Swal.fire({
            icon: "info",
            title: `Crea una Pregunta de tipo ${dato}`,
            html: "<div>\n" +
                "                <h4>Paso 1</h4>\n" +
                `                <p><strong>Dale un nombre</strong> a esta Pregunta. Este nombre servirá únicamente como guía para que puedas identificarla más adelante.</p>\n` +
                "                <h4>Paso 2</h4>\n" +
                "                <p>Presiona el botón con el símbolo de <strong>+</strong> en el lado izquierdo de la pantalla\n" +
                "                    para agregar una <strong>Imagen de muestra</strong>.</p>\n" +
                "                <p>Puedes presionar el botón <strong>Limpiar Imágenes</strong> para borrar la imagen de muestra.</p>\n" +
                "                <h4>Paso 3</h4>\n" +
                "                <p>Una vez esté todo listo, presiona el botón <strong>Crear Pregunta</strong> para crear la pregunta</p>\n" +
                "            </div>",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
            footer: "Puedes volver a ver estas instrucciones dando clic en el botón de información en la parte " +
                "superior derecha de la pantalla",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const showMatricesInstructions = () => {
        Swal.fire({
            icon: "info",
            title: `Crea una Pregunta de tipo ${dato}`,
            html: "<div>\n" +
                "                <h4>Paso 1</h4>\n" +
                `                <p><strong>Dale un nombre</strong> a esta Pregunta. Este nombre servirá únicamente como guía para que puedas identificarla más adelante.</p>\n` +
                "                <h4>Paso 2</h4>\n" +
                "                <p>Presiona el botón con el símbolo de <strong>+</strong> en el lado izquierdo de la pantalla\n" +
                "                    para agregar <strong>Imágenes de muestra</strong>.</p>\n" +
                "                <p>Estas imágenes son la referencia que tendrá el niño para poder dar una respuesta.</p>" +
                "                <p>Puedes presionar el botón <strong>Limpiar Imágenes</strong> para borrar todas las imágenes de muestra.</p>\n" +
                "                <h4>Paso 3</h4>\n" +
                "                <p>Presiona el botón con el símbolo de <strong>+</strong> en el lado derecho de la pantalla\n" +
                "                    para agregar <strong>Opciones de Respuesta</strong>.</p>\n" +
                "                <p>Puedes presionar el botón <strong>Limpiar Imágenes</strong> para borrar todas las opciones de respuesta.</p>\n" +
                "                <p>Estas imágenes son las opciones que puede seleccionar el niño para responder a la pregunta.</p>" +
                "                <h4>Paso 4</h4>\n" +
                "                <p>Una vez esté todo listo, presiona el botón <strong>Crear Pregunta</strong> para crear la pregunta</p>\n" +
                "            </div>",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
            footer: "Puedes volver a ver estas instrucciones dando clic en el botón de información en la parte " +
                "superior derecha de la pantalla",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const showConceptosInstructions = () => {
        Swal.fire({
            icon: "info",
            title: `Crea una Pregunta de tipo ${dato}`,
            html: "<div>\n" +
                "                <h4>Paso 1</h4>\n" +
                `                <p><strong>Dale un nombre</strong> a esta Pregunta. Este nombre servirá únicamente como guía para que puedas identificarla más adelante.</p>` +
                "                <h4>Paso 2</h4>" +
                "                <p>Debes agregar opciones de respuesta para tres <strong>Filas</strong> diferentes</p>" +
                "                <p>Presiona el botón con el símbolo de <strong>+</strong> para agregar una opción de respuesta en cada <strong>Fila</strong>\n" +
                "                <h4>Paso 3</h4>\n" +
                "                <p>Selecciona la respuesta correcta de cada <strong>Fila</strong> dando clic en el recuadro que aparece al <strong>lado izquierdo</strong> de la opción de\n" +
                "                    respuesta (Solo puedes escoger una respuesta correcta por fila)</p>\n" +
                "                <h4>Paso 4</h4>\n" +
                "                <p>Puedes presionar el botón <strong>Limpiar Imágenes</strong> para borrar todas las opciones de respuesta de una <strong>Fila</strong> en específico</p>\n" +
                "                <p>Una vez esté todo listo, presiona el botón <strong>Crear Pregunta</strong> para crear la pregunta</p>\n" +
                "            </div>",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
            footer: "Puedes volver a ver estas instrucciones dando clic en el botón de información en la parte " +
                "superior derecha de la pantalla",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const showReconocimientoInstructions = () => {
        Swal.fire({
            icon: "info",
            title: `Crea una Pregunta de tipo ${dato}`,
            html: "<div>\n" +
                "                <h4>Paso 1</h4>\n" +
                `                <p><strong>Dale un nombre</strong> a esta Pregunta. Este nombre servirá únicamente como guía para que puedas identificarla más adelante.</p>\n` +
                "                <h4>Paso 2</h4>\n" +
                "                <p>Presiona el botón con el símbolo de <strong>+</strong> en el lado izquierdo de la pantalla\n" +
                "                    para agregar <strong>Imágenes de muestra</strong>.</p>\n" +
                "                <p>Estas imágenes son la referencia que tendrá el niño para poder dar una respuesta.</p>" +
                "                <p>Puedes presionar el botón <strong>Limpiar Imágenes</strong> para borrar todas las imágenes de muestra.</p>\n" +
                "                <h4>Paso 3</h4>\n" +
                "                <p>Presiona el botón con el símbolo de <strong>+</strong> en el lado derecho de la pantalla\n" +
                "                    para agregar <strong>Opciones de Respuesta</strong>.</p>\n" +
                "                <p>Puedes presionar el botón <strong>Limpiar Imágenes</strong> para borrar todas las opciones de respuesta.</p>\n" +
                "                <h4>Paso 4</h4>\n" +
                "                <p>Una vez esté todo listo, presiona el botón <strong>Crear Pregunta</strong> para crear la pregunta</p>\n" +
                "            </div>",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
            footer: "Puedes volver a ver estas instrucciones dando clic en el botón de información en la parte " +
                "superior derecha de la pantalla",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
    }
    const showBusquedaInstructions = () => {
        Swal.fire({
            icon: "info",
            title: `Crea una Pregunta de tipo ${dato}`,
            html: "<div>\n" +
                "                <h4>Paso 1</h4>\n" +
                `                <p><strong>Dale un nombre</strong> a esta Pregunta. Este nombre servirá únicamente como guía para que puedas identificarla más adelante.</p>\n` +
                "                <h4>Paso 2</h4>\n" +
                "                <p>Presiona el botón con el símbolo de <strong>+</strong> en el lado izquierdo de la pantalla\n" +
                "                    para agregar una <strong>Imagen de muestra</strong>.</p>\n" +
                "                <p>Esta es la imagen que deberá reconocer el niño de entre las opciones de respuesta.</p>" +
                "                <p>Puedes presionar el botón <strong>Limpiar Imagen</strong> para borrar la imagen de muestra.</p>\n" +
                "                <h4>Paso 3</h4>\n" +
                "                <p>Presiona el botón con el símbolo de <strong>+</strong> en el lado derecho de la pantalla\n" +
                "                    para agregar <strong>Opciones de Respuesta</strong>.</p>\n" +
                "                <p>Puedes presionar el botón <strong>Limpiar Imágenes</strong> para borrar todas las opciones de respuesta.</p>\n" +
                "                <h4>Paso 4</h4>\n" +
                "                <p>Una vez esté todo listo, presiona el botón <strong>Crear Pregunta</strong> para crear la pregunta</p>\n" +
                "            </div>",
            confirmButtonText: "¡De acuerdo!",
            confirmButtonColor: "rgba(255,67,49,0.75)",
            footer: "Puedes volver a ver estas instrucciones dando clic en el botón de información en la parte " +
                "superior derecha de la pantalla",
        }).then((result) => {
            console.log("result", result);
        }).catch((err) => {
            console.log(err);
        })
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
                router.push('/select/selectSeccionPregunta');
            }
        })
    }
    const fillRespuestaCorrecta = () => {
        for (let i = 0; i < selectedFiles.length; i++) {
            if (correctAnswers[i] === true) {
                respCorrecta = respCorrecta + 1;
            }
        }
    }
    const fillRespuestaCorrectaConceptos = () => {
        const tamanio = selectedFiles1.length + selectedFiles2.length + selectedFiles3.length;
        for (let i = 0; i < tamanio; i++) {
            if (correctAnswersConceptos[i] === 1) {
                respCorrecta = respCorrecta + 1;
            }
        }
    }
    return (
        <main className={`bg-amber-50 min-h-screen`}>
            <UpperBar color={navstyles.upper_bar_red} questionType={dato}/>
            {tipoInformacion && (
                <div>
                    <InstructionBar confirmation={confirmGetBack}
                                    instruction={`Crea una pregunta`}
                                    information={showInformationInstructions}
                                    info_color={button.btn_red}
                                    hiddenVoice={`hidden`}
                                    hiddenHome={`hidden`}/>
                    <div className={`container-fluid px-5`}>
                        <h4><label htmlFor="myTextarea">Pregunta</label></h4>
                        <textarea
                            id="myTextarea"
                            name="myTextarea"
                            value={textareaValue}
                            onChange={handleChange}
                            rows="2" // Puedes ajustar la cantidad de filas según tus necesidades
                            className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}
                        />
                        <br/><br/>
                        <h4><label>Opciones de Respuesta</label></h4>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <div
                                    className={`border-1 border-black shadow-md rounded-2xl px-5 pt-4 bg-white ${styles.overflow_container_answers_informacion}`}>
                                    {selectedFiles.map((file, index) => (
                                        <div key={index}>
                                            <div className={`container-fluid `}>
                                                <div className={`row d-flex py-2 px-2 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}`}>
                                                    <div className={`col-1 d-flex justify-content-end`}>
                                                        <input
                                                            type="checkbox"
                                                            name={`respuestaCorrecta_${index}`}
                                                            checked={correctAnswers[index] || false}
                                                            onChange={(e) => {
                                                                const isChecked = e.target.checked;
                                                                setCorrectAnswers((prevRespuestas) => ({
                                                                    ...prevRespuestas,
                                                                    [index]: isChecked,
                                                                }));
                                                            }}
                                                            className={`w-100`}
                                                        />
                                                    </div>
                                                    <div className={`col-8 py-1`}>
                                                        {file.name}
                                                    </div>
                                                    <div className={`col-3 self-center`}>
                                                        <strong>(opción {index + 1})</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={`col-6 self-center`}>
                                <div className={`flex justify-center`}>
                                    <div className={`w-50`}>
                                        <Button text={`Crear Pregunta`} bg_color={button.btn_red}
                                                instruction={handleUpload}/>
                                    </div>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <div className={`w-50`}>
                                        <Button text={`Limpiar imágenes`} bg_color={button.btn_white}
                                                instruction={limpiarSelectedFiles}></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <label htmlFor="myAnswersArea" className="custom-file-upload d-flex justify-center">
                                    <div className={`px-3 py-2 rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${button.btn_red} ${styles.btn_text} ${styles.more}`}>
                                        +
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    id="myAnswersArea"
                                    accept="image/*"
                                    onChange={handleFileChangeInformacion}
                                    style={{display: 'none'}} // Ocultar el input original
                                    multiple
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {tipoSemejanza && (
                <div>
                    <InstructionBar confirmation={confirmGetBack}
                                    instruction={`Crea una pregunta`}
                                    information={showSemejanzasInstructions}
                                    info_color={button.btn_red}
                                    hiddenVoice={`hidden`}
                                    hiddenHome={`hidden`}/>
                    <div className={`container-fluid px-5`}>
                        <h4><label htmlFor="myTextarea">Nombre de la Pregunta</label></h4>
                        <textarea
                            id="myTextarea"
                            name="myTextarea"
                            value={textareaValue}
                            onChange={handleChange}
                            rows="2" // Puedes ajustar la cantidad de filas según tus necesidades
                            className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}
                        />
                        <br/><br/>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <h4><label>Imágenes de Muestra</label></h4>
                                <div
                                    className={`border-1 border-black shadow-md rounded-2xl px-5 pt-4 bg-white ${styles.overflow_container_answers_semejanzas}`}>
                                    {imagenesMuestra.map((file, index) => (
                                        <div key={index}>
                                            <div className={`container-fluid`}>
                                                <div className={`row py-2 px-2 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}`}>
                                                    <div className={`col-8 py-1`}>
                                                        {file.name}
                                                    </div>
                                                    <div className={`col-3 self-center`}>
                                                        <strong>(muestra {index + 1}) </strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                                <br/>
                                <div className={`container-fluid`}>
                                    <div className={`row justify-content-evenly`}>
                                        <div className={`col-3 flex justify-center`}>
                                            <label htmlFor="myMuestraArea"
                                                   className="custom-file-upload d-flex justify-center">
                                                <div className={`px-3 py-2 text-white rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${button.btn_red} ${styles.btn_text}`}>
                                                    +
                                                </div>
                                            </label>
                                            <input
                                                type="file"
                                                id="myMuestraArea"
                                                accept="image/*"
                                                onChange={handleFileChangeMuestra}
                                                style={{display: 'none'}} // Ocultar el input original
                                                multiple
                                            />
                                        </div>
                                        <div className={`col-8`}>
                                            <div className={`flex justify-end`}>
                                                <div className={`w-75`}>
                                                    <Button text={`Limpiar Imágenes`}
                                                            instruction={limpiarImagenesMuestra}
                                                            bg_color={button.btn_white}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-6`}>
                                <h4><label>Opciones de Respuesta</label></h4>
                                <div
                                    className={`border-1 border-black shadow-md rounded-2xl px-5 pt-4 bg-white ${styles.overflow_container_answers_semejanzas}`}>
                                    {selectedFiles.map((file, index) => (
                                        <div key={index}>
                                            <div className={`container-fluid`}>
                                                <div className={`row py-2 px-2 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}`}>
                                                    <div className={`col-1 d-flex justify-content-end`}>
                                                        <input
                                                            type="checkbox"
                                                            name={`respuestaCorrecta_${index}`}
                                                            checked={correctAnswers[index] || false}
                                                            onChange={(e) => {
                                                                const isChecked = e.target.checked;
                                                                setCorrectAnswers((prevRespuestas) => ({
                                                                    ...prevRespuestas,
                                                                    [index]: isChecked,
                                                                }));
                                                            }}
                                                            className={`w-100`}
                                                        />
                                                    </div>
                                                    <div className={`col-8 py-1`}>
                                                        <div>{file.name}</div>
                                                    </div>
                                                    <div className={`col-3 self-center`}>
                                                        <strong>(opción {index + 1})</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                                <br/>
                                <div className={`container-fliud`}>
                                    <div className={`row justify-content-evenly`}>
                                        <div className={`col-3 flex justify-center`}>
                                            <label htmlFor="myAnswersArea"
                                                   className="custom-file-upload d-flex justify-center">
                                                <div className={`px-4 py-2 text-white rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${button.btn_red} ${styles.btn_text}`}>
                                                    +
                                                </div>
                                            </label>
                                            <input
                                                type="file"
                                                id="myAnswersArea"
                                                accept="image/*"
                                                onChange={handleFileChangeSemejanzas}
                                                style={{display: 'none'}} // Ocultar el input original
                                                multiple
                                            />
                                        </div>
                                        <div className={`col-8`}>
                                            <div className={`flex justify-end`}>
                                                <div className={`w-75`}>
                                                    <Button text={`Limpiar Imágenes`}
                                                            instruction={limpiarSelectedFiles}
                                                            bg_color={button.btn_white}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className={`flex justify-center`}>
                        <div className={`w-25`}>
                            <Button text={`Crear Pregunta`} bg_color={button.btn_red}
                                    instruction={handleUpload}></Button>
                        </div>
                    </div>
                </div>
            )}
            {tipoVocabulario && (
                <div>
                    <InstructionBar confirmation={confirmGetBack}
                                    instruction={`Crea una pregunta`}
                                    information={showVocabularioInstruction}
                                    info_color={button.btn_red}
                                    hiddenVoice={`hidden`}
                                    hiddenHome={`hidden`}/>
                    <div className={`container-fluid px-5`}>
                        <h4><label htmlFor="myTextarea">Pregunta</label></h4>
                        <textarea
                            id="myTextarea"
                            name="myTextarea"
                            value={textareaValue}
                            onChange={handleChange}
                            rows="2" // Puedes ajustar la cantidad de filas según tus necesidades
                            className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}
                        />
                        <br/> <br/>
                        <h4><label>Imagen de Muestra</label></h4>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <div
                                    className={`border-1 border-black shadow-md rounded-2xl px-5 pt-4 bg-white ${styles.overflow_container_samples_2}`}>
                                    {imagenesMuestra.map((file, index) => (
                                        <div key={index}>
                                            <div className={`container-fluid `}>
                                                <div className={`row px-2 py-2 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}`}>
                                                    <div className={`col-9 py-2`}>
                                                        {file.name}
                                                    </div>
                                                    <div className={`col-3 self-center`}>
                                                        <strong>(muestra {index + 1})</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                                <br/>
                            </div>
                            <div className={`col-6 self-center`}>
                                <div className={`flex justify-center`}>
                                    <div className={`w-50`}>
                                        <Button text={`Crear Pregunta`}
                                                instruction={handleUpload}
                                                bg_color={button.btn_red}/>
                                    </div>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <div className={`w-50`}>
                                        <Button text={`Limpiar imágenes`} bg_color={button.btn_white}
                                                instruction={limpiarImagenesMuestra}></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <label htmlFor="myMuestraArea" className="custom-file-upload d-flex justify-center">
                                    <div className={`px-3 py-2 rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${button.btn_red} ${styles.btn_text}`}>
                                        +
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    id="myMuestraArea"
                                    accept="image/*"
                                    onChange={handleFileChangeMuestraVocabulario}
                                    style={{display: 'none'}} // Ocultar el input original
                                    multiple
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {tipoComprension && (
                <div>
                    <InstructionBar confirmation={confirmGetBack}
                                    instruction={`Crea una pregunta`}
                                    information={showComprensionInstructions}
                                    info_color={button.btn_red}
                                    hiddenVoice={`hidden`}
                                    hiddenHome={`hidden`}/>
                    <div className={`container-fluid px-5`}>
                        <h4><label htmlFor="myTextarea">Pregunta</label></h4>
                        <textarea
                            id="myTextarea"
                            name="myTextarea"
                            value={textareaValue}
                            onChange={handleChange}
                            rows="2" // Puedes ajustar la cantidad de filas según tus necesidades
                            className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}
                        />
                        <br/> <br/>
                        <h4><label>Opciones de Respuesta</label></h4>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <div
                                    className={`border-1 border-black shadow-md rounded-2xl px-5 pt-4 bg-white ${styles.overflow_container_answers_informacion}`}>
                                    {selectedFiles.map((file, index) => (
                                        <div key={index}>
                                            <div className={`container-fluid `}>
                                                <div className={`row d-flex py-2 px-2 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}`}>
                                                    <div className={`col-1 d-flex justify-content-end`}>
                                                        <input
                                                            type="checkbox"
                                                            name={`respuestaCorrecta_${index}`}
                                                            checked={correctAnswers[index] || false}
                                                            onChange={(e) => {
                                                                const isChecked = e.target.checked;
                                                                setCorrectAnswers((prevRespuestas) => ({
                                                                    ...prevRespuestas,
                                                                    [index]: isChecked,
                                                                }));
                                                            }}
                                                            className={`w-100`}
                                                        />
                                                    </div>
                                                    <div className={`col-8 py-1`}>
                                                        {file.name}
                                                    </div>
                                                    <div className={`col-3 self-center`}>
                                                        <strong>(opcion {index + 1})</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={`col-6 self-center`}>
                                <div className={`flex justify-center`}>
                                    <div className={`w-50`}>
                                        <Button text={`Crear Pregunta`} bg_color={button.btn_red}
                                                instruction={handleUpload}/>
                                    </div>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <div className={`w-50`}>
                                        <Button text={`Limpiar imágenes`} bg_color={button.btn_white}
                                                instruction={limpiarSelectedFiles}></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <label htmlFor="myAnswersArea" className="custom-file-upload d-flex justify-center">
                                    <div className={`px-3 py-2 rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${button.btn_red} ${styles.btn_text}`}>
                                        +
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    id="myAnswersArea"
                                    accept="image/*"
                                    onChange={handleFileChangeComprension}
                                    style={{display: 'none'}} // Ocultar el input original
                                    multiple
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {tipoDibujos && (
                <div>
                    <InstructionBar confirmation={confirmGetBack}
                                    instruction={`Crea una pregunta`}
                                    information={showDibujosInstructions}
                                    info_color={button.btn_red}
                                    hiddenVoice={`hidden`}
                                    hiddenHome={`hidden`}/>
                    <div className={`container-fluid px-5`}>
                        <h4><label htmlFor="myTextarea">Palabra</label></h4>
                        <textarea
                            id="myTextarea"
                            name="myTextarea"
                            value={textareaValue}
                            onChange={handleChange}
                            rows="1" // Puedes ajustar la cantidad de filas según tus necesidades
                            className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}
                        />
                        <br/> <br/>
                        <h4><label>Opciones de Respuesta</label></h4>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <div
                                    className={`border-1 border-black shadow-md rounded-2xl px-5 pt-4 bg-white ${styles.overflow_container_answers_informacion}`}>
                                    {selectedFiles.map((file, index) => (
                                        <div key={index}>
                                            <div className={`container-fluid `}>
                                                <div className={`row d-flex py-2 px-2 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}`}>
                                                    <div className={`col-1 d-flex justify-content-end`}>
                                                        <input
                                                            type="checkbox"
                                                            name={`respuestaCorrecta_${index}`}
                                                            checked={correctAnswers[index] || false}
                                                            onChange={(e) => {
                                                                const isChecked = e.target.checked;
                                                                setCorrectAnswers((prevRespuestas) => ({
                                                                    ...prevRespuestas,
                                                                    [index]: isChecked,
                                                                }));
                                                            }}
                                                            className={`w-100`}
                                                        />
                                                    </div>
                                                    <div className={`col-8 py-1`}>
                                                        {file.name}
                                                    </div>
                                                    <div className={`col-3 self-center`}>
                                                        <strong>(opcion {index + 1})</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={`col-6 self-center`}>
                                <div className={`flex justify-center`}>
                                    <div className={`w-50`}>
                                        <Button text={`Crear Pregunta`} bg_color={button.btn_red}
                                                instruction={handleUpload}/>
                                    </div>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <div className={`w-50`}>
                                        <Button text={`Limpiar imágenes`} bg_color={button.btn_white}
                                                instruction={limpiarSelectedFiles}></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <label htmlFor="myAnswersArea" className="custom-file-upload d-flex justify-center">
                                    <div className={`px-3 py-2 rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${button.btn_red} ${styles.btn_text}`}>
                                        +
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    id="myAnswersArea"
                                    accept="image/*"
                                    onChange={handleFileChangeDibujos}
                                    style={{display: 'none'}} // Ocultar el input original
                                    multiple
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {tipoNombres && (
                <div>
                    <InstructionBar confirmation={confirmGetBack}
                                    instruction={`Crea una pregunta`}
                                    information={showNombresInstructions}
                                    info_color={button.btn_red}
                                    hiddenVoice={`hidden`}
                                    hiddenHome={`hidden`}/>
                    <div className={`container-fluid px-5`}>
                        <h4><label htmlFor="myTextarea">Pregunta</label></h4>
                        <textarea
                            id="myTextarea"
                            name="myTextarea"
                            value={textareaValue}
                            onChange={handleChange}
                            rows="2" // Puedes ajustar la cantidad de filas según tus necesidades
                            className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}
                        />
                        <br/> <br/>
                        <h4><label>Imagen de Muestra</label></h4>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <div
                                    className={`border-1 border-black shadow-md rounded-2xl px-5 pt-4 bg-white ${styles.overflow_container_samples_2}`}>
                                    {imagenesMuestra.map((file, index) => (
                                        <div key={index}>
                                            <div className={`container-fluid `}>
                                                <div className={`row py-2 px-2 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}`}>
                                                    <div className={`col-9 py-2`}>
                                                        {file.name}
                                                    </div>
                                                    <div className={`col-3 self-center`}>
                                                        <strong>(muestra {index + 1})</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={`col-6 self-center`}>
                                <div className={`flex justify-center`}>
                                    <div className={`w-50`}>
                                        <Button text={`Crear Pregunta`}
                                                instruction={handleUpload}
                                                bg_color={button.btn_red}/>
                                    </div>
                                </div>
                                <br/>
                                <div className={`flex justify-center`}>
                                    <div className={`w-50`}>
                                        <Button text={`Limpiar imágenes`} bg_color={button.btn_white}
                                                instruction={limpiarImagenesMuestra}></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <label htmlFor="myMuestraArea" className="custom-file-upload d-flex justify-center">
                                    <div className={`px-3 py-2 rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${button.btn_red} ${styles.btn_text}`}>
                                        +
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    id="myMuestraArea"
                                    accept="image/*"
                                    onChange={handleFileChangeMuestraVocabulario}
                                    style={{display: 'none'}} // Ocultar el input original
                                    multiple
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {tipoMatrices && (
                <div>
                    <InstructionBar confirmation={confirmGetBack}
                                    instruction={`Crea una pregunta`}
                                    information={showMatricesInstructions}
                                    info_color={button.btn_red}
                                    hiddenVoice={`hidden`}
                                    hiddenHome={`hidden`}/>
                    <div className={`container-fluid px-5`}>
                        <h4><label htmlFor="myTextarea">Pregunta</label></h4>
                        <textarea
                            id="myTextarea"
                            name="myTextarea"
                            value={textareaValue}
                            onChange={handleChange}
                            rows="1" // Puedes ajustar la cantidad de filas según tus necesidades
                            className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}
                        />
                        <br/><br/>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <h4><label>Imágenes de Muestra</label></h4>
                                <div
                                    className={`border-1 border-black shadow-md rounded-2xl px-5 pt-4 bg-white ${styles.overflow_container_answers_semejanzas}`}>
                                    {imagenesMuestra.map((file, index) => (
                                        <div key={index}>
                                            <div className={`container-fluid `}>
                                                <div className={`row py-2 px-2 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}`}>
                                                    <div className={`col-8 py-1`}>
                                                        {file.name}
                                                    </div>
                                                    <div className={`col-3 self-center`}>
                                                        <strong>(muestra {index + 1})</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                                <br/>
                                <div className={`container-fluid`}>
                                    <div className={`row justify-content-evenly`}>
                                        <div className={`col-3 flex justify-center`}>
                                            <label htmlFor="myMuestraArea"
                                                   className="custom-file-upload d-flex justify-center">
                                                <div className={`px-3 py-2 rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${button.btn_red} ${styles.btn_text} `}>
                                                    +
                                                </div>
                                            </label>
                                            <input
                                                type="file"
                                                id="myMuestraArea"
                                                accept="image/*"
                                                onChange={handleFileChangeMuestra}
                                                style={{display: 'none'}} // Ocultar el input original
                                                multiple
                                            />
                                        </div>
                                        <div className={`col-8`}>
                                            <div className={`flex justify-end`}>
                                                <div className={`w-75`}>
                                                    <Button text={`Limpiar Imágenes`}
                                                            instruction={limpiarImagenesMuestra}
                                                            bg_color={button.btn_white}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-6`}>
                                <h5><label>Opciones de Repuesta</label></h5>
                                <div
                                    className={`border-1 border-black shadow-md rounded-2xl px-5 pt-4 bg-white ${styles.overflow_container_answers_semejanzas}`}>
                                    {selectedFiles.map((file, index) => (
                                        <div key={index}>
                                            <div className={`container-fluid `}>
                                                <div className={`row py-2 px-2 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}`}>
                                                    <div className={`col-1 d-flex justify-content-end`}>
                                                        <input
                                                            type="checkbox"
                                                            name={`respuestaCorrecta_${index}`}
                                                            checked={correctAnswers[index] || false}
                                                            onChange={(e) => {
                                                                const isChecked = e.target.checked;
                                                                setCorrectAnswers((prevRespuestas) => ({
                                                                    ...prevRespuestas,
                                                                    [index]: isChecked,
                                                                }));
                                                            }}
                                                            className={`w-100`}
                                                        />
                                                    </div>
                                                    <div className={`col-8 py-1`}>
                                                        <div>{file.name}</div>
                                                    </div>
                                                    <div className={`col-3 self-center`}>
                                                        <strong>(opción {index + 1})</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    ))}
                                    <br/>
                                </div>
                                <br/>
                                <div className={`container-fluid`}>
                                    <div className={`row justify-content-evenly`}>
                                        <div className={`col-3 flex justify-center`}>
                                            <label htmlFor="myAnswersArea"
                                                   className="custom-file-upload d-flex justify-center">
                                                <div className={`px-3 py-2 rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${button.btn_red} ${styles.btn_text} ${styles.btn_sticky}`}>
                                                    +
                                                </div>
                                            </label>
                                            <input
                                                type="file"
                                                id="myAnswersArea"
                                                accept="image/*"
                                                onChange={handleFileChangeMatrices}
                                                style={{display: 'none'}} // Ocultar el input original
                                                multiple
                                            />
                                        </div>
                                        <div className={`col-8`}>
                                            <div className={`flex justify-end`}>
                                                <div className={`w-75`}>
                                                    <Button text={`Limpiar Imágenes`}
                                                            instruction={limpiarSelectedFiles}
                                                            bg_color={button.btn_white}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                            </div>
                            <div className={`flex justify-center`}>
                                <div className={`w-25`}>
                                    <Button text={`Crear Pregunta`} bg_color={button.btn_red}
                                            instruction={handleUpload}></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {tipoConceptos && (
                <div>
                    <InstructionBar confirmation={confirmGetBack}
                                    instruction={`Crea una pregunta`}
                                    information={showConceptosInstructions}
                                    info_color={button.btn_red}
                                    hiddenVoice={`hidden`}
                                    hiddenHome={`hidden`}/>
                    <div className={`container-fluid px-5`}>
                        <h4><label htmlFor="myTextarea">Nombre de la Pregunta</label></h4>
                        <textarea
                            id="myTextarea"
                            name="myTextarea"
                            value={textareaValue}
                            onChange={handleChange}
                            rows="1" // Puedes ajustar la cantidad de filas según tus necesidades
                            className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}
                        /> <br/> <br/>
                        <div className={`row`}>
                            <div className={`col-4`}>
                                <h4><label>Opciones de Respuesta de la Fila 1</label></h4>
                                <div
                                    className={`border-1 border-black shadow-md rounded-2xl px-5 pt-4 bg-white ${styles.overflow_container_samples}`}>
                                    {selectedFiles1.map((file, index) => (
                                        <div key={index}>
                                            <div className={`container-fluid p-0`}>
                                                <div className={`row py-2 px-2 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}`}>
                                                    <div className={`col-2 d-flex justify-content-end`}>
                                                        <input
                                                            type="checkbox"
                                                            name={`respuestaCorrecta1_${index}`}
                                                            checked={correctAnswersConceptos[index] || false}
                                                            onChange={(e) => {
                                                                const isChecked = e.target.checked;
                                                                setCorrectAnswersConceptos((prevRespuestas) => {
                                                                    const newRespuestas = [...prevRespuestas];
                                                                    newRespuestas[index] = isChecked ? 1 : 0;
                                                                    return newRespuestas;
                                                                });
                                                            }}
                                                            className={`w-2/3`}
                                                        />
                                                    </div>
                                                    <div className={`col-10`}>
                                                        <div className={`p-0`}>
                                                            <div className={`${styles.cart_answer_test}`}>
                                                                {file.name} <strong>(opción {index + 1})</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    ))}
                                    <br/>
                                </div>
                                <br/>
                                <div className={`container-fluid`}>
                                    <div className={`row`}>
                                        <div className={`col-9 p-0`}>
                                            <div className={`flex justify-center`}>
                                                <div className={`w-100`}>
                                                    <Button text={`Limpiar imágenes`} bg_color={button.btn_white}
                                                            instruction={limpiarSelectedFiles1}></Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`col-3 flex justify-end self-center`}>
                                            <label htmlFor="myAnswersArea"
                                                   className="custom-file-upload d-flex justify-center">
                                                <div className={`px-3 py-2 rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${button.btn_red} ${styles.btn_text} ${styles.btn_sticky}`}>
                                                    +
                                                </div>
                                            </label>
                                            <input
                                                type="file"
                                                id="myAnswersArea"
                                                accept="image/*"
                                                onChange={handleFileChangeConcept1}
                                                style={{display: 'none'}} // Ocultar el input original
                                                multiple
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-4`}>
                                <h4><label>Opciones de Respuesta de la Fila 2</label></h4>
                                <div
                                    className={`border-1 border-black shadow-md rounded-2xl px-5 pt-4 bg-white ${styles.overflow_container_samples}`}>
                                    {selectedFiles2.map((file, index) => (
                                        <div key={index}>
                                            <div className={`container-fluid p-0`}>
                                                <div className={`row py-2 px-2 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}`}>
                                                    <div className={`col-2 d-flex justify-content-end`}>
                                                        <input
                                                            type="checkbox"
                                                            name={`otra_vaina_${index + 4}`}
                                                            checked={correctAnswersConceptos[index + 4] || false}
                                                            onChange={(e) => {
                                                                const isChecked = e.target.checked;
                                                                setCorrectAnswersConceptos((prevRespuestas) => {
                                                                    const newRespuestas = [...prevRespuestas];
                                                                    newRespuestas[index + 4] = isChecked ? 1 : 0;
                                                                    return newRespuestas;
                                                                });
                                                            }}
                                                            className={`w-2/3`}
                                                        />
                                                    </div>
                                                    <div className={`col-10`}>
                                                        <div className={`p-0`}>
                                                            <div className={`${styles.cart_answer_test}`}>
                                                                {file.name} <strong>(opción {index + 1})</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    ))}
                                    <br/>
                                </div>
                                <br/>
                                <div className={`container-fluid`}>
                                    <div className={`row`}>
                                        <div className={`col-9 p-0`}>
                                            <div className={`flex justify-center`}>
                                                <div className={`w-100`}>
                                                    <Button text={`Limpiar imágenes`} bg_color={button.btn_white}
                                                            instruction={limpiarSelectedFiles2}></Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`col-3 flex justify-end self-center`}>
                                            <label htmlFor="myAnswersArea2"
                                                   className="custom-file-upload d-flex justify-center">
                                                <div className={`px-3 py-2 rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${button.btn_red} ${styles.btn_text} ${styles.btn_sticky}`}>
                                                    +
                                                </div>
                                            </label>
                                            <input
                                                type="file"
                                                id="myAnswersArea2"
                                                accept="image/*"
                                                onChange={handleFileChangeConcept2}
                                                style={{display: 'none'}} // Ocultar el input original
                                                multiple
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-4`}>
                                <h4><label>Opciones de respuesta de la Fila 3</label></h4>
                                <div
                                    className={`border-1 border-black shadow-md rounded-2xl px-5 pt-4 bg-white ${styles.overflow_container_samples}`}>
                                    {selectedFiles3.map((file, index) => (
                                        <div key={index}>
                                            <div className={`container-fluid p-0`}>
                                                <div className={`row py-2 px-2 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}`}>
                                                    <div className={`col-2 d-flex justify-content-end`}>
                                                        <input
                                                            type="checkbox"
                                                            name={`respuestaCorrecta3_${index + 8}`}
                                                            checked={correctAnswersConceptos[index + 8] || false}
                                                            onChange={(e) => {
                                                                const isChecked = e.target.checked;
                                                                setCorrectAnswersConceptos((prevRespuestas) => {
                                                                    const newRespuestas = [...prevRespuestas];
                                                                    newRespuestas[index + 8] = isChecked ? 1 : 0;
                                                                    return newRespuestas;
                                                                });
                                                            }}
                                                            className={`w-2/3`}
                                                        />
                                                    </div>
                                                    <div className={`col-10`}>
                                                        <div className={`p-0`}>
                                                            <div className={`${styles.cart_answer_test}`}>
                                                                {file.name} <strong>(opción {index + 1})</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    ))}
                                    <br/>
                                </div>
                                <br/>
                                <div className={`container-fluid`}>
                                    <div className={`row`}>
                                        <div className={`col-9 p-0`}>
                                            <div className={`flex justify-center`}>
                                                <div className={`w-100`}>
                                                    <Button text={`Limpiar imágenes`} bg_color={button.btn_white}
                                                            instruction={limpiarSelectedFiles3}></Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`col-3 flex justify-end self-center`}>
                                            <label htmlFor="myAnswersArea3"
                                                   className="custom-file-upload d-flex justify-center">
                                                <div className={`px-3 py-2 rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${button.btn_red} ${styles.btn_text} ${styles.btn_sticky}`}>
                                                    +
                                                </div>
                                            </label>
                                            <input
                                                type="file"
                                                id="myAnswersArea3"
                                                accept="image/*"
                                                onChange={handleFileChangeConcept3}
                                                style={{display: 'none'}} // Ocultar el input original
                                                multiple
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={`w-25`}>
                                <Button text={`Crear Pregunta`} bg_color={button.btn_red}
                                        instruction={handleUpload}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {tipoReconocimiento && (
                <div>
                    <InstructionBar confirmation={confirmGetBack}
                                    instruction={`Crea una pregunta`}
                                    information={showReconocimientoInstructions}
                                    info_color={button.btn_red}
                                    hiddenVoice={`hidden`}
                                    hiddenHome={`hidden`}/>
                    <div className={`container-fluid px-5`}>
                        <h4><label htmlFor="myTextarea">Nombre de la Pregunta</label></h4>
                        <textarea
                            id="myTextarea"
                            name="myTextarea"
                            value={textareaValue}
                            onChange={handleChange}
                            rows="1" // Puedes ajustar la cantidad de filas según tus necesidades
                            className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}
                        />
                        <br/> <br/>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <h4><label>Imágenes de Muestra</label></h4>
                                <div
                                    className={`border-1 border-black shadow-md rounded-2xl px-5 pt-4 bg-white ${styles.overflow_container_answers_semejanzas}`}>
                                    {imagenesMuestra.map((file, index) => (
                                        <div key={index}>
                                            <div className={`container-fluid`}>
                                                <div className={`row py-2 px-2 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}`}>
                                                    <div className={`col-8 py-1`}>
                                                        {file.name}
                                                    </div>
                                                    <div className={`col-3 self-center`}>
                                                        <strong>(muestra {index + 1}) </strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                                <br/>
                                <div className={`container-fluid`}>
                                    <div className={`row justify-content-evenly`}>
                                        <div className={`col-3 flex justify-center`}>
                                            <label htmlFor="myMuestraArea"
                                                   className="custom-file-upload d-flex justify-center">
                                                <div className={`px-3 py-2 text-white rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${button.btn_red} ${styles.btn_text}`}>
                                                    +
                                                </div>
                                            </label>
                                            <input
                                                type="file"
                                                id="myMuestraArea"
                                                accept="image/*"
                                                onChange={handleFileChangeMuestraReconocimiento}
                                                style={{display: 'none'}} // Ocultar el input original
                                                multiple
                                            />
                                        </div>
                                        <div className={`col-8`}>
                                            <div className={`flex justify-end`}>
                                                <div className={`w-75`}>
                                                    <Button text={`Limpiar Imágenes`}
                                                            instruction={limpiarImagenesMuestra}
                                                            bg_color={button.btn_white}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-6`}>
                                <h4><label>Opciones de Respuesta</label></h4>
                                <div
                                    className={`border-1 border-black shadow-md rounded-2xl px-5 pt-4 bg-white ${styles.overflow_container_answers_semejanzas}`}>
                                    {selectedFiles.map((file, index) => (
                                        <div key={index}>
                                            <div className={`container-fluid`}>
                                                <div className={`row py-2 px-2 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}`}>
                                                    <div className={`col-1 d-flex justify-content-end`}>
                                                        <input
                                                            type="checkbox"
                                                            name={`respuestaCorrecta_${index}`}
                                                            checked={correctAnswers[index] || false}
                                                            onChange={(e) => {
                                                                const isChecked = e.target.checked;
                                                                setCorrectAnswers((prevRespuestas) => ({
                                                                    ...prevRespuestas,
                                                                    [index]: isChecked,
                                                                }));
                                                            }}
                                                            className={`w-100`}
                                                        />
                                                    </div>
                                                    <div className={`col-8 py-1`}>
                                                        <div>{file.name}</div>
                                                    </div>
                                                    <div className={`col-3 self-center`}>
                                                        <strong>(opción {index + 1})</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                                <br/>
                                <div className={`container-fliud`}>
                                    <div className={`row justify-content-evenly`}>
                                        <div className={`col-3 flex justify-center`}>
                                            <label htmlFor="myAnswersArea"
                                                   className="custom-file-upload d-flex justify-center">
                                                <div className={`px-4 py-2 text-white rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${button.btn_red} ${styles.btn_text}`}>
                                                    +
                                                </div>
                                            </label>
                                            <input
                                                type="file"
                                                id="myAnswersArea"
                                                accept="image/*"
                                                onChange={handleFileChangeReconocimiento}
                                                style={{display: 'none'}} // Ocultar el input original
                                                multiple
                                            />
                                        </div>
                                        <div className={`col-8`}>
                                            <div className={`flex justify-end`}>
                                                <div className={`w-75`}>
                                                    <Button text={`Limpiar Imágenes`}
                                                            instruction={limpiarSelectedFiles}
                                                            bg_color={button.btn_white}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={`w-25`}>
                                <Button text={`Crear Pregunta`} bg_color={button.btn_red}
                                        instruction={handleUpload}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {tipoBusqueda && (
                <div>
                    <InstructionBar confirmation={confirmGetBack}
                                    instruction={`Crea una pregunta`}
                                    information={showBusquedaInstructions}
                                    info_color={button.btn_red}
                                    hiddenVoice={`hidden`}
                                    hiddenHome={`hidden`}/>
                    <div className={`container-fluid px-5`}>
                        <h4><label htmlFor="myTextarea">Pregunta</label></h4>
                        <textarea
                            id="myTextarea"
                            name="myTextarea"
                            value={textareaValue}
                            onChange={handleChange}
                            rows="1" // Puedes ajustar la cantidad de filas según tus necesidades
                            className={`w-100 border-1 border-black shadow-md rounded-2xl p-3`}
                        />
                        <br/> <br/>
                        <div className={`row`}>
                            <div className={`col-6`}>
                                <h4><label>Imagen de Muestra</label></h4>
                                <div
                                    className={`border-1 border-black shadow-md rounded-2xl px-5 pt-4 bg-white ${styles.overflow_container_samples_2}`}>
                                    {imagenesMuestra.map((file, index) => (
                                        <div key={index}>
                                            <div className={`container-fluid `}>
                                                <div className={`row py-2 px-2 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}`}>
                                                    <div className={`col-9 py-2`}>
                                                        {file.name}
                                                    </div>
                                                    <div className={`col-3 self-center`}>
                                                        <strong>(muestra {index + 1})</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                                <br/>
                                <div className={`container-fluid`}>
                                    <div className={`row justify-content-evenly`}>
                                        <div className={`col-3 flex justify-center`}>
                                            <label htmlFor="myMuestraArea"
                                                   className="custom-file-upload d-flex justify-center">
                                                <div className={`px-3 py-2 text-white rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${button.btn_red} ${styles.btn_text}`}>
                                                    +
                                                </div>
                                            </label>
                                            <input
                                                type="file"
                                                id="myMuestraArea"
                                                accept="image/*"
                                                onChange={handleFileChangeMuestraBusqueda}
                                                style={{display: 'none'}} // Ocultar el input original
                                                multiple
                                            />
                                        </div>
                                        <div className={`col-8`}>
                                            <div className={`flex justify-end`}>
                                                <div className={`w-75`}>
                                                    <Button text={`Limpiar Imágenes`}
                                                            instruction={limpiarImagenesMuestra}
                                                            bg_color={button.btn_white}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-6`}>
                                <h4><label>Opciones de Respuesta</label></h4>
                                <div
                                    className={`border-1 border-black shadow-md rounded-2xl px-5 pt-4 bg-white ${styles.overflow_container_answers_busqueda}`}>
                                    {selectedFiles.map((file, index) => (
                                        <div key={index}>
                                            <div className={`container-fluid `}>
                                                <div className={`row py-2 px-2 border-2 border-black border-opacity-10 shadow-md rounded-xl
                                ${styles.card_body_red}`}>
                                                    <div className={`col-1 d-flex justify-content-end`}>
                                                        <input
                                                            type="checkbox"
                                                            name={`respuestaCorrecta_${index}`}
                                                            checked={correctAnswers[index] || false}
                                                            onChange={(e) => {
                                                                const isChecked = e.target.checked;
                                                                setCorrectAnswers((prevRespuestas) => ({
                                                                    ...prevRespuestas,
                                                                    [index]: isChecked,
                                                                }));
                                                            }}
                                                            className={`w-100`}
                                                        />
                                                    </div>
                                                    <div className={`col-8 py-1`}>
                                                        <div>{file.name}</div>
                                                    </div>
                                                    <div className={`col-3 self-center`}>
                                                        <strong>(opción {index + 1})</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                        </div>
                                    ))}
                                </div>
                                <br/>
                                <div className={`container-fliud`}>
                                    <div className={`row justify-content-evenly`}>
                                        <div className={`col-3 flex justify-center`}>
                                            <label htmlFor="myAnswersArea"
                                                   className="custom-file-upload d-flex justify-center">
                                                <div className={`px-4 py-2 text-white rounded-3xl shadow-md font-bold
                    border-2 border-black border-opacity-10 ${button.btn_red} ${styles.btn_text}`}>
                                                    +
                                                </div>
                                            </label>
                                            <input
                                                type="file"
                                                id="myAnswersArea"
                                                accept="image/*"
                                                onChange={handleFileChangeBusqueda}
                                                style={{display: 'none'}} // Ocultar el input original
                                                multiple
                                            />
                                        </div>
                                        <div className={`col-8`}>
                                            <div className={`flex justify-end`}>
                                                <div className={`w-75`}>
                                                    <Button text={`Limpiar Imágenes`}
                                                            instruction={limpiarSelectedFiles}
                                                            bg_color={button.btn_white}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className={`flex justify-center`}>
                            <div className={`w-25`}>
                                <Button text={`Crear Pregunta`} bg_color={button.btn_red}
                                        instruction={handleUpload}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}