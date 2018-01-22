import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';
import './main.html';
import { sig } from '../imports/api/signin.js';
import { docs } from '../imports/api/signin.js';
import { Mongo } from 'meteor/mongo';
var Document_track_Encrypted =  web3.eth.contract([{"constant":false,"inputs":[{"name":"doc_id","type":"bytes32"},{"name":"usr_new","type":"bytes32"},{"name":"ts","type":"uint256"},{"name":"sig","type":"bytes"}],"name":"adduser","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"doc_id","type":"bytes32"}],"name":"get_usr_cnt","outputs":[{"name":"count","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"doc_id","type":"bytes32"},{"name":"user_addr","type":"bytes32"}],"name":"user_doc_access","outputs":[{"name":"t","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"},{"name":"doc_id","type":"bytes32"}],"name":"changeOwner","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"doc_id","type":"bytes32"},{"name":"usr","type":"bytes32"},{"name":"ts","type":"uint256"}],"name":"deleteuser","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"docu_id","type":"uint256"},{"name":"ency_digest","type":"string"},{"name":"ts","type":"uint256"},{"name":"sig","type":"bytes"}],"name":"adddocument","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"add_vote_cont","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"doc_id","type":"bytes32"},{"name":"ency_text","type":"string"},{"name":"initatior","type":"address"},{"name":"sig","type":"bytes"}],"name":"document_change","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"doc_id","type":"bytes32"},{"name":"addr","type":"address"}],"name":"check_usr_access","outputs":[{"name":"ans","type":"bool"}],"payable":false,"type":"function"},{"inputs":[{"name":"addr","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"ts","type":"uint256"},{"indexed":false,"name":"lst_ts","type":"uint256"},{"indexed":false,"name":"nw","type":"uint256"}],"name":"time_error","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"str","type":"string"},{"indexed":false,"name":"","type":"bool"}],"name":"error_chg","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"bytes32"}],"name":"user_owner","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"str","type":"string"}],"name":"user_errors","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"doc_id","type":"bytes32"},{"indexed":false,"name":"process","type":"string"},{"indexed":false,"name":"owner","type":"bytes32"},{"indexed":false,"name":"digest","type":"string"},{"indexed":false,"name":"ts","type":"uint256"},{"indexed":false,"name":"OPM","type":"string"},{"indexed":false,"name":"sig","type":"bytes"}],"name":"doc_created","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"event_name","type":"string"},{"indexed":false,"name":"artifact","type":"bytes32"},{"indexed":false,"name":"process","type":"string"},{"indexed":false,"name":"agent1","type":"bytes32"},{"indexed":false,"name":"agent2","type":"bytes32"},{"indexed":false,"name":"OPM","type":"string"},{"indexed":false,"name":"ts","type":"uint256"},{"indexed":false,"name":"sig","type":"bytes"}],"name":"user_addition","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"event_name","type":"string"},{"indexed":false,"name":"artifact","type":"bytes32"},{"indexed":false,"name":"process","type":"string"},{"indexed":false,"name":"agent1","type":"bytes32"},{"indexed":false,"name":"agent2","type":"bytes32"},{"indexed":false,"name":"OPM","type":"string"},{"indexed":false,"name":"ts","type":"uint256"},{"indexed":false,"name":"sig","type":"bytes"}],"name":"delete_user","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"doc_id","type":"bytes32"},{"indexed":false,"name":"agent","type":"address"},{"indexed":false,"name":"encyt_text","type":"string"},{"indexed":false,"name":"process","type":"string"},{"indexed":false,"name":"OPM","type":"string"},{"indexed":false,"name":"sig","type":"bytes"}],"name":"change","type":"event"}]);
var d_obj=Document_track_Encrypted.at("0x3973C8793c5e290B1175Ec3df9ac20b4D4EaBd02");

var hash_cont=web3.eth.contract([{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"sha_3","outputs":[{"name":"hash","type":"bytes32"}],"payable":false,"type":"function"}]);
var hashme=hash_cont.at("0xD76916bc76c8832835e888bA0124366606186486");

var voting = web3.eth.contract([{"constant":false,"inputs":[{"name":"i","type":"uint256"}],"name":"rand_generation","outputs":[{"name":"no","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"update_cont_address","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"doc_id","type":"bytes32"}],"name":"terminate_voting","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"doc_id","type":"bytes32"},{"name":"encypt_text","type":"string"},{"name":"sig","type":"bytes"}],"name":"Init_chg_vote","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"n","type":"uint256"}],"name":"calc_perc","outputs":[{"name":"x","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"docu_id","type":"bytes32"},{"name":"vote","type":"bool"},{"name":"sig","type":"bytes"}],"name":"chg_vote","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"addr","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"idx","type":"uint256"},{"indexed":false,"name":"user_check","type":"bool"}],"name":"issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"doc_id","type":"bytes32"},{"indexed":false,"name":"encypt_text","type":"string"},{"indexed":false,"name":"sig","type":"bytes"},{"indexed":false,"name":"initiator","type":"address"},{"indexed":false,"name":"user_cnt","type":"uint256"},{"indexed":false,"name":"rno","type":"uint256"}],"name":"change_vote_initiated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"doc_id","type":"bytes32"},{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"vote","type":"bool"}],"name":"change_vote_tracker","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"txt","type":"string"},{"indexed":false,"name":"addr","type":"address"}],"name":"invalid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"index","type":"uint256"},{"indexed":false,"name":"result","type":"bool"},{"indexed":false,"name":"no_of_users","type":"uint256"},{"indexed":false,"name":"addr","type":"address"}],"name":"terminated","type":"event"}]);
var v_obj=voting.at("0x871Bf3bb257C2850c01EB392607c65537E469c2E");

var random =web3.eth.contract([{"constant":false,"inputs":[{"name":"str","type":"string"},{"name":"addr","type":"address"},{"name":"bno","type":"uint256"},{"name":"diff","type":"uint256"},{"name":"gas_lim","type":"uint256"},{"name":"cnt","type":"uint256"}],"name":"rand_generation","outputs":[{"name":"no","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"str","type":"string"},{"name":"addr","type":"address"},{"name":"cnt","type":"uint256"}],"name":"rand_generation","outputs":[{"name":"no","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"compare","outputs":[{"name":"res","type":"bool"}],"payable":false,"type":"function"}]);
var r_obj=random.at("0x76c0b0e09B6e6dbF72E6A8eaf2365A7484C9F013");

var idx=0;
var myvar=[];
var prev_links="https://docs.google.com/spreadsheets/d/1032AFBuFxHp0JaArO3MRTV3CzKsGX603g7cnq-NGEYs/edit?usp=sharing";
var currlink="";
var ter_usr;
var pwd;
var bno;
var bdiff;
var dgas;
var rand_no;
var encyptext;

Template.addocs.onCreated(
	function linkchg()             //keeps track of new document and links to that document after a change
	{
		var evet3=d_obj.change(function callme(error,result)
		{
				if(!error)
				{
					//prev_links=currlink;
          var _id=result.args.doc_id;
          var prevs_links=currlink;
          docs.update({_id,prevs_links});
					console.log("Link change done!!");
				}
		});
	});
Template.initiate_change.onCreated(function helloOnCreated()            //adding watcher to vhange_vote_initiated event
 {
 	  var event2 = v_obj.change_vote_initiated(function trial1(error, result)
    {
      var i=1;
      if (!error)
      {
          //var db=sig.findOne({})
        
        var _id=sig.findOne({})._id;          //getting user id for email
        var email=sig.findOne({_id}).address; //getting the user email id
        console.log(_id);
        bno=web3.eth.blockNumber;
        var block=web3.eth.getBlock(bno);
        bdiff=block.difficulty;
        dgas=block.gasLimit;
        _id=result.args.doc_id; 
        console.log("doc id :"+_id)                  //reterive document details
        decy_key= docs.findOne({_id}).key;       //retreive the key 
        prevs_links=docs.findOne({_id}).prevlink; //retrive the previous version link
        decyptext = result.args.encypt_text;
        var bytes  = CryptoJS.AES.decrypt(decyptext,decy_key);
      	var plaintext = bytes.toString(CryptoJS.enc.Utf8);
      	var i=plaintext.lastIndexOf("||");
      	var j=plaintext.indexOf("||");	//starting index of current hash
   		  var end=plaintext.indexOf("||",j+2);	//ending index of current hash
   		  var curr_hash=plaintext.substring(j+2,end);
      	j=end+2;					//stating index of prev hash
      	end=plaintext.indexOf("||",j);//ending index of prev hash
      	var prev_hash=plaintext.substring(j,end);
      	var links=plaintext.substring(i+2);
      	currlink=links;
        //console.log("Doc :"+_id+" currhash:"+curr_hash+" prev_hash:"+prev_hash+" links:"+links);  
        call=/*docs.findOne({_id}).script;*/"https://script.google.com/macros/s/AKfycbwgP8eyykmP6iVDWhKHMYohZJcenf2zCnNy6d-XVvxwwzEObMOE/exec";
      	Meteor.http.call("GET", call,{params:{currlink: links,prevlink: prevs_links,emailid:email,docid:_id,nw_hsh:curr_hash,old_hsh:prev_hash}}
      		,function( error, response ) 
      		{
	    		if ( response ) 
	    		{
	    		 	var text=response.content;
	    		  	var k=text.indexOf("valid results");
	    			if(k>=0)
	    			{
	    				var ts=web3.eth.getBlock("latest").timestamp;
              var _id=web3.eth.accounts[0];
	    				var hash = web3.sha3(web3.eth.accounts[0]||true||ts);
	    				var x=web3.personal.unlockAccount(web3.eth.accounts[0],sig.findOne({_id}).password,1000);
	    				var sig = web3.eth.sign(web3.eth.accounts[0],hash);
            	var Trans_hash=v_obj.chg_vote(doc_id,true,sig,{from: web3.eth.accounts[0],gas: 2000000});
            	console.log("vote Transaction hash: =>"+Trans_hash);
         		}
            		//console.log( "Response:"+k);
         	} 
	    		else
	    		{
	    		    console.log("response:" + error.content);
	    		}
    		});
        idx++;
       	myvar[idx]=Meteor.setTimeout(function(){funct111(doc_id);},900000);    
      }
    	else
    	{
    	        console.log(error);
    	}
	});
 });
Template.signup.events({
      'submit form': function(event) //Adding Credentials to the MongoDB
      {
        try
        {
          event.preventDefault();
          console.log("sig: "+sig);
          _id=event.target.addr.value;
          var password=event.target.passwd.value;
          var address=event.target.did.value;
          var encykey=event.target.Key.value;
          var id=sig.insert({_id,password,address,encykey,createdAt: new Date(),});
          console.log(sig.findOne({_id}).password);
        }
        catch(err){alert(err);}
      }
   });
Template.addocs.events({
      'submit form': function(event) //Event for Adding new Document to the contract
      {
        try
        {
        	
          event.preventDefault();
          _id=event.target.addr.value
          console.log(_id)
          var doc_id=event.target.did.value;
          var hash_value=event.target.txt.value;
          var link=event.target.link.value;
          /*Reteriving from DB*/
          var usr=_id;         
          var email_id=sig.findOne({_id}).address;           //address to email
          var enkey=sig.findOne({_id}).encykey;         //encryption Key
          var pswd=sig.findOne({_id}).password;         //password of address
          prev_links=link;              //link
          //console.log("Id:"+ _id+" user:"+email_id+" key:"+enkey+" password:"+pswd);
          var ts=web3.eth.getBlock("latest").timestamp;
          var textValue = CryptoJS.AES.encrypt((doc_id+"||"+hash_value+"||"+ts+"||"+usr+"||"+link),enkey); // Encrypting with default password
          var ciphertxt=textValue.toString();
          var txt_hash =web3.sha3(ciphertxt);
          //console.log("hash:"+txt_hash);
          var date = new Date();
  	      var start=date.valueOf();
  	      var res=web3.personal.unlockAccount(usr,pswd,1000);
  	      var sign = web3.eth.sign(usr,txt_hash);
          //console.log("Cipher text: "+ciphertxt+"sign :"+sign);
  	      var Trans_hash=d_obj.adddocument(doc_id,ciphertxt,ts,sign,{from: usr,gas: 2000000});
  	      date = new Date();
  	      var end=date.valueOf();
  	      console.log("Add Doc=>"+Trans_hash+" ("+start+","+end+")");
          /*_id=doc_id;
          var key=enkey;
          var id=docs.insert({_id,key,link,createdAt: new Date(),});*/
  	      prev_links=link;
        }
        catch(err){alert(err);}
      }
   });
Template.addusers.events({        //adding new users to a particular document
      'submit form': function(event)
      {
        try
        {

          var date = new Date();
          var start=date.valueOf();
      	  event.preventDefault();
          var new_user=event.target.newuser.value;
          var addr = new_user;
          var start=date.valueOf();
  	      var user_hash=hashme.sha_3.call(new_user);
  	      var doc_id=event.target.did.value;
  	      var usr=event.target.addr.value;
  	      var pswd=event.target.passwrd.value;
  	      var ts=web3.eth.getBlock("latest").timestamp;;
  	      var textValue = doc_id+"||"+new_user+"||"+ts+"||"+usr;
  	      var hash=web3.sha3(textValue);
  	      var x=web3.personal.unlockAccount(usr,pswd,1000);
  	      var sig = web3.eth.sign(usr,hash);
  	      var Trans_hash=d_obj.adduser(doc_id,user_hash,ts,sig,{from: usr,gas: 2000000});
  	      date = new Date();
  	      var end=date.valueOf();
  	      console.log("Add Users : Transaction Hash =>"+ Trans_hash+" Start:"+start+" End:"+end);
	      }
        catch(err){alert(err);}
      }
   });
Template.initiate_change.events({
      'submit form': function(event)    //adding new changes to the document!!!
      {
        try
        {
          event.preventDefault();
          var usr=event.target.addr.value;
          var pswd=event.target.passwrd.value;
          var doc_id=event.target.did.value;
          var curr_hsh=event.target.cur_hsh.value;
          var prev_hsh=event.target.prv_hsh.value;
          var link=event.target.link.value;
          _id=doc_id;
          var enkey=docs.findOne({_id}).key;
          var date = new Date();
	        var start=date.valueOf();
	        var ts=web3.eth.getBlock("latest").timestamp;
	        var textValue = CryptoJS.AES.encrypt((doc_id+"||"+curr_hsh+"||"+prev_hsh+"||"+ts+"||"+usr+"||"+link),enkey);
	        var ciphertxt=textValue.toString();
	        var hash=web3.sha3(ciphertxt);
	        var x=web3.personal.unlockAccount(usr,pswd,1000);
	        var sign = web3.eth.sign(usr,hash);
	        var Trans_hash=v_obj.Init_chg_vote(doc_id,ciphertxt,sign,{from: usr,value:web3.toWei(10,'ether'),gas: 2000000});
	        date = new Date();
	        var end=date.valueOf();
	        console.log("Change : Transaction Hash =>"+Trans_hash+""+start+","+end);
	        ter_usr=usr;
          pwd=pswd;
        }
        catch(err){alert(err);}
      }
   });
function funct111(doc_id)	//terminating the voting for the document
{
	
	var x=web3.personal.unlockAccount(ter_usr,pwd,1000);
	var Trans_hash=v_obj.terminate_voting(doc_id,{from: ter_usr,gas: 2000000});
	console.log("Terminate Document: Transaction Hash =>"+doc_id+" hash="+Trans_hash);
}

Template.vote_change.events({
      'submit form': function(event)    //adding new changes to the document!!!
      {
        try
        {
          event.preventDefault();
          var usr=event.target.addr.value;
          var pswd=event.target.passwrd.value;
          var doc_id=event.target.did.value;
          var choice = event.target.vote.value;
          var ts=web3.eth.getBlock("latest").timestamp;
          var hash = "0x"+ web3.sha3(doc_id||choice||ts);
          var v_sum=0;
          for(j=0;j<100;j++)
          {
            //console.log("hi");
            
            var rand_me=r_obj.rand_generation.call(encyptext,web3.eth.accounts[j],bno,bdiff,dgas,100);         
            var res=r_obj.compare.call(62,rand_me);
            //console.log("j:"+j+" my Rand_no:"+rand_me+" res:"+res);
            if(res && j!=2)
            {
            	if(j==0||j==15)
            	{
            		var x=web3.personal.unlockAccount(web3.eth.accounts[j],"blue44sky",1000);
            	}
            	else
            	{
	            	if(j==1)
	            	{
	            		var x=web3.personal.unlockAccount(web3.eth.accounts[j],"dark44knight",1000);	
	            	}
	            	else
	            	{
	            		var x=web3.personal.unlockAccount(web3.eth.accounts[j],"password_1",1000);		
	            	}
	            }
            	var sig = web3.eth.sign(web3.eth.accounts[j],hash);
            	var Trans_hash=v_obj.chg_vote(doc_id,choice,sig,{from: web3.eth.accounts[j],gas: 2000000});
            	console.log("\""+Trans_hash+"\",");
              v_sum+=1;
            }
          }
          console.log("Sum = "+v_sum);

        }
        catch(err){alert(err);}
      }
   });
