import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ethers,
  zeroPadValue,
  encodeBytes32String,
  isBytesLike,
  toUtf8Bytes,
  parseEther,
  formatEther,
  LogDescription,
} from 'ethers';
import { abi, address } from '../../../abis/Calculator.json';

@Injectable()
export class EthersService {
  private provider: ethers.JsonRpcProvider;
  private signer: ethers.Wallet;
  private contract: ethers.Contract;

  constructor(private configService: ConfigService) {
    const rpcUrl = this.configService.get<string>('RPC_URL');
    const privateKey = this.configService.get<string>('PRIVATE_KEY');

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.signer = new ethers.Wallet(privateKey!, this.provider);
    this.contract = new ethers.Contract(address, abi, this.signer);
  }

  zeroPadValue32(data: string) {
    return zeroPadValue(data, 32);
  }

  encodeBytes32String(data: string) {
    return encodeBytes32String(data);
  }

  isBytesLike(data: string) {
    return isBytesLike(data);
  }

  toUtf8Bytes(data: string) {
    return toUtf8Bytes(data);
  }

  parseEther(data: string) {
    return parseEther(data);
  }

  formatEther(data: bigint) {
    return formatEther(data);
  }

  // 위 코드는 지우지 마세요.

  async calculate(a: number, b: number, operation: string): Promise<number> {
    const tx = await this.contract.calculate(a, b, operation);
    const receipt = await tx.wait();

    const event = receipt.logs
      .map((log) => {
        try {
          return this.contract.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .find(
        (parsed): parsed is LogDescription =>
          parsed !== null && parsed.name === 'Calculate'
      );

    if (!event) {
      throw new Error('Calculate event not found');
    }

    return Number(event.args.result);
  }

  async getLastResult(address: string) {
    // Todo: getLastResult의 값을 리턴합니다.

    return this.contract.getLastResult(address);
  }

  async getHistoryLength(address: string) {
    // Todo: getHistoryLength의 값을 리턴합니다.

    return this.contract.getHistoryLength(address);
  }

  async getHistoryItem(address: string) {
    // Todo: getHistoryItem의 값을 리턴합니다.

    return this.contract.getHistoryItem(address);
  }
}
