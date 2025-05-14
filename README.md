🚢 Ship Maintenance Dashboard – ENTNT Technical Assignment
📦 Setup & Installation Instructions

1. Clone the Repository:
git clone https://github.com/pratikraundale12/Ship-Management.git
cd Ship-Management

2. Install Dependencies:
npm install

3. Run the Application:
npm start

4.Build for Production:
npm run build

Application Architecture Overview

{"type":"excalidraw/clipboard","workspaceId":"oscTKRBs50JpLGuLREzt","elements":[{"modifiedBy":"-OQ7kEe5N3zruAbr4aFf","modifiedAt":1747217600445,"userId":"jwyUqhrPy7M6KUyqNQEnbCwKHTF3","id":"SzseN8qkchry7jMKLt9S5","x":-6053.003023737367,"y":-384.1136714334019,"version":131,"versionNonce":716506681,"scale":0.875,"fontSize":20,"textAlign":"left","strokeColor":"#000000","fontFamily":2,"mode":"code-block","text":"SHIP-MANAGEMENT/\n│\n├── node_modules/\n├── public/\n│\n├── src/\n│ ├── components/\n│ │ ├── Authentication/\n│ │ │ └── LoginForm.jsx\n│ │ ├── Components/\n│ │ │ └── ComponentsPage.jsx\n│ │ ├── Dashboard/\n│ │ │ ├── Charts.jsx\n│ │ │ ├── KPICards.css\n│ │ │ └── KPICards.jsx\n│ │ ├── Jobs/\n│ │ │ ├── Notification/\n│ │ │ ├── JobCalendar.jsx\n│ │ │ ├── JobForm.jsx\n│ │ │ └── JobList.jsx\n│ │ ├── Notifications/\n│ │ │ └── NotificationCenter.jsx\n│ │ └── Ships/\n│ │ ├── ShipList.jsx\n│ │ ├── Layout.jsx\n│ │ ├── Navbar.jsx\n│ │ └── RootLayout.jsx\n│\n│ ├── contexts/\n│ │ ├── AuthContext.jsx\n│ │ ├── ComponentsContext.jsx\n│ │ ├── EngineersContext.jsx\n│ │ ├── JobsContext.js\n│ │ ├── JobsContext.jsx\n│ │ ├── ShipsContext.jsx\n│ │ └── ThemeContext.jsx\n│\n│ ├── pages/\n│ │ ├── DashboardPage.css\n│ │ ├── DashboardPage.jsx\n│ │ ├── JobsPage.jsx\n│ │ ├── LoginPage.jsx\n│ │ ├── MaintenanceCalendar.jsx\n│ │ ├── ShipDetailPage.jsx\n│ │ ├── ShipsPage.jsx\n│ │ └── SignupPage.jsx\n│\n│ ├── styles/\n│ │ └── main.css\n│\n│ ├── utils/\n│ │ ├── localStorageUtils.js\n│ │ └── roleUtils.js\n│\n│ ├── App.jsx\n│ ├── index.js\n│ └── reportWebVitals.js\n│\n├── package.json\n├── package-lock.json\n└── README.md","roughness":0,"slate":[{"type":"code-block","children":[{"text":"SHIP-MANAGEMENT/\n│\n├── node_modules/\n├── public/\n│\n├── src/\n│ ├── components/\n│ │ ├── Authentication/\n│ │ │ └── LoginForm.jsx\n│ │ ├── Components/\n│ │ │ └── ComponentsPage.jsx\n│ │ ├── Dashboard/\n│ │ │ ├── Charts.jsx\n│ │ │ ├── KPICards.css\n│ │ │ └── KPICards.jsx\n│ │ ├── Jobs/\n│ │ │ ├── Notification/\n│ │ │ ├── JobCalendar.jsx\n│ │ │ ├── JobForm.jsx\n│ │ │ └── JobList.jsx\n│ │ ├── Notifications/\n│ │ │ └── NotificationCenter.jsx\n│ │ └── Ships/\n│ │ ├── ShipList.jsx\n│ │ ├── Layout.jsx\n│ │ ├── Navbar.jsx\n│ │ └── RootLayout.jsx\n│\n│ ├── contexts/\n│ │ ├── AuthContext.jsx\n│ │ ├── ComponentsContext.jsx\n│ │ ├── EngineersContext.jsx\n│ │ ├── JobsContext.js\n│ │ ├── JobsContext.jsx\n│ │ ├── ShipsContext.jsx\n│ │ └── ThemeContext.jsx\n│\n│ ├── pages/\n│ │ ├── DashboardPage.css\n│ │ ├── DashboardPage.jsx\n│ │ ├── JobsPage.jsx\n│ │ ├── LoginPage.jsx\n│ │ ├── MaintenanceCalendar.jsx\n│ │ ├── ShipDetailPage.jsx\n│ │ ├── ShipsPage.jsx\n│ │ └── SignupPage.jsx\n│\n│ ├── styles/\n│ │ └── main.css\n│\n│ ├── utils/\n│ │ ├── localStorageUtils.js\n│ │ └── roleUtils.js\n│\n│ ├── App.jsx\n│ ├── index.js\n│ └── reportWebVitals.js\n│\n├── package.json\n├── package-lock.json\n└── README.md"}]}],"verticalAlign":"middle","width":541.1388450445138,"height":925.1666870117188,"seed":44587259,"hasFixedBounds":true,"zIndex":10,"isDeleted":false,"type":"textbox","opacity":100,"angle":0,"shouldApplyRoughness":true,"groupIds":[],"boundElementIds":null,"lockedGroupId":null,"diagramId":null,"lockedContainerId":null,"figureId":null,"backgroundColor":"transparent","fillStyle":"solid","strokeWidth":1,"strokeStyle":"solid","strokeSharpness":"round","parentElementMetadata":null}]}


🔐 User Roles & Access
This app uses role-based access. Use the following test credentials:
| Role      | Email                   | Password       | Notes                                                |
| --------- | ----------------------- | -------------- | ---------------------------------------------------- |
| Admin     | `admin@example.com`     | `admin123`     | Full access                                          |
| Inspector | `inspector@example.com` | `inspector123` | Cannot create/edit/update jobs                       |

Routing: React Router
Styling: CSS Modules
Component Structure: Feature-based

🚧 Known Issues or Limitations
- No backend integration (data is mocked with localStorage)
- Basic authentication logic (not secure for production)
- Static charts (data visualizations are not dynamic)
- Some part are not responsive 
- No form-level input validation on all fields (optional improvement)

💡 Technical Decisions & Notes
- Chose feature-based folder structure for better scalability and maintainability
- Used CSS Modules for scoped and modular styling
- Chose localStorage to simulate persistent state as per requirements
- Implemented role-based access control entirely on the frontend
- Built with React functional components and Hooks
