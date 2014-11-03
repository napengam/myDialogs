<!DOCTYPE html>
<!--
/*************************************************************************
myDialogs.js 1.0 Copyright (c) 2013 Heinrich Schweitzer
Contact me at hgs@hgsweb.de
This copyright notice MUST stay intact for use.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 ***************************************************************************/

The latest version can allways be found at http://hgsweb.de
-->
<html>
    <head>
        <title>Alert and Confirm</title>
        <meta charset="UTF-8">
        <link href="main.css" type="text/css" rel="stylesheet" >    
        <script src="moveToBottom.js"></script>
        <script src="myDialog.js"></script>
       <script src="myDrag.js"></script>
        <script type="text/javascript">
            function addEvent(obj, ev, fu) {
                if (obj.addEventListener) {
                    obj.addEventListener(ev, fu, false);
                } else {
                    var eev = 'on' + ev;
                    obj.attachEvent(eev, fu);
                }
            }
            function callYes() {
                document.getElementById('out').innerHTML = '<b style="color:green">The confirm box YES button was pressed';
            }
            function callNo() {
                document.getElementById('out').innerHTML = '<b style="color:red">The confirm box NO button was pressed';
            }
            function callOnEnter(v) {
                document.getElementById('out').innerHTML = '<b style="color:black">' + v;
            }
            function callOnSelect(option) {
                document.getElementById('out').innerHTML = '<b style="color:white">' + option.value;
            }
            addEvent(window, 'resize', function() {
                moveToBottom('foot');
            });
            addEvent(window, 'load', function() {
                theDialogs = myDialogs();
                myAlert = theDialogs.myAlert;
                myConfirm = theDialogs.myConfirm;
                myPrompt = theDialogs.myPrompt;
                mySelect = theDialogs.myPromptSelect;
                moveToBottom('foot');
            });
        </script>  
    </head>
    <body>    
        <div class="content">
            <div class="divhead" >                                                       
                <i><a href="../index.php"> <img  src="../home.png"></a><b  class="headLine">&nbsp;PHP &amp; JavaScript &amp; HTML &amp; CSS </b></i>
                <b></b>
                <span class="small"><b></b></span>                                     
            </div>
            <p class="title">Alert , Confirmation , Prompt Dialog
                <span class="small">All source code is included in this page</span>  </p>
            <p id="out"><b></b></p> 
            <div style="margin-left:20px">
                <button  onclick='myAlert("<h1>The Alert box</h1><br>You made it !")'>Show Alert Box</button>
                <button  onclick='myConfirm("<h2>Please confirm</h2>", callYes, callNo)'>Show Confirmation Dialog</button>       
                <button  onclick='myPrompt("<h2>Please enter</h2>", "666", callOnEnter)'>Show Prompt Dialog</button>       
                <button  onclick="mySelect('<h2>Please select</h2>', 'value1|text1|description 1,value2|text2|description 2', callOnSelect)">Show Select Dialog</button>
            </div>
            <p> Once a dialog pops up you should no longer be able to press any of the buttons above       
        </div>
        <div id=foot class="foot trans"> 
            <span class="footText">
                &copy;2007 - 2013 <a href="http://athos-calling.com/hgs/html/index_1.php" style="color:white;">Heinrich Schweitzer</a> All rights reserved.
            </span>             
        </div>       
    </body>
</html>