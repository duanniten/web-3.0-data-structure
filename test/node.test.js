const Node = require("../src/models/node")

describe('check Node',()=>{
    root_value = 5;
    let root_node = new Node(root_value);

    it('Check root node, stat value and null for left and right',()=>{
        expect(root_node.data).toBe(root_value);
        expect(root_node.left).toBe(null);
        expect(root_node.right).toBe(null);
    })
})