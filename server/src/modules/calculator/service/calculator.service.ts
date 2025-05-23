import { Injectable } from '@nestjs/common';
import { EthersService } from '../../ethers/ethers.service';
import { exceptions } from '../../../common/exceptions/exception.config';

@Injectable()
export class CalculatorService {
  constructor(private readonly ethersService: EthersService) { }

  async calculate(a: number, b: number, operation: string) {
    try {
      // Todo: calculate의 값을 리턴합니다.
      return this.ethersService.calculate(a, b, operation);
      return;
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


      return;
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
      if (error.reason == "No calculation history") {
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

      return;
    } catch (error) {
      //  Todo: 에러를 응답합니다.(exceptions.createBadRequestException(error.message))
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

      return;
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
    }
  }
}
