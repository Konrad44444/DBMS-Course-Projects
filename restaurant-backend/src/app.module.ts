import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { DishModule } from './modules/dish/dish.module';

@Module({
  imports: [PrismaModule, DishModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
