const Node = require("../models/node")

class Tree {
    constructor() {
        this.root = null;
    }

    hasNode(node_data){
        return this.searchNode(node_data, this.root)
    }

    searchNode(node_data, actual_node){
        if (!actual_node) {
            return false
        }
        else if (node_data == actual_node.data){
            return true
        }
        else if (node_data < actual_node.data){
            return this.searchNode(node_data, actual_node.left)
        }
        else if (node_data > actual_node.data){
            return this.searchNode(node_data, actual_node.right)
        }
        
    }

    addNode(node){
        if (!this.root) {
            this.root = node
        }
        else {
            this.addChild(this.root, node)
        }
    }
    addChild(parent, child){
        if (child.data > parent.data){
            if (!parent.right){
                parent.right = child  
            }
            else{
                this.addChild(parent.right, child)
            }
        }
        if (child.data < parent.data){
            if (!parent.left){
                parent.left = child
            }
            else{
                this.addChild(parent.left, child)
            }
        }
    }
}

module.exports = Tree;