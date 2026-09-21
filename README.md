# User Management System

A full-stack Angular application for managing users.

## 🚀 Features

- ✅ User List with Search/Filter
- ✅ Add New User
- ✅ Edit Existing User
- ✅ Delete User
- ✅ Home Dashboard with Stats
- ✅ Responsive Design
- ✅ Routing & Navigation

## 🛠️ Technologies

- **Angular 22** - Frontend framework
- **TypeScript** - Programming language
- **RxJS** - Reactive programming
- **JSON Server** - Fake REST API (for testing)
- **HTML/CSS** - UI & Styling

## 📦 How to Run Locally

```bash
# 1. Clone the repository
git clone git@github.com:anikettd/user-management-app.git
cd user-management-app

# 2. Install dependencies
npm install

# 3. Start JSON Server (in one terminal)
json-server --watch db.json --port 3000

# 4. Start Angular app (in another terminal)
ng serve --open