/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect, useLayoutEffect } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import marvelLogo from '../../public/images/marvel-background.png';

const Home: NextPage = () => {
  const [size, setSize] = useState([1366, 768]);

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
    setSize([
      window.innerWidth, window.innerHeight
    ]);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.containerHeader}>
          { 
            size[0] > 720 ? 
              (
                <div className={styles.containerImage}> 
                  <Image 
                    src={marvelLogo}
                    width="100vw"
                    height="50vh"
                  />
                </div>
              ) : null
          }
          <div className={styles.containerTitulo}>
            <h1 className={styles.titulo}>Consumindo API da Marvel na Web</h1>
          </div>
        </div>
      </header>
      <br/>
      <div className={styles.body}>
          
      </div>
    </div>
  )
}

export default Home
