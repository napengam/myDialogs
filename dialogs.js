function dialogsF(language = 'de') {

    if (dialogsF._instance) {
        //********************************************
        //  we allready exist
        //*******************************************
        return dialogsF._instance;
    }

    var lt, dialog, beforeCloseHook = null,
            zIndex,
            ltext = {
                de: {
                    alert: 'Alarm',
                    confirm: 'Bestätigung',
                    prompt: 'Eingabe',
                    info: 'Information',
                    yes: 'Ja',
                    no: 'Nein',
                    cancel: 'Abbruch',
                    save: 'Sichern',
                    value: 'Wert',
                    close: 'Schliesen',
                    name: 'Name',
                    ok: 'Ok',
                    passwd: 'Passwort',
                    login: 'Anmelden'
                },
                en: {
                    alert: 'Alert',
                    confirm: 'Confirmation',
                    prompt: 'Prompt',
                    info: 'Information',
                    yes: 'Yes',
                    no: 'No',
                    cancel: 'Abort',
                    save: 'Save',
                    value: 'Value',
                    close: 'Close',
                    name: 'Name',
                    ok: 'Ok',
                    passwd: 'Password',
                    login: 'Login'
                }
            };
    lt = ltext[language] ?? ltext['de'];
    let diagCache = [];
    let lastDiag;
    zIndex = highestZIndex();
    makeStyle();
    let adiv = document.createElement('DIV');
    function makeStyle() {
        if (document.getElementById('dialogsFStyle'))
        {
            return;
        }
        var styleElem = document.createElement('STYLE');
        styleElem.innerHTML =
                `.outerDialog{
                overflow:auto;
                resize:both;
                min-height:10px;
                position:fixed;
                margin:0;
                border:0px solid black;
                max-width:600px;
                min-width:150px;
                box-shadow: 1px 2px 9px #677c8a;
             }
                dialog::backdrop{
                overflow:auto;
                resize:both;
                min-height:10px;
                opacity:0;
                background:red;
                position:fixed;
                top:0px;
                right:0px;
                bottom:0px;
                left:0px;
            }
                .diagDrag{
                  cursor:grab
            }`;
        document.getElementsByTagName('head')[0].appendChild(styleElem);
        return styleElem;
    }
    function login(text, save, no) {
        let type = 'login';
        if (!diagCache[type]) {
            const adiv = document.createElement('DIV');
            dialog =
                    `<dialog id='bulmaDialog_${type}' class='outerDialog' style='z-index:${zIndex};position:fixed;width:fit_content;height:fit-content'>
            <div class="message">
                <div class="p-1 is-size-7 message-header has-background-grey-light diagDrag">
                    <span id=msghead class='has-text-white'>${lt.confirm}</span>
                    <button class="delete is-danger" aria-label="delete"  title=${lt.close}></button>
                </div>
                <div class="message-body" style="overflow:auto;max-width:800px;max-height:1600px">
                    no Text given
                </div>
            </div>        
                <div id='diaghide' style='display:block' >
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input class="input" name=in1 type='text' size='40' maxlength='40'></input>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Passwort</label>
                        <div class="control">
                            <input class="input pw" name=in2 type='text' size='40' maxlength='40'></input>
                        </div>
                    </div>
                    <p>&nbsp;</p>
                    <div class="level">
                        <div class="level-item">
                            <button class='button login'>Login</button>
                        </div>
                        <div class="level-item">
                            <button class='button exit'>Abbruch</button>
                        </div>
                    </div>
            </dialog>`;
            finalize(adiv, dialog);
            diagCache[type] = adiv;
        }
        adiv = diagCache[type];

        let pw = adiv.querySelector('[name=in2]');
        pw.type = 'password';
        function click() {
            let name = (adiv.querySelector('[name=in1]').value);
            let pwd = (adiv.querySelector('[name=in2]').value);
            let pw = adiv.querySelector('[name=in2]');
            if (pw) {
                pw.type = 'text';
                pw.value = '';
            }
            save(name, pwd);
        }
        positionDialogShow(adiv);


        adiv.querySelector('.login').removeEventListener('click', click, true);
        adiv.querySelector('.login').addEventListener('click', click, true);
        adiv.querySelector('.exit').removeEventListener('click', closeDiag, true);
        adiv.querySelector('.exit').addEventListener('click', closeDiag, true);
        adiv.querySelector('.message-body').innerHTML = text;
        adiv.firstChild.showModal();
        positionDialogShow(adiv);
    }
    function prompt(text, value, save, no) {
        let type = 'prompt';
        if (!diagCache[type]) {
            const adiv = document.createElement('DIV');
            dialog =
                    `<dialog id='bulmaDialog_${type}' class='outerDialog' style='z-index:${zIndex};position:fixed;width:fit_content;height:fit-content'>
            <div class="message">
                <div class="p-1 is-size-7 message-header has-background-grey-light diagDrag">
                    <span id=msghead class='has-text-white'>${lt.confirm}</span>
                    <button class="delete is-danger" aria-label="delete"  title=${lt.close}></button>
                </div>
                <div class="message-body" style="overflow:auto;max-width:800px;max-height:1600px">
                    no Text given
                </div>
            </div>   
            <div class="field">
                <label class="label">Name</label>
                    <div class="control">
                        <input class="input" name=in1 type='text' size='40' maxlength='40'></input>
                    </div>
                </div>
            <div class='level'>
                 <div class='level-item'>
                     <button class='button yes' >${lt.save}</button>
                </div
             <div class='level-item'>
                     <button class='button no' >${lt.cancel}</button>
                </div
            </div>
        </dialog>`;
            finalize(adiv, dialog);
            diagCache[type] = adiv;
        }
        function click() {
            save(adiv.querySelector('[name=in1]').value);
        }
        adiv = diagCache[type];
        adiv.querySelector('[name=in1]').value = value;
        adiv.querySelector('.yes').removeEventListener('click', click, true);
        adiv.querySelector('.yes').addEventListener('click', click, true);

        adiv.querySelector('.no').removeEventListener('click', no, true);
        adiv.querySelector('.no').addEventListener('click', no, true);
        adiv.querySelector('.message-body').innerHTML = text;
        adiv.firstChild.showModal();
        positionDialogShow(adiv);
    }
    function confirm(text, yes, no) {
        let type = 'confirm';
        if (!diagCache[type]) {
            const adiv = document.createElement('DIV');
            dialog =
                    `<dialog id='bulmaDialog_${type}' class='outerDialog' style='z-index:${zIndex};position:fixed;width:fit_content;height:fit-content'>
            <div class="message">
                <div class="p-1 is-size-7 message-header has-background-grey-light diagDrag">
                    <span id=msghead class='has-text-white'>${lt.confirm}</span>
                    <button class="delete is-danger" aria-label="delete"  title=${lt.close}></button>
                </div>
                <div class="message-body" style="overflow:auto;max-width:800px;max-height:1600px">
                    no Text given
                </div>
            </div>        
            <div class='level'>
                 <div class='level-item'>
                     <button class='button yes' >${lt.yes}</button>
                </div
             <div class='level-item'>
                     <button class='button no' >${lt.no}</button>
                </div
            </div>
        </dialog>`;
            finalize(adiv, dialog);
            diagCache[type] = adiv;
        }
        adiv = diagCache[type];
        adiv.querySelector('.yes').removeEventListener('click', yes, true);
        adiv.querySelector('.yes').addEventListener('click', yes, true);
        adiv.querySelector('.no').removeEventListener('click', no, true);
        adiv.querySelector('.no').addEventListener('click', no, true);
        adiv.querySelector('.message-body').innerHTML = text;
        adiv.firstChild.showModal();
        positionDialogShow(adiv);
    }
    function alert(text) {
        let type = 'alert';
        if (!diagCache[type]) {
            const adiv = document.createElement('DIV');
            dialog =
                    `<dialog id='bulmaDialog_${type}' class='outerDialog' style='z-index:${zIndex};position:fixed;width:fit_content;height:fit-content'>
            <div class="message">
                <div class="p-1 is-size-7 message-header has-background-grey-light diagDrag">
                    <span id=msghead class='has-text-white'>${lt.alert}</span>
                    <button class="delete is-danger" aria-label="delete"  title=${lt.close}></button>
                </div>
                <div class="message-body" style="overflow:auto;max-width:800px;max-height:1600px">
                    no Text given
                </div>
            </div>        
            <div class='level'>
                 <div class='level-item'>
                     <button class='button' >${lt.ok}</button>
                </div
            </div>
        </dialog>`;
            finalize(adiv, dialog);
            diagCache[type] = adiv;
        }
        adiv = diagCache[type];
        adiv.querySelector('.message-body').innerHTML = text;
        adiv.firstChild.showModal();
        positionDialogShow(adiv);
    }
    function upload(text, actionUrl, hiddenFields = '') {
        let type = 'upload';
        if (!diagCache[type]) {
            const adiv = document.createElement('DIV');
            dialog =
                    `<dialog id='bulmaDialog_${type}' class='outerDialog' style='z-index:${zIndex};position:fixed;width:fit_content;height:fit-content'>
            <div class="message">
                <div class="p-1 is-size-7 message-header has-background-grey-light diagDrag">
                    <span id=msghead class='has-text-white'>${lt.info}</span>
                    <button class="delete is-danger" aria-label="delete"  title=${lt.close}></button>
                </div>
                <div class="message-body" style="overflow:auto;max-width:800px;max-height:1600px">
                   FYI;
                </div>
            <div>          
                <p>
                &nbsp;
                <form enctype="multipart/form-data" target='upstat' action=# method="POST">
                <div style='text-align:left;'>
                    <input type='hidden' name='MAX_FILE_SIZE' value="100485760">
                    <input type=file id='idfile' name='uploadedfile[]' multiple><p>
                    <hr>
                </div>
                <input type=submit class='Yes' name=submit value='Save'>
                </form>
                <iframe name=upstat src='' style='max-height:100px;border:0px solid #fff;'></iframe>
            </div>
        </dialog>`;
            finalize(adiv, dialog);
            diagCache[type] = adiv;
        }
        adiv = diagCache[type];
        adiv.querySelector('.message-body').innerHTML = text ? text : '';
        adiv.querySelector('FORM').action = actionUrl;
        let f = adiv.querySelector('FORM');
        f.idfile.value = '';
        if (hiddenFields !== '') {
            for (let fname in hiddenFields) {
                let inp = f.querySelector(`[name=${fname}]`);
                if (inp) {
                    inp.remove();
                }
                inp = document.createElement('INPUT');
                inp.type = 'hidden';
                inp.name = fname;
                inp.value = hiddenFields[fname];
                f.appendChild(inp);
            }
        }
        adiv.querySelector('IFRAME').src = '';
        adiv.firstChild.show();
        positionDialogShow(adiv);
    }
    function inform(text) {
        let type = 'inform';
        if (!diagCache[type]) {
            const adiv = document.createElement('DIV');
            dialog =
                    `<dialog id='bulmaDialog_${type}' class='outerDialog' style='z-index:${zIndex};position:fixed;width:fit_content;height:fit-content'>
            <div class="message">
                <div class="p-1 is-size-7 message-header has-background-grey-light diagDrag">
                    <span id=msghead class='has-text-white'>${lt.info}</span>
                    <button class="delete is-danger" aria-label="delete"  title=${lt.close}></button>
                </div>
                <div class="message-body" style="overflow:auto;max-width:800px;max-height:1600px">
                   FYI;
                </div>
            </div>        
            <div class='level'>
                 <div class='level-item'>
                     <button class='button' >${lt.ok}</button>
                </div
            </div>
        </dialog>`;
            finalize(adiv, dialog);
            diagCache[type] = adiv;
        }
        adiv = diagCache[type];
        adiv.querySelector('.message-body').innerHTML = text ? text : '';
        adiv.firstChild.show();
        positionDialogShow(adiv);
    }
    function closeDiag() {
        if (typeof beforeCloseHook === 'function') {
            beforeCloseHook(adiv);
        }
        if (adiv.firstChild) {
            adiv.firstChild.close();
        }
    }
    function positionDialogShow(obj) {
        if (lastDiag && lastDiag !== obj.firstChild) {
            lastDiag.close();
        }
        obj = obj.firstChild;
        obj.style.top = (window.innerHeight / 2 - obj.clientHeight / 2) + 'px';
        obj.style.left = (window.innerWidth / 2 - obj.clientWidth / 2) + 'px';
        lastDiag = obj;
    }
    function finalize(adiv, dialog) {
        adiv.innerHTML = dialog;
        document.body.appendChild(adiv);
        makeDraggable(adiv.firstChild, adiv.querySelector('.diagDrag'));
        adiv.querySelector('.delete').addEventListener('click', closeDiag, true);
        adiv.querySelectorAll('.button').forEach(btn => {
            btn.removeEventListener('click', closeDiag, true);
            btn.addEventListener('click', closeDiag, true);
        });
    }
    function setCloseHook(fn) {
        beforeCloseHook = fn;
    }
    function highestZIndex() {// return highest Z-Index along the parent path
        var list, z = 51, zz = 0;
        list = document.querySelectorAll("[style*='z-index:']");
        list.forEach((elem) => {
            zz = parseInt(elem.style.zIndex, 10);
            if (zz > z) {
                z = zz;
            }
        });
        return z;
    }

    function makeDraggable(element, handle = element) {
        const isTouch = 'ontouchstart' in window;
        let offsetX, offsetY;

        const getPoint = e => e.touches ? e.touches[0] : e;

        const onMove = e => {
            e.preventDefault();
            const p = getPoint(e);
            element.style.position = 'fixed';
            element.style.left = Math.max(0, Math.min(window.innerWidth - element.offsetWidth, p.clientX - offsetX)) + 'px';
            element.style.top = Math.max(0, Math.min(window.innerHeight - element.offsetHeight, p.clientY - offsetY)) + 'px';
        };

        const onEnd = () => {
            document.removeEventListener(isTouch ? 'touchmove' : 'mousemove', onMove);
            document.removeEventListener(isTouch ? 'touchend' : 'mouseup', onEnd);
        };

        handle.addEventListener(isTouch ? 'touchstart' : 'mousedown', e => {
            const p = getPoint(e);
            offsetX = p.clientX - element.offsetLeft;
            offsetY = p.clientY - element.offsetTop;
            document.addEventListener(isTouch ? 'touchmove' : 'mousemove', onMove, {passive: false});
            document.addEventListener(isTouch ? 'touchend' : 'mouseup', onEnd);
        });
    }


    let reveal = {
        setCloseHook: setCloseHook,
        myAlert: alert,
        myInform: inform,
        myConfirm: confirm,
        myLogin: login,
        myUpload: upload,
        myPrompt: prompt,
        closeDiag: closeDiag,
        closeDiaglog: closeDiag,
        close: closeDiag
    };
    dialogsF._instance = reveal;
    return reveal;
}
