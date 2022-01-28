/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-html-link-for-pages */
import { useLayoutEffect, useState } from 'react';
import styles from './styles.module.css';
import Image from 'next/image'

// images
import marvelLogo from '../../../public/images/marvel.png'
import iconSuperhero2 from '../../../public/images/iconSuperhero.png';
import iconComics from '../../../public/images/iconComics.png';
import iconEvents from '../../../public/images/iconEvents.png';
import iconCreators from '../../../public/images/iconCreators.png';

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
        <header className={styles.header}>
            <div className={styles.containerHeader}>
                <div className={styles.containerImage}> 
                    <a
                        href='/'
                    >
                        <Image 
                            src={marvelLogo}
                            width="120px"
                            height="80px"
                            alt='Logo Marvel'
                        />
                    </a>
                </div>
                <div className={styles.navBar}>
                    <nav>
                        <a  
                            className={styles.navBarLink}
                            href='/?page=characters'
                            onClick={() => {
                                localStorage.removeItem('back-id-comic');
                                localStorage.removeItem('back-id-character');
                                localStorage.removeItem('back-id-event');
                            }}
                        >
                            <Image 
                                src={iconSuperhero2}
                                width="40"
                                height="40"
                                alt="Icon"
                            />
                            <p>Personagens</p>
                        </a>
                        <a
                            className={styles.navBarLink}
                            href='/?page=comics'
                            onClick={() => {
                                localStorage.removeItem('back-id-comic');
                                localStorage.removeItem('back-id-character');
                                localStorage.removeItem('back-id-event');
                                localStorage.removeItem('back-id-creator');
                            }}
                        >
                            <Image 
                                src={iconComics}
                                width="40"
                                height="40"
                                alt="Icon"
                            />
                            <p>Comics</p>
                        </a>
                        <a
                            className={styles.navBarLink}
                            href='/?page=events'
                            onClick={() => {
                                localStorage.removeItem('back-id-comic');
                                localStorage.removeItem('back-id-character');
                                localStorage.removeItem('back-id-event');
                                localStorage.removeItem('back-id-creator');
                            }}
                        >
                            <Image 
                                src={iconEvents}
                                width="40"
                                height="40"
                                alt="Icon"
                            />
                            <p>Eventos</p>
                        </a>
                        <a
                            className={styles.navBarLink}
                            href='/?page=creators'
                            onClick={() => {
                                localStorage.removeItem('back-id-comic');
                                localStorage.removeItem('back-id-character');
                                localStorage.removeItem('back-id-event');
                                localStorage.removeItem('back-id-creator');
                            }}
                        >
                            <Image 
                                src={iconCreators}
                                width="40"
                                height="40"
                                alt="Icon"
                            />
                            <p>Criadores</p>
                        </a>
                    </nav>
                </div>
            </div>
      </header>
    );
}