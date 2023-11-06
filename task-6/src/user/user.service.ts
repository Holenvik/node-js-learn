import { User } from "./user.model";
import * as userRepository from "./user.repository";

export async function getAllUsers(): Promise<User[]> {
  return userRepository.getAllUsers();
}

export async function getUserById(id: string): Promise<User | null> {
  return userRepository.getUserById(id);
}

export async function createUser(userData: User): Promise<User> {
  return userRepository.createUser(userData);
}

export async function updateUser(
  id: string,
  updatedUserData: Partial<User>
): Promise<User | null> {
  return userRepository.updateUser(id, updatedUserData);
}

export async function deleteUser(id: string): Promise<void> {
  return userRepository.deleteUser(id);
}
