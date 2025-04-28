/* eslint-disable @typescript-eslint/no-explicit-any */
import { UnprocessableEntityException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export async function validateResponse<T1>(
  dto: any,
  data: any,
  throwError = true,
) {
  const result = plainToInstance(dto, data, {
    strategy: 'excludeAll',
    enableImplicitConversion: true,
  });
  const isValid = await validate(result);
  if (isValid.length && throwError) {
    throw new UnprocessableEntityException(isValid);
  }
  return result as T1;
}
