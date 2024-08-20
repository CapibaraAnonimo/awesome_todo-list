import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  user_name: string;

  @Column({ type: 'varchar', length: 15 })
  password: string;

  @Column({ type: 'varchar', length: 30 })
  email: string;
}
