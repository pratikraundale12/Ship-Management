🚢 Ship Maintenance Dashboard – ENTNT Technical Assignment

📦 Setup & Installation Instructions

1. Clone the Repository:
git clone https://github.com/pratikraundale12/Ship-Management.git
cd Ship-Management

2. Install Dependencies:
npm install

3. Run the Application:
npm start

4. Build for Production:
npm run build

Application Architecture Overview

![image](https://github.com/user-attachments/assets/430e1932-f3c6-4bec-a2fb-a4420bb22cdc)


🔐 User Roles & Access
This app uses role-based access. Use the following test credentials:
| Role      | Email                   | Password       | Notes                                                |
| --------- | ----------------------- | -------------- | ---------------------------------------------------- |
| Admin     | `admin@example.com`     | `admin123`     | Full access                                          |
| Inspector | `inspector@example.com` | `inspector123` | Cannot create/edit/update jobs                       |
| Engineer  | `engineer@example.com`  |  `engineer123` | Full access (same as Admin)                          |
Routing: React Router
Styling: CSS Modules
Component Structure: Feature-based

**NOTE: The dashboard and Charts are assign with hardcoded values can't chnage 
NOTE: Some part of the application may or may not be responsive 
**

🚧** Known Issues or Limitations**
- No backend integration (data is mocked with localStorage)
- Basic authentication logic (not secure for production)
- Static charts (data visualizations are not dynamic)
- Some part are not responsive 
- No form-level input validation on all fields (optional improvement)

**💡 Technical Decisions & Notes**
- Chose feature-based folder structure for better scalability and maintainability
- Used CSS Modules for scoped and modular styling
- Chose localStorage to simulate persistent state as per requirements
- Implemented role-based access control entirely on the frontend
- Built with React functional components and Hooks
