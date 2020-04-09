function makeDraggable(options) {
    'use strict';
    var opt, obj, handle, defaultOpt = {
        'dragObj': null, // object you want to drag
        'dragHandle': null, //  handle inside drag object 
        'allowY': true, // allow dragging allong Y-axis
        'allowX': true, // allow dragging allong X-axis
        'xmin': 0,
        'xmax': window.innerWidth,
        'ymin': 0,
        'ymax': window.innerHeight
    };
    //
    // merge caller options 
    // with default
    //
    opt = Object.assign(defaultOpt, options);

    //
    // locate object to be dragged
    // /
    if (typeof opt.dragObj === 'string') {
        obj = document.getElementById(opt.dragObj);
    } else {
        obj = opt.dragObj;
    }
    //
    //     locate drag handle
    //    ******************/
    if (typeof opt.dragHandle === 'string') {
        handle = document.getElementById(opt.dragHandle);
    } else {
        handle = opt.dragHandle;
    }
    //
    // turn dragabble on / off
    //
    handle.removeEventListener("mouseout", out, false);
    handle.removeEventListener("mouseover", over, false);
    handle.addEventListener("mouseout", out, false);
    handle.addEventListener("mouseover", over, false);

    //
    // save options within drag object
    // and add eventhandlers for dragging 
    // but only once, because you can have more
    // then one drag handle inside drag object
    //
    obj.draggable = false;
    if (typeof obj.dragOption === 'undefined') {
        obj.dragOption = opt;
        obj.addEventListener("dragend", dragEnd, false);
        obj.addEventListener("dragstart", dragStart, false);
        obj.addEventListener("touchend", touchEnd, false);
        obj.addEventListener("touchmove", touchMove, false);
        obj.addEventListener("touchstart", touchStart, false);
    }
    //
    // over or out of draghandle
    //
    function over() {

        obj.draggable = true;
    }
    function out() {

        obj.draggable = false;
    }
    //
    // save current position of
    // drag object on screen.
    //
    function dragStart(event) {
        if (event.type === 'dragstart' && obj.draggable) {
            this.style.position = "fixed";
            event.dataTransfer.setData('text', ''); // to satisfy FF
            this.hgsX = event.screenX;
            this.hgsY = event.screenY;
        }
    }

    //
    // compute new position of drag
    // object, respect options
    //
    function dragEnd(event) {
        var newPos, min, max;
        if (event.type === 'dragend' && obj.draggable) {
            if (this.dragOption.allowY) {

                newPos = event.target.offsetTop + (event.screenY - this.hgsY);
                this.dragOption.ymin === '' ? min = newPos : min = parseInt(this.dragOption.ymin, 10);
                this.dragOption.ymax === '' ? max = newPos : max = parseInt(this.dragOption.ymax - this.clientHeight - 4, 10);

                if (min <= newPos && newPos <= max) {
                    this.style.top = newPos + 'px';
                } else if (newPos < min) {
                    this.style.top = min + 'px';
                } else if (newPos > max) {
                    this.style.top = max + 'px';
                }
            }
            if (this.dragOption.allowX) {
                newPos = event.target.offsetLeft + (event.screenX - this.hgsX);
                this.dragOption.xmin === '' ? min = newPos : min = parseInt(this.dragOption.xmin, 10);
                this.dragOption.xmax === '' ? max = newPos : max = parseInt(this.dragOption.xmax - this.clientWidth - 4, 10);

                if (min <= newPos && newPos <= max) {
                    this.style.left = newPos + 'px';
                } else if (newPos < min) {
                    this.style.left = min + 'px';
                } else if (newPos > max) {
                    this.style.left = max + 'px';
                }

            }
        }
    }
    //
    //For touch events. Touch devices do not show
    //an outline image while dragging an object, therefore
    //we reposition the object along the touchpoint movement 
    //

    function touchStart(event) {
        //
        //need to know if a drag handle is touched.
        //For this we ask for a specific class 
        //in the object being touched. 
        //
        if (event.target.classList.contains("dialogDrag4711")) {
            this.style.position = "fixed";
            this.draggable = true;
            this.hgsX = event.changedTouches[0].screenX;
            this.hgsY = event.changedTouches[0].screenY;
            this.hgsposX = this.offsetLeft;
            this.hgsposY = this.offsetTop;
        }
    }
    function touchMove(event) {
        if (this.draggable === false) {
            return;
        }
        event.stopPropagation();
        event.preventDefault();
        checkSetTouchPosition(this, event);
    }
    function touchEnd(event) {
        if (this.draggable === false) {
            return;
        }
        this.draggable = false;
        checkSetTouchPosition(this, event);
    }
    function checkSetTouchPosition(t, e) {
        if (t.dragOption.allowY) {
            t.style.top = t.hgsposY + (e.changedTouches[0].screenY - t.hgsY) + 'px';
        }
        if (t.dragOption.allowX) {
            t.style.left = t.hgsposX + (e.changedTouches[0].screenX - t.hgsX) + 'px';
        }
    }
}