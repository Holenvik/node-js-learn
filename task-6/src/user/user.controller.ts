import { Request, Response } from "express";
import * as userService from "./user.service";

export async function getAllUsers(req: Request, res: Response): Promise<void> {
  const users = await userService.getAllUsers();
  res.json(users);
}

export async function getUserById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
}

export async function createUser(req: Request, res: Response): Promise<void> {
  const userData = req.body;
  const newUser = await userService.createUser(userData);
  res.status(201).json(newUser);
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const updatedUserData = req.body;
  const updatedUser = await userService.updateUser(id, updatedUserData);
  if (!updatedUser) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(updatedUser);
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  await userService.deleteUser(id);
  res.json({ message: "User deleted successfully" });
}
