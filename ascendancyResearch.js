// Queue class 
class Queue 
{ 
    // Array is used to implement a Queue 
	// https://www.geeksforgeeks.org/implementation-queue-javascript/
    constructor() 
    { 
        this.items = []; 
    } 
	
	length()
	{
		return this.items.length;
	}
                  
    // Functions to be implemented 
	// enqueue function 
	enqueue(element) 
	{     
		// adding element to the queue 
		this.items.push(element); 
	} 
	// dequeue function 
	dequeue() 
	{ 
		// removing element from the queue 
		// returns underflow when called  
		// on empty queue 
		if(this.isEmpty()) 
			return "Underflow"; 
		return this.items.shift(); 
	}
     // front function 
	front() 
	{ 
		// returns the Front element of  
		// the queue without removing it. 
		if(this.isEmpty()) 
			return "No elements in Queue"; 
		return this.items[0]; 
	} 

    // isEmpty function 
	isEmpty() 
	{ 
		// return true if the queue is empty. 
		return this.items.length == 0; 
	} 
    // printQueue function 
	printQueue() 
	{ 
		var str = ""; 		
		for(var i = 0; i < this.items.length; i++) { 
			// console.log(this.items[i]);
			str += this.items[i] + " " + this.data[this.items[i]]["days"]; 
		}
		
		return str; 
	} 
} 

class Graph {
    // defining vertex array and adjacent list
	// based on: https://www.geeksforgeeks.org/implementation-graph-javascript/
    constructor(vertices)
	{
		this.data = vertices
        this.noOfVertices = 0;
        this.AdjList = new Map(); // adjacency map for research
		this.ItemList = new Object(); // mapping items to research
		this.ResearchList = new Object(); // list of available research
		
		// console.log(vertices);
	    var count = Object.keys(vertices).length;
		console.log("Adding " + count + " vertices.");
		const keys = Object.keys(vertices)
		
		// add all vertices first
		for (const key of keys) {
		  // console.log(key);
		  this.data[key]['name'] = key;
		  //console.log(vertices[key]);
		  this.addVertex(key);
		  this.ResearchList[key] = '';
		  for (const item of vertices[key]["items"]) {
			// console.log(item + " requires " + key);
			if(item != "none"){
				this.ItemList[item] = key;
			}
		  }
		}
		
		// add all edges second
		for (const key of keys) {
		  // console.log(key);
		  // console.log(vertices[key]["requires"]);
		  for (const prerequisite of vertices[key]["requires"]) {
			// console.log(key + " requires " + prerequisite);
			if(prerequisite != "none"){
				this.addEdge(key, prerequisite);
			}
		  }
		}
		
		
    }
	
	getSimilarItems(searchTerm)
	{
		this.SearchTerms = []
		var searchTermUpper = searchTerm.toUpperCase()
		for (var key in this.ItemList)
		{
			// split key by space
			var a = key.toUpperCase().split(" "), i;
			for (i = 0; i < a.length; i++) 
			{
				// check for search term
				if(a[i].includes(searchTermUpper))
				{
					// if index is 1, add to front
					// if index is larger, add to back
					var searchTermIndex = a[i].indexOf(searchTermUpper)
					//console.log(`${searchTermIndex}`);
					if(searchTermIndex == 0)
					{
						this.SearchTerms.unshift(key)
					}
					else
					{
						this.SearchTerms.push(key)
					}
					//console.log(`${key}`);
					break;
				}
			}
		}
		return this.SearchTerms
	}
	
	
	getSimilarResearch(searchTerm)
	{
		this.SearchTerms = []
		var searchTermUpper = searchTerm.toUpperCase()
		for (var key in this.ResearchList)
		{
			// split key by space
			var a = key.toUpperCase().split(" "), i;
			for (i = 0; i < a.length; i++) 
			{
				// check for search term
				if(a[i].includes(searchTermUpper))
				{
					// if index is 1, add to front
					// if index is larger, add to back
					var searchTermIndex = a[i].indexOf(searchTermUpper)
					//console.log(`${searchTermIndex}`);
					if(searchTermIndex == 0)
					{
						this.SearchTerms.unshift(key)
					}
					else
					{
						this.SearchTerms.push(key)
					}
					//console.log(`${key}`);
					break;
				}
			}
		}
		return this.SearchTerms
	}
	
	getResearchForItem(item)
	{
		// Identify which research is required for a given item
		return this.ItemList[item] ;
	}
 
    // add vertex to the graph
	addVertex(v)
	{
		// initialize the adjacent list with a null array
		this.AdjList.set(v, []);
		this.noOfVertices += 1;
	}

	// add edge to the graph
    addEdge(v, w)
	{
		// get the list for vertex v and put the vertex w denoting edge betweeen v and w
		this.AdjList.get(v).push(w);
	}

	// Prints the vertex and adjacency list
	printGraph()
	{
		console.log("printing graph...");
		for (var [key,val] of this.AdjList)
		{
		console.log(`${key} -> ${val.toString()}`);
		}
		console.log("Printed " + this.AdjList.length + " values.");
	}

	// function to performs BFS
	bfs(startingNode)
	{
	 
		// create a visited array
		var visited = [];
		var needed_research = [];
		for (var i = 0; i < this.noOfVertices; i++)
			visited[i] = false;
	 
		// Create an object for queue
		var q = new Queue();
	 
		// add the starting node to the queue
		visited[startingNode] = true;
		q.enqueue(startingNode);
		// console.log("needed_research length: " + needed_research.length);
		// loop until queue is element
		while (!q.isEmpty()) {
			// get the element from the queue
			var getQueueElement = q.dequeue();
	 
			// passing the current vertex to callback funtion
			// console.log(getQueueElement);
			needed_research.push(this.data[getQueueElement]);
	 
			// get the adjacent list for current vertex
			var get_List = this.AdjList.get(getQueueElement);
	 
			// loop through the list and add the element to the
			// queue if it is not processed yet
			for (var i in get_List) {
				var neigh = get_List[i];
	 
				if (!visited[neigh]) {
					visited[neigh] = true;
					q.enqueue(neigh);
				}
			}
		}
		
		needed_research.sort(function (a, b) {
			// console.log(a + ', ' + a.days + ' vs. ' + b + ', ' + b.days);
			return a.days - b.days;
		});
		console.log("needed_research length: " + needed_research.length);
		return needed_research;
	}
}