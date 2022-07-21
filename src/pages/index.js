import Head from 'next/head'
import { Intro, About, Featured, Projects, Contact, Layout } from '@components'

export default function Home({ data }) {
    return (
        <div>
            <Head>
                <title>MikeJayne.com</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
            </Head>
            <Layout>
                <Intro />
                <About />
                <Featured />
                <Projects />
                <Contact />
            </Layout>
        </div>
    )
}
