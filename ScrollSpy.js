var ScrollSpy = (function () {
    function ScrollSpy(options) {
        this.mode = options.mode ? options.mode : 'vertical';
        this.buffer = options.buffer ? options.buffer : 0;
        this.container = options.container ? options.container : window;
        this.onEnter = options.onEnter ? options.onEnter : null;
        this.onLeave = options.onLeave ? options.onLeave : null;
        this.onTick = options.onTick ? options.onTick : null;
        this.events = [];
    }
    ScrollSpy.prototype.spy = function (element, bounds) {
        var _this = this;
        var enters = 0, leaves = 0;
        var inside = false;
        this.events.push({
            element: element,
            handler: function (event) {
                var position = {
                    top: _this.container instanceof Window ? _this.container.pageYOffset : _this.container.scrollTop,
                    left: _this.container instanceof Window ? _this.container.pageXOffset : _this.container.scrollTop
                };
                var xy = _this.mode === 'vertical' ? position.top + _this.buffer : position.left + _this.buffer;
                var min = bounds.min;
                var max;
                {
                    if (bounds.max === 0) {
                        if (_this.container instanceof Window) {
                            max = (_this.mode === 'vertical') ? _this.container.innerWidth : _this.container.outerWidth + element.offsetWidth;
                        }
                        else {
                            max = (_this.mode === 'vertical') ? _this.container.clientHeight : _this.container.offsetWidth + element.offsetWidth;
                        }
                    }
                    else {
                        max = bounds.max;
                    }
                }
                if (xy >= min && xy <= max) {
                    if (!inside) {
                        inside = true;
                        enters++;
                        var scrollEnter = document.createEvent('Event');
                        scrollEnter.initEvent('scrollEnter', false, true);
                        scrollEnter.position = position;
                        element.dispatchEvent(scrollEnter);
                        if (_this.onEnter)
                            _this.onEnter(element, position);
                    }
                    var scrollTick = document.createEvent('Event');
                    scrollTick.initEvent('scrollTick', false, true);
                    scrollTick.position = position;
                    scrollTick.tickData = { inside: inside, enters: enters, leaves: leaves };
                    element.dispatchEvent(scrollTick);
                    if (_this.onTick)
                        _this.onTick(element, position, inside, enters, leaves);
                }
                else {
                    inside = false;
                    leaves++;
                    var scrollLeave = document.createEvent('Event');
                    scrollLeave.initEvent('scrollLeave', false, true);
                    scrollLeave.position = position;
                    element.dispatchEvent(scrollLeave);
                    if (_this.onLeave)
                        _this.onLeave(element, position);
                }
            }
        });
        this.container.addEventListener('scroll', this.events[this.events.length - 1].handler);
    };
    ScrollSpy.prototype.unspy = function (element, isSilent) {
        var _this = this;
        var hasElement = false;
        this.events.forEach(function (event) {
            if (event.element === element) {
                _this.container.removeEventListener('scroll', event.handler);
                hasElement = true;
                var index = _this.events.indexOf(event);
                if (index > 0) {
                    _this.events.splice(index, 1);
                }
            }
        });
        if (!hasElement) {
            if (!isSilent)
                throw new Error('ScrollSpy are not spying on the element ' + element);
            else
                return false;
        }
        else {
            return true;
        }
    };
    ScrollSpy.prototype.unspyAll = function () {
        var _this = this;
        this.events.forEach(function (event) {
            _this.container.removeEventListener('scroll', event.handler);
            var index = _this.events.indexOf(event);
            if (index > 0) {
                _this.events.splice(index, 1);
            }
        });
    };
    return ScrollSpy;
})();
//# sourceMappingURL=ScrollSpy.js.map