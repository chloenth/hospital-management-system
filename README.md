## 1️⃣ Project Overview

Hospital Management System is a web-based application built with React to manage patient records, doctor schedules, appointments, and billing. It provides a user-friendly interface for hospital staff to access and manage medical data efficiently.

## 2️⃣ Features Overviews

### Core Functionalities

- **🏥 Patient Management** – Add, update, delete, and view patient details.
- **👩‍⚕️ Doctor Schedules** – View available doctors and their appointment slots.
- **📅 Appointments** – Book, reschedule, or cancel appointments.
- **💰 Billing System** – Generate and view invoices for patient treatments.
- **📊 Dashboard** – View an overview of hospital operations and patient statistics.

### Authentication

1. **Store API Token in Cookies**:

- When the user logs in or authenticates, the API will return an access token (and a refresh token, if applicable).
- These tokens are stored securely in cookies, typically using HttpOnly cookies for added security. The HttpOnly flag ensures that the cookie is not accessible via JavaScript, mitigating potential XSS attacks.

2. **Send Token in Every Request**:

- For each subsequent request, the token stored in the cookie is automatically sent along with the request. This can be done by attaching the token to the Authorization header or by letting the browser include the cookie with every request automatically if it's set as withCredentials: true.

3. **Automatically Refresh Token if Expired**:

- When an access token expires (typically after a certain period), a 401 Unauthorized response will be triggered.
- The system will attempt to refresh the token using a refresh token (if available). The refresh request is sent to an endpoint that returns a new access token.
  Once the token is refreshed, the failed request is retried with the new token.

## 3️⃣ Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, Shadcn/ui
- **State Management**: React Context
- **API Calls**: Axios

## 4️⃣ Installation & Setup

Follow these steps to set up the project on your local machine:

### 🔹 Prerequisites

Make sure you have:

- Node.js installed
- npm or yarn installed

### 1. Clone the Repository

Clone the repository from GitHub to your local machine and navigate into the project directory:

```bash
git clone https://github.com/chloenth/hospital-management-system.git
cd hospital-management-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

## 5️⃣ Folder Structure

📦 hospital-management
┣ 📂 src
┃ ┣ 📂 components # Reusable UI components
┃ ┣ 📂 pages # Main pages like Login, Admin, Doctors
┃ ┣ 📂 assets
┃ ┃ ┣ 📂 images # Images and icons
┃ ┃ 📂 config # 🔧 Application configuration (routes, API, roles)
┃ ┃ ┣ 📜 apis.js # Stores API endpoint constants for making network requests.
┃ ┃ ┣ 📜 roles.js # Manages user roles and permissions.
┃ ┃ ┣ 📜 routes.js # Defines all application routes for navigation.
┃ ┃ ┣ 📜 index.js # Centralized export file to manage and import configurations easily.
┃ ┣ 📂 hooks # Custom React hooks
┃ ┣ 📂 contexts # Context API for state management
┃ ┣ 📂 routes # Application routing (public & private routes with associated components and layouts)
┃ ┣ 📂 services # API calls and business logic (e.g., login, logout, getMyInfo)
┃ ┣ 📂 utils
┃ ┃ ┣ 📜 httpRequest.js # Defines an Axios instance with automatic token refresh functionality
┃ ┗ 📜 App.js # Main component
┣ 📜 package.json # Dependencies
┣ 📜 README.md # Documentation
