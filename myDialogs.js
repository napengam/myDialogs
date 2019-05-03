function myDialogs() {
    'use strict';
    var
            reveal, langA = [], lang, defaultHTML,
            close,
            veil = myVeil(),
            openDialogs = [],
            keyDown = window.onkyedown,
            divClass, // will hold a css class
            d = new Date(),
            t = d.getTime(),
            gdDiv, cdDiv, alDiv, prDiv, slDiv,
            inDiv, poDiv, loDiv;


    alDiv = gebi('hgsmoda_aaa');
    if (alDiv) {
        /*****************************************
         * We allready exsit !
         * Pass back all the public functions
         * attached to the alarm dialog.
         * Look at the end of this module
         *****************************************/
        return alDiv.dialogs;
    }

    /*****************************************
     * set/extend language here
     *****************************************/
    langA['DE'] = {'ok': 'Ok', 'save': 'Übernehmen', 'no': 'Nein', 'yes': 'Ja', 'cancel': 'Abbruch'};
    //langA['EN'] = {'ok': 'ok', 'save': 'Save', 'no': 'no', 'yes': 'yes', 'cancel': 'cancel'};
    lang = langA['DE'];



    if (document.querySelector(".divClass") === null) {
        divClass = document.createElement('STYLE');
        divClass.innerHTML = [
            '.divClass' + t + '{width:auto;background:white; border: 1px solid silver;display:inline-block;padding:8px} ',
            '.moveHandle4711{width:100%;display:inline-block;background-color:#f1f1f1; text-align:right} ',
            '.moveHandle4711:hover{ cursor:move;background-color:lightgray;} ',
            '.close4711{ font-weight:bold;background-color:white;color:red;padding-left:4px;padding-right:4px;} ',
            '.close4711:hover{cursor:default;color:white;background-color:red;} '
        ].join('');
        document.getElementsByTagName('head')[0].appendChild(divClass);
    }

    close = "<span id='divClose' class=close4711><b>X</b></span>";
    defaultHTML = '<hr style="clear:both"><div  id="hgsmodInnerHTML" style="padding-left:4px;padding-right:4px"> you should never see this </div><hr>';
    alDiv = createDialogBox('hgsmoda_aaa', ['<div><div class=moveHandle4711 >' + close + '</div>',
        defaultHTML,
        '<div style="text-align:center" >',
        '<button  id="hgsmoda_bbb_ok" tabindex=1 >' + lang.ok + '</button>',
        '</div>'].join(''));
    cdDiv = createDialogBox('hgsmodc_aaa', ['<div><div class=moveHandle4711 ><span>&nbsp;</span></div>',
        defaultHTML,
        '<div style="text-align:center">',
        '<button id="modal_confirm_yes" tabindex=1 >' + lang.yes + '</button>&nbsp;',
        '<button id="modal_confirm_no" tabindex=2 >' + lang.no + '</button>',
        '</div>',
        '</div>'].join(''));
    prDiv = createDialogBox('hgsmodp_aaa', ['<div style="text-align:center"><div  class=moveHandle4711 >' + close + '</div>',
        defaultHTML,
        '<div style="text-align:center">',
        '<input id=hgsmodp_ccc type=text size=40 maxlength=40></div>',
        '<div id=hgsmodp_ddd  style="text-align:center"><button  tabindex=1 >' + lang.ok + '</button>',
        '</div>'].join(''));
    slDiv = createDialogBox('hgsmods_aaa', [
        '<div><div class=moveHandle4711>' + close + '</div>',
        defaultHTML,
        '<div style="text-align:center">',
        '<select id=hgsmods_ccc  size=1></select></div><hr>',
        '<div style="text-align:center"><br><button id=hgsmods_ddd  tabindex=1 >' + lang.ok + '</button>',
        '</div>'].join(''));
    inDiv = createDialogBox('hgsmodi_aaa', [
        '<div><div  class=moveHandle4711>' + close + '</div>',
        defaultHTML,
        '<div style="text-align:center" >',
        '<button  id="hgsmodi_bbb_ok" tabindex=1 >' + lang.ok + '</button>',
        '</div>'].join(''));
    loDiv = createDialogBox('hgsmodl_aaa', ['<div><div  class=moveHandle4711>' + close + '</div>',
        '<hr>',
        defaultHTML,
        '<div style="text-align:left;padding-left:8px;padding-right:8px"><p>',
        '<form id=logon name=logonf  method=post>',
        '<b>User:</b> <input tabindex=1  name=user style="float:right;margin-right:0px;" id=user type=text><p>',
        '<b>Password:</b> <input tabindex=1  name=passwd style="float:right;margin-right:0px;" id=pass type=password>',
        '<p id=passwd2hide style="display:none"><b>Repeat Password:</b> <input id=passwd2id tabindex=1  name=passwd2 style="float:right;margin-right:0px;" type=password>',
        '<hr><p style="text-align:center;" ><input type=submit value=Anmelden id="hgsmodl_bbb_ok" tabindex=1 ></form>',
        '</div>'].join(''));
    poDiv = createDialogBox('hgsmodpo_aaa', ['<div><div class=moveHandle4711>' + close + '</div>',
        defaultHTML,
        '<div style="text-align:center" >', '</div>'].join(''));
    gdDiv = createDialogBox('hgsmodgd', ['<div style="text-align:center"><div class=moveHandle4711>' + close + '</div>',
        defaultHTML,
        '<div  id=hgsgdActions style="text-align:center">',
        '</div>',
        '</div>'].join(''));
    /*
     ************************************************
     * functions below
     ************************************************
     */

    function gebi(id) {
        return document.getElementById(id);
    }

    function vailOnClick(id) {
        veil.onclick = function () {
            gebi(id).focus();
        };
    }
    function createDialogBox(id, HTML) {
        var close, to, le, aDiv;
        aDiv = document.getElementById(id);
        if (aDiv) {
            return aDiv;
        }
        aDiv = document.createElement('DIV');
        aDiv.id = id;
        aDiv.style.display = 'none';
        aDiv.className = 'divClass' + t;
        // aDiv.style.zIndex = 22;
        aDiv.style.position = 'fixed';
        //aDiv.style.transition = ' all 0.5s ease-out';
        aDiv.innerHTML = HTML;
        document.body.appendChild(aDiv);

        makeDraggable({'dragObj': aDiv, 'dragHandle': aDiv.querySelector('.moveHandle4711')});

        close = aDiv.querySelector('#divClose');
        if (close) {
            close.addEventListener("click", closeThisDialog, false);
        }
        return aDiv;
    }
    function closeThisDialog() {
        this.parentNode.parentNode.parentNode.style.display = 'none';
        veil.veilOff();
        window.onkeydown = keyDown;
    }

    function dialogsClean() {
        openDialogs.forEach(function (elem) {
            elem.style.display = 'none';
        });
        veil.veilOff();
        openDialogs = [];
        window.onkeydown = keyDown;
    }

    function positionDialog(id) {
        var aDiv;
        dialogsClean();
        veil.veilOn();
        if (typeof id === 'object') {
            aDiv = id;
        } else {
            aDiv = gebi(id);
        }
        aDiv.style.display = 'inline-block';
        veil.veilSnapToCenter(aDiv);
        openDialogs.push(aDiv);
    }
    //************************************************
    // most general dialogbox
    //************************************************

    function myDialogBox(cfg) {
        var html = [], elem = gdDiv.querySelector('#hgsmodInnerHTML');
        elem.innerHTML = cfg.text;
        elem = gdDiv.querySelector('#hgsgdActions');
        cfg.actions.forEach(function (action) {
            html.push(['<span style="cursor:pointer;background-color:white;padding:4px;margin:8px;',
                'border-radius:4px 4px 4px 4px" class=c', t, '>', action.text, '</span>'].join(''));
        });
        elem.innerHTML = html.join('');
        positionDialog(gdDiv);
        elem = gdDiv.querySelectorAll('.c' + t);
        [].forEach.call(elem, function (sp) {
            sp.addEventListener('click', cfg.actions.shift().func, false);
        });
        return gdDiv;
    }

    /****
     Information dialog
     */
    function myInform(text) {
        var bu;
        if (text === '') {
            inDiv.style.display = 'none';
            veil.veilOff();
        }
        inDiv.querySelector('#hgsmodInnerHTML').innerHTML = '<b>' + text.replace(/\n/gi, "<br>") + '</b>';
        if (inDiv.style.display !== 'none') {
            return;
        }
        positionDialog(inDiv);
        veil.veilOff();
        bu = inDiv.querySelector('#hgsmodi_bbb_ok');
        bu.onclick = function () {
            inDiv.style.display = 'none';
        };
        bu.focus();
    }
    /*
     * The action within the login box is just an OK button
     * In fact if you click anywhere within the alert box it will
     * disapear.
     */
    function myLogin(text, action, repeat, user) {
        var bu;
        loDiv.querySelector('#hgsmodInnerHTML').innerHTML = '<h1 style=text-align:center;">' + text.replace(/\n/gi, "<br>") + '</h1>';
        positionDialog(loDiv);
        if (repeat) {
            loDiv.querySelector('#passwd2hide').style.display = '';
            loDiv.querySelector('#user').value = user;
        }
        bu = loDiv.querySelector('#hgsmodl_bbb_ok');
        bu.form.action = action;
        bu.onclick = function () {
            loDiv.style.display = 'none';
            veil.veilOff();
            window.onkeydown = keyDown;
        };
        bu.focus();
        window.onkeydown = handleKeyDown;
        return;
    }
    /*
     * The action within the alert box is just an OK button
     * In fact if you click anywhere within the alert box it will
     * disapear.
     */
    function myAlert(text) {
        var bu;
        alDiv.querySelector('#hgsmodInnerHTML').innerHTML = '<b>' + text.replace(/\n/gi, "<br>") + '</b>';
        positionDialog(alDiv);
        bu = alDiv.querySelector('#hgsmoda_bbb_ok');
        bu.onclick = function () {
            alDiv.style.display = 'none';
            veil.veilOff();
            window.onkeydown = keyDown;
        };
        bu.focus();
        window.onkeydown = handleKeyDown;
        return;
    }/*
     *
     *Progress.
     */
    function myProgress(text) {
        if (text === '') {
            poDiv.style.display = 'none';
            veil.veilOff();
        }
        poDiv.querySelector('#hgsmodInnerHTML').innerHTML = '<b>' + text.replace(/\n/gi, "<br>") + '</b>';
        if (poDiv.style.display !== 'none') {
            return;
        }
        positionDialog(poDiv);
        return;
    }
    /*
     * The action within the confirm box 
     * If the Yes button is pressed the callYes function is executed
     * If the No button is pressed the  callno function is executed
     * In both cases the dialog will disapear.
     */
    function myConfirm(text, callYes, callNo) {
        var bu;
        //text = htmlentity(text);

        positionDialog(cdDiv);
        cdDiv.querySelector('#hgsmodInnerHTML').innerHTML = text.replace(/\n/gi, "<br>");
        cdDiv.querySelector('#modal_confirm_yes').onclick = function () {
            cdDiv.style.display = 'none';
            veil.veilOff();
            window.onkeydown = keyDown;
            callYes();
        };
        bu = cdDiv.querySelector('#modal_confirm_no');
        bu.onclick = function () {
            cdDiv.style.display = 'none';
            veil.veilOff();
            window.onkeydown = keyDown;
            callNo();
        };
        bu.focus();
        vailOnClick('modal_confirm_no');
        window.onkeydown = handleKeyDown;
        return;
    }
    /*
     * The action within the prompt by enter box 
     * If the OK button is pressed the callOnEnter function is called
     * with value of the input box as a parameter
     * 
     * */
    function myPrompt(text, defaultValue, callOnEnter) {
        //text = htmlentity(text);

        positionDialog(prDiv);
        prDiv.querySelector('#hgsmodInnerHTML').innerHTML = text.replace(/\n/gi, "<br>");
        prDiv.querySelector('#hgsmodp_ccc').value = defaultValue;
        prDiv.querySelector('#hgsmodp_ddd').onclick = function () {
            prDiv.style.display = 'none';
            veil.veilOff();
            window.onkeydown = keyDown;
            callOnEnter(prDiv.querySelector('#hgsmodp_ccc').value);
        };
        prDiv.querySelector('#hgsmodp_ccc').focus();
        vailOnClick('hgsmodp_ccc');
        window.onkeydown = handleKeyDown;
        return;
    }
    /*
     * The action within the prompt by select box 
     * If the OK button is pressed the callOnSelect function is called
     * with the selected option object
     * 
     * */
    function myPromptSelect(text, options, callOnSelect) {
        //text = htmlentity(text);
        var n, i, sel, o0, o1, v, o, d, op, that;
        positionDialog(slDiv);
        slDiv.querySelector('#hgsmodInnerHTML').innerHTML = text.replace(/\n/gi, "<br>");
        sel = slDiv.querySelector('#hgsmods_ccc');
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
        slDiv.querySelector('#hgsmods_ddd').onclick = function () {
            slDiv.style.display = 'none';
            veil.veilOff();
            that = slDiv.querySelector('#hgsmods_ccc');
            window.onkeydown = keyDown;
            callOnSelect(that.options[that.selectedIndex]);
        };
        slDiv.querySelector('#hgsmods_ccc').focus();
        vailOnClick('hgsmods_ccc');
        return;
    }
    function handleKeyDown(e) {
        var keyCode = e.keyCode || e.which;
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
    function htmlentity(value) {
        value = value.replace(/&/gi, "&amp;");
        value = value.replace(/</gi, "&lt;");
        value = value.replace(/>/gi, "&gt;");
        value = value.replace(/"/gi, "&quot;");
        value = value.replace(/'/gi, "&#039;");
        return value;
    }
    /*
     * Here we  reveal the dialogs/functions to the caller
     */
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
    /*****************************************
     * attache all public functions to the alert dialog
     * in case this module is called multiple times
     * we just pass back alDiv.dialogs instead of
     * executing the code here.
     *****************************************/
    alDiv.dialogs = reveal;
    return reveal;
}