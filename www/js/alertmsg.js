    // Customize alert box
    function CustomAlert(){
    	var msgTxt;
        this.render = function(msg, btn){
            var width = window.innerWidth;
            var height = window.innerHeight;
            var dialogoverlay = document.getElementById('dialogoverlay');
            var dialogbox = document.getElementById('dialogbox');
            dialogoverlay.style.display = "block";
            dialogoverlay.style.height = height+"px";
            dialogbox.style.left = (width/2) - (300 * .5)+"px"; // center alert box
            dialogbox.style.top = "100px";
            dialogbox.style.display = "block";
            document.getElementById('dialogboxbody').innerHTML = msg;
            document.getElementById('dialogboxfoot').innerHTML = '<button onclick="alertMsg.ok()">'+btn+'</button>';
            this.msgTxt=msg;
        }
    	this.ok = function(){
    		document.getElementById('dialogbox').style.display = "none";
    		document.getElementById('dialogoverlay').style.display = "none";
    		if(this.msgTxt=="Submitted"){
                window.location.replace("sfuindex.html");
    		}
    	}
    	
    	this.confirm = function(msg, confirm, cancel){
            var width = window.innerWidth;
            var height = window.innerHeight;
            var dialogoverlay = document.getElementById('dialogoverlay_confirm');
            var dialogbox = document.getElementById('dialogbox_confirm');
            dialogoverlay.style.display = "block";
            dialogoverlay.style.height = height+"px";
            dialogbox.style.left = (width/2) - (300 * .5)+"px"; // center alert box
            dialogbox.style.top = "100px";
            dialogbox.style.display = "block";
            document.getElementById('dialogboxbody_confirm').innerHTML = msg;
            document.getElementById('dialogboxfoot_left').innerHTML = '<button onclick="callCancel()">Cancel</button>';            
            document.getElementById('dialogboxfoot_right').innerHTML = '<button onclick="callConfirm()">Confirm</button>';
            this.msgTxt=msg;
            
            callConfirm = function(){
        		document.getElementById('dialogbox_confirm').style.display = "none";
        		document.getElementById('dialogoverlay_confirm').style.display = "none";
        		confirm;
            }
            
            callCancel = function(){
        		document.getElementById('dialogbox_confirm').style.display = "none";
        		document.getElementById('dialogoverlay_confirm').style.display = "none";
        		cancel;
            }
    	}
    }

    var alertMsg = new CustomAlert();
    
    // Customize confirm box
/*    function CustomConfirm(){
    	this.render = function(msg,yes,no){
    		var width = window.innerWidth;
    	    var height = window.innerHeight;
    		var dialogoverlay = document.getElementById('dialogoverlay');
    	    var dialogbox = document.getElementById('dialogbox');
    		dialogoverlay.style.display = "block";
    	    dialogoverlay.style.height = height+"px";
    		dialogbox.style.left = (width/2) - (300 * .5)+"px";
    	    dialogbox.style.top = "100px";
    	    dialogbox.style.display = "block";
    		
    	    document.getElementById('dialogboxbody').innerHTML = msg;
    		document.getElementById('dialogboxfoot').innerHTML = '<button onclick="confirmMsg.yes()">'+yes+'</button> <button onclick="confirmMsg.no()">'+no+'</button>';
    	}
    	this.no = function(){
    		document.getElementById('dialogbox').style.display = "none";
    		document.getElementById('dialogoverlay').style.display = "none";
    	}
    	this.yes = function(){
    		if(op == "delete_post"){
    			deletePost(id);
    		}
    		document.getElementById('dialogbox').style.display = "none";
    		document.getElementById('dialogoverlay').style.display = "none";
    	}
    }
    
    var confirmMsg = new CustomConfirm();*/