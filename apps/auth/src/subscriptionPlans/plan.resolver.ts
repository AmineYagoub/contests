import {
  Args,
  Query,
  Mutation,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import {
  CreateSubscriptionPlansDto,
  UpdateSubscriptionPlansDto,
} from '@contests/dto/auth';
import { isPublic } from '@contests/utils';
import { Membership } from './membership.model';
import { SubscriptionPlan } from './plan.model';
import { SubscriptionPlanService } from './plan.service';

@Resolver(() => SubscriptionPlan)
export class SubscriptionPlanResolver {
  constructor(private planService: SubscriptionPlanService) {}

  @isPublic()
  @Query(() => Boolean, { nullable: true })
  async updateMembershipsJob() {
    await this.planService.updateMembershipsJob();
    return true;
  }

  @isPublic()
  @Query(() => SubscriptionPlan)
  async findSubscriptionPlan(@Args('id') id: string) {
    return this.planService.findUnique({ id });
  }

  @isPublic()
  @Query(() => Membership, { nullable: true })
  async findMembershipByProfileId(@Args('id') id: string) {
    return this.planService.findMembershipByProfileId(id);
  }

  @isPublic()
  @Query(() => [SubscriptionPlan])
  async findAllSubscriptionPlans() {
    return this.planService.findAll();
  }

  @isPublic()
  @Mutation(() => SubscriptionPlan)
  async updateSubscriptionPlan(
    @Args('id') id: string,
    @Args('input') data: UpdateSubscriptionPlansDto
  ) {
    return this.planService.update({ data, where: { id } });
  }

  @isPublic()
  @Mutation(() => SubscriptionPlan)
  async createSubscriptionPlan(
    @Args('input') data: CreateSubscriptionPlansDto
  ) {
    return this.planService.create(data);
  }

  @isPublic()
  @Mutation(() => SubscriptionPlan, { nullable: true })
  async deleteSubscriptionPlanById(@Args('id') id: string) {
    return this.planService.delete({ id });
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }) {
    return this.planService.findUnique({ id: reference.id });
  }
}
