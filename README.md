# Playwright Automation Project

This project is an automated testing framework built using [Playwright](https://playwright.dev/), leveraging modern design patterns for reliability and maintainability.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Project Structure](#project-structure)
- [Design Structure](#design-structure)
- [Environment Variables](#environment-variables)
- [TypeScript Usage](#typescript-usage)
- [Contributing](#contributing)
- [License](#license)

---

## Tech Stack

- **Playwright:** End-to-end testing framework for web apps.
- **TypeScript:** Strongly-typed language for scalable and maintainable code.
- **Node.js:** JavaScript runtime environment.
- **dotenv:** Manages environment variables securely.
- **POM/SOM Design Patterns:** For test organization.
- **Lazy Getters:** Efficient element access and resource management.
- **Ollama + LLaMA 3.2:** AI-powered self-healing test automation for dynamic selector recovery.

---

## Setup

Before getting started, ensure you have [Node.js](https://nodejs.org/) installed.

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Install Playwright:**

   ```bash
   npx playwright install
   npm init playwright@latest
   ```

3. **Install `dotenv`:**

   ```bash
   npm install dotenv
   ```

4. **Install `zod`: **

   ```bash
   npm install zod
   ```

5. **Create config**

   ```playwright.config.ts
add 
```typescript
   if (!process.env.NODE_ENV) {
      require("dotenv").config({ path: `${__dirname}//src//config//.env` });
      } else {
        require("dotenv").config({
          path: `${__dirname}//src//config//.env.${process.env.NODE_ENV}`,
          });
        }
```
   define testMatch, timeout, use, baseURL(base URL that will be used for the whole project), projects
    ```


6. **Create managePage.ts**
   ```
   for access to all individual page objects (LoginPage, DashboardPage, etc.) through lazy getters.
   ```

7. **Create manageApi.ts**
   ```
   for access to all individual api objects (CompanyDetailsApi, etc.) through lazy getters.
   ```

8. **Create fixtures.ts**
   ```
   to inject pom (an instance of ManagePage), and manageApi (an instance of ManageApi) into your tests
   ```

9. **Create basePage.ts:**
   ```
   for generalized page helpers
   ```

10. **Create baseApi.ts:**
   ```
   for generalized api helpers
   ```

11. **Create any page (e.g. loginPage.ts)**
   ```
   extend to BasePage, add constructor, and then add the helpers
   ```

12. **Import the page to the managePage**
   ```
   see the managePage how the page was instantiated
   ```

13. **Create any api (e.g. customerApi.ts)**
   ```
   extend to BaseApi, add the helpers
   ```

14. **Import the page to the manageApi**
   ```
   see the managePage how the api was instantiated
   ```

---

## Project Structure

```
├── src/
│   ├── api-helpers/     # Service Object Model (SOM) - API layer for API testing
|       ├── manage/      # API Manager
│   ├── config/          # Credentials/configuration for each environment
│   ├── fixtures/        # Fixtures format file
│   ├── forms/           # Page Object Models for forms
│   ├── pages/           # POMs for pages, includes basePage, managePage, manageForm, manageApi (with lazy getters)
|       ├── manage/      # Page Manager
│   ├── test-data/       # Test data for Data Driven Testing (DDT)
│   ├── tests/           # Test suites and specs
│   ├── utils/           # Utility functions and CSV, XLSX, and data reader
├── .env                 # Environment variables
├── package.json         # Project metadata and scripts
├── playwright.config.ts # Playwright configuration
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project documentation
```

**Directory Highlights:**
- **api/**: Contains all Service Object Models for API testing.
- **config/**: Stores credentials and configuration files for each environment.
- **fixtures/**: Includes setup files for tests.
- **forms/**: Page Object Models specifically for forms and their elements.
- **pages/**: Contains page-level POMs and shared classes (basePage, managePage, manageForm, manageApi) using lazy getters.
- **tests/**: Houses all test specifications and test suites.
- **utils/**: Shared utility functions and helpers.

---

## Design Structure

### BasePage

A `BasePage` class provides shared logic and helper methods for all page objects. All page classes inherit from `BasePage` to keep code DRY and maintainable.

### Lazy Getters

Lazy getters are `get` accessors for Playwright locators, instantiating elements only when accessed. This improves efficiency and test reliability.

#### Example

```typescript
// src/pages/basePage.ts
export class BasePage {
  constructor(public page: import('playwright').Page) {}
  // Common reusable actions
  async navigate(url: string) {
    await this.page.goto(url);
  }
}
```

```typescript
// src/pages/loginPage.ts
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  get usernameField() {
    return this.page.locator('#username');
  }
  get passwordField() {
    return this.page.locator('#password');
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.page.click('button[type="submit"]');
  }
}
```
---

## Environment Variables

Sensitive and configuration data are managed with environment variables.  
Create a `.env` file at the project root:

```
BASE_URL=https://yourapp.com
LOGIN_USER=testuser
LOGIN_PASS=secret
```

Load these with:

```typescript
import 'dotenv/config';
const baseUrl = process.env.BASE_URL;
```

