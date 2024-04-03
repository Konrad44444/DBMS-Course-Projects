import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { DishModule } from './modules/dish/dish.module';
import { IngredientModule } from './modules/ingredient/ingredient.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [PrismaModule, DishModule, IngredientModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
