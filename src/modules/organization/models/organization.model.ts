import { UserOrganizationModel } from 'src/modules/auth/models/user-organization.model';
import { UserModel } from 'src/modules/auth/models/user.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export const defaultOrganizationName = () => 'New Organization';
@Entity()
export class OrganizationModel {
  constructor(name: string) {
    this.name = name;
  }
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ nullable: false })
  public name: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToMany(
    () => UserOrganizationModel,
    (userOrganization) => userOrganization.user,
    { nullable: true },
  )
  public users?: UserModel[];
}
