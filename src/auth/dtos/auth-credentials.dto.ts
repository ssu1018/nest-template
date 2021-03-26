import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Matches
} from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d].*$/, {
    message: 'password too weak'
  }) // 두번째 인자로 custom error msg를 넘긴다.
  password: string;
}

// controller에 validation pipe을 삽입하면 dto의 그것 가능
