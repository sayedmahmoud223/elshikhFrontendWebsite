$(document).ready(function () {


    $(document).ready(function () {
        const navbar = $('.sticky-navbar');

        // تغيير شكل navbar عند التمرير
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 50) {
                navbar.addClass('scrolled');
            } else {
                navbar.removeClass('scrolled');
            }
        });

        // زر فتح السلة
        $("#cart-button").click(function () {
            $("#cart-sidebar").addClass("open");
        });

        // استخراج اسم الصفحة الحالية
        let currentPage = window.location.pathname.split("/").pop();
        if (currentPage === "" || currentPage === "ecommerce-project") {
            currentPage = "index.html";
        }

        // تفعيل الرابط الحالي في navbar
        $(".navbar-nav .nav-link").each(function () {
            const linkPage = $(this).attr("href");
            if (linkPage === currentPage) {
                $(this).addClass("activenav");
            }
        });

        // أنيميشن الانتقال عند الضغط على الروابط
        $(".navbar-nav .nav-link").on("click", function (e) {
            const href = $(this).attr("href");

            if (href !== currentPage) {
                e.preventDefault();

                $(".navbar-nav .nav-link").removeClass("activenav");
                $(this).addClass("activenav");

                $("body").fadeOut(600, "swing", function () {
                    window.location.href = href;
                });
            }
        });
    });
    


    // تحميل الهيدر والتعامل مع روابط التنقل
    $("#navbar-placeholder").load("components/header.html", function () {
        const navbar = $('.sticky-navbar');
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > 50) {
                navbar.addClass('scrolled');
            } else {
                navbar.removeClass('scrolled');
            }
        });
        // زر فتح السلة
        $("#cart-button").click(function () {
            $("#cart-sidebar").addClass("open");
        });

        // استخراج اسم الصفحة الحالية
        let currentPage = window.location.pathname.split("/").pop();
        if (currentPage === "" || currentPage === "ecommerce-project") {
            currentPage = "index.html";
        }

        // تفعيل الرابط الحالي
        $(".navbar-nav .nav-link").each(function () {
            const linkPage = $(this).attr("href");
            if (linkPage === currentPage) {
                $(this).addClass("activenav");
            }
        });

        // أنميشن الانتقال عند الضغط على الروابط
        $(".navbar-nav .nav-link").on("click", function (e) {
            const href = $(this).attr("href");

            if (href !== currentPage) {
                e.preventDefault();

                $(".navbar-nav .nav-link").removeClass("activenav");
                $(this).addClass("activenav");

                $("body").fadeOut(600, "swing", function () {
                    window.location.href = href;
                });
            }
        });
    });

    // تحميل الفوتر
    $("#footer-placeholder").load("components/footer.html");

    // زر غلق السلة
    $(document).on("click", "#close-cart", function () {
        $("#cart-sidebar").removeClass("open");
    });

    // إغلاق السلة عند الضغط خارجها
    $(document).mouseup(function (e) {
        let sidebar = $("#cart-sidebar");
        if (!sidebar.is(e.target) && sidebar.has(e.target).length === 0) {
            sidebar.removeClass("open");
        }
    });

    function updateCartBadge() {
        let totalItems = 0;

        $("#cart-items .cart-item").each(function () {
            const qty = parseInt($(this).find(".quantity").text());
            totalItems += qty;
        });

        $("#cart-button .badge").text(totalItems);
    }

    // إضافة منتج للسلة
    $(document).on("click", ".add-to-cart", function () {
        const title = $(this).data("title");
        const price = $(this).data("price");
        const image = $(this).data("image");

        const existingItem = $(`#cart-items .cart-item[data-title="${title}"]`);

        if (existingItem.length > 0) {
            const qtySpan = existingItem.find(".quantity");
            let qty = parseInt(qtySpan.text());
            qty++;
            qtySpan.text(qty);
        } else {
            const cartItem = `
                <div class="cart-item d-flex justify-content-between align-items-center border-bottom pb-2 mb-2" data-title="${title}">
                    <div class="d-flex align-items-center gap-2">
                        <img src="${image}" alt="${title}" width="50" class="rounded" />
                        <div>
                            <p class="mb-0 small fw-bold">${title}</p>
                            <span class="small text-muted">${price} SR</span>
                            <div class="quantity-controls mt-1">
                                <button class="btn btn-sm btn-outline-secondary decrease-qty">-</button>
                                <span class="quantity">1</span>
                                <button class="btn btn-sm btn-outline-secondary increase-qty">+</button>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-danger remove-item">×</button>
                </div>
            `;
            const newItem = $(cartItem).css("display", "none").fadeIn(500);
            $("#cart-items").prepend(newItem);
            $(".empty-cart").remove();
        }

        // ✅ فتح السايد بار
        $("#cart-sidebar").addClass("open");

        // ✅ تحديث عدد المنتجات في الشارة (badge)
        updateCartBadge();
    });


    // زيادة الكمية
    $(document).on("click", ".increase-qty", function () {
        const qtySpan = $(this).siblings(".quantity");
        let qty = parseInt(qtySpan.text());
        qty++;
        qtySpan.text(qty);
        updateCartBadge();
    });

    // تقليل الكمية
    $(document).on("click", ".decrease-qty", function () {
        const qtySpan = $(this).siblings(".quantity");
        let qty = parseInt(qtySpan.text());
        if (qty > 1) {
            qty--;
            qtySpan.text(qty);
        }
        updateCartBadge();

    });

    // إزالة منتج من السلة
    $(document).on("click", ".remove-item", function () {
        $(this).closest(".cart-item").fadeOut(400, function () {
            $(this).remove();

            if ($("#cart-items .cart-item").length === 0) {
                $("#cart-items").html('<p class="text-muted empty-cart">السلة فارغة</p>');
            }
        });
        updateCartBadge();

    });

    // أنميشن عند تحميل الصفحة
    $("body").css("display", "none").fadeIn(600, "swing");
    // فلترة المنتجات
    function handleFilterChange(filter) {
        console.log("Filter selected:", filter);
    }

    // التحقق من نموذج "تواصل معنا"
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();

        const name = $.trim($('#name').val());
        const email = $.trim($('#email').val());
        const phone = $.trim($('#phone').val());
        const message = $.trim($('#message').val());

        if (name === '' || email === '' || phone === '' || message === '') {
            showAlert('من فضلك قم بملء جميع الحقول.', 'danger');
            return;
        }

        if (!validateEmail(email)) {
            showAlert('البريد الإلكتروني غير صحيح.', 'danger');
            return;
        }

        if (!validatePhone(phone)) {
            showAlert('رقم الهاتف غير صحيح. يجب أن يحتوي على 10 إلى 12 رقمًا فقط.', 'danger');
            return;
        }

        const formData = { name, email, phone, message };
        console.log('Form Data:', formData);
        showAlert('تم إرسال النموذج بنجاح 🎉', 'success');
        $('#contactForm')[0].reset();
    });

    // التحقق من البريد
    function validateEmail(email) {
        const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^\d{10,12}$/;
        return re.test(phone);
    }

    function showAlert(message, type) {
        $('#alertBox')
            .removeClass()
            .addClass(`alert alert-${type}`)
            .text(message)
            .removeClass('d-none');
    }

    // // نموذج تسجيل الدخول
    // $('#loginForm').on('submit', function (e) {
    //     e.preventDefault();

    //     const email = $('#email').val().trim();
    //     const alertBox = $('#loginAlert');

    //     if (email === '') {
    //         showAlertLogin('من فضلك أدخل البريد الإلكتروني.', 'danger');
    //         return;
    //     }

    //     if (!validateEmail(email)) {
    //         showAlertLogin('صيغة البريد الإلكتروني غير صحيحة.', 'danger');
    //         return;
    //     }

    //     showAlertLogin('تم إرسال الرمز بنجاح ✔️', 'success');
    //     console.log({ email });
    // });

    // function showAlertLogin(message, type) {
    //     $('#loginAlert')
    //         .removeClass('d-none alert-danger alert-success')
    //         .addClass('alert alert-' + type)
    //         .text(message);
    // }

    $('#loginForm').on('submit', function (e) {
        e.preventDefault();

        const email = $('#email').val().trim();
        const alertBox = $('#loginAlert');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // ✅ لو الإيميل فاضي
        if (email === '') {
            alertBox
                .removeClass('d-none')
                .removeClass('alert-success')
                .addClass('alert-danger')
                .text('من فضلك أدخل بريدك الإلكتروني');
            return;
        }

        // ✅ لو الإيميل مش صحيح
        if (!emailRegex.test(email)) {
            alertBox
                .removeClass('d-none')
                .removeClass('alert-success')
                .addClass('alert-danger')
                .text('من فضلك أدخل بريد إلكتروني صحيح');
            return;
        }

        // ✅ لو الإيميل صحيح
        alertBox.addClass('d-none');

        // انتقال للصفحة التالية
        window.location.href = '/loginVervicationCode.html';
    });

    $('#verifyForm').on('submit', function (e) {
        e.preventDefault();

        const code = $('#code').val().trim();
        const alertBox = $('#verifyAlert');

        if (!/^\d{6}$/.test(code)) {
            alertBox
                .removeClass('d-none')
                .removeClass('alert-success')
                .addClass('alert-danger')
                .text('من فضلك أدخل الكود المكوّن من 6 أرقام فقط');
            return;
        }

        // ✅ الكود صحيح
        alertBox.addClass('d-none');

        // ممكن تحط هنا أي عملية تحقق أو نقل للصفحة التالية
        alert('✅ تم التحقق من الكود بنجاح!');
    });


    //animation
    $(document).ready(function () {
        function revealOnScroll() {
            $('.reveal').each(function () {
                const windowHeight = $(window).height();
                const elementTop = $(this).offset().top;
                const scrollTop = $(window).scrollTop();

                if (elementTop < scrollTop + windowHeight - 100) {
                    $(this).addClass('active');
                }
            });
        }

        revealOnScroll(); // تشغيل وقت التحميل

        $(window).on('scroll', function () {
            revealOnScroll();
        });
    });

});
