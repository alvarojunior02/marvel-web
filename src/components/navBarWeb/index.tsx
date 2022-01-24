/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-html-link-for-pages */
import { useLayoutEffect, useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image'

// images
import marvelLogo from '../../../public/images/marvel.png'
import iconeSuperhero from '../../../public/images/iconeSuperhero.png';
import iconeComics from '../../../public/images/iconeComics.png';

export default function Footer(): JSX.Element {
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
        <header className={styles.header}>
            <div className={styles.containerHeader}>
                { 
                    size[0] > 720 ? 
                    (
                        <div className={styles.containerImage}> 
                        <a
                            href='/'
                        >
                            <Image 
                                src={marvelLogo}
                                width="100vw"
                                height="50vh"
                            />
                        </a>
                            
                        </div>
                    ) : null
                }
                <div className={styles.navBar}>
                    <nav>
                        <a  
                            className={styles.navBarLink}
                            href='/?page=characters'
                        >
                            <Image 
                                src={iconeSuperhero}
                                width="40"
                                height="40"
                            />
                            <p>Personagens</p>
                        </a>
                        <a
                            className={styles.navBarLink}
                            href='/?page=comics'
                        >
                            <Image 
                                src={iconeComics}
                                width="40"
                                height="40"
                            />
                            <p>Comics</p>
                        </a>
                    </nav>
                </div>
            </div>
      </header>
    );
}