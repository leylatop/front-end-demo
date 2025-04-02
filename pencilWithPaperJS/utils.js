const smoothControlPoints = function (ct1, ct2, pt) {
  // each point must not be the origin
  var x1 = ct1.x - pt.x,
    y1 = ct1.y - pt.y,
    x2 = ct2.x - pt.x,
    y2 = ct2.y - pt.y;

  if ((x1 != 0 || y1 != 0) && (x2 != 0 || y2 != 0)) {
    var anglea = Math.atan2(y1, x1),
      angleb = Math.atan2(y2, x2),
      r1 = Math.sqrt(x1 * x1 + y1 * y1),
      r2 = Math.sqrt(x2 * x2 + y2 * y2),
      nct1 = svgRoot.createSVGPoint(),
      nct2 = svgRoot.createSVGPoint();
    if (anglea < 0) { anglea += 2 * Math.PI; }
    if (angleb < 0) { angleb += 2 * Math.PI; }

    var angleBetween = Math.abs(anglea - angleb),
      angleDiff = Math.abs(Math.PI - angleBetween) / 2;

    var new_anglea, new_angleb;
    if (anglea - angleb > 0) {
      new_anglea = angleBetween < Math.PI ? (anglea + angleDiff) : (anglea - angleDiff);
      new_angleb = angleBetween < Math.PI ? (angleb - angleDiff) : (angleb + angleDiff);
    }
    else {
      new_anglea = angleBetween < Math.PI ? (anglea - angleDiff) : (anglea + angleDiff);
      new_angleb = angleBetween < Math.PI ? (angleb + angleDiff) : (angleb - angleDiff);
    }

    // rotate the points
    nct1.x = r1 * Math.cos(new_anglea) + pt.x;
    nct1.y = r1 * Math.sin(new_anglea) + pt.y;
    nct2.x = r2 * Math.cos(new_angleb) + pt.x;
    nct2.y = r2 * Math.sin(new_angleb) + pt.y;

    return [nct1, nct2];
  }
  return undefined;
}
const smoothPolylineIntoPath = function (element) {
  var points = element.points;
  var N = points.numberOfItems;
  if (N >= 4) {
    // loop through every 3 points and convert to a cubic bezier curve segment
    // 
    // NOTE: this is cheating, it means that every 3 points has the potential to 
    // be a corner instead of treating each point in an equal manner.  In general,
    // this technique does not look that good.
    // 
    // I am open to better ideas!
    // 
    // Reading:
    // - http://www.efg2.com/Lab/Graphics/Jean-YvesQueinecBezierCurves.htm
    // - http://www.codeproject.com/KB/graphics/BezierSpline.aspx?msg=2956963
    // - http://www.ian-ko.com/ET_GeoWizards/UserGuide/smooth.htm
    // - http://www.cs.mtu.edu/~shene/COURSES/cs3621/NOTES/spline/Bezier/bezier-der.html
    var curpos = points.getItem(0), prevCtlPt = null;
    var d = [];
    d.push(["M", curpos.x, ",", curpos.y, " C"].join(""));
    for (var i = 1; i <= (N - 4); i += 3) {
      var ct1 = points.getItem(i);
      var ct2 = points.getItem(i + 1);
      var end = points.getItem(i + 2);

      // if the previous segment had a control point, we want to smooth out
      // the control points on both sides
      if (prevCtlPt) {
        var newpts = smoothControlPoints(prevCtlPt, ct1, curpos);
        if (newpts && newpts.length == 2) {
          var prevArr = d[d.length - 1].split(',');
          prevArr[2] = newpts[0].x;
          prevArr[3] = newpts[0].y;
          d[d.length - 1] = prevArr.join(',');
          ct1 = newpts[1];
        }
      }

      d.push([ct1.x, ct1.y, ct2.x, ct2.y, end.x, end.y].join(','));

      curpos = end;
      prevCtlPt = ct2;
    }
    // handle remaining line segments
    d.push("L");
    for (; i < N; ++i) {
      var pt = points.getItem(i);
      d.push([pt.x, pt.y].join(","));
    }
    d = d.join(" ");

    const svgRoot = document.getElementById('svgRoot');
    const path = svgRoot.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'black');
    svgRoot.appendChild(path);
    svgRoot.removeChild(element);
    // // create new path element
    // element = addSvgElementFromJson({
    //   "element": "path",
    //   "curStyles": true,
    //   "attr": {
    //     "id": getId(),
    //     "d": d,
    //     "fill": "none"
    //   }
    // });
    // No need to call "changed", as this is already done under mouseUp
  }
  return element;
};

const transformPoint = function (x, y, m) {
  return { x: m.a * x + m.c * y + m.e, y: m.b * x + m.d * y + m.f };
}
