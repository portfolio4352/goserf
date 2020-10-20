$(function() {
    $('.hapiness__bg').lettering();

     /* **********************************************************************************************************
    Слайдеры
    ********************************************************************************************************** */

    $('.situations__slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipe: false,
        prevArrow: '<div class="tap-area left-area"></div>',
        nextArrow: '<div class="tap-area right-area"></div>',
        responsive: [ 
            { 
                breakpoint: 1700,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 2,
                    swipe: true,
                    centerMode: true,
                    centerPadding: '20px',
                    dots: true
                }  
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1,
                    swipe: true,
                    centerMode: true,
                    centerPadding: '25px',
                    dots: true
                }
            }
        ]
    });

    $('.after__slider').slick({
        fade: true,
        swipe: false,
        prevArrow: '<div class="tap-area left-area"></div>',
        nextArrow: '<div class="tap-area right-area"></div>',
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    swipe: true,
                    prevArrow: '<div class="after__arrow-left"><img src="img/icons/arrow-left.png"></div>',
                    nextArrow: '<div class="after__arrow-right"><img src="img/icons/arrow-right.png"></div>',
                }
            }
        ]
    });

    $('.will__slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        initialSlide: 2,
        swipe: false,
        prevArrow: '<div class="tap-area left-area"></div>',
        nextArrow: '<div class="tap-area right-area"></div>',
        responsive: [
            {
                breakpoint: 1700,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "90px"
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                   
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    swipe: true,
                    dots: true,
                    centerMode: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    swipe: true,
                    dots: true,
                    centerMode: true
                }
            }
        ]
    });

    var sliderWorks = false;

    $(window).on('resize', function() {
        sliderTransform();
    });

    sliderTransform();

    function sliderTransform() {
        if ($(this).width() < 600 && sliderWorks === false) {
            $('.girls__slider').addClass('girls__slider-phone');

            $('.girls__slider-phone').slick({
                slidesToShow: 1,
                swipe: true,
                arrows: false,
                dots: true 
            });
        } else if ($(this).width() > 600) {
            $('.girls__slider').removeClass('girls__slider-phone');
        }
    }

    /* **********************************************************************************************************
    Меню
    ********************************************************************************************************** */
    var menuBtn = $('.header__menu-btn');
    var menuList = $('.header__list');

    menuBtn.on('click', function() {
        $(this).toggleClass('active');
        menuList.toggleClass('active');
    });

    menuList.on('click', function() {
        if ($(window).width() <= 480) {
            menuBtn.removeClass('active');
            menuList.removeClass('active');
        }
    });
    
    /* **********************************************************************************************************
    Реализация тестов 
    ********************************************************************************************************** */
    var progressBar, questionNumber, returnBack, answerNo, answerYes, testNumber, testCounter, testResult, answers;

    progressBar = $('.test__progress-bar');
    questionNumber = $('.test__question-number');
    comeBack = $('.test__return');
    answerYes = $('#yes');
    answerNo = $('#no');
    testNumber = $('.test__question').length;
    testCounter = 1;
    testResult = 0;
    answers = [];

    initTests();
 
    answerYes.on('click', function() {
        testResult += 1;
        
        if (testCounter < testNumber) {
            makeStep();
        } else {
            showResults();
        }

        answers.push(true);
    });

    answerNo.on('click', function() {
        if (testCounter < testNumber) {
            makeStep();
        } else {
            showResults();
        }

        answers.push(false);
    });

    comeBack.on('click', function() {
        comeBackQuestion();
    });

    var makeStep = function() {
        testCounter++;

        questionNumber.html(testCounter);

        if (testCounter === testNumber) {
            progressBar.addClass('end');
        } else  if (testCounter === 2) {
            $('.test__return').css({'display': 'block'});
        }

        updateBtnText(testCounter);
        updateProgressBar(testNumber);
        nextQuestion(testCounter);
    }

    function updateProgressBar(testNumber) {
        if (testCounter === testNumber) {
            progressBar.addClass('end');
        }

        var progressAllWidth = $('.test__progress').width();
        var progressBarWidth = (progressAllWidth / testNumber) * testCounter;
        progressBar.width(progressBarWidth);
    } 

    function nextQuestion(testCounter) {
        $('#question-' + (testCounter - 1)).css({'display': 'none'});
        $('#question-' + testCounter).css({'display': 'block'});
    }

    function prevQuestion(testCounter) {
        $('#question-' + testCounter).css({'display': 'none'});
        $('#question-' + (testCounter - 1)).css({'display': 'block'});
    }

    function showResults() {
        var bills = $('#test-result');
        $('#test-content').css({'display': 'none'});

        if (testResult === 0 || testResult === 1) {
            bills.html('0-1 балл');
            $('#test-result-text').html('Вам сложно влиять на мужчин и получать от них желаемое. Вы не чувствуете себя расслабленной рядом с ними, держите дистанцию. Поэтому мужчины боятся подойти к вам или подарить подарок.  Вам нужно развивать природные качества: нежность, мягкость, женственность.')
        } else if (testResult === 2 || testResult === 3) {
            bills.html('2-3 балла');
            $('#test-result-text').html('У вас получается влиять на мужчин. Но иногда вы перебарщиваете с желанием все контролировать и манипулировать человеком. Есть множество способов, позволяющих влиять на своего избранника по-женски. И вы можете их успешно применять.');
        } else if (testResult === 4 || testResult === 5) {
            bills.html('4-5 балла');
            $('#test-result-text').html('Вы умеете влиять на мужчин, чувствуете их потребности и желания, готовы мотивировать их на поступки, поддерживать и благодарить. Хотели бы еще больше прокачать свои навыки? Освоить тонкости общения с противоположным полом и получать от мужчин еще больше внимания, подарков, любви?');
        }

        $('.test__final-content').css({'display': 'block'});
        $('.test__contact').css({'display': 'block'});
    }

    function comeBackQuestion() {
        if (testCounter >= 2) {
            prevQuestion(testCounter);  
            testCounter--;
            
            if (answers[testCounter - 1] === true) {
                testResult--; 
            } 
            
            if (testCounter === 1) {
                $('.test__return').css({'display': 'none'});
            }

            answers.splice(-1, 1);
            questionNumber.html(testCounter);
            updateProgressBar(testNumber);
            console.log(testCounter);
        }
    }

    function updateBtnText(testCounter) {
        if (testCounter === 2) {
            $('#yes-text').html('Часто');
            $('#no-text').html('Редко');
        } else if (testCounter === 3) {
            $('#yes-text').html('Да');
            $('#no-text').html('Не очень');
        } else {
            $('#no-text').html('Нет');
        }
    }

    function initTests() {
        updateProgressBar(testNumber);
        nextQuestion(testCounter);
    }

    if ($(window).width() > 768) {
        new WOW().init();
    }

    /* **********************************************************************************************************
    Popup 
    ********************************************************************************************************** */
    var exitPopup = $('.popup__exit');
    exitPopup.on('click', function() {
        $('.popup').removeClass('show');
        $('body').removeClass('popup-active');
    });

    var girlsInfoBtn = $('.girls__circle');
    girlsInfoBtn.on('click', function() {
        if ($(window).width() > 768) {
            var id = $(this).find('.girls__circle-info').attr('id');
            $('.girl-popup-' + id).addClass('show');
            $('body').addClass('popup-active');
        }
    });

    $('.main-popup__btn').on('click', function() {
        $('.main-popup__btn').removeClass('active');
        $(this).addClass('active');

        $('.main-popup__form').removeClass('active');
        var id = $(this).attr('id');
        $('.main-popup__wrapper').find('.' + id).addClass('active');
    });

    $('.prices__btn').on('click', function() {
        $('.main-popup').addClass('show');
        $('body').addClass('popup-active');
        $('.main-popup__btn').removeClass('active');
        $('.main-popup__btn:nth-child(1)').addClass('active'); 
        $('.main-popup__form').removeClass('active');
        $('.main-popup__form.standart').addClass('active');
    });

    $('.contact__link').on('click', function(e) {
        e.preventDefault();
        $('.question-popup').addClass('show');
        $('body').addClass('popup-active');
    });

    $('.shedule-link').on('click', function(e) {
        e.preventDefault(); 
        $('.shedule-popup').addClass('show');
        $('body').addClass('popup-active');
    });

    $('.author__btn').on('click', function(e) {
        e.preventDefault();
        $('.present-popup').addClass('show');
        $('body').addClass('popup-active');
    });

    $('.last__btn').on('click', function(e) {
        if ($(this).hasClass('podarok')) {
            e.preventDefault();
            $('.main-popup').addClass('show');
            $('body').addClass('popup-active');
        } 
    });

    /* **********************************************************************************************************
    Перекидывание элементов по DOM
    ********************************************************************************************************** */
    var block1 = $('#program-block-1');
    var block2 = $('#program-block-2');
    var block3 = $('#program-block-3');
    var block4 = $('#program-block-4');
    var block5 = $('#program-block-5');
    var doneBlocks = false;
    var doneBtn = false;
    var comeBackBtn = $('.header__thankyou-btn');
    var buyBtn = $('.author__btn');

    $(window).on('load', function() {
        appendElements();
    });
 
    appendElements();

    function appendElements() {
        if ($(window).width() < 1150 && doneBlocks === false) {
            block4.appendTo('.program__content:nth-child(2)');
            block1.appendTo('.program__content:nth-child(1)');
            block1.css({'order': '1'});
            block2.css({'order': '2'});
            block3.css({'order': '1'}); 
            block4.css({'order': '2'});
            block5.css({'order': '3'}); 
            doneBlocks = true;
        } else if ($(window).width() < 600 && doneBtn === false) {
            comeBackBtn.appendTo('.header__content');
            buyBtn.appendTo('.author__statistic');
            doneBtn = true;
        }
    }

    /* **********************************************************************************************************
    Аккордеоны
    ********************************************************************************************************** */
    var accordeon = $('.prices__content-accordeon');
    accordeon.on('click', function() {
        $(this).closest('.prices__item').find('.prices__content-list').slideToggle();
        $(this).toggleClass('active');
        
        if ($(this).hasClass('active')) {
            $(this).html('Свернуть описание');
        } else { 
            $(this).html('Что входит в тариф?');
        }
    });
});

// переключение отзывов попап
function nextComment(n) {
    if (n !== 0) {
        $('.girl-popup-' + (n - 1)).removeClass('show');
        $('.girl-popup-' + n).addClass('show');
    }
}

function prevComment(n) {
    if (n !== 0) {
        $('.girl-popup-' + (n + 1)).removeClass('show');
        $('.girl-popup-' + n).addClass('show');
    }
}