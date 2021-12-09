import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spotify Clone</title>
    
      </Head>

      <main className="bg-black h-screen overflow-hidden">
        <Sidebar/>
      </main>


    </div>
  )
}
