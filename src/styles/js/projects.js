//Click scroll actions
$(document).ready(function () {

    checkDark();

    $('#dark-light-toggle').click(function(){
        toggleDark();
        checkDark();
    })

    fetch('https://api.github.com/orgs/GDGVIT/repos?sort=forks&order=desc').then((response)=>{
        response.json().then((responseJSON)=>{
            var n = Object.values(responseJSON).length;
            for(i=0;i<n;i++){
                $( "#github-repos" ).append( "<div class='circle-icon-holder'><div class='circle-icon-caption'><h3 class='text-center barlow-thin'>" + responseJSON[i].name + "</h3><p class='text-center barlow-medium'> Forks:" + responseJSON[i].forks + "</p></div></div>" );
            }
        })
    }).catch((error)=>{
        alert(error)
    })
    // function gettext() {
    //     fetch('https://medium-f.herokuapp.com/api/v2/articles?orgid=gdg-vit' ,{
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);
    //     //   let output = '';
    //     //   let i=0;
    //     //   let j=data.length;
    //     //   for(i=j-1;i>-1;i=i-2){
    //     //       if(i>1){
    //     //     output += ``
    //     //     }  };
    //     //   document.getElementById("accordionExample").innerHTML = output;
    //     //   document.getElementById("loader").style.display = "none"
    //     //   console.log(data.event_name[2]);
    //     // console.log(data[0].event_name)
    //        });
    //       };
    //       gettext();

    // Scroll Clicks
    $("#down-arrow").click(function () {
        $('html, body').animate({
            scrollTop: $("#our-work-scroll").offset().top
        }, 900);
    })

    // Icons Expanders
    $('#board-expander').click(function(){
        if(!$('#board').hasClass('icons-expanded')){
            $('#board').addClass('icons-expanded');
            $('#board-expander').children().children().text('Show Less');
        }
        else{
            $('#board').removeClass('icons-expanded');
            $('#board-expander').children().children().text('Show All');
        }
        $('html, body').animate({
            scrollTop: $("#board").offset().top - 300
        }, 300);
    })

    $('#github-repo-expander').click(function(){
        if(!$('#github-repos').hasClass('icons-expanded')){
            $('#github-repos').addClass('icons-expanded');
            $('#github-repo-expander').children().children().text('Show Less');
        }
        else{
            $('#github-repos').removeClass('icons-expanded');
            $('#github-repo-expander').children().children().text('Show All');
        }
        // $('html, body').animate({
        //     scrollTop: $("#github-repo").offset().top - 300
        // }, 300);
    })

    // Close Menu
    $('#menu-close').click(function () {
        $('.main-menu').fadeOut(100);
    })

    $(window).on('scroll', function () {

        if ($(this).scrollTop() > 0) {
            if (!$('.navbar').hasClass('navbar-scrolled')) {
                $('.navbar').addClass('navbar-scrolled');
            }
        } else {
            if ($('.navbar').hasClass('navbar-scrolled')) {
                $('.navbar').removeClass('navbar-scrolled');
            }
        }
    });
})

var toggleDark = function(){
    if(!$('body').hasClass('dark')){
        localStorage.setItem('dark',true);
    }
    else{
        localStorage.setItem('dark',false);
    }
}

var checkDark = function (){

    var dark = localStorage.getItem('dark');

    if(dark==='true'){
        $('body').addClass('dark');
        $('.dark-light-toggle').children().text('I want light mode');
    }
    else{
        $('body').removeClass('dark');
        $('.dark-light-toggle').children().text('I want dark mode');
    }

}