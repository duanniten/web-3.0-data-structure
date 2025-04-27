const Tree = require("../src/models/tree")
const Node = require("../src/models/node")

describe("tree test",()=>{
    let tree = new Tree()
    let root_node = new Node(5)

    let first_left = new Node(3);
    let first_right = new Node(7);
  
    let secound_left_left = new Node(2);
    let secound_left_right = new Node(4);
    let secound_rigt_left = new Node(6);
    let secound_right_right = new Node(9);
    

    it("tree strar if null in root note",()=>{
        expect(tree.root).toBe(null)
    })

    it("place root node ",()=>{
        tree.addNode(root_node);
        expect(tree.root).toBe(root_node)
    })

    it("check root right and left",()=>{
        tree.addNode(first_left);
        tree.addNode(first_right);
        expect(tree.root.right.data).toBe(first_right.data);
        expect(tree.root.left.data).toBe(first_left.data);
    })

    it("check root right and left",()=>{
        tree.addNode(first_left);
        tree.addNode(first_right);
        expect(tree.root.right.data).toBe(first_right.data);
        expect(tree.root.left.data).toBe(first_left.data);
    })

    it("check level tree", ()=>{

        tree.addNode(secound_left_left);
        tree.addNode(secound_left_right);
        tree.addNode(secound_rigt_left);
        tree.addNode(secound_right_right);

        expect(tree.root.left.left.data).toBe(secound_left_left.data);
        expect(tree.root.left.right.data).toBe(secound_left_right.data);
        expect(tree.root.right.left.data).toBe(secound_rigt_left.data);
        expect(tree.root.right.right.data).toBe(secound_right_right.data);
        

    })
    it("check has node funcion", ()=>{
        expect(tree.hasNode(secound_left_right.data)).toBe(true)
        expect(tree.hasNode(17)).toBe(false)
    })

})