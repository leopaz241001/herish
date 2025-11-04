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
// --- Datepicker ---
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

        function closeMenu() {
            menu.removeClass('open')
            $('body').removeClass('scroll-locked')
            navItem.removeClass('open')
            subNav.slideUp()
        }

        $('.humburger-btn').on('click', function () {
            if (!menu.hasClass('open')) {
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
                if (e.target.value !== '') {
                    $('.modal-search .keyword').addClass('hidden')
                    $('.modal-search .result').removeClass('hidden')
                } else {
                    $('.modal-search .keyword').removeClass('hidden')
                    $('.modal-search .result').addClass('hidden')
                }
            }, 500);
        })
        
        $(".modal-search form").on("submit", function (e) {
            e.preventDefault();
            const search = $(".modal-search form input").val().trim();
            if (search) {
                window.location.href = `search-result.html?search=${encodeURIComponent(search)}`;
            }
        });

        $(".modal-search .keyword .button-main").on("click", function (e) {
            e.preventDefault();
            const search = $(this).text().trim();
            window.location.href = `search-result.html?search=${encodeURIComponent(search)}`;
        });
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
    var swiperProduct = new Swiper('.product-swiper', {
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
    var swiperProductTwo = new Swiper('.product-swiper-two', {
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
        setTimeout(function () {
            if ($('.modal-cookie').length > 0) {
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
                    setTimeout(function () {
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

    // Datepicker
    const handleDatepicker = function () {
        const $input = $('#dateInput');
        const $picker = $('#datepicker');
        const $days = $picker.find('.days');
        const $years = $picker.find('.years');
        const $month = $picker.find('.month');
        const $year = $picker.find('.year');
        const monthNames = [
            'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
            'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
        ];

        let selectedDate = new Date();
        let currentYear = selectedDate.getFullYear();
        let currentMonth = selectedDate.getMonth();

        function renderCalendar() {
            $month.text(monthNames[currentMonth]);
            $year.text(currentYear);

            const firstDay = new Date(currentYear, currentMonth, 1).getDay();
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

            $days.empty();
            for (let i = 0; i < firstDay; i++) $days.append('<span></span>');
            for (let d = 1; d <= daysInMonth; d++) {
                const active =
                    d === selectedDate.getDate() &&
                        currentMonth === selectedDate.getMonth() &&
                        currentYear === selectedDate.getFullYear()
                        ? 'active'
                        : '';
                $days.append(`<span class="${active}">${d}</span>`);
            }
        }

        function renderYears() {
            $years.empty();
            for (let y = 1900; y <= 2100; y++) {
                const active = y === currentYear ? 'active' : '';
                $years.append(`<span class="${active}">${y}</span>`);
            }
        }

        // Open / position picker
        $input.on('click', function (e) {
            e.stopPropagation(); // ngăn event lên document (đóng popup)
            renderCalendar();
            $picker.toggleClass('hidden');
            // position nếu cần
            // const offset = $(this).offset();
            // $picker.css({ top: offset.top + $(this).outerHeight(), left: offset.left });
        });

        // Prevent close when clicking inside picker
        $picker.on('click', function (e) {
            e.stopPropagation();
        });

        // Close when clicking outside
        $(document).on('click', function (e) {
            if (!$(e.target).closest('#datepicker, #dateInput').length) {
                $picker.addClass('hidden');
            }
        });

        // Switch to year view (use picker's scoped selector)
        $picker.find('.month-year').on('click', function () {
            $picker.find('.date-view').addClass('hidden');
            renderYears();
            $picker.find('.year-view').removeClass('hidden');
        });

        // --- IMPORTANT: bind delegated handlers ON $picker (NOT on document)
        // Click year (delegated on picker)
        $picker.on('click', '.years span', function () {
            currentYear = parseInt($(this).text(), 10);
            $picker.find('.year-view').addClass('hidden');
            $picker.find('.date-view').removeClass('hidden');
            renderCalendar();
        });

        // Prev / Next month
        $picker.find('.prev').on('click', function () {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        });

        $picker.find('.next').on('click', function () {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        });

        // Select date (delegated on picker)
        $picker.on('click', '.days span', function () {
            const txt = $(this).text().trim();
            if (!txt) return;
            const day = parseInt(txt, 10);
            selectedDate = new Date(currentYear, currentMonth, day);

            const yyyy = selectedDate.getFullYear();
            const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const dd = String(selectedDate.getDate()).padStart(2, '0');

            $input.val(`${dd}/${mm}/${yyyy}`);
            $picker.addClass('hidden');
        });

        // initial render
        renderCalendar();
    };

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
                    if (list[0].getBoundingClientRect().left + list.innerWidth() > window.innerWidth) {
                        list.addClass('open');
                        if (list[0].getBoundingClientRect().left + $(this).innerWidth() < list.innerWidth()) {
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
                let dataName = $(this).text();
                if (dataName) $(this).closest('.select-block').addClass('filtered').find('.selected').text(dataName)
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
            if (!$(this).hasClass('disabled')) {
                $(this).toggleClass('active');
            }
        });
    }

    // Control form input
    const controlFormInput = function () {
        $('.form-control-input .input-control').on('input', function () {
            $(this).closest('.form-control').removeClass('error')

            if ($(this).val() !== '') {
                $(this).closest('.form-control-input').find('.btn-control').removeClass('disabled')
            } else {
                $(this).closest('.form-control-input').find('.btn-control').addClass('disabled')
            }
        })
    }

    // Show hide password
    const handleShowPassword = function () {
        $('.form-password input').on('input', function () {
            if ($(this).val() !== '') {
                // ẩn button mắt và chuyển type input thành text mỗi lần value bằng rỗng
                $(this).closest('.form-password').find('.btn-show-password').removeClass('hidden active')
                $(this).attr('type', 'password')
            } else {
                $(this).closest('.form-password').find('.btn-show-password').addClass('hidden')
            }
        })

        $('.btn-show-password').on('click', function () {
            if (!$(this).hasClass('active')) {
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
            if ($(this).closest(".content-hide").hasClass("show")) {
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
        handleDatepicker()
        handleSelectBlock()
        handleToggleButton()
        controlFormInput()
        handleShowPassword()
        handleToastify()
        handleBackToTop()
        handleContentHide()
        $('#page-loader').fadeOut(500)
    });
})(window, window.jQuery);