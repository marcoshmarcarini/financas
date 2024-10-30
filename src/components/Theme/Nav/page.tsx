import Link from 'next/link'
import styles from './Nav.module.css'
import Image from 'next/image'

export default function Nav() {
    return (
        <div className={styles.content}>
            <div className={styles.navBrand}>
                <Link href={`/`}>
                    <Image
                        src={`https://img.icons8.com/ios-filled/50/ffffff/money-box--v1.png`}
                        width={50}
                        height={50}
                        alt='money-box--v1'
                    />
                </Link>
            </div>
            <nav className={styles.navMenu}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link href={`/`}>Home</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href={`/login`}>Login</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href={`/login/register`}>Cadastro</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}