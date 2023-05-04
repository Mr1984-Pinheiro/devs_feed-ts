import { ThumbsUp, Trash } from "phosphor-react"
import styles from "./Comment.module.css"
import { Avatar } from "./Avatar"
import { useState } from "react";

interface CommentProps {
    content: string;
    deleteFeedback: (coment: string) => void;
}

export function Comment({ content, deleteFeedback }: CommentProps) {
    const [likeCount, setLikeCout] = useState(0);

    function handleDeleteFeedback() {
        deleteFeedback(content);
    }

    function handleLikeComment() {
        setLikeCout((state) => {
            return state + 1
        });
    }

    return(
        <div className={styles.comment}>
                <div className={styles.commentAvatar}>
                    <Avatar 
                        hasBorder={false} 
                        src="https://github.com/maykbrito.png"
                        alt=""
                    />
                </div>
                <div className={styles.commentBox}>
                    <div className={styles.commentContent}>
                        <header>
                            <div className={styles.authorAndTime}>
                                <strong>Carlos Pinheiro</strong>
                                <time 
                                    title="26 de Abril às 11:17h" 
                                    dateTime="2023-04-26 12:17:00"
                                >
                                    Cerca de 1h atrás
                                </time>
                            </div>

                            <button onClick={handleDeleteFeedback} title="Excluir comentario">
                                <Trash size={24} />
                            </button>                            
                        </header>

                        <p>{content}</p>
                    </div>

                    <footer>
                        <button onClick={handleLikeComment}>
                            <ThumbsUp />
                            Aplaudir <span>{likeCount}</span>
                        </button>
                    </footer>
                </div>
        </div>
    )
}