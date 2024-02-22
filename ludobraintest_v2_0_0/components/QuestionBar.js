import styles from '@/styles/styles.module.css'
import button from '@/styles/button.module.css'
import Image from 'next/image'

export default function QuestionBar({
                                        confirmGetBack,
                                        nombreTest,
                                        labelColor,
                                        voiceCommand,
                                        hiddenVoice,
                                        silenceCommand
                                    }) {
    return (
        <div className={`container-fluid flex flex-col h-100`}>
            <div className={`pt-sm-1 pt-md-2 pt-lg-0 flex justify-center text-decoration-none`}>
                <button onClick={confirmGetBack} className={`bg-black text-white rounded-full px-2 py-0 font-bold drop-shadow-lg 
                        border-2 border-opacity-100 ${button.btn_back_arrow}`}>
                    <h2>←</h2>
                </button>
            </div>
            <div className={`flex justify-center`}>
                <h5 className={`${styles.back}`}>
                    Regresar
                </h5>
            </div>
            <div className={`flex justify-center h-75`}>
                <div className={`flex self-end`}>
                    <h3 className={labelColor}>
                        {nombreTest}
                    </h3>
                </div>
            </div>
            <div className={`flex justify-center h-75`}>
                <div className={`flex self-end`}>
                    <Image src="/images/asistente-de-robot.png"
                           alt="Mini Echo"
                           className={`${styles.echo_logo_qb}`}
                           width={100} height={100}/>
                </div>
            </div>
            <div className={`flex justify-center h-75`}>
                <div className={`flex self-start`}>
                    <button onClick={voiceCommand}
                            className={`me-2 border-2 border-black border-opacity-25 flex h-fit rounded-full px-1 py-1 ${button.btn_speak} 
                    self-center ${hiddenVoice}`}>
                        <div className={`text-xl p-0`}>🔊</div>
                        {/*<h2>🗣️</h2>*/}
                    </button>
                    <button onClick={silenceCommand}
                            className={`mx-2 border-2 border-black border-opacity-25 flex h-fit rounded-full px-1 py-1 ${button.btn_silence} 
                    self-center ${hiddenVoice}`}>
                        <div className={`text-xl p-0`}>🔇</div>
                    </button>
                </div>
            </div>
        </div>
    )
}