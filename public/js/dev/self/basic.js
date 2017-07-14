/**
 * Created by Donghui Huo on 2016/3/15.
 */
var $ = jQuery = require('jquery');
require("flexslider");
require("bootstrap");
var utilFun = require("utilFun");
$(document).ready(function () {
    //onclick give active
    $(".navbar-nav li.active").removeClass("active");
    $(".navbar-nav li." + $("body").attr("id") + "-li").addClass("active");
    $(".navbar-nav li." + $("body").attr("id") + "-li-parent").addClass("active");
    $('.top-container .flexslider').flexslider({
        fadeFirstSlide: false,
        controlNav: false,
        directionNav: true,
        animationSpeed: 1000,
        slideshowSpeed: 4000,
        slideshow: true,
        prevText: "",
        nextText: "",
    });
    if ($("body").attr("id") === 'timeline') {
        $(".first-container .content > ul >li img").css("height", "0px")
        $(".first-container .content > ul >li ").hover(function (_this) {
            $(".first-container .content > .timeline-spot").css("top", (this.offsetTop) + 'px')
            $(this).find("img").css("visibility", "visible").css("height", "200px").css("margin-top", "2px")

        })
        $(".first-container .content > ul >li ").mouseleave(function (_this) {
            console.log($(this).index())
            $(".first-container .content > .timeline-spot").css("top", "-50px")
            $(this).find("img").css("height", "0px").css("margin-top", "0px").css("visibility", "hidden")
        })
    } else if ($("body").attr("id") === 'contact-form') {
        var keySimple = Math.ceil(Math.random() * 100000)
        $('#form-newsletter .captcha-img').attr('src', 'http://83.246.40.177/cmsbackend/form/simplecaptcha?key=solar-contact-form-' + keySimple + '&width=133&height=40')
        $('#form-newsletter .captcha-img').click(function () {
            $(this).attr('src', 'http://83.246.40.177/cmsbackend/form/simplecaptcha?height=40&key=solar-contact-form-' + keySimple + '&width=133&height=40&amp;rand=' + Math.random())
        })
        $('#form-newsletter  .newsletter-submit').click(function (e) {
            if (!$('#form-newsletter #name').val() || !$('#form-newsletter #email').val() || !$('#form-newsletter #comment').val() || !$('#form-newsletter #captcha').val()) {
                alert('Fields marked with an asterisk are required');
            } else {
                $.ajax({
                    method: 'GET',
                    url: "http://83.246.40.177/cmsbackend/form/sendMailWithCaptcha",
                    dataType: "jsonp",
                    data: {
                        websiteId: 5010,
                        captchaKey: 'solar-contact-form-' + keySimple,
                        captchaValue: $('#form-newsletter #captcha').val(),
                        subject: 'Contact DESERT SOLAR POWER',
                        content: '<h3 style="color: #990000">User Information</h3>' +
                        '<ul style="list-style: none;padding-left:0;margin-left:10px;color: #383d40">' +
                        '<li><span style="display:inline-block;width: 120px;">Name:</span> ' + $('#form-newsletter #name').val() + '</li>' +
                        '<li><span style="display:inline-block;width: 120px;">Company:</span>' + $('#form-newsletter #company').val() + '</li>' +
                        '<li><span style="display:inline-block;width: 120px;">Street, No.:</span>' + $('#form-newsletter #street').val() + '</li>' +
                        '<li><span style="display:inline-block;width: 120px;"> Zip Code, City:</span>' + $('#form-newsletter #city').val() + '</li>' +
                        '<li><span style="display:inline-block;width: 120px;">Phone:</span>' + $('#form-newsletter #phone').val() + '</li>' +
                        '<li><span style="display:inline-block;width: 120px;">eMail:</span>' + $('#form-newsletter #email').val() + '</li>' +
                        '<li><span style="display:inline-block;width: 120px;">Comment:</span>' + $('#form-newsletter #comment').val() + '</li>' +
                        '</ul>'
                    },
                    jsonp: 'callback',
                    jsonpCallback: 'newsletter_callback',
                    success: function (data) {
                        if (data.success) {
                            alert('we will response to you as soon as possible')
                            $('#form-newsletter')[0].reset();
                        } else {
                            alert('please provide a correct captcha')
                            $('#form-newsletter #captcha').val('')
                            $('#form-newsletter .captcha-img').attr('src', 'http://83.246.40.177/cmsbackend/form/simplecaptcha?key=solar-contact-form-' + keySimple + '&width=133&height=40&amp;rand=' + Math.random())

                        }
                    }
                });
            }
            e.preventDefault()
        })
    }
});

