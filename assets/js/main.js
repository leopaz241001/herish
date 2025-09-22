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
// ------ Sidebar ------
// ------ Add filter to screen when click ------
// ------ Price range ------
// ------ Age range ------
// ------ Radius range ------
// ------ Handle number delivery popup Apply ------

// Components
// --- Select ---
// --- Active Wishlist icon ---
// --- Toggle button ---
// --- Control form input ---
// --- Show hide password ---

// Animation
// --- Toastify ---
// --- Scroll reveal ---


; (function (win, $) {
    // Header 
    // Add fixed header
    const handleFixedHeader = function () {
        const header = $('.header')

        // if (window.scrollY > 200) {
        //     header.addClass('fixed');
        //     $('.scroll-to-top-btn').addClass('active');
        // } else {
        //     header.removeClass('fixed');
        //     $('.scroll-to-top-btn').removeClass('active');
        // }
    }

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
        const btnOpenPopup = $('.btn-open-popup')

        btnOpenPopup.on('click', function (e) {
            e.preventDefault()

            const popupType = $(this).data('type')
            $('.modal-item').each(function (e) {
                if ($(this).data('type') === popupType) {
                    $(this).addClass('open')
                    $('body').addClass('scroll-locked')
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

    // Sidebar
    const handleOpenSidebar = function () {
        const sidebar = $('.sidebar')

        $('.filter-btn').on('click', function () {
            sidebar.toggleClass('open')
            $('body').addClass('scroll-locked')
        })

        sidebar.on('click', function (e) {
            e.stopPropagation()
        })
    }

    // Add filter to screen when click
    const handleAddFilter = function () {
        const optionItems = $('.select-block .list-option li');
        const checkboxItems = $('.filter-section .form-checkbox .checkbox');

        optionItems.on('click', function () {
            let dataItem = $(this).attr('data-item');
            const filterSection = $(this).closest('.filter-section');

            if (filterSection.length > 0) {
                const filterType = filterSection.attr('class').split(' ')[1];

                // Check and remove old items in $('.list-filtered .list') for current filter-section
                $(`.list-filtered .list .selected-item[data-type='${filterType}']`).remove();

                // Create new item and add to $('.list-filtered .list')
                const selectedItem = `
                    <button class='selected-item inline-flex items-center gap-1 py-1 px-2 border border-line rounded-full capitalize duration-300 hover:border-black' data-type='${filterType}'>
                        <span class='ph ph-x text-sm'></span>
                        <span class='caption1'>${dataItem}</span>
                    </button>
                `

                // Add item to $('.list-filtered .list')
                $('.list-filtered .list').append(selectedItem)

                handleOpenListFiltered()
            }
        })

        checkboxItems.change(function () {
            var selectedId = $(this).attr('id');
            var selectedLabel = $(this).data('label');

            if ($(this).is(':checked')) {
                // Create new item and add to $('.list-filtered .list')
                const selectedItem = `
                    <button class='selected-item inline-flex items-center gap-1 py-1 px-2 border border-line rounded-full capitalize duration-300 hover:border-black' data-id='${selectedId}'>
                        <span class='ph ph-x text-sm'></span>
                        <span class='caption1'>${selectedLabel}</span>
                    </button>
                `

                // Add item to $('.list-filtered .list')
                $('.list-filtered .list').append(selectedItem)
            } else {
                // Remove selected item
                $('.list-filtered .list').find(`.selected-item[data-id='${selectedId}']`).remove();
            }

            handleOpenListFiltered()
        })

        // Remove item
        $(document).on('click', '.selected-item', function () {
            $(this).remove();

            // checkbox
            var itemId = $(this).data('id');
            $('#' + itemId).prop('checked', false);

            handleOpenListFiltered()
        });

        // Remove all item
        $(document).on('click', '.clear-all-btn', function () {
            $('.list-filtered .list').text('');
            $('.form-checkbox .checkbox').prop('checked', false);
            handleOpenListFiltered()
        });

        // Toggle list-filtered
        const handleOpenListFiltered = function () {
            if ($('.list-filtered .list .selected-item').length < 1) {
                $('.list-filtered').removeClass('open')
            } else {
                $('.list-filtered').addClass('open')
            }
        }
    }

    // Price range
    const handlePriceRange = function () {
        const rangeInput = $('.filter-price .range-input .input')
        const progress = $('.filter-price .tow-bar-block .progress')
        const minPrice = $('.filter-price .price-min input')
        const maxPrice = $('.filter-price .price-max input')
        let priceGap = 200

        rangeInput.on('input', function () {
            let minValue = parseInt(rangeInput.eq(0).val())
            let maxValue = parseInt(rangeInput.eq(1).val())

            if (maxValue - minValue <= priceGap) {
                if ($(this).hasClass('range-min')) {
                    rangeInput.eq(0).val(maxValue - priceGap)
                    minValue = maxValue - priceGap
                } else {
                    rangeInput.eq(1).val(minValue + priceGap)
                    maxValue = minValue + priceGap
                }
            } else {
                progress.css({
                    'left': (minValue / rangeInput.eq(0).attr('max')) * 100 + '%',
                    'right': 100 - (maxValue / rangeInput.eq(1).attr('max')) * 100 + '%'
                });
            }

            minPrice.val(minValue)
            maxPrice.val(maxValue)
        })

        minPrice.on('change', function () {
            let maxValue = parseInt(rangeInput.eq(1).val())

            if ($(this).val() < 0) {
                $(this).val(0)
                rangeInput.eq(0).val(0)
                progress.css({ 'left': '0%' });
            } else if ($(this).val() < maxValue - priceGap) {
                rangeInput.eq(0).val($(this).val())
                progress.css({ 'left': ($(this).val() / rangeInput.eq(0).attr('max')) * 100 + '%' });
            } else if ($(this).val() >= maxValue - priceGap) {
                $(this).val(maxValue - priceGap)
                rangeInput.eq(0).val(maxValue - priceGap)
                progress.css({ 'left': ((maxValue - priceGap) / rangeInput.eq(0).attr('max')) * 100 + '%' });
            }
        })

        minPrice.on('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault()
                maxPrice.focus()
            }
        })

        maxPrice.on('change', function () {
            let minValue = parseInt(rangeInput.eq(0).val())

            if (parseInt($(this).val()) > rangeInput.eq(1).attr('max')) {
                $(this).val(rangeInput.eq(1).attr('max'))
                rangeInput.eq(1).val(rangeInput.eq(1).attr('max'))
                progress.css({ 'right': '0%' });
            } else if (parseInt($(this).val()) > minValue + priceGap && parseInt($(this).val()) <= rangeInput.eq(1).attr('max')) {
                rangeInput.eq(1).val($(this).val())
                progress.css({ 'right': 100 - ($(this).val() / rangeInput.eq(1).attr('max')) * 100 + '%' });
            } else if (parseInt($(this).val()) <= minValue + priceGap) {
                $(this).val(minValue + priceGap)
                rangeInput.eq(1).val(minValue + priceGap)
                progress.css({ 'right': 100 - ((minValue + priceGap) / rangeInput.eq(1).attr('max')) * 100 + '%' });
            }
        })

        maxPrice.on('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault()
                $(this).blur()
            }
        })
    }

    // Age range
    const handleAgeRange = function () {
        const rangeInput = $('.filter-age .range-input .input')
        const progress = $('.filter-age .tow-bar-block .progress')
        const minAge = $('.filter-age .age-min')
        const maxAge = $('.filter-age .age-max')
        let ageGap = 5

        rangeInput.on('input', function () {
            let minValue = parseInt(rangeInput.eq(0).val())
            let maxValue = parseInt(rangeInput.eq(1).val())

            if (maxValue - minValue <= ageGap) {
                if ($(this).hasClass('range-min')) {
                    rangeInput.eq(0).val(maxValue - ageGap)
                    minValue = maxValue - ageGap
                } else {
                    rangeInput.eq(1).val(minValue + ageGap)
                    maxValue = minValue + ageGap
                }
            } else {
                progress.css({
                    'left': (minValue / rangeInput.eq(0).attr('max')) * 100 + '%',
                    'right': 100 - (maxValue / rangeInput.eq(1).attr('max')) * 100 + '%'
                });
            }

            minAge.text(minValue)
            maxAge.text(maxValue)
        })
    }

    // Radius range
    const handleRadius = function () {
        const rangeInput = $('.filter-radius .range-input .input')
        const progress = $('.filter-radius .tow-bar-block .progress')

        rangeInput.on('input', function () {
            let radiusValue = parseInt(rangeInput.val());
            progress.css({ 'right': 100 - (radiusValue / rangeInput.attr('max')) * 100 + '%' });
            $('.filter-radius .radius').text(radiusValue + 'km');
        })
    }

    // Handle number delivery popup Apply
    const handleNumberDeliveryPopupApply = function () {
        $('.delivery .minus-btn').on('click', function (e) {
            e.preventDefault()
            let currentValue = parseInt($('.delivery input').val())
            $('.delivery input').val(currentValue - 1)

            if (parseInt($('.delivery input').val()) < 2) {
                $(this).addClass('disabled')
            }
        })

        $('.delivery .plus-btn').on('click', function (e) {
            e.preventDefault()
            let currentValue = parseInt($('.delivery input').val())
            $('.delivery input').val(currentValue + 1)

            if (parseInt($('.delivery input').val()) > 1) {
                $('.delivery .minus-btn').removeClass('disabled')
            }
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
                if(dataItem) $(this).closest('.select-block').find('.selected').text(dataItem)
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

    // Rate
    const handleRate = function () {
        var selectedRating = 0;

        // Handle mouse enter (hover) event
        $('.user-rating .star').on('mouseenter', function () {
            var rating = $(this).data('value');
            highlightStars(rating);
        });

        // Handle mouse leave event
        $('.user-rating .list-rate').on('mouseleave', function () {
            highlightStars(selectedRating);
        });

        // Handle click event
        $('.user-rating .star').on('click', function () {
            selectedRating = $(this).data('value');
            highlightStars(selectedRating);
        });

        // Function to highlight stars
        function highlightStars(rating) {
            $('.user-rating .star').each(function () {
                var starValue = $(this).data('value');
                if (starValue <= rating) {
                    $(this).css('color', 'var(--yellow)');
                } else {
                    $(this).css('color', 'var(--line)');
                }
            });
        }

        // Handle form submission
        $('#form-review .form').on('submit', function (e) {
            if (selectedRating === 0) {
                e.preventDefault(); // Prevent form submission
                alert('Please select your rating before submit the comment.');
            } else {
                $('#form-review .form').append(`<input type='hidden' name='rating' value='${selectedRating}'>`);
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
        handleFixedHeader()
        handleReveal()
    }).scroll();

    $(win).on('load', function () {
        handleOpenHeaderMobile()
        showResultWhenTyping()
        handleActiveMenu()
        handleFaq()
        handleClosePopup()
        handleOpenPopup()
        handleOpenSidebar()
        handleAddFilter()
        handlePriceRange()
        handleAgeRange()
        handleRadius()
        handleNumberDeliveryPopupApply()
        handleSelectBlock()
        handleToggleButton()
        controlFormInput()
        handleShowPassword()
        handleRate()
        handleToastify()
    });
})(window, window.jQuery);