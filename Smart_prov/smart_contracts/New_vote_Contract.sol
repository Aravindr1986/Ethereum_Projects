pragma solidity ^0.4.0;
contract Document_track
{
	function document_change(bytes32 doc_id,string ency_text,address initatior,bytes sig);
	function check_usr_access(bytes32 doc_id,address addr) returns(bool ans);
	function get_usr_cnt(bytes32 doc_id) returns(uint count);
}
contract Change_Track_Vote
{
	Document_track dt;
	struct  block_det
	{
		uint blc_no;
		uint blc_diff;
		uint blc_gaslim;
	}
	struct  Doc_change_vote
	{
		bytes32 doc_id;
		uint no_of_users;
		uint for_count;
		uint agnst_count;
	    string str;			
		bytes sig;
		address initiar;
		address[]  addr;
		uint deposit;
		uint r_no;
		uint times_vote;
		block_det blck;
		mapping (bytes32 => bool) chang_vote;				//keeping track if the user has already voted or not		
	}
	Doc_change_vote[] doc_vote;
	address call_cont;
	uint vote_cnt ;							//address of the current  document track contract
	function Change_Track_Vote(address addr)
	{
		call_cont=addr;
		dt=Document_track(call_cont);
	}
	function update_cont_address(address addr)
	{
		call_cont=addr;
		dt=Document_track(call_cont);
	}
	/*******************INITATING A CHANGE VOTING PROCESS*************************************************/
	mapping (bytes32 => uint) index;
	event issue(uint idx,bool user_check);				
	event change_vote_initiated(bytes32 doc_id,string encypt_text,bytes sig,address initiator,uint user_cnt,uint rno); 
	modifier onlyIf(bytes32 doc_id)
    {
    	uint idx=index[doc_id];		
	   	if (idx==0)	//accept the change if condition valid
	   	{
	   		_;
		}
		else
		{

		}
	}
	modifier access(bytes32 doc_id)
	{
		if(dt.check_usr_access(doc_id,msg.sender)) 
		{
			_;
		}
		else
		{
			issue(1,dt.check_usr_access(doc_id,msg.sender));
		}
	}
	modifier ifterminate(bytes32 doc_id)
	{
		uint idx=index[doc_id];	
		uint sum=doc_vote[idx].for_count+doc_vote[idx].agnst_count;
		uint perc=(60*doc_vote[idx].no_of_users)/100;
		if(sum>=perc||doc_vote[idx].times_vote>=3) 
		{
			_;
		}
		else
		{
			doc_vote[idx].times_vote+=1;
			doc_vote[idx].for_count=0;
			doc_vote[idx].agnst_count=0;
			doc_vote[idx].r_no = rand_generation(idx);								//random number for voting
			doc_vote[idx].blck.blc_no=block.number;
			doc_vote[idx].blck.blc_diff=block.difficulty;
			doc_vote[idx].blck.blc_gaslim=block.gaslimit;
			change_vote_initiated(doc_vote[idx].doc_id,doc_vote[idx].str,doc_vote[idx].sig,msg.sender,doc_vote[idx].no_of_users,doc_vote[idx].r_no);	
		}	
	}
	event issues(string str);
	function Init_chg_vote(bytes32 doc_id,string encypt_text,bytes sig) payable
	//onlyIf(doc_id)
	//access(doc_id)
	{
		
		if(msg.value >= 5 )//000000000000000000)
		{
			if(doc_vote.length==0 )			//skipping the 0th index. To align with mapping of document and index
			{
				doc_vote.length+=2;
			}
			else
			{
				doc_vote.length+=1;
			}
			uint i=doc_vote.length-1;
			doc_vote[i].doc_id=doc_id;
			doc_vote[i].str=strcpy(encypt_text);
			doc_vote[i].no_of_users=dt.get_usr_cnt(doc_id);
			doc_vote[i].sig=sig;
			doc_vote[i].for_count=0;
			doc_vote[i].agnst_count=0;
			doc_vote[i].initiar=msg.sender;			
			doc_vote[i].deposit=msg.value;
			index[doc_id]=i;
			doc_vote[i].times_vote+=1;											//incrementing the times of voting
			doc_vote[i].r_no = 62;								//random number for voting
			doc_vote[i].blck.blc_no=block.number;
			doc_vote[i].blck.blc_diff=block.difficulty;
			doc_vote[i].blck.blc_gaslim=block.gaslimit;
			change_vote_initiated(doc_vote[i].doc_id,encypt_text,sig,msg.sender,doc_vote[i].no_of_users,doc_vote[i].r_no);		
		}
		else
		{
			issues("no deposit");
		}
	}
	function strcpy(string _a) internal returns (string)
	{
	    bytes memory _ba = bytes(_a);
	    string memory abcde = new string(_ba.length );
	    bytes memory babcde = bytes(abcde);
	    uint k = 0;
	    for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
   	    abcde= string(babcde);
	    return(abcde);
	}
	/*********************************************Counting the votes***********************************/
	function rand_generation(uint i) returns (uint no)
	{
	    
		uint x=uint(sha3(block.number,doc_vote[i].str,block.difficulty,block.gaslimit,msg.sender));	//generating the randon number
		return(x);
	}												
	event change_vote_tracker(bytes32 doc_id,address user,bool vote);		//vote recorded 
	event invalid(string txt,address addr,uint rng,uint rno,bool voted,bool compare,uint i,bytes sig);
	function chg_vote(bytes32 docu_id,bool vote,bytes sig)
	access(docu_id)
	{
		uint i=index[docu_id];

		bytes32 vote_trcr_hash=sha3(docu_id,msg.sender,doc_vote[i].times_vote);		//reteriving the index of the particular change
		uint rng=uint(sha3(doc_vote[i].str,msg.sender,doc_vote[i].blck.blc_no,doc_vote[i].blck.blc_diff,doc_vote[i].blck.blc_gaslim))%100;
		if((i > 0) && (doc_vote[i].chang_vote[vote_trcr_hash]==false) && rng < doc_vote[i].r_no) 
		{
			doc_vote[i].chang_vote[vote_trcr_hash]=true;				//recording the vote
			doc_vote[i].addr.length+=1;
			doc_vote[i].addr[doc_vote[i].addr.length-1]=msg.sender;			//recording sender address for payout
			if(vote==true)
			{
				doc_vote[i].for_count+=1;
			}
			else
			{
				doc_vote[i].agnst_count+=1;
			}			
		}
		else 
		{
				invalid("Invalid",msg.sender,rng,doc_vote[i].r_no,doc_vote[i].chang_vote[vote_trcr_hash],(rng < doc_vote[i].r_no),i,sig);
		}
	}
	function calc_perc(uint n) returns (uint x)
	{
		if(n<=3)
			return 100;
		else
			return 60;
	}
	event terminated(uint inex,bool result,uint no_of_users,address addr);
	function terminate_voting(bytes32 doc_id) payable
	ifterminate(doc_id)
	{
		uint i=index[doc_id];
		
		uint perc=(calc_perc(doc_vote[i].no_of_users)*doc_vote[i].no_of_users)/100;
		if(doc_vote[i].agnst_count>=(perc/2))                  //invalidating the current change
		{
			uint j=0;
			bool rslt;
			while(j<doc_vote[i].addr.length)
			{
				rslt=doc_vote[i].addr[j].send((doc_vote[i].deposit/doc_vote[i].addr.length) );
				j+=1;
			}	
		}
		else
		{
		    dt.document_change(doc_vote[i].doc_id,doc_vote[i].str,doc_vote[i].initiar,doc_vote[i].sig);
			rslt=doc_vote[i].initiar.send(doc_vote[i].deposit);	  //refunding the change initiator on successfull change 
		}
		index[doc_id]=0;
		
		address addr=doc_vote[i].initiar;				   		            
		//rslt=doc_vote[i].times_vote;
		delete doc_vote[i];		
		terminated(i,rslt,perc,addr);	           //deleting the vote tracker for the particular change	
	}
	function kill()
    { 
		suicide(msg.sender);
    }

}
