/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link';
import { useLayoutEffect, useState } from 'react';
import styles from './styles.module.css';

export default function NavBarWeb(): JSX.Element {
    const [size, setSize] = useState([0, 0]);

    function useWindowSize() {
        useLayoutEffect(() => {
            function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
    }

    useWindowSize();

    return (
        <footer className={styles.footer}>
            <div className={styles.containerContacts}>   
                <span>
                    <Link href="https://www.linkedin.com/in/alvaro-junior-831299183/">
                    <a target="_blank">
                        LinkedIn
                    </a>
                    </Link>
                </span>
                <span>
                    <Link href="https://github.com/alvarojunior02/">
                    <a target="_blank">
                        GitHub
                    </a>
                    </Link>
                </span>
                <span>
                    <Link href="https://developer.marvel.com/">
                    <a target="_blank">
                        Marvel API
                    </a>
                    </Link>
                </span>
            </div>
            <p className={styles.textCopyright}>© 2022 Copyright - Alvaro Junior</p>
        </footer>
    );
}