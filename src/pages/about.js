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
        <h2>I’m a software engineer from Japan living and working in Brooklyn, New York.</h2>
      </header>
	    <p>I’m currently a senior backend engineer at <a href="https://qz.com">Quartz</a>, where I lead the design and development of the backend systems that drive the Quartz’s website and apps. This work includes the launch of <a href="https://qz.com/subscribe/">Quartz membership</a>, Quartz’s first paid subscription service, and the U.S. expansion of <a href="https://www.producthunt.com/posts/newspicks">NewsPicks</a>, Japan’s leading business news platform, which was later <a href="https://qz.com/1319054/quartz-sold-by-atlantic-media-to-uzabase-of-japan/">rebranded</a> and integrated into Quartz.</p>
      <p>Prior to coming to the news media industry, I was a backend engineer at <a href="https://www.gilt.jp/">Gilt</a>, a flash sale site specializing in luxury apparel, where I developed and maintained various user-facing e-commerce functionalities, and <a href="https://global.rakuten.com/corp/about/">Rakuten</a>, Japan’s largest e-commerce platform, where I was building an automated deployment systems for a large-scale, self-service, distributed search platform.</p>
      <p>You can also find me on <a href="https://twitter.com/tatsuyaoiw">Twitter</a>, <a href="https://instagram.com/tatsuyaoiw">Instagram</a> or <a href="https://www.linkedin.com/in/tatsuyaoiw">LinkedIn</a>.</p>
      <p><Link to="/projects">Here</Link> is a list of projects I have recently worked on, and <a href="https://github.com/tatsuyaoiw/resume/blob/master/resume-2021.pdf">here</a> is my latest resume.</p>
      {avatar && (<Image fluid={avatar} alt={author?.name || ``}/>)}
	  </Layout>
  )
}

export default AboutPage
