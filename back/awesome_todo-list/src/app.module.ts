import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { TaskModule } from './task/task.module';
import { Task } from './task/entities/task.entity';
import { IsUniqueConstraint } from './validation/unique/is-unique-constraint';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'admin',
      username: 'postgres',
      entities: [User, Task],
      database: 'awesome_todo-list',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule {}
