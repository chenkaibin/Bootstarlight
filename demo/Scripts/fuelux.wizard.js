(function (b, c) {
    var a = function (f, e) {
        var d;
        this.$element = b(f);
        this.options = b.extend({},
        b.fn.wizard.defaults, e);
        this.currentStep = 1;
        this.numSteps = this.$element.find("li").length;
        this.$prevBtn = this.$element.find("button.btn-prev");
        this.$nextBtn = this.$element.find("button.btn-next");
        d = this.$nextBtn.children().detach();
        this.nextText = b.trim(this.$nextBtn.text());
        this.$nextBtn.append(d);
        this.$prevBtn.on("click", b.proxy(this.previous, this));
        this.$nextBtn.on("click", b.proxy(this.next, this));
        this.$element.on("click", "li.complete", b.proxy(this.stepclicked, this));
        this.$stepContainer = this.$element.data("target") || "body";
        this.$stepContainer = b(this.$stepContainer);
    };
    a.prototype = {
        constructor: a,
        setState: function () {
            var n = (this.currentStep > 1);
            var o = (this.currentStep === 1);
            var d = (this.currentStep === this.numSteps);
            this.$prevBtn.attr("disabled", (o === true || n === false));
            var h = this.$nextBtn.data();
            if (h && h.last) {
                this.lastText = h.last;
                if (typeof this.lastText !== "undefined") {
                    var l = (d !== true) ? this.nextText : this.lastText;
                    var f = this.$nextBtn.children().detach();
                    this.$nextBtn.text(l).append(f)
                }
            }
            var j = this.$element.find("li");
            j.removeClass("active").removeClass("complete");
            j.find("span.badge").removeClass("badge-info").removeClass("badge-success");
            var m = "li:lt(" + (this.currentStep - 1) + ")";
            var g = this.$element.find(m);
            g.addClass("complete");
            g.find("span.badge").addClass("badge-success");
            var e = "li:eq(" + (this.currentStep - 1) + ")";
            var k = this.$element.find(e);
            k.addClass("active");
            k.find("span.badge").addClass("badge-info");
            var i = k.data().target;
            this.$stepContainer.find(".step-pane").removeClass("active");
            b(i).addClass("active");

            // reset the wizard position to the left
            this.$element.find('.steps').first().attr('style', 'margin-left: 0');
            // check if the steps are wider than the container div
            var totalWidth = 0;
            this.$element.find('.steps > li').each(function () {
                totalWidth += $(this).outerWidth();
            });
            var containerWidth = 0;
            if (this.$element.find('.actions').length) {
                containerWidth = this.$element.width() - this.$element.find('.actions').first().outerWidth();
            } else {
                containerWidth = this.$element.width();
            }
            if (totalWidth > containerWidth) {
                // set the position so that the last step is on the right
                var newMargin = totalWidth - containerWidth;
                this.$element.find('.steps').first().attr('style', 'margin-left: -' + newMargin + 'px');
                // set the position so that the active step is in a good
                // position if it has been moved out of view
                if (this.$element.find('li.active').first().position().left < 200) {
                    newMargin += this.$element.find('li.active').first().position().left - 200;
                    if (newMargin < 1) {
                        this.$element.find('.steps').first().attr('style', 'margin-left: 0');
                    } else {
                        this.$element.find('.steps').first().attr('style', 'margin-left: -' + newMargin + 'px');
                    }
                }
            }
            this.$element.trigger("changed")
        },
        stepclicked: function (h) {
            var d = b(h.currentTarget);
            var g = this.$element.find("li").index(d);
            var f = b.Event("stepclick");
            this.$element.trigger(f, {
                step: g + 1
            });
            if (f.isDefaultPrevented()) {
                return
            }
            this.currentStep = (g + 1);
            this.setState()
        },
        previous: function () {
            var d = (this.currentStep > 1);
            if (d) {
                var f = b.Event("change");
                this.$element.trigger(f, {
                    step: this.currentStep,
                    direction: "previous"
                });
                if (f.isDefaultPrevented()) {
                    return
                }
                this.currentStep -= 1;
                this.setState()
            }
        },
        next: function () {
            var g = (this.currentStep + 1 <= this.numSteps);
            var d = (this.currentStep === this.numSteps);
            if (g) {
                var f = b.Event("change");
                this.$element.trigger(f, {
                    step: this.currentStep,
                    direction: "next"
                });
                if (f.isDefaultPrevented()) {
                    return
                }
                this.currentStep += 1;
                this.setState()
            } else {
                if (d) {
                    this.$element.trigger("finished")
                }
            }
        },
        selectedItem: function (d) {
            return {
                step: this.currentStep
            }
        }
    };
    b.fn.wizard = function (e, g) {
        var f;
        var d = this.each(function () {
            var j = b(this);
            var i = j.data("wizard");
            var h = typeof e === "object" && e;
            if (!i) {
                j.data("wizard", (i = new a(this, h)))
            }
            if (typeof e === "string") {
                f = i[e](g)
            }
        });
        return (f === c) ? d : f
    };
    b.fn.wizard.defaults = {};
    b.fn.wizard.Constructor = a;
    b(function () {
        b("body").on("mousedown.wizard.data-api", ".wo-wizard",
        function () {
            var d = b(this);
            if (d.data("wizard")) {
                return
            }
            d.wizard(d.data())
        })
    })
})(window.jQuery);