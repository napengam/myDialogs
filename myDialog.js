function myDialogs() {
    'use strict';
    var
            veil = myVeil(), openDialogs = [], diagBoxes = {},
            keyDown = window.onkyedown,
            divClass, // will hold a css class
            d = new Date(),
            t = new Date().getTime(),
            gdDiv, // div for confirm dialog to hold the HTML below 
            generalDialog = ['<div style="text-align:center">',
                '<span  id="hgsgdText">you should never see this</span><p>',
                '<div  id=hgsgdActions style="text-align:center">',
                '</div>',
                '</div>'].join(''),
            cdDiv, // div for confirm dialog to hold the HTML below
            confirmDialog = [
                '<span  class=T>you should never see this</span><hr>',
                '<div style="text-align:center">',
                '<button id="modal_confirm_yes" tabindex=1 >Yes</button>',
                '<button id="modal_confirm_no" tabindex=2 >No</button>',
                '</div>'].join(''),
            alDiv, //div for alert box to hold HTML below
            alertDialog = [
                '<span class=T> you should never see this </span><hr>',
                '<div style="text-align:center" >',
                '<button  id="hgsmoda_bbb_ok" tabindex=1 >OK</button></div>'].join(''),
            prDiv, //div for prompt by eenter box to hold HTML below
            promptDialog = [
                '<span  class=T> you should never see this </span><hr>',
                '<div style="text-align:center">',
                '<input id=hgsmodp_ccc type=text size=40 maxlength=40></div>',
                '<div id=hgsmodp_ddd  style="text-align:center"><button  tabindex=1 >OK</button>'].join(''),
            slDiv, //div for prompt by select box to hold HTML below
            selectDialog = [
                '<span  class=T> you should never see this </span><hr>',
                '<div style="text-align:center">',
                '<select id=hgsmods_ccc  size=1></select></div><hr>',
                '<div style="text-align:center"><br><button id=hgsmods_ddd  tabindex=1 >OK</button>'].join(''),
            inDiv, //div for alert box to hold HTML below
            informDialog = [
                '<span  class=T> you should never see this </span><hr>',
                '<div style="text-align:center" >',
                '<button  id="hgsmodi_bbb_ok" tabindex=1 >OK</button>'].join(''),
            poDiv, //div for alert box to hold HTML below
            progressDialog = [
                '<span  class=T> you should never see this </span><hr>',
                '<div style="text-align:center" >'].join(''),
            loDiv, //div for login box to hold HTML below
            loginDialog = [
                '<span  class=T style="text-align:center;"> you should never see this </span><hr><br>',
                '<div style="text-align:left"><p>',
                '<b>User:</b> <input tabindex=1  name=user style="float:right;margin-right:0px;" id=user type=text><p>',
                '<b>Password:</b> <input tabindex=1  name=passwd style="float:right;margin-right:0px;" id=pass type=password>',
                '<p id=passwd2hide style="display:none"><b>Repeat Password:</b> <input id=passwd2id tabindex=1  name=passwd2 style="float:right;margin-right:0px;" type=password>',
                '<hr><p style="text-align:center;" ><input type=submit value="logon" id="hgsmodl_bbb_ok" tabindex=1 >'].join('');

    //************************************************
    // initialize and create all dialogs
    //************************************************


    if (document.querySelector(".divClass" + t) === null) {
        divClass = document.createElement('style');
        divClass.type = 'text/css';
        divClass.innerHTML = '.divClass' + t + '{box-shadow: 1px -2px 20px 2px #fbf4f4;width: auto;background: rgba(255, 255, 255, 0.68);border: 0px solid blue;' +
                'z-index: 2000;padding: 8px }';

        document.getElementsByTagName('head')[0].appendChild(divClass);
    }

    alDiv = createDialogBox(alertDialog);
    cdDiv = createDialogBox(confirmDialog);
    prDiv = createDialogBox(promptDialog);
    slDiv = createDialogBox(selectDialog);
    inDiv = createDialogBox(informDialog);
    loDiv = createDialogBox(loginDialog);
    poDiv = createDialogBox(progressDialog);
    gdDiv = createDialogBox(generalDialog);
    /*
     ************************************************
     * functions below
     ************************************************
     */

    function gebi(id) {
        return document.getElementById(id);
    }


    /**
     ************************************************
     * creat dialogbox if it does  not exits
     ************************************************
     **/
    function createDialogBox(HTML) {

        var to, le, obj, aDiv;

        aDiv = document.createElement('DIV');
        aDiv.style.display = 'none';
        aDiv.className = 'divClass' + t;
        aDiv.style.zIndex = 22;
        aDiv.style.position = 'absolute';
        aDiv.innerHTML = HTML;
        document.body.appendChild(aDiv);
        aDiv.draggable = true;
        aDiv.style.draggable = true;
        aDiv.addEventListener("dragend", function (event) {
            event.target.style.position = "absolute";
            to = event.target.offsetTop + (event.screenY - this.hgsY);
            le = event.target.offsetLeft + (event.screenX - this.hgsX);
            event.target.style.top = to + 'px';
            event.target.style.left = le + 'px';
        }, false);
        aDiv.addEventListener("dragstart", function (event) {
            //save current screen position;
            this.hgsX = event.screenX;
            this.hgsY = event.screenY;
        }, false);
        return aDiv;
    }

    function positionDialog(aDiv) {

        veil.veilOn();
        aDiv.style.display = 'block';
        aDiv.style.top = '-200px';
        aDiv.style.left = '-200px';

        veil.veilSnapToCenter(aDiv);
        openDialogs.push(aDiv);
    }
    //************************************************
    // close all dialogs
    //************************************************

    function dialogsClean() {
        openDialogs.forEach(function (elem) {
            elem.style.display = 'none';
        });
        veil.veilOff();
        openDialogs = [];
    }

    //************************************************
    // most general dialogbox
    //************************************************

    function myDialogBox(cfg) { //cfg={text:'splash to display', actions:[{text:'text for action' , func:pointerToFunction}]}
        var html = [], elem = gdDiv.querySelector('#hgsgdText');
        elem.innerHTML = cfg.text; // spalsh text
        elem = gdDiv.querySelector('#hgsgdActions');
        // first add the action text within a spab element
        cfg.actions.forEach(function (action) {
            html.push('<span tabindex=1 style="cursor:pointer;background-color:white;padding:4px;margin:8px;border-radius:4px 4px 4px 4px" class=c'
                    + t + '>' + action.text + '</span>');
        });
        elem.innerHTML = html.join('');
        positionDialog(gdDiv);
        // iterate over  all span elements to add function callback 
        elem = gdDiv.querySelectorAll('.c' + t);
        [].forEach.call(elem, function (sp) {
            sp.addEventListener('click', cfg.actions.shift().func, false);
        });
        window.onkeyup = handleKeyDown;
        return gdDiv;
    }
    /****
     Information dialog
     ****/
    function myInform(a_text) {

        inDiv.querySelector('.T').innerHTML = '<b>' + a_text.replace(/\n/gi, "<br>") + '</b>';
        positionDialog(inDiv);
        veil.veilOff();
        gebi('hgsmodi_bbb_ok').onclick = function () {
            inDiv.style.display = 'none';
        };
        gebi('hgsmodi_bbb_ok').focus();
    }
    /*
     * The action within the login box is just an OK button
     * In fact if you click anywhere within the alert box it will
     * disapear.
     */
    function myLogin(a_text, action, repeat, user) {
        var obj;
        loDiv.querySelector('.T').innerHTML = '<h1 style=text-align:center;">' + a_text.replace(/\n/gi, "<br>") + '</h1>';
        positionDialog(loDiv);
        if (repeat) {
            gebi('passwd2hide').style.display = '';
            gebi('user').value = user;
        }
        obj = gebi('hgsmodl_bbb_ok');

        obj.onclick = function () {
            loDiv.style.display = 'none';
            veil.veilOff();
            window.onkeydown = keyDown;
        };
        obj.focus();
        window.onkeydown = handleKeyDown;

        return;
    }
    /*
     * The action within the alert box is just an OK button
     * In fact if you click anywhere within the alert box it will
     * disapear.
     */
    function myAlert(a_text) {


        alDiv.querySelector('.T').innerHTML = '<b>' + a_text.replace(/\n/gi, "<br>") + '</b>';
        positionDialog(alDiv);
        gebi('hgsmoda_bbb_ok').onclick = function () {
            alDiv.style.display = 'none';
            veil.veilOff();
            window.onkeydown = keyDown;
        };
        gebi('hgsmoda_bbb_ok').focus();
        window.onkeydown = handleKeyDown;

        return;
    }/*
     *
     *Progress.
     */
    function myProgress(a_text) {
        poDiv.querySelector('.T').innerHTML = '<b>' + a_text.replace(/\n/gi, "<br>") + '</b>';
        positionDialog(poDiv);
        return;
    }
    /*
     * The action within the confirm box 
     * If the Yes button is pressed the callYes function is executed
     * If the No button is pressed the  callno function is executed
     * In both cases the dialog will disapear.
     */
    function myConfirm(a_text, callYes, callNo) {

        cdDiv.querySelector('.T').innerHTML = a_text.replace(/\n/gi, "<br>");
        positionDialog(cdDiv);
        gebi('modal_confirm_yes').onclick = function () {
            cdDiv.style.display = 'none';
            veil.veilOff();
            window.onkeydown = keyDown;
            callYes();
        };
        gebi('modal_confirm_no').onclick = function () {
            cdDiv.style.display = 'none';
            veil.veilOff();
            window.onkeydown = keyDown;
            callNo();
        };
        gebi('modal_confirm_no').focus();
        //vailOnclick('modal_confirm_no');
        window.onkeydown = handleKeyDown;

        return;
    }
    // ***********************************************   
    //      The action within the prompt by enter box 
    //      f the OK button is pressed the callOnEnter function is called
    //     with value of the input box as a parameter
    // ************************************************


    function myPrompt(a_text, defaultValue, callOnEnter) {

        prDiv.querySelector('.T').innerHTML = a_text.replace(/\n/gi, "<br>");
        positionDialog(prDiv);
        gebi('hgsmodp_ccc').value = defaultValue;
        gebi('hgsmodp_ddd').onclick = function () {
            prDiv.style.display = 'none';
            veil.veilOff();
            window.onkeydown = keyDown;
            callOnEnter(gebi('hgsmodp_ccc').value);
        };
        gebi('hgsmodp_ccc').focus();
        //vailOnclick('hgsmodp_ccc');
        window.onkeydown = handleKeyDown;

        return;
    }
    //************************************************
    // The action within the prompt by select box 
    //If the OK button is pressed the callOnSelect function is called
    // with the selected option object
    //************************************************

    function myPromptSelect(a_text, options, callOnSelect) {

        var n, i, sel, o0, o1, v, o, d, op, that;

        positionDialog(slDiv);
        slDiv.querySelector('.T').innerHTML = a_text.replace(/\n/gi, "<br>");
        sel = gebi('hgsmods_ccc');
        n = sel.options.length;
        for (i = 0; i < n; i++) {
            sel.options.remove(0);
        }
        o0 = options.split(',');
        n = o0.length;
        for (i = 0; i < n; i++) {
            o1 = o0[i].split('|');
            if (o1.length === 0) {
                v = o = d = '';
            } else if (o1.length === 1) {
                v = o = d = o1[0];
            } else if (o1.length === 2) {
                v = o1[0];
                o = o1[1];
                d = o1[1];
            } else if (o1.length === 3) {
                v = o1[0];
                o = o1[1];
                d = o1[2];
            }
            op = document.createElement("option");
            op.value = v;
            op.text = (o);
            op.title = (d);
            sel.options.add(op);
        }
        sel.selectedIndex = 0;
        gebi('hgsmods_ddd').onclick = function () {
            slDiv.style.display = 'none';
            veil.veilOff();
            that = gebi('hgsmods_ccc');
            window.onkeydown = keyDown;
            callOnSelect(that.options[that.selectedIndex]);
        };
        gebi('hgsmods_ccc').focus();

        window.onkeydown = handleKeyDown;

        return;
    }
    function handleKeyDown(e) {
        var keyCode = e.keyCode || e.which;
        if ([9, 13, 32, 27].indexOf(keyCode) === -1) {
            // Don't do work on keys we don't care about.
            return;
        }
        if (keyCode === 9) {
            if (e.target.id === 'user') {
                gebi('pass').focus();
            }
            if (e.target.id === 'pass' && gebi('passwd2id') !== NULL) {
                gebi('passwd2id').focus();
            }
            if (typeof e.stopPropagation === 'function') {
                e.stopPropagation();
                e.preventDefault();
            } else if (window.event && window.event.hasOwnProperty('cancelBubble')) {
                window.event.cancelBubble = true;
            }
        }
    }
    //************************************************
    //   reveal the function to the consumer
    //************************************************

    return {
        myDialogBox: myDialogBox, //(text)
        myInform: myInform, //(text)
        myLogin: myLogin, //(text,actionScript,reset)
        myAlert: myAlert, //(text)
        myConfirm: myConfirm, //(text,callYes,callNo)
        myPrompt: myPrompt, //(text,default Value,callOnEnter)
        myProgress: myProgress, //(text)
        myPromptSelect: myPromptSelect, //(text,option-list,callOnSelect)
        dialogsClean: dialogsClean
    };
}