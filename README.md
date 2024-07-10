
# Refactor of Analytics App

Welcome to the Refactor of Analytics App repository! This project is a climbing analytics application built with Next.js and TypeScript, iterating on a previous prototype analytic application. The app utilizes various modern web technologies to provide a comprehensive and interactive experience for analyzing climbing data.

## Table of Contents
- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contact](#contact)

## Introduction
This project is a refactor of a previous climbing analytics application prototype. It aims to enhance the performance, scalability, and usability of the application by leveraging Next.js, TypeScript, and other modern web technologies.

## Project Structure
The project structure is organized as follows:
```
.vscode/           # Visual Studio Code settings
prisma/            # Prisma schema and migrations
src/               # Source code
  └ app/           # Main application code
    └ImportData    # Contains Components and types for Import Data Page
    └Visualizations# Contains Components and types for Import Data Page
    └Actions       # Contains Server actions including automatic field match and parse user submitted spreadsheet
    └api/ServerActions #Server acitons related to CRUD and analysis
    └components    # SiteWide components
    └static        # Static Assets
    └styles        # global stylesheet
    
.eslintrc.json     # ESLint configuration
.gitattributes     # Git attributes configuration
.gitignore         # Files and directories to ignore in Git
next.config.mjs    # Next.js configuration
package-lock.json  # NPM lock file
package.json       # NPM package configuration
postcss.config.js  # PostCSS configuration
prisma.ts          # Prisma client setup
script.ts          # Custom scripts
tailwind.config.js # Tailwind CSS configuration
tsconfig.json      # TypeScript configuration
ticks.csv          # Example csv data
xlsm.xlsm          # Example xlsm data
xlsx.xlsx          # Example xlsx data
```



## Technologies Used
- **Next.js:** A React framework for server-rendered applications.
- **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
- **Prisma:** A modern database toolkit for TypeScript and Node.js.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **PostCSS:** A tool for transforming CSS with JavaScript plugins.


## Contact
For any inquiries, suggestions, or feedback, feel free to reach out to me at [your-email@example.com].
