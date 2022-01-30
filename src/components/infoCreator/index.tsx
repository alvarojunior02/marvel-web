/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image'
import styles from './styles.module.css'
import { baseURL, timestamp, publicKey, hash } from "../../config/consts";
import api from '../../services/api';
import LoaderIndicator from '../loaderIndicator';

type TypeCreatorProps = {
    thumbnail: {
        path: string,
        extension: string,
    },
    fullName: string,
    id: number,
    description: string,
    comics: {
        available: number,
        items: [
            name: string,
            resourceURI: string,
        ]   
    },
    events: {
        available: number;
    },
    series: {
        available: number,
    },
    stories: {
        available: number,
    }
    urls: [
        type: string,
        url: string,
    ]
}

type DataTye = {
    thumbnail: {
        path: string,
        extension: string,
    },
    title: string,
    name: string,
    id: number,
    description: string,
    resourceURI: string,
}

export default function InfoCreator(): JSX.Element {
    const [data, setData] = useState<TypeCreatorProps>();
    const [comics, setComics] = useState([]);
    const [events, setEvents] = useState([]);
    const [series, setSeries] = useState([]);
    const [imagemSrc, setImagemSrc] = useState('https://logosmarcas.net/wp-content/uploads/2020/11/Marvel-Logo.png');
    const [size, setSize] = useState([1366, 768]);
    const [backIdComic, setBackIdComic] = useState(-1);
    const [backIdEvent, setBackIdEvent] = useState(-1);
    const [backIdSerie, setBackIdSerie] = useState(-1);

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

    function getCreatorById(id: number) {
        try{
            api.get(`/creators/${id}`)
            .then(response => {    
                setData(response.data.data.results[0]);
            })
            .catch(
                error => console.log(error)
            )
        } catch (error) {
            console.log(error);
        }
    }

    function configureLink(item: DataTye) {
        const linkComic = item?.thumbnail?.path + '.' + item?.thumbnail?.extension;
        const linkSplit = linkComic.split('http');
        const rightLink = linkSplit[1];
        return ("https".concat(rightLink));
    }

    useEffect(() => {
        try {
            const idCreator= JSON.parse(localStorage?.getItem('id-creator') || '');
            getCreatorById(idCreator);
            //getComicsByCharacter(idCreator);
            //getEventsByCharacter(idCreator);
            //getSeriesByCharacter(idCreator);
            const idComic = JSON.parse(localStorage.getItem('back-id-comic') || '-1');
            setBackIdComic(idComic);
            const idEvent = JSON.parse(localStorage.getItem('back-id-event') || '-1');
            setBackIdEvent(idEvent);
            const idSerie = JSON.parse(localStorage.getItem('back-id-serie') || '-1');
            setBackIdSerie(idSerie);
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        setImagemSrc(data?.thumbnail?.path + '.' + data?.thumbnail?.extension);
    }, [data]);

    return (
        <>

            {
                !data ? (
                    <LoaderIndicator />
                ) : (
                    <>
                        <div className={size[0] > 720 ? styles.divHeader : styles.divHeaderResponsive}>
                            <header>
                                <h1>
                                    {data?.fullName}
                                </h1>
                            </header>
                        </div>
                        <div className={styles.container}>
                            <div className={styles.body}>
                                <div className={
                                    size[0] > 720 ?
                                        (
                                            styles.container
                                        )
                                    : 
                                        (
                                            styles.container2
                                        )
                                }>
                                    <div className={styles.containerImage}>
                                        <Image
                                            className={styles.image}
                                            loader={() => imagemSrc}
                                            unoptimized={true}
                                            src={imagemSrc} 
                                            alt={data?.fullName}
                                            height={400} 
                                            width={400}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*<h2 className={styles.textLists}>Comics: </h2>
                        <div className={comics?.length === 0 ? styles.containerComicsResponsive : styles.containerComics}>
                            <div className={styles.containerComicsList}>
                                {
                                    data?.comics?.available || -1 > 0 ?
                                        (   
                                            comics?.length === 0 ? (
                                                <LoaderIndicator />
                                            ) : (
                                                comics
                                                .map((item: DataTye, index: number) => {
                                                    return (
                                                        <>
                                                            <a 
                                                                key={index}
                                                                href="/?page=info-comic"
                                                                onClick={() => {
                                                                    localStorage.setItem('id-comic', JSON.stringify(item?.id));
                                                                    localStorage.setItem('back-id-character', JSON.stringify({idCharacter: data?.id, limit: 100}));
                                                                    localStorage.removeItem('id-character');
                                                                }}
                                                            >
                                                                <div className={styles.containerSingleComic}>
                                                                    <div className={styles.containerImage}>                                                  
                                                                        <img
                                                                            className={size[0] > 720 ? styles.imageComic : styles.imageComicResponsive}
                                                                            src={configureLink(item)} 
                                                                            width={200}
                                                                            height={300}
                                                                            alt={item?.title}  
                                                                        />
                                                                        <div className={styles.containerTitleComic}>
                                                                            <p className={styles.titleComic}>{item?.title}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </>
                                                    )
                                                })
                                            )
                                            
                                        )
                                    : (
                                        <h3>Nenhuma Encontrada...</h3>
                                    )
                                }
                            </div>
                        </div>
                        <h2 className={styles.textLists}>Eventos: </h2>
                        <div className={events?.length === 0 ? styles.containerComicsResponsive : styles.containerComics}>
                            <div className={styles.containerComicsList}>
                                {
                                    data?.events?.available || -1 > 0 ?
                                        (   
                                            events?.length === 0 ? (
                                                <LoaderIndicator />
                                            ) : (
                                                events
                                                .map((item: DataTye, index: number) => {
                                                    return (
                                                        <>
                                                            <a 
                                                                href="/?page=info-event"
                                                                key={index}
                                                                onClick={() => {
                                                                    localStorage.setItem('id-event', JSON.stringify(item?.id));
                                                                    localStorage.setItem('back-id-character', JSON.stringify({idCharacter: data?.id, limit: 100}));
                                                                    localStorage.removeItem('id-character');
                                                                    localStorage.removeItem('back-id-comic');
                                                                    
                                                                }}
                                                            >
                                                                <div className={styles.containerSingleComic}>
                                                                    <div className={styles.containerImage}>                                                  
                                                                        <img
                                                                            className={size[0] > 720 ? styles.imageComic : styles.imageComicResponsive}
                                                                            src={configureLink(item)} 
                                                                            width={200}
                                                                            height={300}
                                                                            alt={item?.title}
                                                                        />
                                                                        <div className={styles.containerTitleComic}>
                                                                            <p className={styles.titleComic}>{item?.title}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </>
                                                    )
                                                })
                                            )
                                            
                                        )
                                    : (
                                        <h3>Nenhum Encontrado...</h3>
                                    )
                                }
                            </div>
                        </div>
                        <h2 className={styles.textLists}>Series: </h2>
                        <div className={series?.length === 0 ? styles.containerComicsResponsive : styles.containerComics}>
                            <div className={styles.containerComicsList}>
                                {
                                    data?.series?.available || -1 > 0 ?
                                        (   
                                            series?.length === 0 ? (
                                                <LoaderIndicator />
                                            ) : (
                                                series
                                                .map((item: DataTye, index: number) => {
                                                    return (
                                                        <>
                                                            <a 
                                                                href="/?page=info-serie"
                                                                key={index}
                                                                onClick={() => {
                                                                    localStorage.setItem('id-serie', JSON.stringify(item?.id));
                                                                    localStorage.setItem('back-id-character', JSON.stringify({idCharacter: data?.id, limit: 100}));
                                                                    localStorage.removeItem('id-character');
                                                                }}
                                                            >
                                                                <div className={styles.containerSingleComic}>
                                                                    <div className={styles.containerImage}>                                                  
                                                                        <img
                                                                            className={size[0] > 720 ? styles.imageComic : styles.imageComicResponsive}
                                                                            src={configureLink(item)} 
                                                                            width={200}
                                                                            height={300}
                                                                            alt={item?.title}
                                                                        />
                                                                        <div className={styles.containerTitleComic}>
                                                                            <p className={styles.titleComic}>{item?.title}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </>
                                                    )
                                                })
                                            )
                                            
                                        )
                                    : (
                                        <h3>Nenhuma Encontrada...</h3>
                                    )
                                }
                            </div>
                        </div>*/}
                        <div className={styles.containerUrls}>
                            <h2>URLs Uteis: </h2>
                            {
                                data?.urls.length || -1 > 0 ?
                                    (
                                        data?.urls
                                            .map((item: any, index: any) => {
                                                return (
                                                    <>
                                                        <div key={index}>
                                                            <a target='_blank' href={item?.url}>
                                                                <p>{item?.type.toUpperCase()}</p>
                                                            </a>
                                                        </div>
                                                    </>    
                                                )
                                            })
                                    )
                                : null
                            }
                        </div>
                        <div className={styles.containerButtons}>
                            {
                                backIdComic !== -1 ? (
                                    <a href={`/?page=info-comic`}>
                                        <button
                                            className={styles.backButton}
                                            onClick={() => {
                                                localStorage.setItem('id-comic', JSON.stringify(backIdComic));
                                                localStorage.removeItem('back-id-comic');
                                                localStorage.removeItem('id-creator');
                                                localStorage.setItem('back-id-creator', JSON.stringify(data?.id));
                                            }}
                                        >
                                            <p>Voltar para a Comic</p>
                                        </button>
                                    </a>
                                ) : null
                            }
                            {
                                backIdEvent !== -1 ? (
                                    <a href={`/?page=info-event`}>
                                        <button
                                            className={styles.backButton}
                                            onClick={() => {
                                                localStorage.setItem('id-event', JSON.stringify(backIdEvent));
                                                localStorage.removeItem('back-id-event');
                                                localStorage.removeItem('id-creator');
                                                localStorage.setItem('back-id-creator', JSON.stringify(data?.id));
                                            }}
                                        >
                                            <p>Voltar para o Evento</p>
                                        </button>
                                    </a>
                                ) : null
                            }
                            {
                                backIdSerie !== -1 ? (
                                    <a href={`/?page=info-serie`}>
                                        <button
                                            className={styles.backButton}
                                            onClick={() => {
                                                localStorage.setItem('id-serie', JSON.stringify(backIdSerie));
                                                localStorage.removeItem('back-id-serie');
                                                localStorage.removeItem('id-creator');
                                                localStorage.setItem('back-id-creator', JSON.stringify(data?.id));
                                            }}
                                        >
                                            <p>Voltar para a Serie</p>
                                        </button>
                                    </a>
                                ) : null
                            }    
                            <a href={`/?page=creators`}>
                                <button
                                    className={styles.backButton}
                                    onClick={() => {
                                        localStorage.removeItem('link-comic');
                                        localStorage.removeItem('back--id-creator');
                                    }}
                                >
                                    <p>Voltar para Criadores</p>
                                </button>
                            </a>
                        </div>
                    </>
                )
            }
        </>
    )
}
