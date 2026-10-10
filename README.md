# Mediyog Hospital Website

Mediyog Hospital is a full-stack hospital website developed to help patients access information about doctors, departments, and healthcare services. It also provides an appointment booking feature and an admin portal for managing hospital appointments.

The project is built using React.js for the frontend and Python FastAPI for the backend. The frontend and backend are deployed separately using Vercel and Render.

## Features

- Responsive design for desktop and mobile devices
- Home page with hospital information
- Doctors section with professional details
- Medical departments and healthcare services
- Online doctor appointment booking
- Admin portal for appointment management
- REST API built with FastAPI
- Frontend and backend deployment support

## Technologies Used

**Frontend**
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

**Backend**
- Python
- FastAPI
- Uvicorn

**Tools and Deployment**
- Git and GitHub
- Vercel
- Render

## Project Structure

```text
Mediyog_Hospital/
├── backend/
├── frontend/
├── .gitignore
├── package.json
├── package-lock.json
├── requirements.txt
└── vercel.json
```

The `frontend` directory contains the React application, while the `backend` directory contains the FastAPI application and its API endpoints.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js and npm
- Python 3
- Git

### Clone the Repository

```bash
git clone https://github.com/abhi72609/Mediyog_Hospital.git
cd Mediyog_Hospital
```

### Run the Frontend

Open a terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

### Run the Backend

Open another terminal and navigate to the backend directory:

```bash
cd backend
python -m venv venv
```

On Windows, activate the virtual environment:

```powershell
.\venv\Scripts\Activate.ps1
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Start the backend server:

```bash
python -m uvicorn main:app --reload
```

The backend will run at `http://127.0.0.1:8000`.

To access the FastAPI documentation, open `http://127.0.0.1:8000/docs` in your browser.

## Deployment

The Mediyog Hospital website is being developed for practical use by hospital staff and patients. The frontend is deployed on Vercel, and the backend API is hosted on Render.

The project aims to simplify access to hospital information and make doctor appointment booking more convenient for patients.

## Contributors

- Abhishek Kumar Raj
- Amitash Mishra

## Project Status

The website is being developed for delivery to the hospital. Further improvements and updates will be made based on the hospital's requirements and feedback.
