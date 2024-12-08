export const users = [
  {
    id: 1,
    email: "abc@gmail.com",
    password: "123",
    name: "employee",
  },
];

export const handleSignUpModel = (user) => {
  const existingUser = users.find((u) => u.email === user.email);
  if (existingUser) return false; // User already exists
  const id = users.length + 1;
  users.push({ ...user, id });
  return true;
};

export const handleLoginModel = (user) => {
  const existingUser = users.find(
    (u) => u.email === user.email && u.password === user.password
  );
  return existingUser || null; // Return user or null if not found
};
