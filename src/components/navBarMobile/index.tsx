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

export default function NavBarMobile(): JSX.Element {
    const [size, setSize] = useState([0, 0]);
    const iconWidth = 30;
    const iconHeight = 30;

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
                            width="50"
                            height="35"
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
                                localStorage.removeItem('back-id-creator');
                            }}
                        >
                            <Image 
                                src={iconSuperhero2}
                                width={iconWidth}
                                height={iconHeight}
                                alt="Icon"
                            />
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
                                width={iconWidth}
                                height={iconHeight}
                                alt="Icon"
                            />
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
                                width={iconWidth}
                                height={iconHeight}
                                alt="Icon"
                            />
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
                                width={iconWidth}
                                height={iconHeight}
                                alt="Icon"
                            />
                        </a>
                    </nav>
                </div>
            </div>
      </header>
    );
}