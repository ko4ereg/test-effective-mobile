import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";
import { Exclude } from "class-transformer";

export type UserRole = "admin" | "user";

@Entity({ name: "users" })
@Index(["email"], { unique: true })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullName!: string;

  @Column({ type: "date" })
  birthDate!: string; // ISO date string

  @Column()
  email!: string;

  @Column()
  @Exclude() 
  password!: string;

  @Column({ type: "varchar", default: "user" })
  role!: UserRole;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
