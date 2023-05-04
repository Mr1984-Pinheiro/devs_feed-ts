import { PencilLine } from "phosphor-react"
import styles from "./Sidebar.module.css"
import { Avatar } from "./Avatar"

export function Sidebar() {
    return(
        <aside className={styles.sidebar}>
            <img className={styles.cover} src="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50" />

            <div className={styles.profile}>
                <Avatar src="https://github.com/Mr1984-Pinheiro.png" />    

                <strong>Carlos Pinheiro</strong>
                <span>Web Developer</span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine />
                    Editar seu perfil
                </a>
            </footer>
        </aside>
    )
}