import { nanoid } from "nanoid";
import { User } from "./user.model";

const users: User[] = [{ id: "1" }];

export async function getAllUsers(): Promise<User[]> {
  return users;
}

export async function getUserById(id: string): Promise<User | null> {
  return users.find((user) => user.id === id) || null;
}

export async function createUser(userData: User): Promise<User> {
  const newUser: User = { ...userData, id: nanoid() };
  users.push(newUser);
  return newUser;
}

export async function updateUser(
  id: string,
  updatedUserData: Partial<User>
): Promise<User | null> {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return null;
  }
  users[userIndex] = { ...users[userIndex], ...updatedUserData };
  return users[userIndex];
}

export async function deleteUser(id: string): Promise<void> {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
  }
}
