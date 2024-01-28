import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
pragma solidity ^0.8.4;

contract Aml {
    bytes32 private root;
    uint32 public is_verified;
    mapping(address => uint256) public deposits;
    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);

    constructor(bytes32 _root) Ownable(_msgSender()) {
        root = _root;
        is_verified = 1;
    }

    function deposit(bytes32[] memory proof) public payable {
        verify(proof, msg.sender);
        deposits[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) public {
        require(deposits[msg.sender] >= amount, "Insufficient balance");
        deposits[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawal(msg.sender, amount);
    }

    //function setRoot(bytes32 _root) public onlyOwner {
    function setRoot(bytes32 _root) public {
        root = _root;
    }

    function getRoot() public view returns (bytes32) {
        return root;
    }

    function isOwner() public pure returns (bool) {
        return true;
    }

    function verify(
        bytes32[] memory proof,
        address addr
    ) public view{
        bytes32 leaf = bytes32(uint256(addr));
        try MerkleProof.verify(proof, root, leaf) returns (bool verified) {
            if (verified) {
                is_verified = 1;
            } else {
                is_verified = 0;
            }
        } catch Error(string memory) {
            is_verified = 0;
        }
    }
}

