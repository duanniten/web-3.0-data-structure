const TXO = require('../src/models/TXO.js')
const TRANSACTION = require('../src/models/transaction.js')

const txo1 = new TXO('i1', 100)
const txo2 = new TXO('i2', 200)
const txo3 = new TXO('i3', 300)
const txo4 = new TXO('i4', 400)

const inputUTXOs = [txo1, txo2]
const outputUTXOs = [txo3, txo4]

const transaction = new TRANSACTION(inputUTXOs, outputUTXOs)

describe("constructor",() =>{
    it("Store inputUTXOs and outputUTXOs on the transaction object", ()=>{
        expect(transaction.inputUTXOs).toBe(inputUTXOs);
        expect(transaction.outputUTXOs).toBe(outputUTXOs);
    })
})

describe("execute- ensure that none of the inputUTXOs are already spent",() =>{
    const txo5 = new TXO('i5', 100)
    txo5.spend()
    const inputUTXOs = [txo1, txo2, txo5]
    const transaction_spended = new TRANSACTION(inputUTXOs, outputUTXOs)
    it("throw error if already spent", ()=>{
        expect(()=> transaction_spended.input_spend_checker()).toThrow("input UTXO already spent")
    })
})

describe("execute- inputUTXOs have enough total value in them to cover the total value of the outputUTXOs",() =>{
    const inputUTXOs = [txo1, txo2]
    const outputUTXOs = [txo3, txo4]
    const transaction_not_cover = new TRANSACTION(inputUTXOs, outputUTXOs)
    it("no enough total value", ()=>{
        expect(()=> transaction_not_cover.input_amount_checker()).toThrow("output amount bigger then input amount")
    })
})

describe("execute - ensure all inputs TXO are mark as spent after",() => {
    transaction.spend_inputs()
    it("all inputs TXO marked as spent", () =>{
        expect(transaction.inputUTXOs.every((_input) => _input.spent)).toBe(true)
    })
})   
 

describe("execute - ensure correct fee",() => {

    let amount_input, amount_output

  
        const txo11 = new TXO('i1', 100)
        const txo22 = new TXO('i2', 200)
        const txo33 = new TXO('i3', 300)
        const txo44 = new TXO('i4', 400)

        const inputUTXOs = [txo33, txo44]
        const outputUTXOs = [txo11, txo22]

        const transaction2 = new TRANSACTION(inputUTXOs, outputUTXOs)

        transaction2.execute()
        amount_input = transaction2.inputUTXOs.reduce(
        (total, atual) => total + atual.amount, 0
        )
        amount_output = transaction2.outputUTXOs.reduce(
        (total, atual) => total + atual.amount, 0
        )
    

    
    it("fees calculate", () =>{
        expect(transaction2.fee).toBe(amount_input - amount_output)
    })
})
    
