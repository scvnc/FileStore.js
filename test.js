var async = require("async");
var FileNode = require("./FileNode.js");
var FileStore = require("./FileStore.js");
var FilePayload = require("./FilePayload.js");





filestore = new FileStore(function(fileStore)
{
	
	fileStore.root.createChild("File1", function()
	{
		
		
		fileStore.root.createChild("File2", function()
		{
			
			
			
			fileStore.root.getChildren(function(children)
			{
				
				async.each(children, function(child)
				{
					
					fileStore.getNode(child, function(node)
					{
						
						node.getPayload(function(payload)
						{
							console.log(payload);
						});
						
					});
				}, 
				
				function(err)
				{
					
					
				});
				

				
				
				
			});
			
		});
		
	});
	
});
