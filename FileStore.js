var FileNode = require("./FileNode.js");
var uuid = require("node-uuid");
console.log(FileNode);
////////////////////////////////////////////////////////////////////////////////
/**
 * IFileStore draft
 * 
 * The storage device.
 * 
 * Largely implements how to retrieve nodes and their payloads.
 * 
 * */
function FileStore(success) 
{
	
	this.id = uuid.v1();
	
    // Make a new FileNode representing the root node.
    
	this.root = new FileNode(this.id, "/");
	
	
	
	
	
	// Implementation
	this.fileNodes = {};
	this.nodePayloads = {};
	this.fileNodeId = 0;
	
	this.root.id = 0;
	
	// end implementation
	
	FileStore.mounts[this.id] = this;
	success(this);
	
}

FileStore.prototype =
{
	
	getPayload: function(node, success, error)
	{
		
		// In this case we get the payload directly from the tree.
		// Perhaps it could be retrieved from a REST call.
		
		var payload = (this.nodePayloads[node.id] == undefined) ? '' : this.nodePayloads[node.id];
		
		success(payload);
	},
	
	
	setPayload: function(node, payload, success, error)
	{
		
		
		// In this case we get the payload directly from the tree.
		// Perhaps it could be retrieved from a REST call.
		
		this.nodePayloads[node.id] = payload;
		
		
		
		success(node);
		
	},
	
	
	getChildren: function(node, success, error)
	{
		
		
		// Logic to retrieve children nodes from driver.
		
		
		// In this case we're just doing it all in an in-memory tree.
		var children = node._children;
		
		
		//return children
		success(children);
		
		
		
	},
	
	
	
	createNode: function(name, success, error)
	{
		
		var node = new FileNode(this.id, name)
		
		//implementation 
		node.id = this.fileNodeId++;
		
		// Store filenode
		this.fileNodes[node.id] = node;
		
		// Store node payload
		this.nodePayloads[node.id] = 'debug';
		
		// end implementation
		
		
		
		success(node);
		
	},
	
	
	
	linkNode: function(node, parent, success, error)
	{
		
		
		// Logic to retrieve children nodes from driver.
		
		
		// Link child to parent.
		node._parent = parent.id;
		

		// Link parent to child.
		parent._children.push(node.id);
		
		
		success(node);
		
		
	},
	
	
	getNode: function(id, success, error)
	{
		
		var fileNode = this.fileNodes[id];
		
		success(fileNode);
		
	}
	
	
	
}

FileStore.mounts = {};

module.exports = FileStore;
