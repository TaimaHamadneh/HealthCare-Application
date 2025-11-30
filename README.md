# Healthcare Management Application
A Full-Stack Project (MongoDB • React • Node.js). It implements a simple healthcare workflow involving Admin, Patients, Doctors, and Finance roles.
<p align="center">
<img width="1653" height="881" alt="image" src="https://github.com/user-attachments/assets/49264ba1-835b-4e7d-8bd8-857eecd05935" />
<img width="1470" height="865" alt="image" src="https://github.com/user-attachments/assets/ead97f53-a1d4-424e-86fb-97fb513b15d4" />

  </p>
---

## 📌 Project Summary:
This application manages patient visits within a healthcare clinic.
Each user type has its own features, access level, and workflow.

---

## User Roles & Features

#### Patient
- Login to the system
- Reserve (book) a visit with a doctor
- Check thier visits history

#### Doctor
- Login to their dashboard
- Start a patient visit
- Add multiple treatments to each visit
- Each treatment includes a name + value
- The visit total amount is automatically calculated

#### Finance
- Login and review completed visits
- Review doctor notes & total visit cost
- Search visits by: Patient name, Doctor name, Visit ID, Or multiple fields combined
- Validate the final amount required from the patient.

---

## Key System Rules

- Each doctor can only handle one active visit at a time
- A visit contains multiple treatments, each with its own value
- Total visit amount = sum of all treatments (calculated automatically)
- Finance can search visits using multiple filters

---
