import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllPosts } from '@/lib/blog'
import ConsultationCTA from '@/components/ConsultationCTA'
import { ArrowLeft, Clock, Tag } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: 'Article Not Found' }
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <>
      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-16 px-6 bg-shadow">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sand/60 text-xs tracking-[0.1em] uppercase hover:text-sand transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Resources
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <Tag className="w-3.5 h-3.5 text-sunset" />
            <span className="text-sunset text-[10px] tracking-[0.25em] uppercase font-medium">
              {post.category}
            </span>
            <span className="text-offwhite/20">·</span>
            <div className="flex items-center gap-1.5 text-offwhite/40 text-xs">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </div>
          </div>

          <h1 className="font-serif text-display-lg text-offwhite mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-sand text-lg leading-relaxed">
            {post.excerpt}
          </p>

          <div className="mt-6 text-sand/40 text-xs tracking-[0.1em] uppercase">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY ───────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-offwhite">
        <div className="max-w-3xl mx-auto">
          <article className="
            prose max-w-none
            prose-headings:font-serif prose-headings:text-shadow prose-headings:font-normal
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-shadow/70 prose-p:text-base prose-p:leading-[1.85]
            prose-strong:text-earth prose-strong:font-semibold
            prose-a:text-clay prose-a:underline hover:prose-a:text-sunset
            prose-ul:text-shadow/70 prose-li:leading-relaxed
            prose-blockquote:border-l-sunset prose-blockquote:border-l-2 prose-blockquote:pl-6 prose-blockquote:not-italic
            prose-blockquote:text-earth prose-blockquote:font-serif prose-blockquote:text-xl
            prose-hr:border-sand/40
          ">
            <MDXRemote source={post.content} />
          </article>
        </div>
      </section>

      {/* ── MORE ARTICLES ──────────────────────────────────────────────── */}
      <section className="py-12 px-6 bg-offwhite border-t border-sand/40">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-earth font-medium text-sm hover:text-sunset transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Articles
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-earth text-offwhite font-medium text-sm tracking-[0.08em] uppercase px-6 py-3 hover:bg-sunset hover:text-shadow transition-colors"
          >
            Schedule Consultation
          </Link>
        </div>
      </section>

      <ConsultationCTA
        headline="Ready to put this into practice?"
        subtext="Craig can walk you through exactly how these principles apply to your specific property."
      />
    </>
  )
}
