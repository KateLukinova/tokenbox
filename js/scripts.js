//загрузка сверху страницы
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

$( document ).ready(function() {

    $('.video').parent().click(function () {
        if($(this).children(".video").get(0).paused) {
            $(this).children(".video").get(0).play();   $(this).children(".button-play").fadeOut();
        } else {
            $(this).children(".video").get(0).pause();
            $(this).children(".button-play").fadeIn();
        }
    });


    $('.slider-reviews').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 400,
        arrows: false,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        asNavFor: '.slider-reviews',
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: true,
        focusOnSelect: true,
        loop: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 3,
                    centerMode: true,
                    infinite: true
                }
            }
        ]
    });
    $(".reviews-button-prev").click(function () {
        $('.slider-reviews').slick('slickPrev');
        $('.slider-nav').slick('slickPrev');
    });
    $(".reviews-button-next").click(function () {
        $('.slider-reviews').slick('slickNext');
        $('.slider-nav').slick('slickNext');
    });

    //video-modal
    $('#modal1').on('hidden.bs.modal', function (e) {
        // do something...
        $('#modal1 iframe').attr("src", $("#modal1 iframe").attr("src"));
    });

    //mask tel
    $('.phone').mask('(000) 000 00 00', {placeholder: "(_ _ _) _ _ _  _ _  _ _"});

    //scroll anchor
    // $(".btn-anchor").click(function() {
    //     $("html, body").animate({
    //         scrollTop: $($(this).attr("href")).offset().top + "px"
    //     }, {
    //         duration: 1500,
    //         easing: "swing"
    //     });
    //     return false;
    // });

//video-page

    $('.vid-item').each(function(index){
        $(this).on('click', function(){
            var current_index = index+1;
            $('.vid-item .thumb').removeClass('active');
            $('.vid-item:nth-child('+current_index+') .thumb').addClass('active');
        });
    });

    AOS.init({disable: 'mobile'});





//video-hover
    var figure = $(".video-wrapper").hover( hoverVideo, hideVideo );

    function hoverVideo(e) {
        $('video', this).get(0).play();
    }

    function hideVideo(e) {
        $('video', this).get(0).pause();
    }

    // dropdown-user
    $('.user-block').click(function () {
        $(this).find('.user-dropdown-content').toggleClass('is-active')
    })


    //progress circle

    if (window.location.href.indexOf("personal-page") > -1) {
        AnimateMiniCircle("icon-progress-course", 0.45);

        function AnimateMiniCircle(container_id, animatePercentage) {
            var startColor = '#EA3410';
            var endColor = '#EA3410';

            var element = document.getElementById(container_id);
            var circle = new ProgressBar.Circle(element, {
                color: startColor,
                trailColor: '#eee',
                trailWidth: 20,
                duration: 2000,
                strokeWidth: 20,
                // Set default step function for all animate calls
                step: function (state, circle) {
                    circle.path.setAttribute('stroke', state.color);
                }
            });

            circle.animate(animatePercentage, {
                from: {
                    color: startColor
                },
                to: {
                    color: endColor
                }
            });
        }
    }

    if (window.location.href.indexOf("personal-course") > -1) {
        AnimateCircle("circle-progress-course", 0.45);

        function AnimateCircle(container_id, animatePercentage) {
            var startColor = '#EA3410';
            var endColor = '#EA3410';

            var element = document.getElementById(container_id);
            var circle = new ProgressBar.Circle(element, {
                color: startColor,
                trailColor: '#eee',
                trailWidth: 10,
                duration: 2000,
                strokeWidth: 10,
                text: {
                    value: (animatePercentage * 100)  + '%',
                    className: 'progressbar__label'
                },
                // Set default step function for all animate calls
                step: function (state, circle) {
                    circle.path.setAttribute('stroke', state.color);
                }
            });

            circle.animate(animatePercentage, {
                from: {
                    color: startColor
                },
                to: {
                    color: endColor
                }
            });
        }
    }

    // аватар из букв

    var avatarElement = $('.avatar-initials');
    console.log(avatarElement)
    if (avatarElement.length) {
        var name = avatarElement.data('name');
        var initials = name.split(' ')[0].charAt(0).toUpperCase() + name.split(" ")[1].charAt(0).toUpperCase();

        avatarElement.css({
            'background-color': '#ffffff',
        })
            .html(initials);
    }

    // загрузка аватара
    $("#image-upload").change(function(data){

        var imageFile = data.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(imageFile);

        reader.onload = function(evt){
            $('#image-preview').attr('src', evt.target.result);
            $('#image-preview').hide();
            $('#image-preview').fadeIn(500);
        }

    });

    //показать скрыть пароль
    $(".toggle-password").click(function() {

        $(this).toggleClass("show");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    // сменить пароль
    $('#change-password').click(function () {
        $('#block-password').fadeIn(500).css('display', 'flex')
        $('#block-not-password').css('display', 'none')
    })
});

//credit card mask
if (window.location.href.indexOf("personal-page") > -1) {

    let ccNumberInput = document.querySelector('.cc-number-input'),
        ccNumberPattern = /^\d{0,16}$/g,
        ccNumberSeparator = " ",
        ccNumberInputOldValue,
        ccNumberInputOldCursor,

        ccExpiryInput = document.querySelector('.cc-expiry-input'),
        ccExpiryPattern = /^\d{0,4}$/g,
        ccExpirySeparator = "/",
        ccExpiryInputOldValue,
        ccExpiryInputOldCursor,

        ccCVCInput = document.querySelector('.cc-cvc-input'),
        ccCVCPattern = /^\d{0,3}$/g,

        mask = (value, limit, separator) => {
            var output = [];
            for (let i = 0; i < value.length; i++) {
                if ( i !== 0 && i % limit === 0) {
                    output.push(separator);
                }

                output.push(value[i]);
            }

            return output.join("");
        },
        unmask = (value) => value.replace(/[^\d]/g, ''),
        checkSeparator = (position, interval) => Math.floor(position / (interval + 1)),
        ccNumberInputKeyDownHandler = (e) => {
            let el = e.target;
            ccNumberInputOldValue = el.value;
            ccNumberInputOldCursor = el.selectionEnd;
        },
        ccNumberInputInputHandler = (e) => {
            let el = e.target,
                newValue = unmask(el.value),
                newCursorPosition;

            if ( newValue.match(ccNumberPattern) ) {
                newValue = mask(newValue, 4, ccNumberSeparator);

                newCursorPosition =
                    ccNumberInputOldCursor - checkSeparator(ccNumberInputOldCursor, 4) +
                    checkSeparator(ccNumberInputOldCursor + (newValue.length - ccNumberInputOldValue.length), 4) +
                    (unmask(newValue).length - unmask(ccNumberInputOldValue).length);

                el.value = (newValue !== "") ? newValue : "";
            } else {
                el.value = ccNumberInputOldValue;
                newCursorPosition = ccNumberInputOldCursor;
            }

            el.setSelectionRange(newCursorPosition, newCursorPosition);

            highlightCC(el.value);
        },
        highlightCC = (ccValue) => {
            let ccCardType = '',
                ccCardTypePatterns = {
                    amex: /^3/,
                    visa: /^4/,
                    mastercard: /^5/,
                    disc: /^6/,

                    genric: /(^1|^2|^7|^8|^9|^0)/,
                };

            for (const cardType in ccCardTypePatterns) {
                if ( ccCardTypePatterns[cardType].test(ccValue) ) {
                    ccCardType = cardType;
                    break;
                }
            }

            let activeCC = document.querySelector('.cc-types__img--active'),
                newActiveCC = document.querySelector(`.cc-types__img--${ccCardType}`);

            if (activeCC) activeCC.classList.remove('cc-types__img--active');
            if (newActiveCC) newActiveCC.classList.add('cc-types__img--active');
        },
        ccExpiryInputKeyDownHandler = (e) => {
            let el = e.target;
            ccExpiryInputOldValue = el.value;
            ccExpiryInputOldCursor = el.selectionEnd;
        },
        ccExpiryInputInputHandler = (e) => {
            let el = e.target,
                newValue = el.value;

            newValue = unmask(newValue);
            if ( newValue.match(ccExpiryPattern) ) {
                newValue = mask(newValue, 2, ccExpirySeparator);
                el.value = newValue;
            } else {
                el.value = ccExpiryInputOldValue;
            }
        };

    ccNumberInput.addEventListener('keydown', ccNumberInputKeyDownHandler);
    ccNumberInput.addEventListener('input', ccNumberInputInputHandler);

    ccExpiryInput.addEventListener('keydown', ccExpiryInputKeyDownHandler);
    ccExpiryInput.addEventListener('input', ccExpiryInputInputHandler);
}

