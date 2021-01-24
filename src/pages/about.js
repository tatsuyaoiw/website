import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query AboutQuery {
      avatar: file(absolutePath: { regex: "/profile-pic-full.jpg/" }) {
        childImageSharp {
          fluid(quality: 95) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
          }
          title
		    }
      }
    }
  `)

  const siteTitle = data.site.siteMetadata.title
  const author = data.site.siteMetadata?.author
  
  const avatar = data?.avatar?.childImageSharp?.fluid
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About" />
      <header>
        <h1>Hi there, I’m Tatsuya <span role="img" aria-label="wave">👋</span></h1>
        <h2>Software engineer based in Brooklyn. Originally from Japan. Raising two little girls.</h2>
      </header>
	    <p>I’m a senior backend engineer at <a href="https://qz.com">Quartz</a>, where I lead the design and development of the backend systems that drive the Quartz’s website and apps. This work includes the launch of <a href="https://qz.com/subscribe/">Quartz membership</a>, Quartz’s first paid subscription service, and the U.S. expansion of <a href="https://www.producthunt.com/posts/newspicks">NewsPicks</a>, Japan’s leading business news platform, which was later <a href="https://qz.com/1319054/quartz-sold-by-atlantic-media-to-uzabase-of-japan/">acquired</a> by Quartz.</p>
      <p>Prior to coming to the news industry, I worked for e-commerce companies of various sizes. These includes <a href="https://global.rakuten.com/corp/about/">Rakuten</a>, Japan's largest e-commerce platform, and <a href="https://www.gilt.jp/">Gilt</a>, a luxury apparel flash sale site, where I focused on developing and maintaining the backend and infrastructure for product search, inventory management, and payment. <Link to="/projects">Here</Link> is a list of projects I have recently worked on.</p>
      <p>You can also find me on <a href="https://twitter.com/tatsuyaoiw">Twitter</a>, <a href="https://instagram.com/tatsuyaoiw">Instagram</a> or <a href="https://www.linkedin.com/in/tatsuyaoiw">LinkedIn</a>.</p>
      <p>Are you interested in working with me? Please also check out my <a href="https://github.com/tatsuyaoiw/resume/blob/master/resume-2021.pdf">resume</a>.</p>
      {avatar && (<Image fluid={avatar} alt={author?.name || ``}/>)}
	  </Layout>
  )
}

export default AboutPage
