# Healthcare Management Application
A Full-Stack Web Application built with **MongoDB • React • Node.js**.  
Implements a full healthcare workflow for **Admin, Patients, Doctors, and Finance** roles.

---

## 📸 Application Preview

<img width="900" height="800" alt="image" src="https://github.com/user-attachments/assets/ecd68490-1742-4df8-92f3-3f36fae00927" />
<img width="900" height="800" alt="image" src="https://github.com/user-attachments/assets/62eece97-5e29-45e9-843c-6720a68548c2" />
<img width="900" height="800" alt="image" src="https://github.com/user-attachments/assets/76dd209f-1c55-446f-9b89-8369208d0f95" />
<img width="900" height="800" alt="image" src="https://github.com/user-attachments/assets/1f3f96a6-998a-48da-bcc4-db13bc407125" />

---

## Project Summary:
This application manages patient visits within a healthcare clinic.
Each user type has its own features, access level, and workflow.

---

# User Roles & Features

## Patient
- Login to the system
- Book a visit with a doctor
- Check thier visits history

### Screenshots
<img width="900" height="800" alt="image" src="https://github.com/user-attachments/assets/bf6f2c76-4b89-4104-8bee-efa37b54e2a4" />
<img width="900" height="800" alt="image" src="https://github.com/user-attachments/assets/704c1c00-6929-4355-b230-111efdfa5822" />
<img width="900" height="800" alt="image" src="https://github.com/user-attachments/assets/e8360c66-0c79-4b3c-8c56-3e2f688e5ec9" />

## Doctor
- Login to their dashboard
- Start a patient visit
- Add multiple treatments to each visit
- Each treatment includes a name + value
- The visit total amount is automatically calculated

### Screenshots
<img width="900" height="800" alt="image" src="https://github.com/user-attachments/assets/82501190-d492-4656-9375-2614156371ab" />
<img width="900" height="800" alt="image" src="https://github.com/user-attachments/assets/a111ad7b-0edc-4715-81f2-86a3441ad058" />


## Finance
- Login and review completed visits
- Review doctor notes & total visit cost
- Search visits by: Patient name, Doctor name, Visit ID, Or multiple fields combined
- Validate the final amount required from the patient.

### Screenshots
<img width="900" height="800" alt="image" src="https://github.com/user-attachments/assets/5cfbb168-b676-4d35-b139-39f61f29dfbb" />
  

## Admin Dashboard

### Screenshots
<img width="900" height="800" alt="image" src="https://github.com/user-attachments/assets/d7f3ec5b-07e1-43b1-b725-55aa6b3cd9af" />
<img width="900" height="800" alt="image" src="https://github.com/user-attachments/assets/dc49f6c2-fa07-4c98-90fe-3385b86b2dc5" />

---

# Key System Rules

- Each doctor can only handle one active visit at a time
- A visit contains multiple treatments, each with its own value
- Total visit amount = sum of all treatments (calculated automatically)
- Finance can search visits using multiple filters

---

# Run the application

## 1. Clone the Repository
```bash
git clone https://github.com/TaimaHamadneh/HealthCare-Application
```
## 2. Backend Setup
```bash
cd backend
npm install
```

## 3. Frontend Setup
```bash
cd frontend
npm install
```

## 4. Run the application

### Start Backend server
```bash
cd bacend
npm start
```

### Start Frontend Server
```bash
cd frontend
nom start
```

### ✔️ The application is now running!
