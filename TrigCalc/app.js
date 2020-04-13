var navigationControl = function(the_link){

	/* manage the content that is displayed */
	var idToShow = $(the_link).attr("href");
	localStorage.lastnavlink = idToShow;

    
	$(".content-wrapper").hide(); 	/* hide all content-wrappers */
	$(idToShow).show(); /* show the chosen content wrapper */
    $(idToShow).removeClass("locked"); /* show the chosen content wrapper */

    $("html, body").animate({ scrollTop: "0px" }); /* scroll to top of page */
	$(".navbar-collapse").collapse('hide'); /* explicitly collapse the navigation menu */

} /* end navigation control */

//Global definition of triangle object
var triangle= {hyp:0, opp:0, adj:0};

var trigCalc = function(triangle){
    var identities = {sin:0, cos:0, tan:0, cot:0, csc:0, sec:0}
    let opposite= triangle.opp;
    let adjacent= triangle.adj;
    let hypotenuse = triangle.hyp;

    //Fill the object with proper calculations
    identities.sin = (opposite/hypotenuse).toFixed(2);
    identities.cos = (adjacent/hypotenuse).toFixed(2);
    identities.tan = (opposite/adjacent).toFixed(2);
    identities.cot = (adjacent/opposite).toFixed(2);
    identities.csc = (hypotenuse/opposite).toFixed(2);
    identities.sec = (hypotenuse/adjacent).toFixed(2);


    $("#identityTable").removeClass("hidden");


    // Insert values into table
    $("#sinCell").html(identities.sin);
    $("#cosCell").html(identities.cos);
    $("#tanCell").html(identities.tan);
    $("#cotCell").html(identities.cot);
    $("#cscCell").html(identities.csc);
    $("#secCell").html(identities.sec);
    return;
}

var tableClear = function(){
    //Clear the table
    $("#sinCell").html("");
    $("#cosCell").html("");
    $("#tanCell").html("");
    $("#cotCell").html("");
    $("#cscCell").html("");
    $("#secCell").html("");

    $("#identityTable").addClass("hidden");
    return;
}


var triangleCalc = function(){


triangle.hyp = $("#hypotenuse").val();
triangle.opp= $("#opposite").val();
triangle.adj= $("#adjacent").val();

$("#triangleErrorSpan").html("")
//Error Checking
//See if more than one was left empty
if( triangle.hyp ==0){
    if( triangle.opp ==0 ||triangle.adj == 0){
        triangleAlert();
        }
        else{
            removeAlert("#triangleSpecs");        
            let opposite = triangle.opp;
            let adjacent = triangle.adj;
           triangle.hyp = findHypotenuse(opposite,adjacent);
           trigCalc(triangle);
        }
    }
else if( triangle.adj ==0){
    if( triangle.opp ==0 ||triangle.hyp ==0){

        triangleAlert();
    }
    else{           
        removeAlert("#triangleSpecs");
        let opposite = triangle.opp;
        let hypotenuse = triangle.hyp;
       traingle.adj = findOppAdj(hypotenuse,opposite);
       trigCalc(triangle);
    }

}

else if( triangle.opp == 0){
    if( triangle.adj == 0 || triangle.hyp == 0){

        triangleAlert();
    }
    else{           
        removeAlert("#triangleSpecs");
        let adjacent = triangle.adj;
        let hypotenuse = triangle.hyp;
       traingle.opp = findOppAdj(hypotenuse,adjacent);
       trigCalc(triangle);
    }
}
// if none are blank, ensure values are legitamate or go straight to trigCal()
else{
   if(valsCheck(triangle)){
    removeAlert("#triangleSpecs");
    trigCalc(triangle);
}}
//end function
return;
}

var valsCheck = function(triangle){
    let opposite= triangle.opp * triangle.opp;
    let adjacent= triangle.adj * triangle.adj;
    let hypotenuse = triangle.hyp * triangle.hyp;
    let combinedSides = opposite + adjacent;
    if(combinedSides!=hypotenuse){
        triangleAlert();
        return 0;
    }
    else{
        return 1;
    }


}

var triangleAlert = function(){
    $("#triangleSpecs").removeClass("validForm");
    $("#triangleSpecs").addClass("invalidForm");
    $("#triangleErrorSpan").html("More than one missing field, or invalid inputs");
}

var identityCalc = function(){
    var numerator = $("#identityNum").val();
    var denominator = $("#identityDen").val();
    if(numerator==0 || denominator==0){
        identityAlert();
        return;
    }
    $("#identityErrorSpan").html("");
    var userIdentity = $("#trigOptions").val()
    switch(userIdentity){

        case "sin":
            removeAlert("#identitySpecs")
            triangle.opp = numerator;
            triangle.hyp = denominator;
            triangle.adj = findOppAdj(denominator, numerator);
            trigCalc(triangle);
            break;

         case "cos":
            removeAlert("#identitySpecs")
            triangle.adj = numerator;
            triangle.hyp = denominator;
            triangle.opp = findOppAdj(denominator, numerator);
            trigCalc(triangle);
            break;
                
        case "tan":
            removeAlert("#identitySpecs")
            triangle.opp = numerator;
            triangle.adj = denominator;
            triangle.hyp = findHypotenuse(numerator, denominator);
            trigCalc(triangle);

            break;        
       
        case "cot":

            removeAlert("#identitySpecs")    
            triangle.adj = numerator;
            triangle.opp = denominator;
            triangle.hyp = findHypotenuse(denominator, numerator);
            trigCalc(triangle);

            break;

        case "csc":
            removeAlert("#identitySpecs")
            triangle.hyp = numerator;
            triangle.opp = denominator;
            triangle.adj = findOppAdj(numerator, denominator);
            trigCalc(triangle);

            break;

        case "sec":
            removeAlert("#identitySpecs")
            triangle.hyp = numerator;
            triangle.adj = denominator;
            triangle.opp = findOppAdj(numerator, denominator);
            trigCalc(triangle);

            break;
        
        default:
            identityAlert();
            break;
        }

        return;
    }
var identityAlert = function(){
    $("#identitySpecs").removeClass("validForm");
    $("#identitySpecs").addClass("invalidForm");
    $("#identityErrorSpan").html("Missing input in numerator or denominator")

}
var removeAlert = function(theForm){
    $(theForm).removeClass("invalidForm");
    $(theForm).addClass("validForm");

}
var findHypotenuse = function(opposite, adjacent){
   //Square the opposite and adjacent sides
    opposite *= opposite;
    adjacent *= adjacent;
    //a^2 + b^2 = c^2
    let hypotenuse = opposite + adjacent;
    hypotenuse = Math.sqrt(hypotenuse).toFixed(2);
   $("#hypotenuse").html("style='color: red;'")
    $("#hypotenuse").val(hypotenuse);

    return hypotenuse;
}

var findOppAdj = function(hypotenuse, otherSide){
    hypotenuse *= hypotenuse;
    otherSide *= otherSide;
    //c^2-a^2 = b^2
    let missingSide = hypotenuse - otherSide;
    missingSide= Math.sqrt(missingSide).toFixed(2);
    return missingSide;
}

//document ready section
$(document).ready(function (){

    /* ------------------  basic navigation ----------------*/



    /* this reveals the default page */
    $("#div-triangle").show();
    
    alert("Hello! This program was writen 4/12/2020. While it is by no means a finished product, it's goal is to show the Sapient hiring manager some of my familiarity with the DOM, jquery calls, and general program logic. Enjoy! ");

    $("#triangleSubmit").click(function(){
        triangleCalc();
    });

    $("#identitySubmit").click(function(){
        identityCalc();
    })
    $(".btnClearTable").click(function(){
        tableClear();
    })

    /* this controls navigation - show / hide pages as needed */

	/* what to do when a navigation link is clicked */
	$(".nav-link").click(function(){
		navigationControl(this);
	});
	
		
}); /* end the document ready event*/
