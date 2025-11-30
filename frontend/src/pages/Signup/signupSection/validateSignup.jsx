export const validateSignup = (formData) => {
    const errors = {};
  
    if (!formData.name.trim()) errors.name = "Full name is required";
  
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
  
    const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (!passwordRegex.test(formData.password)) {
    errors.password =
      'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
  }
  
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
  
    if (formData.role === "doctor") {
      if (!formData.specialization) errors.specialization = "Specialization required";
      if (!formData.licenseNumber) errors.licenseNumber = "License number required";
    }
  
    return errors;
  };
  