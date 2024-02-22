import Login from "@/pages/login";
import styles from "@/styles/styles.module.css";

export default function Home() {
    return (
        <main className={`min-h-screen bg-amber-50 ${styles.bg_robot_image}`}>
            <Login></Login>
        </main>
    )
}
