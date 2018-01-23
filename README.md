# React Workflow

## Props

Required:

- [nodes](#nodes)
- [paths](#paths)
- [types](#types)

Not Required:

- [parameters](#parameters)

---

### nodes

An array of nodes.

<a name="node" href="#node">#</a> node

```javascript
node = {
  id:     string, // Unique ID to differentiate between nodes.
  title:  string, // Title to display on the workspace block.
  x:      number, // X-coordinate of the block in the workspace.
  y:      number, // Y-coordinate of the block in the workspace.
  type:   string, // The block style type to represent this node.
  groups: array,  // Array of groups that this node is in.
};

group = {
  id: string,        // Unique ID to differentiate groups.
  title: string,     // Title of the group for the blocks library.
};
```

---

### edges

An array of edges.

<a name="edge" href="#edge">#</a> edge

```javascript
edge = {
  id:     string, // Unique ID to differentiate between edges.
  title:  string, // Title to display on the workspace path.
  source: string, // The start node for the edge.
  target: string, // The end node for the edge.
  points: [],     // Array of points (can be empty if no added points).
  type:   string, // The path style type to represent this edge.
};

point = {x: number, y: number}; // Represents the coordinates of a point.
```

---

### types

An object representing various styles for blocks and paths.

```javascript
types = {
  blocks: {
    // The name here should match the name given in your node object.
    startCircle: {
      shape: WorkflowShapes.Circle,
      style: {
        fill: '#eaeaea',
        stroke: '#333',
        strokeWidth: '1px',
      }
    }
  },
  paths: {
    // The name here should match the name given in your edge object.
    defaultPath: {
      style: {
        stroke: '#333',
        strokeWidth: '1px',
      }
    }
  }
};
```

---

### parameters

Props to define parts of the workflow.

> Note: This entire object is optional. In addition, any individual property
> can be omitted in favor of the default value.

```javascript
parameters = {
  /* Grid Parameters */
  gridSize: number,             // Size of grid. Default: 0 (no grid)
  showGrid: boolean,            // Show the visual grid. Default: false
  gridColor: string,            // Color of grid. Default: '#eee'
  /* Workspace Parameters */
  initialWidth: number,         // Initial width of workspace. Default: TBD
  initialHeight: number,        // Initial height of workspace. Default: TBD
  /* Block Parameters */
  allowAdjacentBlocks: boolean, // Blocks can be placed touching. Default: false
  /* Path Parameters */
  manhattanRouting: boolean,    // Paths route at 90° angles. Default: false
}
```