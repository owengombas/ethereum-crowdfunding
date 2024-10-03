/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface CrowdfundingInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "claimRefund"
      | "contribute"
      | "contributions"
      | "contributors"
      | "creator"
      | "deadline"
      | "description"
      | "getContractBalance"
      | "getContributorAmount"
      | "getContributors"
      | "goal"
      | "goalReached"
      | "image"
      | "isDeadlinePassed"
      | "refundAll"
      | "refunded"
      | "title"
      | "totalFunds"
      | "withdrawFunds"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "ContributionReceived"
      | "FundsWithdrawn"
      | "GoalReached"
      | "RefundIssued"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "claimRefund",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "contribute",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "contributions",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "contributors",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "creator", values?: undefined): string;
  encodeFunctionData(functionFragment: "deadline", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "description",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getContractBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getContributorAmount",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getContributors",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "goal", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "goalReached",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "image", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "isDeadlinePassed",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "refundAll", values?: undefined): string;
  encodeFunctionData(functionFragment: "refunded", values?: undefined): string;
  encodeFunctionData(functionFragment: "title", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalFunds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawFunds",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "claimRefund",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "contribute", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "contributions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "contributors",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "creator", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deadline", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "description",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getContractBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getContributorAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getContributors",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "goal", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "goalReached",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "image", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isDeadlinePassed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "refundAll", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "refunded", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "title", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "totalFunds", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFunds",
    data: BytesLike
  ): Result;
}

export namespace ContributionReceivedEvent {
  export type InputTuple = [contributor: AddressLike, amount: BigNumberish];
  export type OutputTuple = [contributor: string, amount: bigint];
  export interface OutputObject {
    contributor: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace FundsWithdrawnEvent {
  export type InputTuple = [recipient: AddressLike, amount: BigNumberish];
  export type OutputTuple = [recipient: string, amount: bigint];
  export interface OutputObject {
    recipient: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace GoalReachedEvent {
  export type InputTuple = [totalAmount: BigNumberish];
  export type OutputTuple = [totalAmount: bigint];
  export interface OutputObject {
    totalAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RefundIssuedEvent {
  export type InputTuple = [contributor: AddressLike, amount: BigNumberish];
  export type OutputTuple = [contributor: string, amount: bigint];
  export interface OutputObject {
    contributor: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Crowdfunding extends BaseContract {
  connect(runner?: ContractRunner | null): Crowdfunding;
  waitForDeployment(): Promise<this>;

  interface: CrowdfundingInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  claimRefund: TypedContractMethod<[], [void], "nonpayable">;

  contribute: TypedContractMethod<[], [void], "payable">;

  contributions: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  contributors: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  creator: TypedContractMethod<[], [string], "view">;

  deadline: TypedContractMethod<[], [bigint], "view">;

  description: TypedContractMethod<[], [string], "view">;

  getContractBalance: TypedContractMethod<[], [bigint], "view">;

  getContributorAmount: TypedContractMethod<
    [contributor: AddressLike],
    [bigint],
    "view"
  >;

  getContributors: TypedContractMethod<[], [string[]], "view">;

  goal: TypedContractMethod<[], [bigint], "view">;

  goalReached: TypedContractMethod<[], [boolean], "view">;

  image: TypedContractMethod<[], [string], "view">;

  isDeadlinePassed: TypedContractMethod<[], [boolean], "view">;

  refundAll: TypedContractMethod<[], [void], "nonpayable">;

  refunded: TypedContractMethod<[], [boolean], "view">;

  title: TypedContractMethod<[], [string], "view">;

  totalFunds: TypedContractMethod<[], [bigint], "view">;

  withdrawFunds: TypedContractMethod<[], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "claimRefund"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "contribute"
  ): TypedContractMethod<[], [void], "payable">;
  getFunction(
    nameOrSignature: "contributions"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "contributors"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "creator"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "deadline"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "description"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getContractBalance"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getContributorAmount"
  ): TypedContractMethod<[contributor: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getContributors"
  ): TypedContractMethod<[], [string[]], "view">;
  getFunction(
    nameOrSignature: "goal"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "goalReached"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "image"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "isDeadlinePassed"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "refundAll"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "refunded"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "title"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "totalFunds"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "withdrawFunds"
  ): TypedContractMethod<[], [void], "nonpayable">;

  getEvent(
    key: "ContributionReceived"
  ): TypedContractEvent<
    ContributionReceivedEvent.InputTuple,
    ContributionReceivedEvent.OutputTuple,
    ContributionReceivedEvent.OutputObject
  >;
  getEvent(
    key: "FundsWithdrawn"
  ): TypedContractEvent<
    FundsWithdrawnEvent.InputTuple,
    FundsWithdrawnEvent.OutputTuple,
    FundsWithdrawnEvent.OutputObject
  >;
  getEvent(
    key: "GoalReached"
  ): TypedContractEvent<
    GoalReachedEvent.InputTuple,
    GoalReachedEvent.OutputTuple,
    GoalReachedEvent.OutputObject
  >;
  getEvent(
    key: "RefundIssued"
  ): TypedContractEvent<
    RefundIssuedEvent.InputTuple,
    RefundIssuedEvent.OutputTuple,
    RefundIssuedEvent.OutputObject
  >;

  filters: {
    "ContributionReceived(address,uint256)": TypedContractEvent<
      ContributionReceivedEvent.InputTuple,
      ContributionReceivedEvent.OutputTuple,
      ContributionReceivedEvent.OutputObject
    >;
    ContributionReceived: TypedContractEvent<
      ContributionReceivedEvent.InputTuple,
      ContributionReceivedEvent.OutputTuple,
      ContributionReceivedEvent.OutputObject
    >;

    "FundsWithdrawn(address,uint256)": TypedContractEvent<
      FundsWithdrawnEvent.InputTuple,
      FundsWithdrawnEvent.OutputTuple,
      FundsWithdrawnEvent.OutputObject
    >;
    FundsWithdrawn: TypedContractEvent<
      FundsWithdrawnEvent.InputTuple,
      FundsWithdrawnEvent.OutputTuple,
      FundsWithdrawnEvent.OutputObject
    >;

    "GoalReached(uint256)": TypedContractEvent<
      GoalReachedEvent.InputTuple,
      GoalReachedEvent.OutputTuple,
      GoalReachedEvent.OutputObject
    >;
    GoalReached: TypedContractEvent<
      GoalReachedEvent.InputTuple,
      GoalReachedEvent.OutputTuple,
      GoalReachedEvent.OutputObject
    >;

    "RefundIssued(address,uint256)": TypedContractEvent<
      RefundIssuedEvent.InputTuple,
      RefundIssuedEvent.OutputTuple,
      RefundIssuedEvent.OutputObject
    >;
    RefundIssued: TypedContractEvent<
      RefundIssuedEvent.InputTuple,
      RefundIssuedEvent.OutputTuple,
      RefundIssuedEvent.OutputObject
    >;
  };
}
