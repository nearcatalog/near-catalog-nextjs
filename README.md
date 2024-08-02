# Near Directory

- Old Version: [Near Catalog](https://dev.near.org/nearcatalog.near/widget/Index)
- Designs: [Figma](https://www.figma.com/design/I9qRE8BQA8dfFYyYrFRnnm/NBH-Ongoing-Design-Files?node-id=245-2&t=KbwqZF8zbf7uFCt4-0)
- Live Demo: [Near Directory](https://near-directory-nextjs.vercel.app/)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Cloning the repo

```bash
git clone https://github.com/NEARBuilders/near-directory-nextjs.git
```

### Installing dependencies

```bash
npm install
```

### Running the app

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Routes

The routes are defined in the `app` folder. There are three main pages:

- `/`: This is the home page of the application. It displays a list of projects that are available on the NEAR platform.
- `/project/:projectId`: This is the page that displays the details of a specific project. It includes information about the project, such as the name, description, and the list of tags associated with the project.
- `/category/:categoryId`: This is the page that displays a list of projects that are associated with a specific category.

## Global State

[zustand](https://github.com/pmndrs/zustand) is used to manage global state. It is a state management library that provides a simple and scalable solution for managing application state in a React or Preact application.

The state is stored in the `store` folder. There are two stores that are used in this project:

- `search-store.ts`: This store manages the search state, including the search query and the tags that are selected.
- `tags-modal-store.ts`: This store manages the state of the tags modal for mobile devices.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
