import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styles  from './layout.module.css';
import { useSelector } from 'react-redux';
import { UserState, InitialHostState } from '../store/reducer';

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const user:UserState = useSelector(
    (state: InitialHostState) => state.user);  

   return (
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <header className={styles.header}>
          <div>
            <h1>{user?.name}</h1>
          </div>
          <nav className={styles.navigation}>
            <Link href="/">
              <a className={styles.title}>Home</a>
            </Link>{' '}
            |{' '}
            <Link href="/about">
              <a className={styles.title}>About</a>
            </Link>
          </nav>
        </header>
        {children}
        <footer className={styles.footer}>
          <hr />
          <span>I'm here to stay (Footer)</span>
        </footer>
    </div>
   );
}

export default Layout