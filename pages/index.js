import Head from 'next/head';
import Sidebar from '../comps/Sidebar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Messenger Application</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Sidebar />
    </div>
  );
}
