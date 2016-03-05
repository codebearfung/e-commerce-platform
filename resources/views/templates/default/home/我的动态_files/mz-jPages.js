;
(function(e, t) {
	function i(t, n) {
		var r, i, o, u = t.nodeName.toLowerCase();
		return "area" === u ? (r = t.parentNode, i = r.name, !t.href || !i || r.nodeName.toLowerCase() !== "map" ? !1 : (o = e("img[usemap=#" + i + "]")[0], !! o && s(o))) : (/input|select|textarea|button|object/.test(u) ? !t.disabled : "a" === u ? t.href || n : n) && s(t)
	}
	function s(t) {
		return e.expr.filters.visible(t) && !e(t).parents().andSelf().filter(function() {
			return e.css(this, "visibility") === "hidden"
		}).length
	}
	var n = 0,
		r = /^ui-id-\d+$/;
	e.ui = e.ui || {};
	if (e.ui.version) return;
	e.extend(e.ui, {
		version: "1.9.1",
		keyCode: {
			BACKSPACE: 8,
			COMMA: 188,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			LEFT: 37,
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SPACE: 32,
			TAB: 9,
			UP: 38
		}
	}), e.fn.extend({
		_focus: e.fn.focus,
		focus: function(t, n) {
			return typeof t == "number" ? this.each(function() {
				var r = this;
				setTimeout(function() {
					e(r).focus(), n && n.call(r)
				}, t)
			}) : this._focus.apply(this, arguments)
		},
		scrollParent: function() {
			var t;
			return e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? t = this.parents().filter(function() {
				return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
			}).eq(0) : t = this.parents().filter(function() {
				return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
			}).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
		},
		zIndex: function(n) {
			if (n !== t) return this.css("zIndex", n);
			if (this.length) {
				var r = e(this[0]),
					i, s;
				while (r.length && r[0] !== document) {
					i = r.css("position");
					if (i === "absolute" || i === "relative" || i === "fixed") {
						s = parseInt(r.css("zIndex"), 10);
						if (!isNaN(s) && s !== 0) return s
					}
					r = r.parent()
				}
			}
			return 0
		},
		uniqueId: function() {
			return this.each(function() {
				this.id || (this.id = "ui-id-" + ++n)
			})
		},
		removeUniqueId: function() {
			return this.each(function() {
				r.test(this.id) && e(this).removeAttr("id")
			})
		}
	}), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(n, r) {
		function u(t, n, r, s) {
			return e.each(i, function() {
				n -= parseFloat(e.css(t, "padding" + this)) || 0, r && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0), s && (n -= parseFloat(e.css(t, "margin" + this)) || 0)
			}), n
		}
		var i = r === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
			s = r.toLowerCase(),
			o = {
				innerWidth: e.fn.innerWidth,
				innerHeight: e.fn.innerHeight,
				outerWidth: e.fn.outerWidth,
				outerHeight: e.fn.outerHeight
			};
		e.fn["inner" + r] = function(n) {
			return n === t ? o["inner" + r].call(this) : this.each(function() {
				e(this).css(s, u(this, n) + "px")
			})
		}, e.fn["outer" + r] = function(t, n) {
			return typeof t != "number" ? o["outer" + r].call(this, t) : this.each(function() {
				e(this).css(s, u(this, t, !0, n) + "px")
			})
		}
	}), e.extend(e.expr[":"], {
		data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
			return function(n) {
				return !!e.data(n, t)
			}
		}) : function(t, n, r) {
			return !!e.data(t, r[3])
		},
		focusable: function(t) {
			return i(t, !isNaN(e.attr(t, "tabindex")))
		},
		tabbable: function(t) {
			var n = e.attr(t, "tabindex"),
				r = isNaN(n);
			return (r || n >= 0) && i(t, !r)
		}
	}), e(function() {
		var t = document.body,
			n = t.appendChild(n = document.createElement("div"));
		n.offsetHeight, e.extend(n.style, {
			minHeight: "100px",
			height: "auto",
			padding: 0,
			borderWidth: 0
		}), e.support.minHeight = n.offsetHeight === 100, e.support.selectstart = "onselectstart" in n, t.removeChild(n).style.display = "none"
	}), function() {
		var t = /msie ([\w.]+)/.exec(navigator.userAgent.toLowerCase()) || [];
		e.ui.ie = t.length ? !0 : !1, e.ui.ie6 = parseFloat(t[1], 10) === 6
	}(), e.fn.extend({
		disableSelection: function() {
			return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
				e.preventDefault()
			})
		},
		enableSelection: function() {
			return this.unbind(".ui-disableSelection")
		}
	}), e.extend(e.ui, {
		plugin: {
			add: function(t, n, r) {
				var i, s = e.ui[t].prototype;
				for (i in r) s.plugins[i] = s.plugins[i] || [], s.plugins[i].push([n, r[i]])
			},
			call: function(e, t, n) {
				var r, i = e.plugins[t];
				if (!i || !e.element[0].parentNode || e.element[0].parentNode.nodeType === 11) return;
				for (r = 0; r < i.length; r++) e.options[i[r][0]] && i[r][1].apply(e.element, n)
			}
		},
		contains: e.contains,
		hasScroll: function(t, n) {
			if (e(t).css("overflow") === "hidden") return !1;
			var r = n && n === "left" ? "scrollLeft" : "scrollTop",
				i = !1;
			return t[r] > 0 ? !0 : (t[r] = 1, i = t[r] > 0, t[r] = 0, i)
		},
		isOverAxis: function(e, t, n) {
			return e > t && e < t + n
		},
		isOver: function(t, n, r, i, s, o) {
			return e.ui.isOverAxis(t, r, s) && e.ui.isOverAxis(n, i, o)
		}
	})
})(jQuery);
(function(e, t) {
	var n = 0,
		r = Array.prototype.slice,
		i = e.cleanData;
	e.cleanData = function(t) {
		for (var n = 0, r;
		(r = t[n]) != null; n++) try {
			e(r).triggerHandler("remove")
		} catch (s) {}
		i(t)
	}, e.widget = function(t, n, r) {
		var i, s, o, u, a = t.split(".")[0];
		t = t.split(".")[1], i = a + "-" + t, r || (r = n, n = e.Widget), e.expr[":"][i.toLowerCase()] = function(t) {
			return !!e.data(t, i)
		}, e[a] = e[a] || {}, s = e[a][t], o = e[a][t] = function(e, t) {
			if (!this._createWidget) return new o(e, t);
			arguments.length && this._createWidget(e, t)
		}, e.extend(o, s, {
			version: r.version,
			_proto: e.extend({}, r),
			_childConstructors: []
		}), u = new n, u.options = e.widget.extend({}, u.options), e.each(r, function(t, i) {
			e.isFunction(i) && (r[t] = function() {
				var e = function() {
						return n.prototype[t].apply(this, arguments)
					},
					r = function(e) {
						return n.prototype[t].apply(this, e)
					};
				return function() {
					var t = this._super,
						n = this._superApply,
						s;
					return this._super = e, this._superApply = r, s = i.apply(this, arguments), this._super = t, this._superApply = n, s
				}
			}())
		}), o.prototype = e.widget.extend(u, {
			widgetEventPrefix: u.widgetEventPrefix || t
		}, r, {
			constructor: o,
			namespace: a,
			widgetName: t,
			widgetBaseClass: i,
			widgetFullName: i
		}), s ? (e.each(s._childConstructors, function(t, n) {
			var r = n.prototype;
			e.widget(r.namespace + "." + r.widgetName, o, n._proto)
		}), delete s._childConstructors) : n._childConstructors.push(o), e.widget.bridge(t, o)
	}, e.widget.extend = function(n) {
		var i = r.call(arguments, 1),
			s = 0,
			o = i.length,
			u, a;
		for (; s < o; s++) for (u in i[s]) a = i[s][u], i[s].hasOwnProperty(u) && a !== t && (e.isPlainObject(a) ? n[u] = e.isPlainObject(n[u]) ? e.widget.extend({}, n[u], a) : e.widget.extend({}, a) : n[u] = a);
		return n
	}, e.widget.bridge = function(n, i) {
		var s = i.prototype.widgetFullName;
		e.fn[n] = function(o) {
			var u = typeof o == "string",
				a = r.call(arguments, 1),
				f = this;
			return o = !u && a.length ? e.widget.extend.apply(null, [o].concat(a)) : o, u ? this.each(function() {
				var r, i = e.data(this, s);
				if (!i) return e.error("cannot call methods on " + n + " prior to initialization; " + "attempted to call method '" + o + "'");
				if (!e.isFunction(i[o]) || o.charAt(0) === "_") return e.error("no such method '" + o + "' for " + n + " widget instance");
				r = i[o].apply(i, a);
				if (r !== i && r !== t) return f = r && r.jquery ? f.pushStack(r.get()) : r, !1
			}) : this.each(function() {
				var t = e.data(this, s);
				t ? t.option(o || {})._init() : new i(o, this)
			}), f
		}
	}, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			disabled: !1,
			create: null
		},
		_createWidget: function(t, r) {
			r = e(r || this.defaultElement || this)[0], this.element = e(r), this.uuid = n++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), r !== this && (e.data(r, this.widgetName, this), e.data(r, this.widgetFullName, this), this._on(this.element, {
				remove: function(e) {
					e.target === r && this.destroy()
				}
			}), this.document = e(r.style ? r.ownerDocument : r.document || r), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
		},
		_getCreateOptions: e.noop,
		_getCreateEventData: e.noop,
		_create: e.noop,
		_init: e.noop,
		destroy: function() {
			this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
		},
		_destroy: e.noop,
		widget: function() {
			return this.element
		},
		option: function(n, r) {
			var i = n,
				s, o, u;
			if (arguments.length === 0) return e.widget.extend({}, this.options);
			if (typeof n == "string") {
				i = {}, s = n.split("."), n = s.shift();
				if (s.length) {
					o = i[n] = e.widget.extend({}, this.options[n]);
					for (u = 0; u < s.length - 1; u++) o[s[u]] = o[s[u]] || {}, o = o[s[u]];
					n = s.pop();
					if (r === t) return o[n] === t ? null : o[n];
					o[n] = r
				} else {
					if (r === t) return this.options[n] === t ? null : this.options[n];
					i[n] = r
				}
			}
			return this._setOptions(i), this
		},
		_setOptions: function(e) {
			var t;
			for (t in e) this._setOption(t, e[t]);
			return this
		},
		_setOption: function(e, t) {
			return this.options[e] = t, e === "disabled" && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !! t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
		},
		enable: function() {
			return this._setOption("disabled", !1)
		},
		disable: function() {
			return this._setOption("disabled", !0)
		},
		_on: function(t, n) {
			var r, i = this;
			n ? (t = r = e(t), this.bindings = this.bindings.add(t)) : (n = t, t = this.element, r = this.widget()), e.each(n, function(n, s) {
				function o() {
					if (i.options.disabled === !0 || e(this).hasClass("ui-state-disabled")) return;
					return (typeof s == "string" ? i[s] : s).apply(i, arguments)
				}
				typeof s != "string" && (o.guid = s.guid = s.guid || o.guid || e.guid++);
				var u = n.match(/^(\w+)\s*(.*)$/),
					a = u[1] + i.eventNamespace,
					f = u[2];
				f ? r.delegate(f, a, o) : t.bind(a, o)
			})
		},
		_off: function(e, t) {
			t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
		},
		_delay: function(e, t) {
			function n() {
				return (typeof e == "string" ? r[e] : e).apply(r, arguments)
			}
			var r = this;
			return setTimeout(n, t || 0)
		},
		_hoverable: function(t) {
			this.hoverable = this.hoverable.add(t), this._on(t, {
				mouseenter: function(t) {
					e(t.currentTarget).addClass("ui-state-hover")
				},
				mouseleave: function(t) {
					e(t.currentTarget).removeClass("ui-state-hover")
				}
			})
		},
		_focusable: function(t) {
			this.focusable = this.focusable.add(t), this._on(t, {
				focusin: function(t) {
					e(t.currentTarget).addClass("ui-state-focus")
				},
				focusout: function(t) {
					e(t.currentTarget).removeClass("ui-state-focus")
				}
			})
		},
		_trigger: function(t, n, r) {
			var i, s, o = this.options[t];
			r = r || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], s = n.originalEvent;
			if (s) for (i in s) i in n || (n[i] = s[i]);
			return this.element.trigger(n, r), !(e.isFunction(o) && o.apply(this.element[0], [n].concat(r)) === !1 || n.isDefaultPrevented())
		}
	}, e.each({
		show: "fadeIn",
		hide: "fadeOut"
	}, function(t, n) {
		e.Widget.prototype["_" + t] = function(r, i, s) {
			typeof i == "string" && (i = {
				effect: i
			});
			var o, u = i ? i === !0 || typeof i == "number" ? n : i.effect || n : t;
			i = i || {}, typeof i == "number" && (i = {
				duration: i
			}), o = !e.isEmptyObject(i), i.complete = s, i.delay && r.delay(i.delay), o && e.effects && (e.effects.effect[u] || e.uiBackCompat !== !1 && e.effects[u]) ? r[t](i) : u !== t && r[u] ? r[u](i.duration, i.easing, s) : r.queue(function(n) {
				e(this)[t](), s && s.call(r[0]), n()
			})
		}
	}), e.uiBackCompat !== !1 && (e.Widget.prototype._getCreateOptions = function() {
		return e.metadata && e.metadata.get(this.element[0])[this.widgetName]
	})
})(jQuery);
(function(e, t) {
	var n = !1;
	e(document).mouseup(function(e) {
		n = !1
	}), e.widget("ui.mouse", {
		version: "1.9.1",
		options: {
			cancel: "input,textarea,button,select,option",
			distance: 1,
			delay: 0
		},
		_mouseInit: function() {
			var t = this;
			this.element.bind("mousedown." + this.widgetName, function(e) {
				return t._mouseDown(e)
			}).bind("click." + this.widgetName, function(n) {
				if (!0 === e.data(n.target, t.widgetName + ".preventClickEvent")) return e.removeData(n.target, t.widgetName + ".preventClickEvent"), n.stopImmediatePropagation(), !1
			}), this.started = !1
		},
		_mouseDestroy: function() {
			this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
		},
		_mouseDown: function(t) {
			if (n) return;
			this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
			var r = this,
				i = t.which === 1,
				s = typeof this.options.cancel == "string" && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
			if (!i || s || !this._mouseCapture(t)) return !0;
			this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
				r.mouseDelayMet = !0
			}, this.options.delay));
			if (this._mouseDistanceMet(t) && this._mouseDelayMet(t)) {
				this._mouseStarted = this._mouseStart(t) !== !1;
				if (!this._mouseStarted) return t.preventDefault(), !0
			}
			return !0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
				return r._mouseMove(e)
			}, this._mouseUpDelegate = function(e) {
				return r._mouseUp(e)
			}, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), n = !0, !0
		},
		_mouseMove: function(t) {
			return !e.ui.ie || document.documentMode >= 9 || !! t.button ? this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) : this._mouseUp(t)
		},
		_mouseUp: function(t) {
			return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
		},
		_mouseDistanceMet: function(e) {
			return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
		},
		_mouseDelayMet: function(e) {
			return this.mouseDelayMet
		},
		_mouseStart: function(e) {},
		_mouseDrag: function(e) {},
		_mouseStop: function(e) {},
		_mouseCapture: function(e) {
			return !0
		}
	})
})(jQuery);
(function(e, t) {
	e.widget("ui.draggable", e.ui.mouse, {
		version: "1.9.1",
		widgetEventPrefix: "drag",
		options: {
			addClasses: !0,
			appendTo: "parent",
			axis: !1,
			connectToSortable: !1,
			containment: !1,
			cursor: "auto",
			cursorAt: !1,
			grid: !1,
			handle: !1,
			helper: "original",
			iframeFix: !1,
			opacity: !1,
			refreshPositions: !1,
			revert: !1,
			revertDuration: 500,
			scope: "default",
			scroll: !0,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			snap: !1,
			snapMode: "both",
			snapTolerance: 20,
			stack: !1,
			zIndex: !1
		},
		_create: function() {
			this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
		},
		_destroy: function() {
			this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
		},
		_mouseCapture: function(t) {
			var n = this.options;
			return this.helper || n.disabled || e(t.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(t), this.handle ? (e(n.iframeFix === !0 ? "iframe" : n.iframeFix).each(function() {
				e('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
					width: this.offsetWidth + "px",
					height: this.offsetHeight + "px",
					position: "absolute",
					opacity: "0.001",
					zIndex: 1e3
				}).css(e(this).offset()).appendTo("body")
			}), !0) : !1)
		},
		_mouseStart: function(t) {
			var n = this.options;
			return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
				top: this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			}, e.extend(this.offset, {
				click: {
					left: t.pageX - this.offset.left,
					top: t.pageY - this.offset.top
				},
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			}), this.originalPosition = this.position = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, n.cursorAt && this._adjustOffsetFromHelper(n.cursorAt), n.containment && this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
		},
		_mouseDrag: function(t, n) {
			this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute");
			if (!n) {
				var r = this._uiHash();
				if (this._trigger("drag", t, r) === !1) return this._mouseUp({}), !1;
				this.position = r.position
			}
			if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
			if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
			return e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1
		},
		_mouseStop: function(t) {
			var n = !1;
			e.ui.ddmanager && !this.options.dropBehaviour && (n = e.ui.ddmanager.drop(this, t)), this.dropped && (n = this.dropped, this.dropped = !1);
			var r = this.element[0],
				i = !1;
			while (r && (r = r.parentNode)) r == document && (i = !0);
			if (!i && this.options.helper === "original") return !1;
			if (this.options.revert == "invalid" && !n || this.options.revert == "valid" && n || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, n)) {
				var s = this;
				e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
					s._trigger("stop", t) !== !1 && s._clear()
				})
			} else this._trigger("stop", t) !== !1 && this._clear();
			return !1
		},
		_mouseUp: function(t) {
			return e("div.ui-draggable-iframeFix").each(function() {
				this.parentNode.removeChild(this)
			}), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), e.ui.mouse.prototype._mouseUp.call(this, t)
		},
		cancel: function() {
			return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
		},
		_getHandle: function(t) {
			var n = !this.options.handle || !e(this.options.handle, this.element).length ? !0 : !1;
			return e(this.options.handle, this.element).find("*").andSelf().each(function() {
				this == t.target && (n = !0)
			}), n
		},
		_createHelper: function(t) {
			var n = this.options,
				r = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t])) : n.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
			return r.parents("body").length || r.appendTo(n.appendTo == "parent" ? this.element[0].parentNode : n.appendTo), r[0] != this.element[0] && !/(fixed|absolute)/.test(r.css("position")) && r.css("position", "absolute"), r
		},
		_adjustOffsetFromHelper: function(t) {
			typeof t == "string" && (t = t.split(" ")), e.isArray(t) && (t = {
				left: +t[0],
				top: +t[1] || 0
			}), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
		},
		_getParentOffset: function() {
			this.offsetParent = this.helper.offsetParent();
			var t = this.offsetParent.offset();
			this.cssPosition == "absolute" && this.scrollParent[0] != document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop());
			if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && e.ui.ie) t = {
				top: 0,
				left: 0
			};
			return {
				top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function() {
			if (this.cssPosition == "relative") {
				var e = this.element.position();
				return {
					top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				}
			}
			return {
				top: 0,
				left: 0
			}
		},
		_cacheMargins: function() {
			this.margins = {
				left: parseInt(this.element.css("marginLeft"), 10) || 0,
				top: parseInt(this.element.css("marginTop"), 10) || 0,
				right: parseInt(this.element.css("marginRight"), 10) || 0,
				bottom: parseInt(this.element.css("marginBottom"), 10) || 0
			}
		},
		_cacheHelperProportions: function() {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			}
		},
		_setContainment: function() {
			var t = this.options;
			t.containment == "parent" && (t.containment = this.helper[0].parentNode);
			if (t.containment == "document" || t.containment == "window") this.containment = [t.containment == "document" ? 0 : e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t.containment == "document" ? 0 : e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (t.containment == "document" ? 0 : e(window).scrollLeft()) + e(t.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (t.containment == "document" ? 0 : e(window).scrollTop()) + (e(t.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
			if (!/^(document|window|parent)$/.test(t.containment) && t.containment.constructor != Array) {
				var n = e(t.containment),
					r = n[0];
				if (!r) return;
				var i = n.offset(),
					s = e(r).css("overflow") != "hidden";
				this.containment = [(parseInt(e(r).css("borderLeftWidth"), 10) || 0) + (parseInt(e(r).css("paddingLeft"), 10) || 0), (parseInt(e(r).css("borderTopWidth"), 10) || 0) + (parseInt(e(r).css("paddingTop"), 10) || 0), (s ? Math.max(r.scrollWidth, r.offsetWidth) : r.offsetWidth) - (parseInt(e(r).css("borderLeftWidth"), 10) || 0) - (parseInt(e(r).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (s ? Math.max(r.scrollHeight, r.offsetHeight) : r.offsetHeight) - (parseInt(e(r).css("borderTopWidth"), 10) || 0) - (parseInt(e(r).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = n
			} else t.containment.constructor == Array && (this.containment = t.containment)
		},
		_convertPositionTo: function(t, n) {
			n || (n = this.position);
			var r = t == "absolute" ? 1 : -1,
				i = this.options,
				s = this.cssPosition != "absolute" || this.scrollParent[0] != document && !! e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
				o = /(html|body)/i.test(s[0].tagName);
			return {
				top: n.top + this.offset.relative.top * r + this.offset.parent.top * r - (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : o ? 0 : s.scrollTop()) * r,
				left: n.left + this.offset.relative.left * r + this.offset.parent.left * r - (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : o ? 0 : s.scrollLeft()) * r
			}
		},
		_generatePosition: function(t) {
			var n = this.options,
				r = this.cssPosition != "absolute" || this.scrollParent[0] != document && !! e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
				i = /(html|body)/i.test(r[0].tagName),
				s = t.pageX,
				o = t.pageY;
			if (this.originalPosition) {
				var u;
				if (this.containment) {
					if (this.relative_container) {
						var a = this.relative_container.offset();
						u = [this.containment[0] + a.left, this.containment[1] + a.top, this.containment[2] + a.left, this.containment[3] + a.top]
					} else u = this.containment;
					t.pageX - this.offset.click.left < u[0] && (s = u[0] + this.offset.click.left), t.pageY - this.offset.click.top < u[1] && (o = u[1] + this.offset.click.top), t.pageX - this.offset.click.left > u[2] && (s = u[2] + this.offset.click.left), t.pageY - this.offset.click.top > u[3] && (o = u[3] + this.offset.click.top)
				}
				if (n.grid) {
					var f = n.grid[1] ? this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1] : this.originalPageY;
					o = u ? f - this.offset.click.top < u[1] || f - this.offset.click.top > u[3] ? f - this.offset.click.top < u[1] ? f + n.grid[1] : f - n.grid[1] : f : f;
					var l = n.grid[0] ? this.originalPageX + Math.round((s - this.originalPageX) / n.grid[0]) * n.grid[0] : this.originalPageX;
					s = u ? l - this.offset.click.left < u[0] || l - this.offset.click.left > u[2] ? l - this.offset.click.left < u[0] ? l + n.grid[0] : l - n.grid[0] : l : l
				}
			}
			return {
				top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : i ? 0 : r.scrollTop()),
				left: s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : r.scrollLeft())
			}
		},
		_clear: function() {
			this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
		},
		_trigger: function(t, n, r) {
			return r = r || this._uiHash(), e.ui.plugin.call(this, t, [n, r]), t == "drag" && (this.positionAbs = this._convertPositionTo("absolute")), e.Widget.prototype._trigger.call(this, t, n, r)
		},
		plugins: {},
		_uiHash: function(e) {
			return {
				helper: this.helper,
				position: this.position,
				originalPosition: this.originalPosition,
				offset: this.positionAbs
			}
		}
	}), e.ui.plugin.add("draggable", "connectToSortable", {
		start: function(t, n) {
			var r = e(this).data("draggable"),
				i = r.options,
				s = e.extend({}, n, {
					item: r.element
				});
			r.sortables = [], e(i.connectToSortable).each(function() {
				var n = e.data(this, "sortable");
				n && !n.options.disabled && (r.sortables.push({
					instance: n,
					shouldRevert: n.options.revert
				}), n.refreshPositions(), n._trigger("activate", t, s))
			})
		},
		stop: function(t, n) {
			var r = e(this).data("draggable"),
				i = e.extend({}, n, {
					item: r.element
				});
			e.each(r.sortables, function() {
				this.instance.isOver ? (this.instance.isOver = 0, r.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, r.options.helper == "original" && this.instance.currentItem.css({
					top: "auto",
					left: "auto"
				})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, i))
			})
		},
		drag: function(t, n) {
			var r = e(this).data("draggable"),
				i = this,
				s = function(t) {
					var n = this.offset.click.top,
						r = this.offset.click.left,
						i = this.positionAbs.top,
						s = this.positionAbs.left,
						o = t.height,
						u = t.width,
						a = t.top,
						f = t.left;
					return e.ui.isOver(i + n, s + r, a, f, o, u)
				};
			e.each(r.sortables, function(s) {
				var o = !1,
					u = this;
				this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (o = !0, e.each(r.sortables, function() {
					return this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this != u && this.instance._intersectsWith(this.instance.containerCache) && e.ui.contains(u.instance.element[0], this.instance.element[0]) && (o = !1), o
				})), o ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = e(i).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
					return n.helper[0]
				}, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = r.offset.click.top, this.instance.offset.click.left = r.offset.click.left, this.instance.offset.parent.left -= r.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= r.offset.parent.top - this.instance.offset.parent.top, r._trigger("toSortable", t), r.dropped = this.instance.element, r.currentItem = r.element, this.instance.fromOutside = r), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), r._trigger("fromSortable", t), r.dropped = !1)
			})
		}
	}), e.ui.plugin.add("draggable", "cursor", {
		start: function(t, n) {
			var r = e("body"),
				i = e(this).data("draggable").options;
			r.css("cursor") && (i._cursor = r.css("cursor")), r.css("cursor", i.cursor)
		},
		stop: function(t, n) {
			var r = e(this).data("draggable").options;
			r._cursor && e("body").css("cursor", r._cursor)
		}
	}), e.ui.plugin.add("draggable", "opacity", {
		start: function(t, n) {
			var r = e(n.helper),
				i = e(this).data("draggable").options;
			r.css("opacity") && (i._opacity = r.css("opacity")), r.css("opacity", i.opacity)
		},
		stop: function(t, n) {
			var r = e(this).data("draggable").options;
			r._opacity && e(n.helper).css("opacity", r._opacity)
		}
	}), e.ui.plugin.add("draggable", "scroll", {
		start: function(t, n) {
			var r = e(this).data("draggable");
			r.scrollParent[0] != document && r.scrollParent[0].tagName != "HTML" && (r.overflowOffset = r.scrollParent.offset())
		},
		drag: function(t, n) {
			var r = e(this).data("draggable"),
				i = r.options,
				s = !1;
			if (r.scrollParent[0] != document && r.scrollParent[0].tagName != "HTML") {
				if (!i.axis || i.axis != "x") r.overflowOffset.top + r.scrollParent[0].offsetHeight - t.pageY < i.scrollSensitivity ? r.scrollParent[0].scrollTop = s = r.scrollParent[0].scrollTop + i.scrollSpeed : t.pageY - r.overflowOffset.top < i.scrollSensitivity && (r.scrollParent[0].scrollTop = s = r.scrollParent[0].scrollTop - i.scrollSpeed);
				if (!i.axis || i.axis != "y") r.overflowOffset.left + r.scrollParent[0].offsetWidth - t.pageX < i.scrollSensitivity ? r.scrollParent[0].scrollLeft = s = r.scrollParent[0].scrollLeft + i.scrollSpeed : t.pageX - r.overflowOffset.left < i.scrollSensitivity && (r.scrollParent[0].scrollLeft = s = r.scrollParent[0].scrollLeft - i.scrollSpeed)
			} else {
				if (!i.axis || i.axis != "x") t.pageY - e(document).scrollTop() < i.scrollSensitivity ? s = e(document).scrollTop(e(document).scrollTop() - i.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < i.scrollSensitivity && (s = e(document).scrollTop(e(document).scrollTop() + i.scrollSpeed));
				if (!i.axis || i.axis != "y") t.pageX - e(document).scrollLeft() < i.scrollSensitivity ? s = e(document).scrollLeft(e(document).scrollLeft() - i.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < i.scrollSensitivity && (s = e(document).scrollLeft(e(document).scrollLeft() + i.scrollSpeed))
			}
			s !== !1 && e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(r, t)
		}
	}), e.ui.plugin.add("draggable", "snap", {
		start: function(t, n) {
			var r = e(this).data("draggable"),
				i = r.options;
			r.snapElements = [], e(i.snap.constructor != String ? i.snap.items || ":data(draggable)" : i.snap).each(function() {
				var t = e(this),
					n = t.offset();
				this != r.element[0] && r.snapElements.push({
					item: this,
					width: t.outerWidth(),
					height: t.outerHeight(),
					top: n.top,
					left: n.left
				})
			})
		},
		drag: function(t, n) {
			var r = e(this).data("draggable"),
				i = r.options,
				s = i.snapTolerance,
				o = n.offset.left,
				u = o + r.helperProportions.width,
				a = n.offset.top,
				f = a + r.helperProportions.height;
			for (var l = r.snapElements.length - 1; l >= 0; l--) {
				var c = r.snapElements[l].left,
					h = c + r.snapElements[l].width,
					p = r.snapElements[l].top,
					d = p + r.snapElements[l].height;
				if (!(c - s < o && o < h + s && p - s < a && a < d + s || c - s < o && o < h + s && p - s < f && f < d + s || c - s < u && u < h + s && p - s < a && a < d + s || c - s < u && u < h + s && p - s < f && f < d + s)) {
					r.snapElements[l].snapping && r.options.snap.release && r.options.snap.release.call(r.element, t, e.extend(r._uiHash(), {
						snapItem: r.snapElements[l].item
					})), r.snapElements[l].snapping = !1;
					continue
				}
				if (i.snapMode != "inner") {
					var v = Math.abs(p - f) <= s,
						m = Math.abs(d - a) <= s,
						g = Math.abs(c - u) <= s,
						y = Math.abs(h - o) <= s;
					v && (n.position.top = r._convertPositionTo("relative", {
						top: p - r.helperProportions.height,
						left: 0
					}).top - r.margins.top), m && (n.position.top = r._convertPositionTo("relative", {
						top: d,
						left: 0
					}).top - r.margins.top), g && (n.position.left = r._convertPositionTo("relative", {
						top: 0,
						left: c - r.helperProportions.width
					}).left - r.margins.left), y && (n.position.left = r._convertPositionTo("relative", {
						top: 0,
						left: h
					}).left - r.margins.left)
				}
				var b = v || m || g || y;
				if (i.snapMode != "outer") {
					var v = Math.abs(p - a) <= s,
						m = Math.abs(d - f) <= s,
						g = Math.abs(c - o) <= s,
						y = Math.abs(h - u) <= s;
					v && (n.position.top = r._convertPositionTo("relative", {
						top: p,
						left: 0
					}).top - r.margins.top), m && (n.position.top = r._convertPositionTo("relative", {
						top: d - r.helperProportions.height,
						left: 0
					}).top - r.margins.top), g && (n.position.left = r._convertPositionTo("relative", {
						top: 0,
						left: c
					}).left - r.margins.left), y && (n.position.left = r._convertPositionTo("relative", {
						top: 0,
						left: h - r.helperProportions.width
					}).left - r.margins.left)
				}!r.snapElements[l].snapping && (v || m || g || y || b) && r.options.snap.snap && r.options.snap.snap.call(r.element, t, e.extend(r._uiHash(), {
					snapItem: r.snapElements[l].item
				})), r.snapElements[l].snapping = v || m || g || y || b
			}
		}
	}), e.ui.plugin.add("draggable", "stack", {
		start: function(t, n) {
			var r = e(this).data("draggable").options,
				i = e.makeArray(e(r.stack)).sort(function(t, n) {
					return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(n).css("zIndex"), 10) || 0)
				});
			if (!i.length) return;
			var s = parseInt(i[0].style.zIndex) || 0;
			e(i).each(function(e) {
				this.style.zIndex = s + e
			}), this[0].style.zIndex = s + i.length
		}
	}), e.ui.plugin.add("draggable", "zIndex", {
		start: function(t, n) {
			var r = e(n.helper),
				i = e(this).data("draggable").options;
			r.css("zIndex") && (i._zIndex = r.css("zIndex")), r.css("zIndex", i.zIndex)
		},
		stop: function(t, n) {
			var r = e(this).data("draggable").options;
			r._zIndex && e(n.helper).css("zIndex", r._zIndex)
		}
	})
})(jQuery);
(function(e, t) {
	var n = 5;
	e.widget("ui.slider", e.ui.mouse, {
		version: "1.9.1",
		widgetEventPrefix: "slide",
		options: {
			animate: !1,
			distance: 0,
			max: 100,
			min: 0,
			orientation: "horizontal",
			range: !1,
			step: 1,
			value: 0,
			values: null
		},
		_create: function() {
			var t, r, i = this.options,
				s = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
				o = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
				u = [];
			this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all" + (i.disabled ? " ui-slider-disabled ui-disabled" : "")), this.range = e([]), i.range && (i.range === !0 && (i.values || (i.values = [this._valueMin(), this._valueMin()]), i.values.length && i.values.length !== 2 && (i.values = [i.values[0], i.values[0]])), this.range = e("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + (i.range === "min" || i.range === "max" ? " ui-slider-range-" + i.range : ""))), r = i.values && i.values.length || 1;
			for (t = s.length; t < r; t++) u.push(o);
			this.handles = s.add(e(u.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function(e) {
				e.preventDefault()
			}).mouseenter(function() {
				i.disabled || e(this).addClass("ui-state-hover")
			}).mouseleave(function() {
				e(this).removeClass("ui-state-hover")
			}).focus(function() {
				i.disabled ? e(this).blur() : (e(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), e(this).addClass("ui-state-focus"))
			}).blur(function() {
				e(this).removeClass("ui-state-focus")
			}), this.handles.each(function(t) {
				e(this).data("ui-slider-handle-index", t)
			}), this._on(this.handles, {
				keydown: function(t) {
					var r, i, s, o, u = e(t.target).data("ui-slider-handle-index");
					switch (t.keyCode) {
					case e.ui.keyCode.HOME:
					case e.ui.keyCode.END:
					case e.ui.keyCode.PAGE_UP:
					case e.ui.keyCode.PAGE_DOWN:
					case e.ui.keyCode.UP:
					case e.ui.keyCode.RIGHT:
					case e.ui.keyCode.DOWN:
					case e.ui.keyCode.LEFT:
						t.preventDefault();
						if (!this._keySliding) {
							this._keySliding = !0, e(t.target).addClass("ui-state-active"), r = this._start(t, u);
							if (r === !1) return
						}
					}
					o = this.options.step, this.options.values && this.options.values.length ? i = s = this.values(u) : i = s = this.value();
					switch (t.keyCode) {
					case e.ui.keyCode.HOME:
						s = this._valueMin();
						break;
					case e.ui.keyCode.END:
						s = this._valueMax();
						break;
					case e.ui.keyCode.PAGE_UP:
						s = this._trimAlignValue(i + (this._valueMax() - this._valueMin()) / n);
						break;
					case e.ui.keyCode.PAGE_DOWN:
						s = this._trimAlignValue(i - (this._valueMax() - this._valueMin()) / n);
						break;
					case e.ui.keyCode.UP:
					case e.ui.keyCode.RIGHT:
						if (i === this._valueMax()) return;
						s = this._trimAlignValue(i + o);
						break;
					case e.ui.keyCode.DOWN:
					case e.ui.keyCode.LEFT:
						if (i === this._valueMin()) return;
						s = this._trimAlignValue(i - o)
					}
					this._slide(t, u, s)
				},
				keyup: function(t) {
					var n = e(t.target).data("ui-slider-handle-index");
					this._keySliding && (this._keySliding = !1, this._stop(t, n), this._change(t, n), e(t.target).removeClass("ui-state-active"))
				}
			}), this._refreshValue(), this._animateOff = !1
		},
		_destroy: function() {
			this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
		},
		_mouseCapture: function(t) {
			var n, r, i, s, o, u, a, f, l = this,
				c = this.options;
			return c.disabled ? !1 : (this.elementSize = {
				width: this.element.outerWidth(),
				height: this.element.outerHeight()
			}, this.elementOffset = this.element.offset(), n = {
				x: t.pageX,
				y: t.pageY
			}, r = this._normValueFromMouse(n), i = this._valueMax() - this._valueMin() + 1, this.handles.each(function(t) {
				var n = Math.abs(r - l.values(t));
				i > n && (i = n, s = e(this), o = t)
			}), c.range === !0 && this.values(1) === c.min && (o += 1, s = e(this.handles[o])), u = this._start(t, o), u === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = o, s.addClass("ui-state-active").focus(), a = s.offset(), f = !e(t.target).parents().andSelf().is(".ui-slider-handle"), this._clickOffset = f ? {
				left: 0,
				top: 0
			} : {
				left: t.pageX - a.left - s.width() / 2,
				top: t.pageY - a.top - s.height() / 2 - (parseInt(s.css("borderTopWidth"), 10) || 0) - (parseInt(s.css("borderBottomWidth"), 10) || 0) + (parseInt(s.css("marginTop"), 10) || 0)
			}, this.handles.hasClass("ui-state-hover") || this._slide(t, o, r), this._animateOff = !0, !0))
		},
		_mouseStart: function() {
			return !0
		},
		_mouseDrag: function(e) {
			var t = {
				x: e.pageX,
				y: e.pageY
			},
				n = this._normValueFromMouse(t);
			return this._slide(e, this._handleIndex, n), !1
		},
		_mouseStop: function(e) {
			return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
		},
		_detectOrientation: function() {
			this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
		},
		_normValueFromMouse: function(e) {
			var t, n, r, i, s;
			return this.orientation === "horizontal" ? (t = this.elementSize.width, n = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height, n = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), r = n / t, r > 1 && (r = 1), r < 0 && (r = 0), this.orientation === "vertical" && (r = 1 - r), i = this._valueMax() - this._valueMin(), s = this._valueMin() + r * i, this._trimAlignValue(s)
		},
		_start: function(e, t) {
			var n = {
				handle: this.handles[t],
				value: this.value()
			};
			return this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()), this._trigger("start", e, n)
		},
		_slide: function(e, t, n) {
			var r, i, s;
			this.options.values && this.options.values.length ? (r = this.values(t ? 0 : 1), this.options.values.length === 2 && this.options.range === !0 && (t === 0 && n > r || t === 1 && n < r) && (n = r), n !== this.values(t) && (i = this.values(), i[t] = n, s = this._trigger("slide", e, {
				handle: this.handles[t],
				value: n,
				values: i
			}), r = this.values(t ? 0 : 1), s !== !1 && this.values(t, n, !0))) : n !== this.value() && (s = this._trigger("slide", e, {
				handle: this.handles[t],
				value: n
			}), s !== !1 && this.value(n))
		},
		_stop: function(e, t) {
			var n = {
				handle: this.handles[t],
				value: this.value()
			};
			this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()), this._trigger("stop", e, n)
		},
		_change: function(e, t) {
			if (!this._keySliding && !this._mouseSliding) {
				var n = {
					handle: this.handles[t],
					value: this.value()
				};
				this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()), this._trigger("change", e, n)
			}
		},
		value: function(e) {
			if (arguments.length) {
				this.options.value = this._trimAlignValue(e), this._refreshValue(), this._change(null, 0);
				return
			}
			return this._value()
		},
		values: function(t, n) {
			var r, i, s;
			if (arguments.length > 1) {
				this.options.values[t] = this._trimAlignValue(n), this._refreshValue(), this._change(null, t);
				return
			}
			if (!arguments.length) return this._values();
			if (!e.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(t) : this.value();
			r = this.options.values, i = arguments[0];
			for (s = 0; s < r.length; s += 1) r[s] = this._trimAlignValue(i[s]), this._change(null, s);
			this._refreshValue()
		},
		_setOption: function(t, n) {
			var r, i = 0;
			e.isArray(this.options.values) && (i = this.options.values.length), e.Widget.prototype._setOption.apply(this, arguments);
			switch (t) {
			case "disabled":
				n ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.prop("disabled", !0), this.element.addClass("ui-disabled")) : (this.handles.prop("disabled", !1), this.element.removeClass("ui-disabled"));
				break;
			case "orientation":
				this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
				break;
			case "value":
				this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
				break;
			case "values":
				this._animateOff = !0, this._refreshValue();
				for (r = 0; r < i; r += 1) this._change(null, r);
				this._animateOff = !1;
				break;
			case "min":
			case "max":
				this._animateOff = !0, this._refreshValue(), this._animateOff = !1
			}
		},
		_value: function() {
			var e = this.options.value;
			return e = this._trimAlignValue(e), e
		},
		_values: function(e) {
			var t, n, r;
			if (arguments.length) return t = this.options.values[e], t = this._trimAlignValue(t), t;
			n = this.options.values.slice();
			for (r = 0; r < n.length; r += 1) n[r] = this._trimAlignValue(n[r]);
			return n
		},
		_trimAlignValue: function(e) {
			if (e <= this._valueMin()) return this._valueMin();
			if (e >= this._valueMax()) return this._valueMax();
			var t = this.options.step > 0 ? this.options.step : 1,
				n = (e - this._valueMin()) % t,
				r = e - n;
			return Math.abs(n) * 2 >= t && (r += n > 0 ? t : -t), parseFloat(r.toFixed(5))
		},
		_valueMin: function() {
			return this.options.min
		},
		_valueMax: function() {
			return this.options.max
		},
		_refreshValue: function() {
			var t, n, r, i, s, o = this.options.range,
				u = this.options,
				a = this,
				f = this._animateOff ? !1 : u.animate,
				l = {};
			this.options.values && this.options.values.length ? this.handles.each(function(r) {
				n = (a.values(r) - a._valueMin()) / (a._valueMax() - a._valueMin()) * 100, l[a.orientation === "horizontal" ? "left" : "bottom"] = n + "%", e(this).stop(1, 1)[f ? "animate" : "css"](l, u.animate), a.options.range === !0 && (a.orientation === "horizontal" ? (r === 0 && a.range.stop(1, 1)[f ? "animate" : "css"]({
					left: n + "%"
				}, u.animate), r === 1 && a.range[f ? "animate" : "css"]({
					width: n - t + "%"
				}, {
					queue: !1,
					duration: u.animate
				})) : (r === 0 && a.range.stop(1, 1)[f ? "animate" : "css"]({
					bottom: n + "%"
				}, u.animate), r === 1 && a.range[f ? "animate" : "css"]({
					height: n - t + "%"
				}, {
					queue: !1,
					duration: u.animate
				}))), t = n
			}) : (r = this.value(), i = this._valueMin(), s = this._valueMax(), n = s !== i ? (r - i) / (s - i) * 100 : 0, l[this.orientation === "horizontal" ? "left" : "bottom"] = n + "%", this.handle.stop(1, 1)[f ? "animate" : "css"](l, u.animate), o === "min" && this.orientation === "horizontal" && this.range.stop(1, 1)[f ? "animate" : "css"]({
				width: n + "%"
			}, u.animate), o === "max" && this.orientation === "horizontal" && this.range[f ? "animate" : "css"]({
				width: 100 - n + "%"
			}, {
				queue: !1,
				duration: u.animate
			}), o === "min" && this.orientation === "vertical" && this.range.stop(1, 1)[f ? "animate" : "css"]({
				height: n + "%"
			}, u.animate), o === "max" && this.orientation === "vertical" && this.range[f ? "animate" : "css"]({
				height: 100 - n + "%"
			}, {
				queue: !1,
				duration: u.animate
			}))
		}
	})
})(jQuery);
(function(c) {
	c.fn.jPaginator = function(p) {
		this.length != 1 && c.error("You must use this plugin with a unique element");
		var a = {
			selectedPage: 1,
			nbPages: 100,
			length: 10,
			widthPx: 30,
			marginPx: 1,
			overBtnLeft: null,
			overBtnRight: null,
			maxBtnLeft: null,
			maxBtnRight: null,
			withSlider: !0,
			withAcceleration: !0,
			speed: 2,
			coeffAcceleration: 2,
			minSlidesForSlider: 3,
			onPageClicked: null
		},
			b = {
				realWid: 0,
				curNum: 1,
				infRel: 0,
				cInfMax: 0,
				cInf: 0,
				nbMove: 0,
				isMoving: !1,
				isLimitL: !1,
				isLimitR: !1,
				listenSlider: !1
			};
		return this.each(function() {
			function q() {
				j(a.selectedPage - Math.floor((a.length - 1) / 2));
				b.listenSlider = !1;
				l(b.cInf);
				b.listenSlider = !0;
				a.onPageClicked && a.onPageClicked.call(this, d, a.selectedPage)
			}
			// function j(e) {
			// 	d.find(".paginator_p.selected").removeClass("selected");
			// 	var e = Math.min(a.nbPages - a.length + 1, e),
			// 		e = Math.max(1, e),
			// 		k = e - 2;
			// 	d.find(".paginator_p_bloc .paginator_p").each(function() {
			// 		k += 1;
			// 		c(this).html(k);
			// 		a.selectedPage == k && c(this).addClass("selected")
			// 	});
			// 	d.find(".paginator_p_bloc").css("left", "-" + b.realWid + "px");
			// 	b.curNum = e;
			// 	b.cInf = (e - 1) * b.realWid;
			// 	b.infRel = 0
			// }
			function l(a) {
				var a = Math.round(a / b.cInfMax * 100),
					k = d.find(".paginator_slider").slider("option", "value");
				a != k && d.find(".paginator_slider").slider("option", "value", a)
			}
			function r(e, d) {
				if (b.listenSlider && !b.isMoving) {
					var c = d.value,
						c = Math.min(100, c),
						c = Math.max(0, c),
						g = Math.round(b.cInfMax * c / 100) - b.cInf;
					c == 100 ? j(a.nbPages - a.length + 1) : c == 0 ? j(1) : h(g)
				}
			}
			function h(e) {
				var c = b.infRel + e,
					f = Math.abs(e) / e * Math.floor(Math.abs(c) / b.realWid);
				c %= b.realWid;
				b.infRel = c;
				var g = (b.curNum - 1) * b.realWid + b.infRel,
					h = b.curNum + f;
				h < 1 && (g = -1);
				h > a.nbPages && (g = b.cInfMax + 1);
				// g < 0 ? (j(1), b.cInf = 0, b.infRel = 0, l(0), b.isLimitL = !0, m()) : g > b.cInfMax ? (j(a.nbPages), b.cInf = b.cInfMax, b.infRel = 0, l(b.cInfMax), b.isLimitR = !0, m()) : (b.isLimitL = !1, b.isLimitR = !1, b.cInf = g, e != 0 && (f != 0 && j(h), l(b.cInf), d.find(".paginator_p_bloc").css("left", -1 * c - b.realWid + "px")))
			}
			function m() {
				b.nbMove = 0;
				b.isMoving = !1
			}
			function n(a) {
				if (!(b.isLimitR && a == "right") && !(b.isLimitL && a == "left")) {
					var c = Math.round(b.cInfMax / 10);
					a == "left" && (c *= -1);
					h(c);
					setTimeout(function() {
						b.nbMove += 1;
						n(a)
					}, 20)
				}
			}
			function o(c) {
				if (b.isMoving) {
					var d = Math.min(Math.abs(a.speed), 5),
						f = Math.min(Math.abs(a.coeffAcceleration), 5);
					a.withAcceleration && (d = Math.round(d + Math.round(f * b.nbMove * b.nbMove / 8E4)));
					c == "left" && (d *= -1);
					h(d);
					setTimeout(function() {
						b.nbMove += 1;
						o(c)
					}, 10)
				}
			}
			var d = c(this);
			p && c.extend(a, p);
			// for (i = 1; i <= a.length + 2; i++) d.find(".paginator_p_bloc").append(c("<div class='paginator_p'></div>"));
			// a.length = Math.min(a.length, a.nbPages);
			// a.nbPages <= a.length && (d.find(".paginator_slider").hide(), d.find(".paginator_slider").children().hide());
			// if (Math.ceil(a.nbPages / a.length) < a.minSlidesForSlider) a.withSlider = !1;
			// a.withSlider || (d.find(".paginator_slider").hide(), d.find(".paginator_slider").children().hide());
			// var f = 0,
			// 	s = d.find(".paginator_p").first().css("border-left-width");
			// s.indexOf("px") > 0 && (f = s.replace("px", "") * 1);
			// b.realWid = a.widthPx + a.marginPx * 2 + f * 2;
			// f = 1 * b.realWid * a.length;
			// d.find(".paginator_p").css("width", a.widthPx + "px");
			// d.find(".paginator_p").css("margin", "0 " + a.marginPx + "px 0 " + a.marginPx + "px");
			// d.find(".paginator_p_wrap").css("width", "220px");
			// d.find(".paginator_slider").css("width", f + "px");
			// b.cInfMax = a.nbPages * b.realWid - a.length * b.realWid;
			// a.selectedPage = Math.min(a.selectedPage, a.nbPages);
			// q(d);
			// d.find(".paginator_p").bind("click.jPaginator", function() {
			// 	var b = 1 * c(this).html();
			// 	d.find(".paginator_p.selected").removeClass("selected");
			// 	a.selectedPage = b;
			// 	q()
			// });
			a.withSlider && (d.find(".paginator_slider").slider({
				animate: !1
			}), d.find(".paginator_slider").bind("slidechange.jPaginator", function(a, b) {
				return r(a, b)
			}), d.find(".paginator_slider").bind("slide.jPaginator", function(a, b) {
				return r(a, b)
			}));
			a.overBtnLeft && c(a.overBtnLeft).bind("mouseenter.jPaginator", function() {
				c(this);
				b.isMoving = !0;
				o("left")
			});
			a.overBtnRight && c(a.overBtnRight).bind("mouseenter.jPaginator", function() {
				c(this);
				b.isMoving = !0;
				o("right")
			});
			a.overBtnLeft && c(a.overBtnLeft).bind("mouseleave.jPaginator", function() {
				c(this);
				m()
			});
			a.overBtnRight && c(a.overBtnRight).bind("mouseleave.jPaginator", function() {
				c(this);
				m()
			});
			a.maxBtnLeft && c(a.maxBtnLeft).bind("click.jPaginator", function() {
				return n("left")
			});
			a.maxBtnRight && c(a.maxBtnRight).bind("click.jPaginator", function() {
				return n("right")
			});
			// d.find(".paginator_p").bind("mouseenter.jPaginator", function() {
			// 	var a = c(this);
			// 	d.find(".paginator_p.over").removeClass("over");
			// 	a.addClass("over")
			// });
			// d.find(".paginator_p").bind("mouseleave.jPaginator", function() {
			// 	c(this);
			// 	d.find(".paginator_p.over").removeClass("over")
			// })
		})
	}
})(jQuery);