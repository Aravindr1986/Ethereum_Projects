Read_me
-----------
1) Project to implement the data sharing  contract : https://www.contractstandards.com/public/contracts/data-sharing-agreement
2) To resolve breach , the Datashare smart contract uses a voteing Quorom.
3) There is a trusted Third party who ensures that the data requestor has standard breach prevention 
guidelines in place.
4) Vote Quorom can be decided based on mutual agreement by both parties.

How to run
-----------
1) Deploy both vote and Data_share contract factory contracts.
2) call the create_paymt_contract() function in the contract factory.
3) update the newly deployed Data_share factory address to vote contract.