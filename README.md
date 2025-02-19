
## Project Structure

Key directories and their purposes:

- `public/`: Contains static assets.
- `src/`: Main source directory.
  - `components/`: Reusable UI components.
  - `layout/`: Components defining the overall structure.
  - `routes/`: Routing components and configurations.
  - `services/`: Service classes for API calls and data manipulation.
  - `store/`: Redux store and related components.
  - `theme/`: Theme-related components and configurations.
  - `types/`: TypeScript type definitions and interfaces.
  - `utils/`: Utility functions and classes.
  - `views/`: Components representing different pages.
  - `__tests__`: Tests directory.

## Tools and Technologies

This project is built using modern web development tools and technologies:

1. **React**: A JavaScript library for building user interfaces.
2. **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
3. **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
4. **Redux**: A predictable state container for JavaScript apps.
5. **Material-UI**: A popular React UI framework for faster and easier web development.
6. **React Router**: Declarative routing for React applications.
7. **Axios**: Promise based HTTP client for the browser and node.js.
8. **ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
9. **Prettier**: An opinionated code formatter.
10. **React Testing Library**: A light-weight solution for testing React components.

Development Environment:
- Node.js and npm (Node Package Manager)
- Git for version control

## Testing

This project uses Vitest as the testing framework along with React Testing Library for component testing. Here's an overview of our testing setup:

### Test Structure

- Tests are located in the `__tests__` directory
- Each test file is named after the component or service it tests, with a `.test.tsx` or `.test.ts` extension

### Running Tests

To run the test suite, use the following command:

```bash
npm run test
