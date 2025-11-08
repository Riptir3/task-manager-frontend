# 🧠 Task Manager Client

Egy **React és Tailwind CSS** alapú webalkalmazás, amely felhasználói feladatok kezelését teszi lehetővé, JWT-alapú hitelesítéssel és biztonságos adatkezeléssel..  
A cél egy modern, biztonságos kliens alkalmazás létrehozása, amelyet egy Asp.net Web Api backend használ.

---

## 🚀 Funkciók

- 👤 **Felhasználókezelés**
  - Regisztráció
  - Bejelentkezés (JWT tokennel)
  - Token alapú authentikáció

- ✅ **Feladatkezelés (Task CRUD)**
  - Lekérdezés
  - Létrehozás    
  - Módosítás  
  - Törlés  

- 🔍 **Szűrés, keresés és rendezés** a feladatok között  
- ⚙️ **Egységes hibakezelés**
- 📤 **Feladatok exportálása** XLSX fájlba

---

## 🧰 Felhasznált technológiák

- **React**
- **Tailwind**
- **Axios**
- **JWT (JSON Web Token)**

---

## 🗂️ Projekt szerkezete

```
task-manager-frontend/
│
├── src/components/
│ ├── ProtectedRoute.jsx -> Bejelentkezéshez kötött Routeok ellenőrzése. (Feladatok kezelése)
│ └── PublicRoute.jsx -> Bejelentkezéshez nem kötött Routeok ellenőrzése. (Bejelentkezés, Regisztráció)
│
├── src/contexts/
│ ├── UserContext.js -> Globális állapot létrehozása és hozzáférésének biztosítása. Token kezelése.
│
├── src/pages/
│ ├── Login.jsx -> Bejelentkezés oldala.
│ ├── Register.jsx -> Regisztráció oldala.
│ ├── TaskEdit.jsx -> Kiválasztott feladat módosítása.
│ ├── TaskForm.jsx -> Új feladat létrehozása.
│ └── TaskList.jsx -> Főoldal, tartalmazza a felhasználóhoz rendelt feladatokat.
│
├── src/services/
│ ├── api.js -> Globálisan beállítja a bejelentkezés utáni tokent a request headerjébe. Hiba kezelés.
│ └── authService.js -> Bejelentkezéshez és regisztrációhoz tartozó api-ok.
│
├── src/App.js -> Routeok létrehozása.
|
├──src/index.js -> UserProvider hozzáadása az App komponenshez.

```
## 🧪 API végpontok

🔹 Felhasználók
| HTTP metódus | Útvonal                   | Leírás                           |
| ------------ | ------------------------- | -------------------------------- |
| `POST`       | `/api/Users/register` | Új felhasználó regisztrálása     |
| `POST`       | `/api/Users/login`        | Bejelentkezés és token generálás |

🔹 Feladatok (autentikáció szükséges)
| HTTP metódus | Útvonal           | Leírás                         |
| ------------ | ----------------- | ------------------------------ |
| `GET`        | `/api/Tasks`      | Összes feladat lekérdezése     |
| `GET`        | `/api/Tasks/{id}` | Feladat lekérdezése ID alapján |
| `POST`       | `/api/Tasks`      | Új feladat létrehozása         |
| `PUT`        | `/api/Tasks/{id}` | Feladat módosítása             |
| `DELETE`     | `/api/Tasks/{id}` | Feladat törlése                |

## 🔑 JWT hitelesítés

A bejelentkezés után a szerver visszaad egy JWT tokent, amelyet a kliens minden kérésnél a headerben küld el:
``` http
Authorization: Bearer <token>
```
### Példa:
``` http
GET /api/Tasks HTTP/1.1
Host: localhost:7242
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
A token lejárata után a kliens újra bejelentkezésre kényszerül.

## 🌍 Backend integráció

A frontendhez készült ASP.NET Core Web API alapú backend is:
👉[Task Manager Backend](https://github.com/Riptir3/TaskManager.Api). 
A két alkalmazás Axios-on keresztül kommunikál, a `https://localhost:7242/api/...` végpontokat használva.

## ⚙️ Telepítés és futtatás

### 1️⃣ Klónozd a repót
```bash
git clone https://github.com/Riptir3/task-manager-frontend.git
cd task-manager-frontend
```
### 2️⃣ Telepítsd a függőségeket
```bash
npm install
```
### 3️⃣ Futtatás
```bash
npm start
```

## Kapcsolat

Fejlesztő: **Riptir3 (Bence)**  
GitHub: [github.com/Riptir3](https://github.com/Riptir3)
