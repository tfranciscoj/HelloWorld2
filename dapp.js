(function (Contract) {
    var web3;
    var instance;



    function init(cb) {
        web3 = new Web3(
            (window.web3 && window.web3.currentProvider) ||
            new Web3.providers.HttpProvider(Contract.endpoint));

        var contract_interface = web3.eth.contract(Contract.abi);
        instance = contract_interface.at(Contract.address);
        cb();
    }


    // init function takes as argument the function cb() and does the following:
    // 1. creates a web3 object
    // 2. grabs abi from our contract and creates an instance of contract at the given address
    // 3. calls the function cb

    function getMessage(cb) {
        instance.message(function (error, result) {
            cb(error, result);
        });
    }

    // getMessage function retrieves message variable from contract and calls function cb

    function setMessage(){
                getMessage(function(error, result){
                    if(error){
                          console.error("Could not get artice:", error);
                          return;
                    }
                    $('#message').html(result);
                     });
    }


    // setMessage function sets the variable 'message' -in html file- to the value given by contract



    function updateMessage() {
        let newMessage = $('#message-input').val();
        if(newMessage && newMessage.length > 0){
            instance.update.sendTransaction(newMessage, {from: "0xa48f2e0be8ab5a04a5eb1f86ead1923f03a207fd", gas: 30000000}, function(error, result){
                if(error){
                    console.log("error in sendTransaction");
                }
                else{
                    setTimeout(setMessage, 1000);
                }
            });
        }
        else{
            alert("Newmessage not defined");
        }
    }

    // updateMessage sends a transaction to function update in smart contract that sets
    // message variable to newMessage

    function documentreadyFunction(){
        init(setMessage);
          $('#submitButton').click(function (){
              updateMessage()
          });
    }

    $(document).ready(documentreadyFunction);

})(Contracts['HelloWorld']);
