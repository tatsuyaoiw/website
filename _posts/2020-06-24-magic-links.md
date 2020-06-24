---
layout: post
title: Implementing Passwordless Login with Magic Links
date: 2020-06-24 00:52
published: true
image: /assets/images/2020-06-23-magic-links.png
author: Tatsuya Oiwa
tags: [English]
---

When creating a login feature on a website, a typical implementaion is to have a form with  a username and password, or to integrate with external platforms such as Google and Facebook using [OAuth](https://oauth.net/) authentication mechanism.

There is also an alternative way to do it, that is, **Passwordless Login**. Passwordless login is, as the name suggests, a method allowing the user to login without entering their password. For example, a website can send an email or SMS with a verification code to the user to let them logged in.

A unique implementation of passwordless login is **Magic Links**. If you have ever used services like Slack or Medium, you may have seen those magic links. Instead of sending a verification code like the one above, magic links are sent and when the user clicks on the link, the user is automatically logged in. From a UX perspective, it's really **magical**.
~
In this article, I'm going to discuss two of the (probably) most popular implementations of magic links that I've considered in my recent work.

## Stateful Implementation

The first is a stateful implementation, in which the server generates a random string of characters as an authentication token, which is then stored in a server-side data store to enable token verification. The actual flow is as follows.

1. *User*: Press the send button on the magic link.
2. *Server* : Generate a random string token upon receiving the request from the user and store it in the data store with an expiration date. Included the generated token in the URL of the magic link and email it to the user.
3. *User* : Click on the magic link in the email.
4. *Server*: Check the token and if it's valid, the authenticated status is returned to the user.

## Stateless Implementation

The other is a stateless implementation using signed tokens.

1. *User*: Press the send button on the magic link.
2. *Server* : Generate a signed authentication token upon receiving the request from the user. Include the generated token in the URL of the magic link and email it to the user.
3. *User*: Click on the magic link from the email.
4. *Server*: Verify the signature of the token contained in the magic link, and if it's valid, the authenticated status is returned to the user.

The difference between the stateful implementation and the stateless implementation is that the #2 token generation part and the #4 token validation part. In a stateful implementation, the server maintains the information needed to match and verify each generated token. On the other hand, in a stateless implementation, the user information is included in the token string and by verifying the signature of the tokens the server can provider the same functionality as a stateful implementation does. An example of a token implementation to achieve a stateless implementation is [JSON Web Token (JWT)](https://jwt.io/).

## Advantages and Disadvantages

A stateful implementation has the advantages of simpler logic, greater flexibility in token strings, and the ability to revoke issued tokens (if necessary). On the other hand, the additional complexity of the system due to the need for a datastore and potentially causing scalability problemsin the case of handling a large number of requests are disadvantages.

A stateless implementation simplifies the system as it does not require a data storeand sppeds up token generation and verification. On the other hand, the implementation of the tokens can be a bit more complex. It's also difficult revoke the tokens once issued.

## Magic Links at Quartz.

At [Quartz](https://qz.com), where I currently work, we adopted JWT as the token for magic links and ECDSA as its signature algorithm. A variety of signature algorithms can be used for JWT, but compared to RSA, which is typical for asymmetric cryptography (e.g., [all Auth0 tokens use RSA256 by default](https://community.auth0.com/t/jwt-signing-algorithms-rs256-vs-hs256/7720/5)), ECDSA is worth considering if you want to generate shorter URLs with magic links, as [ECDSA allows you to reduce the key size (length of the token string) instead of sacrificing processing speed](https://auth0.com/blog/json-web-token-signing-algorithms-overview/#RSA-and-ECDSA-algorithms).

*日本語版はこちら 👉 [マジックリンクでパスワードレスログインを実現する]({% post_url 2020-06-23-magic-links %})*