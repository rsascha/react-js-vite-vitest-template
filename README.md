# Project Setup for React, JavaScript and Testing with Vitest

## Project and Testing Setup

(State: 25. October 2023)

Create a new JavaScript React project with Vite:

```plain
npm create vite@latest
```

- Project name: demo-testing-vitest
- Select a framework: › React
- Select a variant: › JavaScript + SWC

Change to project directory:

```sh
cd demo-testing-vitest
```

Init a new git repository:

```sh
git init
git status # make sure you are commiting the right files
git add . # add all files
git commit -m "initial commit" # commit all files
```

Install dev dependencies:

```sh
npm install -D vitest happy-dom @testing-library/react eslint-plugin-vitest @vitest/coverage-v8
```

Details:

- vitest - a Vite-native testing framework [-> reference](https://vitest.dev/)
- happy-dom - happy DOM is a JavaScript implementation of a web browser without its graphical user interface [-> reference](https://github.com/capricorn86/happy-dom)
- @testing-library/react - React Testing Library builds on top of DOM Testing Library by adding APIs for working with React components [-> reference](https://testing-library.com/docs/react-testing-library/intro/)
- eslint-plugin-vitest - ESLint support for vitest [-> reference](https://github.com/veritem/eslint-plugin-vitest)
- @vitest/coverage-v8 - coverage support for vitest [-> reference](https://vitest.dev/guide/coverage.html#coverage-providers)

Add configuration to `vite.config.js`:

```js
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
```

Add `test` and `test:coverage` scripts to `package.json`:

```json
"scripts": {
    "test": "vitest",
    "test:coverage": "vitest --coverage"
}
```

Adjust your `.eslintrc.cjs`:

```js
const vitest = require("eslint-plugin-vitest");

module.exports = {
  // ...
  rules: {
    // ...
    ...vitest.configs.recommended.rules,
  },
  languageOptions: {
    globals: {
      ...vitest.environments.env.globals,
    },
  },
};
```

To create your first test create a file `src/App.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import App from "./App";

describe("App", () => {
  it("should contain the text 'Vite + React'", () => {
    render(<App />);
    expect(screen.findByText("Vite + React")).toBeDefined();
  });
});
```

Test your setup:

```sh
npm test
```

Expected result:

```plain
 ✓ src/App.test.jsx (1)
   ✓ App (1)
     ✓ should contain the text 'Vite + React'

 Test Files  1 passed (1)
      Tests  1 passed (1)
```

Test and configure coverage:

```sh
npm run test:coverage
```

Expected result:

```plain
 % Coverage report from v8
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |      50 |     100 |
 App.jsx  |     100 |      100 |      50 |     100 |
----------|---------|----------|---------|---------|-------------------
```

The coverage report is also available in `coverage/index.html`.

```sh
open coverage/index.html
```

Add the following to your `.gitignore`:

```plain
# testing
coverage
```

Your setup is ready to go.

You should commit your changes:

```sh
git add .
git commit -m "setup vitest"
```

## VS Code Extensions

You should disable all `jest` extensions (like Jest Runner).

You can use the following VS Code extensions to run and debug your tests:

Name: Vitest
Id: ZixuanChen.vitest-explorer
Description: Run and debug Vitest test cases
Version: 0.2.43
Publisher: Zixuan Chen
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer

## References

- https://github.com/capricorn86/happy-dom
- https://github.com/veritem/eslint-plugin-vitest
- https://testing-library.com/docs/react-testing-library/intro/
- https://vitejs.dev/
- https://vitest.dev/
- https://vitest.dev/guide/coverage.html#coverage-providers
