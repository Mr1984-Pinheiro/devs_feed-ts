import style from './Header.module.css'

export function Header() {
    return(
        <>
        <header className={style.header}>
           <img src="https://cdn-icons-png.flaticon.com/128/9534/9534734.png" alt="feed-icon" /> 
           <span>Devs feed</span> 
            
        </header>
        </>
    )
}