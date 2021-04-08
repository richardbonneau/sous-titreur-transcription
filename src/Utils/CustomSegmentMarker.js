function DefaultSegmentMarker(options) {
  options.draggable = true;
  this._options = options;
}

DefaultSegmentMarker.prototype.init = function (group) {
  var handleWidth = 15;
  var handleHeight = 30;
  var handleX = this._options.startMarker ? 0 : -handleWidth; // Place in the middle of the marker

  var xPosition = this._options.startMarker ? -24 : 24;

  var time = this._options.startMarker
    ? this._options.segment.startTime
    : this._options.segment.endTime;

  // Label - create with default y, the real value is set in fitToView().
  this._label = new window.Konva.Text({
    x: xPosition,
    y: 0,
    text: this._options.layer.formatTime(time),
    fontFamily: this._options.fontFamily,
    fontSize: this._options.fontSize,
    fontStyle: this._options.fontStyle,
    fill: "#000",
    textAlign: "center",
  });

  this._label.hide();

  // Handle - create with default y, the real value is set in fitToView().
  this._handle = new window.Konva.Rect({
    x: handleX,
    y: 0,
    width: handleWidth,
    height: handleHeight,
    fill: this._options.color,
    stroke: this._options.color,
    strokeWidth: 1,
  });

  //Caption
  this._caption = new window.Konva.Text({
    x: xPosition + 40,
    y: 15,
    text: this._options.segment.attributes.label,
    fontFamily: this._options.fontFamily,
    fontSize: this._options.fontSize,
    fontStyle: this._options.fontStyle,
    fill: "#000",
    textAlign: "left",
  });

  // Vertical Line - create with default y and points, the real values
  // are set in fitToView().
  this._line = new window.Konva.Line({
    x: 0,
    y: 0,
    stroke: this._options.color,
    strokeWidth: 1,
  });

  group.add(this._label);
  group.add(this._line);
  group.add(this._handle);
  if (this._options.startMarker) group.add(this._caption);

  this.fitToView();
  this.bindEventHandlers(group);
};

DefaultSegmentMarker.prototype.bindEventHandlers = function (group) {
  var self = this;

  var xPosition = self._options.startMarker ? -24 : 24;

  if (self._options.draggable) {
    group.on("dragstart", function () {
      if (self._options.startMarker) {
        self._label.setX(xPosition - self._label.getWidth());
      }

      self._label.show();
      self._options.layer.draw();
    });

    group.on("dragend", function () {
      resizeCaption(self, group);
      self._label.hide();
      self._options.layer.draw();
    });
  }

  self._handle.on("mouseover touchstart", function () {
    if (self._options.startMarker) {
      self._label.setX(xPosition - self._label.getWidth());
    }

    self._label.show();
    self._options.layer.draw();
  });

  self._handle.on("mouseout touchend", function () {
    self._label.hide();
    self._options.layer.draw();
  });
  setTimeout(() => resizeCaption(self, group, false), 50);
};

function newDragBoundFunc(bounds) {
  return function (pos) {
    let newX;
    newX = pos.x > bounds.max ? bounds.max : pos.x < bounds.min ? bounds.min : pos.x;
    return {
      x: newX,
      y: 0,
    };
  };
}

// SegmentMarker.prototype._dragBoundFunc = function (pos) {
//   var marker;
//   var limit;
//   if (this._startMarker) {
//       marker = this._segmentShape.getEndMarker();
//       limit = marker.getX() - marker.getWidth();
//       if (pos.x > limit) {
//           pos.x = limit;
//       }
//   } else {
//       marker = this._segmentShape.getStartMarker();
//       limit = marker.getX() + marker.getWidth();
//       if (pos.x < limit) {
//           pos.x = limit;
//       }
//   }
//   return {
//       x: pos.x,
//       y: this._group.getAbsolutePosition().y
//   };
// };

function resizeCaption(self, group) {
  let startMarker = self._options.layer._segmentShapes[self._options.segment._id].getStartMarker();
  let endMarker = self._options.layer._segmentShapes[self._options.segment._id].getEndMarker();

  let caption = startMarker._group.children[3];
  caption.setWidth(endMarker._group.attrs.x - startMarker._group.attrs.x - 10);

  console.log("self._options.layer._segmentShapes", self._options);

  let newbounds = { min: 0, max: 9999 };
  let closestNeighbourNewBounds = {};
  let leftNeighbour = self._options.layer._segmentShapes[self._options.segment._id - 1];
  let rightNeighbour = self._options.layer._segmentShapes[self._options.segment._id + 1];

  if (self._options.startMarker) {
    if (rightNeighbour) newbounds.max = rightNeighbour.getStartMarker().getX();
    newbounds.min = startMarker.getX();
    if (leftNeighbour) {
      closestNeighbourNewBounds.min = leftNeighbour.getStartMarker().getX();
      closestNeighbourNewBounds.max = startMarker.getX();
      leftNeighbour.getEndMarker()._group.attrs.dragBoundFunc = newDragBoundFunc(
        closestNeighbourNewBounds
      );
    }
    endMarker._group.attrs.dragBoundFunc = newDragBoundFunc(newbounds);
  } else {
    if (leftNeighbour) newbounds.min = leftNeighbour.getEndMarker().getX();
    newbounds.max = endMarker.getX();

    if (rightNeighbour) {
      closestNeighbourNewBounds.min = endMarker.getX();
      closestNeighbourNewBounds.max = rightNeighbour.getEndMarker().getX();
      rightNeighbour.getStartMarker()._group.attrs.dragBoundFunc = newDragBoundFunc(
        closestNeighbourNewBounds
      );
    }
    startMarker._group.attrs.dragBoundFunc = newDragBoundFunc(newbounds);
  }

  // group.attrs.dragBoundFunc = newDragBoundFunc(newbounds)

  // if (group._id === startMarkerGroup._id) {
  //   let otherMarkerBounds = {
  //     min: startMarkerGroup.attrs.x,
  //     max: neighbours.right ? neighbours.right.attrs.x : 9999,
  //   };

  //   if (neighbours.left) {
  //     console.log("neighbourWithBoundsToUpdate", neighbourWithBoundsToUpdate);
  //     neighbours.left.attrs.dragBoundFunc = newDragBoundFunc(neighbourWithBoundsToUpdate);
  //   }
  //   endMarkerGroup.attrs.dragBoundFunc = newDragBoundFunc(otherMarkerBounds);
  // } else if (group._id === endMarkerGroup._id) {
  //   let otherMarkerBounds = {
  //     min: neighbours.left ? neighbours.left.attrs.x : 0,
  //     max: endMarkerGroup.attrs.x,
  //   };
  //   // console.log("bounds",bounds,endMarkerGroup,children)
  //   if (neighbours.right) {
  //     console.log("neighbourWithBoundsToUpdate", neighbourWithBoundsToUpdate);
  //     neighbours.right.attrs.dragBoundFunc = newDragBoundFunc(neighbourWithBoundsToUpdate);
  //   }
  //   startMarkerGroup.attrs.dragBoundFunc = newDragBoundFunc(otherMarkerBounds);
  // }
}

// function resizeCaption(self, group) {
//   let children = self._options.layer._layer.children;
//   let startMarkerGroup;
//   let endMarkerGroup;
//   let neighbours = {};
//   let neighbourWithBoundsToUpdate = { min: 0, max: 0 };
//   console.log("children", children, "group", group);
//   if (self._options.startMarker) {
//     startMarkerGroup = group;
//     children.forEach((child, i) => {
//       if (child.index === startMarkerGroup.index - 3) {
//         console.log("left neighbours endmark", child);
//         neighbours.left = child;
//       } else if (child.index === startMarkerGroup.index + 4) {
//         console.log("right neighbour startmark", child);
//         neighbours.right = child;
//       } else if (child.index === startMarkerGroup.index - 4) {
//         console.log("left neighbours startmark", child);
//         neighbourWithBoundsToUpdate.min = child.attrs.x;
//       } else if (child.index === startMarkerGroup.index + 1) {
//         console.log("endmark", child);
//         endMarkerGroup = child;
//       }
//     });
//     neighbourWithBoundsToUpdate.max = startMarkerGroup.attrs.x;
//   } else {
//     endMarkerGroup = group;
//     children.forEach((child, i) => {
//       if (child.index === endMarkerGroup.index + 3) {
//         console.log("right neighbour startmark", child);
//         neighbours.right = child;
//       } else if (child.index === endMarkerGroup.index - 4) {
//         console.log("left neighbour endmark", child);
//         neighbours.left = child;
//       } else if (child.index === endMarkerGroup.index + 4) {
//         console.log("right neighbour endmark", child);
//         neighbourWithBoundsToUpdate.max = child.attrs.x;
//       } else if (child.index === endMarkerGroup.index - 1) {
//         console.log("this neighbour startmark", child);
//         startMarkerGroup = child;
//       }
//     });
//     neighbourWithBoundsToUpdate.min = endMarkerGroup.attrs.x;
//   }

//   let caption = startMarkerGroup.children[startMarkerGroup.children.length - 1];
//   caption.setWidth(endMarkerGroup.attrs.x - startMarkerGroup.attrs.x - 10);

//   const newDragBoundFunc = function (bounds) {
//     return function (pos) {
//       let newX;
//       newX = pos.x > bounds.max ? bounds.max : pos.x < bounds.min ? bounds.min : pos.x;
//       return {
//         x: newX,
//         y: 0,
//       };
//     };
//   };

//   if (group._id === startMarkerGroup._id) {
//     let otherMarkerBounds = {
//       min: startMarkerGroup.attrs.x,
//       max: neighbours.right ? neighbours.right.attrs.x : 9999,
//     };

//     if (neighbours.left) {
//       console.log("neighbourWithBoundsToUpdate",neighbourWithBoundsToUpdate)
//       neighbours.left.attrs.dragBoundFunc = newDragBoundFunc(neighbourWithBoundsToUpdate);
//     }
//     endMarkerGroup.attrs.dragBoundFunc = newDragBoundFunc(otherMarkerBounds);
//   } else if (group._id === endMarkerGroup._id) {
//     let otherMarkerBounds = {
//       min: neighbours.left ? neighbours.left.attrs.x : 0,
//       max: endMarkerGroup.attrs.x,
//     };
//     // console.log("bounds",bounds,endMarkerGroup,children)
//     if (neighbours.right) {
//       console.log("neighbourWithBoundsToUpdate",neighbourWithBoundsToUpdate)
//       neighbours.right.attrs.dragBoundFunc = newDragBoundFunc(neighbourWithBoundsToUpdate);
//     }
//     startMarkerGroup.attrs.dragBoundFunc = newDragBoundFunc(otherMarkerBounds);
//   }
// }

DefaultSegmentMarker.prototype.fitToView = function () {
  var height = this._options.layer.getHeight();

  this._label.y(height / 2 - 5);
  this._handle.y(height / 2 - 10.5);

  this._line.points([0.5, 0, 0.5, height]);
};

DefaultSegmentMarker.prototype.timeUpdated = function (time) {
  this._label.setText(this._options.layer.formatTime(time));
};

export function createSegmentMarker(options) {
  return new DefaultSegmentMarker(options);
}
