pragma solidity ^0.4.6;
contract Generate_no
{

	function rand_generation(string str,address addr,uint bno,uint diff,uint gas_lim,uint cnt) returns (uint no)
	{
	    uint x=uint(sha3(str,addr,bno,diff,gas_lim));	//generating the randon number
		return(x%cnt);
	}
	
	function compare(uint a,uint b) returns (bool res)
	{
		if(a>b)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}	