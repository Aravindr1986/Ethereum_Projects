Steps to follow
----------------
0) Start the geth node using command :geth --dev --rpc --rpcapi eth,web3,personal --rpccorsdomain "http://localhost:8545" --maxpeers 0 --nodiscover --ipcpath ~/.ethereum/geth.ipc  console 2>>log.txt
1) Check for updates in mist : Use version 0.9.1
2) Deploy contracts(Updated version attacted) : New_vote_Contract.sol,generate_no.sol,sha3_address_hashing.sol and Document_track_Encrypted.sol 
3) use update_cont_address(Change_ Track_ Vote) and Add_vote_cont(Document_track_Encrypted) to update the address of each other.

Front end
-----------
1) Install meteor js using the following instructions : https://www.meteor.com/install
2) Generate the project using meteor create
3) Install the following libraries : 

For Encryption Add 
-------------------
meteor add altapp:aes

For web3
---------
meteor add ethereum:web3

If compatibality error in above use 
------------------------------------
meteor add ethereum:tools
4) update the contract addresses in main.js files in the meteor project.
5) run the project.
