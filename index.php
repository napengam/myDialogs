<!DOCTYPE html>
<!--
/*************************************************************************
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

        <script src="myDialogs.js"></script>   
        <script src="makeDraggable.js"></script>
        <script src="myVeil.js"></script>

    </head>
    <body>    
        <div class="content">

            <p class="title">Alert , Confirmation , Prompt Dialog
                <span >All source code is included in this page</span>  </p> 

            <p id="out"><b></b></p> 
            <div style="margin-left:20px">
                <input type=text siye=20>
                <button  onclick='theDialogs.myInform("<h1>The Information Box!\n\
The Information Box!The Information Box!\n\
The Information Box!The Information Box!The Information Box!\n\
The InfThe Information Box!The Information Box!\n\
The Information Box!The Information Box!The Information Box!\n\
The InfThe Information Box!The Information Box!\n\
The Information Box!The Information Box!The Information Box!\n\
The Information Box!The Information Box!The Information Box!The Information Box!\n\
The Information Box!The Information Box!<br>Not modal")'>Just show some information</button>
                <button  onclick='theDialogs.myLogin("Please Log In")'>Login Dialog</button>
                <button  onclick='theDialogs.myAlert("The Alert box\nYou made it !")'>Show Alert Box</button>
                <button  onclick='theDialogs.myConfirm("<h2>Please confirm</h2>", callYes, callNo)'>Show Confirmation Dialog</button>       
                <button  onclick='theDialogs.myPrompt("<h2>Please enter</h2>", "666", callOnEnter)'>Show Prompt Dialog</button>       
                <button  onclick="theDialogs.myPromptSelect('<h2>Please select</h2>', 'value1|< 5|description &1,value2|text2|description 2', callOnSelect)">Show Select Dialog</button>
                <button  onclick="theDialogs.myDialogBox({text: '<h2>Hallo splash bang bumm', actions: [
                                {text: 'ok', func: theDialogs.dialogsClean},
                                {text: '<button>okok</button>', func: theDialogs.dialogsClean},
                                {text: 'NEIN', func: theDialogs.dialogsClean}]})">Show general Dialog</button>
            </div>
            <p> Once a dialog pops up you should no longer be able to press any of the buttons above       
        </div>

        <script type="text/javascript">
            theDialogs = myDialogs();
            theDialogs = myDialogs(); // test if created only once 

            function callYes() {
                document.getElementById('out').innerHTML = '<b style="color:green">The confirm box YES button was pressed';
            }
            function callNo() {
                document.getElementById('out').innerHTML = '<b style="color:red">The confirm box NO button was pressed';
            }
            function callOnEnter(v) {
                document.getElementById('out').innerHTML = '<b style="color:black">' + htmlentity(v);
            }
            function callOnSelect(option) {
                document.getElementById('out').innerHTML = '<b style="color:black">' + htmlentity(option.value);
            }


            function htmlentity(value) {
                value = value.replace(/&/gi, "&amp;");
                value = value.replace(/</gi, "&lt;");
                value = value.replace(/>/gi, "&gt;");
                value = value.replace(/"/gi, "&quot;");
                value = value.replace(/'/gi, "&#039;");
                return value;
            }
        </script>  
    </body>
</html>
