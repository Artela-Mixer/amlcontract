
import {
    sys,
    allocate,
    entryPoint,
    State,
    execute,
    uint8ArrayToHex,
    hexToUint8Array,
    EthCallTree,
    IPostContractCallJP,
    PostContractCallInput,
    CallTreeQuery,
    StateChangeQuery,
    EthStateChangeIndices,
} from "@artela/aspect-libs";
import { Protobuf } from 'as-proto/assembly';

/**
 * Please describe what functionality this aspect needs to implement.
 *
 * About the concept of Aspect @see [join-point](https://docs.artela.network/develop/core-concepts/join-point)
 * How to develop an Aspect  @see [Aspect Structure](https://docs.artela.network/develop/reference/aspect-lib/aspect-structure)
 */
class Aspect implements IPostContractCallJP {

    /**
     * isOwner is the governance account implemented by the Aspect, when any of the governance operation
     * (including upgrade, config, destroy) is made, isOwner method will be invoked to check
     * against the initiator's account to make sure it has the permission.
     *
     * @param sender address of the transaction
     * @return true if check success, false if check fail
     */
    isOwner(sender: Uint8Array): bool {
        return true;
    }

    /**
     * postContractCall is a join-point which will be invoked after a contract call has finished.
     *
     * @param input input to the current join point
     */
    postContractCall(input: PostContractCallInput): void {
        sys.log("Aml postContractCall");
        // 合约变量查询
        const account = hexToUint8Array("0xdc32695f60B4a517de56351CB65332311B1bEF08");
        const stateVar = 'Aml.root';
        const query= new StateChangeQuery(account,stateVar,[]);
        //const root = new State(uint8ArrayToHex(raw.account), uint8ArrayToHex(raw.value), raw.callIndex);
        //const response = sys.hostApi.trace.queryStateChange(query);
        //const indicesResult = Protobuf.decode<EthStateChangeIndices>(response, EthStateChangeIndices.decode);

        //return new State(uint8ArrayToHex(raw.account), uint8ArrayToHex(raw.value), raw.callIndex);

        // 1.Calculate the eth balance change of DeFi SmartContract(HoneyPot) before and after tx.
        //const to = uint8ArrayToHex(input.call!.to);
        //const from = uint8ArrayToHex(input.call!.from);
        //const query = new StateChangeQuery(to, "Aml.root",[]);

        //new State(uint8ArrayToHex(raw.account), uint8ArrayToHex(raw.value), raw.callIndex);

        // let data = sys.hostApi.crypto.keccak(sys.utils.stringToUint8Array("test"));
        //
/*
 *        export class deployer extends StateChange<string> {
 *
 *            constructor(addr: string, indices: Uint8Array[] = []) {
 *                super(new StateChangeProperties(addr, 'HoneyPot.deployer', indices));
 *            }
 *
 *            override unmarshalState(raw: EthStateChange): State<string> {
 *                return new State(uint8ArrayToHex(raw.account), uint8ArrayToHex(raw.value), raw.callIndex);
 *            }
 *        }
 */
        // 调用tree
        var callTreeQuery = new CallTreeQuery(-1);
        let response = sys.hostApi.trace.queryCallTree(callTreeQuery)
        const callTree = Protobuf.decode<EthCallTree>(response, EthCallTree.decode);
        var arrayKeys = callTree.calls.keys();
        const key = arrayKeys[0];
        var oneCall = callTree.calls.get(key);
        // oneCall.data

        
        //let callTreeJson = JSON.stringify(callTree);
        //sys.log(callTreeJson);







        // 1.Calculate the eth balance change of DeFi SmartContract(HoneyPot) before and after tx.
        const to = uint8ArrayToHex(input.call!.to);
        const from = uint8ArrayToHex(input.call!.from);
    }
}

// 2.register aspect Instance
const aspect = new Aspect()
entryPoint.setAspect(aspect)

// 3.must export it
export { execute, allocate }

