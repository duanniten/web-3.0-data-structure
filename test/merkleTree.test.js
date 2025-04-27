class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }
    getRoot() {
        return this.makeTree(this.leaves)
    }

    getProof(index) {
        this.proof = []
        this.makeTree(this.leaves, index)
        console.log(this.proof)
        return this.proof
    }

    makeTree(leaves, index = false) {
        if (leaves.length == 1) {
            return leaves[0];
        }
        let new_leaves = []
        for (var i = 0; i < leaves.length; i += 2) {
            if (i === index) {
                index = new_leaves.length
                this.proof.push({
                    data: leaves[i + 1],
                    left: false
                },)
            }
            else if (i + 1 == index) {
                index = new_leaves.length
                this.proof.push({
                    data: leaves[i],
                    left: true
                },)
            }

            const left = leaves[i]
            const right = leaves[i + 1]
            if (!right) {
                new_leaves.push(left)
            }
            else {
                new_leaves.push(this.concat(left, right))
            }

        }
        return this.makeTree(new_leaves)
    }
}

module.exports = MerkleTree;

describe('merkle', function () {
    const concat = (a, b) => `Hash(${a} + ${b})`;
    it('should create a root from two leaves: [A,B]', function () {
        const leaves = ['A', 'B'];
        const merkleTree = new MerkleTree(leaves, concat);

        expect(merkleTree.getRoot()).toBe("Hash(A + B)");
    });
    it('should handle a nase case [A]', () => {
        const leaves = ['A']
        const merkleTree = new MerkleTree(leaves, concat);

        expect(merkleTree.getRoot()).toBe("A");
    })

    it('should create a root from two leaves: [A,B,C]', function () {
        const leaves = ['A', 'B', 'C'];
        const merkleTree = new MerkleTree(leaves, concat);

        expect(merkleTree.getRoot()).toBe("Hash(Hash(A + B) + C)");
    });

    it('should return the proof from a index', () => {
        const leaves = ['A', 'B', 'C', 'D', 'E'];
        const merkleTree = new MerkleTree(leaves, concat);
        const index = 2;
        const expect_proof = [
            { data: 'D', left: false },
            { data: 'AB', left: true },
            { data: 'E', left: false }
        ]

        expect(merkleTree.getProof(index)).toBe(expect_proof)
    })
});