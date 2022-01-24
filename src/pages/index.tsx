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
import gifComputer from '../../public/images/computer.gif'
import iconReact from '../../public/images/iconReact.png';
import iconTypescript from '../../public/images/iconTypescript.png';
import iconNext from '../../public/images/iconNext.png';

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
                    Site criado para estudos. Não é nada voltado ao mercado.
                  </p>
                  <p className={styles.textDescription}>
                    Tecnologias usadas:
                  </p>
                  <div 
                    style={size[0] > 720 ? {width: '300px'} : {width: '90%'}}
                    className={styles.containerImages}
                  > 
                    <a target="_blank" href="https://pt-br.reactjs.org/" rel="noreferrer">
                      <Image
                        src={iconReact}
                        width={40}
                        height={40}
                      />
                    </a>
                    <a target="_blank" href="https://www.typescriptlang.org/" rel="noreferrer">
                      <Image
                        src={iconTypescript}
                        width={40}
                        height={40}
                      />
                    </a>
                    <a target="_blank" href="https://nextjs.org/" rel="noreferrer">
                      <Image
                        src={iconNext}
                        width={40}
                        height={40}
                      />
                    </a>
                  </div>
                  <p className={styles.textDescription}>
                    Status do Site: em desenvolvimento
                    <Image
                      className={styles.gifComputer} 
                      src={gifComputer}
                      width={40}
                      height={40}
                    />
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
