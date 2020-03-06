function myDialogs() {
    'use strict';
    var reveal,
            veil = myVeil(),
            openDialogs = [],
            keyDown = window.onkyedown,
            d = new Date(),
            t = d.getTime(),
            divScroll = '<div class="gagaText" style="overflow-y:auto;max-width: 600px;max-height: 400px;overflow-x: auto;white-space: pre;">> you should never see this </div><hr>',
            allDialogsHTML = {
                generalDialog: ['<div style="text-align:center">',
                    '<span class=gagaText>you should never see this</span><p>',
                    '<div  class=gagaAction style="text-align:center">',
                    '</div>',
                    '</div>'].join(''),
                confirmDialog: ['<div  id="hgsmodc_veil" >',
                    '<hr style="clear:both">',
                    divScroll,
                    '<div style="text-align:center">',
                    '<button class="gagaButtonYes" tabindex=1 >Yes</button>&nbsp;',
                    '<button class="gagaButtonNo" tabindex=2 >No</button>',
                    '</div>',
                    '</div>'].join(''),
                alertDialog: ['<div  id="hgsmoda_veil">',
                    '<hr style="clear:both">',
                    divScroll,
                    '<div style="text-align:center" >',
                    '<button  class=gagaButton tabindex=1 >OK</button>',
                    '</div>',
                    ''].join(''),
                promptDialog: ['<div  id="hgsmodp_veil" style="text-align:center">',
                    '<hr style="clear:both">',
                    divScroll,
                    '<div style="text-align:center">',
                    '<input class="gagaInput" type=text size=40 maxlength=40></div>',
                    '<div id=hgsmodp_ddd  style="text-align:center"><button class="gagaButton" tabindex=1 >OK</button>',
                    '</div>'].join(''),
                selectDialog: ['<div  id="hgsmods_veil">',
                    '<hr style="clear:both">',
                    divScroll,
                    '<div style="text-align:center">',
                    '<select class="gagaSelect"  size=1></select></div><hr>',
                    '<div style="text-align:center"><br><button class="gagaButton" tabindex=1 >OK</button>',
                    '</div>'].join(''),
                informDialog: ['<div  id="hgsmodi_veil">',
                    '<hr style="clear:both">',
                    divScroll,
                    '<div style="text-align:center" >',
                    '<button  class="gagaButton" tabindex=1 >OK</button>',
                    '</div>',
                    ''].join(''),
                progressDialog: ['<div  id="hgsmodpo_veil">',
                    '<hr style="clear:both">',
                    divScroll,
                    '<div style="text-align:center" >', '</div>',
                    ''].join(''),
                loginDialog: ['<div  id="hgsmodl_veil">',
                    '<hr>',
                    '<span class=gagaText style="text-align:center"> you should never see this </span><hr><br>',
                    '<div style="text-align:left"><p>',
                    '<form id=logon name=logonf  method=post>',
                    '<b>User:</b> <input class="gagaUser" tabindex=1  name=user style="float:right;margin-right:0px;" id=user type=text><p>',
                    '<b>Password:</b> <input tabindex=1  class="gagaPasswd" name=passwd style="float:right;margin-right:0px;" id=pass type=password>',
                    '<p class=gagaPasswd2hide style="display:none"><b>Repeat Password:</b> <input class="gagaPasswd2" id=passwd2id tabindex=1  name=passwd2 style="float:right;margin-right:0px;" type=password>',
                    '<hr><p style="text-align:center;" ><input type=submit value=Anmelden class="gagaSubmit" tabindex=1 ></form>',
                    '</div>',
                    ''].join('')
            },
            dialogs,
            dialogArray = [];
    ;

    if (document.querySelector(".divClassDialog4711") !== null) {
        //********************************************
        //  we allready exist
        //*******************************************
        return document.getElementById('alertDialog').self;
    }
    //
    //**********************************************
    // functions below
    //**********************************************
    //

    function gebi(id) {
        return document.getElementById(id);
    }

    function vailOnClick() {
        veil.onclick = dialogsClean;
    }
    function createDialogBox(id, HTML) {
        var aDiv;
        aDiv = document.getElementById(id);
        if (aDiv) {
            return aDiv;
        }
        aDiv = document.createElement('DIV');
        aDiv.id = id;
        aDiv.style.display = 'none';
        aDiv.className = 'divClassDialog4711';
        aDiv.style.position = 'fixed';
        aDiv.style.transition = ' all 0.5s ease-out';
        aDiv.innerHTML = [
            "<div class='dialogDrag4711' title='drag me'>",
            "<span class='dialogMini4711' style='display:none;'  title='minimiere Dialog'>_</span>&nbsp;",
            "<span class='dialogClose4711' title='Close Dialog' data-dialog='", id, "' >X</span></div>",
            HTML].join('');
        document.body.appendChild(aDiv);
        makeDraggable({dragObj: aDiv, dragHandle: aDiv.querySelector('.dialogDrag4711')});
        aDiv.querySelector('.dialogClose4711').addEventListener('click', dialogsClean, false);
        return aDiv;
    }

    function dialogsClean() {
        openDialogs.forEach(function (elem) {
            elem.style.display = 'none';
        });
        veil.veilOff();
        openDialogs = [];
    }

    function positionDialog(aDiv) {
        var aDiv;
        dialogsClean();
        veil.veilOn();
        aDiv.style.display = 'block';
        veil.veilSnapToCenter(aDiv);
        openDialogs.push(aDiv);
    }
    //**********************************************
    // most general dialogbox
    //**********************************************

    function myDialogBox(cfg) {
        var obj = dialogArray['generalDialog'],
                html = [], elem = obj.querySelector('.gagaText');
        elem.innerHTML = cfg.text;
        elem = obj.querySelector('.gagaAction');
        cfg.actions.forEach(function (action) {
            html.push(['<span style="cursor:pointer;background-color:white;padding:4px;margin:8px;',
                'border-radius:4px 4px 4px 4px" class=c', t, '>', action.text, '</span>'].join(''));
        });
        elem.innerHTML = html.join('');
        positionDialog(obj);
        elem = obj.querySelectorAll('.c' + t);
        [].forEach.call(elem, function (sp) {
            sp.addEventListener('click', cfg.actions.shift().func, false);
        });
        return obj;
    }

    //***
    //Information dialog
    //**/
    function myInform(text) {
        var obj = dialogArray['informDialog'];
        obj.querySelector('.gagaText').innerHTML = '<b>' + text.replace(/\n/gi, "<br>") + '</b>';
        positionDialog(obj);
        veil.veilOff();
        obj.querySelector('.gagaButton').onclick = function () {
            obj.style.display = 'none';
        };
        obj.querySelector('.gagaButton').focus();
    }
    //
    // The action within the login box is just an OK button
    // In fact if you click anywhere within the alert box it will
    // disapear.
    //
    function myLogin(a_text, action, repeat, user) {
        var obj = dialogArray['loginDialog'];
        obj.querySelector('.gagaText').innerHTML = '<h1 style=text-align:center;">' + a_text.replace(/\n/gi, "<br>") + '</h1>';
        positionDialog(obj);
        if (repeat) {
            obj.querySelector('.gagaPasswd2hide').style.display = '';
            obj.querySelector('.gagaPasswd2hide').value = user;
        }
        obj.querySelector('.gagaSubmit').form.action = action;
        obj.querySelector('.gagaSubmit').onclick = function () {
            obj.style.display = 'none';
            veil.veilOff();
            window.onkeydown = keyDown;
        };
        obj.querySelector('.gagaSubmit').focus();
        window.onkeydown = handleKeyDown;
        return;
    }
    //
    // The action within the alert box is just an OK button
    // In fact if you click anywhere within the alert box it will
    // disapear.
    //
    function myAlert(a_text) {
        var obj;

        obj = dialogArray['alertDialog'];
        obj.querySelector('.gagaText').innerHTML = '<b>' + a_text.replace(/\n/gi, "<br>") + '</b>';
        positionDialog(obj);
        obj.querySelector('.gagaButton').onclick = function () {
            obj.style.display = 'none';
            veil.veilOff();
            window.onkeydown = keyDown;
        };
        obj.querySelector('.gagaButton').focus();
        window.onkeydown = handleKeyDown;
        return;
    }
    //
    //
    // Progress.
    //
    function myProgress(a_text) {
        var obj = dialogArray['progressDialog'];
        obj.querySelector('.gagaText').innerHTML = '<b>' + a_text.replace(/\n/gi, "<br>") + '</b>';
        positionDialog(obj);
        return;
    }
    //
    // The action within the confirm box 
    // If the Yes button is pressed the callYes function is executed
    // If the No button is pressed the  callno function is executed
    // In both cases the dialog will disapear.
    //
    function myConfirm(a_text, callYes, callNo) {
        var obj = dialogArray['confirmDialog'];

        positionDialog(obj);
        obj.querySelector('.gagaText').innerHTML = a_text.replace(/\n/gi, "<br>");
        obj.querySelector('.gagaButtonYes').onclick = function () {
            obj.style.display = 'none';
            veil.veilOff();
            window.onkeydown = keyDown;
            callYes();
        };
        obj.querySelector('.gagaButtonNo').onclick = function () {
            obj.style.display = 'none';
            veil.veilOff();
            window.onkeydown = keyDown;
            callNo();
        };
        obj.querySelector('.gagaButtonNo').focus();
        vailOnClick('modal_confirm_no');
        window.onkeydown = handleKeyDown;
        return;
    }
    //
    // The action within the prompt by enter box 
    // If the OK button is pressed the callOnEnter function is called
    // with value of the input box as a parameter
    // 
    //
    function myPrompt(a_text, defaultValue, callOnEnter) {
        var obj = dialogArray['promptDialog'];

        positionDialog(obj);
        obj.querySelector('.gagaText').innerHTML = a_text.replace(/\n/gi, "<br>");
        obj.querySelector('.gagaInput').value = defaultValue;
        obj.querySelector('.gagaButton').onclick = function () {
            obj.style.display = 'none';
            veil.veilOff();
            window.onkeydown = keyDown;
            callOnEnter(obj.querySelector('.gagaInput').value);
        };
        obj.querySelector('.gagaButton').focus();
        vailOnClick('hgsmodp_ccc');
        window.onkeydown = handleKeyDown;
        return;
    }
    // 
    //  The action within the prompt by select box 
    // If the OK button is pressed the callOnSelect function is called
    // with the selected option object
    // 
    //
    function myPromptSelect(a_text, options, callOnSelect) {
        var obj = dialogArray['selectDialog'],
                n, i, sel, o0, o1, v, o, d, op;
        positionDialog(obj);
        obj.querySelector('.gagaText').innerHTML = a_text.replace(/\n/gi, "<br>");
        sel = obj.querySelector('.gagaSelect');
        n = sel.options.length;
        for (i = 0; i < n; i++) {
            sel.options.remove(0);
        }

        o0 = options.split(',');
        n = o0.length;
        for (i = 0; i < n; i++) {
            o1 = o0[i].split('|');
            v = o = d = '';
            if (o1.length === 1) {
                v = o = d = o1[0];
            } else if (o1.length === 2) {
                v = o1[0];
                o = d = o1[1];
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
        obj.querySelector('.gagaButton').onclick = function () {
            obj.style.display = 'none';
            veil.veilOff();
            window.onkeydown = keyDown;
            callOnSelect(sel.options[sel.selectedIndex]);
        };
        obj.querySelector('.gagaButton').focus();
        vailOnClick('hgsmods_ccc');
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
            if (e.target.id === 'pass' && gebi('passwd2id') !== null) {
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

    function makeStyle() {
        var styleElem = document.createElement('STYLE');
        styleElem.innerHTML = [

            ".divClassDialog4711{background:white; border: 1px solid silver;padding:8px; }",
            ".dialogDrag4711{ background-color:#ececec;text-align:right;display:inline-block;width:100%;border-bottom:1px solid black }",
            ".dialogDrag4711:hover{ cursor:move;background-color:lightgray;}",
            ".dialogClose4711{ font-weight:bold;font-size:1.2em; background-color:white;color:red;padding-left:4px;padding-right:4px;}",
            ".dialogClose4711:hover{cursor:default;color:white;background-color:red;}",
            ".dialogMini4711{ font-weight:bold;font-size:1.2em; background-color:white;color:red;padding-left:4px;padding-right:4px;}",
            ".dialogMini4711:hover{cursor:default;color:white;background-color:red;}"
        ].join('');
        document.getElementsByTagName('head')[0].appendChild(styleElem);
        return styleElem;
    }

    //
    // Here we  reveal the dialogs/functions to the caller
    //
    reveal = {
        myDialogBox: myDialogBox, //(text)
        myInform: myInform, //(text)
        myLogin: myLogin, //(text,actionScript,reset)
        myAlert: myAlert, //(text)
        myConfirm: myConfirm, //(text,callYes,callNo)
        myPrompt: myPrompt, //(text,default Value,callOnEnter)
        myProgress: myProgress, //(text)
        myPromptSelect: myPromptSelect, //(text,option-list,callOnSelect),
        dialogsClean: dialogsClean
    };
    //********************************************
    //  we create the dialogs here 
    //*******************************************

    if (document.querySelector(".divClassDialog4711") === null) {
        makeStyle();
        for (dialogs in allDialogsHTML) {
            dialogArray[dialogs] = createDialogBox(dialogs, allDialogsHTML[dialogs]);
        }
        document.getElementById('alertDialog').self = reveal;
    }
    //********************************************
    //  return  functions
    //*******************************************

    return document.getElementById('alertDialog').self;

}
