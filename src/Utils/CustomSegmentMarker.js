function DefaultSegmentMarker(options) {
  console.log("optionsoptions", options);
  options.draggable = true;
  this._options = options;
}

DefaultSegmentMarker.prototype.init = function (group) {
  var handleWidth = 10;
  var handleHeight = 20;
  var handleX = -(handleWidth / 2) + 0.5; // Place in the middle of the marker

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
  console.log(this._options)
  this._caption = new window.Konva.Text({
    x: xPosition + 30,
    y: 0,
    text: this._options.startMarker ? this._options.segment._labelText : "",
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
  group.add(this._caption);

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
