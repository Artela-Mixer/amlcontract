
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
        sys.log("AmlPostContractCall start");
        // 合约变量查询
        const account = hexToUint8Array("0xdc32695f60B4a517de56351CB65332311B1bEF08");
        const stateVar = 'Aml.root';
        const query= new StateChangeQuery(account,stateVar,[]);

        const contract = hexToUint8Array("0xdc32695f60B4a517de56351CB65332311B1bEF08")
        const hash = hexToUint8Array("0x0000000000000000000000000000000000000000000000000000000000000001")
        let is_verified = sys.hostApi.stateDb.stateAt(contract, hash);
        sys.log("AmlPostContractCall is_verified:" + is_verified.toString());
        if (!is_verified) {
            //sys.log("AmlPostContractCall failed:" + is_verified.toString());
            sys.revert("Verification failed");
        }
        // 1.Calculate the eth balance change of DeFi SmartContract(HoneyPot) before and after tx.
        const to = uint8ArrayToHex(input.call!.to);
        const from = uint8ArrayToHex(input.call!.from);
        sys.log("AmlPostContractCall end");
    }
}

// 2.register aspect Instance
const aspect = new Aspect()
entryPoint.setAspect(aspect)

// 3.must export it
export { execute, allocate }

