import React from "react"
import { useStaticQuery, graphql } from "gatsby"
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
        <h2>Senior Developer at Shopify <span role="img" aria-label="shopping_bags">🛍️</span> Raising two little girls in Toronto <span role="img" aria-label="canada">🇨🇦</span> Originally from Japan <span role="img" aria-label="japan">🇯🇵</span></h2>
      </header>

      <p>Tatsuya Oiwa is a software developer living in Toronto. He is a Senior Developer at <a href="https://www.shopify.com">Shopify</a>, where he works on things to <a href="https://www.shopify.com/careers/culture">make commerce better for everyone</a>. Like other Shopify folks around the world, he is currently working remotely from home. When he is not working, he enjoys Toronto’s chilly weather and diverse dining scene with his family.</p>

      <p>Prior to coming to Toronto, Tatsuya lived in New York and worked at <a href="https://qz.com">Quartz</a>, a digital global business news publication. There he led the design and development of backend systems that drive Quartz’s paid subscription and email services. He built and grew the product over two years, helping it reach 27,000 paying members. He also joined his former company, <a href="https://www.producthunt.com/posts/newspicks">NewsPicks</a>, Japan’s leading business news platform, in launching its business in the US market, which was later acquired by and rebranded as Quartz.</p>

      <p>Tatsuya also worked for several large to small e-commerce companies in Tokyo. Those include <a href="https://global.rakuten.com/corp/about/">Rakuten</a>, Japan's largest e-commerce platform, and <a href="https://www.gilt.jp/">Gilt</a>, a luxury apparel flash sale site. There he was involved in and learned all stages of the software development lifecycle from design and development to release and maintenance. He worked on numerous products and projects including self-service deployment and monitoring of a large scale distributed search platform, internal frontend tools for A/B testing search relevance, performance analysis and tuning of backend servers under high volume traffic, and refactoring and data migration of legacy applications and storage systems.</p>

      <p>Tatsuya specializes in solving problems in a way that minimizes risk and maximizes value. He turns problems over and over in his mind until he finds an elegant solution that seemed impossible from the outset. He is a highly motivated team player, always willing to set aside his own work to help others who are struggling or to walk them through something that they find complicated or intimidating. He brings enthusiasm to everything he does with his incessant intellectual curiosity.</p>

      <p>Growing up in a <a href="https://en.wikipedia.org/wiki/Taketoyo">small waterfront town in Japan</a>, he moved across the Pacific Ocean to where he is today. His next life goal is to live and work on as many continents as possible.</p>

      <p>You can find me on <a href="https://twitter.com/tatsuyaoiw">Twitter</a>, <a href="https://instagram.com/tatsuyaoiw">Instagram</a> or <a href="https://www.linkedin.com/in/tatsuyaoiw">LinkedIn</a>. Here's my <a href="https://github.com/tatsuyaoiw/resume/blob/master/resume-2021.pdf">resume</a>.</p>

      {avatar && (<Image fluid={avatar} alt={author?.name || ``}/>)}
	  </Layout>
  )
}

export default AboutPage
