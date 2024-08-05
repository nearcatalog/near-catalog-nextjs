<!-- markdownlint-disable MD014 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->
<!-- markdownlint-disable MD029 -->

<div align="center">

<img src="https://near-directory-nextjs.vercel.app/_next/static/media/logo.0c496378.svg" alt="near landscape" height="100" />
<br />
<br />
  <p>
    <strong>Ecosystem directory for <a href="https://near.org/" target="_blank">NEAR Protocol</a>.</strong>
  </p>

</div>

<details>
  <summary>Table of Contents</summary>

- [Getting Started](#getting-started)
  - [Cloning the repo](#cloning-the-repo)
  - [Installing dependencies](#installing-dependencies)
  - [Running the app](#running-the-app)
- [Project Structure](#project-structure)
  - [Routes](#routes)
  - [Global State](#global-state)
- [Contributing](#contributing)
  
</details>

## Getting Started

### Installing dependencies

```bash
npm install
```

### Running the app

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for production

```bash
npm build
```

### Running tests

```bash
npm test
```

## Project Structure

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load [Inter](https://fonts.google.com/specimen/Inter), a custom Google Font.

### Routes

This project uses the [Next.js App Router](https://nextjs.org/docs/app), and so the routes are defined in the `app` folder. There are three main pages:

- `/`: Home page of the application. It displays a list of projects that are available on the NEAR platform.
- `/project/:projectId`: Displays the details of a specific project. It includes information about the project, such as the name, description, and the list of tags associated with the project.
- `/category/:categoryId`: Displays a list of projects that are associated with a specific category.

### Global State

[zustand](https://github.com/pmndrs/zustand) is used to manage global state. It is a state management library that provides a simple and scalable solution for managing application state in a React or Preact application.

The state is stored in the `store` folder. There are two stores that are used in this project:

- `search-store.ts`: Manages the search state, including the search query and the tags that are selected.
- `tags-modal-store.ts`: Manages the state of the tags modal for mobile devices.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you're interested in contributing to this project, please read the [contribution guide](./CONTRIBUTING).

<div align="right">
<a href="https://nearbuilders.org" target="_blank">
<img
  src="https://ipfs.near.social/ipfs/bafkreiavh7rnvf4zzb5rjohul7xwrlgz4y6ysdtmdsvpjeqpjtmuvgal7a"
  alt="Near Builders"
  height="40"
/>
</a>
</div>
