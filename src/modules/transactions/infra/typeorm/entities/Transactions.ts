import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('transactions')
class Transactions {
  @PrimaryColumn()
  id: string;

  @Column()
  transaction_type: number;

  @Column()
  date_occurrence: Date;

  @Column()
  movement_value: number;

  @Column()
  card: string;

  @Column()
  time_occurrence: Date;

  @Column()
  cpf: string;

  @Column()
  owner: string;

  @Column()
  store_name: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Transactions };
