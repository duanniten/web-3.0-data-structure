const TXO = require('../src/models/TXO.js')

const txo =  new TXO(owner = 'T1', amount = 100);

describe("constructor", () => {
    it("store the values passed into it on properties of the same name", ()=>{
        expect(txo.owner).toBe("T1");
        expect(txo.amount).toBe(100);
    }),
    it('property spent and default it to false.', ()=>{
        expect(txo.spent).toBe(false);
    })
})

describe("spend", () => {
    it('spend function should set the spent property to true.', () =>{
        txo.spend()
        expect(txo.spent).toBe(true);
    }) 
})