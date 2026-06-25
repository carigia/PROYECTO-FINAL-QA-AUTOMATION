# 🏨 Shady Meadows B&B — Proyecto Final QA · Cohorte I 2026

> **Automatización de pruebas funcionales y no funcionales** sobre la aplicación de reservas Shady Meadows (Restful-Booker Platform).

---

## 👥 Integrantes del Grupo

| Nombre Completo | Email |
|----------------|-------|
| [Carina Giacoletti] | [cgiacoletti@hotmail.com] |
| [Tamara Milman] | [tamaramilman3@gmail.com] |
| [Eliana Speranza] | [speranza.eliana.e@gmail.com] |

---

## 🔗 Links Importantes

| Recurso | Link |
|---------|------|
| 📋 Tablero Trello (Bugs) | [Ver Tablero](https://trello.com/b/GpTtbPud/challenge) |
| 📊 Casos de Prueba (Excel/Sheets) | [Ver Planilla](https://docs.google.com/spreadsheets/d/1M8Iohl-2NHIHnYoBbxOAmIdAjbZ4Esyu/edit?gid=1837477377#gid=1837477377) | 🌐 App bajo prueba | [automationintesting.online](https://automationintesting.online) |

---


## 🎯 Objetivo del Proyecto

Diseñar, documentar y automatizar pruebas funcionales y de API sobre **Shady Meadows B&B**, un sistema de reservas real con bugs intencionales, aplicando los conocimientos del curso de Quality Engineering y los estándares **ISTQB CTFL v4.0**.

---

## 🏗️ Estructura del Proyecto

## 📁 Estructura del Proyecto

```bash
cypress/
├── e2e/
│   └── myTestRestfulBooker.cy.js
├── fixtures/
│   ├── contacto.json
│   ├── example.json
│   └── reserva.json
├── screenshots/
├── support/
│   ├── commands.js
│   ├── e2e.js
│   └── formsCommands.js
├── videos/
│   └── myTestRestfulBooker.cy.js.mp4

node_modules/
README.md
cypress.config.js
package-lock.json
package.json
```



## 🚀 Instalación y Ejecución

### Pre-requisitos
- Node.js >= 16.x
- npm >= 8.x

### Instalar dependencias
```bash
npm install
```

### Abrir Cypress (modo interactivo)
```bash
npm run cy:open
```

### Ejecutar todos los tests (modo headless)
```bash
npm run cy:run
```

### Ejecutar solo el archivo principal
```bash
npm run cy:run:spec
```

### Ejecutar en modo visual (con browser)
```bash
npm run cy:run:headed
```

---

## 🐛 Bugs Encontrados

Los bugs se reportan en el tablero de Trello con el formato estándar.
---

## 🛠️ Tecnologías Utilizadas

- **Cypress 13.x** — Framework de automatización E2E
- **JavaScript (ES6+)** — Lenguaje de programación
- **Node.js** — Runtime
- **JSON Fixtures** — Gestión de datos de prueba
- **Cypress Custom Commands** — Reutilización de código

---

## 📐 Buenas Prácticas Implementadas

- ✅ **Fixtures** — Datos de prueba separados del código
- ✅ **Tests independientes** — Cada test tiene su propio `beforeEach`
- ✅ **Comentarios explicativos** — Qué se testea y por qué
- ✅ **Casos positivos, negativos y de borde** (ISTQB BVA/EP)
- ✅ **API + UI testing** — Cobertura mixta

---

