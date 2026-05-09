# 🧪 Playwright Demo Project

End-to-end test automation project built with Playwright code based approach.

---

## 📦 Setup

### 🔧 1. Install dependencies

```bash
npm install
```

> Includes:
> - @playwright/test
> - dotenv

---

### 🔑 2. Environment configuration

Create a `.env` file based on `.env.example` and fill in credentials:

```env
BANK_ADMIN_USER_PASSWORD=
BANK_READONLY_USER_PASSWORD=
```

👉 For demo purposes, you can use:

```
BANK_ADMIN_USER_NAME=admin
BANK_ADMIN_USER_PASSWORD=admin123
BANK_READONLY_USER_NAME=viewer
BANK_READONLY_USER_PASSWORD=viewer123
```

---

## ▶️ Running Tests

### 🧪 Run all tests

```bash
npm test
```

👉 Runs all tests in **headless mode**

---

### 🎯 Run specific tests (by tags or test IDs)

All test scenarios tags and IDs are defined in `.spec.ts` files.

---

### 🔹 Run by test ID

Example scenario:
```
[TC-LOGIN-01] Successful Login With Admin Credentials
```

```bash
npx playwright test --grep "TC-LOGIN-01"
```

👉 Headless mode

```bash
npx playwright test --grep "TC-LOGIN-01" --headed
```

👉 Headed mode (UI browser)

---

### 🔹 Run by tags

Example tags:
- `@smoke`
- `@regress`

```bash
npx playwright test --grep "@regress"
```

👉 Headless mode

```bash
npx playwright test --grep "@regress" --headed
```

👉 Headed mode

---

### 🔹 Combine tags

```bash
npx playwright test --grep "@smoke|@regress"
```

---

## 🧰 Debugging & Tools

### 🐞 Debug mode

```bash
npx playwright test --grep "TC-LOGIN-01" --debug
```

---

### 🖥️ Playwright UI runner

```bash
npx playwright test --ui
```

---

## 💡 Best Practices

- Use meaningful tags:
  - `@smoke`
  - `@regress`
  - `@negative`
- Keep test data separated (e.g. `formData.ts`)
- Prefer stable locators (`data-testid`)
- Use Page Object Model for maintainability

---

## 🚀 Tech Stack

- Playwright
- TypeScript

---

## 📌 Project Purpose

This project demonstrates:
- scalable Playwright test architecture
- clean Page Object Model design
- flexible test data handling