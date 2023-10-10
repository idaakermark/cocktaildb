import styles from './footer.module.scss'

const Footer = () => {
    return (
        <div className={styles.footer}>
            <p className={styles['footer__copyright']}>© Ida Åkermark</p>
        </div>
    )
}

export default Footer