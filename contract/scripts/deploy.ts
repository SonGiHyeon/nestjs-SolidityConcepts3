import { ethers } from 'hardhat';
import { makeAbi } from './abiGenerator';

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  // 1. MathLibrary 배포
  const MathLibFactory = await ethers.getContractFactory('MathLibrary');
  const mathLib = await MathLibFactory.deploy();
  await mathLib.waitForDeployment();
  console.log(`MathLibrary deployed at: ${mathLib.target}`);

  // 2. Calculator에 라이브러리 연결하여 배포
  const CalculatorFactory = await ethers.getContractFactory('Calculator', {
    libraries: {
      MathLibrary: mathLib.target,
    },
  });

  const calculator = await CalculatorFactory.deploy();
  await calculator.waitForDeployment();
  console.log(`Calculator contract deployed at: ${calculator.target}`);

  // 3. ABI 저장
  await makeAbi('Calculator', calculator.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
