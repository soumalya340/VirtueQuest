/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface IVQInterface extends utils.Interface {
  contractName: "IVQ";
  functions: {
    "ownerOf(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "ownerOf",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;

  events: {};
}

export interface IVQ extends BaseContract {
  contractName: "IVQ";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IVQInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { owner: string }>;
  };

  ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  callStatic: {
    ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
