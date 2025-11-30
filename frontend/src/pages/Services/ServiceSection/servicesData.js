import { FaHeartbeat } from "react-icons/fa";          
import { FaBrain } from "react-icons/fa";                
import { GiBoneKnife } from "react-icons/gi";            
import { FaBaby } from "react-icons/fa";                 
import { FaTooth } from "react-icons/fa";               
import { FaUserMd } from "react-icons/fa";          


export const services = [
  {
    id: 1,
    icon: FaHeartbeat,
    title: "Cardiology",
    description: "Heart care including tests, treatment, and prevention.",
    details: [
      "Heart CT Scan",
      "Echo Test",
      "Angioplasty",
      "Pacemaker",
      "Heart Recovery Program"
    ],
    emergency: true
  },
  {
    id: 2,
    icon: FaBrain,
    title: "Neurology",
    description: "Care for brain and nerve conditions.",
    details: [
      "EEG & EMG Tests",
      "Stroke Care",
      "Epilepsy Treatment",
      "MS Care",
      "Brain Surgery"
    ],
    emergency: true
  },
  {
    id: 3,
    icon: GiBoneKnife,
    title: "Orthopedics",
    description: "Care for bones, joints, muscles, and spine.",
    details: [
      "Joint Replacement",
      "Arthroscopy",
      "Fracture Care",
      "Sports Injuries",
      "Physical Therapy"
    ],
    emergency: false
  },
  {
    id: 4,
    icon: FaBaby,
    title: "Pediatrics",
    description: "Healthcare for babies, children, and teens.",
    details: [
      "Check-ups",
      "Vaccines",
      "Growth Screening",
      "Child Emergency",
      "Child Psychology"
    ],
    emergency: true
  },
  {
    id: 5,
    icon: FaTooth,
    title: "Dental Care",
    description: "Dental services for healthy teeth and a great smile.",
    details: [
      "Teeth Cleaning",
      "Cosmetic Dentistry",
      "Root Canal",
      "Dental Implants",
      "Braces"
    ],
    emergency: true
  },
  {
    id: 6,
    icon: FaUserMd,
    title: "Mental Health",
    description: "Support for emotional and mental well-being.",
    details: [
      "Private Therapy",
      "Group Counseling",
      "Psychiatric Check",
      "Addiction Care",
      "Crisis Help"
    ],
    emergency: true
  }
];


export const emergencyServices = [
  {
    title: "24/7 Emergency Care",
    description: "Fast help for serious medical problems"
  },
  {
    title: "Trauma Center",
    description: "Care for major injuries"
  },
  {
    title: "Emergency Surgery",
    description: "Immediate surgery when needed"
  },
  {
    title: "Critical Care Unit",
    description: "Special ICU monitoring"
  }
];
