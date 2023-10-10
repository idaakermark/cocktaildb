import styles from './header.module.scss'

const Header = () => {
    return (
        <div className={styles.header}>
            <h1 className={styles['header__title']}>Cocktails</h1>
            <p className={styles['header__subtitle']}>Sippin' on serendipity, one random cocktail at a time!</p>
        </div>
    )
}

export default Header