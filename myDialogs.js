function myDialogs() {
    'use strict';
    if (document.getElementById('alertDialog') !== null) {
//********************************************
//  we allready exist
//*******************************************
        return document.getElementById('alertDialog').self;
    }
    var reveal,
            openDialogs = [],
            dragClose =
            `<div class='handlegrid  dialogDrag4711'>
    <div class='hone'>
    </div><div class='close htwo' title='close' style='color:red;font-weight:bold'>X</div></div>`,
            allDialogsHTML = `
<dialog  class='xdialog outerDialog ' id='alertDialog' >     
    ${dragClose}
    <br>
    <div class='showtext' name='text'>You should never see this</div>         
    <hr>
    <button  class='close' >Ok</button>
</dialog>
           
 <dialog class='xdialog outerDialog '  id='confirmDialog' > 
 ${dragClose}<br>
 <div class='showtext' name='text'>Confirm something</div>         
 <hr>
 <button class='Yes' >Yes</button>    <button class='No' >No</button>
 </dialog>
 <dialog class='xdialog outerDialog' id='informDialog' >
 ${dragClose} <br>
 <div class='showtext' name='text'>Just some information</div>         
 <hr>
 <button class='close' >OK</button>   
 </dialog>
 <dialog class='xdialog outerDialog' id='promptDialog' >
 ${dragClose} <br>
 <span name='text'>Enter a value</span><br>
 <input type=text size=10 maxlength=20 value=''>
 
 <hr>
 <button class='Yes' >Save</button>  <button class='close'>Cancel</button>  
 </dialog>
 <dialog class='xdialog outerDialog' id='loginDialog'>
 ${dragClose}<br>
 <div style='text-align:left;'>
 <form>
    <span name='utext'>User</span><br>
    <input type=text name='uname' size=10 maxlength=20 value=''><p>
    <span name='ptext'>Password</span><br>
    <input type=password name='passwd' size=10 maxlength=20 value=''>
    </div>
    <hr>
    <button class='Yes'> <span name='atext'>Login</span></button> 
 </form></div></dialog>
<dialog class='xdialog outerDialog' id='uploadDialog'>
 ${dragClose}<br>
 <form enctype="multipart/form-data" target='upstat' action=# method="POST" >
     <div style='text-align:left;'>
    <span name='text'>Upload</span><p>
    <input type='hidden' name='MAX_FILE_SIZE' value="300000">
    <input type=file id='idfile' name='uploadedfile' ><p>
    <hr>
    </div>
    
    <input type=submit class='Yes' name=submit value='Save' >  
     </form>
    <iframe name=upstat style='min-width:10px;max-height:48px;border:0px solid #fff;'></iframe>
 </div></dialog>`,
            dialogArray = [];
    //*******************************************
    //  we create the dialogs here 
    //*******************************************

    makeStyle();
    createAllDialogs();
    //
    //**********************************************
    // functions below
    //**********************************************
    //
    function createAllDialogs() {
        var nd, aDiv;
        aDiv = document.createElement('DIV');
        aDiv.innerHTML = allDialogsHTML;
        document.body.appendChild(aDiv);
        nd = document.querySelectorAll('.xdialog');
        nd.forEach((item) => {
            dialogArray[item.id] = item;
            let cb = item.querySelectorAll('.close');
            cb.forEach((bu) => {
                bu.onclick = dialogsClean;
            });
            if (cb.length > 0) {
                makeDraggable(item);
            }
        });
        return aDiv;
    }

    function dialogsClean() {
        openDialogs.forEach(function (elem) {
            elem.close();
        });
        openDialogs = [];
    }

    function positionDialogShow(obj, modal = true) {
        dialogsClean();
        modal ? obj.showModal() : obj.show();
        obj.style.position = 'fixed';
        obj.style.top = (window.innerHeight / 2 - obj.clientHeight / 2) + 'px';
        obj.style.left = (window.innerWidth / 2 - obj.clientWidth / 2) + 'px';
        openDialogs.push(obj);
    }
    function normText(text) {
        if (text === '' || text === null || typeof text === 'undefined') {
            text = 'no text specified';
        }
        return text;
    }
    //***
    //Information dialog
    //**/
    function justInform(text) {
        var obj = dialogArray['informDialog'];
        text = normText(text);
        obj.querySelector('[name=text]').innerHTML = '<b>' + text.replace(/\n/gi, "<br>") + '</b>';
        positionDialogShow(obj, false);
        return obj;
    }

    //
    // The action within the alert box is just an OK button
    //
    function justAlert(text) {
        var obj;
        obj = dialogArray['alertDialog'];
        text = normText(text);
        obj.querySelector('[name=text]').innerHTML = '<b>' + text.replace(/\n/gi, "<br>") + '</b>';
        positionDialogShow(obj);
        return obj;
    }
    //
    // The login box
    //
    function justLogin(params) {
        var obj, defaultParams = {utext: 'User', ptext: 'Password', atext: 'Login', action: {}};
        let p = Object.assign(defaultParams, params);
        obj = dialogArray['loginDialog'];
        p.utext = normText(p.utext);
        p.ptext = normText(p.ptext);
        p.atext = normText(p.atext);
        obj.querySelector('[name=utext]').innerHTML = `<b>${p.utext}</b>`;
        obj.querySelector('[name=ptext]').innerHTML = `<b>${p.ptext}</b>`;
        obj.querySelector('[name=atext]').innerHTML = `<b>${p.atext}</b>`;
        obj.querySelector('.Yes').onclick = () => {
            obj.close();
            p.action(obj);
        };
        positionDialogShow(obj);
        return obj;
    }
    //
    // The action within the confirm box 
    // If the Yes button is pressed the callYes function is executed
    // If the No button is pressed the  callno function is executed
    // In both cases the dialog will disapear.
    //
    function justConfirm(text, callYes, callNo) {
        var obj = dialogArray['confirmDialog'];
        positionDialogShow(obj);
        text = normText(text);
        obj.querySelector('[name=text]').innerHTML = '<b>' + text.replace(/\n/gi, "<br>") + '</b>';
        obj.querySelector('.Yes').onclick = yesClick;
        obj.querySelector('.No').onclick = noClick;
        obj.querySelector('.No').focus();
        function yesClick() {
            obj.close();
            callYes();
        }
        function noClick() {
            obj.close();
            callNo();
        }
        return;
    }

    //
    // The action within the alert box is just an OK button
    //
    function justPrompt(text, defaultValue, callOnEnter, ) {
        var obj;
        obj = dialogArray['promptDialog'];
        text = normText(text);
        obj.querySelector('[name=text]').innerHTML = '<b>' + text.replace(/\n/gi, "<br>") + '</b>';
        obj.querySelector('INPUT').value = defaultValue;
        obj.querySelector('.Yes').onclick = click;
        function click() {
            obj.close();
            if (typeof callOnEnter === 'function') {
                callOnEnter(obj.querySelector('INPUT').value);
            }
        }
        positionDialogShow(obj);
        return obj;
    }
//
    //
    //
    function justUpload(text, actionUrl, callOnEnter, hiddenFields = '') {
        var obj, fname, inp,
                f;
        obj = dialogArray['uploadDialog'];
        text = normText(text);
        obj.querySelector('[name=text]').innerHTML = '<b>' + text.replace(/\n/gi, "<br>") + '</b>';
        obj.querySelector('.Yes').onclick = click;
        obj.querySelector('FORM').action = actionUrl;
        if (hiddenFields !== '') {
            f = obj.querySelector('FORM');
            for (fname in hiddenFields) {
                inp = document.createElement('INPUT');
                inp.type = 'hidden';
                inp.name = fname;
                inp.value = hiddenFields[fname];
                f.appendChild(inp);
            }
        }
        obj.querySelector('[type=file').value = '';
        obj.querySelector('IFRAME').contentDocument.body.innerHTML = '';
        function click() {
            obj.querySelector('IFRAME').contentDocument.body.innerHTML = '';
            if (typeof callOnEnter === 'function') {
                callOnEnter(obj.querySelector('INPUT').value);
            }
        }
        positionDialogShow(obj, false);
        return obj;
    }


    function makeStyle() {
        var styleElem = document.createElement('STYLE');
        styleElem.innerHTML = [
            ".handlegrid{display: grid;grid-template-columns: 1fr 1em;background-color:#eaeaea}",
            ".hone{grid-column: 1 / 1;grid-row: 1;text-align:center;}",
            ".htwo{grid-column: 2 / 2;grid-row: 1;text-align:right;color:red;font-weight:bold}",
            ".outerDialog{overflow:auto;resize:both;min-height:10px;position:fixed;margin:0;border:1px solid black;text-align:center;min-width:150px}",
            "dialog::backdrop{overflow:auto;resize:both;min-height:10px;opacity:0;background:red;position:fixed;top:0px;right:0px;bottom:0px;left:0px;}",
            ".showtext{text-align:center;overflow-y:auto;max-width: 600px;max-height: 400px;overflow-x: auto;white-space: pre;}",
            ".handlegrid:hover{cursor:move}",
            ".close:hover{cursor:pointer}",
            ".Yes:hover{cursor:pointer}",
            ".No:hover{cursor:pointer}"
        ].join('');
        document.getElementsByTagName('head')[0].appendChild(styleElem);
        return styleElem;
    }

    function makeDraggable(obj) {
        let han = obj.querySelector('.handlegrid');
        han.ontouchstart = han.onmousedown = (e) => {// save positions at start
            obj.draggable = true;
            if (e.type === 'touched') {
                obj.hgsX = e.changedTouches[0].screenX;
                obj.hgsY = e.changedTouches[0].screenY;
            } else {
                obj.hgsX = e.screenX;
                obj.hgsY = e.screenY;
            }
            obj.hgsposX = obj.offsetLeft;
            obj.hgsposY = obj.offsetTop;
        };
        obj.ontouchmove = (e) => {// move object only on  touch devices
            if (obj.draggable) {
                obj.style.top = obj.hgsposY + (e.changedTouches[0].screenY - obj.hgsY) + 'px';
                obj.style.left = obj.hgsposX + (e.changedTouches[0].screenX - obj.hgsX) + 'px';
            }
        };
        obj.ontouchend = obj.ondragend = (e) => {// drop object at new positio 
            if (obj.draggable) {
                let t, l;
                obj.draggable = false;
                if (e.type === 'touchend') {
                    l = e.changedTouches[0].clientX;
                    t = e.changedTouches[0].clientY;
                } else {
                    t = e.target.offsetTop + (e.screenY - obj.hgsY);
                    l = e.target.offsetLeft + (e.screenX - obj.hgsX);
                }
                t = t < 0 ? 0 : t;
                t = t > window.innerHeight - obj.clientHeight ? window.innerHeight - obj.clientHeight : t;
                l = l < 0 ? 0 : l;
                l = l > window.innerWidth - obj.clientWidth ? window.innerWidth - obj.clientWidth : l;
                obj.style.top = t + 'px';
                obj.style.left = l + 'px';
                obj.style.position = 'fixed';
            }
        };
    }
    //
    // Here we  reveal the dialogs/functions to the caller
    //
    let prefix = 'my';
    reveal = {
        [`${prefix}Inform`]: justInform, //(text)     
        [`${prefix}Alert`]: justAlert, //(text)
        [`${prefix}Confirm`]: justConfirm, //(text,callYes,callNo)       
        [`${prefix}Prompt`]: justPrompt, //(text,callOnEnter,defaultValue)       
        [`${prefix}Login`]: justLogin, //(options)     
        [`${prefix}Upload`]: justUpload,
        dialogsClean: dialogsClean,
        closeDialog: dialogsClean
    };
    //********************************************
    //  return  functions
    //*******************************************
    dialogArray['alertDialog'].self = reveal;
    return reveal;
}
