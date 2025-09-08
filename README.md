# 🌐 BigSkyEats Marketing Website

**Status:** ✅ **ENTERPRISE OPTIMIZED - PRODUCTION READY**  
**Framework:** Next.js 14 + Sanity CMS  
**Last Updated:** January 8, 2025

[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![Sanity](https://img.shields.io/badge/Sanity-CMS-red.svg)](https://sanity.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg)](https://tailwindcss.com/)

---

## 🚀 **Enterprise Marketing Platform**

**BigSkyEats Marketing Website is the enterprise-grade Next.js application powering our content marketing, SEO optimization, and lead generation for the BigSkyEats food delivery platform in Big Sky, Montana.**

This modern website features native Sanity Studio integration for real-time content management, visual editing with live updates, and comprehensive marketing automation capabilities.

[![Deploy with Vercel](https://vercel.com/button)][vercel-deploy]

> [!NOTE]  
> This starter uses the Next.js [Pages Router](https://nextjs.org/docs/pages). [An App Router example is also available.](https://github.com/vercel/next.js/tree/canary/examples/cms-sanity#readme)

## ✨ **Enterprise Marketing Features**

### **🎯 Content Management & SEO**

- **Dynamic Content System**: Editable blog posts, restaurant spotlights, and marketing campaigns
- **SEO Optimization**: Advanced meta tags, structured data, and search engine optimization
- **Real-Time Content Updates**: Instant publishing without rebuilds via ISR (Incremental Static Regenration)
- **Visual Content Editor**: Native Sanity Studio accessible at `bigskyeats.com/studio`
- **Content Collaboration**: Real-time editing with fine-grained revision history

### **🌐 Enterprise Web Features**

- **Performance Optimized**: Static generation with edge caching for sub-200ms load times
- **Mobile-First Design**: Responsive design optimized for tourist and local engagement
- **Lead Generation**: Advanced contact forms with CRM integration
- **Analytics Integration**: Google Analytics 4, conversion tracking, and user behavior analysis
- **Marketing Automation**: Webhook-triggered content deployment and email campaigns

### **🔧 Technical Excellence**

- **TypeScript Integration**: Type-safe development with comprehensive error handling
- **Tailwind CSS**: Utility-first styling with custom BigSkyEats brand components
- **Image Optimization**: On-demand image transformations and WebP delivery
- **API Integration**: Seamless connection to BigSkyEats Rails backend for live data
- **Deployment Automation**: Vercel integration with GitHub Actions CI/CD

## Table of Contents

- [Features](#features)
- [Table of Contents](#table-of-contents)
- [Project Overview](#project-overview)
  - [Important files and folders](#important-files-and-folders)
- [Configuration](#configuration)
  - [Step 1. Set up the environment](#step-1-set-up-the-environment)
  - [Step 2. Set up the project locally](#step-2-set-up-the-project-locally)
  - [Step 3. Run Next.js locally in development mode](#step-3-run-nextjs-locally-in-development-mode)
  - [Step 4. Deploy to production](#step-4-deploy-to-production)
- [Questions and Answers](#questions-and-answers)
  - [It doesn't work! Where can I get help?](#it-doesnt-work-where-can-i-get-help)
  - [How can I remove the "Next steps" block from my blog?](#how-can-i-remove-the-next-steps-block-from-my-blog)
  - [How can I set up Incremental Static Revalidation?](#how-can-i-set-up-incremental-static-revalidation)
- [Next steps](#next-steps)

## 🏗️ **Enterprise Architecture Overview**

### **🌐 Production Deployment**

| **Marketing Website**                    | **Content Management Studio**                          |
| ---------------------------------------- | ------------------------------------------------------ |
| [bigskyeats.com](https://bigskyeats.com) | [bigskyeats.com/studio](https://bigskyeats.com/studio) |
| Enterprise-grade marketing platform      | Real-time content management interface                 |
| SEO-optimized, mobile-first design       | Visual editing with live preview                       |
| Lead generation and conversion tracking  | Multi-user collaboration and workflows                 |

### **🔧 Technology Stack Architecture**

```
🌐 Next.js 14 Frontend (Vercel Edge)
    ↕️ (API Routes + SSG/ISR)
📝 Sanity CMS (Content Lake)
    ↕️ (Webhooks + Real-time)
🔧 BigSkyEats Rails API
    ↕️ (Live Data Integration)
📊 Analytics & Marketing Tools
```

### Important files and folders

| File(s)                                     | Description                                              |
| ------------------------------------------- | -------------------------------------------------------- |
| `sanity.config.ts`                          |  Config file for Sanity Studio                           |
| `sanity.cli.ts`                             |  Config file for Sanity CLI                              |
| `/app/api/draft-mode/enable/route.ts`       |  Serverless route for triggering Draft mode              |
| `/app/studio/[[...index]]/page.tsx`         |  Where Sanity Studio is mounted                          |
| `/pages/api/revalidate.ts`                  |  Serverless route for triggering ISR                     |
| `/schemas`                                  |  Where Sanity Studio gets its content types from         |
| `/plugins`                                  |  Where the advanced Sanity Studio customization is setup |
| `/lib/sanity.api.ts`,`/lib/sanity.image.ts` | Configuration for the Sanity Content Lake client         |
| `/components/PreviewProvider.tsx`           | Configuration for the live Preview Mode                  |

## Configuration

### Step 1. Set up the environment

Use the Deploy Button below. It will let you deploy the starter using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-sanity-example) as well as connect it to your Sanity Content Lake using [the Sanity Vercel Integration][integration].

[![Deploy with Vercel](https://vercel.com/button)][vercel-deploy]

### Step 2. Set up the project locally

[Clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) that was created for you on your GitHub account. Once cloned, run the following command from the project's root directory:

```bash
npx vercel link
```

Download the environment variables needed to connect Next.js and the Studio to your Sanity project:

```bash
npx vercel env pull
```

### Step 3. Run Next.js locally in development mode

```bash
npm install && npm run dev
```

When you run this development server, the changes you make in your frontend and studio configuration will be applied live using hot reloading.

Your blog should be up and running on [http://localhost:3000][localhost-3000]! You can create and edit content on [http://localhost:3000/studio][localhost-3000-studio].

### Step 4. Deploy to production

To deploy your changes to production you use `git`:

```bash
git add .
git commit
git push
```

Alternatively, you can deploy without a `git` hosting provider using the Vercel CLI:

```bash
npx vercel --prod
```

## Questions and Answers

### It doesn't work! Where can I get help?

In case of any issues or questions, you can post:

- [GitHub Discussions for Next.js][vercel-github]
- [Sanity's GitHub Discussions][sanity-github]
- [Sanity's Community Slack][sanity-community]

### How can I remove the "Next steps" block from my blog?

You can remove it by deleting the `IntroTemplate` component in `/components/IndexPage.tsx`.

### How can I set up Incremental Static Revalidation?

Go to the serverless function code in `/pages/api/revalidate.ts`. In the code comments, you'll find instructions for how to set up [ISR][vercel-isr].

## Next steps

- [Join our Slack community to ask questions and get help][sanity-community]
- [How to edit my content structure?][sanity-schema-types]
- [How to query content?][sanity-groq]
- [What is content modelling?][sanity-content-modelling]

[vercel-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsanity-io%2Fnextjs-blog-cms-sanity-v3&repository-name=blog-nextjs-sanity&project-name=blog-nextjs-sanity&demo-title=Blog%20with%20Built-in%20Content%20Editing&demo-description=A%20Sanity-powered%20blog%20with%20built-in%20content%20editing%20%26%20instant%20previews&demo-url=https%3A%2F%2Fnextjs-blog.sanity.build%2F%3Futm_source%3Dvercel%26utm_medium%3Dreferral&demo-image=https%3A%2F%2Fuser-images.githubusercontent.com%2F81981%2F197501516-c7c8092d-0305-4abe-afb7-1e896ef7b90a.png&integration-ids=oac_hb2LITYajhRQ0i4QznmKH7gx&external-id=nextjs;template=nextjs-blog-cms-sanity-v3
[integration]: https://www.sanity.io/docs/vercel-integration?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[`.env.local.example`]: .env.local.example
[nextjs]: https://github.com/vercel/next.js
[sanity-create]: https://www.sanity.io/get-started/create-project?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-deployment]: https://www.sanity.io/docs/deployment?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-homepage]: https://www.sanity.io?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-community]: https://slack.sanity.io/
[sanity-schema-types]: https://www.sanity.io/docs/schema-types?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-github]: https://github.com/sanity-io/sanity/discussions
[sanity-groq]: https://www.sanity.io/docs/groq?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-content-modelling]: https://www.sanity.io/docs/content-modelling?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-webhooks]: https://www.sanity.io/docs/webhooks?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[localhost-3000]: http://localhost:3000
[localhost-3000-studio]: http://localhost:3000/studio
[vercel-isr]: https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta
[vercel]: https://vercel.com
[vercel-github]: https://github.com/vercel/next.js/discussions
[app-dir]: https://beta.nextjs.org/docs/routing/fundamentals#the-app-directory
[presentation]: https://www.sanity.io/docs/presentation


## ⚡ Tech Stack Status

**Last Updated**: 2025-09-07 23:40:38 MST

### ✅ Frontend Technologies
- **Next.js**: 15.5.2 (latest stable)
- **React**: 19.1.1 (upgraded)
- **TypeScript**: 5.9.2 (upgraded)
- **Sanity CMS**: 4.6.1 (upgraded)
- **TailwindCSS**: 3.4.14 (stable)

### 🚀 Performance & Deployment
- **ESLint**: 9.35.0 (code quality)
- **Lighthouse CI**: Performance monitoring
- **Vercel**: Auto-deploy configured
- **GitHub Actions**: CI/CD pipeline active

### 🌐 Content Management
- **Sanity Studio**: CMS operational
- **Blog System**: Content publishing ready
- **SEO Optimization**: Meta tags configured
