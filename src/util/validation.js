const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Firebase error messages mapping
const firebaseErrorMessages = {
  "auth/email-already-in-use": "This email is already registered.",
  "auth/invalid-email": "Invalid email format.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/user-not-found": "No account found with this email.",
  "auth/invalid-credential": "Incorrect password. Please try again.",
  "auth/too-many-requests": "Too many failed attempts. Try again later.",
  "auth/missing-email": "Email is required.",
};

export const getFirebaseErrorMessage = (errorCode) => {
  return firebaseErrorMessages[errorCode] || "An unexpected error occurred.";
};

// Validate Register Form
export const validateRegister = (
  email,
  password,
  username,
  confirmPassword,
  firebaseError = ""
) => {
  let errorMessages = {};

  if (!email && !password && !confirmPassword && !username) {
    errorMessages.fields = "All fields are required to register.";
    return {
      isValid: false,
      errors: { fields: "All fields are required to register." },
    };
  }

  if (!email) {
    errorMessages.email = "Email is required.";
  } else if (!isValidEmail(email)) {
    errorMessages.email = "Invalid email format.";
  }

  if (!username) {
    errorMessages.username = "Username is required.";
  } else if (username.length < 5) {
    errorMessages.username = "Username should be at least 5 characters.";
  }

  if (!password) {
    errorMessages.password = "Password is required.";
  } else if (password.length < 6) {
    errorMessages.password = "Password should be at least 6 digits.";
  }

  if (!confirmPassword) {
    errorMessages.confirmPassword = "Please confirm your password.";
  } else if (password !== confirmPassword) {
    errorMessages.confirmPassword = "Passwords do not match.";
  }

  // Handle Firebase errors if present
  if (firebaseError) {
    return { isValid: false, error: getFirebaseErrorMessage(firebaseError) };
  }

  return {
    isValid: Object.keys(errorMessages).length === 0,
    errors: errorMessages,
  };
};

// Validate Login Form
export const validateLogin = (email, password, firebaseError = "") => {
  if (!email || !password) {
    return { isValid: false, error: "All fields are required." };
  }
  if (!isValidEmail(email)) {
    return { isValid: false, error: "Invalid email format." };
  }

  // Handle Firebase errors if present
  if (firebaseError) {
    return { isValid: false, error: getFirebaseErrorMessage(firebaseError) };
  }
  console.log(getFirebaseErrorMessage(firebaseError));

  return { isValid: true, error: "" };
};
