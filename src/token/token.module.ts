import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from 'src/models/token.model';
@Global()
@Module({
    imports: [
      MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    ],
    exports: [],
  })
export class TokenModule {}
