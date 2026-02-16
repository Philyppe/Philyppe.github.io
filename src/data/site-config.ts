import avatar from '../assets/images/avatar.jpg';
import hero from '../assets/images/hero.jpg';
import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
    website: 'https://example.com',
    avatar: {
        src: avatar,
        alt: 'Ethan Donovan'
    },
    title: 'Felipe López',
    subtitle: 'Here it is my personal blog',
    description: 'Astro.js and Tailwind CSS theme for blog and portfolio by justgoodui.com',
    image: {
        src: '/dante-preview.jpg',
        alt: 'Dante - Astro.js and Tailwind CSS theme'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'Evidencias',
            href: '/evidencias'
        },
        {
            text: 'Github',
            href: 'https://github.com/Philyppe'
        }
    ],
    footerNavLinks: [
        {
            text: 'About',
            href: '/about'
        },
        {
            text: 'Contact',
            href: '/contact'
        },
        {
            text: 'Terms',
            href: '/terms'
        }
    ],
    socialLinks: [
        {
            text: 'Instagram',
            href: 'https://www.instagram.com/pipe__.__/'
        }
    ],
   hero: {
    title: 'Hi There & Welcome to My Corner of the Web!',
    text: `I'm **Felipe López**, a Systems Engineering student passionate about software development in Java.
My approach focuses on applying good practices and structured methodologies to build efficient and scalable systems.

I have experience with Spring Boot, frontend development using PrimeFaces, and working under the MVC architecture.

Currently, I am strengthening my knowledge in databases and data modeling.

Feel free to explore some of my coding projects on [GitHub](https://github.com/Philyppe).
[Self introduction](https://drive.google.com/file/d/1Kx6QXfA9Ne8fwohHOVL2BIYVHZYTv3vE/view?usp=drive_link)
`,
    image: {
        src: hero,
        alt: 'A person sitting at a desk in front of a computer'
    },
    actions: [
        {
            text: 'Get in Touch',
            href: '/contact'
        }
    ]
},
    subscribe: {
        enabled: false,
        title: 'Subscribe to Dante Newsletter',
        text: 'One update per week. All the latest posts directly in your inbox.',
        form: {
            action: '#'
        }
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
