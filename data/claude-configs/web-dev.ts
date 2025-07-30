import { ClaudeMdConfig } from '../types';

export const webDevConfigs: ClaudeMdConfig[] = [
  {
    id: 'nextjs-15-app-router',
    title: 'Next.js 15 App Router + TypeScript',
    slug: 'nextjs-15-app-router-typescript',
    description: 'Complete claude.md configuration for Next.js 15 with App Router, TypeScript, Tailwind CSS, and modern development practices.',
    category: 'Web Development',
    tags: ['nextjs', 'typescript', 'react', 'tailwind', 'app-router'],
    difficulty: 'INTERMEDIATE',
    language: 'TypeScript',
    framework: 'Next.js',
    content: `# Claude.md - Next.js 15 App Router Project

## Project Overview

This is a Next.js 15 application using the App Router, TypeScript, and Tailwind CSS. The project follows modern React patterns with server components, client components, and API routes.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks, Context API
- **API**: Next.js API routes (app/api)
- **Database**: [Add your database choice]
- **Authentication**: [Add your auth solution]

## Project Structure

\`\`\`
src/
├── app/                    # App Router pages and layouts
│   ├── (auth)/            # Route groups
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── ui/               # Base UI components
│   └── forms/            # Form components
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── utils/                # Helper functions
\`\`\`

## Development Guidelines

### Code Style
- Use TypeScript strict mode
- Prefer function components with hooks
- Use server components by default, client components when needed
- Follow Next.js naming conventions
- Use Tailwind CSS for styling

### Component Patterns
- Create reusable UI components in \`components/ui/\`
- Use custom hooks for shared logic
- Implement proper error boundaries
- Use React.Suspense for loading states

### API Design
- Use Next.js API routes in \`app/api/\`
- Implement proper error handling
- Use TypeScript for request/response types
- Follow RESTful conventions

### Performance
- Optimize images with next/image
- Use dynamic imports for code splitting
- Implement proper caching strategies
- Monitor Core Web Vitals

## Key Commands

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint
- \`npm run type-check\` - Run TypeScript compiler

## Environment Variables

Create a \`.env.local\` file with:
\`\`\`
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_auth_secret
\`\`\`

## Common Patterns

### Server Component
\`\`\`tsx
// app/products/page.tsx
import { getProducts } from '@/lib/api';

export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
\`\`\`

### Client Component
\`\`\`tsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
\`\`\`

### API Route
\`\`\`tsx
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const products = await fetchProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
\`\`\`

## Testing

- Use Jest and React Testing Library
- Write unit tests for utilities
- Write integration tests for API routes
- Use Playwright for e2e testing

## Deployment

- Deploy to Vercel for optimal Next.js experience
- Configure environment variables
- Set up monitoring and analytics
- Enable caching strategies`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  },
  {
    id: 'react-vite-typescript',
    title: 'React + Vite + TypeScript',
    slug: 'react-vite-typescript',
    description: 'Modern React development setup with Vite, TypeScript, and essential tooling for fast development.',
    category: 'Web Development',
    tags: ['react', 'vite', 'typescript', 'tailwind', 'spa'],
    difficulty: 'BEGINNER',
    language: 'TypeScript',
    framework: 'React',
    content: `# Claude.md - React + Vite + TypeScript Project

## Project Overview

This is a modern React application built with Vite for fast development, TypeScript for type safety, and Tailwind CSS for styling.

## Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks, Zustand/Redux Toolkit
- **Routing**: React Router DOM
- **Testing**: Vitest, React Testing Library

## Project Structure

\`\`\`
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── forms/           # Form components
│   └── layout/          # Layout components
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── store/               # State management
├── utils/               # Utility functions
├── types/               # TypeScript types
├── styles/              # CSS and Tailwind styles
└── main.tsx            # Application entry point
\`\`\`

## Development Guidelines

### Code Style
- Use functional components with hooks
- Implement TypeScript strict mode
- Use Tailwind CSS for styling
- Follow React best practices
- Use ESLint and Prettier

### Component Architecture
- Create small, focused components
- Use custom hooks for business logic
- Implement proper prop typing
- Use React.memo for performance optimization

### State Management
- Use React hooks for local state
- Use Zustand or Redux Toolkit for global state
- Implement proper data fetching patterns
- Use React Query for server state

## Key Commands

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run test\` - Run tests
- \`npm run lint\` - Run linter

## Environment Variables

Create a \`.env\` file:
\`\`\`
VITE_API_URL=http://localhost:8000/api
VITE_APP_TITLE=My React App
\`\`\`

## Common Patterns

### Component with TypeScript
\`\`\`tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  onClick 
}) => {
  return (
    <button
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
\`\`\`

### Custom Hook
\`\`\`tsx
import { useState, useEffect } from 'react';

export function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
\`\`\`

### Route Configuration
\`\`\`tsx
import { createBrowserRouter } from 'react-router-dom';
import { HomePage, AboutPage, ContactPage } from './pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/contact',
    element: <ContactPage />
  }
]);
\`\`\`

## Performance Tips

- Use React.lazy for code splitting
- Implement virtual scrolling for large lists
- Optimize bundle size with tree shaking
- Use React DevTools for debugging

## Testing

- Write unit tests for components
- Test custom hooks
- Use MSW for API mocking
- Implement integration tests

## Deployment

- Build optimized bundle with \`npm run build\`
- Deploy to Netlify, Vercel, or similar
- Configure environment variables
- Set up CI/CD pipeline`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  },
  {
    id: 'vue3-composition-api',
    title: 'Vue 3 + Composition API + TypeScript',
    slug: 'vue3-composition-api-typescript',
    description: 'Modern Vue 3 application with Composition API, TypeScript, and Vue ecosystem best practices.',
    category: 'Web Development',
    tags: ['vue', 'vue3', 'typescript', 'composition-api', 'pinia'],
    difficulty: 'INTERMEDIATE',
    language: 'TypeScript',
    framework: 'Vue.js',
    content: `# Claude.md - Vue 3 + Composition API + TypeScript Project

## Project Overview

This is a Vue 3 application using the Composition API, TypeScript, and modern Vue.js development practices with Vite as the build tool.

## Technology Stack

- **Framework**: Vue 3
- **API Style**: Composition API
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Styling**: CSS Modules, SCSS

## Project Structure

\`\`\`
src/
├── components/          # Vue components
│   ├── ui/             # Base UI components
│   └── forms/          # Form components
├── views/              # Page components (routes)
├── composables/        # Composition API functions
├── stores/             # Pinia stores
├── router/             # Vue Router configuration
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── main.ts            # Application entry point
\`\`\`

## Development Guidelines

### Code Style  
- Use Composition API over Options API
- Implement TypeScript strict mode
- Use \`<script setup>\` syntax
- Follow Vue.js style guide
- Use single-file components (.vue)

### Component Architecture
- Create composable functions for reusable logic
- Use props validation with TypeScript
- Implement proper event handling
- Use Vue 3 teleport for modals/overlays

### State Management
- Use Pinia for global state management
- Create typed stores
- Use composables for local state
- Implement proper reactive patterns

## Key Commands

- \`npm run dev\` - Start development server  
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run test\` - Run unit tests
- \`npm run type-check\` - TypeScript checking

## Environment Variables

Create a \`.env\` file:
\`\`\`
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=My Vue App
\`\`\`

## Common Patterns

### Component with Composition API
\`\`\`vue
<template>
  <div class="user-profile">
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
    <button @click="updateProfile">Update</button>
  </div>
</template>

<script setup lang="ts">
interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  userId: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  update: [user: User];
}>();

const user = ref<User | null>(null);
const loading = ref(false);

const fetchUser = async (id: number) => {
  loading.value = true;
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    user.value = await response.json();
  } finally {
    loading.value = false;
  }
};

const updateProfile = () => {
  if (user.value) {
    emit('update', user.value);
  }
};

onMounted(() => {
  fetchUser(props.userId);
});
</script>
\`\`\`

### Composable Function
\`\`\`ts
// composables/useApi.ts
import { ref, Ref } from 'vue';

export function useApi<T>(url: string) {
  const data: Ref<T | null> = ref(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const execute = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(response.statusText);
      data.value = await response.json();
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      loading.value = false;
    }
  };

  return {
    data: readonly(data),
    loading: readonly(loading),
    error: readonly(error),
    execute
  };
}
\`\`\`

### Pinia Store
\`\`\`ts
// stores/user.ts
import { defineStore } from 'pinia';

interface User {
  id: number;
  name: string;
  email: string;
}

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([]);
  const currentUser = ref<User | null>(null);

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    users.value = await response.json();
  };

  const setCurrentUser = (user: User) => {
    currentUser.value = user;
  };

  return {
    users: readonly(users),
    currentUser: readonly(currentUser),
    fetchUsers,
    setCurrentUser
  };
});
\`\`\`

### Router Configuration
\`\`\`ts
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/About.vue')
    }
  ]
});

export default router;
\`\`\`

## Performance Tips

- Use \`v-memo\` for expensive list rendering
- Implement lazy loading with \`defineAsyncComponent\`
- Use \`shallowRef\` for large objects
- Optimize with \`markRaw\` for non-reactive data

## Testing

- Use Vue Test Utils with Vitest
- Test components in isolation
- Mock composables and stores
- Write integration tests for complex flows

## Deployment

- Build with \`npm run build\`
- Deploy to Netlify, Vercel, or similar
- Configure build environment variables
- Set up proper routing for SPA`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  },
  {
    id: 'astro-content-collections',
    title: 'Astro + Content Collections + TypeScript',
    slug: 'astro-content-collections-typescript',
    description: 'Static site generation with Astro, content collections, and TypeScript for fast, SEO-friendly websites.',
    category: 'Web Development',
    tags: ['astro', 'typescript', 'ssg', 'content-collections', 'markdown'],
    difficulty: 'INTERMEDIATE',
    language: 'TypeScript',
    framework: 'Astro',
    content: `# Claude.md - Astro + Content Collections + TypeScript Project

## Project Overview

This is an Astro project utilizing content collections, TypeScript, and static site generation for optimal performance and SEO.

## Technology Stack

- **Framework**: Astro
- **Language**: TypeScript
- **Content**: Content Collections (Markdown/MDX)
- **Styling**: Tailwind CSS, CSS Modules
- **Integrations**: React, Vue, or Svelte (as needed)
- **Deployment**: Static hosting (Netlify, Vercel)

## Project Structure

\`\`\`
src/
├── components/          # Astro/Framework components
├── content/            # Content collections
│   ├── blog/          # Blog posts
│   ├── docs/          # Documentation
│   └── config.ts      # Content config
├── layouts/           # Page layouts
├── pages/             # Routes and pages
├── styles/            # Global styles
└── utils/             # Utility functions
\`\`\`

## Development Guidelines

### Content Strategy
- Use Content Collections for structured content
- Write content in Markdown/MDX
- Implement proper frontmatter schemas
- Organize content logically

### Component Architecture
- Create reusable Astro components
- Use framework components sparingly
- Implement proper TypeScript typing
- Optimize for static generation

### Performance
- Minimize JavaScript bundle size
- Use Astro's partial hydration
- Optimize images with Astro's image service
- Implement proper caching strategies

## Key Commands

- \`npm run dev\` - Start development server
- \`npm run build\` - Build static site
- \`npm run preview\` - Preview built site
- \`npm run astro\` - Run Astro CLI commands

## Content Collections Configuration

\`\`\`ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  })
});

const docsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    category: z.string(),
  })
});

export const collections = {
  'blog': blogCollection,
  'docs': docsCollection,
};
\`\`\`

## Common Patterns

### Astro Component
\`\`\`astro
---
// src/components/BlogCard.astro
export interface Props {
  title: string;
  description: string;
  pubDate: Date;
  href: string;
}

const { title, description, pubDate, href } = Astro.props;
---

<article class="blog-card">
  <h3><a href={href}>{title}</a></h3>
  <p>{description}</p>
  <time datetime={pubDate.toISOString()}>
    {pubDate.toLocaleDateString()}
  </time>
</article>

<style>
.blog-card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.2s;
}

.blog-card:hover {
  transform: translateY(-2px);
}
</style>
\`\`\`

### Page with Content Collection
\`\`\`astro
---
// src/pages/blog/index.astro
import { getCollection } from 'astro:content';
import BlogCard from '../../components/BlogCard.astro';
import Layout from '../../layouts/Layout.astro';

const blogPosts = await getCollection('blog');
const sortedPosts = blogPosts.sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
---

<Layout title="Blog">
  <main>
    <h1>Blog Posts</h1>
    <section class="posts-grid">
      {sortedPosts.map((post) => (
        <BlogCard
          title={post.data.title}
          description={post.data.description}
          pubDate={post.data.pubDate}
          href={\`/blog/\${post.slug}\`}
        />
      ))}
    </section>
  </main>
</Layout>
\`\`\`

### Dynamic Page Generation
\`\`\`astro
---
// src/pages/blog/[...slug].astro
import { getCollection } from 'astro:content';
import BlogLayout from '../../layouts/BlogLayout.astro';

export async function getStaticPaths() {
  const blogEntries = await getCollection('blog');
  return blogEntries.map(entry => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await entry.render();
---

<BlogLayout frontmatter={entry.data}>
  <Content />
</BlogLayout>
\`\`\`

### Integration with React Component
\`\`\`tsx
// src/components/SearchBox.tsx
import { useState } from 'react';

interface SearchBoxProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

export default function SearchBox({ 
  placeholder = "Search...", 
  onSearch 
}: SearchBoxProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
      />
      <button type="submit">Search</button>
    </form>
  );
}
\`\`\`

### Using React Component in Astro
\`\`\`astro
---
import SearchBox from '../components/SearchBox.tsx';
---

<SearchBox 
  client:load 
  placeholder="Search posts..."
  onSearch={(query) => console.log(query)}
/>
\`\`\`

## SEO and Performance

- Use proper meta tags in layouts
- Implement structured data
- Optimize Core Web Vitals
- Use Astro's built-in image optimization
- Implement proper sitemap generation

## Content Management

- Use frontmatter for metadata
- Organize content in logical collections
- Implement content validation with Zod
- Use MDX for interactive content

## Deployment

- Build static site with \`npm run build\`
- Deploy to any static hosting provider
- Configure build environment variables
- Set up continuous deployment from Git`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  },
  {
    id: 'sveltekit-app',
    title: 'SvelteKit + TypeScript + TailwindCSS',
    slug: 'sveltekit-typescript-tailwind',
    description: 'Full-stack SvelteKit application with TypeScript, TailwindCSS, and modern Svelte development patterns.',
    category: 'Web Development',
    tags: ['svelte', 'sveltekit', 'typescript', 'tailwind', 'fullstack'],
    difficulty: 'INTERMEDIATE',
    language: 'TypeScript',
    framework: 'SvelteKit',
    content: `# Claude.md - SvelteKit + TypeScript + TailwindCSS Project

## Project Overview

This is a SvelteKit application with TypeScript and TailwindCSS, providing full-stack capabilities with server-side rendering and static site generation.

## Technology Stack

- **Framework**: SvelteKit
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: Svelte stores
- **Database**: [Your choice - Prisma, Drizzle, etc.]
- **Authentication**: [Your choice - Auth.js, etc.]
- **Deployment**: Vercel, Netlify, or Node.js

## Project Structure

\`\`\`
src/
├── lib/                # Shared utilities and components
│   ├── components/     # Reusable Svelte components
│   ├── stores/         # Svelte stores
│   └── utils/          # Utility functions
├── routes/             # File-based routing
│   ├── api/           # API endpoints
│   ├── +layout.svelte # Root layout
│   └── +page.svelte   # Home page
├── app.html           # HTML template
└── app.css           # Global styles
\`\`\`

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow Svelte conventions
- Use TailwindCSS for styling
- Implement proper component composition
- Use SvelteKit's file-based routing

### Component Architecture
- Create reusable components in \`lib/components/\`
- Use Svelte stores for global state
- Implement proper prop typing
- Use slots for component composition

### Server-Side Features
- Use load functions for data fetching
- Implement API routes in \`routes/api/\`
- Use form actions for form handling
- Implement proper error handling

## Key Commands

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run check\` - Run Svelte check
- \`npm run lint\` - Run ESLint

## Environment Variables

Create a \`.env\` file:
\`\`\`
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
PUBLIC_API_URL=http://localhost:5173/api
\`\`\`

## Common Patterns

### Svelte Component with TypeScript
\`\`\`svelte
<!-- lib/components/UserCard.svelte -->
<script lang="ts">
  export let user: {
    id: number;
    name: string;
    email: string;
    avatar?: string;
  };
  
  export let showEmail = true;
  export let clickable = false;
  
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher<{
    click: { user: typeof user };
  }>();
  
  function handleClick() {
    if (clickable) {
      dispatch('click', { user });
    }
  }
</script>

<div 
  class="user-card"
  class:clickable
  on:click={handleClick}
  on:keydown={(e) => e.key === 'Enter' && handleClick()}
  role={clickable ? 'button' : undefined}
  tabindex={clickable ? 0 : undefined}
>
  {#if user.avatar}
    <img src={user.avatar} alt="{user.name}'s avatar" />
  {/if}
  
  <div class="user-info">
    <h3>{user.name}</h3>
    {#if showEmail}
      <p>{user.email}</p>
    {/if}
  </div>
</div>

<style>
  .user-card {
    @apply p-4 border rounded-lg;
  }
  
  .clickable {
    @apply cursor-pointer hover:bg-gray-50 transition-colors;
  }
</style>
\`\`\`

### Page with Load Function
\`\`\`svelte
<!-- routes/users/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';
  import UserCard from '$lib/components/UserCard.svelte';
  
  export let data: PageData;
  
  function handleUserClick(event: CustomEvent<{ user: typeof data.users[0] }>) {
    console.log('User clicked:', event.detail.user);
  }
</script>

<svelte:head>
  <title>Users</title>
  <meta name="description" content="List of all users" />
</svelte:head>

<main class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-8">Users</h1>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each data.users as user (user.id)}
      <UserCard 
        {user} 
        clickable 
        on:click={handleUserClick} 
      />
    {/each}
  </div>
</main>
\`\`\`

### Load Function
\`\`\`ts
// routes/users/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch('/api/users');
  
  if (!response.ok) {
    throw new Error('Failed to load users');
  }
  
  const users = await response.json();
  
  return {
    users
  };
};
\`\`\`

### API Route
\`\`\`ts
// routes/api/users/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    // Fetch users from database
    const users = await getUsersFromDatabase();
    
    return json(users);
  } catch (error) {
    return json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const userData = await request.json();
    const user = await createUser(userData);
    
    return json(user, { status: 201 });
  } catch (error) {
    return json(
      { error: 'Failed to create user' },
      { status: 400 }
    );
  }
};
\`\`\`

### Svelte Store
\`\`\`ts
// lib/stores/user.ts
import { writable } from 'svelte/store';

interface User {
  id: number;
  name: string;
  email: string;
}

function createUserStore() {
  const { subscribe, set, update } = writable<User[]>([]);
  
  return {
    subscribe,
    set,
    add: (user: User) => update(users => [...users, user]),
    remove: (id: number) => update(users => users.filter(u => u.id !== id)),
    clear: () => set([])
  };
}

export const users = createUserStore();
\`\`\`

### Form Actions
\`\`\`ts
// routes/contact/+page.server.ts
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const message = data.get('message') as string;
    
    if (!name || !email || !message) {
      return fail(400, {
        error: 'All fields are required',
        name,
        email,
        message
      });
    }
    
    try {
      await sendContactEmail({ name, email, message });
      return { success: true };
    } catch (error) {
      return fail(500, {
        error: 'Failed to send message',
        name,
        email,
        message
      });
    }
  }
};
\`\`\`

## Performance Tips

- Use SvelteKit's preloading features
- Implement proper code splitting
- Optimize images and assets
- Use SSR/SSG appropriately
- Implement proper caching strategies

## Testing

- Use Vitest for unit testing
- Test components with @testing-library/svelte
- Use Playwright for e2e testing
- Mock API calls in tests

## Deployment

- Configure adapter for your deployment target
- Set up environment variables
- Implement proper build optimization
- Configure caching and CDN`,
    author: {
      name: 'Claude Code Community',
      url: 'https://github.com/claudecode-community'
    },
    lastUpdated: '2024-12-01'
  }
];