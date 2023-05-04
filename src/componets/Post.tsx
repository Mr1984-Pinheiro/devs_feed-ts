import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, InvalidEvent, useState, KeyboardEvent } from 'react';

import { Avatar } from "./Avatar"
import { Comment } from "./Comment"
import styles from "./Post.module.css"

interface Author {
    avatarUrl: string;
    name: string;
    role: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

export interface PostType {
    author: Author;
    publishedAt: Date;
    content: Content[];
    id: number;
}

interface PostProps {
    post: PostType;
}


export function Post({ post }: PostProps) {
    const [comments, setComments] = useState([
        'Post muito bacana, hein?!'
      ]);

    const [newCommentText, setNewCommentText] = useState('');

    const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
      locale: ptBR,
    });
  
    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
      locale: ptBR,
      addSuffix: true
    });

    function handleCrateNewComment(event: FormEvent) {
        event.preventDefault()
    
        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo não pode estar vazio');
    }

    
    function handleHotKeySubmit(event: KeyboardEvent) {
        if(event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
            setComments([...comments, newCommentText]);
            setNewCommentText('');
        }
    }

    function deleteFeedback(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete;
          })
      
          setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0;

    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time 
                    title={publishedDateFormatted} 
                    dateTime={post.publishedAt.toISOString()}
                    >
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
            {post.content.map(line => {                
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === 'link') {
            return <p key={line.content}><a href="#">{line.content}</a></p>
          }
        })}</div>

            <form onSubmit={handleCrateNewComment} className= {styles.feedbackForm}>
                <strong>Deixe seu feedback</strong>
                <textarea
                    name="comment"
                    placeholder="Deixe um comentário"
                    value={newCommentText}
                    onKeyDown={handleHotKeySubmit}
                    onChange={handleNewCommentChange}
                    required
                    onInvalid={handleNewCommentInvalid}
                />

                <footer>
                <button type="submit" disabled={isNewCommentEmpty} >Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
            {comments.map(comment => {
                return (
                <Comment 
                    key={comment} 
                    content={comment} 
                    deleteFeedback={deleteFeedback}
                />)
            })}
            </div>
        </article>
    )
}