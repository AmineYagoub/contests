import { App } from './app.model';
import { AppService } from './app.service';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UpdateAppConfigDto } from '@contests/dto';

@Resolver(() => App)
export class AppResolver {
  constructor(private appService: AppService) {}

  @Mutation(() => App)
  async updateAppConfig(@Args('input') data: UpdateAppConfigDto): Promise<App> {
    return this.appService.update(data);
  }

  @Query(() => App)
  async findAppConfig(): Promise<App> {
    return this.appService.find();
  }
}
