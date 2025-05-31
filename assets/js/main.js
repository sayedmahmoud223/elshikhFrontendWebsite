// $(document).ready(function () {
//     // ... (Your existing code remains unchanged until the favorites section) ...

//     // تحميل الهيدر والتعامل مع روابط التنقل
//     $("#navbar-placeholder").load("components/header.html", function () {
//         const navbar = $('.sticky-navbar');
//         $(window).on('scroll', function () {
//             if ($(window).scrollTop() > 50) {
//                 navbar.addClass('scrolled');
//             } else {
//                 navbar.removeClass('scrolled');
//             }
//         });
//         // زر فتح السلة
//         $("#cart-button").click(function () {
//             $("#cart-sidebar").addClass("open");
//         });

//         // استخراج اسم الصفحة الحالية
//         let currentPage = window.location.pathname.split("/").pop();
//         if (currentPage === "" || currentPage === "ecommerce-project") {
//             currentPage = "index.html";
//         }

//         // تفعيل الرابط الحالي
//         $(".navbar-nav .nav-link").each(function () {
//             const linkPage = $(this).attr("href");
//             if (linkPage === currentPage) {
//                 $(this).addClass("activenav");
//             }
//         });

//         // أنميشن الانتقال عند الضغط على الروابط
//         $(".navbar-nav .nav-link").on("click", function (e) {
//             const href = $(this).attr("href");

//             if (href !== currentPage) {
//                 e.preventDefault();

//                 $(".navbar-nav .nav-link").removeClass("activenav");
//                 $(this).addClass("activenav");

//                 $("body").fadeOut(600, "swing", function () {
//                     window.location.href = href;
//                 });
//             }
//         });
//     });

//     // تحميل الفوتر
//     $("#footer-placeholder").load("components/footer.html");

//     // زر غلق السلة
//     $(document).on("click", "#close-cart", function () {
//         $("#cart-sidebar").removeClass("open");
//     });

//     // إغلاق السلة عند الضغط خارجها
//     $(document).mouseup(function (e) {
//         let sidebar = $("#cart-sidebar");
//         if (!sidebar.is(e.target) && sidebar.has(e.target).length === 0) {
//             sidebar.removeClass("open");
//         }
//     });

//     function updateCartBadge() {
//         let totalItems = 0;

//         $("#cart-items .cart-item").each(function () {
//             const qty = parseInt($(this).find(".quantity").text());
//             totalItems += qty;
//         });

//         $("#cart-button .badge").text(totalItems);
//     }

//     // إضافة منتج للسلة
//     $(document).on("click", ".add-to-cart", function () {
//         const title = $(this).data("title");
//         const price = $(this).data("price");
//         const image = $(this).data("image");

//         const existingItem = $(`#cart-items .cart-item[data-title="${title}"]`);

//         if (existingItem.length > 0) {
//             const qtySpan = existingItem.find(".quantity");
//             let qty = parseInt(qtySpan.text());
//             qty++;
//             qtySpan.text(qty);
//         } else {
//             const cartItem = `
//                 <div class="cart-item d-flex justify-content-between align-items-center border-bottom pb-2 mb-2" data-title="${title}">
//                     <div class="d-flex align-items-center gap-2">
//                         <img src="${image}" alt="${title}" width="50" class="rounded" />
//                         <div>
//                             <p class="mb-0 small fw-bold">${title}</p>
//                             <span class="small text-muted">${price} SR</span>
//                             <div class="quantity-controls mt-1">
//                                 <button class="btn btn-sm btn-outline-secondary decrease-qty">-</button>
//                                 <span class="quantity">1</span>
//                                 <button class="btn btn-sm btn-outline-secondary increase-qty">+</button>
//                             </div>
//                         </div>
//                     </div>
//                     <button class="btn btn-sm btn-danger remove-item">×</button>
//                 </div>
//             `;
//             const newItem = $(cartItem).css("display", "none").fadeIn(500);
//             $("#cart-items").prepend(newItem);
//             $(".empty-cart").remove();
//         }

//         // فتح السايد بار
//         $("#cart-sidebar").addClass("open");

//         // تحديث عدد المنتجات في الشارة
//         updateCartBadge();
//     });

//     // زيادة الكمية
//     $(document).on("click", ".increase-qty", function () {
//         const qtySpan = $(this).siblings(".quantity");
//         let qty = parseInt(qtySpan.text());
//         qty++;
//         qtySpan.text(qty);
//         updateCartBadge();
//     });

//     // تقليل الكمية
//     $(document).on("click", ".decrease-qty", function () {
//         const qtySpan = $(this).siblings(".quantity");
//         let qty = parseInt(qtySpan.text());
//         if (qty > 1) {
//             qty--;
//             qtySpan.text(qty);
//         }
//         updateCartBadge();
//     });

//     // إزالة منتج من السلة
//     $(document).on("click", ".remove-item", function () {
//         $(this).closest(".cart-item").fadeOut(400, function () {
//             $(this).remove();

//             if ($("#cart-items .cart-item").length === 0) {
//                 $("#cart-items").html('<p class="text-muted empty-cart">السلة فارغة</p>');
//             }
//             updateCartBadge();
//         });
//     });

//     // فلترة المنتجات
//     function handleFilterChange(filter) {
//         console.log("Filter selected:", filter);
//     }

//     // التحقق من نموذج "تواصل معنا"
//     $('#contactForm').on('submit', function (e) {
//         e.preventDefault();

//         const name = $.trim($('#name').val());
//         const email = $.trim($('#email').val());
//         const phone = $.trim($('#phone').val());
//         const message = $.trim($('#message').val());

//         if (name === '' || email === '' || phone === '' || message === '') {
//             showAlert('من فضلك قم بملء جميع الحقول.', 'danger');
//             return;
//         }

//         if (!validateEmail(email)) {
//             showAlert('البريد الإلكتروني غير صحيح.', 'danger');
//             return;
//         }

//         if (!validatePhone(phone)) {
//             showAlert('رقم الهاتف غير صحيح. يجب أن يحتوي على 10 إلى 12 رقمًا فقط.', 'danger');
//             return;
//         }

//         const formData = { name, email, phone, message };
//         console.log('Form Data:', formData);
//         showAlert('تم إرسال النموذج بنجاح 🎉', 'success');
//         $('#contactForm')[0].reset();
//     });

//     // التحقق من البريد
//     function validateEmail(email) {
//         const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
//         return re.test(email);
//     }

//     function validatePhone(phone) {
//         const re = /^\d{10,12}$/;
//         return re.test(phone);
//     }

//     function showAlert(message, type) {
//         $('#alertBox')
//             .removeClass()
//             .addClass(`alert alert-${type}`)
//             .text(message)
//             .removeClass('d-none');
//     }

//     // Handle Login Form
//     $('#loginForm').on('submit', function (e) {
//         e.preventDefault();

//         // Clear previous errors
//         $('#loginForm .error').remove();

//         let isValid = true;

//         // Email Validation
//         const email = $('#loginEmail').val().trim();
//         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!email) {
//             $('#loginEmail').after('<div class="error text-danger mt-1">البريد الإلكتروني مطلوب</div>');
//             isValid = false;
//         } else if (!emailPattern.test(email)) {
//             $('#loginEmail').after('<div class="error text-danger mt-1">صيغة البريد غير صحيحة</div>');
//             isValid = false;
//         }

//         // Password Validation
//         const password = $('#loginPassword').val().trim();
//         if (!password) {
//             $('#loginPassword').after('<div class="error text-danger mt-1">كلمة المرور مطلوبة</div>');
//             isValid = false;
//         } else if (password.length < 6) {
//             $('#loginPassword').after('<div class="error text-danger mt-1">كلمة المرور يجب أن تكون 6 أحرف على الأقل</div>');
//             isValid = false;
//         }

//         // Submit if valid
//         if (isValid) {
//             alert("تم التحقق بنجاح ✅");
//         }
//     });

//     // Handle Register Form
//     $('#registerForm').on('submit', function (e) {
//         e.preventDefault();

//         // Clear previous errors
//         $('#registerForm .error').remove();

//         let isValid = true;

//         // Name
//         const name = $('#registerName').val().trim();
//         if (!name) {
//             $('#registerName').after('<div class="error text-danger mt-1">الاسم مطلوب</div>');
//             isValid = false;
//         }

//         // Email
//         const email = $('#registerEmail').val().trim();
//         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!email) {
//             $('#registerEmail').after('<div class="error text-danger mt-1">البريد الإلكتروني مطلوب</div>');
//             isValid = false;
//         } else if (!emailPattern.test(email)) {
//             $('#registerEmail').after('<div class="error text-danger mt-1">صيغة البريد غير صحيحة</div>');
//             isValid = false;
//         }

//         // Password
//         const password = $('#registerPassword').val().trim();
//         if (!password) {
//             $('#registerPassword').after('<div class="error text-danger mt-1">كلمة المرور مطلوبة</div>');
//             isValid = false;
//         } else if (password.length < 6) {
//             $('#registerPassword').after('<div class="error text-danger mt-1">كلمة المرور يجب أن تكون 6 أحرف على الأقل</div>');
//             isValid = false;
//         }

//         // Address
//         const address = $('#registerAddress').val().trim();
//         if (!address) {
//             $('#registerAddress').after('<div class="error text-danger mt-1">العنوان مطلوب</div>');
//             isValid = false;
//         }

//         // Submit if valid
//         if (isValid) {
//             alert("تم التسجيل بنجاح ✅");
//         }
//     });

//     // Email Format Validator
//     function validateEmail(email) {
//         const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return re.test(email.toLowerCase());
//     }

//     // add to favList
//     $(document).ready(function () {
//         // تحميل قائمة المفضلة من localStorage
//         let favList = JSON.parse(localStorage.getItem("favList")) || [];

//         // تحديث حالة الأيقونات عند تحميل الصفحة
//         updateFavIcons();

//         // عند الضغط على زر القلب
//         $(document).on("click", ".fav-btn", function (e) {
//             e.preventDefault();

//             const id = $(this).data("id");
//             const title = $(this).data("title");
//             const price = $(this).data("price");
//             const image = $(this).data("image");

//             // فحص هل المنتج موجود بالفعل
//             const index = favList.findIndex(item => item.id == id);
//             if (index === -1) {
//                 // المنتج غير موجود – أضفه
//                 favList.push({ id, title, price, image });
//                 $(this).find("i").removeClass("bi-heart").addClass("bi-heart-fill");
//             } else {
//                 // المنتج موجود – احذفه
//                 favList.splice(index, 1);
//                 $(this).find("i").removeClass("bi-heart-fill").addClass("bi-heart");
//             }

//             // حفظ القائمة
//             localStorage.setItem("favList", JSON.stringify(favList));

//             // تحديث قائمة المفضلة إذا كنت في صفحة favList.html
//             if (window.location.pathname.includes("favList.html")) {
//                 renderFavList();
//             }
//         });

//         // عند الضغط على المنتج (الكارد) للدخول إلى التفاصيل
//         $(document).on("click", ".product-card", function (e) {
//             // التأكد من أن النقر ليس على زر المفضلة أو زر إضافة إلى السلة
//             if (!$(e.target).closest(".fav-btn, .add-to-cart").length) {
//                 const id = $(this).data("id");
//                 window.location.href = `productDetails.html?id=${id}`;
//             }
//         });

//         // تحديث أيقونات القلوب عند تحميل الصفحة بناءً على favList
//         function updateFavIcons() {
//             $(".fav-btn").each(function () {
//                 const id = $(this).data("id");
//                 const isFavorite = favList.some(item => item.id == id);
//                 if (isFavorite) {
//                     $(this).find("i").removeClass("bi-heart").addClass("bi-heart-fill");
//                 } else {
//                     $(this).find("i").removeClass("bi-heart-fill").addClass("bi-heart");
//                 }
//             });
//         }

//         // Render favorite items on favList.html
//         function renderFavList() {
//             const favList = JSON.parse(localStorage.getItem("favList")) || [];
//             const favListContainer = $("#fav-list");

//             // Clear the container
//             favListContainer.empty();

//             if (favList.length === 0) {
//                 favListContainer.html('<p class="text-muted text-center">قائمة المفضلة فارغة</p>');
//                 return;
//             }

//             favList.forEach(item => {
//                 const favItem = `
//                     <div class="col-md-4 col-sm-6 col-6">
//                         <div class="item border p-0 position-relative product-card" data-id="${item.id}">
//                             <div class="image-side p-0">
//                                 <a href="javascript:void(0);">
//                                     <img src="${item.image}" alt="${item.title}" class="img-fluid first" />
//                                     <img src="${item.image}" alt="${item.title}" class="img-fluid second" />
//                                 </a>
//                             </div>
//                             <div class="content-side p-2">
//                                 <p>${item.title}</p>
//                                 <p>${item.price} <strong>SR</strong></p>
//                                 <button class="shiny-button w-100 add-to-cart" 
//                                         data-id="${item.id}" 
//                                         data-title="${item.title}" 
//                                         data-price="${item.price}" 
//                                         data-image="${item.image}">
//                                     اضف الي السله
//                                 </button>
//                             </div>
//                             <!-- زر المفضلة -->
//                             <button class="fav-btn btn btn-light position-absolute top-0 end-0 m-2 border rounded-circle" 
//                                     data-id="${item.id}" 
//                                     data-title="${item.title}" 
//                                     data-price="${item.price}" 
//                                     data-image="${item.image}">
//                                 <i class="bi bi-heart-fill fs-5 text-danger"></i>
//                             </button>
//                         </div>
//                     </div>
//                 `;
//                 favListContainer.append(favItem);
//             });
//         }

//         // Check if on favList.html and render the list
//         if (window.location.pathname.includes("favList.html")) {
//             renderFavList();
//         }
//     });

//     //animation
//     $(document).ready(function () {
//         function revealOnScroll() {
//             $('.reveal').each(function () {
//                 const windowHeight = $(window).height();
//                 const elementTop = $(this).offset().top;
//                 const scrollTop = $(window).scrollTop();

//                 if (elementTop < scrollTop + windowHeight - 100) {
//                     $(this).addClass('active');
//                 }
//             });
//         }

//         revealOnScroll(); // تشغيل وقت التحميل

//         $(window).on('scroll', function () {
//             revealOnScroll();
//         });
//     });
// });


$(document).ready(function () {
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

        // تحديث شارة المفضلة بعد تحميل الهيدر
        updateFavBadge();
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

        // فتح السايد بار
        $("#cart-sidebar").addClass("open");

        // تحديث عدد المنتجات في الشارة
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
            updateCartBadge();
        });
    });

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

    // Handle Login Form
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();

        // Clear previous errors
        $('#loginForm .error').remove();

        let isValid = true;

        // Email Validation
        const email = $('#loginEmail').val().trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            $('#loginEmail').after('<div class="error text-danger mt-1">البريد الإلكتروني مطلوب</div>');
            isValid = false;
        } else if (!emailPattern.test(email)) {
            $('#loginEmail').after('<div class="error text-danger mt-1">صيغة البريد غير صحيحة</div>');
            isValid = false;
        }

        // Password Validation
        const password = $('#loginPassword').val().trim();
        if (!password) {
            $('#loginPassword').after('<div class="error text-danger mt-1">كلمة المرور مطلوبة</div>');
            isValid = false;
        } else if (password.length < 6) {
            $('#loginPassword').after('<div class="error text-danger mt-1">كلمة المرور يجب أن تكون 6 أحرف على الأقل</div>');
            isValid = false;
        }

        // Submit if valid
        if (isValid) {
            alert("تم التحقق بنجاح ✅");
        }
    });

    // Handle Register Form
    $('#registerForm').on('submit', function (e) {
        e.preventDefault();

        // Clear previous errors
        $('#registerForm .error').remove();

        let isValid = true;

        // Name
        const name = $('#registerName').val().trim();
        if (!name) {
            $('#registerName').after('<div class="error text-danger mt-1">الاسم مطلوب</div>');
            isValid = false;
        }

        // Email
        const email = $('#registerEmail').val().trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            $('#registerEmail').after('<div class="error text-danger mt-1">البريد الإلكتروني مطلوب</div>');
            isValid = false;
        } else if (!emailPattern.test(email)) {
            $('#registerEmail').after('<div class="error text-danger mt-1">صيغة البريد غير صحيحة</div>');
            isValid = false;
        }

        // Password
        const password = $('#registerPassword').val().trim();
        if (!password) {
            $('#registerPassword').after('<div class="error text-danger mt-1">كلمة المرور مطلوبة</div>');
            isValid = false;
        } else if (password.length < 6) {
            $('#registerPassword').after('<div class="error text-danger mt-1">كلمة المرور يجب أن تكون 6 أحرف على الأقل</div>');
            isValid = false;
        }

        // Address
        const address = $('#registerAddress').val().trim();
        if (!address) {
            $('#registerAddress').after('<div class="error text-danger mt-1">العنوان مطلوب</div>');
            isValid = false;
        }

        // Submit if valid
        if (isValid) {
            alert("تم التسجيل بنجاح ✅");
        }
    });

    // Email Format Validator
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }

    // add to favList
    $(document).ready(function () {
        // تحميل قائمة المفضلة من localStorage
        let favList = JSON.parse(localStorage.getItem("favList")) || [];

        // تحديث حالة الأيقونات عند تحميل الصفحة
        updateFavIcons();
        updateFavBadge();

        // عند الضغط على زر القلب
        $(document).on("click", ".fav-btn", function (e) {
            e.preventDefault();

            const id = $(this).data("id");
            const title = $(this).data("title");
            const price = $(this).data("price");
            const image = $(this).data("image");

            // فحص هل المنتج موجود بالفعل
            const index = favList.findIndex(item => item.id == id);
            if (index === -1) {
                // المنتج غير موجود – أضفه
                favList.push({ id, title, price, image });
                $(this).find("i").removeClass("bi-heart").addClass("bi-heart-fill");
                showAlert('تمت الإضافة إلى المفضلة', 'success');
            } else {
                // المنتج موجود – احذفه
                favList.splice(index, 1);
                $(this).find("i").removeClass("bi-heart-fill").addClass("bi-heart");
                showAlert('تمت الإزالة من المفضلة', 'danger');
            }

            // حفظ القائمة
            localStorage.setItem("favList", JSON.stringify(favList));

            // تحديث قائمة المفضلة إذا كنت في صفحة favList.html
            if (window.location.pathname.includes("favList.html")) {
                renderFavList();
            }

            // تحديث شارة المفضلة
            updateFavBadge();
        });

        // عند الضغط على المنتج (الكارد) للدخول إلى التفاصيل
        $(document).on("click", ".product-card", function (e) {
            // التأكد من أن النقر ليس على زر المفضلة أو زر إضافة إلى السلة
            if (!$(e.target).closest(".fav-btn, .add-to-cart").length) {
                const id = $(this).data("id");
                window.location.href = `productDetails.html?id=${id}`;
            }
        });

        // تحديث أيقونات القلوب عند تحميل الصفحة بناءً على favList
        function updateFavIcons() {
            $(".fav-btn").each(function () {
                const id = $(this).data("id");
                const isFavorite = favList.some(item => item.id == id);
                if (isFavorite) {
                    $(this).find("i").removeClass("bi-heart").addClass("bi-heart-fill");
                } else {
                    $(this).find("i").removeClass("bi-heart-fill").addClass("bi-heart");
                }
            });
        }

        // تحديث شارة المفضلة
        function updateFavBadge() {
            const favList = JSON.parse(localStorage.getItem("favList")) || [];
            $("#fav-badge").text(favList.length);
        }

        // Render favorite items on favList.html
        function renderFavList() {
            const favList = JSON.parse(localStorage.getItem("favList")) || [];
            const favListContainer = $("#fav-list");

            // Clear the container
            favListContainer.empty();

            if (favList.length === 0) {
                favListContainer.html('<p class="text-muted text-center">قائمة المفضلة فارغة</p>');
                return;
            }

            favList.forEach(item => {
                const favItem = `
                    <div class="col-md-4 col-sm-6 col-6">
                        <div class="item border p-0 position-relative product-card" data-id="${item.id}">
                            <div class="image-side p-0">
                                <a href="javascript:void(0);">
 dónde
                                    <img src="${item.image}" alt="${item.title}" class="img-fluid first" />
                                    <img src="${item.image}" alt="${item.title}" class="img-fluid second" />
                                </a>
                            </div>
                            <div class="content-side p-2">
                                <p>${item.title}</p>
                                <p>${item.price} <strong>SR</strong></p>
                                <button class="shiny-button w-100 add-to-cart" 
                                        data-id="${item.id}" 
                                        data-title="${item.title}" 
                                        data-price="${item.price}" 
                                        data-image="${item.image}">
                                    اضف الي السله
                                </button>
                            </div>
                            <!-- زر المفضلة -->
                            <button class="fav-btn btn btn-light position-absolute top-0 end-0 m-2 border rounded-circle" 
                                    data-id="${item.id}" 
                                    data-title="${item.title}" 
                                    data-price="${item.price}" 
                                    data-image="${item.image}">
                                <i class="bi bi-heart-fill fs-5 text-danger"></i>
                            </button>
                        </div>
                    </div>
                `;
                favListContainer.append(favItem);
            });
        }

        // Check if on favList.html and render the list
        if (window.location.pathname.includes("favList.html")) {
            renderFavList();
        }
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