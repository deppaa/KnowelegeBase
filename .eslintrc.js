module.exports = {
  parser: "@typescript-eslint/parser", // Указываем парсер для TypeScript
  extends: [
    "eslint:recommended", // Рекомендуемые правила ESLint
    "plugin:@typescript-eslint/recommended", // Рекомендуемые правила для TypeScript
    "plugin:prettier/recommended", // Интеграция с Prettier
  ],
  parserOptions: {
    ecmaVersion: 2022, // Используем ES2022
    sourceType: "module", // Используем модули ES
    project: "./tsconfig.json", // Указываем путь к tsconfig.json
  },
  env: {
    es6: true, // Поддержка ES6
    node: true, // Поддержка Node.js
  },
  rules: {
    "no-var": "error", // Запрещаем использование var
    semi: ["error", "always"], // Требуем точки с запятой
    indent: ["error", 2], // Устанавливаем отступы в 4 пробела
    quotes: ["error", "single"], // Используем одинарные кавычки
    "prefer-const": "error", // Рекомендуем использовать const
    "no-multiple-empty-lines": ["error", { max: 1 }], // Ограничиваем количество пустых строк
  },
  ignorePatterns: ["node_modules/", "build/"], // Игнорируем указанные директории
};
