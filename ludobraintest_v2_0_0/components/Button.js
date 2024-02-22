import styles from "@/styles/styles.module.css";

export default function Button({text, bg_color, instruction}) {
    return (
        <div className={`w-100 bg-amber-50 rounded-3xl`}>
            <button onClick={instruction}
                    className={`px-5 py-2 rounded-3xl shadow-md font-bold w-100
                    border-2 border-black border-opacity-10 ${bg_color} ${styles.btn_text}`}>
                {text}
            </button>
        </div>
    )
}