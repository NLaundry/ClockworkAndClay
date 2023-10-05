import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../interfaces/author'

type Props = {
    title: string
    coverImage: string
    date: string
    excerpt: string
    author: Author
    slug: string
}

const HeroPost = ({
    title,
    coverImage,
    date,
    excerpt,
    author,
    slug,
}: Props) => {
    return (
        <section className="my-16 p-8 bg-white drop-shadow-md rounded-md ">
            <div className="mb-16 ">
                <h3 className="font-bold text-stone-800 mb-4 text-5xl lg:text-6xl leading-tight">
                    <Link as={`/posts/${slug}`} href="/posts/[slug]" className="hover:underline">
                        {title}
                    </Link>
                </h3>
                <div className="mb-4 md:mb-8 text-sm text-stone-600">
                    <DateFormatter dateString={date} />
                </div>
                <p className="text-stone-700 text-lg leading-relaxed mb-8">{excerpt}</p>
                <Avatar name={author.name} picture={author.picture} />
            </div>

            <div className="mb-8 md:mb-16">
                <CoverImage title={title} src={coverImage} slug={slug} />
            </div>
        </section>
    )
}

export default HeroPost
