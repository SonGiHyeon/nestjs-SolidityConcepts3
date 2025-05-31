import { Injectable } from '@nestjs/common';
import { EthersService } from '../../ethers/ethers.service';
import { exceptions } from '../../../common/exceptions/exception.config';

@Injectable()
export class CalculatorService {
  constructor(private readonly ethersService: EthersService) { }

  async calculate(a: number, b: number, operation: string) {
    try {
      // Todo: calculate의 값을 리턴합니다.

      return await this.ethersService.calculate(a, b, operation);
    } catch (error) {
      //  Todo: 에러를 응답합니다.(exceptions.createBadRequestException(error.message))
      throw exceptions.createBadRequestException(error.message);
    }
  }

  async getLastResult(address: string) {
    try {
      /*
        Todo: getLastResult의 값을 리턴합니다.
        ⚠️ bigint 타입은 JSON으로 변환 시 number로 변환 필요
      
        - 리턴 예시:
          {
            a: 10,
            b: 5,
            result: 15,
            operation: 'add'
          }
      */

      const getLastResult = await this.ethersService.getLastResult(address);
      if (getLastResult.length === 0) {
        throw exceptions.NO_CALCULATION_HISTORY;
      }

      // console.log(getLastResult);

      const [a, b, result, operation] = getLastResult;
      // console.log(a, b, result, operation);

      return {
        a: Number(a),
        b: Number(b),
        result: Number(result),
        operation: operation,
      };
    } catch (error) {
      /*
        Todo: 스마트 컨트랙트에서 발생한 오류 유형에 따라 예외를 정의합니다.

        - 예외: 컨트랙트에서 에러 처리를 응답으로 반환
          → getLastResult 함수 호출 시 실행 이력이 없는 address의 에러로 "No calculation history"가 반환된 경우
          → exceptions.NO_CALCULATION_HISTORY 반환

          예시:
          error.reason === "No calculation history"

        - 예외: 그 외 오류들
          → exceptions.createBadRequestException(error.message)
      */

      if (error.reason === 'No calculation history') {
        throw exceptions.NO_CALCULATION_HISTORY;
      }
      throw exceptions.createBadRequestException(error.message);
    }
  }

  async getHistoryLength(address: string) {
    try {
      // Todo: getHistoryLength의 값을 리턴합니다.
      // ⚠️ bigint 타입은 JSON으로 변환 시 number로 변환 필요
      // length가 없을 시 NO_CALCULATION_HISTORY 오류 반환

      const getHistoryLength = Number(
        await this.ethersService.getHistoryLength(address)
      );

      // console.log(getHistoryLength);
      if (getHistoryLength <= 0) {
        throw exceptions.NO_CALCULATION_HISTORY;
      }

      // console.log('getHistoryLength', getHistoryLength);
      return getHistoryLength;
    } catch (error) {
      //  Todo: 에러를 응답합니다.(exceptions.createBadRequestException(error.message))

      throw exceptions.createBadRequestException(error.message);
    }
  }

  async getHistoryItem(address: string) {
    try {
      /*
        Todo: getLastResult의 값을 리턴합니다.
        ⚠️ bigint 타입은 JSON으로 변환 시 number로 변환 필요
      
        - 리턴 예시:
          [
            {
              a: 10,
              b: 5,
              result: 15,
              operation: 'add'
            },
            {
              a: 20,
              b: 5,
              result: 25,
              operation: 'add'
            },
            ...
          ]
      */

      const res: {
        a: number;
        b: number;
        result: number;
        operation: string;
      }[] = [];
      const getHistoryItem = await this.ethersService.getHistoryItem(address);

      console.log(getHistoryItem);

      getHistoryItem.forEach((item) => {
        res.push({
          a: Number(item.a),
          b: Number(item.b),
          result: Number(item.result),
          operation: item.operation,
        });
      });

      return res;
    } catch (error) {
      /*
        Todo: 스마트 컨트랙트에서 발생한 오류 유형에 따라 예외를 정의합니다.

        - 예외: 컨트랙트에서 에러 처리를 응답으로 반환
          → getLastResult 함수 호출 시 실행 이력이 없는 address의 에러로 "No calculation history"가 반환된 경우
          → exceptions.NO_CALCULATION_HISTORY 반환

          예시:
          error.reason === "No calculation history"

        - 예외: 그 외 오류들
          → exceptions.createBadRequestException(error.message)
      */

      if (error.reason === 'No calculation history') {
        throw exceptions.NO_CALCULATION_HISTORY;
      }
      throw exceptions.createBadRequestException(error.message);
    }
  }
}