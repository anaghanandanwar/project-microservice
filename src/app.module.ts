import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
// import { EmployeeModule } from './employee/employee.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [ProjectModule, GraphQLModule.forRoot<ApolloFederationDriverConfig>(
    {
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
    }
  ),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'projects',
    entities: ["dist/**/*.entity{.ts,.js}"], //tell typeORM, look at this files and create a table for us
    synchronize: true, // only use  in dev env, if something is changed in entity then it will modify the database
  })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
