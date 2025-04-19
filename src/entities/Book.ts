import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Index,
} from "typeorm";

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column("varchar", { length: 255 })
    title!: string;

    @Column("varchar", { length: 255 })
    author!: string;

    @Column('int', { name: 'published_year' })
    publishedYear!: number;

    @Column('text', { array: true })
    genres!: string[];

    @Column('int')
    stock!: number;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt!: Date;

    @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
    deletedAt!: Date;
}
