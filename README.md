<!-- markdownlint-disable MD014 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->
<!-- markdownlint-disable MD029 -->

<div align="center">

<h1 style="font-size: 2.5rem; font-weight: bold;">📒NEARCatalog</h1>

  <p>
    <strong>Ecosystem directory for <a href="https://near.org/" target="_blank">NEAR Protocol</a>.</strong>
  </p>

</div>

<details>
  <summary>Table of Contents</summary>

- [Getting Started](#getting-started)
  - [Installing dependencies](#installing-dependencies)
  - [Running the app](#running-the-app)
  - [Building for production](#building-for-production)
  - [Running tests](#running-tests)
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
npm run build
```

### Running tests

```bash
npm run test
```

See the full [testing guide](./playwright-tests/README.md).

## Project Structure

This is a [Next.js](https://nextjs.org/) project bootstrapped with [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load [Manrope](https://fonts.google.com/specimen/Manrope), a custom Google Font.

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
- `search-modal-store.ts`: Manages the state of search modal.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you're interested in contributing to this project, please read the [contribution guide](./CONTRIBUTING).

<div align="right">
<a href="https://nearbuilders.org" target="_blank">
<img
  src="https://builders.mypinata.cloud/ipfs/QmWt1Nm47rypXFEamgeuadkvZendaUvAkcgJ3vtYf1rBFj"
  alt="Near Builders"
  height="40"
/>
</a>
</div>
