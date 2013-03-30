//var FileStore = require("./FileStore.js");

////////////////////////////////////////////////////////////////////////////////
function FileNode(fileStore, name)
{
	

	this.name = name;
	
	// The mime type of the file
	// we should support 'inode/directory' & 'text/plain' to begin.
	this.type = null;
	
	// Reference to the FileStore this node belongs to.
	this.fileStore = fileStore;
	
	
	// Tree linkage.
	this._parent = null;
	this._children = [];
	
	// This should eventually point to a metadata structure.
	this._metadata = null;
	    

	// Contains the data.
	this._payload = '';
	
	
	
}


FileNode.prototype = 
{
	
	getFilestore: function()
	{
		
		return require("./FileStore.js").mounts[this.fileStore];
		
	},
	
	getChildren: function(success, error)
	{
		
		var self = this;
		
		this.getFilestore().getChildren(this, function(children)
		{
			
			self._children = children;
			success(self._children);
			
		});
		
		
	},
	
	
	
	getPayload: function(success, error)
	{
		
		var self = this;
		
		this.getFilestore().getPayload(this, function(payload)
		{

			self._payload = payload;
			success(payload);

		});
		
		
	},
	
	
	setPayload: function(payload, success, error)
	{
		
		var self = this;
		
		this.getFilestore().setPayload(this, payload, function(node)
		{
			
			this._payload = payload;
			success(node);
			
		});
		
		
		
	},
	
	// Given a name, this will create a node passed to the first parameter of success.
	createChild: function(name, success, error)
	{
		
		var self = this;
		
		this.getFilestore().createNode(name, function(node)
		{
			
			
			
			self.getFilestore().linkNode(node, self, function(node)
			{
				
				success(node);

			});
			
			
			
		});
		
		
		
	}
	
	
}
////////////////////////////////////////////////////////////////////////////////



function PayloadStore()
{
	
	this.pfx = 'payload';
	
}

PayloadStore.prototype =
{
	insert: function(id, payload)
	{
		
		localStorage[this.pfx + '-' + id] = payload;
		
	},
	
	retrieve: function(id)
	{
		
		return localStorage[this.pfx + '-' + id];
		
	}
	
}

function StoreTree(filenode)
{
	
	var fs = JSON.stringify(filenode, function(key, value)
	{
		// skip circular references.
		if (key == "fileStore" || key == "_parent")
			return null;
		else
		   return value;

	});
	
	
	localStorage['filestore'] = fs;
	
}


function LoadTree(filenode)
{
	// Doesnt work-- loses type.
	
	// need to reconnect filestore and nodes.
	var fs = localStorage['filestore'];
	
	fs = JSON.parse(fs);
	
	
	fs.__proto__ = FileNode.prototype;
	
	return fs;
	
	
}


module.exports = FileNode;
