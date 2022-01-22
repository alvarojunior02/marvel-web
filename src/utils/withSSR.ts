import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies';

export function withSSRAuthenticated<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const { 'data-character': data } = parseCookies(ctx);
    console.log("1: " + data);

    if (!data) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return fn(ctx);
  };
}

export function withSSRUnauthenticated<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const { 'data-character': data } = parseCookies(ctx);
    console.log("2: " + data);

    if (data) {
      return {
        redirect: {
          destination: '/character-infos',
          permanent: false,
        },
      };
    }

    return fn(ctx);
  };
}
