/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect, useLayoutEffect } from 'react';
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link';
import styles from '../styles/CharacterInfos.module.css'
import marvelLogo from '../../public/images/marvel-background.png';
import LoaderIndicator from '../components/loaderIndicator';
import { withSSRAuthenticated } from '../utils/withSSR';

export const getServerSideProps = withSSRAuthenticated(async () => ({
  props: {},
}));

const CharacterInfos: NextPage = () => {

    const [size, setSize] = useState([1366, 768]);
    const [data, setData] = useState(null);
    const [imagemSrc, setImagemSrc] = useState('');

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

    useEffect(() => {        
        setData(JSON.parse(sessionStorage?.getItem('data-character')));
        setImagemSrc(data?.thumbnail?.path + '.' + data?.thumbnail?.extension);
        console.log(imagemSrc);
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.containerHeader}>
                    { 
                        size[0] > 720 ? 
                        (
                            <div className={styles.containerImage}> 
                            <a href='/'>
                                <Image 
                                src={marvelLogo}
                                width="100vw"
                                height="50vh"
                                />
                            </a>
                                
                            </div>
                        ) : null
                    }
                </div>
            </header>
            <div className={styles.body}>
                {}
                {
                    data === null ? 
                        (
                            <LoaderIndicator />
                        )
                    :
                        (
                            <Image
                                loader={() => {data.thumbnail.path + '.' + data.thumbnail.extension}}
                                src={data.thumbnail.path + '.' + data.thumbnail.extension} 
                                alt={data.name}
                                height={300} 
                                width={300}
                            />
                        )
                }
            </div>
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
        </div>
    )
}

export default CharacterInfos;
