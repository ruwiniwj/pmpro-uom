/*
 FusionCharts JavaScript Library - Gantt Chart
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>

 @version 3.10.1
 */
FusionCharts.register("module", ["private", "modules.renderer.js-gantt", function () {
    var W = this, K = W.hcLib, Ga = W.window, wa = /msie/i.test(Ga.navigator.userAgent) && !Ga.opera, tb = K.chartAPI, Ra = K.chartAPI, Sa = K.extend2, e = K.pluck, c = K.pluckNumber, ra = K.getFirstColor, Ha = K.graphics, ea = Ha.convertColor, hb = Ha.getDarkColor, jc = Ha.parseColor, Ea = K.parseUnsafeString, Ia = K.getFirstValue, ac = K.getValidValue, ma = K.Raphael, kc = K.COMMASTRING, Na = K.setLineHeight, Gb = K.getDashStyle, Hb = K.toRaphaelColor, Ta = K.each, lc = K.FC_CONFIG_STRING, Oa =
            "rgba(192,192,192," + (wa ? .002 : 1E-6) + ")", bc = Ha.mapSymbolName, wa = Math, Ja = wa.ceil, xa = wa.round, ha = wa.max, Fa = wa.min, cc = wa.abs, Ua = parseInt, Ib = parseFloat, mc = {
            pageX: 0,
            pageY: 0
        }, Z = K.plotEventHandler, pa, X, ub = K.hasTouch = void 0 !== Ga.document.documentElement.ontouchstart, nc = K.addEvent, oc = K.removeEvent, Va = function (b) {
            return void 0 !== b && null !== b
        }, Wa = {left: "start", right: "end", center: "middle"}, ib = {
            left: 0,
            right: 1,
            center: .5,
            undefined: .5
        }, vb = {top: 1, bottom: 0, middle: .5, undefined: .5}, Xa = {left: 5, right: -5, center: 0, undefined: 0},
        Ga = !/fusioncharts\.com$/i.test(Ga.location.hostname), Pa = function (b, a) {
            this.min = b.min;
            this.max = c(b.visibleMax, b.max);
            this.pixelValueRatio = a / (this.max - this.min);
            this.startPixel = b.chart.marginLeft + b.chart.ganttStartX
        };
    Pa.prototype = {
        getPixel: function (b) {
            return this.startPixel + (b - this.min) * this.pixelValueRatio
        }
    };
    Pa.prototype.constructor = Pa;
    tb("gantt", {
        friendlyName: "Gantt Chart",
        rendererId: "gantt",
        standaloneInit: !0,
        defaultSeriesType: "gantt",
        canvasborderthickness: 1,
        defaultPlotShadow: 1,
        creditLabel: Ga,
        fireGroupEvent: !0,
        defaultPaletteOptions: function () {
            var b = arguments;
            return K.extend2(K.extend2(K.extend2(K.extend2({}, b[0]), b[1]), b[2]), b[3])
        }(Sa({}, K.defaultGaugePaletteOptions), {
            paletteColors: ["AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" "), "AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" "),
                "AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" "), "AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" "), "AFD8F8 F6BD0F 8BBA00 FF8E46 008E8E D64646 8E468E 588526 B3AA00 008ED6 9D080D A186BE CC6600 FDC689 ABA000 F26D7D FFF200 0054A6 F7941C CC3300 006600 663300 6DCFF6".split(" ")],
            bgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
            bgAngle: [270, 270, 270, 270, 270],
            bgRatio: ["100", "100", "100", "100", "100"],
            bgAlpha: ["100", "100", "100", "100", "100"],
            canvasBgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
            canvasBgAngle: [0, 0, 0, 0, 0],
            canvasBgAlpha: ["100", "100", "100", "100", "100"],
            canvasBgRatio: ["", "", "", "", ""],
            canvasBorderColor: ["545454", "545454", "415D6F", "845001", "68001B"],
            canvasBorderAlpha: [100, 100, 100, 90, 100],
            gridColor: ["DDDDDD", "D8DCC5", "99C4CD", "DEC49C", "FEC1D0"],
            gridResizeBarColor: ["999999",
                "545454", "415D6F", "845001", "D55979"],
            categoryBgColor: ["F1F1F1", "EEF0E6", "F2F8F9", "F7F0E6", "FFF4F8"],
            dataTableBgColor: ["F1F1F1", "EEF0E6", "F2F8F9", "F7F0E6", "FFF4F8"],
            toolTipBgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
            toolTipBorderColor: ["545454", "545454", "415D6F", "845001", "68001B"],
            baseFontColor: ["555555", "60634E", "025B6A", "A15E01", "68001B"],
            borderColor: ["767575", "545454", "415D6F", "845001", "68001B"],
            borderAlpha: [50, 50, 50, 50, 50],
            legendBgColor: ["ffffff", "ffffff", "ffffff", "ffffff", "ffffff"],
            legendBorderColor: ["666666", "545454", "415D6F", "845001", "D55979"],
            plotBorderColor: ["999999", "8A8A8A", "6BA9B6", "C1934D", "FC819F"],
            plotFillColor: ["EEEEEE", "D8DCC5", "BCD8DE", "E9D8BE", "FEDAE3"],
            scrollBarColor: ["EEEEEE", "D8DCC5", "99C4CD", "DEC49C", "FEC1D0"]
        }),
        charttopmargin: 10,
        chartbottommargin: 20,
        series: function () {
            var b = this.dataObj, a = b.chart, I = (I = b.categories) || [], d = I.length, q = this.hcJSON, k = q.chart, m = q[lc], z = this.smartLabel, f = this.colorManager, g = q.categories = {}, w = [], p = this.inCanvasStyle, t = this.numberFormatter,
                C = Infinity, l = -Infinity, u = k.origW - k.marginLeft - k.marginRight, E = k.origH - k.marginTop - k.marginBottom, n = b.processes || {}, h = n && n.process, y = h && h.length, x = Ua(p.fontSize, 10), P = b.datatable, U = P && P.datacolumn, H = U && U.length, ga = b.connectors, M = ga && ga.length, N = q.connectors = [], O = b.milestones && b.milestones.milestone, F = O && O.length, aa = q.milestone = [], D = b.tasks, ba = D && D.task, L = ba && ba.length, v = 0, r = 0, dc = c(a.forceganttwidthpercent, 0), ca = 0, Z = 0, X = !1, ma = {
                    top: "top",
                    bottom: "bottom"
                }, B = {top: "top", bottom: "bottom", undefined: "middle"},
                S = {right: "right", left: "left"}, da = {
                    right: "right",
                    left: "left",
                    undefined: "center"
                }, G = q.dataTable = {}, jb = Infinity, kb = -Infinity, pa = q.processIDMap = [], W, wa, Ga = c(a.dateintooltip, 1), Ja = b.legend && b.legend.item, Ha = q.tasksMap || (q.tasksMap = {}), Pa = 0, Ra = 0, wb, Ba, Jb, Kb, lb, xb, Ta, Lb, Mb, sa, ya, Ca, Wa, ib, Xa, Sb, yb, tb, za, qa, mb, R, Nb, Ya, Za, Ob, Pb, Da, na, oa, $a, ab, bb, nb, cb, db, Ka, La, ia, ub, Tb, ja, ka, fa, ob, pb, eb, V, J, Ub, fb, zb, Ma, Ab, Vb, Qb, qb, Wb, Bb, Cb, Db, Eb, Fb, Rb, rb, vb, ec, fc, gc, Qa, T, hc, ua, Q, Aa, ta, sb, la, Xb, Yb, Zb, $b, va, gb, ic, A, Y;
            if (y) {
                q.tasks =
                    [];
                delete q.yAxis;
                delete q.xAxis;
                k.backgroundColor = ea(e(a.bgcolor, "FFFFFF"), e(a.bgalpha, f.getColor("bgAlpha")));
                c(a.showborder, 0) || (k.borderWidth = 0);
                k.plotBorderColor = ea(e(a.canvasbordercolor, f.getColor("canvasBorderColor")), 0 === c(a.showcanvasborder, 1) ? 0 : e(a.canvasborderalpha, 100));
                k.backgroundColor = {
                    FCcolor: {
                        color: e(a.bgcolor, "FFFFFF"),
                        alpha: e(a.bgalpha, f.getColor("bgAlpha")),
                        angle: e(a.bgangle, f.getColor("bgAngle")),
                        ratio: e(a.bgratio, f.getColor("bgRatio"))
                    }
                };
                k.plotBackgroundColor = {
                    FCcolor: {
                        color: e(a.canvasbgcolor,
                            f.getColor("canvasBgColor")),
                        alpha: e(a.canvasbgalpha, f.getColor("canvasBgAlpha")),
                        angle: e(a.canvasbgangle, f.getColor("canvasBgAngle")),
                        ratio: e(a.canvasbgratio, f.getColor("canvasBgRatio"))
                    }
                };
                k.plotBorderWidth = c(a.canvasborderthickness, 1);
                k.outputDateFormat = e(a.outputdateformat, k.dateFormat);
                k.extendCategoryBg = c(a.extendcategorybg, 0);
                k.ganttLineColor = ea(e(a.ganttlinecolor, f.getColor("gridColor")), c(a.ganttlinealpha, 100));
                k.ganttLineThickness = c(a.ganttlinethickness, 1);
                k.ganttLineDashStyle = c(a.ganttlinedashed,
                    0) ? Gb(c(a.ganttlinedashlen, 1), a.ganttlinedashgap, k.ganttLineThickness) : "none";
                k.gridBorderColor = ea(e(a.gridbordercolor, f.getColor("gridColor")), c(a.gridborderalpha, 100));
                k.gridBorderThickness = c(a.gridborderthickness, 1);
                k.gridBorderDashStyle = c(a.gridborderdashed, 0) ? Gb(c(a.gridborderdashlen, 1), a.gridborderdashgap, k.gridborderThickness) : "none";
                k.showSlackAsFill = c(a.showslackasfill, 1);
                k.slackFillColor = ra(e(a.slackfillcolor, "FF5E5E"));
                k.gridResizeBarColor = ea(e(a.gridresizebarcolor, f.getColor("gridResizeBarColor")),
                    c(a.gridresizebaralpha, 100));
                k.gridResizeBarThickness = c(a.gridresizebarthickness, 1);
                k.taskBarRoundRadius = c(a.taskbarroundradius, 0);
                k.taskBarFillMix = a.taskbarfillmix;
                k.taskBarFillRatio = a.taskbarfillratio;
                void 0 === k.taskBarFillMix && (k.taskBarFillMix = "{light-10},{dark-20},{light-50},{light-85}");
                void 0 === k.taskBarFillRatio && (k.taskBarFillRatio = "0,8,84,8");
                k.connectorExtension = c(a.connectorextension, 10);
                k.clickURL = e(a.clickurl, "");
                k.annRenderDelay = a.annrenderdelay;
                k.taskDatePadding = c(a.taskdatepadding,
                    3);
                k.taskLabelPadding = c(a.tasklabelspadding, 2);
                k.ganttStartX = c(a.ganttwidthpercent, 65);
                100 < k.ganttStartX && (k.ganttStartX = 100);
                Ca = k.ganttStartX = .01 * (100 - k.ganttStartX) * u;
                k.gridWidth = u - k.ganttStartX;
                ic = c(a.showfulldatatable, 1);
                eb = n.width;
                eb = c(k.ganttStartX * (/\%/g.test(eb) && .01 * Ib(eb, 10)) || eb);
                Ca -= c(eb, 0);
                W = xa(eb);
                Z += 1;
                for (A = 0; A < H; A += 1)Lb = U[A].width, Mb = c(k.ganttStartX * (/\%/g.test(Lb) && .01 * Ib(Lb, 10)) || Lb), Ca -= c(Mb, 0), Mb = U[A].width = xa(Mb), Z += 1;
                0 <= Ca ? Ca /= Z : (X = !0, Ca = k.ganttStartX / Z);
                if (dc || !ic)for ((isNaN(W) ||
                X) && (W = Ca), A = 0; A < H; A += 1)(isNaN(U[A].width) || X) && (U[A].width = Ca);
                for (A = 0; A < d; A += 1) {
                    ka = I[A];
                    C = Infinity;
                    l = -Infinity;
                    ob = e(ka.bgcolor, f.getColor("categoryBgColor"));
                    pb = c(ka.bgalpha, 100);
                    $a = e(ka.font, p.fontFamily);
                    ab = c(ka.fontsize, x + 1);
                    bb = e(ka.fontcolor, p.color);
                    nb = c(ka.isbold, 1);
                    cb = c(ka.isitalic, 0);
                    db = c(ka.isunderline, 0);
                    c(ka.verticalpadding, 3);
                    Ka = e(ka.align, "center").toLowerCase();
                    La = e(ka.valign, "middle").toLowerCase();
                    ub = (Tb = ka.category) && Tb.length;
                    Qa = 0;
                    la = {};
                    for (Y = 0; Y < ub; Y += 1)ja = Tb[Y], na = t.getDateValue(ja.start).ms,
                        oa = t.getDateValue(ja.end).ms, isNaN(na) && (na = void 0), na > l && (l = na), na <= C && (C = na), isNaN(oa) && (oa = void 0), oa > l && (l = oa), oa <= C && (C = oa), ia = Ea(e(ja.label, ja.name)), T = {
                        color: ra(e(ja.fontcolor, bb)),
                        fontFamily: e(ja.font, $a),
                        fontSize: c(ja.fontsize, ab) + "px",
                        fontWeight: c(ja.isbold, nb) && "bold" || "normal",
                        fontStyle: c(ja.isitalic, cb) && "italic" || "normal",
                        textDecoration: c(ja.isunderline, db) && "underline" || "none"
                    }, Na(T), z.setStyle(T), sa = z.getOriSize(ia), Qa = ha(Qa, sa.height), Q = "FCCAT_" + A + "_" + Y, Jb = e(ja.hoverbandcolor, ka.hoverbandcolor,
                        a.categoryhoverbandcolor, a.hoverbandcolor, f.getColor("gridColor")), Kb = c(ja.hoverbandalpha, ka.hoverbandalpha, a.categoryhoverbandalpha, a.hoverbandalpha, 30), lb = c(ja.showhoverband, ka.showhoverband, a.showcategoryhoverband, a.showhoverband, a.showhovereffect, 1), g[Q] = {
                        text: ia,
                        style: T,
                        start: na,
                        end: oa,
                        index: Y,
                        isLast: A === d - 1,
                        bgColor: ea(e(ja.bgcolor, ob), c(ja.bgalpha, pb)),
                        dimension: la,
                        link: ja.link,
                        align: da[[e(ja.align, Ka).toLowerCase()]],
                        vAlign: B[ma[e(ja.valign, La).toLowerCase()]],
                        hoverColor: ea(Jb, Kb),
                        useHover: lb,
                        usePlotHover: c(ja.showganttpanehoverband, ka.showganttpanehoverband, a.showganttpaneverticalhoverband, lb)
                    }, g[Aa] && (g[Aa].nextCol = g[Q], g[Q].prevCol = g[Aa]), Aa = Q;
                    if (zb = g["FCCAT_" + A + "_0"])g[Q].first = zb, zb.last = g[Q], g[fb] && (g[fb].nextRow = zb, zb.prevRow = g[fb]);
                    fb = Q;
                    la.h = Qa + 5 + 2 * c(ka.verticalpadding, 3);
                    la.y = r;
                    la.min = C;
                    la.max = l;
                    la.numCat = Y;
                    r += la.h;
                    kb = ha(kb, l);
                    jb = Fa(jb, C)
                }
                g.min = jb;
                g.max = kb;
                if (y) {
                    Qa = ya = 0;
                    gb = "right" === e(n.positioningrid, "left").toLowerCase();
                    T = {
                        color: ra(e(n.headerfontcolor, p.color)),
                        fontFamily: e(n.headerfont,
                            p.fontFamily),
                        fontSize: c(n.headerfontsize, x + 3) + "px",
                        fontWeight: c(n.headerisbold, 1) && "bold" || "normal",
                        fontStyle: c(n.headerisitalic, 0) && "italic" || "normal",
                        textDecoration: c(n.headerisunderline, 0) && "underline" || "none"
                    };
                    Na(T);
                    ia = Ea(n.headertext);
                    z.setStyle(T);
                    sa = z.getOriSize(ia);
                    ya = ha(ya, sa.width);
                    Ka = da[S[e(n.headeralign, "center").toLowerCase()]];
                    La = B[ma[e(n.headervalign, "middle").toLowerCase()]];
                    la = {};
                    Q = ta = fb = "processHeader";
                    G.processHeader = {
                        text: ia,
                        style: T,
                        align: Ka,
                        vAlign: La,
                        isHeader: !0,
                        link: e(n.headerlink),
                        dimension: {x: 0, w: 0, h: ha(sa.height, r)},
                        bgColor: ea(e(n.headerbgcolor, f.getColor("dataTableBgColor")), c(n.headerbgalpha, 100)),
                        key: Q,
                        isLast: gb,
                        drawResizer: !gb && H,
                        prevCol: null,
                        nextCol: null,
                        prevRow: null,
                        nextRow: null
                    };
                    ob = e(n.bgcolor, f.getColor("dataTableBgColor"));
                    pb = c(n.bgalpha, 100);
                    $a = e(n.font, p.fontFamily);
                    ab = c(n.fontsize, x);
                    bb = e(n.fontcolor, p.color);
                    nb = c(n.isbold, 0);
                    cb = c(n.isitalic, 0);
                    db = c(n.isunderline, 0);
                    Ka = e(n.align, "center").toLowerCase();
                    La = e(n.valign, "middle").toLowerCase();
                    for (A = 0; A < y; A += 1)fa =
                        h[A], Jb = e(fa.hoverbandcolor, n.hoverbandcolor, a.processhoverbandcolor, a.hoverbandcolor, f.getColor("gridColor")), Kb = c(fa.hoverbandalpha, n.hoverbandalpha, a.processhoverbandalpha, a.hoverbandalpha, 30), lb = c(fa.showhoverband, n.showhoverband, a.showprocesshoverband, a.showhoverband, a.showhovereffect, 1), T = {
                        color: ra(e(fa.fontcolor, bb)),
                        fontSize: c(fa.fontsize, ab) + "px",
                        fontFamily: e(fa.font, $a),
                        fontWeight: c(fa.isbold, nb) && "bold" || "normal",
                        fontStyle: c(fa.isitalic, cb) && "italic" || "normal",
                        textDecoration: c(fa.isunderline,
                            db) && "underline" || "none"
                    }, Na(T), ia = Ea(e(fa.label, fa.name)), z.setStyle(T), sa = z.getOriSize(ia), Qa = ha(Qa, sa.height), ya = ha(ya, sa.width), Aa = Q, Q = e(fa.id, "__FCDPID__" + A).toUpperCase(), G[Q] && (Q = "__FCDPID__" + A), pa[A] = Q, Va(wb = c(fa.height, a.rowheight)) && (wb = cc(wb), Pa += wb || 0, Ra += 1), G[Q] = {
                        text: sa.text,
                        style: T,
                        link: fa.link,
                        id: Q,
                        processHeight: wb,
                        labelHeight: sa.height,
                        align: da[[e(fa.align, Ka).toLowerCase()]],
                        vAlign: B[ma[e(fa.valign, La).toLowerCase()]],
                        bgColor: ea(e(fa.bgcolor, ob), c(fa.bgalpha, pb)),
                        prevCol: G[Aa],
                        dimension: {},
                        hoverColor: ea(Jb, Kb),
                        useHover: lb,
                        usePlotHover: c(fa.showganttpanehoverband, n.showganttpanehoverband, a.showganttpanehorizontalhoverband, lb),
                        isLast: gb,
                        nextCol: null,
                        prevRow: null,
                        nextRow: null
                    }, G[Aa] && (G[Aa].nextCol = G[Q]);
                    G[Q].first = G[ta];
                    G[ta].last = G[Q];
                    G[ta].processCount = y;
                    G[ta].countDefinedHeight = Ra;
                    G[ta].totalHeight = Pa;
                    wa = G[ta].maxProcessHeight = Qa + 8;
                    isNaN(W) && (W = ya + 10);
                    ca += W;
                    la.x = 0;
                    G[ta].dimension.w = la.w = W;
                    la.h = wa = ha((E - G[ta].dimension.h) / y, wa)
                }
                gb && (ca = 0);
                if (H)for (q.datacolumns = [], A = 0; A < H; A += 1) {
                    V = U[A];
                    ya = 0;
                    ob = ra(e(V.bgcolor, P.bgcolor, f.getColor("dataTableBgColor")));
                    pb = c(V.bgalpha, P.bgalpha, 100);
                    $a = e(V.font, P.font, p.fontFamily);
                    bb = ra(e(V.fontcolor, P.fontcolor, p.color));
                    ab = c(V.fontsize, P.fontsize, x);
                    nb = c(V.isbold, P.isbold, 0);
                    cb = c(V.isitalic, P.isitalic, 0);
                    db = c(V.isunderline, P.isunderline, 0);
                    Ka = da[S[e(V.align, P.align, "center").toLowerCase()]];
                    La = B[ma[e(V.valign, P.valign, "middle").toLowerCase()]];
                    T = {
                        color: ra(e(V.headerfontcolor, P.headerfontcolor, bb)),
                        fontFamily: e(V.headerfont, P.headerfont, $a),
                        fontSize: c(V.headerfontsize,
                            P.headerfontsize, ab + 3) + "px",
                        fontWeight: c(V.headerisbold, P.headerisbold, 1) && "bold" || "normal",
                        fontStyle: c(V.headerisitalic, P.headerisitalic, cb) && "italic" || "normal",
                        textDecoration: c(V.headerisunderline, P.headerisunderline, db) && "underline" || "none"
                    };
                    Na(T);
                    ia = Ea(V.headertext);
                    z.setStyle(T);
                    sa = z.getOriSize(ia);
                    ya = ha(ya, sa.width);
                    Q = ta = "_FCDtHeader_" + A;
                    mb = G[Q] = {
                        text: ia,
                        style: T,
                        align: da[S[e(V.headeralign, P.headeralign, Ka).toLowerCase()]],
                        vAlign: B[ma[e(V.headervalign, P.headervalign, La).toLowerCase()]],
                        link: e(V.headerlink),
                        drawResizer: gb || A < H - 1,
                        dimension: {x: 0 + ca, w: V.width, h: G.processHeader && G.processHeader.dimension.h},
                        isHeader: !0,
                        key: Q,
                        bgColor: ea(e(V.headerbgcolor, P.headerbgcolor, f.getColor("dataTableBgColor")), c(V.headerbgalpha, P.headerbgalpha, 100))
                    };
                    mb.data = [];
                    hc = V.text || [];
                    sb = G.processHeader;
                    Ma = G[fb];
                    Ma.nextRow = G[Q];
                    G[Q].prevRow = Ma;
                    sb = sb.nextCol;
                    Ma = Ma.nextCol;
                    la = {};
                    fb = ta;
                    for (Y = 0; sb; sb = sb.nextCol, Ma = Ma.nextCol, Y += 1)Aa = Q, Q = "_FCDt_" + A + "_" + Y, (ua = hc[Y]) ? (T = {
                        fontFamily: e(ua.font, $a),
                        color: ra(e(ua.fontcolor, bb)),
                        fontSize: c(ua.fontsize,
                            ab) + "px",
                        fontWeight: c(ua.isbold, nb) && "bold" || "normal",
                        fontStyle: c(ua.isitalic, cb) && "italic" || "normal",
                        textDecoration: c(ua.isunderline, db) && "underline" || "none"
                    }, Na(T), z.setStyle(T), ia = Ea(ua.label), sa = z.getOriSize(ia), ya = ha(ya, sa.width), G[Q] = {
                        text: ia,
                        style: T,
                        link: e(ua.link, ""),
                        bgColor: ea(e(ua.bgcolor, ob), c(ua.bgalpha, pb)),
                        align: da[S[e(ua.align, Ka).toLowerCase()]],
                        vAlign: B[ma[e(ua.valign, La).toLowerCase()]],
                        prevCol: G[Aa],
                        dimension: la,
                        nextCol: null,
                        nextRow: null,
                        prevRow: null
                    }) : G[Q] = {
                        prevCol: G[Aa], dimension: la,
                        isNaN: !0, nextCol: null, nextRow: null, prevRow: null
                    }, G[Aa].nextCol = G[Q], G[Q].prevRow = Ma, Ma.nextRow = G[Q], G[Q].hoverColor = G[pa[Y]].hoverColor, G[Q].useHover = G[pa[Y]].useHover, G[Q].usePlotHover = G[pa[Y]].usePlotHover;
                    G[Q].first = G[ta];
                    G[ta].last = G[Q];
                    isNaN(V.width) ? mb.width = ya + 10 : mb.width = V.width;
                    la.x = 0 + ca;
                    ca += G[ta].dimension.w = la.w = mb.width;
                    la.h = wa;
                    q.datacolumns.push(mb)
                }
                gb && (fa = G.processHeader, fa.dimension.x = fa.nextCol.dimension.x = ca, ca += W);
                dc || (k.ganttStartX = Fa(k.ganttStartX, ca));
                k.totalGridWidth = ca;
                Yb =
                    b.trendlines || {};
                q.trendlines = [];
                for (A = 0; A < Yb.length; A += 1)for (F = (Zb = Yb[A].line) && Zb.length, Y = 0; Y < F; Y += 1)va = Zb[Y], $b = c(va.istrendzone, 0), Da = e(va.color, f.getColor("legendBorderColor")), T = Sa({}, m.trendStyle), T.color = ea(Da), Na(T), q.trendlines.push({
                    start: t.getDateValue(va.start).ms,
                    end: t.getDateValue(va.end).ms,
                    displayValue: Ea(e(va.displayvalue, va.start)),
                    color: ea(Da, c(va.alpha, $b ? 40 : 99)),
                    style: T,
                    isTrendZone: $b,
                    dashedStyle: c(va.dashed, 0) ? Gb(c(va.dashlen, 3), c(va.dashgap, 3), c(va.thickness, 1)) : "none",
                    thickness: c(va.thickness,
                        1)
                });
                if (L) {
                    C = Infinity;
                    l = -Infinity;
                    c(a.taskbarroundradius, 0);
                    Za = a.taskbarfillmix;
                    Ob = a.taskbarfillratio;
                    void 0 === Za && (Za = "{light-10},{dark-20},{light-50},{light-85}");
                    void 0 === Ob && (Ob = "0,8,84,8");
                    k.shadow = c(a.showshadow, 1);
                    Ta = c(a.showslackasfill, 1);
                    for (A = 0; A < L; A += 1)J = ba[A], Ub = v % y, na = t.getDateValue(J.start).ms, oa = t.getDateValue(J.end).ms, Q = e(G[Ia(J.processid, "").toUpperCase()], G["__FCDPID__" + Ub], G[pa[Ub]]).id.toUpperCase(), Ab = c(J.alpha, D.alpha, 100), Da = e(J.color, D.color, f.getColor("plotFillColor")), Qb =
                        c(J.borderalpha, D.borderalpha, 100), Vb = e(J.bordercolor, D.bordercolor, f.getColor("plotBorderColor")), isNaN(na) && (na = void 0), na > l && (l = na), na <= C && (C = na), isNaN(oa) && (oa = void 0), oa > l && (l = oa), oa <= C && (C = oa), T = {
                        color: ra(e(J.fontcolor, D.fontcolor, p.color)),
                        fontSize: c(J.fontsize, D.fontsize, x) + "px",
                        fontFamily: e(J.font, D.font, p.fontFamily)
                    }, Na(T), v += 1, qb = f.parseColorMix(Da, Za), Wb = f.parseAlphaList(Ab.toString(), qb.length), Bb = f.parseRatioList(Ob, qb.length), Cb = c(J.angle, D.angle, 270), Rb = f.parseColorMix(e(J.slackfillcolor,
                        D.slackfillcolor, a.slackfillcolor, "FF5E5E"), Za), rb = Fa(c(J.percentcomplete, -1), 100), ia = Ia(e(J.label, J.name), ""), Fb = "", c(J.showlabel, J.showname, D.showlabels, D.showname, a.showtasklabels, a.showtasknames, 0) && (Fb = ia), c(J.showpercentlabel, D.showpercentlabel, a.showpercentlabel, 0) && -1 !== rb && (Fb += " " + rb + "%"), vb = {
                        FCcolor: {
                            color: qb.join(),
                            alpha: Wb,
                            ratio: Bb,
                            angle: Cb
                        }
                    }, Rb = Ta ? {FCcolor: {color: Rb.join(), alpha: Wb, ratio: Bb, angle: Cb}} : Oa, ec = {
                        FCcolor: {
                            color: f.parseColorMix(e(J.hoverfillcolor, D.hoverfillcolor, a.taskhoverfillcolor,
                                hb(Da, 80)), Za).join(),
                            alpha: f.parseAlphaList(e(J.hoverfillalpha, D.hoverfillalpha, a.taskhoverfillalpha, Ab).toString(), qb.length),
                            ratio: Bb,
                            angle: Cb
                        }
                    }, fc = ea(e(J.hoverbordercolor, D.hoverbordercolor, a.taskhoverbordercolor, hb(Vb, 80)), e(J.hoverborderalpha, D.hoverborderalpha, a.taskhoverborderalpha, Qb)), gc = Ta ? {
                        FCcolor: {
                            color: f.parseColorMix(hb(e(J.slackhoverfillcolor, D.slackhoverfillcolor, a.slackhoverfillcolor, a.slackfillcolor, "FF5E5E"), 80), Za).join(),
                            alpha: f.parseAlphaList(e(J.slackhoverfillalpha, D.slackhoverfillalpha,
                                a.slackhoverfillalpha, Ab).toString(), qb.length),
                            ratio: Bb,
                            angle: Cb
                        }
                    } : Oa, Db = t.getFormattedDate(na), Eb = t.getFormattedDate(oa), Ba = ac(Ea(e(J.tooltext, J.hovertext, D.plottooltext, m.tooltext))), Ba = void 0 !== Ba ? K.parseTooltext(Ba, [3, 28, 29, 30, 31], {
                        end: Eb,
                        start: Db,
                        label: ia,
                        percentComplete: -1 !== rb ? t.percentValue(rb) : "",
                        processName: G[Q] && G[Q].text
                    }, J) : ("" !== ia ? ia + (Ga ? ", " : "") : "") + (Ga ? Db + " - " + Eb : ""), Ya = Ia(J.id, "").toUpperCase(), Ha[Ia(Ya, A)] = {
                        dataObj: {
                            processId: Q,
                            label: Fb,
                            labelAlign: da[[e(J.labelalign, a.tasklabelsalign,
                                "center").toLowerCase()]],
                            link: J.link,
                            start: na,
                            end: oa,
                            id: Ia(J.id, "").toUpperCase(),
                            showAsGroup: c(J.showasgroup, 0),
                            animation: c(J.animation, a.animation, a.defaultanimation, 1),
                            style: T,
                            percentComplete: rb,
                            color: Hb(vb),
                            slackColor: Hb(Rb),
                            hoverFillColor: Hb(ec),
                            hoverBorderColor: fc,
                            slackHoverColor: Hb(gc),
                            showHoverEffect: c(J.showhovereffect, D.showhovereffect, a.showtaskhovereffect, a.showhovereffect, 1),
                            shadow: {opacity: ha(Ab, Qb) / 100, inverted: !0},
                            borderColor: ea(Vb, Qb),
                            borderThickness: c(J.showborder, D.showborder,
                                1) ? c(J.borderthickness, D.borderthickness, 1) : 0,
                            height: e(J.height, "35%"),
                            topPadding: e(J.toppadding, "35%"),
                            showPercentLabel: c(J.showpercentlabel, D.showpercentlabel, a.showpercentlabel, 0),
                            startDate: c(J.showstartdate, D.showstartdate, a.showtaskstartdate) ? Db : void 0,
                            endDate: c(J.showenddate, D.showenddate, a.showtaskenddate) ? Eb : void 0,
                            toolText: Ba,
                            _start: J.start,
                            _end: J.end,
                            _formatSDate: Db,
                            _formatEDate: Eb,
                            _label: ia
                        }
                    }, w.push(Ha[Ia(Ya, A)].dataObj);
                    kb = ha(kb, l);
                    jb = Fa(jb, C)
                }
                q.series.push({showInLegend: !1, data: w});
                F =
                    O && O.length;
                for (A = 0; A < F; A += 1)R = O[A], Ya = Ia(R.taskid, "").toUpperCase(), Pb = e(R.shape, "polygon").toLowerCase(), Nb = c(R.numsides, 5), Xb = 0, "star" === Pb ? Xb = .4 : (Pb = bc(Nb), Pb = bc(Nb).split("-")[0]), Da = e(R.color, f.getColor("legendBorderColor")), Ba = ac(Ea(e(R.tooltext, R.hovertext, a.milestonetooltext))), void 0 !== Ba && Ha[Ya] ? (J = Ha[Ya].dataObj, Ba = K.parseTooltext(Ba, [28, 32, 33, 34, 35, 36], {
                    date: t.getFormattedDate(R.date),
                    taskStartDate: J._formatSDate,
                    taskEndDate: J._formatEDate,
                    taskLabel: J._label,
                    taskPercentComplete: -1 !==
                    J.percentComplete ? t.percentValue(J.percentComplete) : "",
                    processName: G[J.processId] && G[J.processId].text
                }, R)) : Ba = t.getFormattedDate(R.date), T = {
                    color: ra(e(R.fontcolor, a.milestonefontcolor, p.color)),
                    fontSize: c(R.fontsize, a.milestonefontsize, x) + "px",
                    fontFamily: e(R.font, a.milestonefont, p.fontFamily),
                    fontWeight: c(R.fontbold, a.milestonefontbold, 0) && "bold" || "normal",
                    fontStyle: c(R.fontitalic, a.milestonefontitalic, 0) && "italic" || "normal"
                }, Na(T), aa.push({
                    numSides: Nb,
                    startAngle: c(R.startangle, 90),
                    radius: R.radius,
                    origDate: R.date,
                    date: t.getDateValue(R.date),
                    fillColor: ra(Da),
                    fillAlpha: .01 * c(R.fillalpha, R.alpha, 100),
                    borderColor: ra(e(R.bordercolor, Da)),
                    borderAlpha: .01 * c(R.borderalpha, R.alpha, 100),
                    displayValue: Ea(R.label),
                    style: T,
                    hoverFillColor: ra(e(R.hoverfillcolor, a.milestonehoverfillcolor, hb(Da, 80))),
                    hoverFillAlpha: .01 * c(R.hoverfillalpha, a.milestonehoverfillalpha, R.fillalpha, R.alpha, 100),
                    hoverBorderColor: ra(e(R.hoverbordercolor, a.milestonehoverbordercolor, hb(e(R.bordercolor, Da), 80))),
                    hoverBorderAlpha: .01 * c(R.hoverborderalpha,
                        a.milestonehoverborderalpha, R.borderalpha, R.alpha, 100),
                    showHoverEffect: c(R.showhovereffect, a.showmilestonehovereffect, a.showhovereffect, 1),
                    depth: Xb,
                    taskId: Ya,
                    borderThickness: c(R.borderthickness, 1),
                    link: R.link,
                    toolText: Ba
                });
                for (A = 0; A < M; A += 1)if (ib = (Wa = (za = ga[A]) && za.connector) && Wa.length)for (Y = 0; Y < ib; Y += 1)qa = Wa[Y], Xa = e(qa.color, za.color, f.getColor("plotBorderColor")), Sb = c(qa.alpha, za.alpha, 100), yb = c(qa.thickness, za.thickness, 1), tb = c(qa.isdashed, za.isdashed, 1), N.push({
                    fromTaskId: Ia(qa.fromtaskid, "").toUpperCase(),
                    toTaskId: Ia(qa.totaskid, "").toUpperCase(),
                    fromTaskConnectStart: c(qa.fromtaskconnectstart, 0),
                    toTaskConnectStart: c(qa.totaskconnectstart, 1),
                    color: ea(Xa),
                    alpha: .01 * Sb,
                    link: qa.link,
                    showHoverEffect: c(qa.showhovereffect, za.showhovereffect, a.showconnectorhovereffect, a.showhovereffect, 1),
                    hoverColor: ea(e(qa.hovercolor, za.hovercolor, a.connectorhovercolor, hb(Xa, 80)), c(qa.hoveralpha, za.hoveralpha, a.connectorhoveralpha, Sb)),
                    hoverThickness: c(qa.hoverthickness, za.hoverthickness, a.connectorhoverthickness, yb),
                    thickness: yb,
                    dashedStyle: tb ? Gb(c(qa.dashlen, za.dashlen, 5), c(qa.dashgap, za.dashgap, yb), yb) : "none"
                });
                q.legend.enabled = Boolean(c(a.showlegend, 1));
                q.legend.interactiveLegend = !1;
                q.legend.itemStyle.cursor = "default";
                q.legend.itemHoverStyle = {cursor: "inherit"};
                F = Ja && Ja.length;
                for (A = 0; A < F; A += 1)xb = Ja[A], Va(xb.label) && "" !== xb.label && q.series.push({
                    name: Ea(xb.label),
                    showInLegend: !0,
                    type: !1,
                    color: jc(e(xb.color, f.getPlotColor()))
                });
                q.max = kb;
                q.min = jb;
                q.chart.hasScroll = !0;
                return q
            }
        },
        spaceManager: function (b, a, I, d) {
            this.titleSpaceManager(b,
                a, I, .3 * d);
            var q = this.numberFormatter, k = b.chart, m = a.chart, z = b.dataTable, f = b.categories, g = b.scrollOptions = {}, w = z.__scrollOptions = {}, p = z.processHeader;
            d = d - k.marginTop - k.marginBottom;
            I = I - k.marginLeft - k.marginRight;
            var t = k.totalGridWidth, C = b.verticalScroll = {enabled: c(m.useverticalscrolling, 1)}, l = c(m.ganttpaneduration, -1), u = e(m.ganttpanedurationunit, "s").toLowerCase(), E = q.getDateValue(m.scrolltodate).ms, n = p && p.maxProcessHeight, h, y, q = 0;
            if (p) {
                h = p.processCount - p.countDefinedHeight;
                b.legend.enabled && (d -= this.placeLegendBlockBottom(b,
                    a, I, d / 2));
                d -= p.dimension.h;
                g.padding = c(m.scrollpadding, b.chart.plotBorderWidth / 2);
                g.height = c(m.scrollheight, 16);
                g.showButtons = !!c(m.scrollshowbuttons, 1);
                g.buttonPadding = c(m.scrollbtnpadding, 0);
                g.flatScrollBars = c(m.flatscrollbars, 0);
                g.color = ra(e(m.scrollcolor, this.colorManager.getColor("altHGridColor")));
                a = g.height + g.padding;
                t > k.ganttStartX && (w.enabled = !0, w.startPercent = Boolean(c(m.scrolltoend, 0)));
                I -= k.ganttStartX;
                f.scroll = {};
                g = new Date(f && f.min);
                if (-1 !== l) {
                    switch (u) {
                        case "y":
                            g.setFullYear(g.getFullYear() +
                                l);
                            break;
                        case "m":
                            g.setMonth(g.getMonth() + l);
                            break;
                        case "d":
                            g.setDate(g.getDate() + l);
                            break;
                        case "h":
                            g.setHours(g.getHours() + l);
                            break;
                        case "mn":
                            g.setMinutes(g.getMinutes() + l);
                            break;
                        default:
                            g.setSeconds(g.getSeconds() + l)
                    }
                    g = g.getTime();
                    g > b.min && g < b.max && (b.visibleMax = g, f.scroll.enabled = !0)
                }
                if (w.enabled || f.scroll.enabled)d -= a;
                w = d - p.totalHeight;
                g = w / (h ? h : p.processCount);
                !c(m.forcerowheight, 0) && !h && p.totalHeight < d && (g = d / p.processCount, w = d, y = !0);
                n > g && (n = 3 > n - g ? g : w / xa(w / n));
                p.maxProcessHeight = n;
                C.enabled &&
                g < n && h || 0 > g ? (w = n, C.startPercent = Boolean(c(m.scrolltoend, 0)), I -= a) : (C.enabled = !1, w = g);
                f.scroll.startPercent = c(m.scrolltoend, 0);
                if (Infinity === b.min || -Infinity === b.max || b.min === b.max)b.min = f.min = 0, b.max = f.max = 1;
                if (Infinity === f.min || -Infinity === f.max)f.min = b.min, f.max = b.max;
                f.axis = new Pa(b, I);
                f.startX = f.axis.getPixel(Fa(f.min, b.min));
                f.endX = f.axis.getPixel(ha(f.max, b.max));
                f.visibleW = I;
                E && E > f.min && E < f.max && (f.scroll.startPercent = Fa((f.axis.getPixel(E) - f.startX) / (f.endX - f.startX - f.visibleW), 1));
                for (p =
                         p.nextCol; p;) {
                    q += p.dimension.h = y ? w : p.processHeight || w;
                    if (b = p.nextRow)for (; b;)b.dimension = Sa({}, b.dimension), b.dimension.h = p.dimension.h, b = b.nextRow;
                    p = p.nextCol
                }
                z.processHeader.totalPH = z.processHeader.dimension.h + q;
                k.processHeight = d + z.processHeader.dimension.h
            }
        }
    }, tb.gaugebase);
    Ra("renderer.gantt", {
        drawProcess: function (b) {
            var a = this, c = a.options, d = c.chart, q = a.paper, k = a.logic, m = k.smartLabel, z = a.canvasTop, f = a.canvasLeft, g = a.layers, w = g.gridLayer, p = g.gridHeaderLayer, t = d.gridBorderThickness, C = .5 * t, l = d.gridBorderColor,
                u = d.gridBorderDashStyle, E = 0, n = 0, h = [], y = z, x = b.dimension.w || 16, P = b.dimension.x || 0, U = c.dataTable.processHeader, H = U.nextCol.dimension.h, ga = U.totalPH, k = ea(e(k.dataObj.chart.rolloverbandcolor, "#FF0000"), e(k.dataObj.chart.rolloverbandalpha, 30)), M = U.items || (U.items = {}), c = c.categories || {}, N, O, F, aa, D, ba, L, v, r, K, ca;
            M.hoverEle || (M.hoverEle = q.rect(c.startX, 0, c.endX, H, 0, g.dataset).attr({
                fill: k,
                visibility: "hidden",
                "stroke-width": 0
            }));
            r = function (b) {
                Z.call(this, a, b, "ProcessClick")
            };
            K = function (b) {
                pa = clearTimeout(pa);
                if (!X || X.removed)X = null;
                X && a.gridOutHandler.call(X);
                a.gridHoverHandler.call(this);
                Z.call(this, a, b, "ProcessRollOver")
            };
            for (ca = function (b) {
                X = this;
                pa = clearTimeout(pa);
                pa = setTimeout(function () {
                    a.gridOutHandler.call(X)
                }, 500);
                Z.call(X, a, b, "ProcessRollOut")
            }; b;)v = b.dimension, L = f + P, D = b.text, F = b.align, M = b.items || (b.items = {}), H = b.link, O = b.isHeader ? p : w, aa = M.background, c = Ja(y + n) - .5, F = {
                x: Ja(L + E) - .5,
                y: c,
                width: x + .5,
                height: v.h + C + .5,
                radius: 0,
                fill: b.bgColor || Oa,
                ishot: !0,
                "stroke-dasharray": u,
                stroke: l,
                cursor: H ? "pointer" :
                    "",
                "stroke-width": 0
            }, aa ? aa.attr(F) : (M.background = q.rect(O).attr(F).hover(K, ca), N = {
                isHeader: b.isHeader,
                label: b.text,
                vAlign: b.vAlign,
                align: b.align,
                link: b.link,
                id: b.id
            }, M.background.click(r).data("dataObj", b).data("eventArgs", N).data("data", {
                y: c,
                gridObj: b,
                rollOverColor: k,
                useHover: !0,
                useNext: !0,
                height: v.h + C + .5,
                hoverEle: U.items.hoverEle
            })), b.isNaN || (v = b.dimension, D = b.text, F = b.align, aa = M.label, D = b.text, Va(D) && "" !== D && (ba = b.style, m.setStyle(ba), D = m.getSmartText(D, x - 8, ha(Ua(ba.lineHeight, 10), v.h)), F = b.align,
                F = {
                    text: D.text,
                    ishot: !0,
                    x: L + x * ib[F] + Xa[F],
                    y: y + v.h - v.h * vb[b.vAlign],
                    "text-anchor": Wa[F],
                    direction: d.textDirection,
                    cursor: H ? "pointer" : "",
                    "vertical-align": b.vAlign
                }, aa ? aa.attr(F) : M.label = q.text(O).attr(F).css(ba).hover(K, ca).click(r).data("eventArgs", N).data("dataObj", b).data("data", {
                y: c,
                gridObj: b,
                rollOverColor: k,
                useHover: !0,
                height: v.h + C + .5,
                useNext: !0,
                hoverEle: U.items.hoverEle
            }).tooltip(D.oriText))), b.xPos = L, b.yPos = Ja(y + v.h) - t % 2 * .5, h.push("M", L, b.yPos, "h", x), (aa = M.hBorder) ? aa.attr("path", h) : M.hBorder =
                q.path(h, O).attr({
                    "stroke-dasharray": u,
                    stroke: l,
                    "stroke-width": t
                }), y += v.h, b.nextCol || (E = C, n -= 0, aa = b.first.items.vBorder, F = ["M", Ja(L + x) - t % 2 * .5, z, "v", ga], aa ? aa.attr("path", F) : b.first.items.vBorder = q.path(F, p).attr({
                "stroke-dasharray": u,
                stroke: l,
                "stroke-width": t
            }), b.nextRow && !b.isLast && (b.first.items.dragEle || (b.first.items.dragEle = q.path(F, g.gridTracker).attr({
                stroke: d.gridResizeBarColor,
                "stroke-width": d.gridResizeBarThickness,
                visibility: "hidden"
            })), b.first.items.tracker || (b.first.items.tracker = q.path(F,
                g.gridTracker).attr({
                stroke: Oa,
                ishot: !0,
                "stroke-width": 30
            }).css("cursor", ma.svg && "ew-resize" || "e-resize").drag(this.dragMove, this.dragStart, this.dragUp).data("drag-options", {
                grid: b.first,
                xPos: Ja(L + x) - t % 2 * .5,
                chart: a
            })))), b = b.nextCol
        }, dragStart: function () {
            var b = this.data("drag-options"), a = b.grid, I = a.items, d = a.nextRow, e = {style: {lineHeight: 16}}, k = a.nextCol.style || e, m = d && d.nextCol && d.nextCol.style || e, z = b.chart, f = z.canvasLeft, g = a.dimension, k = ha(Ua(a.style.lineHeight, 10), Ua(k.lineHeight, 10)) + 2, e = ha(Ua((d ||
                e).style.lineHeight, 10), Ua(m.lineHeight, 10)) + 2;
            b.leftSideLimit = f + c(a.dimension.x, 0) + k;
            b.rightSideLimit = f + c(d && d.dimension.x + d.dimension.w, g.x + g.w) - e;
            b.origX = b.lastX || (b.lastX = 0);
            I.dragEle.show();
            z.trackerClicked = !0;
            b.draged = !1
        }, dragMove: function (b) {
            var a = this.data("drag-options"), c = a.grid.items, d = a.xPos + b, e = a.leftSideLimit, k = a.rightSideLimit;
            d < e && (b = e - a.xPos);
            d > k && (b = k - a.xPos);
            d = {transform: "t" + (a.origX + b) + kc + 0};
            this.attr(d);
            c.dragEle.attr(d);
            a.draged = !0;
            a.lastX = b
        }, dragUp: function () {
            var b = this.data("drag-options"),
                a = b.chart, c = b.grid, d = c.nextRow, e = a.canvasLeft, k = c.dimension, m = d && d.dimension, z = c.items, f = {hcJSON: {dataTable: {}}};
            a.trackerClicked = !1;
            z.dragEle.hide();
            b.draged && (k.w = b.xPos + b.lastX - e - k.x, c.nextCol && (c.nextCol.dimension.w = k.w), f.hcJSON.dataTable[c.key] = {dimension: k}, d && (m.w += m.x - k.x - k.w, m.x = k.x + k.w, d.dimension.w = m.w, d.dimension.x = m.x, a.drawProcess(d), f.hcJSON.dataTable[d.key] = {dimension: m}), a.drawProcess(c), Sa(a.logic.chartInstance.jsVars._reflowData, f, !0), b.xPos += b.lastX, b.lastX += b.origX)
        }, drawCategories: function () {
            var b =
                this, a = b.options, e = a.chart, d = b.paper, q = b.layers, k = b.logic.smartLabel, m = b.canvasTop, z = a.categories, f = a.dataTable.processHeader, g = z.FCCAT_0_0, w = z.axis, p = z.endX, t = z.startX, C = p - t, l = e.ganttLineThickness, u = f.totalPH, E = [], n = [], h = q.dataset, q = q.ganttHeaderLayer, y, x, P, U, H, K, M, N, O, F, aa, D, ba, L, v;
            ba = function (a) {
                Z.call(this, b, a, "CategoryClick")
            };
            L = function (a) {
                pa = clearTimeout(pa);
                if (!X || X.removed)X = null;
                X && b.gridOutHandler.call(X);
                b.gridHoverHandler.call(this);
                Z.call(this, b, a, "CategoryRollOver")
            };
            v = function (a) {
                X =
                    this;
                pa = clearTimeout(pa);
                pa = setTimeout(function () {
                    b.gridOutHandler.call(X)
                }, 500);
                Z.call(X, b, a, "CategoryRollOut")
            };
            U = z.items || (z.items = {});
            f = a.dataTable.processHeader;
            for (U.hoverEle = d.rect(0, m + f.dimension.h, 50, f.totalPH - f.dimension.h, 0, h).attr({
                fill: Oa,
                visibility: "hidden",
                "stroke-width": 0
            }); g;)x = C / g.dimension.numCat, H = t + x * (g.index + 1), O = H - x, N = g.dimension.h, F = O, D = m + g.dimension.y, K = g.align, M = g.vAlign, P = g.link, U = g.items || (g.items = {}), x = !(!g.nextRow && g.nextCol), aa = a.verticalScroll.enabled && x ? a.scrollOptions.height :
                0, y = {
                align: g.align,
                vAlign: g.vAlign,
                link: g.link,
                text: g.text
            }, O = F = c(w.getPixel(g.start), O), H = c(w.getPixel(!x && g.nextCol.start || (x ? ha(g.end || 0, a.max) : void 0)), H), x = H - O, F = xa(F) + .5, D = xa(D) + .5, g.isLast && (E.push("M", F, D, "v", u - g.dimension.y), D -= .5 * l, N -= l, e.extendCategoryBg && d.rect(F, D, x, u, 0, h).attr({
                fill: g.bgColor,
                "stroke-width": 0,
                stroke: e.ganttLineColor
            }).toBack()), U.background = d.rect(F, D, x + aa, N, 0, q).attr({
                fill: g.bgColor,
                ishot: !0,
                "stroke-width": 0,
                cursor: P ? "pointer" : "",
                stroke: e.ganttLineColor
            }).click(ba).data("eventArgs",
                y).data("dataObj", g).hover(L, v).data("data", {
                x: F,
                width: x,
                gridObj: g,
                hoverEle: z.items.hoverEle
            }), n.push("M", F, D, "v", N), g.nextRow && n.push("M", t, D + N, "H", p + aa), k.setStyle(g.style), H = k.getSmartText(g.text, x - 5, N), U.label = d.text(q).attr({
                text: H.text,
                ishot: !0,
                x: F + x * ib[K] + Xa[K],
                y: D + N - N * vb[M],
                "text-anchor": Wa[K],
                cursor: P ? "pointer" : "",
                direction: e.textDirection,
                "vertical-align": M
            }).css(g.style).tooltip(H.oriText).hover(L, v).click(ba).data("eventArgs", y).data("dataObj", g).data("data", {
                x: F,
                width: x,
                gridObj: g,
                hoverEle: z.items.hoverEle
            }),
                g = g.nextCol;
            for (; f;)E.push("M", z.startX, f.yPos, "H", p), f = f.nextCol;
            U = z.items || (z.items = {});
            U.headerGrid = d.path(n, q).attr({
                "stroke-dasharray": e.ganttLineDashStyle,
                "stroke-width": l,
                stroke: e.ganttLineColor
            });
            U.processGrid = d.path(E, h).attr({
                "stroke-dasharray": e.ganttLineDashStyle,
                "stroke-width": e.ganttLineThickness,
                stroke: e.ganttLineColor
            })
        }, drawScroller: function () {
            var b = this, a = b.options, e = b.paper, d = b.layers, q = b.canvasTop, k = b.canvasHeight, m = a.scrollOptions, z = a.categories, f = z.startX, g = z.endX - f, w = m.flatScrollBars,
                p = {hcJSON: {categories: {scroll: {}}}}, t = d.dataset, C = d.datalabels, l = d.ganttTracker, u = d.ganttHeaderLayer, E = b.logic.chartInstance && b.logic.chartInstance.jsVars._reflowData || {}, n = a.chart, h = d.gridLayer, y = (f = a.dataTable) && f.processHeader, x = b.canvasLeft, P = b.canvasWidth, K = n.gridBorderThickness, H = n.totalGridWidth, ga = Fa(n.ganttStartX, H) + K, M = z.scroll, N = f && f.__scrollOptions, O = a.verticalScroll, F = {
                    hcJSON: {
                        dataTable: {__scrollOptions: {}},
                        verticalScroll: {}
                    }
                }, aa = F.hcJSON.dataTable.__scrollOptions, D = y.totalPH - y.dimension.h,
                ba = d.gridHeaderLayer, L = d.gridTracker, v, r, f = c(z.startX, n.ganttStartX), d = d.scroll = d.scroll || e.group("scroll").insertAfter(l);
            M.enabled && (a = z.visibleW / g, M.scroller = e.scroller(f, q + k - m.height, z.visibleW, m.height, !0, {
                showButtons: m.showButtons,
                displayStyleFlat: w,
                buttonWidth: m.buttonWidth,
                scrollRatio: a,
                scrollPosition: M.startPercent
            }, d).attr({"scroll-display-style": w, fill: m.color}).scroll(function (a) {
                r = -xa(a * (g - z.visibleW));
                t && t.transform(["T", r, t.data("vOffset")]);
                C && C.transform(["T", r, C.data("vOffset")]);
                l && l.transform(["T", r, l.data("vOffset")]);
                u && u.transform(["T", r, 0]);
                t && t.data("hOffset", r);
                C && C.data("hOffset", r);
                l && l.data("hOffset", r);
                p.hcJSON.categories.scroll.startPercent = a;
                Sa(E, p, !0)
            }), function () {
                var a;
                ma.eve.on("raphael.scroll.start." + M.scroller.id, function (c) {
                    a = c;
                    W.raiseEvent("scrollstart", {scrollPosition: c}, b.logic.chartInstance)
                });
                ma.eve.on("raphael.scroll.end." + M.scroller.id, function (c) {
                    W.raiseEvent("scrollend", {prevScrollPosition: a, scrollPosition: c}, b.logic.chartInstance)
                })
            }(), M.startPercent &&
            (r = -xa(M.startPercent * (g - z.visibleW)), t && t.data("hOffset", r), C && C.data("hOffset", r), l && l.data("hOffset", r), u && u.transform(["T", r, 0]), t && t.transform(["T", r, t.data("vOffset")]), C && C.transform(["T", r, t.data("vOffset")]), l && l.transform(["T", r, t.data("vOffset")])));
            N.enabled && (N.scroller = e.scroller(x, q + k - m.height, ga, m.height, !0, {
                showButtons: m.showButtons,
                displayStyleFlat: w,
                buttonWidth: m.buttonWidth,
                scrollRatio: ga / H,
                scrollPosition: N.startPercent
            }, d).attr({"scroll-display-style": w, fill: m.color}).scroll(function (a) {
                r = -xa(a * (H - ga));
                h && h.transform(["T", r, h.data("vOffset")]);
                ba && ba.transform(["T", r, 0]);
                L && L.transform(["T", r, L.data("vOffset")]);
                h.data("hOffset", r);
                ba.data("hOffset", r);
                L.data("hOffset", r);
                aa.startPercent = a;
                Sa(E, F, !0)
            }), function () {
                var a;
                ma.eve.on("raphael.scroll.start." + N.scroller.id, function (c) {
                    a = c;
                    W.raiseEvent("scrollstart", {scrollPosition: c}, b.logic.chartInstance)
                });
                ma.eve.on("raphael.scroll.end." + N.scroller.id, function (c) {
                    W.raiseEvent("scrollend", {prevScrollPosition: a, scrollPosition: c}, b.logic.chartInstance)
                })
            }(),
            N.startPercent && (r = -xa(N.startPercent * (H - ga)), h && h.transform(["T", r, 0]), L && L.transform(["T", r, 0]), ba && ba.transform(["T", r, 0]), h.data("hOffset", r), L.data("hOffset", r)));
            O.enabled && (v = n.processHeight - y.dimension.h, O.scroller = e.scroller(x + P - m.height, q + y.dimension.h, m.height, n.processHeight - y.dimension.h, !1, {
                showButtons: m.showButtons,
                displayStyleFlat: w,
                buttonWidth: m.buttonWidth,
                scrollRatio: v / D,
                scrollPosition: O.startPercent
            }, d).attr({"scroll-display-style": w, fill: m.color}).scroll(function (a) {
                r = -xa(a * (D -
                    v));
                h && h.transform(["T", h.data("hOffset"), r]);
                t && t.transform(["T", t.data("hOffset"), r]);
                C && C.transform(["T", C.data("hOffset"), r]);
                l && l.transform(["T", l.data("hOffset"), r]);
                L && L.transform(["T", L.data("hOffset"), r]);
                h.data("vOffset", r);
                L.data("vOffset", r);
                t.data("vOffset", r);
                l.data("vOffset", r);
                C.data("vOffset", r);
                F.hcJSON.verticalScroll.startPercent = a;
                Sa(E, F, !0)
            }), function () {
                var a;
                ma.eve.on("raphael.scroll.start." + O.scroller.id, function (c) {
                    a = c;
                    W.raiseEvent("scrollstart", {scrollPosition: c}, b.logic.chartInstance)
                });
                ma.eve.on("raphael.scroll.end." + O.scroller.id, function (c) {
                    W.raiseEvent("scrollend", {prevScrollPosition: a, scrollPosition: c}, b.logic.chartInstance)
                })
            }(), O.startPercent && (r = -xa(O.startPercent * (D - v)), h && h.transform(["T", h.data("hOffset"), r]), t && t.transform(["T", t.data("hOffset"), r]), C && C.transform(["T", C.data("hOffset"), r]), l && l.transform(["T", l.data("hOffset"), r]), L && L.transform(["T", L.data("hOffset"), r]), h.data("vOffset", r), L.data("vOffset", r), t.data("vOffset", r), C.data("vOffset", r), l.data("vOffset",
                r)))
        }, finalizeScrollPlots: function () {
            var b = this, a = b.options, c = b.canvasTop, d = a.categories, e = d.endX, k = d.startX, m = d.scroll, z = a.chart, f = a.dataTable, g = f && f.processHeader, w = b.canvasLeft, p = z.gridBorderThickness, t = z.totalGridWidth, C = Fa(z.ganttStartX, t) + p, l, u, E, n, h, y = e - k - d.visibleW, e = b.container, x = f && f.__scrollOptions, P = a.verticalScroll, U = g.totalPH, H = z.processHeight - g.dimension.h, ga, M, N, O, F, m = d.scroll, a = function (a) {
                var e = b.elements.canvas, f = O.left, p = O.top, q = a.type, r = ub && K.getTouchEvent(a) || mc, f = a.layerX ||
                    r.layerX || (a.pageX || r.pageX) - f;
                a = a.layerY || r.layerY || (a.pageY || r.pageY) - p;
                switch (q) {
                    case "dragstart":
                        F = e.isPointInside(f, a);
                        ga = f > k && f < k + d.visibleW;
                        N = f > w && f < k + d.visibleW && a > c + g.dimension.h;
                        M = f < k;
                        l = F && f || null;
                        u = F && a || null;
                        break;
                    case "dragend":
                        F = !1;
                        h = n = E = u = l = void 0;
                        break;
                    default:
                        if (!F || b.trackerClicked)break;
                        e = f - l;
                        q = a - u;
                        l = f;
                        u = a;
                        ga && m && m.scroller && (E = m.scroller.attrs["scroll-position"] - e / y, m.scroller.attr({"scroll-position": E}));
                        N && P && P.scroller && (n = P.scroller.attrs["scroll-position"] - q / (U - H), P.scroller.attr({"scroll-position": n}));
                        M && x && x.scroller && (h = x.scroller.attrs["scroll-position"] - e / (t - C), x.scroller.attr({"scroll-position": h}))
                }
            };
            ub && (O = K.getPosition(e), e && (oc(e, "dragstart drag dragend", a), nc(e, "dragstart drag dragend", a)))
        }, gridHoverHandler: function () {
            var b = this.data("data"), a = b.gridObj, c = !!a.prevRow, d = {};
            if (!a.isHeader)if (b.x && (d.x = b.x), b.y && (d.y = b.y), b.width && (d.width = b.width), b.height && (d.height = b.height), a.hoverColor && (d.fill = a.hoverColor), a.usePlotHover && b.hoverEle.attr(d).show(), b.useNext && a.useHover) {
                for (; a &&
                       c;)a = a.prevRow, c = !!a.prevRow;
                for (; a;)a.items.background.attr("fill", a.hoverColor), a = a.nextRow
            } else a.useHover && a.items.background.attr("fill", a.hoverColor)
        }, gridOutHandler: function () {
            var b = this.data("data"), a = b.gridObj, c = !!a.prevRow;
            if (!a.isHeader)if (a.usePlotHover && b.hoverEle.hide(), b.useNext && a.useHover) {
                for (; a && c;)a = a.prevRow, c = !!a.prevRow;
                for (; a;)a.items.background.attr("fill", a.bgColor || Oa), a = a.nextRow
            } else a.useHover && a.items.background.attr("fill", a.bgColor)
        }, drawAxes: function () {
            if (this.options.dataTable) {
                Ra["renderer.cartesian"].drawAxes.call(this,
                    arguments);
                var b = this.options, a = b.chart, e = this.paper, d = this.layers, q = d.layerBelowDataset, k = d.layerAboveDataset, m = d.gridLayer, z = d.dataset, f = b.dataTable, g = b.categories, f = f && f.processHeader, w = this.canvasTop, z = this.canvasLeft, m = a.gridBorderThickness, p = Fa(a.ganttStartX, a.totalGridWidth) + m, t = f.dimension, C = t.h, t = a.processHeight - t.h, l = c(g.startX, a.ganttStartX), g = g.visibleW, a = .5 * a.ganttLineThickness, m = .5 * m, m = d.gridLayer = d.gridLayer || e.group("grid", q).attr({"clip-rect": [z, w + C + m, p, t - m]});
                d.gridHeaderLayer = d.gridHeaderLayer ||
                    e.group("grid-header", q).attr({"clip-rect": [z, w, p, C + t]});
                q = d.gridTracker = d.gridTracker || e.group("grid-tracker", q).attr({"clip-rect": [z, w, p, C + t]});
                m.data("vOffset", 0);
                m.data("hOffset", 0);
                q.data("vOffset", 0);
                q.data("hOffset", 0);
                d.ganttHeaderLayer = d.ganttHeaderLayer || e.group("gantt", k).attr({"clip-rect": [l, w, g + (b.verticalScroll.enabled ? b.scrollOptions.height : 0), this.chartHeight]});
                z = d.dataset.attr({"clip-rect": [l, w + C - a, g, t + a]});
                b = d.datalabels.attr({"clip-rect": [l, w + C - a - 10, g, t + a + 10]});
                e = d.ganttTracker =
                    e.group("gantt-hot", d.tracker).attr({"clip-rect": [l, w + C - a, g, t + a]});
                z.data("vOffset", 0);
                z.data("hOffset", 0);
                b.data("vOffset", 0);
                b.data("hOffset", 0);
                e.data("vOffset", 0);
                for (e.data("hOffset", 0); f;)this.drawProcess(f), f = f.nextRow;
                this.drawCategories()
            }
        }, drawPlotGantt: function (b) {
            var a = this, I = a.options, d = I.chart, q = a.paper, k = a.layers, m = b.data, z = b.items, f = m.length, g = k.dataset, w = k.datalabels, p = I.dataTable, t = p.processHeader, C = I.categories, l = C.axis, u = a.canvasTop, E = d.taskBarRoundRadius, f = I.plotOptions.series,
                n = isNaN(+f.animation) && f.animation.duration || 1E3 * f.animation, h = I.tasksMap || (I.tasksMap = {}), y = I.milestone, x = I.trendlines, P = t.dimension.h, K = d.taskDatePadding, H, ga, M, N, O, F, aa, D, ba, L, v, r, X, ca, ea, W, ha, B, S, da, G;
            b.graphics = [];
            ea = g.shadows || (g.shadows = q.group("shadows", g));
            f = x && x.length;
            for (b = 0; b < f; b += 1)v = x[b], v.end || (v.end = v.start), v.end && (S = l.getPixel(v.start), W = l.getPixel(v.end), da = v.thickness, I = v.items || (v.items = {}), H = void 0, v.isTrendZone ? (L = ["M", S + .5 * (W - S), u + P, "v", u + t.totalPH], da = W - S) : (L = ["M", S, u + P,
                "L", W, u + P + t.totalPH], H = v.dashedStyle), I.trendLine = q.path(L, g).attr({
                stroke: v.color,
                "stroke-width": da,
                "stroke-dasharray": H
            }), Va(v.displayValue) && "" !== v.displayValue && (I.label = q.text(k.ganttHeaderLayer).attr({
                text: v.displayValue,
                direction: d.textDirection,
                x: L[1],
                y: 0
            }).css(v.style), H = I.label._getBBox().height, v = u + d.processHeight + (!C.scroll.enabled || d.marginBottom < H ? .5 * H : -(.5 * H) - 5), I.label.attr("y", v)));
            w.hide();
            k = function () {
                w.show()
            };
            x = t = function (b) {
                Z.call(this, a, b)
            };
            C = function (b) {
                Z.call(this, a, b, "DataPlotRollOver")
            };
            u = function (b) {
                Z.call(this, a, b, "DataPlotRollOut")
            };
            P = function (b) {
                b && b.click(function (b) {
                    Z.call(this, a, b)
                }).hover(function (b) {
                    var c = this.data("dataObj");
                    Z.call(this, a, b, "DataPlotRollOver");
                    c.showHoverEffect && a.taskHoverHandler.call(this, a)
                }, function (b) {
                    var c = this.data("dataObj");
                    Z.call(this, a, b, "DataPlotRollOut");
                    c.showHoverEffect && a.taskHoverOutHandler.call(this, a)
                }).data("dataObj", B).data("eventArgs", ga)
            };
            f = m.length;
            for (b = 0; b < f; b += 1)B = m[b], I = B.processId, v = p[I], W = ha = B.color, I = B.items || (B.items = {}),
                L = B.animation ? n || 1E3 : 0, v && (G = B.borderThickness, S = xa(l.getPixel(B.start)), da = cc(N = l.getPixel(B.end) - S), S && da && (M = v.dimension.h, v = v.yPos - M, H = M * (/%/g.test(B.height) && .01 * Ib(B.height, 10)) || c(B.height, M), r = M * (/%/g.test(B.topPadding) && .01 * Ib(B.topPadding, 10)) || c(B.topPadding, M), v += Fa(r, M - H), ca = .5 * H, X = B.toolText, r = B.link, (M = z[b]) || (M = z[b] = {
                index: b,
                dataLabel: null,
                start: B.start,
                end: B.end,
                startLabel: null,
                endLabel: null,
                tracker: null
            }), B.index = b, O = e(B.id, b), "" !== O && h[O] && (h[O].items = M, h[O].x = S, h[O].y = v, h[O].h =
                H, h[O].w = da), N = O = F = aa = D = ba = null, B.showAsGroup ? (L ? (N = q.path(["M", S, v], g), N.animate({path: ["M", S, v, "v", H, "L", S + ca, v + ca, "H", S + da - ca, "L", S + da, v + H, "v", -H, "H", S]}, L, "normal", k)) : (N = q.path(["M", S, v, "v", H, "L", S + ca, v + ca, "H", S + da - ca, "L", S + da, v + H, "v", -H, "H", S], g), k && k()), N.attr({
                fill: W,
                stroke: B.borderColor,
                cursor: r ? "pointer" : "",
                ishot: !0,
                "stroke-width": B.borderThickness
            }).tooltip(X).shadow(d.shadow && B.shadow, ea)) : (-1 !== B.percentComplete && (N = da * B.percentComplete * .01, W = Oa, O = I.taskFill = q.rect(S, v, 0, H, 0, g).attr({
                fill: ha,
                cursor: r ? "pointer" : "", ishot: !0, "stroke-width": 0, width: L ? 0 : N || 1
            }).tooltip(X), L && O.animate({width: N || 1}, L, "normal"), F = q.rect(S, v, 0, H, 0, g).attr({
                fill: B.slackColor,
                cursor: r ? "pointer" : "",
                ishot: !0,
                "stroke-width": 0,
                x: L ? S : S + N || 1,
                width: L ? 0 : da - N || 1
            }).tooltip(X), L && F.animate({
                x: S + N || 1,
                width: da - N || 1
            }, L, "normal")), I = ma.crispBound(S, v, da, H, G), N = q.rect(I.x, I.y, 0, I.height, E, g).attr({
                fill: W,
                stroke: B.borderColor,
                cursor: r ? "pointer" : "",
                ishot: !0,
                "stroke-width": B.borderThickness,
                width: L ? 0 : I.width || 1
            }).tooltip(X).shadow(d.shadow &&
                B.shadow, ea), L ? N.animate({width: I.width || 1}, L, "normal", k) : k && k()), Va(B.label) && "" !== B.label && (I = B.labelAlign, aa = q.text().attr({
                text: B.label,
                x: S + da * ib[I] + Xa[I],
                "text-anchor": Wa[I],
                direction: d.textDirection,
                cursor: r ? "pointer" : "",
                ishot: !0,
                y: v - .5 * Ua(B.style.lineHeight, 10) - d.taskLabelPadding
            }).css(B.style), w.appendChild(aa)), Va(B.startDate) && "" !== B.startDate && (D = q.text().attr({
                text: B.startDate,
                x: S - 2 - K,
                y: v + .5 * H,
                cursor: r ? "pointer" : "",
                ishot: !0,
                direction: d.textDirection,
                "text-anchor": "end"
            }).css(B.style),
                w.appendChild(D)), Va(B.endDate) && "" !== B.endDate && (ba = q.text().attr({
                text: B.endDate,
                x: S + da + 2 + K,
                y: v + .5 * H,
                cursor: r ? "pointer" : "",
                ishot: !0,
                direction: d.textDirection,
                "text-anchor": "start"
            }).css(B.style), w.appendChild(ba)), M.graphic = N, M.percentCompleteGraphic = O, M.slackGraphic = F, M.dataLabel = aa, M.startLabel = D, M.endLabel = ba, ga = {
                processId: B.processId,
                taskId: B.id,
                start: B._start,
                end: B._end,
                showAsGroup: B.showAsGroup,
                link: B.link,
                sourceType: "task",
                percentComplete: -1 !== B.percentComplete && B.percentComplete
            }, O && O.click(t).hover(C,
                u).data("eventArgs", ga), F && F.click(x).data("eventArgs", ga), Ta([N, aa, D, ba], P)));
            p = function (b) {
                Z.call(this, a, b, "MilestoneClick")
            };
            E = function (b) {
                var c = this.data("dataObj");
                Z.call(this, a, b, "MilestoneRollOver");
                c.showHoverEffect && c.items.graphic.attr({
                    fill: c.hoverFillColor,
                    stroke: c.hoverBorderColor,
                    "fill-opacity": c.hoverFillAlpha,
                    "stroke-opacity": c.hoverBorderAlpha
                })
            };
            K = function (b) {
                var c = this.data("dataObj");
                Z.call(this, a, b, "MilestoneRollOut");
                c.showHoverEffect && c.items.graphic.attr({
                    fill: c.fillColor,
                    stroke: c.borderColor, "fill-opacity": c.fillAlpha, "stroke-opacity": c.borderAlpha
                })
            };
            this.drawConnectors();
            I = null;
            f = y && y.length;
            for (b = 0; b < f; b += 1)m = y[b], v = h[m.taskId], I = m.items || (m.items = {}), v && (z = ma.animation({
                "fill-opacity": m.fillAlpha,
                "stroke-opacity": m.borderAlpha
            }, n, "normal"), ga = {
                sides: m.sides,
                date: m.origDate,
                radius: m.radius,
                taskId: m.taskId,
                toolText: m.toolText,
                link: m.link,
                numSides: m.numSides
            }, I.graphic = q.polypath(m.numSides, l.getPixel(m.date.ms), v.y + .5 * v.h, c(m.radius, .6 * v.h), m.startAngle, m.depth,
                g).attr({
                fill: m.fillColor,
                "fill-opacity": n ? 0 : m.fillAlpha,
                stroke: m.borderColor,
                "stroke-opacity": n ? 0 : m.borderAlpha,
                groupId: "gId" + b,
                ishot: !0,
                cursor: m.link ? "pointer" : "",
                "stroke-width": m.borderThickness
            }).tooltip(m.toolText).click(p).data("eventArgs", ga).data("dataObj", m), I.label = q.text().attr({
                text: m.displayValue,
                x: l.getPixel(m.date.ms),
                y: v.y + .5 * v.h,
                groupId: "gId" + b,
                cursor: m.link ? "pointer" : "",
                ishot: !0,
                direction: d.textDirection,
                "text-anchor": "middle"
            }).css(m.style).tooltip(m.toolText).click(p).data("eventArgs",
                ga).data("dataObj", m), w.appendChild(I.label), n && I.graphic.animate(z.delay(n)), I.graphic.hover(E, K), I.label.hover(E, K))
        }, taskHoverOutHandler: function (b) {
            var a = b.options.tasksMap;
            b = this.data("dataObj");
            var a = a[e(b.id, b.index)].items, c = {
                fill: b.color,
                stroke: b.borderColor,
                "stroke-width": b.borderThickness,
                "stroke-dasharray": b.dashedStyle
            };
            -1 === b.percentComplete || b.showAsGroup || (a.slackGraphic.attr({fill: b.slackColor}), a.percentCompleteGraphic.attr({fill: b.color}), delete c.fill);
            a.graphic.attr(c)
        }, taskHoverHandler: function (b) {
            var a =
                b.options.tasksMap;
            b = this.data("dataObj");
            var a = a[e(b.id, b.index)].items, c = {fill: b.hoverFillColor, stroke: b.hoverBorderColor};
            -1 === b.percentComplete || b.showAsGroup || (a.slackGraphic.attr({fill: b.slackHoverColor}), a.percentCompleteGraphic.attr({fill: b.hoverFillColor}), delete c.fill);
            a.graphic.attr(c)
        }, drawConnectors: function () {
            var b = this, a = b.paper, c = b.options, d = c.chart.connectorExtension, e = c.connectors, k = c.tasksMap, m = e.length, z = b.layers.dataset, f = [], c = c.plotOptions.series, c = isNaN(+c.animation) && c.animation.duration ||
                1E3 * c.animation, g, w, p, t, C, l, u, E, n, h, y, x, K, U, H;
            K = function (a) {
                Z.call(this, b, a, "ConnectorClick")
            };
            U = function (a) {
                var c = this.data("dataObj"), d = k[c.fromTaskId], e = k[c.toTaskId], f = {
                    stroke: c.hoverColor,
                    "stroke-dasharray": c.dashedStyle,
                    "stroke-width": c.hoverThickness
                };
                Z.call(this, b, a, "ConnectorRollOver");
                c.showHoverEffect && (Ta([d, e], function (a) {
                    var b = {fill: a.dataObj.hoverFillColor, stroke: a.dataObj.hoverBorderColor};
                    -1 === a.dataObj.percentComplete || a.dataObj.showAsGroup || (a.items.slackGraphic.attr({fill: a.dataObj.slackHoverColor}),
                        a.items.percentCompleteGraphic.attr({
                            fill: a.dataObj.hoverFillColor,
                            stroke: a.dataObj.hoverBorderColor
                        }), delete b.fill);
                    a.items.graphic.attr(b)
                }), c.items.connector.attr(f))
            };
            H = function (a) {
                var c = this.data("dataObj"), d = k[c.fromTaskId], e = k[c.toTaskId], f = {
                    stroke: c.color,
                    "stroke-width": c.thickness,
                    "stroke-dasharray": c.dashedStyle
                };
                Z.call(this, b, a, "ConnectorRollOut");
                c.showHoverEffect && (Ta([d, e], function (a) {
                    var b = {
                        fill: a.dataObj.color, stroke: a.dataObj.borderColor, "stroke-width": a.dataObj.borderThickness,
                        "stroke-dasharray": a.dataObj.dashedStyle
                    };
                    -1 === a.dataObj.percentComplete || a.dataObj.showAsGroup || (a.items.slackGraphic.attr({fill: a.dataObj.slackColor}), a.items.percentCompleteGraphic.attr({fill: a.dataObj.color}), delete b.fill);
                    a.items.graphic.attr(b)
                }), c.items.connector.attr(f))
            };
            for (g = 0; g <= m; g += 1)if (p = e[g] || {}, l = p.fromTaskId, t = p.toTaskId, w = k[l], n = k[t], t = p.items || (p.items = {}), w && n) {
                h = w.y + .5 * w.h;
                y = n.y + .5 * n.h;
                C = h == y;
                l = w.x;
                u = w.x + w.w;
                E = n.x;
                n = n.x + n.w;
                x = x = 0;
                0 === p.fromTaskConnectStart && 1 === p.toTaskConnectStart &&
                (x = 1);
                0 === p.fromTaskConnectStart && 0 === p.toTaskConnectStart && (x = 2);
                1 === p.fromTaskConnectStart && 1 === p.toTaskConnectStart && (x = 3);
                1 === p.fromTaskConnectStart && 0 === p.toTaskConnectStart && (x = 4);
                if (C)switch (w = w.height, x) {
                    case 1:
                        x = (E - u) / 10;
                        f = ["M", u, h, u + x, h, "L", u + x, h, u + x, h - w, "L", u + x, h - w, E - x, h - w, "L", E - x, h - w, E - x, h, "L", E - x, h, E, y, "L", n + d, y, n, y];
                        break;
                    case 2:
                        f = ["M", u, h, u + d, h, "L", u + d, h, u + d, h - w, "L", u + d, h - w, n + d, h - w, "L", n + d, y - w, n + d, y];
                        break;
                    case 3:
                        f = ["M", l, h, l - d, h, "L", l - d, h, l - d, h - w, "L", l - d, h - w, E - d, h - w, "L", E - d, h - w, E -
                        d, h, "L", E - d, h, E, h];
                        break;
                    case 4:
                        f = ["M", l, h, l - d, h, "L", l - d, h, l - d, h - w, "L", l - d, h - w, n + d, h - w, "L", n + d, h - w, n + d, h, "L", n + d, h, n, h]
                } else switch (x) {
                    case 1:
                        f = ["M", u, h, u + (E - u) / 2, h, "L", u + (E - u) / 2, h, u + (E - u) / 2, y, "L", u + (E - u) / 2, y, E, y];
                        f = u <= E ? ["M", u, h, u + (E - u) / 2, h, "L", u + (E - u) / 2, h, u + (E - u) / 2, y, "L", u + (E - u) / 2, y, E, y] : ["M", u, h, u + d, h, "L", u + d, h, u + d, h + (y - h) / 2, "L", u + d, h + (y - h) / 2, E - d, h + (y - h) / 2, "L", E - d, h + (y - h) / 2, E - d, y, "L", E - d, y, E, y];
                        break;
                    case 2:
                        x = 0 > n - u ? 0 : n - u;
                        f = ["M", u, h, u + d + x, h, "L", u + d + x, h, u + d + x, y, "L", u + d + x, y, n, y];
                        break;
                    case 3:
                        x = 0 >
                        l - E ? 0 : l - E;
                        f = ["M", l, h, l - d - x, h, "L", l - d - x, h, l - d - x, y, "L", l - d - x, y, E, y];
                        break;
                    case 4:
                        f = l > n ? ["M", l, h, l - (l - n) / 2, h, "L", l - (l - n) / 2, h, l - (l - n) / 2, y, "L", l - (l - n) / 2, y, n, y] : ["M", l, h, l - d, h, "L", l - d, h, l - d, h + (y - h) / 2, "L", l - d, h + (y - h) / 2, n + d, h + (y - h) / 2, "L", n + d, h + (y - h) / 2, n + d, y, "L", n + d, y, n, y]
                }
                t.connector ? t.connector.animate({path: f}) : (l = ma.animation({"stroke-opacity": p.alpha}, c, "normal"), t.connector = a.path(f, z).attr({
                    stroke: p.color,
                    "stroke-opacity": 0,
                    "stroke-width": p.thickness,
                    "stroke-dasharray": p.dashedStyle
                }).animate(l.delay(c)));
                l = {
                    fromTaskId: p.fromTaskId,
                    toTaskId: p.toTaskId,
                    fromTaskConnectStart: p.fromTaskConnectStart,
                    toTaskConnectStart: p.toTaskConnectStart,
                    link: p.link,
                    sourceType: "connector"
                };
                t.tracker = a.path(f, z).attr({
                    stroke: Oa,
                    "stroke-width": ha(p.thickness, 10),
                    ishot: !0,
                    cursor: p.link ? "pointer" : ""
                }).data("dataObj", p).data("eventArgs", l).click(K);
                t.tracker.hover(U, H)
            }
        }
    }, Ra["renderer.cartesian"])
}]);
