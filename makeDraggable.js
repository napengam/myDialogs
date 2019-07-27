function makeDraggable(options) {
    'use strict';
    var opt, dragObj, dragHandles = [],
            defaultOpt = {
                'dragObj': null, // dragObject you want to drag
                'dragHandle': null, //  dragHandle inside drag dragObject 
                'allowY': true, // allow dragging allong Y-axis
                'allowX': true, // allow dragging allong X-axis
                'cursor': 'move',
                'title': 'Click and drag',
                'xmin': 0,
                'xmax': '',
                'ymin': 0,
                'ymax': ''
            };
    /******************
     * merge caller options 
     * with default
     ******************/
    opt = Object.assign(defaultOpt, options);
    /******************
     * locate Object to be dragged
     ******************/
    if (opt.dragObj === null) {
        return;
    } else if (typeof opt.dragObj === 'string') {
        dragObj = document.getElementById(opt.dragObj);
    } else {
        dragObj = opt.dragObj;
    }
    if (dragObj === null) {
        return;
    }
    /******************
     * locate dragHandles
     ******************/
    if (opt.dragHandle === null) {
        return;
    } else if (typeof opt.dragHandle === 'string') { // locate by className or ids
        dragHandles = dragObj.querySelectorAll('#' + opt.dragHandle + ',.' + opt.dragHandle);
    } else {
        dragHandles[0] = opt.dragHandle;// assume just one object
    }
    if (dragHandles.length === 0) {
        return;
    }
    dragObj.style.position = 'relative';
    /******************
     * turn draggable on/off
     ******************/
    dragHandles.forEach(function (dragHandle) {
        dragHandle.addEventListener("mouseout", out, false);
        dragHandle.addEventListener("mouseover", over, false);
        dragHandle.title = opt.title;
    });

    /******************
     * save options within dragObject
     * and add eventdragHandlers for dragging 
     * but only once, because you can have more
     * then one dragHandle inside dragObject
     ******************/
    dragObj.draggable = false;
    if (typeof dragObj.dragOption === 'undefined') {
        dragObj.dragOption = opt;
        dragObj.addEventListener("dragend", dragEnd, false);
        dragObj.addEventListener("drag", drag, false);
        dragObj.addEventListener("dragstart", dragStart, false);
        dragObj.addEventListener("touchend", touchEnd, false);
        dragObj.addEventListener("touchmove", touchMove, false);
        dragObj.addEventListener("touchstart", touchStart, false);
    }
    /******************
     * over or out of dragHandle
     ******************/
    function over() {
        dragObj.draggable = true;
        this.style.cursor = opt.cursor;
    }
    function out() {
        dragObj.draggable = false;
        this.style.cursor = '';
    }
    /******************
     * save current position of
     * dragObject on screen.
     ******************/
    function dragStart(event) {
        var pos;
        if (event.type === 'dragstart') {
            this.style.position = "fixed";
            event.dataTransfer.setData('text', ''); // to satisfy FF
            pos = absPos(this);
            /******************
             * current pointer position
             * in screen coordinates.
             ******************/
            this.hgsX = event.screenX;
            this.hgsY = event.screenY;
            /******************
             * current position of dragObj
             * in viewport
             ******************/
            this.xrel = pos.xr;
            this.yrel = pos.yr;
        }
    }
    function drag(event) {
        if (event.type === 'drag') {
            // not used
        }
    }
    /******************
     * compute new position of 
     * dragObject, respect options
     ******************/
    function dragEnd(event) {
        var newPos, min, max;
        if (event.type === 'dragend') {
            if (this.dragOption.allowY) {
                newPos = this.yrel + (event.screenY - this.hgsY);
                newPos = inLimit(newPos, this.dragOption.ymin, this.dragOption.ymax);
                this.style.top = newPos + 'px';
            }
            if (this.dragOption.allowX) {
                newPos = this.xrel + (event.screenX - this.hgsX);
                newPos = inLimit(newPos, this.dragOption.xmin, this.dragOption.xmax);
                this.style.left = newPos + 'px';
            }
        }
    }
    /***********************************************
     * For touch events. Touch devices do not show
     * an outline image while dragging an dragObject, therefore
     * we reposition the dragObject along the touchpoint movement 
     ************************************************/

    function touchStart(event) {
        var pos;
        /******************
         * need to know if a drag dragHandle is touched.
         * For this we ask for a specific class 
         * in the dragObject being touched. 
         ******************/
        if (event.target.classList.contains("dialogDrag4711")) {
            event.stopPropagation();
            event.preventDefault();
            this.style.position = "fixed";
            this.draggable = true;
            pos = absPos(this);
            /******************
             * position of dragObj
             * within viewport 
             ******************/
            this.relX = pos.xr;
            this.relY = pos.yr;
            /******************
             * dragHandle has been touched somewhere inside
             * save positon of first touch.
             ****************/
            this.touchedX = Math.floor(event.targetTouches[0].clientX);
            this.touchedY = Math.floor(event.targetTouches[0].clientY);
        }
    }
    function touchMove(event) {
        if (this.draggable === false) {
            return;
        }
        event.stopPropagation();
        checkSetTouchPosition(this, event);
    }
    function touchEnd(event) {
        if (this.draggable === false) {
            return;
        }
        event.stopPropagation();
        this.draggable = false;
        checkSetTouchPosition(this, event);
    }
    function checkSetTouchPosition(t, e) {
        var newPos, x, y;
        /******************
         * track changes of coordinates of first checkpoint. 
         * Apply amount of movement
         * along x and y to current position in viewort.
         * Save this position and current x and y coords.
         ******************/
        if (t.dragOption.allowY) {
            y = Math.floor(e.changedTouches[0].clientY);
            newPos = t.relY + (y - t.touchedY);
            newPos = inLimit(newPos, t.dragOption.ymin, t.dragOption.ymax);

            t.style.top = newPos + 'px';
            t.relY = newPos;
            t.touchedY = y;
        }
        if (t.dragOption.allowX) {
            x = Math.floor(e.changedTouches[0].clientX);
            newPos = t.relX + (x - t.touchedX);
            newPos = inLimit(newPos, t.dragOption.xmin, t.dragOption.xmax);

            t.style.left = newPos + 'px';
            t.relX = newPos;
            t.touchedX = x;
        }
    }
    function absPos(dragObj) {
        var ob, x = dragObj.offsetLeft, y = dragObj.offsetTop;
        ob = dragObj.offsetParent;
        while (ob !== null && ob.tagName !== 'BODY') {
            x += ob.offsetLeft;
            y += ob.offsetTop;
            ob = ob.offsetParent;
        }
        return {
            'x': x,
            'y': y,
            'xr': x - window.scrollX,
            'yr': y - window.scrollY};
    }
    function inLimit(newPos, min, max) {
        min === '' ? min = newPos : min = parseInt(min, 10);
        max === '' ? max = newPos : max = parseInt(max, 10);
        if (newPos < min) {
            newPos = min;
        } else if (newPos > max) {
            newPos = max;
        }
        return newPos;
    }
}