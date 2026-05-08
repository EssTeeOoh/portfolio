/*!
=========================================================
* JohnDoe Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

$(document).ready(function () {
    var $window = $(window);
    var $navLinks = $(".navbar .nav-link");
    var $portfolio = $(".portfolio-container");
    var skillBarsAnimated = !1;

    function smoothScrollTo(hash) {
        var $target = $(hash);

        if (!$target.length) {
            return;
        }

        $("html, body").animate({
            scrollTop: $target.offset().top - 20
        }, 700, function () {
            window.location.hash = hash;
        });
    }

    function setActiveNavLink() {
        var scrollPosition = $window.scrollTop() + 140;
        var currentId = "home";

        $("header[id], section[id], div[id]").each(function () {
            var $section = $(this);
            var top = $section.offset().top;
            var bottom = top + $section.outerHeight();

            if (scrollPosition >= top && scrollPosition < bottom) {
                currentId = $section.attr("id");
            }
        });

        $navLinks.removeClass("active");
        $navLinks.filter('[href="#' + currentId + '"]').addClass("active");
    }

    function initTypedRole() {
        var typedRole = document.querySelector(".typed-role");

        if (!typedRole) {
            return;
        }

        var fullText = typedRole.getAttribute("data-typed-text") || typedRole.textContent;
        var index = 0;
        typedRole.textContent = "";

        function typeNextCharacter() {
            if (index <= fullText.length) {
                typedRole.textContent = fullText.slice(0, index);
                index += 1;
                window.setTimeout(typeNextCharacter, index < fullText.length ? 80 : 120);
            }
        }

        typeNextCharacter();
    }

    function revealOnScroll() {
        var revealNodes = document.querySelectorAll(".reveal-on-scroll");

        if (!("IntersectionObserver" in window)) {
            $(revealNodes).addClass("revealed");
            return;
        }

        var revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        revealNodes.forEach(function (node) {
            revealObserver.observe(node);
        });
    }

    function animateSkillBars() {
        if (skillBarsAnimated) {
            return;
        }

        $(".animated-progress").each(function () {
            var $bar = $(this);
            var progress = $bar.data("progress");
            $bar.css("width", progress + "%");
        });

        skillBarsAnimated = !0;
    }

    function watchResumeSection() {
        var resumeSection = document.getElementById("resume");

        if (!resumeSection) {
            return;
        }

        if (!("IntersectionObserver" in window)) {
            animateSkillBars();
            return;
        }

        var progressObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.35
        });

        progressObserver.observe(resumeSection);
    }

    function initPortfolioFilter() {
        if (!$portfolio.length) {
            return;
        }

        $portfolio.isotope({
            filter: ".web",
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: !1
            }
        });

        $(".filters a").on("click", function () {
            $(".filters .active").removeClass("active");
            $(this).addClass("active");

            $portfolio.isotope({
                filter: $(this).attr("data-filter"),
                animationOptions: {
                    duration: 750,
                    easing: "linear",
                    queue: !1
                }
            });

            return !1;
        });
    }

    function initStackToggles() {
        function toggleStack(event) {
            event.preventDefault();
            event.stopPropagation();

            var $button = $(this);
            var $card = $button.closest(".web-project-card");
            var $panel = $card.find(".tech-stack-panel");
            var techStack = $button.data("tech");
            var isOpen = $card.hasClass("stack-open");

            $(".web-project-card.stack-open").not($card).removeClass("stack-open")
                .find(".tech-stack-panel").text("").attr("aria-hidden", "true");

            if (isOpen) {
                $card.removeClass("stack-open");
                $panel.text("").attr("aria-hidden", "true");
                return;
            }

            $panel.text("Built with " + techStack + ".").attr("aria-hidden", "false");
            $card.addClass("stack-open");
        }

        $(".stack-toggle").on("click", toggleStack);
        $(".stack-toggle").on("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                toggleStack.call(this, event);
            }
        });

        $(document).on("click", function (event) {
            if (!$(event.target).closest(".web-project-card").length) {
                $(".web-project-card.stack-open").removeClass("stack-open")
                    .find(".tech-stack-panel").text("").attr("aria-hidden", "true");
            }
        });
    }

    function initSuccessState() {
        if (!$("body").hasClass("form-submitted")) {
            return;
        }

        window.setTimeout(function () {
            smoothScrollTo("#contact");
        }, 500);
    }

    $navLinks.on("click", function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            smoothScrollTo(this.hash);
        }
    });

    $window.on("scroll", function () {
        setActiveNavLink();
    });

    initTypedRole();
    revealOnScroll();
    watchResumeSection();
    initPortfolioFilter();
    initStackToggles();
    initSuccessState();
    setActiveNavLink();
});


// google maps
function initMap() {
// Styles a map in night mode.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.674, lng: -73.945},
        zoom: 12,
        scrollwheel:  false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });
}
