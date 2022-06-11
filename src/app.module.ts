import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { QuestionModule } from './question/qiestion.module';
import ormconfig from './ormconfig';
import { VariantModule } from './variant/variant.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './auth/middlewares/auth.middleware';
import { RolesModule } from './roles/roles.module';
import { CurrentUserMiddleware } from './auth/middlewares/current-user.middleware';
import { UserResultsModule } from './user-results/user-results.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormconfig),
    QuestionModule,
    VariantModule,
    UserModule,
    RolesModule,
    UserResultsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
    // consumer.apply(CurrentUserMiddleware).forRoutes({
    //   path: '*',
    //   method: RequestMethod.ALL,
    // });
  }
}
