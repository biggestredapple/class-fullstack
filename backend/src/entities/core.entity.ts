import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class CoreEntity {
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date;
}
