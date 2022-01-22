/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect, useLayoutEffect } from 'react';
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import marvelLogo from '../../public/images/marvel-background.png';
import ContainerCharacters from '../components/containerCharacters';
import InfoCharacter from '../components/infoCharacter'
import { parseCookies } from 'nookies';

type DataProps = {
  thumbnail: {
      path: string,
      extension: string,
  },
  name: string,
  id: number,
  description: string,
}

const Home: NextPage = () => {
  const [size, setSize] = useState([1366, 768]);
  const [page, setPage] = useState('');
  const [newData, setNewData] = useState<DataProps>();

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
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('page') || '';
    setPage(myParam);

    const { 'data-character': data } = parseCookies();
    setNewData(JSON.parse(data));
  }, [])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.containerHeader}>
          { 
            size[0] > 720 ? 
              (
                <div className={styles.containerImage}> 
                  <a
                    href='/'
                    onClick={() => {
                      if (page !== '') {
                        setPage('');
                      }
                    }}
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
                href='/?page=characters'
              >
                <p>Personagens</p>
              </a>
            </nav>
          </div>
        </div>
      </header>
      <div className={styles.body}>
          {
            page === '' ?
              (
                <>
                  <h1 className={styles.textTitle}>Seja Bem-Vindo</h1>
                  <p className={styles.textDescription}>
                    Essa aplicação foi criada com objetivo de aprimorar os conhecimentos do autor.
                  </p>
                  <p className={styles.textDescription}>
                    Tecnologias usadas: React, TypeScript, Next.
                  </p>
                  <p className={styles.textDescription}>
                    Para iniciar, clique em alguma opção na barra acima.
                  </p>
                </>
              )
            : page === 'characters' ?
              (
                <ContainerCharacters />
              )
            : page === 'info-characters' ?
             (
              <InfoCharacter />
             )
            : null
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

export default Home
