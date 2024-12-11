import { ethers } from "ethers";
import ERC20_ABI from "@/utils/connection/abi.json";


    export const getERC20Contract = (providerOrSigner:any, tokenAddress:string) =>
    new ethers.Contract(
        tokenAddress,
        ERC20_ABI,
        providerOrSigner
    );