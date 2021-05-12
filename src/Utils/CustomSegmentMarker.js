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
    // visible: this._options.segment.attributes.visibleMarkers,
  });

  //Caption
  this._caption = new window.Konva.Text({
    x: xPosition + 40,
    y: 15,
    text: this._options.segment._id + 1 + ": " + this._options.segment.attributes.label,
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

  // var xPosition = self._options.startMarker ? -24 : 24;

  // if (self._options.draggable) {
  //     group.on("dragstart", function () {
  //       if (self._options.startMarker) {
  //         self._label.setX(xPosition - self._label.getWidth());
  //       }

  //       self._label.show();
  //       self._options.layer.draw();
  //     });

  //   group.on("dragend", function () {
  //     self.resizeCaption();
  //     self._label.hide();
  //     self._options.layer.draw();
  //   });
  // }

  // self._handle.on("mouseover", function () {

  //   // self._handle.show()
  // });

  // self._handle.on("mouseout", function (e) {
  //   let endMarker = self._options.layer._segmentShapes[self._options.segment._id].getEndMarker();
  //   let startMarker = self._options.layer._segmentShapes[
  //     self._options.segment._id
  //   ].getStartMarker();

  //   let mousePos = e.evt.layerX;

  //   if (self._options.startMarker && mousePos < startMarker.getX()) {

  //     self._handle.hide();
  //     endMarker._marker._handle.hide();
  //   } else if(!self._options.startMarker && mousePos > endMarker.getX()) {
  //     startMarker._marker._handle.hide();
  //     self._handle.hide();
  //   }
  //   self._options.layer.draw();
  // });

  setTimeout(() => {
    self.resizeCaption();
    defineBounds(self, group);
    // defineMouseOver(self)
  }, 50);
};

// function defineMouseOver(self,group){
//   let segmentShape = self._options.layer._segmentShapes[self._options.segment._id]

//   segmentShape._onMouseEnter = segmentShapeOnMouseEnter
// }


function newDragBoundFunc(self) {
  return function (pos) {
    self.resizeCaption();
    let startMarker = self._options.layer._segmentShapes[
      self._options.segment._id
    ].getStartMarker();
    let endMarker = self._options.layer._segmentShapes[self._options.segment._id].getEndMarker();

    let rightNeighbour = self._options.layer._segmentShapes[self._options.segment._id + 1];

    let bounds = { min: 0, max: 9999 };

    if (self._options.startMarker) {
      let leftNeighbour = self._options.layer._segmentShapes[self._options.segment._id - 1];
      if (endMarker) bounds.max = endMarker.getX() - endMarker.getWidth();
      if (leftNeighbour) {
        bounds.min = leftNeighbour.getStartMarker().getX();

        if (leftNeighbour.getEndMarker().getX() >= pos.x && pos.x > bounds.min) {
          leftNeighbour.getEndMarker().setX(pos.x);

          leftNeighbour._segment._setEndTime(
            leftNeighbour._view.pixelsToTime(leftNeighbour._view.getFrameOffset() + pos.x)
          );
          leftNeighbour.getEndMarker()._marker.resizeCaption();
        }
      }
    } else {
      if (startMarker) bounds.min = startMarker.getX() + startMarker.getWidth();
      if (rightNeighbour) {
        bounds.max = rightNeighbour.getEndMarker().getX();

        if (rightNeighbour.getStartMarker().getX() <= pos.x && pos.x < bounds.max) {
          rightNeighbour.getStartMarker().setX(pos.x);
          rightNeighbour._segment._setStartTime(
            rightNeighbour._view.pixelsToTime(rightNeighbour._view.getFrameOffset() + pos.x)
          );

          rightNeighbour.getStartMarker()._marker.resizeCaption();
        }
      }
    }
    return {
      x: pos.x > bounds.max ? bounds.max : pos.x < bounds.min ? bounds.min : pos.x,
      y: 0,
    };
  };
}

function defineBounds(self, group) {
  group.attrs.dragBoundFunc = newDragBoundFunc(self);
}

DefaultSegmentMarker.prototype.resizeCaption = function () {
  
  const segmentShape = this._options.layer._segmentShapes[this._options.segment._id]

  if(!segmentShape) return;
  
  let startMarker = segmentShape.getStartMarker();
  let endMarker = segmentShape.getEndMarker();
  let caption = startMarker._group.children[3];
  if (caption) caption.setWidth(endMarker.getX() - startMarker.getX() - 30);
  this._options.layer.draw();
};

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
