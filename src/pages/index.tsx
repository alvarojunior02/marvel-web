/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect, useLayoutEffect } from 'react';
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import { parseCookies } from 'nookies';

// import components
import ContainerCharacters from '../components/containerCharacters';
import ContainerComics from '../components/containerComics';
import InfoCharacter from '../components/infoCharacter';
import InfoComic from '../components/infoComic';
import NavBarWeb from '../components/navBarWeb';
import Footer from '../components/footer';

// import images from paste public
import capa from '../../public/images/capa-alvaro.png';
import marvelLogo from '../../public/images/marvel-background.png';

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
    try {
      setNewData(JSON.parse(data));
    } catch(e) {
      console.log(e);
    }
  }, [])

  return (
    <div className={styles.container}>
      <NavBarWeb />
      <div className={styles.body}>
          {
            page === '' ?
              (
                <>
                  <h1 className={styles.textTitle}>Seja Bem-Vindo(a)</h1>
                  <p className={styles.textDescription}>
                    Essa aplicação foi criada com objetivo de aprimorar os conhecimentos do autor.
                  </p>
                  <p className={styles.textDescription}>
                    Tecnologias usadas: React, TypeScript, Next.
                  </p>
                  <p className={styles.textDescription}>
                    | Status da Aplicação: em desenvolvimento. |
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
            : page === 'info-character' ?
              (
                <InfoCharacter />
              )
            : page === 'comics' ?
              (
                <ContainerComics />
              )
            : page === 'info-comic' ?
              (
                <InfoComic />
              )
            : null
          }
      </div>
      <Footer />
    </div>
  )
}

export default Home
