class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }
    getRoot() {
        return this.makeTree(this.leaves)
    }

    getProof(){
        
    }

    makeTree(leaves){

        if(leaves.length == 1){
            return leaves[0];
        }
        let new_leaves = []
        for(var i = 0; i < leaves.length; i += 2 ){
            const left = leaves[i]
            const right = leaves[i+1]
            if (!right){
                new_leaves.push(left)    
            }
            else{
                new_leaves.push(this.concat(left, right))
            }
            
        }
        return this.makeTree(new_leaves)
    }
}

module.exports = MerkleTree;

describe('merkle', function() {
    const concat = (a, b) => `Hash(${a} + ${b})`;
    it('should create a root from two leaves: [A,B]', function() {
      const leaves = ['A', 'B'];
      const merkleTree = new MerkleTree(leaves, concat);
  
      expect(merkleTree.getRoot()).toBe("Hash(A + B)");
    });
    it('should handle a nase case [A]',()=>{
        const leaves = ['A']
        const merkleTree = new MerkleTree(leaves, concat);

        expect(merkleTree.getRoot()).toBe("A");
    })

    it('should create a root from two leaves: [A,B,C]', function() {
        const leaves = ['A', 'B', 'C'];
        const merkleTree = new MerkleTree(leaves, concat);
    
        expect(merkleTree.getRoot()).toBe("Hash(Hash(A + B) + C)");
      });
});