//------------ Table of Contents -----------------

// Section
// --- Header ----
// ------ Add fixed header ------
// ------ Open menu mobile ------
// ------ Show result search when input typing ------
// --- Swiper ----
// ------ List product swiper ------
// ------ List testimonials ------
// --- Services ----
// ------ Active menu tab Feature services ------
// ------ List thumb images ------
// ------ List testimonials active ------
// --- FAQs ----
// --- Modal ----
// ------ Open popup ------
// ------ Close popup ------

// Components
// --- Select ---
// --- Toggle button ---
// --- Control form input ---
// --- Show hide password ---

// Animation
// --- Toastify ---
// --- Scroll reveal ---


; (function (win, $) {
    // Open menu mobile
    const handleOpenHeaderMobile = function () {
        const menu = $('.menu-mobile')
        const navItem = $('.nav-mobile .nav-item')
        const subNav = $('.sub-nav-mobile')

        function closeMenu () {
            menu.removeClass('open')
            $('body').removeClass('scroll-locked')
            navItem.removeClass('open')
            subNav.slideUp()
        }

        $('.humburger-btn').on('click', function () {
            if(!menu.hasClass('open')) {
                menu.toggleClass('open')
                $('body').addClass('scroll-locked')
            } else {
                closeMenu()
            }
        })

        $(window).on('click', function (e) {
            if (!$(e.target).closest('.menu-mobile').length && !$(e.target).closest('.humburger-btn').length) {
                closeMenu()
            }
        })

        $('.menu-mobile-close').on('click', closeMenu)

        navItem.on('click', function () {
            isOpen = $(this).hasClass('open')
            subNav.slideUp()
            navItem.removeClass('open')

            if (!isOpen) {
                $(this).addClass('open')
                $(this).find('.sub-nav-mobile').slideDown()
            }
        });
    }

    // Show result search when input typing
    const showResultWhenTyping = function () {
        $('.modal-search input').on('input', function (e) {
            setTimeout(function () {
                if(e.target.value !== '') {
                    $('.modal-search .keyword').addClass('hidden')
                    $('.modal-search .result').removeClass('hidden')
                } else {
                    $('.modal-search .keyword').removeClass('hidden')
                    $('.modal-search .result').addClass('hidden')
                }
            }, 500);
        })
    }

    // List slider swiper
    var swiperSlider = new Swiper('.slider-swiper', {
        pagination: {
            el: ".swiper-pagination",
        },
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        effect: 'fade',
        autoplay: true,
        speed: 500,
        delay: 3000,
        on: {
            slideChange: function () {
                let index = this.activeIndex
                $('.slider-content').find('.animate').removeClass('animate-active')
                $('.slider-content').eq(index).find('.text-head1').addClass('animate animate-active')
                $('.slider-content').eq(index).find('.text-body2').addClass('animate animate-active')
                $('.slider-content').eq(index).find('.group-btn').addClass('animate animate-active')
            }
        }
    });

    // List product swiper
    var swiperBestseller = new Swiper('.product-swiper', {
        navigation: {
            prevEl: '.custom-button-prev',
            nextEl: '.custom-button-next',
        },
        slidesPerView: 2,
        spaceBetween: 16,
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1280: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
        },
    });

    // List product swiper section 2 in page
    var swiperBestseller = new Swiper('.product-swiper-two', {
        navigation: {
            prevEl: '.custom-button-prev-two',
            nextEl: '.custom-button-next-two',
        },
        slidesPerView: 2,
        spaceBetween: 16,
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1280: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
        },
    });

    // List testimonials
    var swiperListTestimonials = new Swiper('.testimonials-swiper', {
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        allowTouchMove: false,
        speed: 6000,
        slidesPerView: 1,
        spaceBetween: 16,
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
            1440: {
                slidesPerView: 4,
                spaceBetween: 24,
            },
            1600: {
                slidesPerView: 5,
                spaceBetween: 24,
            },
            1800: {
                slidesPerView: 6,
                spaceBetween: 24,
            },
            2300: {
                slidesPerView: 7,
                spaceBetween: 24,
            },
        },
    });

    // Active menu tab Feature services
    const handleActiveMenu = function () {
        $('.tab-btn').each(function () {
            if ($(this).hasClass('active')) {
                let indicator = $(this).closest('.menu-tab').find('.indicator');
                if (indicator.length > 0) {
                    indicator.css('width', $(this)[0].getBoundingClientRect().width + 'px')
                    indicator.css('left', $(this)[0].getBoundingClientRect().left - $(this)[0].closest('.menu').getBoundingClientRect().left + 'px')
                }
            }
        })

        function active(button) {
            // Find parent section include menu, tabs
            const $section = button.closest('section, .list');

            // active menu
            $section.find('.tab-btn').removeClass('active');
            button.addClass('active');

            // change indicator
            $('.tab-btn').each(function () {
                if (button.hasClass('active')) {
                    let indicator = button.closest('.menu-tab').find('.indicator');
                    if (indicator.length > 0) {
                        indicator.css('width', button[0].getBoundingClientRect().width + 'px')
                        indicator.css('left', button[0].getBoundingClientRect().left - button[0].closest('.menu').getBoundingClientRect().left + 'px')
                    }
                }
            })

            // change aria-selected menu
            $section.find('.tab-btn').attr('aria-selected', 'false')
            button.attr('aria-selected', 'true')

            // active tabs
            const $ariaControl = '#' + button.attr('aria-controls');
            $($ariaControl).addClass('active').siblings().removeClass('active');

            // change aria-hidden tabs
            $section.find('.tab-list').attr('aria-hidden', 'true');
            $($ariaControl).attr('aria-hidden', 'false');
        }

        $('.tab-btn').on('click', function () {
            active($(this))
        })

        $('.tab-btn').each(function () {
            if ($(this).hasClass('is-hover')) {
                $(this).on('mouseenter', function () {
                    active($(this))
                })
            }
        })
    }

    // List thumb images
    var swiperListServiceDetail = new Swiper('.swiper-list-images', {
        loop: true,
        spaceBetween: 8,
        slidesPerView: 4,
        watchSlidesProgress: true,
        breakpoints: {
            640: {
                slidesPerView: 4,
                spaceBetween: 12,
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 12,
            },
        },
    });

    var swiperThumbServiceDetail = new Swiper('.swiper-thumb-images', {
        loop: true,
        spaceBetween: 10,
        thumbs: {
            swiper: swiperListServiceDetail,
        },
    });

    // List testimonials active
    const handleActiveAvatarTestimonial = function (swiper) {
        const currentSlideIndex = swiper.activeIndex;
        $('.testimonials-avatar').each(function () {
            if (Number($(this).attr('data-item')) === (currentSlideIndex + 1)) {
                $(this).fadeIn(600);
            } else {
                $(this).fadeOut(300);
            }
        })
    }

    var swiperTestimonialsFilter = new Swiper('.swiper-testimonials-filter', {
        navigation: {
            prevEl: '.custom-button-prev',
            nextEl: '.custom-button-next',
        },
        slidesPerView: 1,
        spaceBetween: 24,
        on: {
            init: function () {
                handleActiveAvatarTestimonial(this)
            },
            slideChange: function () {
                handleActiveAvatarTestimonial(this)
            }
        }
    });

    // FAQs
    const handleFaq = function () {
        $('.faq-item .heading, .toggle-item .heading').on('click', function () {
            $(this).closest('.faq-item, .toggle-item').toggleClass('active').siblings('.faq-item, .toggle-item').removeClass('active');
            $(this).closest('.faq-item, .toggle-item').find('.answer, .toggle-menu').slideToggle(400)
            $(this).closest('.faq-item, .toggle-item').siblings('.faq-item, .toggle-item').find('.answer, .toggle-menu').slideUp(400);
        })
    }

    // Open popup
    const handleOpenPopup = function () {
        setTimeout(() => {
            if($('.modal-cookie').length > 0) {
                $('.modal-cookie').addClass('open')
                $('body').addClass('scroll-locked')
            }
        }, 1000);

        const btnOpenPopup = $('.btn-open-popup')

        btnOpenPopup.on('click', function (e) {
            e.preventDefault()

            const popupType = $(this).data('type')
            $('.modal-item').each(function (e) {
                if ($(this).data('type') === popupType) {
                    $(this).addClass('open')
                    setTimeout(() => {
                        $('body').addClass('scroll-locked')
                    }, 50);
                }
            })
        })

        $('.modal-item').on('click', function (e) {
            e.stopPropagation()
        })
    }

    // Close popup
    const handleClosePopup = function () {
        const modal = $('.modal')

        modal.on('click', function () {
            modal.find('>.open').removeClass('open')
            $('body').removeClass('scroll-locked')
        })

        $('.btn-close-popup').on('click', function () {
            modal.find('>.open').removeClass('open')
            $('body').removeClass('scroll-locked')
        })
    }

    // Select
    const handleSelectBlock = function () {
        const selectBlock = $('.select-block');
        const menu = $('.select-block .menu');
        const optionItems = $('.select-block .menu li');

        if (selectBlock.length > 0) {
            selectBlock.on('click', function () {
                let list = $(this).find('.menu');
                let isOpen = list.hasClass('open');

                $('.menu').removeClass('open left right center');
                if (!isOpen) {
                    if(list[0].getBoundingClientRect().left + list.innerWidth() > window.innerWidth) {
                        list.addClass('open');
                        if(list[0].getBoundingClientRect().left + $(this).innerWidth() < list.innerWidth()) {
                            list.addClass('center')
                        } else {
                            list.addClass('right')
                        }
                    } else {
                        list.addClass('open left');
                    }
                }
            })

            optionItems.on('click', function (e) {
                e.stopPropagation()
                menu.removeClass('open');
                let dataItem = $(this).attr('data-item')
                if(dataItem) $(this).closest('.select-block').addClass('filtered').find('.selected').text(dataItem)
            })

            $(window).on('click', function (e) {
                if (!$(e.target).closest('.select-block').length) {
                    menu.removeClass('open');
                }
            })
        }
    }

    // Toggle button
    const handleToggleButton = function () {
        $('.btn-toggle').on('click', function () {
            if(!$(this).hasClass('disabled')) {
                $(this).toggleClass('active');
            }
        });
    }

    // Control form input
    const controlFormInput = function () {
        $('.form-control-input .input-control').on('input', function () {
            $(this).closest('.form-control').removeClass('error')

            if($(this).val() !== '') {
                $(this).closest('.form-control-input').find('.btn-control').removeClass('disabled')
            } else {
                $(this).closest('.form-control-input').find('.btn-control').addClass('disabled')
            }
        })
    }

    // Show hide password
    const handleShowPassword = function () {
        $('.form-password input').on('input', function () {
            if($(this).val() !== '') {
                // ẩn button mắt và chuyển type input thành text mỗi lần value bằng rỗng
                $(this).closest('.form-password').find('.btn-show-password').removeClass('hidden active')
                $(this).attr('type', 'password')
            } else {
                $(this).closest('.form-password').find('.btn-show-password').addClass('hidden')
            }
        })

        $('.btn-show-password').on('click', function () {
            if(!$(this).hasClass('active')) {
                $(this).closest('.form-password').find('input').attr('type', 'password')
            } else {
                $(this).closest('.form-password').find('input').attr('type', 'text')
            }
        });
    }

    // Toastify
    const handleToastify = function () {
        $('.toastify').each(function () {
            const target = this;

            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.attributeName === 'class') {
                        if ($(target).hasClass('active')) {
                            setTimeout(() => $(target).removeClass('active'), 5000);
                        }
                    }
                });
            });

            observer.observe(target, { attributes: true });
        });


        $('.toastify-close-btn').on('click', function () {
            $('.toastify').removeClass('active')
        })
    }

    // Button back to top
    const handleBackToTop = function () {
        const $btn = $(".button-top");
        const $circle = $(".button-top .circle");

        $(window).on("scroll", function () {
            const scrollTop = $(window).scrollTop();
            const docHeight = $(document).height() - $(window).height() - 10;
            const progress = Math.min(scrollTop / docHeight, 1) * 100;

            // update conic-gradient theo % cuộn
            $circle.css("background", `conic-gradient(#6a5acd ${progress}%, #eee ${progress}%)`);

            // hiện/ẩn button
            if (scrollTop > 100) {
                $btn.addClass('show')
            } else {
                $btn.removeClass('show')
            }
        });

        // click để scroll top
        $btn.on("click", function () {
            $("html, body").animate({ scrollTop: 0 }, 500);
        });
    }

    // Button back to top
    const handleContentHide = function () {
        $(".btn-view-more").on("click", function () {
            if($(this).closest(".content-hide").hasClass("show")) {
                $(this).closest(".content-hide").removeClass("show")
                $(this).text("... Xem thêm")
            } else {
                $(this).closest(".content-hide").addClass("show")
                $(this).text("Ẩn bớt")
            }
        });
    }

    // Scroll reveal
    const handleReveal = function () {
        var reveal = $('.animate');

        reveal.each(function (index, element) {
            const windowHeight = window.innerHeight;
            const revealTop = element.getBoundingClientRect().top;
            const revealpoint = 300 * 100 / 1920;

            if (revealTop < windowHeight - revealpoint) {
                $(element).addClass('animate-active');
            }
        });
    }

    $(win).scroll(function () {
        handleReveal()
    }).scroll();

    $(win).on('load', function () {
        handleOpenHeaderMobile()
        showResultWhenTyping()
        handleActiveMenu()
        handleFaq()
        handleClosePopup()
        handleOpenPopup()
        handleSelectBlock()
        handleToggleButton()
        controlFormInput()
        handleShowPassword()
        handleToastify()
        handleBackToTop()
        handleContentHide()
    });
})(window, window.jQuery);