# Healthcare Management Application
A Full-Stack Project (MongoDB • React • Node.js). It implements a simple healthcare workflow involving Admin, Patients, Doctors, and Finance roles.
<p align="center">
<img width="900" height="800" alt="image" src="https://github.com/user-attachments/assets/ecd68490-1742-4df8-92f3-3f36fae00927" />
<img width="900" height="800" alt="image" src="https://github.com/user-attachments/assets/62eece97-5e29-45e9-843c-6720a68548c2" />
<img width="900" height="800" alt="image" src="https://github.com/user-attachments/assets/76dd209f-1c55-446f-9b89-8369208d0f95" />
<img width="900" height="800" alt="image" src="https://github.com/user-attachments/assets/1f3f96a6-998a-48da-bcc4-db13bc407125" />

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
