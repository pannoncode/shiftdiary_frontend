const passwordCheck = (password1, password2) => {
  if (password1 !== password2) {
    return {
      validColor: "warning",
      passValidError: true,
      passErrorHelper: "A két jelszó nem egyezik",
      disabledButton: true,
    };
  } else {
    return {
      validColor: "success",
      passValidError: false,
      passErrorHelper: "",
      disabledButton: false,
    };
  }
};

export default passwordCheck;
