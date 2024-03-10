export const userFormCheck = (email, name, password, password2, permission) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (
    email.length === 0 ||
    !email.match(emailRegex) ||
    name.length === 0 ||
    password.length < 6 ||
    password2.length < 6
  ) {
    return false;
  }

  let userData = {
    email,
    name,
    password,
    permission,
  };
  return userData;
};

//profil oldal felhasználó adatok szerkesztése
export const userProfilCheck = (
  email,
  name,
  password,
  password2,
  permission
) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (
    password === "" &&
    password2 === "" &&
    email.length !== 0 &&
    email.match(emailRegex) &&
    name.length !== 0
  ) {
    let userData = {
      email,
      name,
      permission,
    };

    return userData;
  } else if (
    password !== "" &&
    password2 !== "" &&
    email.length !== 0 &&
    email.match(emailRegex) &&
    name.length !== 0
  ) {
    let userData = {
      email,
      name,
      password,
      permission,
    };

    return userData;
  } else if (
    (password === "" && password2 === "" && email.length === 0) ||
    !email.match(emailRegex) ||
    name.length === 0
  ) {
    return false
  }
};
