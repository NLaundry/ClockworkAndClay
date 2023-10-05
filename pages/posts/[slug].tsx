import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import markdownToHtml from '../../lib/markdownToHtml'
import type PostType from '../../interfaces/post'
import { useEffect, useState } from 'react';
import Chat from '../../components/LLMChat';


type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

export default function Post({ post, morePosts, preview }: Props) {
  const router = useRouter()
  const title = `${post.title}`
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  const [currentSection, setCurrentSection] = useState<number>(0);


  return (
    <Layout preview={preview}>
      <div className="my-32">
        <Head>
          <title>{title}</title>
          <meta property="og:image" content={post.ogImage.url} />
        </Head>
        <PostBody content={post.content[currentSection]} />

        <Chat poemText={post.content[currentSection]} />

        <div className='flex-row flex justify-between mx-48 my-16'>
          <h3 className={`text-2xl font-bold p-2 border-2 rounded-md ${currentSection === 0 ? 'text-stone-400 cursor-default border-stone-400' : 'text-red-700 border-red-700 cursor-pointer hover:bg-red-700 hover:text-stone-100'}`}>
            <a onClick={() => currentSection > 0 && setCurrentSection(currentSection - 1)}>prev</a>
          </h3>
          <h3 className={`text-2xl font-bold p-2 border-2 rounded-md ${currentSection === post.content.length - 1 ? 'text-stone-400 cursor-default border-stone-400' : 'text-red-700 border-red-700 cursor-pointer hover:bg-red-700 hover:text-stone-100'}`}>
            <a onClick={() => currentSection < post.content.length - 1 && setCurrentSection(currentSection + 1)}>next</a>
          </h3>
        </div>


      </div>
    </Layout>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])

  const sections = post.content.split(/(?=#)/); // split markdown by <h1> but keep the delimiter
  const contentSections = await Promise.all(sections.map(section => markdownToHtml(section)));

  return {
    props: {
      post: {
        ...post,
        content: contentSections,
      },
    },
  }
}


export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
