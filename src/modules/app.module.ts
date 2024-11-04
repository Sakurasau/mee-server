import { Module } from '@nestjs/common';
import { AppController } from '@/controllers/app.controller';
import { AppService } from '@/services/app.service';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
