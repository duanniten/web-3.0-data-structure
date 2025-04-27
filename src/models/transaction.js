
class TRANSACTION{
    constructor(inputUTXOs, outputUTXOs)
    {
        this.inputUTXOs = inputUTXOs;
        this.outputUTXOs = outputUTXOs;
    }
    execute(){
        //
        this.input_spend_checker();
        this.input_amount_checker();
        this.spend_inputs();
    }


    input_spend_checker(){
        this.inputUTXOs.some((_input)=> 
            {
                if(_input.spent){throw "input UTXO already spent";}
            });
    }

    input_amount_checker(){
        let total_input = this.inputUTXOs.reduce((total, atual) => total + atual.amount,0)
        let total_output = this.outputUTXOs.reduce((total, atual) => total + atual.amount,0)
        this.fee = total_input - total_output 
        if (total_output > total_input)
            {throw "output amount bigger then input amount"}   
        this.fee = total_input - total_output 
    }

    spend_inputs(){
        this.inputUTXOs.forEach(input => input.spend());
    }
}

module.exports = TRANSACTION;