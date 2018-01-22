pragma solidity ^0.4.1;
contract SHA_3hash
{
	function sha_3(address addr) returns (bytes32 hash)
	{
		return(sha3(addr));
	}
	function kill()
	{
		suicide(msg.sender);
	}
}
