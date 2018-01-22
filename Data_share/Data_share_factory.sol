pragma solidity ^0.4.16;
contract vote_contract
{
   function  Initiante_breach_vote(bytes32 id1,string reason,string report,string desc,address submitter1) public;
}
contract  Data_Share 
{
	address data_distributer;
	address data_requestor;
	address auditor;
	address data_verifier;
	address vote_addr;	
	uint start_date; //effective date
	uint duration;	
	uint Deposit;			//deposit values for request of data_distributer
	uint rate;	   //actual price of the data elements
	string data_desc;  //address to vote contract
	string terms_link;			//links to terms and conditions 
	uint flag;
	bool v_flag;
	bytes32 []r;																											//tracking the access patterns for the specific contracts
	mapping (bytes32 => uint) publication_times;																		//storing time for publication requests
	function Data_Share(address data_distributer1,address data_requestor1,address auditor1,address data_verifier1,string data_desc1,uint rate1,uint duration1,address vote_contract1,string terms_link1,bytes32[] access_patt,bytes dr_sig) public
	{
		v_flag=false;
		data_distributer=data_distributer1;
		data_requestor=data_requestor1;
		auditor = auditor1;
		data_verifier=data_verifier1;
		data_desc=data_desc1;
		Deposit=0;
		rate=rate1;
		duration=duration1;
		vote_addr=vote_contract1;
		terms_link=terms_link1;
		flag=0;
		r=  new bytes32[](access_patt.length);
		for (uint i = 0; i < access_patt.length; i++) 
			r[i] = access_patt[i];
		signature_log(data_requestor,"Data Distributer",r,dr_sig);
	}
	event signature_log(address user,string user_role,bytes32[] access_pattrs,bytes sig);
	event access_error(string funct,address user);
	event violation_recorded(bytes32 id,string reason,string report,string desc,address submitter);
	event Contract_sig(address data_req , address data_dist, bytes data_requestor_signature,bytes32 terms);
	modifier onlydata_requestor()
    {
	   	if (msg.sender != data_requestor)
	   	{
	    	access_error("fund_Deposit",msg.sender);
		}
		else
		{_;}
	}
	modifier onlydata_Distributer()
    {
	   	if (msg.sender != data_distributer)
	   	{
	    	access_error("share_access",msg.sender);
		}
		else
		{_;}
	}
	modifier onlyvote_contract()
    {
	   	if (msg.sender != vote_addr)
	   	{
	    	access_error("fund_Deposit",msg.sender);
		}
		else
		{_;}
	}
	modifier onlyverifier()
    {
	   	if (msg.sender != data_verifier)
	   	{
	    	access_error("verification_guidelines",msg.sender);
		}
		else
		{_;}
	}
	event guidelines_verification(string link_to_reort,bytes verifier_sign);
	
	function verify_dataGuidelines(string link_to_sec_report,bytes sign) public	//1
	{
		v_flag=true;
		guidelines_verification(link_to_sec_report,sign);
		
	}
	function fund_Deposit(bytes32 terms,bytes sig)	payable	public	//deposit for the amount 2
	onlydata_requestor()
	{
		if(msg.value>(4*rate))
		{
		
			Deposit=msg.value;
			Contract_sig(data_requestor , data_distributer, sig,terms);	//recording the agreement in log
		}
		else
			msg.sender.transfer(msg.value);
	}
	
	event access_share(string link,string ency_licence);
	
	function share_access(string ency_link, string ency_licence)	public					//sharing access to the requestor 3
	onlydata_Distributer()
	{	
		if(Deposit>(4*rate) && v_flag==true)
		{
			    start_date =block.number;	//Starting the contract effective blocknumber date
				access_share(ency_link,ency_licence);
		}
	}
	
	function payout() public
	onlydata_Distributer()
	{
		if(flag==0 && block.number>(start_date+1000000))														  				//withdraw amount if no outstanding data issues
		{
			data_distributer.transfer(Deposit/4);
		}
	}
	event request_data_breach_audit(bytes32 id,address auditor);
	function penelize_request(string reason ,string desc, string link_to_report) public
	{
		//call to voting contract!!
		if(block.number>(start_date+duration)||Deposit==0 || msg.sender!=data_distributer && msg.sender!=data_requestor && msg.sender!=auditor)
		{
			access_error("Access ERROR!!",msg.sender);
		}
		else
		{
			bytes32 incident_id=keccak256(now,msg.sender,reason);
			bytes32 reason_hash=keccak256(reason);
			if((reason_hash == keccak256("Data authenticity") ) && msg.sender==data_requestor && block.number<(start_date+6101))	//handling issuse with data shared 
			{
					flag=1;																										//indicates outstanding data issue.
					violation_recorded(incident_id,reason,link_to_report,desc,msg.sender);	
					contract_Termination();
			}
			
			if(msg.sender==data_distributer)
			{
				if(reason_hash==keccak256("Data Breach"))
				{
					request_data_breach_audit(incident_id,auditor);
				}
				else
				{
					for (uint i = 0; i < r.length; i++) 	
						if((reason_hash == r[i]))
						{
								violation_recorded(incident_id,reason,link_to_report,desc,msg.sender);
								vote_contract v=vote_contract(vote_addr);
								v.Initiante_breach_vote(incident_id,reason,link_to_report,desc,msg.sender);
								break;
						}
				}							
			}
		}
	}
	event balance_owed(bytes32 id,address ar1,string str,address ar2,uint amount);
	event breach_report_submitted(bytes32 id,uint breach_score,bytes sig);
	function data_breach_audit(bytes32 id,uint breach_score,bytes sig) public
	{
	
		if(msg.sender==auditor)
		{
		  breach_report_submitted(id,breach_score,sig)  ;
			uint amt=breach_score*10;
				if(amt>this.balance)
				{
						
						balance_owed( id, data_requestor,"owes",data_distributer,(amt-this.balance));
						penelize_payout(id,data_requestor,this.balance);
				}
				else
					penelize_payout(id,data_requestor,amt);
				
		}
	}
	event Breach_Request_accepted(bytes32 id);
	event Breach_Request_Rejected(bytes32 id);
	function penelize_payout(bytes32 id,address addr,uint amount) public
	onlyvote_contract()
	{
		Deposit-=amount;
		addr.transfer(amount);
	     Breach_Request_accepted(id);	
		contract_Termination();					//breach confirmed penalize and terminate contract
	}
	function reject_breach_request( bytes32 id) public
	onlyvote_contract()
	{
		Breach_Request_Rejected(id);
	}
	
//------------------------------------------------------------------------------------------------
	event publication_reportings(bytes32 report_id,string link);
	event publication_permission(bytes32 report_id,string link,string decision,string reason,bytes sig);
	function publication_reporting(bytes32 report_id,string ency_pub_link) public
	onlydata_requestor()
	{
		publication_times[report_id]=now;
		publication_reportings(report_id,ency_pub_link);
	}
	function publication_permission_grants(bytes32 report_id,string link,string decision,string reason,bytes sig) public
	onlydata_Distributer()
	{
		if(now<(publication_times[report_id]+ 90 days))					//checking if decision to publication report is relevent or not
		{
			publication_permission(report_id,link,decision, reason, sig);
		}
	}
	function contract_Termination()	 public			//terminate the contract after the duraiton of the contract
	{
		if(now>(start_date+duration)||msg.sender==vote_addr)
		{
			selfdestruct(data_requestor);			//refund the remaining amount to data requestor
		}
	}
}
contract Contract_Factory 
{
    address owner;
    event cont_address(address addr);
    function Contract_Factory() public
    {
        owner=msg.sender;
    }
   
    function create_paymt_contract(address dd1, address dr1,address auditor,address dv,string desc,uint cost_amt,uint duration,address vote_cont, string terms_link,bytes32[] access_patt,bytes sig) public 
    {
        if (msg.sender == owner) 
        {
			address addr = new Data_Share(dd1,dr1,auditor,dv,desc,cost_amt,duration,vote_cont,terms_link,access_patt,sig);
            cont_address(addr);
        }
    }
    
 function kill() public
    { 
		if (msg.sender == owner) 
        {
			selfdestruct(msg.sender);
		}
    }
 
}