Setup & Installation Instructions
1. Clone the Repository:
 git clone https://github.com/pratikraundale12/Ship-Management.git
 cd Ship-Management
2. Install Dependencies:
 npm install
3. Run the Application:
 npm start
4. Build for Production:
 npm run build
5. Lint the Code:
 npm run lint

Application Architecture Overview
SHIP-MANAGEMENT/
│
├── node_modules/
├── public/
│
├── src/
│   ├── components/
│   │   ├── Authentication/
│   │   │   └── LoginForm.jsx
│   │   ├── Components/
│   │   │   └── ComponentsPage.jsx
│   │   ├── Dashboard/
│   │   │   ├── Charts.jsx
│   │   │   ├── KPICards.css
│   │   │   └── KPICards.jsx
│   │   ├── Jobs/
│   │   │   ├── Notification/
│   │   │   ├── JobCalendar.jsx
│   │   │   ├── JobForm.jsx
│   │   │   └── JobList.jsx
│   │   ├── Notifications/
│   │   │   └── NotificationCenter.jsx
│   │   └── Ships/
│   │       ├── ShipList.jsx
│   │       ├── Layout.jsx
│   │       ├── Navbar.jsx
│   │       └── RootLayout.jsx
│
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   ├── ComponentsContext.jsx
│   │   ├── EngineersContext.jsx
│   │   ├── JobsContext.js
│   │   ├── JobsContext.jsx
│   │   ├── ShipsContext.jsx
│   │   └── ThemeContext.jsx
│
│   ├── pages/
│   │   ├── DashboardPage.css
│   │   ├── DashboardPage.jsx
│   │   ├── JobsPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── MaintenanceCalendar.jsx
│   │   ├── ShipDetailPage.jsx
│   │   ├── ShipsPage.jsx
│   │   └── SignupPage.jsx
│
│   ├── styles/
│   │   └── main.css
│
│   ├── utils/
│   │   ├── localStorageUtils.js
│   │   └── roleUtils.js
│
│   ├── App.jsx
│   ├── index.js
│   └── reportWebVitals.js
│
├── package.json
├── package-lock.json
└── README.md


Routing: React Router
Styling: CSS Modules
Component Structure: Feature-based

Known Issues or Limitations
- No backend integration yet; data is mocked
- Basic auth logic
- Static charts

Technical Decisions & Notes
- Feature-based component grouping
