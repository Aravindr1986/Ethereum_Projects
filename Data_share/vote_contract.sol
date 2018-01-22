pragma solidity ^0.4.16;
contract  Data_Share
{
	function penelize_payout(bytes32 id,address addr,uint amount) public;
}
contract vote_contract
{
	bytes32 id;
	uint for_cnt;
	uint agn_cnt;
	address [] votlsts;
	address addr;
	address ds_addr;
	mapping(bytes32 =>bool) voted;
	event genrated_voters(address[] arrs);
	function vote_contract () public	//initializing the voters list
	{
		
		for_cnt=0;
		agn_cnt=0;
	}
	function add_voter(address ar) public
	{
		votlsts.length+=1;
		votlsts[votlsts.length-1]=ar;
		genrated_voters(votlsts);
	}
	function update_ads(address adrs) public
	{
		ds_addr=adrs;
	}
   event notify_breach(bytes32 id,string reason,string report,string desc,address submitter);
   function  Initiante_breach_vote(bytes32 id1,string reason,string report,string desc,address submitter1) public
   {
		uint i=0;
		id=id1;
		addr =submitter1;
		for(i=0;i<votlsts.length;i++)
			voted[keccak256(id,votlsts[i])]=false;			//initializing all votes to false
		notify_breach(id1,reason,report,desc,submitter1);
   }
   function vote(bytes32 b_id,bool votes)	public
   {
		if(!voted[keccak256(b_id,msg.sender)])
			{
				voted[keccak256(b_id,msg.sender)]=true;
				
				if(votes)
					for_cnt+=1;
				else
					agn_cnt+=1;
				if((for_cnt+agn_cnt)== votlsts.length)
				  terminate();
			}
	}
	function terminate() public
	{
		Data_Share ds=Data_Share(ds_addr);
		if(for_cnt>agn_cnt)
			ds.penelize_payout(id,addr,4);
		else
			ds.penelize_payout(id,addr,0);
		selfdestruct(msg.sender);
	}
   
}