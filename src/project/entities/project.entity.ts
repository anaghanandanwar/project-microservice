import { ObjectType, Field, Int, Directive, ID } from '@nestjs/graphql';
// import { Employee } from 'src/employee/entities/employee.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Directive('@key(fields: "id")') //expose Project entity to federation gateway
@Entity()
export class Project {
  @Field((type)=>ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  name:string

  @Field(() => Int)
  @Column()
  code: number

  // @Field(()=>[Employee],{nullable:true})
  // @OneToMany(()=>Employee, employee=>employee.project)
  // employees:Employee[]
}
