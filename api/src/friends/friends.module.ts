import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { FriendModel } from './models/friend.model';

@Module({
  imports: [TypeOrmModule.forFeature([FriendModel])],
  providers: [FriendsService],
  controllers: [FriendsController],
  exports: [FriendsService],
})
export class FriendsModule {}
