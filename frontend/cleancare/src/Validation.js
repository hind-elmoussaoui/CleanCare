export const validateEmail = (email) => {
    if (!email) return "L'email est requis";
    if (!/\S+@\S+\.\S+/.test(email)) return "Email invalide";
    return null;
  };
  
  export const validatePassword = (password) => {
    if (!password) return "Le mot de passe est requis";
    if (password.length < 6) return "Le mot de passe doit avoir au moins 6 caractères";
    return null;
  };
  
  export const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) return "Les mots de passe ne correspondent pas";
    return null;
  };
  
  export const validateName = (name, fieldName) => {
    if (!name) return `Le ${fieldName} est requis`;
    if (name.length < 2) return `Le ${fieldName} doit avoir au moins 2 caractères`;
    return null;
  };
  
  export const validatePhone = (phone) => {
    if (!phone) return "Le téléphone est requis";
    if (phone.length < 10) return "Numéro de téléphone invalide";
    return null;
  };