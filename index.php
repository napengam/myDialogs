<!DOCTYPE html>

<html>
    <head>
        <title>Alert and Confirm</title>
        <meta charset="UTF-8">



    </head>
    <body>    
        <div class="content">
            <p class="title">Alert , Confirmation , Prompt Dialog
                <span >All source code is included in this page</span>  </p> 

            <p id="out"><b></b></p> 
            <div style="margin-left:20px">
                <input type=text siye=20>
                <button  onclick='theDialogs.myInform("<b>The Information Box! Not modal ")'>Just show some information</button>
                <button  onclick='theDialogs.myLogin("Please Log In")'>Login Dialog</button>
                <button  onclick='theDialogs.myAlert("The Alert box\nYou made it !")'>Show Alert Box</button>
                <button  onclick='theDialogs.myConfirm("<h2>Please confirm</h2>", callYes, callNo)'>Show Confirmation Dialog</button>       
                <button  onclick='theDialogs.myPrompt("<h2>Please enter</h2>", "666", callOnEnter)'>Show Prompt Dialog</button>       
                <button onclick='theDialogs.myUpload("Upload a file", "dummyUpload.php", () => {
                        }, {path: "f:/upload/"})'>Upload</button>

            </div>
            <p> Once a dialog pops up you should no longer be able to press any of the buttons above       
        </div>
        <script src="justDialogs.js"></script>   
        <script>
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
