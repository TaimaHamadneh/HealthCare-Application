export const loginUser = async (loginFn, email, password) => {
    const result = await loginFn(email, password);
    return result;
  };
  