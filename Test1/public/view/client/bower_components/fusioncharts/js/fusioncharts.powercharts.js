/*
 FusionCharts JavaScript Library
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>

 @version 3.10.1
 */
FusionCharts.register("module", ["private", "modules.renderer.js-gradientlegend", function () {
    function fb(f, h, Aa) {
        var L = f[0], H = f[1];
        f = f[2];
        L += (h[0] - L) * Aa;
        H += (h[1] - H) * Aa;
        h = f + (h[2] - f) * Aa;
        return {hex: (B + (L << 16 | H << 8 | h).toString(16)).slice(-6), rgb: [L, H, h]}
    }

    function Bb(f, h) {
        return f.maxvalue - h.maxvalue
    }

    function hb(h) {
        var B, Aa, L = h.colorRange || {}, H = h.dataMin, w = h.dataMax, ua = h.sortLegend || !1, A = h.mapByCategory || !1, G = h.defaultColor, pa = h.numberFormatter, I = L.color;
        h = this.colorArr = [];
        var O, ca, ia;
        this.mapByCategory = A;
        "1" === L.mapbypercent && (this.mapbypercent = !0);
        if ("1" === L.gradient && !A) {
            this.gradient = !0;
            Aa = Nb(Oa(L.startcolor, L.mincolor, L.code));
            ua = Fb(Nb(Oa(Aa, G, "CCCCCC")));
            A = this.scaleMin = Ua(L.startvalue, L.minvalue, this.mapbypercent ? 0 : H);
            h.push({code: Aa, maxvalue: A, label: P(L.startlabel), codeRGB: Fb(Aa)});
            if (I && (B = I.length))for (H = 0; H < B; H += 1)G = I[H], Aa = Nb(Oa(G.color, G.code)), ca = Ua(G.value, G.maxvalue), ia = Ua(G.minvalue), ca > A && h.push({
                code: Aa,
                maxvalue: ca,
                userminvalue: ia,
                label: P(Oa(G.label, G.displayvalue)),
                codeRGB: Fb(Aa)
            });
            h.sort(Bb);
            B = h.length;
            for (H = 1; H < B; H += 1)G = h[H], Aa = G.maxvalue - A, 0 < Aa ? (G.minvalue = A, G.range = Aa, A = G.maxvalue) : (h.splice(H, 1), --H, --B);
            2 <= h.length && (this.scaleMax = A, h[H - 1].label = Oa(L.endlabel, h[H - 1].label, h[H - 1].displayvalue));
            1 === h.length && (ca = Ua(L.maxvalue, this.mapbypercent ? 100 : w), h.push({
                minvalue: A,
                maxvalue: ca,
                range: ca - A,
                label: L.endlabel
            }), this.scaleMax = ca, delete h[0].code);
            L = h[0];
            w = h[h.length - 1];
            L.code && w.code || (Aa = f(ua), B = E((Aa[2] = 0, Aa)), Aa = E((Aa[2] = 100, Aa)), L.code || (L.codeRGB = B, L.code = W(B)), w.code ||
            (w.codeRGB = Aa, w.code = W(Aa)));
            B = h.length;
            for (H = 1; H < B; H += 1)if (G = h[H], G.code) {
                if (O)for (w = G, ia = L.maxvalue, I = w.maxvalue - ia; O < H; O += 1)ua = h[O], Aa = fb(L.codeRGB, w.codeRGB, (ua.maxvalue - ia) / I), ua.code = Aa.hex, ua.codeRGB = Aa.rgb;
                O = null;
                L = G
            } else O = O || H;
            if (void 0 === this.scaleMin || void 0 === this.scaleMax)this.noValidRange = !0
        } else if (I && (B = I.length)) {
            for (H = 0; H < B; H += 1)G = I[H], Aa = Oa(G.color, G.code), ca = Ua(G.maxvalue), ia = Ua(G.minvalue), O = Oa(G.label, G.displayvalue, A ? ha : pa.dataLabels(ia) + " - " + pa.dataLabels(ca)), (Aa && ca > ia ||
            A && O) && h.push({code: Aa, maxvalue: ca, minvalue: ia, label: P(O), labelId: O.toLowerCase()});
            h.length ? ua && h.sort(Bb) : this.noValidRange = !0
        }
    }

    function I(f, h) {
        return h ? wa(100 * f) / 100 + "%" : eb(f, ha).toString()
    }

    var w = this, Ea = w.hcLib, Va = w.window, Va = /msie/i.test(Va.navigator.userAgent) && !Va.opera, Ua = Ea.pluckNumber, B = Ea.COLOR_BLACK, Rb = Ea.COLOR_GLASS, db = Ea.FC_CONFIG_STRING, h = Ea.graphics, E = h.HSBtoRGB, f = h.RGBtoHSB, W = h.RGBtoHex, Fb = h.HEXtoRGB, G = Ea.COMMASTRING, ha = Ea.BLANKSTRING, P = Ea.parseUnsafeString, ta = Ea.graphics.convertColor,
        pa = Ea.POSITION_TOP, mb = Ea.POSITION_MIDDLE, Za = Ea.POSITION_START, Ob = Ea.POSITION_END, Sb = Ea.graphics.getDarkColor, jb = Ea.graphics.getLightColor, Oa = Ea.pluck, eb = Ea.getValidValue, nb = Ea.toRaphaelColor, sb = Ea.hasTouch, wa = Math.round, Pa = Math.max, ca = Math.min, Ba = Math.abs, ra, Qa, tb, $b = "rgba(192,192,192," + (Va ? .002 : 1E-6) + ")", Nb = function (f) {
            return f && f.replace(/^#?([a-f0-9]+)/ig, "$1")
        };
    hb.prototype = {
        getColorObj: function (f) {
            var h = this.colorArr, B = this.gradient ? 1 : 0, L = h[B], w;
            if (this.mapByCategory) {
                for (f = P(f).toLowerCase(); L;) {
                    if (L.labelId ===
                        f)return {code: L.code, seriesIndex: B};
                    B += 1;
                    L = h[B]
                }
                return {outOfRange: !0}
            }
            if (this.gradient) {
                if (this.scaleMin <= f && this.scaleMax >= f) {
                    for (; L && L.maxvalue < f;)B += 1, L = h[B];
                    f = (f - L.minvalue) / L.range;
                    return {code: fb(h[B - 1].codeRGB, L.codeRGB, f).hex}
                }
                return {outOfRange: !0}
            }
            for (; L;) {
                if (L.maxvalue > f && L.minvalue <= f)return {code: L.code, seriesIndex: B};
                L.maxvalue === f && (w = B);
                B += 1;
                L = h[B]
            }
            return (L = h[w]) && L.maxvalue === f ? {code: L.code, seriesIndex: w} : {outOfRange: !0}
        }
    };
    hb.prototype.constructor = hb;
    Ea.colorRange = hb;
    ra = Ea.configureGradientLegendOptions =
        function (f, h) {
            var w = f.legend, L = h.chart;
            w.legendSliderBorderWidth = Ua(L.legendpointerborderthickness, 1);
            w.legendSliderBorderColor = ta(Oa(L.legendpointerbordercolor, Sb("ABABAB", 70)), Ua(L.legendpointerborderalpha, 100));
            w.legendSliderWidth = Ua(L.legendpointerwidth, L.legendpointerswidth, 12);
            w.legendSliderHeight = Ua(L.legendpointerheight, L.legendpointersheight, 12);
            w.legendColorBoxBorderColor = w.borderColor;
            w.legendColorBoxBorderWidth = w.borderWidth;
            w.legendScaleColor = ta(Oa(L.legendscalelinecolor, B), Ua(L.legendscalelinealpha,
                100));
            w.legendScalePadding = Ua(L.legendscalepadding, 4);
            w.legendScaleLineThickness = Ua(L.legendscalelinethickness, 1);
            w.legendScaleTickDistance = Ua(L.legendscaletickdistance, 6);
            w.itemStyle.cursor = "default";
            w.interActivity = Ua(L.interactivelegend, 1);
            w.legendSliderColor = ta(Oa(L.legendpointercolor, jb("ABABAB", 50)), Ua(L.legendpointeralpha, 100))
        };
    Ea.placeGLegendBlockRight = function (f, h, B, w, H) {
        this.configureLegendOptions(f, h.chart, !0, H, B);
        ra(f, h);
        H = this.snapLiterals || (this.snapLiterals = {});
        var G = f[db], ua = this.smartLabel ||
            G.smartLabel, A = f.legend, pa = f.chart.spacingRight, E, P, O = A.textPadding = 2, wa = 2 * O, ia = A.title.padding, aa = 0, W = 0, Ba = 2 * A.padding;
        h = Ua(h.chart.legendpadding, 7) + A.borderWidth / 2 + 1;
        var Z = f.colorRange || {}, Ka = Z.colorArr, Ea = Z.mapbypercent, ta = Z.scaleMin, Oa = Z.scaleMax - ta, Qa = A.legendSliderWidth, Q = A.legendSliderHeight / 2;
        P = A.legendScalePadding;
        var z = A.legendScaleTickDistance, qa = A.itemStyle || {};
        E = Ua(parseInt(qa.lineHeight, 10) || 12);
        var Xa = .75 * E, La = B - Ba, Ia, za, Ja = 0, Ra, r, ga, Ca, Ma, Ga, Ta;
        w -= Ba;
        if (!Z.noValidRange && Ka && 1 < (za =
                Ka.length)) {
            --za;
            A.title.text !== ha && (ua.setStyle(A.title.style), E = ua.getSmartText(A.title.text, La, Pa(E, w / 4)), A.title.text = E.text, aa = E.width + Ba, w -= W = E.height + ia);
            ua.setStyle(qa);
            E = ua.lineHeight;
            La -= z + P + Qa;
            A.colorBoxX = Qa;
            ia = Pa(E, La / 2);
            La = ca(La - ia - 4, E);
            Ra = Pa(E, w / 2);
            Ia = w / 4;
            z = Ka[0];
            z.scaleLabel = I(z.maxvalue, Ea);
            E = ua.getSmartText(z.label, Ia, La);
            z.label = E.text;
            qa = E.height;
            z.labelY = Xa - E.height / 2;
            P = ua.getSmartText(z.scaleLabel, ia, Ra);
            z.scaleLabel = P.text;
            Z = P.height / 2;
            r = P.width;
            z.scaleLabelY = Xa - P.height / 2;
            A.colorBoxY =
                Pa(Z, E.width + wa, Q) + W;
            z = Ta = Ka[za];
            z.scaleLabel = I(z.maxvalue, Ea);
            E = ua.getSmartText(z.label, Ia, La);
            z.label = E.text;
            qa = Pa(qa, E.height);
            z.labelY = Xa - E.height / 2;
            P = ua.getSmartText(z.scaleLabel, ia, Ra);
            z.scaleLabel = P.text;
            r = Pa(r, P.width);
            Ia = P.height / 2;
            E = Pa(E.width + wa, Ia, Q);
            z.scaleLabelY = Xa - P.height / 2;
            A.colorBoxHeight = Q = w - A.colorBoxY - E;
            Ra = Q - Ia;
            ga = Q / Oa;
            Ma = ca(Q - Ja, Ra - Z) - 4;
            for (Ia = 1; Ia < za; Ia += 1)z = Ka[Ia], Ca = (z.maxvalue - ta) * ga, E = ua.getSmartText(z.label, 2 * ca(Ca - Ja, Q - Ca), La), z.label = E.text, qa = Pa(qa, E.height), z.labelY =
                Xa - E.height / 2, E = E.width / 2, z.scaleLabel = I(z.maxvalue, Ea), P = ua.getSmartText(z.scaleLabel, ia, 2 * ca(Ca - Z, Ra - Ca)), z.scaleLabel = P.text, r = Pa(r, P.width), Ga = P.height / 2, z.scaleLabelY = Xa - P.height / 2, Ma = ca(Ma, (Ca - Pa(Ga + Z, E + Ja) - 4) * Oa / z.range), Ja = E + Ca, Z = Ga + Ca;
            Ma = Pa(ca(Ma, (ca(Ra - Z, Q - Ja) - 4) * Oa / Ta.range, .3 * w), 0);
            A.colorBoxHeight -= Ma;
            A.colorBoxWidth = qa && qa + wa || 15;
            A.height = A.totalHeight = w + W + Ba - Ma;
            A.width = (r && r + O) + A.colorBoxWidth + Qa + A.legendScaleTickDistance + A.legendScalePadding + Ba;
            A.width < aa && (A.colorBoxX += (aa - A.width) /
                2, A.width = aa);
            A.width > B && (A.width = B);
            H.legendstartx = G.width - pa - A.width;
            H.legendwidth = A.width;
            H.legendendx = H.legendstartx + H.legendwidth;
            H.legendheight = A.height;
            h += A.width;
            f.chart.marginRight += h;
            return h
        }
        A.enabled = !1;
        return 0
    };
    Ea.placeGLegendBlockBottom = function (f, h, B, w, H) {
        this.configureLegendOptions(f, h.chart, !1, H, B);
        ra(f, h);
        H = this.snapLiterals || (this.snapLiterals = {});
        var G = f[db], E = this.smartLabel || G.smartLabel, A = f.legend, P = f.chart, pa = P.spacingBottom, wa = P.spacingLeft, P = P.spacingRight, O, W, ia = A.textPadding =
            2, aa = A.title.padding, Ba = 0, Ea = 0, Z = 2 * A.padding;
        h = Ua(h.chart.legendpadding, 7) + A.borderWidth / 2 + 1;
        var Ka = f.colorRange || {}, ta = Ka.colorArr, Qa = Ka.mapbypercent, Za = Ka.scaleMin, Va = Ka.scaleMax - Za, Q = A.legendSliderWidth, z = A.legendSliderHeight, qa = A.legendScalePadding, Xa = A.legendScaleTickDistance, La = A.itemStyle || {};
        O = Ua(parseInt(La.lineHeight, 10) || 12);
        var Ia = .75 * O, za = w - Z, Ja, Ra, r, ga, Ca = 0, Ma, Ga, Ta;
        B -= Z;
        if (!Ka.noValidRange && ta && 1 < (Ra = ta.length)) {
            --Ra;
            A.title.text !== ha && (E.setStyle(A.title.style), O = E.getSmartText(A.title.text,
                B, za / 3), A.title.text = O.text, Ba = O.width + Z, za -= Ea = O.height + aa);
            E.setStyle(La);
            O = E.lineHeight;
            za -= Xa + qa + z;
            aa = Pa(O, za / 2);
            La = ca(za - aa - 4, O);
            Ja = B / 4;
            ga = 2 * Ja;
            r = ta[0];
            r.scaleLabel = I(r.maxvalue, Qa);
            O = E.getSmartText(r.label, Ja, La);
            r.label = O.text;
            za = O.height;
            r.labelY = Ia - O.height / 2;
            W = E.getSmartText(r.scaleLabel, ga, aa);
            r.scaleLabel = W.text;
            qa = W.width / 2;
            Xa = W.height;
            r.code || (r.code = Oa(A.minColor, "CCCCCC"));
            A.colorBoxX = Pa(qa, O.width + ia, Q);
            r = Ka = ta[Ra];
            r.scaleLabel = I(r.maxvalue, Qa);
            O = E.getSmartText(r.label, Ja, La);
            r.label =
                O.text;
            za = Pa(za, O.height);
            r.labelY = Ia - O.height / 2;
            W = E.getSmartText(r.scaleLabel, ga, aa);
            r.scaleLabel = W.text;
            Xa = Pa(Xa, W.height);
            r = W.width / 2;
            O = Pa(O.width + ia, r, Q);
            A.colorBoxWidth = Q = B - A.colorBoxX - O;
            ga = Q - r;
            Ma = Q / Va;
            Ta = ca(Q - Ca, ga - qa) - 4;
            for (Ja = 1; Ja < Ra; Ja += 1)r = ta[Ja], Ga = (r.maxvalue - Za) * Ma, O = E.getSmartText(r.label, 2 * ca(Ga - Ca, Q - Ga), La), r.label = O.text, za = Pa(za, O.height), r.labelY = Ia - O.height / 2, O = O.width / 2, r.scaleLabel = I(r.maxvalue, Qa), W = E.getSmartText(r.scaleLabel, 2 * ca(Ga - qa, ga - Ga), aa), r.scaleLabel = W.text, Xa = Pa(Xa,
                W.height), W = W.width / 2, Ta = ca(Ta, (Ga - Pa(W + qa, O + Ca) - 4) * Va / r.range), Ca = O + Ga, qa = W + Ga;
            Ta = Pa(ca(Ta, (ca(ga - qa, Q - Ca) - 4) * Va / Ka.range, .3 * B), 0);
            A.colorBoxWidth -= Ta;
            A.width = B + Z - Ta;
            A.width < Ba && (A.colorBoxX += (Ba - A.width) / 2, A.width = Ba);
            A.colorBoxY = Ea + z;
            A.colorBoxHeight = za && za + 2 * ia || 15;
            A.height = A.totalHeight = (Xa && Xa + ia) + A.colorBoxHeight + Ea + z + A.legendScaleTickDistance + A.legendScalePadding + Z;
            A.height > w && (A.height = w);
            H.legendstartx = wa + .5 * (G.width - wa - P - A.width) + (A.x || 0);
            H.legendwidth = A.width;
            H.legendendx = H.legendstartx +
                H.legendwidth;
            H.legendstarty = G.height - pa - A.height;
            H.legendheight = A.height;
            H.legendendy = H.legendstarty + H.legendheight;
            h += A.height;
            f.chart.marginBottom += h;
            return h
        }
        A.enabled = !1;
        return 0
    };
    Qa = function () {
        return {point: this}
    };
    tb = function (f) {
        return wa(100 * f) / 100
    };
    Ea.rendererRoot.drawGradientLegendItem = function (f) {
        var h = this, E = h.paper, L = h.options, H = h.canvasLeft, P = h.canvasTop, I = h.canvasWidth, A = h.canvasHeight, ca = L.colorRange, W = L.chart.textDirection, ta, O, ra, ia, aa = L.legend, Va = Ua(aa.padding, 4), eb = aa.itemStyle,
            L = aa.symbolStyle, Z = aa.interActivity, Ka = f.elements;
        f = Ka.elementGroup.trackTooltip(!0);
        var fb = "vertical" === aa.layout, bb, ib, db, Q, z, qa, Xa = 0, La = aa.lighting3d, Ia = aa.colorBoxWidth, za = aa.colorBoxHeight, Ja = Ia, Ra = za, r = {
            FCcolor: {
                color: ha,
                alpha: ha,
                angle: 0,
                ratio: ha
            }
        }, ga = r.FCcolor, Ca = aa.colorBoxX + Va, Ma = aa.colorBoxY + Va, Ga, Ta, jb = aa.legendColorBoxBorderColor, Da = aa.legendColorBoxBorderWidth, hb = ["M"], Bb = aa.legendScaleColor;
        z = aa.legendScalePadding;
        var Fb = aa.legendScaleLineThickness, Cb = Fb % 2 / 2;
        O = aa.legendScaleTickDistance;
        var ub = aa.legendSliderWidth, Db = aa.legendSliderHeight;
        Q = Ra / 2;
        ia = Ja / 2;
        qa = ub / 2;
        var $a = Db / 2, Ha, Gb, vb, ob, kb;
        Ta = 0;
        var Va = aa.legendSliderColor, Eb = aa.legendSliderBorderColor, aa = aa.legendSliderBorderWidth;
        Ha = aa % 2 / 2;
        var pb, oa = {isFirst: !0}, ka = {}, wb, b, d, a, c = {}, e = !1;
        if (ca && (ta = ca.colorArr) && 1 < (ra = ta.length)) {
            oa.toolText = wb = ib = ca.scaleMin;
            ka.toolText = b = ca = ca.scaleMax;
            db = ca - ib;
            oa.snapPX = ka.snapPX = 0;
            oa.tooltipConstraint = ka.tooltipConstraint = "chart";
            oa.getLabelConfig = ka.getLabelConfig = Qa;
            oa.tooltipPos = [0, 0];
            ka.tooltipPos =
                [0, 0];
            ka.tooltipOffsetReference = oa.tooltipOffsetReference = {};
            ka.tooltipOffsetReference.left = oa.tooltipOffsetReference.left += H - 20;
            ka.tooltipOffsetReference.top = oa.tooltipOffsetReference.top += P;
            d = Ka.colorBox = E.group("colorBox", f);
            if (fb) {
                oa.tooltipPos[0] = ka.tooltipPos[0] = I + H;
                Ta = 270;
                ga.angle = 90;
                H = Ca - ub;
                I = Ca + Ja;
                P = Ma - $a;
                Gb = Ma + $a;
                H = wa(Ca - ub) + Ha;
                I = wa(Ca) + Ha;
                P = wa(Ma - $a) + Ha;
                Gb = wa(Ma + $a) + Ha;
                A = wa(Ca + Ja) + Ha;
                vb = wa(Ma - 2) + Ha;
                ob = wa(Ma + 2) + Ha;
                kb = wa(Ma) + Ha;
                bb = Ca - qa / 2;
                Ga = wa(bb - $a) + Ha;
                bb = wa(bb) + Ha;
                Q = Ma - $a / 2;
                qa = wa(Q + $a) +
                    Ha;
                Q = wa(Q) + Ha;
                Ia /= 2;
                Ha = ["M", H, P, "L", I, P, I, vb, A, kb, I, ob, I, Gb, H, Gb, "Z", "M", Ga, Q, "L", bb, Q, "M", Ga, kb, "L", bb, kb, "M", Ga, qa, "L", bb, qa];
                Q = Ca + Ja + z;
                A = wa(Q + O) + Cb;
                Q = wa(Q) + Cb;
                Ga = Ca + ia;
                I = ra - 1;
                for (O = 0; O < ra; O += 1)ia = ta[O], qa = (ia.maxvalue - ib) / db, bb = Ra * qa + Ma, z = wa(bb) + Cb, O ? (ga.ratio += G, ga.color += G, ga.alpha += G, hb.push("L", Q, z, A, z, "M", Q, z), O === I ? ($a = Ob, z = bb + 2) : ($a = mb, z = bb)) : (hb.push(Q, z, "L", A, z, "M", Q, z), $a = Za, z = bb - 2), ga.ratio += 100 * (qa - Xa), ga.color += Oa(ia.code, B), ga.alpha += Oa(ia.alpha, 100), Xa = qa, ia.legendItem = E.text(f).attr({
                    text: ia.label,
                    x: Ga, y: z, "text-anchor": $a, direction: W, "vertical-align": mb
                }).rotate(Ta, Ga, z).css(eb), ia.legendSymbol = E.text(f).attr({
                    text: ia.scaleLabel,
                    x: A,
                    y: bb,
                    "text-anchor": Za,
                    direction: W,
                    "vertical-align": mb
                }).css(eb);
                oa.xMin = ka.xMin = 0;
                oa.xMax = ka.xMax = 0;
                ka.yIni = oa.yMin = ka.yMin = 0;
                oa.yIni = oa.yMax = ka.yMax = Ra;
                oa.x = ka.x = 0;
                oa._oriY = oa.y = 0;
                ka._oriY = ka.y = Ra;
                W = Db + Ja;
                ta = ub
            } else {
                oa.tooltipPos[1] = ka.tooltipPos[1] = A + P;
                H = wa(Ca - qa) + Ha;
                I = wa(Ca + qa) + Ha;
                P = wa(Ma - Db) + Ha;
                Gb = wa(Ma + Ra) + Ha;
                A = wa(Ca - 2) + Ha;
                bb = wa(Ca + 2) + Ha;
                Ga = wa(Ca) + Ha;
                vb = wa(Ma) +
                    Ha;
                ob = Ma - $a / 2;
                kb = wa(ob - $a) + Ha;
                ob = wa(ob) + Ha;
                Ta = Ca - qa / 2;
                ia = wa(Ta + qa) + Ha;
                Ta = wa(Ta) + Ha;
                za /= 2;
                Ha = ["M", H, P, "L", I, P, I, vb, bb, vb, Ga, Gb, A, vb, H, vb, "Z", "M", Ta, kb, "L", Ta, ob, "M", Ga, kb, "L", Ga, ob, "M", ia, kb, "L", ia, ob];
                z = Ma + Ra + z;
                Ta = wa(z + O) + Cb;
                z = wa(z) + Cb;
                bb = Ma + Q;
                I = ra - 1;
                for (O = 0; O < ra; O += 1)ia = ta[O], qa = (ia.maxvalue - ib) / db, A = Ja * qa + Ca, Q = wa(A) + Cb, O ? (ga.ratio += G, ga.color += G, ga.alpha += G, hb.push("L", Q, z, Q, Ta, "M", Q, z), O === I ? ($a = Za, Q = A + 2) : ($a = mb, Q = A)) : (hb.push(Q, z, "L", Q, Ta, "M", Q, z), $a = Ob, Q = A - 2), ga.ratio += 100 * (qa - Xa), ga.color +=
                    Oa(ia.code, B), ga.alpha += Oa(ia.alpha, 100), Xa = qa, ia.legendItem = E.text(f).attr({
                    text: ia.label,
                    x: Q,
                    y: bb,
                    "text-anchor": $a,
                    direction: W,
                    "vertical-align": mb
                }).css(eb), ia.legendSymbol = E.text(f).attr({
                    text: ia.scaleLabel,
                    x: A,
                    y: Ta,
                    "text-anchor": mb,
                    direction: W,
                    "vertical-align": pa
                }).css(eb);
                ka.xIni = oa.xMin = ka.xMin = 0;
                oa.xIni = oa.xMax = ka.xMax = Ja;
                oa.yMin = ka.yMin = 0;
                oa.yMax = ka.yMax = 0;
                oa.y = ka.y = 0;
                oa._oriX = oa.x = 0;
                ka._oriX = ka.x = Ja;
                W = ub;
                ta = Db + Ra
            }
            Ea.rendererRoot.resetLegendSlider = function () {
                var a = c[1], b = c[0];
                a && (pb(ka.xMin,
                    ka.yMin, ka.xMin - a.xChange, ka.yMin - a.yChange, !0), e = !0);
                b && (pb(oa.xMax, oa.yMax, oa.xMax - b.xChange, oa.yMax - b.yChange), e = !0)
            };
            Ka.colorBox = E.rect(d).attr({
                x: Ca,
                y: Ma,
                width: Ja,
                height: Ra,
                fill: nb(r),
                stroke: jb,
                strokeWidth: Da
            });
            La && (Ka.colorBoxEffect = E.rect(d).attr({
                x: Ca,
                y: Ma,
                width: Ia,
                height: za,
                fill: Rb,
                "stroke-width": 0
            }));
            Ka.scale = E.path(f).attr({path: hb, stroke: Bb, "stroke-width": Fb});
            pb = function (d, e, m, f, l) {
                var p;
                p = c[+!!l] = c[+!!l] || {};
                p.xChange = d;
                p.yChange = e;
                fb ? (p = e * db / Ra + ib, f = 0 < e ? f : f + e + .01) : (p = d * db / Ja + ib, m = 0 <
                d ? m : m + d + .01);
                d = tb(p);
                l ? (Ka.slider1.translate(m, f), Ka.slider1Tracker.toFront().translate(m, f).tooltip(d, null, null, !0), wb = p) : (Ka.slider2.translate(m, f), Ka.slider2Tracker.toFront().translate(m, f).tooltip(d, null, null, !0), b = p);
                Z && (a = clearTimeout(a), a = setTimeout(function () {
                    h.setScaleRange && h.setScaleRange(wb, b)
                }, 100))
            };
            ra = function (a, b) {
                var c = 0, d = c, e, f = this.isFirst, k = f ? ka : oa;
                if (fb) {
                    d = this._startY + b;
                    0 >= d && (d = 0);
                    d > Ra && (d = Ra);
                    if (f ? d > k.y : d < k.y)d = k.y;
                    Ba(d - this.y) >= (this.snapPX || 0) && (e = !0)
                } else {
                    c = this._startX +
                        a;
                    0 >= c && (c = 0);
                    c > Ja && (c = Ja);
                    if (f ? c > k.x : c < k.x)c = k.x;
                    Ba(c - this.x) >= (this.snapPX || 0) && (e = !0)
                }
                e && (pb(c, d, c - this.x, d - this.y, f), this.x = c, this.y = d)
            };
            La = function () {
                var a = this.isFirst, c = a ? ka : oa;
                e && (e = !1, this.x = c.xIni, this.y = c.yIni, c.x = c._oriX, c.y = c._oriY);
                this._startX = this.x;
                this._startY = this.y;
                this._scaleStart = wb;
                this._scaleEnd = b;
                w.raiseEvent("LegendPointerDragStart", {
                    pointerIndex: a ? 0 : 1,
                    pointers: [{value: wb}, {value: b}],
                    legendPointerHeight: Db,
                    legendPointerWidth: ub
                }, h.logic.chartInstance)
            };
            Ia = function () {
                var a =
                    this._scaleStart, c = this._scaleEnd;
                w.raiseEvent("LegendPointerDragStop", {
                    pointerIndex: this.isFirst ? 0 : 1,
                    pointers: [{value: wb}, {value: b}],
                    legendPointerHeight: Db,
                    legendPointerWidth: ub
                }, h.logic.chartInstance);
                a === wb && c === b || w.raiseEvent("LegendRangeUpdated", {
                    previousMinValue: a,
                    previousMaxValue: c,
                    minValue: wb,
                    maxValue: b
                }, h.logic.chartInstance);
                delete this._scaleStart;
                delete this._scaleEnd
            };
            za = tb(ib);
            Ka.slider1 = E.path(f).attr({path: Ha, fill: Va, "stroke-width": aa, stroke: Eb});
            sb && (H -= .5 * (Pa(30, W) - W), P -= .5 * (Pa(40,
                    ta) - ta), W = Pa(30, W), ta = Pa(40, ta));
            Ka.slider1Tracker = E.rect(f).attr({
                ishot: !0,
                width: W,
                height: ta,
                x: H,
                y: P,
                fill: $b,
                stroke: "none"
            }).drag(ra, La, Ia, oa, oa, oa).tooltip(za, null, null, !0).css(L);
            za = tb(ca);
            Ka.slider2 = E.path(f).attr({path: Ha, fill: Va, "stroke-width": aa, stroke: Eb}).translate(ka.x, ka.y);
            Ka.slider2Tracker = E.rect(f).attr({
                ishot: !0,
                width: W,
                height: ta,
                x: H,
                y: P,
                fill: $b,
                stroke: "none"
            }).translate(ka.x, ka.y).css(L).drag(ra, La, Ia, ka, ka, ka).tooltip(za, null, null, !0)
        }
    }
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-powercharts", function () {
    function fb(b, d, a) {
        var c = b.fcObj;
        I.hcLib.createChart(c, b.container, b.type, void 0, void 0, !1, !0);
        w.raiseEvent("chartUpdated", P({sourceEvent: a}, d), c, [c.id])
    }

    function Bb(b, d, a, c, e, g) {
        var q = Sa.atan((d - c) / (b - a)), m = [];
        0 > q && (q = 2 * Sa.PI + q);
        if (c > d) {
            if (a >= b && q > Sa.PI || a < b && q > Sa.PI)q -= Sa.PI
        } else if (a >= b && q < Sa.PI && 0 !== q || a < b && q < Sa.PI)q += Sa.PI;
        "undefined" == typeof g ? (a = b + e * Aa(q), e = d + e * cb(q)) : (e = ua(e) / 2, g = ua(g) / 2, a = b + (e = b < a ? e : -e),
            e = d + e * Sa.tan(q), ua(d - e) > ua(g) && (e = d + (g = d < c ? g : -g), a = b + g / Sa.tan(q)));
        m.push("L", a, e, a + 10 * Aa(q + .79), e + 10 * cb(q + .79), "M", a + 10 * Aa(q - .79), e + 10 * cb(q - .79), "L", a, e);
        return m
    }

    function hb(b, d) {
        var a;
        d._origAttr || (d._origAttr = {});
        for (a in b)$b.test(a) || (d._origAttr[a] = b[a]);
        return d._origAttr
    }

    var I = this, w = I.hcLib, Ea = w.Raphael, Va = I.window, Ua = Va.document, B = w.BLANKSTRING, Rb = w.createTrendLine, db = w.parseTooltext, h = w.pluck, E = w.getValidValue, f = w.pluckNumber, W = w.getFirstValue, Fb = w.getDefinedColor, G = w.parseUnsafeString,
        ha = w.FC_CONFIG_STRING, P = w.extend2, ta = w.getDashStyle, pa = w.toRaphaelColor, mb = w.toPrecision, Za = w.hasSVG, Ob = w.createContextMenu, Sb = w.isIE, jb = w.regex.dropHash, Oa = w.HASHSTRING, eb = function (b, d) {
            var a;
            b || (b = {});
            for (a in d)b[a] = d[a];
            return b
        }, nb = w.each, sb = w.addEvent, wa = w.removeEvent, Pa = w.getTouchEvent, ca = function (b) {
            return void 0 !== b && null !== b
        }, Ba = "rgba(192,192,192," + (Sb ? .002 : 1E-6) + ")", ra = w.TOUCH_THRESHOLD_PIXELS, Qa = w.CLICK_THRESHOLD_PIXELS, tb = 8 === Va.document.documentMode ? "visible" : "", $b = /^_/, Nb = w.BGRATIOSTRING,
        Sa = Math, cb = Sa.sin, Aa = Sa.cos, L = Sa.round, H = Sa.min, ab = Sa.max, ua = Sa.abs, A = Sa.PI, sc = Sa.ceil, Zb = Sa.floor, ec = Sa.sqrt, O = Sa.pow, fc = A / 180, ia = 2 * A, aa = w.hasTouch, gc = aa ? ra : Qa, ac = w.graphics.getColumnColor, Z = w.getFirstColor, Ka = w.setLineHeight, zc = w.pluckFontSize, bb = w.pluckColor, ib = w.getFirstAlpha, tc = w.graphics.getDarkColor, Q = w.graphics.getLightColor, z = w.graphics.convertColor, qa = w.COLOR_TRANSPARENT, Xa = w.POSITION_CENTER, La = w.POSITION_TOP, Ia = w.POSITION_BOTTOM, za = w.POSITION_RIGHT, Ja = w.POSITION_LEFT, Ra = w.bindSelectionEvent,
        r = w.chartAPI, ga = w.graphics.mapSymbolName, Qa = r.singleseries, Ca = w.COMMASTRING, Ma = w.ZEROSTRING, Ga = w.HUNDREDSTRING, Ta = w.COMMASPACE, Lb = w.getMouseCoordinate, ra = !/fusioncharts\.com$/i.test(Va.location.hostname), Da = w.plotEventHandler, Ac = I.xssEncode, hc = w.SHAPE_RECT, ic = w.deltend, A = w.graphics, Cb = A.parseColor, ub = A.getValidColor, Db = w.placeHorizontalAxis, $a = w.placeVerticalAxis, Ha = w.stepYAxisValues, Gb = w.adjustHorizontalCanvasMargin, vb = w.adjustVerticalCanvasMargin, ob = w.getDataParser, kb = {
            pageX: 0,
            pageY: 0
        }, Eb, pb, oa,
        ka = function () {
            this.data("move", !1);
            clearTimeout(this._longpressactive);
            delete this._longpressactive
        }, wb = w.createElement;
    w.eventList.chartupdated = "FC_ChartUpdated";
    w.eventList.dataposted = "FC_DataPosted";
    w.eventList.dataposterror = "FC_DataPostError";
    w.eventList.datarestored = "FC_DataRestored";
    I.addEventListener("rendered", function (b) {
        b = b.sender;
        var d = b.__state, a = b.jsVars && b.jsVars.instanceAPI;
        !d.listenersAdded && a && "function" === typeof a.getCollatedData && (b.addEventListener(["chartupdated", "dataupdated",
            "rendered"], function (a) {
            delete a.sender.__state.hasStaleData
        }), d.listenersAdded = !0)
    });
    r("spline", {
        friendlyName: "Spline Chart",
        standaloneInit: !0,
        creditLabel: ra,
        defaultSeriesType: "spline",
        rendererId: "spline"
    }, r.linebase);
    r("splinearea", {
        friendlyName: "Spline Area Chart",
        standaloneInit: !0,
        creditLabel: ra,
        defaultSeriesType: "areaspline",
        anchorAlpha: "100",
        rendererId: "spline"
    }, r.area2dbase);
    r("msspline", {
            friendlyName: "Multi-series Spline Chart",
            standaloneInit: !0,
            creditLabel: ra,
            defaultSeriesType: "spline",
            rendererId: "spline"
        },
        r.mslinebase);
    r("mssplinedy", {
        friendlyName: "Multi-series Dual Y-Axis Spline Chart",
        standaloneInit: !0,
        creditLabel: ra,
        isDual: !0,
        series: r.mscombibase.series,
        secondarySeriesType: "spline",
        secondarySeriesFilter: {spline: !0},
        defaultSeriesFilter: {spline: !0}
    }, r.msspline);
    r("mssplinearea", {
        friendlyName: "Multi-series Spline Area Chart",
        standaloneInit: !0,
        creditLabel: ra,
        defaultSeriesType: "areaspline",
        rendererId: "spline"
    }, r.msareabase);
    r("msstepline", {
        friendlyName: "Multi-series Step Line Chart", standaloneInit: !0,
        creditLabel: ra, defaultSeriesType: "line", rendererId: "cartesian", stepLine: !0
    }, r.mslinebase);
    r("inversemsline", {
        friendlyName: "Inverted Y-Axis Multi-series Line Chart",
        standaloneInit: !0,
        creditLabel: ra,
        inversed: !0,
        rendererId: "cartesian"
    }, r.mslinebase);
    r("inversemsarea", {
        friendlyName: "Inverted Y-Axis Multi-series Area Chart",
        standaloneInit: !0,
        creditLabel: ra,
        inversed: !0,
        rendererId: "cartesian"
    }, r.msareabase);
    r("inversemscolumn2d", {
        friendlyName: "Inverted Y-Axis Multi-series Column Chart", standaloneInit: !0,
        creditLabel: ra, inversed: !0, rendererId: "cartesian"
    }, r.mscolumn2dbase);
    r("logmsline", {
        friendlyName: "Multi-series Log Line Chart",
        standaloneInit: !0,
        isValueAbs: !0,
        isLog: !0,
        configureAxis: r.logbase.configureAxis,
        pointValueWatcher: r.logbase.pointValueWatcher,
        getLogAxisLimits: r.logbase.getLogAxisLimits,
        creditLabel: ra,
        rendererId: "cartesian"
    }, r.mslinebase);
    r("logmscolumn2d", {
        friendlyName: "Multi-series Log Column Chart",
        standaloneInit: !0,
        isLog: !0,
        isValueAbs: !0,
        configureAxis: r.logbase.configureAxis,
        pointValueWatcher: r.logbase.pointValueWatcher,
        getLogAxisLimits: r.logbase.getLogAxisLimits,
        creditLabel: ra,
        rendererId: "cartesian"
    }, r.mscolumn2dbase);
    r("logstackedcolumn2d", {
        friendlyName: "Stacked Log Column Chart",
        standaloneInit: !0,
        creditLabel: ra,
        isStacked: !0
    }, r.logmscolumn2d);
    r("errorbar2d", {
            friendlyName: "Error Bar Chart",
            standaloneInit: !0,
            creditLabel: ra,
            showValues: 0,
            rendererId: "cartesian",
            isErrorChart: !0,
            fireGroupEvent: !0,
            chart: function () {
                var b = this.base.chart.apply(this, arguments), d = this.drawErrorValue;
                b.callbacks || (b.callbacks = []);
                b.callbacks.push(function () {
                    for (var a =
                        this.elements.plots, b = this.dataset || this.options.series, e = a && a.length; e--;)b[e] && d.call(this, a[e], b[e])
                });
                return b
            },
            point: function (b, d, a, c, e, g, q, m, v) {
                b = f(c.ignoreemptydatasets, 0);
                var l = !1, p = !f(c.halferrorbar, 1), k = e[ha], n = h(this.isValueAbs, k.isValueAbs, !1), t = f(a.showvalues, k.showValues), u = f(d.yAxis, 0), D = f(c.use3dlighting, 1), C = e[ha].numberFormatter, x = this.colorManager, y = f(c.useplotgradientcolor, 1) ? Fb(c.plotgradientcolor, x.getColor("plotGradientColor")) : B, N = h(a.alpha, c.plotfillalpha, "100"), ea = ib(h(a.errorbaralpha,
                    c.errorbaralpha, N)), xa = f(a.dashed, c.plotborderdashed, 0), Fa = f(a.dashlen, c.plotborderdashlen, 5), F = f(a.dashgap, c.plotborderdashgap, 4), la = h(d.type, this.defaultSeriesType), K = e.plotOptions[la] && e.plotOptions[la].stacking, la = x.getPlotColor(), Wa, na, Na, r, T, w, X, M, J, R, ya, U, S, da, ba, Y;
                this.errorBarShadow = f(c.errorbarshadow);
                d.errorBar2D = !0;
                d.name = E(a.seriesname);
                K || (d.columnPosition = f(v, m, q));
                if (0 === f(a.includeinlegend) || 0 === N || void 0 === d.name)d.showInLegend = !1;
                d.errorBarWidthPercent = f(a.errorbarwidthpercent,
                    c.errorbarwidthpercent, 70);
                d.errorBarColor = z(Z(h(a.errorbarcolor, c.errorbarcolor, "AAAAAA")), ea);
                d.errorBarThickness = f(a.errorbarthickness, c.errorbarthickness, 1);
                d.color = h(a.color, la).split(",")[0].replace(/^#?/g, "#");
                if (q = a.data)for (U = h(c.plotborderthickness, "1"), K = e.chart.useRoundEdges, v = this.isBar, m = /3d$/.test(e.chart.defaultSeriesType), da = h(c.plotbordercolor, x.getColor("plotBorderColor")).split(",")[0], ba = "0" == c.showplotborder ? "0" : h(c.plotborderalpha, "100"), ba = m ? c.showplotborder ? ba : "0" : ba, da = m ?
                    h(c.plotbordercolor, "#FFFFFF") : da, x = 0; x < g; x += 1)(na = q[x]) ? (M = C.getCleanValue(na.value, n), J = C.getCleanValue(na.errorvalue, n), null === M ? d.data.push({y: null}) : (l = !0, X = k.oriCatTmp[x], r = h(na.color, a.color, la), T = ib(h(na.alpha, N)) + B, Wa = h(na.ratio, a.ratio, c.plotfillratio), Na = h(360 - c.plotfillangle, 90), 0 > M && (Na = 360 - Na), R = {opacity: T / 100}, S = H(T, ib(ba)) + B, w = ac(r + "," + y, T, Wa, Na, K, da, S, v, m), ya = {opacity: ea / 250}, Y = this.getPointStub(na, M, X, e, a, t, u, J), X = [], X.push({
                    errorValue: J,
                    toolText: Y._errortoolText,
                    shadow: ya
                }), p &&
                X.push({
                    errorValue: -J,
                    toolText: Y._errortoolText,
                    shadow: ya
                }), Wa = this.pointHoverOptions(na, d, {
                    plotType: "column",
                    is3d: m,
                    isBar: v,
                    use3DLighting: D,
                    isRoundEdged: K,
                    color: r,
                    gradientColor: y,
                    alpha: T,
                    ratio: Wa,
                    angle: Na,
                    borderWidth: U,
                    borderColor: da,
                    borderAlpha: S,
                    borderDashed: xa,
                    borderDashGap: F,
                    borderDashLen: Fa,
                    shadow: R
                }), d.data.push(P(Y, {
                    y: M,
                    shadow: R,
                    errorValue: X,
                    color: w[0],
                    borderColor: w[1],
                    borderWidth: U,
                    use3DLighting: D,
                    dashStyle: f(na.dashed, xa) ? ta(h(na.dashlen, Fa), h(na.dashgap, F), U) : "none",
                    hoverEffects: Wa.enabled &&
                    Wa.options,
                    rolloverProperties: Wa.enabled && Wa.rolloverOptions
                })), this.pointValueWatcher(e, M, J))) : d.data.push({y: null});
                b && !l && (d.showInLegend = !1);
                return d
            },
            pointValueWatcher: function (b, d, a) {
                var c = b[ha];
                null !== d && (a ? (b = d + a, d -= a) : b = d, c[0] || (c[0] = {}), a = c[0], a.max = a.max > b ? a.max : b, a.min = a.min < b ? a.min : b, a.max = a.max > d ? a.max : d, a.min = a.min < d ? a.min : d)
            },
            drawErrorValue: function (b, d) {
                var a = this, c = a.options, e = c.plotOptions.series, g = c[ha], g = a.smartLabel || g.smartLabel, q = a.paper, m = a.layers, v = a.xAxis[0], l = a.yAxis[0],
                    p = isNaN(+e.animation) && e.animation.duration || 1E3 * e.animation, k = m.dataset = m.dataset || q.group("dataset-orphan"), n = b.errorGroup = q.group("errorBar").insertAfter(b.lineLayer || k.column || k), h = m.errorTracker || (m.errorTracker = q.group("hot-error", m.tracker || k).toBack()), u = k.errorValueGroup || (k.errorValueGroup = q.group("errorValues")), D = d.errorBar2D, C = d.data || [], x = C.length, y = b.items, N = !1 !== (c.tooltip || {}).enabled, ea, xa, Fa, F, la = b.graphics = b.graphics || [], K = !1 === d.visible ? "hidden" : "visible", Wa = c.chart, na = Wa.textDirection,
                    Na = Wa.valuePadding || 0, Wa = 1 == Wa.rotateValues ? 270 : void 0, r = d.columnPosition || 0, T = a.definition.chart, w = v.getAxisPosition(0), X = v.getAxisPosition(1) - w, M = e.groupPadding, J = e.maxColWidth, w = d.numColumns || 1, X = (1 - .01 * (T && T.plotspacepercent)) * X || H(X * (1 - 2 * M), J * w), T = X / w, r = r * T - X / 2, w = a.logic, X = !w.avoidCrispError, M = a.canvasHeight + a.canvasTop, R = m.shadows || (m.shadows = q.group("shadows", k).toBack()), m = {}, J = c.plotOptions.series.dataLabels.style, z = a.chartWidth, U = a.chartHeight, S = {
                        fontFamily: J.fontFamily, fontSize: J.fontSize,
                        lineHeight: J.lineHeight, fontWeight: J.fontWeight, fontStyle: J.fontStyle
                    }, da, ba, Y, A, E, G, fa, P, I, ja, ma, O, va, W, pa, Z, ga, Q, sa, qb, aa = function (b) {
                        Da.call(this, a, b)
                    }, ta = function (b) {
                        Da.call(this, a, b, "DataPlotRollOver")
                    }, ka = function (b) {
                        Da.call(this, a, b, "DataPlotRollOut")
                    }, qa = function (b) {
                        return function () {
                            void 0 !== b && a.linkClickFN.call({link: b}, a)
                        }
                    }, ia = function () {
                        n.show();
                        u.attr({transform: "...t" + -z + "," + -U});
                        R.show()
                    };
                if (0 < x) {
                    for (; x--;)if (ea = C[x], c = f(ea.errorStartValue, ea.y), O = ea.errorValue, k = ea.link, void 0 !==
                        c && O && (pa = O.length)) {
                        ea = f(ea.x, x);
                        F = l.getAxisPosition(c);
                        Fa = v.getAxisPosition(ea);
                        D && (r && (Fa += r), T && (Fa += T / 2));
                        ja = y[x] || (y[x] = {});
                        ja.errorBars = ja.errorBars || [];
                        ja.errorValues = ja.errorValues || [];
                        ja.trackerBars = ja.trackerBars || [];
                        for (ba = (da = ja.tracker || ja.graphic) && da.data("groupId"); pa--;)sa = Z = qb = null, va = O[pa], I = va.errorStartValue, xa = va.tooltext || va.toolText, E = isNaN(I) ? F : l.getAxisPosition(I), Y = va.displayValue, W = va.errorValue, va && ca(W) && (A = f(va.isHorizontal, 0), Q = f(va.errorBarThickness, d.errorBarThickness,
                            1), Z = f(T * d.errorBarWidthPercent / 100, va.errorWidth, A ? d.hErrorBarWidth : d.vErrorBarWidth, d.errorBarWidth), ga = Z / 2, Z = va.errorBarColor || d.errorBarColor, ca(Y) && Y !== B && (qb = q.text(u).attr({
                            text: Y,
                            fill: J.color,
                            direction: na,
                            "text-bound": [J.backgroundColor, J.borderColor, J.borderThickness, J.borderPadding, J.borderRadius, J.borderDash]
                        }).css(S), g.setStyle(S), m = g.getOriSize(Y)), A ? (Y = ma = I = v.getAxisPosition(ea + W), A = Fa, X && (Y = L(E) + Q % 2 / 2, A = L(ma) + Q % 2 / 2), E = ["M", Fa, Y, "H", A, "M", A, Y - ga, "V", Y + ga]) : (Y = ma = I = l.getAxisPosition((ca(I) ?
                                I : c) + W), A = Fa, X && (Y = L(ma) + Q % 2 / 2, A = L(Fa) + Q % 2 / 2), P = .5 * (Wa ? m.width : m.height), G = ma + .5 * Q + Na + P, fa = ma - .5 * Q - Na - P, E > ma ? (I = fa, fa - a.canvasTop < P && (I = G)) : (I = G, M - G < P && (I = fa)), E = ["M", A, E, "V", Y, "M", A - ga, Y, "H", A + ga]), Z = q.path(E, n).attr({
                            stroke: Z,
                            ishot: !N,
                            "stroke-width": Q,
                            cursor: k ? "pointer" : "",
                            "stroke-linecap": "round",
                            visibility: K
                        }).shadow(f(w.errorBarShadow, e.shadow) && 0 < Q && va.shadow, R), (k || N) && Q < gc && (sa = q.path(E, h).attr({
                            stroke: Ba,
                            "stroke-width": gc,
                            cursor: k ? "pointer" : "",
                            ishot: !!k,
                            visibility: K
                        })), sa = sa || Z, sa.data("eventArgs",
                            da && da.data("eventArgs") || {
                                link: k,
                                toolText: xa,
                                displayValue: va.displayValue,
                                value: W
                            }), sa.click(aa).data("groupId", ba).hover(ta, ka).tooltip(xa), (k || N) && sa.click(qa(k)), qb && (qb.attr({
                            x: Fa,
                            y: I,
                            title: va.originalText || "",
                            visibility: K
                        }).css(S), Wa && qb.attr("transform", "T0,0,R" + Wa)), Z && (la.push(Z), ja.errorBars.push(Z)), qb && (la.push(qb), ja.errorValues.push(qb)), sa && sa !== Z && (la.push(sa), ja.trackerBars.push(sa)));
                        p && (n.hide(), u.attr({transform: "...t" + z + "," + U}), R.hide(), setTimeout(ia, p))
                    }
                    b.visible = !1 !== d.visible
                }
            }
        },
        r.mscolumn2dbase);
    r("errorline", {
        friendlyName: "Error Line Chart",
        standaloneInit: !0,
        creditLabel: ra,
        chart: r.errorbar2d.chart,
        drawErrorValue: r.errorbar2d.drawErrorValue,
        useErrorGroup: !0,
        rendererId: "cartesian",
        isErrorChart: !0,
        fireGroupEvent: !0,
        canvasPaddingModifiers: ["anchor", "errorbar"],
        point: function (b, d, a, c, e, g) {
            b = f(c.ignoreemptydatasets, 0);
            var q = !1, m = !f(c.halferrorbar, 1), v = e[ha], l = h(this.isValueAbs, v.isValueAbs, !1), p = f(a.showvalues, v.showValues), k = f(d.yAxis, 0), n = this.numberFormatter, t = this.colorManager,
                u = Z(h(a.color, c.linecolor, t.getPlotColor())), D = e.chart, C = f(a.alpha, c.linealpha, "100"), x = f(a.errorbaralpha, c.errorbaralpha, C), y = f(a.linethickness, c.linethickness, 2), N = Boolean(f(a.dashed, c.linedashed, 0)), ea = f(a.linedashlen, c.linedashlen, 5), xa = f(a.linedashgap, c.linedashgap, 4), Fa, F, la, K, Wa, na, Na, w, T, A, X, M, J, R, ya, U, S, da, ba, Y, G, L, I, fa, O, W, ja, ma, ca, va;
            this.errorBarShadow = f(c.errorbarshadow);
            d.name = E(a.seriesname);
            d.color = {FCcolor: {color: u, alpha: C}};
            d.lineWidth = y;
            Na = f(a.drawanchors, a.showanchors, c.drawanchors,
                c.showanchors);
            ba = f(a.anchorsides, c.anchorsides, 0);
            Y = f(a.anchorradius, c.anchorradius, 3);
            G = Z(h(a.anchorbordercolor, c.anchorbordercolor, u));
            L = f(a.anchorborderthickness, c.anchorborderthickness, 1);
            I = Z(h(a.anchorbgcolor, c.anchorbgcolor, t.getColor("anchorBgColor")));
            fa = h(a.anchoralpha, c.anchoralpha, "100");
            O = h(a.anchorbgalpha, c.anchorbgalpha, fa);
            W = f(a.anchorstartangle, c.anchorstartangle, 90);
            t = d.anchorShadow = f(c.anchorshadow, 0);
            d.errorBarWidth = f(c.errorbarwidth, a.errorbarwidth, 5);
            d.errorBarColor = z(Z(h(a.errorbarcolor,
                c.errorbarcolor, "AAAAAA")), x);
            d.errorBarThickness = H(y, f(a.errorbarthickness, c.errorbarthickness, 1));
            if (0 === f(a.includeinlegend) || void 0 === d.name || 0 === C && 1 !== Na)d.showInLegend = !1;
            d.marker = {
                fillColor: {FCcolor: {color: I, alpha: O * fa / 100 + B}},
                lineColor: {FCcolor: {color: G, alpha: fa + B}},
                lineWidth: L,
                radius: Y,
                symbol: ga(ba),
                startAngle: W
            };
            if (c = a.data)for (K = 0; K < g; K += 1)(ya = c[K]) ? (F = n.getCleanValue(ya.value, l), la = n.getCleanValue(ya.errorvalue, l), null === F ? d.data.push({y: null}) : (q = !0, R = f(ya.anchorsides, ba), J = f(ya.anchorradius,
                Y), X = Z(h(ya.anchorbordercolor, G)), M = f(ya.anchorborderthickness, L), A = Z(h(ya.anchorbgcolor, I)), w = h(ya.anchoralpha, fa), T = h(ya.anchorbgalpha, O), Wa = Z(h(ya.color, u)), na = h(ya.alpha, C), ma = f(ya.dashed, N) ? ta(ea, xa, y) : "none", U = {opacity: na / 100}, ja = void 0 === Na ? 0 !== na : !!Na, Fa = v.oriCatTmp[K], va = this.getPointStub(ya, F, Fa, e, a, p, k, la), ca = [], ca.push({
                errorValue: la,
                toolText: va._errortoolText,
                shadow: {opacity: x / 250}
            }), m && ca.push({
                errorValue: null === la ? null : -la,
                toolText: va._errortoolText,
                shadow: {opacity: x / 250}
            }), S = h(ya.anchorstartangle,
                W), da = Boolean(f(ya.anchorshadow, t, 0)), Fa = this.pointHoverOptions(ya, d, {
                plotType: "anchor",
                anchorBgColor: A,
                anchorAlpha: w,
                anchorBgAlpha: T,
                anchorAngle: S,
                anchorBorderThickness: M,
                anchorBorderColor: X,
                anchorBorderAlpha: w,
                anchorSides: R,
                anchorRadius: J,
                shadow: U
            }), d.data.push(P(va, {
                y: F,
                shadow: U,
                dashStyle: ma,
                errorValue: ca,
                valuePosition: h(ya.valueposition, D.valuePosition),
                color: {FCcolor: {color: Wa, alpha: na}},
                marker: {
                    enabled: ja,
                    shadow: da && {opacity: w / 100},
                    fillColor: {FCcolor: {color: A, alpha: T * w / 100 + B}},
                    lineColor: {
                        FCcolor: {
                            color: X,
                            alpha: w
                        }
                    },
                    lineWidth: M,
                    radius: J,
                    symbol: ga(R),
                    startAngle: S
                },
                hoverEffects: Fa.enabled && Fa.options,
                rolloverProperties: Fa.enabled && Fa.rolloverOptions
            })), r.errorbar2d.pointValueWatcher(e, F, la))) : d.data.push({y: null});
            b && !q && (d.showInLegend = !1);
            return d
        }
    }, r.mslinebase);
    r("errorscatter", {
        friendlyName: "Error Scatter Chart",
        isXY: !0,
        standaloneInit: !0,
        creditLabel: ra,
        chart: r.errorbar2d.chart,
        drawErrorValue: r.errorbar2d.drawErrorValue,
        defaultZeroPlaneHighlighted: !1,
        useErrorGroup: !0,
        rendererId: "cartesian",
        isErrorChart: !0,
        fireGroupEvent: !0,
        point: function (b, d, a, c, e, g, q) {
            b = f(c.ignoreemptydatasets, 0);
            g = !1;
            var m = f(a.drawline, 0), v = f(a.drawprogressioncurve, 0), l, p, k = f(a.showvalues, e[ha].showValues), n = this.numberFormatter, t = f(a.showregressionline, c.showregressionline, 0), u = h(c.errorbarcolor, "AAAAAA"), D = h(c.errorbaralpha, "100"), C = f(c.errorbarthickness, 1);
            p = f(c.errorbarwidth, 5);
            var x = f(c.halfverticalerrorbar, 1), y = f(a.verticalerrorbaralpha, a.errorbaralpha, c.verticalerrorbaralpha, D), N = z(h(a.verticalerrorbarcolor, a.errorbarcolor,
                c.verticalerrorbarcolor, u), y), ea = f(a.verticalerrorbarthickness, a.errorbarthickness, c.verticalerrorbarthickness, C), xa = f(c.halfhorizontalerrorbar, 1), D = h(a.horizontalerrorbaralpha, a.errorbaralpha, c.horizontalerrorbaralpha, D), u = z(h(a.horizontalerrorbarcolor, a.errorbarcolor, c.horizontalerrorbarcolor, u), D), C = f(a.horizontalerrorbarthickness, a.errorbarthickness, c.horizontalerrorbarthickness, C), Fa = f(a.usehorizontalerrorbar, c.usehorizontalerrorbar, 0), F = f(a.useverticalerrorbar, c.useverticalerrorbar, 1), la = {
                sumX: 0,
                sumY: 0, sumXY: 0, sumXsqure: 0, sumYsqure: 0, xValues: [], yValues: []
            };
            l = this.colorManager;
            var K = l.getPlotColor(), Wa, na, Na, r, T, w, X, M, J, R, A, U, S, da, ba, Y, G, H, L, fa, P, I, ja, ma;
            this.errorBarShadow = f(c.errorbarshadow);
            d.zIndex = 1;
            d.name = E(a.seriesname);
            if (0 === f(a.includeinlegend) || void 0 === d.name)d.showInLegend = !1;
            d.vErrorBarWidth = f(a.verticalerrorbarwidth, a.errorbarwidth, c.verticalerrorbarwidth, p);
            d.hErrorBarWidth = f(a.horizontalerrorbarwidth, a.errorbarwidth, c.horizontalerrorbarwidth, p);
            if (m || v)v && (d.type = "spline"),
                na = Z(h(a.color, K)), m = h(a.alpha, Ga), v = f(a.linethickness, c.linethickness, 2), p = Boolean(f(a.linedashed, a.dashed, c.linedashed, 0)), Na = f(a.linedashlen, c.linedashlen, 5), r = f(a.linedashgap, c.linedashgap, 4), d.color = z(h(a.linecolor, c.linecolor, na), f(a.linealpha, c.linealpha, m)), d.lineWidth = v, d.dashStyle = p ? ta(Na, r, v) : "none";
            m = Boolean(f(a.drawanchors, a.showanchors, c.drawanchors, c.showanchors, 1));
            q = f(a.anchorsides, c.anchorsides, q + 3);
            v = f(a.anchorradius, c.anchorradius, 3);
            na = Z(h(a.anchorbordercolor, a.color, c.anchorbordercolor,
                na, K));
            K = f(a.anchorborderthickness, c.anchorborderthickness, 1);
            r = Z(h(a.anchorbgcolor, c.anchorbgcolor, l.getColor("anchorBgColor")));
            w = h(a.anchoralpha, a.alpha, c.anchoralpha, "100");
            X = h(a.anchorbgalpha, c.anchorbgalpha, w);
            Na = h(a.anchorstartangle, c.anchorstartangle);
            d.anchorShadow = f(c.anchorshadow, 0);
            d.marker = {
                fillColor: this.getPointColor(r, "100"),
                lineColor: {FCcolor: {color: na, alpha: w + B}},
                lineWidth: K,
                radius: v,
                symbol: ga(q)
            };
            if (l = a.data) {
                p = l.length;
                t && (d.events = {hide: this.hideRLine, show: this.showRLine}, P = f(a.showyonx,
                    c.showyonx, 1), I = Z(h(a.regressionlinecolor, c.regressionlinecolor, na)), ja = f(a.regressionlinethickness, c.regressionlinethickness, K), c = ib(f(a.regressionlinealpha, c.regressionlinealpha, w)), I = z(I, c));
                for (Wa = 0; Wa < p; Wa += 1)(T = l[Wa]) ? (c = n.getCleanValue(T.y), ba = n.getCleanValue(T.x), n.getCleanValue(T.errorvalue), Y = n.getCleanValue(h(T.horizontalerrorvalue, T.errorvalue)), G = n.getCleanValue(h(T.verticalerrorvalue, T.errorvalue)), null === c ? d.data.push({
                    y: null,
                    x: ba
                }) : (g = !0, H = this.getPointStub(T, c, n.xAxis(ba), e, a, k, void 0,
                    G, Y, ba), M = f(T.anchorsides, q), J = f(T.anchorradius, v), R = Z(h(T.anchorbordercolor, na)), A = f(T.anchorborderthickness, K), U = Z(h(T.anchorbgcolor, r)), S = h(T.anchoralpha, T.alpha, w), da = h(T.anchorbgalpha, X), L = Boolean(f(T.usehorizontalerrorbar, Fa)), fa = Boolean(f(T.useverticalerrorbar, F)), ma = [], L && (L = H._hErrortoolText, ma.push({
                    errorValue: Y,
                    toolText: L,
                    errorBarColor: u,
                    isHorizontal: 1,
                    errorBarThickness: C,
                    shadow: {opacity: D / 250}
                }), xa || ma.push({
                    errorValue: -Y, toolText: L, errorBarColor: u, isHorizontal: 1, errorBarThickness: C, shadow: {
                        opacity: D /
                        250
                    }
                })), fa && (fa = H._errortoolText, ma.push({
                    errorValue: G,
                    toolText: fa,
                    errorBarColor: N,
                    errorBarThickness: ea,
                    shadow: {opacity: y / 250}
                }), x || ma.push({
                    errorValue: -G,
                    toolText: fa,
                    errorBarColor: N,
                    errorBarThickness: ea,
                    shadow: {opacity: y / 250}
                })), fa = this.pointHoverOptions(T, d, {
                    plotType: "anchor",
                    anchorBgColor: U,
                    anchorAlpha: S,
                    anchorBgAlpha: da,
                    anchorAngle: Na,
                    anchorBorderThickness: A,
                    anchorBorderColor: R,
                    anchorBorderAlpha: S,
                    anchorSides: M,
                    anchorRadius: J
                }), d.data.push({
                    y: c,
                    x: ba,
                    errorValue: ma,
                    displayValue: H.displayValue,
                    displayValueArgs: H.displayValueArgs,
                    toolText: H.toolText,
                    link: H.link,
                    marker: {
                        enabled: m,
                        shadow: void 0,
                        fillColor: {FCcolor: {color: U, alpha: da * S / 100 + B}},
                        lineColor: {FCcolor: {color: R, alpha: S}},
                        lineWidth: A,
                        radius: J,
                        symbol: ga(M),
                        startAngle: h(T.anchorstartangle, Na)
                    },
                    hoverEffects: fa.enabled && fa.options,
                    rolloverProperties: fa.enabled && fa.rolloverOptions
                }), this.pointValueWatcher(e, x ? c : c - G, xa ? ba : ba - Y, t && la), this.pointValueWatcher(e, c + G, ba + Y, t && la))) : d.data.push({y: null});
                t && (a = this.getRegressionLineSeries(la, P, p), this.pointValueWatcher(e, a[0].y, a[0].x),
                    this.pointValueWatcher(e, a[1].y, a[1].x), e = {
                    type: "line",
                    color: I,
                    showInLegend: !1,
                    lineWidth: ja,
                    enableMouseTracking: !1,
                    marker: {enabled: !1},
                    data: a,
                    zIndex: 0
                }, d = [d, e])
            }
            b && !g && (d.showInLegend = !1);
            return d
        }
    }, r.scatterbase);
    r("waterfall2d", {
            friendlyName: "Waterfall Chart",
            standaloneInit: !0,
            isWaterfall: !0,
            creditLabel: ra,
            point: function (b, d, a, c, e) {
                var g, q, m, v, l, p, k, n, t, u, D, C, x, y, N;
                b = h(c.connectorthickness, 1);
                var ea = {
                    step: !0,
                    type: "line",
                    enableMouseTracking: !1,
                    data: [],
                    dataLabels: {enabled: !1},
                    marker: {enabled: !1},
                    dashStyle: "1" === c.connectordashed ? ta(f(c.connectordashlen, 2), f(c.connectordashgap, 2), b) : "none",
                    drawVerticalJoins: !1,
                    useForwardSteps: !0,
                    color: z(h(c.connectorcolor, "000000"), h(c.connectoralpha, 100)),
                    lineWidth: b
                }, xa = this.colorManager, Fa = a.length, F = e[ha], la = F.axisGridManager, K = e.xAxis, Wa = F.x, r = /3d$/.test(e.chart.defaultSeriesType), Na = this.isBar, w = "1" === h(c.showplotborder, r ? "0" : "1") ? r ? 1 : f(c.plotborderthickness, 1) : 0, T = e.chart.useRoundEdges, A = f(c.plotborderalpha, c.plotfillalpha, 100) + B, X = h(c.plotbordercolor,
                    xa.getColor("plotBorderColor").split(",")[0]), M = f(c.useplotgradientcolor, 1) ? Fb(c.plotgradientcolor, xa.getColor("plotGradientColor")) : B, J = f(c.plotborderdashed, 0), R = f(c.plotborderdashlen, 6), ya = f(c.plotborderdashgap, 3), U = 0, S = Boolean(f(c.use3dlighting, 1)), da = 0, ba = 0, Y = e[ha].numberFormatter, H, L = 0, P, fa = f(c.showsumatend, 1);
                for (g = 0; g < Fa; g += 1)n = a[g], b = Y.getCleanValue(n.value), m = f(n.issum, 0), n.vline || m || (L += b, n._value = b);
                H = Y.dataLabels(L);
                fa && (fa = !0, Fa += 1, P = {
                    label: W(c.sumlabel, "Total"), _value: L, value: L, issum: 1,
                    cumulative: 1
                });
                for (q = g = 0; g < Fa; g += 1)n = a[g], !n && fa && (n = P), n.vline ? la.addVline(K, n, U, e) : (b = n._value, delete n._value, m = f(n.issum, 0), k = f(n.cumulative, 1), m ? (b = k ? da : da === ba ? da : da - ba, ba = da, ea.data.push({
                    y: null,
                    x: q - .5
                })) : da += b, m = f(n.showlabel, c.showlabels, 1), m = G(m ? W(n.label, n.name) : B), la.addXaxisCat(K, U, U, m, n, {}, c), U += 1, 0 < b ? (v = h(n.color, c.positivecolor, xa.getPlotColor()), d.hoverEffects && (d.hoverEffects.color = h(n.positivehovercolor, c.positivehovercolor, c.plotfillhovercolor))) : (v = h(n.color, c.negativecolor, xa.getPlotColor()),
                d.hoverEffects && (d.hoverEffects.color = h(n.negativehovercolor, c.negativehovercolor, c.plotfillhovercolor))), l = h(n.alpha, c.plotfillalpha, "100"), p = h(n.ratio, c.plotfillratio), t = h(360 - c.plotfillangle, 90), 0 > b && (t = 360 - t), C = h(n.alpha, A), x = f(n.dashed, J), y = h(n.dashgap, ya), N = h(n.dashlen, R), u = {
                    opacity: l / 100,
                    inverted: Na
                }, k = ac(v + Ca + M.replace(/,+?$/, ""), l, p, t, T, X, h(n.alpha, A), Na, r), D = x ? ta(N, y, w) : "none", v = this.pointHoverOptions(n, d, {
                    plotType: "column",
                    is3d: r,
                    isBar: Na,
                    use3DLighting: S,
                    isRoundEdged: T,
                    color: v,
                    gradientColor: M,
                    alpha: l,
                    ratio: p,
                    angle: t,
                    borderWidth: w,
                    borderColor: X,
                    borderAlpha: C,
                    borderDashed: x,
                    borderDashGap: y,
                    borderDashLen: N,
                    shadow: u
                }), p = E(G(n.displayvalue)), t = null === b ? b : Y.dataLabels(b), l = E(G(h(n.tooltext, F.tooltext))), C = F.showTooltip ? void 0 !== l ? db(l, [1, 2, 3, 5, 6, 7, 20, 21, 24, 25], {
                    formattedValue: t,
                    label: m,
                    yaxisName: G(c.yaxisname),
                    xaxisName: G(c.xaxisname),
                    cumulativeValue: da,
                    cumulativeDataValue: Y.dataLabels(da),
                    sum: H,
                    unformattedSum: L
                }, n, c) : null === t ? !1 : m !== B ? m + F.tooltipSepChar + t : t : B, l = f(n.showvalue, F.showValues) ?
                    void 0 !== p ? p : t : B, p = h(p, t, B), d.data.push({
                    y: b,
                    _FCY: 0 > b ? da - b : da,
                    previousY: 0 > b ? da : 0 === da - b ? void 0 : da - b,
                    shadow: u,
                    color: k[0],
                    borderColor: k[1],
                    borderWidth: w,
                    dashStyle: D,
                    use3DLighting: S,
                    hoverEffects: v.enabled && v.options,
                    rolloverProperties: v.enabled && v.rolloverOptions,
                    displayValue: l,
                    displayValueArgs: p,
                    categoryLabel: m,
                    toolText: C,
                    link: h(n.link)
                }), ea.data.push({y: b && da, x: q}), this.pointValueWatcher(e, da), q += 1);
                Wa.catCount = U;
                "0" != c.showconnectors && (d = [ea, d]);
                return d
            },
            defaultSeriesType: "column",
            rendererId: "cartesian"
        },
        Qa);
    r("multilevelpie", {
        friendlyName: "Multi-level Pie Chart",
        standaloneInit: !0,
        defaultSeriesType: "multilevelpie",
        rendererId: "multiLevelPie",
        defaultPlotShadow: 0,
        series: function () {
            var b = this.dataObj, d = this.hcJSON, a = b.chart, c = d.series, e = {}, g = Boolean(f(a.usehovercolor, 1)), q = z(h(a.hoverfillcolor, "FF5904"), f(a.hoverfillalpha, 100)), m = parseInt(a.pieradius, 10), v = 0, l = !0, v = d.xAxis.labels.style, l = (l = W(a.valuebordercolor, v.borderColor, B)) ? z(l, f(a.valueborderalpha, a.valuebgalpha, a.valuealpha, 100)) : B;
            d.chart.plotBorderColor =
                0;
            d.chart.plotBackgroundColor = null;
            d.plotOptions.series.dataLabels.style = {
                fontFamily: h(a.valuefont, v.fontFamily),
                fontSize: f(a.valuefontsize, parseInt(v.fontSize, 10)) + "px",
                color: z(h(a.valuefontcolor, v.color), f(a.valuefontalpha, a.valuealpha, 100)),
                fontWeight: f(a.valuefontbold) ? "bold" : "normal",
                fontStyle: f(a.valuefontitalic) ? "italic" : "normal",
                backgroundColor: a.valuebgcolor ? z(a.valuebgcolor, f(a.valuebgalpha, a.valuealpha, 100)) : B,
                border: l || a.valuebgcolor ? f(a.valueborderthickness, 1) + "px solid" : B,
                borderPadding: f(a.valueborderpadding,
                    2),
                borderThickness: f(a.valueborderthickness, v.borderThickness, 1),
                borderRadius: f(a.valueborderradius, v.borderRadius, 0),
                borderColor: l,
                borderDash: f(a.valueborderdashed, 0) ? ta(f(a.valueborderdashlen, 4), f(a.valueborderdashgap, 2), f(a.valueborderthickness, 1)) : "none"
            };
            d.legend.enabled = !1;
            d.plotOptions.pie.allowPointSelect = !1;
            d.plotOptions.series.borderColor = z(h(a.plotbordercolor, a.piebordercolor, "FFFFFF"), "0" != a.showplotborder ? h(a.plotborderalpha, a.pieborderalpha, 100) : 0);
            d.plotOptions.series.borderWidth = f(a.pieborderthickness,
                a.plotborderthickness, 1);
            d.plotOptions.pie.startingAngle = 0;
            d.plotOptions.pie.size = "100%";
            e.showLabels = f(a.showlabels, 1);
            e.showValues = f(a.showvalues, 0);
            e.showValuesInTooltip = f(a.showvaluesintooltip, a.showvalues, 0);
            e.showPercentValues = f(a.showpercentvalues, a.showpercentagevalues, 0);
            e.showPercentInTooltip = f(a.showpercentintooltip, 0);
            e.toolTipSepChar = h(a.tooltipsepchar, a.hovercapsepchar, Ta);
            e.labelSepChar = h(a.labelsepchar, e.toolTipSepChar);
            e.tooltext = a.plottooltext;
            g && (d.plotOptions.series.point.events =
            {
                mouseOver: function () {
                    for (var a = this, b = a.chart.plots, c, d; a;)a.graphic.attr({fill: q}), d = a.prevPointIndex, a = a.prevSeriesIndex, a = (c = b[a]) && c.items && c.items[d]
                }, mouseOut: function () {
                for (var a = this, b = a.chart.plots, c, d; a;)a.graphic.attr({fill: a.color}), d = a.prevPointIndex, a = a.prevSeriesIndex, a = (c = b[a]) && c.items && c.items[d]
            }
            });
            d.chart.plotBorderWidth = 0;
            b.category && this.addMSPieCat(b.category, 0, 0, 100, h(a.plotfillalpha, a.piefillalpha, 100), e, null);
            m = parseInt(a.pieradius, 10);
            v = 0;
            l = !0;
            m ? (b = 2 * m / c.length, l = !1) : b =
                parseInt(100 / c.length, 10);
            d.plotOptions.series.dataLabels.distance = 0;
            d.plotOptions.series.dataLabels.placeLabelsInside = !0;
            for (d = 0; d < c.length; d += 1)c[d].innerSize = v + (l ? "%" : ""), c[d].size = (v += b) + (l ? "%" : ""), 0 === c[d].data[c[d].data.length - 1].y && c[d].data.pop()
        },
        spaceManager: function (b, d, a, c) {
            var e = b[ha];
            this.titleSpaceManager(b, d, a - (e.marginLeftExtraSpace + e.marginRightExtraSpace + b.chart.marginRight + b.chart.marginLeft), .4 * (c - (e.marginBottomExtraSpace + e.marginTopExtraSpace + b.chart.marginBottom + b.chart.marginTop)))
        },
        addMSPieCat: function (b, d, a, c, e, g, q) {
            var m = this.numberFormatter, v = this.colorManager, l, p, k = 0, n = b.length - 1, t, u, D;
            l = this.hcJSON.series;
            var C = g.labelSepChar, x, y, N, ea, xa, Fa;
            void 0 === this.colorCount && (this.colorCount = 0);
            0 === d && (this.colorCount = 0);
            l[d] || (l[d] = {
                data: [{
                    toolText: !1,
                    doNotSlice: !0,
                    y: 100,
                    visible: !1,
                    color: "rgba(255,255,255,0)"
                }]
            });
            l = l[d];
            (p = a - 100 + l.data[l.data.length - 1].y) && l.data.splice(l.data.length - 1, 0, {
                toolText: !1,
                doNotSlice: !0,
                y: p,
                visible: !1,
                color: "rgba(255,255,255,0)"
            });
            l.data[l.data.length -
            1].y = 100 - c;
            for (u = 0; u <= n; u += 1)t = b[u], t._userValue = m.getCleanValue(t.value, this.isValueAbs), t._value = f(t._userValue, 1), k += t._value;
            k = k || 1;
            p = (c - a) / k;
            for (u = n; 0 <= u; --u)t = b[u], n = p * t._value, D = G(h(t.label, t.name)), N = null !== t._userValue ? m.dataLabels(t._userValue) : B, ea = m.percentValue(t._value / k * 100), x = l.data.length - 1, y = f(t.alpha, e), Fa = g.showLabels ? D : B, g.showValues && (g.showPercentValues ? Fa += Fa !== B ? C + ea : ea : void 0 !== N && N !== B && (Fa += Fa !== B ? C + N : N)), xa = G(h(t.tooltext, t.hovertext, g.tooltext)), xa === B ? (xa = D, g.showValuesInTooltip &&
            (g.showPercentInTooltip ? xa += xa !== B ? C + ea : ea : void 0 !== N && N !== B && (xa += xa !== B ? C + N : N))) : xa = db(xa, [1, 2, 3, 14], {
                percentValue: ea,
                label: D,
                formattedValue: N
            }, t), l.data.splice(x, 0, {
                prevPointIndex: q,
                prevSeriesIndex: d - 1,
                displayValue: Fa,
                toolText: xa,
                y: n,
                link: E(t.link),
                doNotSlice: !0,
                color: z(t.color || v.getPlotColor(), y),
                shadow: {opacity: .01 * L(50 < y ? y * y * y * 1E-4 : y * y * .01)}
            }), this.colorCount += 1, t.category && this.addMSPieCat(t.category, d + 1, a, 0 === u ? c : a + n, e, g, x), a += n
        },
        isValueAbs: !0,
        creditLabel: ra
    }, Qa);
    r("radar", {
        friendlyName: "Radar Chart",
        standaloneInit: !0,
        creditLabel: ra,
        defaultSeriesType: "radar",
        areaAlpha: 50,
        spaceManager: function (b, d, a, c) {
            b.chart.plotBorderWidth = 0;
            b.chart.plotBackgroundColor = null;
            var e = b[ha], g = e.x, q = b.xAxis, m = b.yAxis[0], v = d.chart, m = f(v.labelpadding, v.labelxpadding, parseInt(m && m.labels && m.labels.style && m.labels.style.fontSize || 10, 10));
            a -= e.marginLeftExtraSpace + e.marginRightExtraSpace + b.chart.marginRight + b.chart.marginLeft;
            c -= e.marginBottomExtraSpace + e.marginTopExtraSpace + b.chart.marginBottom + b.chart.marginTop;
            e = this.colorManager;
            c -= this.titleSpaceManager(b, d, a, .4 * c);
            q.min = f(g.min, 0);
            q.max = f(g.max, g.catCount - 1);
            q.gridLineColor = z(h(v.radarspikecolor, e.getColor("divLineColor")), f(v.radarspikealpha, v.radarinlinealpha, e.getColor("divLineAlpha")));
            q.gridLineWidth = f(v.radarspikethickness, 1);
            q.showRadarBorder = f(v.showradarborder, 1);
            q.radarBorderThickness = f(v.radarborderthickness, 2);
            q.radarBorderColor = z(h(v.radarbordercolor, e.getColor("divLineColor")), f(v.radarborderalpha, 100));
            q.radarFillColor = z(h(v.radarfillcolor, e.getColor("altHGridColor")),
                f(v.radarfillalpha, e.getColor("altHGridAlpha")));
            b.legend.enabled && (h(v.legendposition, Ia).toLowerCase() != za ? c -= this.placeLegendBlockBottom(b, d, a, c / 2) : a -= this.placeLegendBlockRight(b, d, a / 3, c));
            d = f(v.radarradius);
            g = 2 * f(parseInt(q.labels.style.lineHeight, 10), 12);
            v = 2 * m;
            g = H(a - (100 + v), c - (g + v));
            d = d || .5 * g;
            a = H(.3 * a, .3 * c);
            d < a && (d = a);
            b.chart.axisRadius = d;
            q.labels.labelPadding = m
        },
        anchorAlpha: "100",
        showValues: 0,
        isRadar: !0,
        rendererId: "radar"
    }, r.msareabase);
    Qa = {
        dragExtended: !0, defaultRestoreButtonVisible: 1, spaceManager: function (b,
                                                                                  d, a, c) {
            var e = b[ha], g = b.chart, q = d.chart, m = e.outCanvasStyle, v = c - .3 * (e.marginBottomExtraSpace + g.marginBottom + g.marginTop), l = 0, p = 0, e = this.smartLabel || e.smartLabel, k, n;
            g.formAction = E(q.formaction);
            g.formDataFormat = h(q.formdataformat, I.dataFormats.XML);
            g.formTarget = h(q.formtarget, "_self");
            g.formMethod = h(q.formmethod, "POST");
            g.submitFormAsAjax = f(q.submitformusingajax, 1);
            g.showFormBtn = f(q.showformbtn, 1) && g.formAction;
            g.formBtnTitle = h(q.formbtntitle, "Submit");
            g.formBtnBorderColor = h(q.formbtnbordercolor, "CBCBCB");
            g.formBtnBgColor = h(q.formbtnbgcolor, "FFFFFF");
            g.btnPadding = f(q.btnpadding, 7);
            g.btnSpacing = f(q.btnspacing, 5);
            g.formBtnStyle = {fontSize: m.fontSize, fontFamily: m.fontFamily, fontWeight: "bold"};
            g.formBtnLabelFill = m.color;
            q.btntextcolor && (g.formBtnLabelFill = q.btntextcolor.replace(jb, Oa));
            0 <= (m = f(q.btnfontsize)) && (g.formBtnStyle.fontSize = m + "px");
            Ka(g.formBtnStyle);
            g.showRestoreBtn = f(q.showrestorebtn, this.defaultRestoreButtonVisible, 1);
            g.showRestoreBtn && (g.restoreBtnTitle = h(q.restorebtntitle, "Restore"), g.restoreBtnBorderColor =
                h(q.restorebtnbordercolor, g.formBtnBorderColor), g.restoreBtnBgColor = h(q.restorebtnbgcolor, g.formBtnBgColor), g.restoreBtnStyle = {
                fontSize: g.formBtnStyle.fontSize,
                fontFamily: g.formBtnStyle.fontFamily,
                fontWeight: "bold"
            }, g.restoreBtnLabelFill = g.formBtnLabelFill, q.restorebtntextcolor && (g.restoreBtnLabelFill = q.restorebtntextcolor.replace(jb, Oa)), 0 <= (m = f(q.restorebtnfontsize)) && (g.restoreBtnStyle.fontSize = m + "px"), Ka(g.restoreBtnStyle));
            g.showLimitUpdateMenu = f(q.showlimitupdatemenu, 1);
            g.showFormBtn && (e.setStyle(g.formBtnStyle),
                k = e.getOriSize(g.formBtnTitle), l = k.height || 0);
            g.showRestoreBtn && (e.setStyle(g.restoreBtnStyle), n = e.getOriSize(g.restoreBtnTitle), l = ab(n.height, l) || 0);
            0 < l && (l += g.btnPadding + 4, l > v && (g.btnPadding = ab(g.btnPadding - l + v, 0) / 2, l = v));
            g.btnHeight = l;
            g.showFormBtn && (p = k.width + l, g.formBtnWidth = f(q.formbtnwidth, p), g.formBtnWidth < k.width && (g.formBtnWidth = p));
            g.showRestoreBtn && (p = n.width + l, g.restoreBtnWidth = f(q.restorebtnwidth, p), g.restoreBtnWidth < n.width && (g.restoreBtnWidth = p));
            g.marginBottom += l + g.btnPadding;
            g.spacingBottom +=
                l + g.btnPadding;
            (b.callbacks || (b.callbacks = [])).push(this.drawButtons);
            return this.placeVerticalXYSpaceManager.apply(this, arguments)
        }, drawButtons: function () {
            var b = this.logic, d = this.paper, a = this.options.chart, c = a.btnSpacing, e = this.chartHeight - a.spacingBottom + a.btnPadding, g = this.chartWidth - a.spacingRight, q = this.layers.layerAboveDataset, m = 0;
            a.showFormBtn && (this.submitBtn = d.button(g - a.formBtnWidth, e, a.formBtnTitle, void 0, {
                    width: a.formBtnWidth,
                    height: a.btnHeight,
                    verticalPadding: 1,
                    horizontalPadding: 15
                },
                q).labelcss(a.formBtnStyle).attr({
                fill: [Z(a.formBtnBgColor), a.formBtnLabelFill],
                stroke: Z(a.formBtnBorderColor)
            }).buttonclick(function () {
                b.chartInstance.submitData()
            }), m = a.formBtnWidth + c);
            a.showRestoreBtn && (this.restoreBtn = d.button(g - a.restoreBtnWidth - m, e, a.restoreBtnTitle, void 0, {
                width: a.restoreBtnWidth,
                height: a.btnHeight,
                verticalPadding: 1,
                horizontalPadding: 15
            }, q).labelcss(a.restoreBtnStyle).attr({
                fill: [Z(a.restoreBtnBgColor), a.restoreBtnLabelFill],
                stroke: Z(a.restoreBtnBorderColor)
            }).buttonclick(function () {
                b.chartInstance.restoreData()
            }))
        },
        drawAxisUpdateUI: function () {
            var b = this, d = b.logic, a = b.elements, c = b.options, e = c.chart, g = c[ha], q = d.chartInstance, d = d.renderer, m = b.yAxis[0], f = m.axisData, l = m.poi, p = f.plotLines, k = b.container, n = c.chart.showRangeError, h = g.inCanvasStyle, c = b.toolbar || (b.toolbar = []), m = b.menus || (b.menus = []), u = eb({
                    outline: "none",
                    "-webkit-appearance": "none",
                    filter: "alpha(opacity=0)",
                    position: "absolute",
                    background: "transparent",
                    border: "1px solid #cccccc",
                    textAlign: "right",
                    top: 0,
                    left: 0,
                    width: 50,
                    zIndex: 20,
                    opacity: 0,
                    borderRadius: 0
                },
                h), D, C;
            d && !d.forExport && (C = function (a, c, d) {
                if (a === c + "")return null;
                c = d ? q.setUpperLimit(a, !0) : q.setLowerLimit(a, !0);
                !c && n && b.showMessage("Sorry! Not enough range gap to modify axis limit to " + (Number(a) || "0") + ".<br />Please modify the data values to be within range.<br />&nbsp;<br />(click anywhere on the chart to close this message)", !0);
                return c
            }, nb(["max", "min"], function (a) {
                var c = l[a], d = c.label, g = p[c.index], c = d && d.getBBox(), q, m, f, n, v, D, B;
                if (c && d) {
                    m = c.x + c.width - e.spacingLeft;
                    f = e.marginLeft - m - (Za ?
                            4 : 5);
                    q = wb("input", {type: "text", value: g.value, name: a || ""}, k, !0);
                    eb(u, {top: c.y + (Za ? -1 : 0) + "px", left: f + "px", width: m + "px"});
                    for (n in u)q.style[n] = u[n];
                    w.dem.listen(q, ["focus", "mouseup", "blur", "keyup"], [function () {
                        var a = {opacity: 1, filter: "alpha(opacity=100)", color: h.color}, b;
                        this.value = g.value;
                        for (b in a)this.style[b] = a[b];
                        v = B = !0;
                        d.hide()
                    }, function () {
                        var a = this;
                        B && (B = !1, aa || setTimeout(function () {
                            a.select()
                        }, 0))
                    }, function () {
                        !0 !== C(this.value, g.value, g.isMaxLabel) && (this.style.opacity = 0, this.style.filter =
                            "alpha(opacity=0)", d.show());
                        Sb && Ua.getElementsByTagName("body")[0].focus && Ua.getElementsByTagName("body")[0].focus();
                        v = B = !1
                    }, function (a) {
                        var b = a.originalEvent.keyCode, c = this.value;
                        13 === b ? (a = C(c, g.value, g.isMaxLabel), !1 === a && (this.style.color = "#dd0000")) : 27 === b && (this.value = g.value, w.dem.fire(this, "blur", a))
                    }]);
                    q.setAttribute("isOverlay", "true");
                    Za ? (sb(b.container, "defaultprevented", D = function (a) {
                        q.parentNode && w.dem.fire(q, "blur", a)
                    }), sb(b.container, "destroy", function () {
                        wa(b, "defaultprevented", D);
                        q.parentNode.removeChild(q)
                    })) : (sb(b.container, "mousedown", D = function (a) {
                        a.srcElement !== q && v && w.dem.fire(q, "blur", a)
                    }), sb(b.container, "destroy", function () {
                        wa(b.container, "mousedown", D);
                        q.parentNode.removeChild(q)
                    }))
                }
            }), e.showLimitUpdateMenu && (m.push(D = Ob({
                chart: b,
                basicStyle: g.outCanvasStyle,
                items: [{
                    text: "Increase Upper Limit", onclick: function () {
                        q.setUpperLimit(f.max + f.tickInterval, !0)
                    }
                }, {
                    text: "Increase Lower Limit", onclick: function () {
                        q.setLowerLimit(f.min + f.tickInterval, !0)
                    }
                }, {
                    text: "Decrease Upper Limit",
                    onclick: function () {
                        q.setUpperLimit(f.max - f.tickInterval, !0)
                    }
                }, {
                    text: "Decrease Lower Limit", onclick: function () {
                        q.setLowerLimit(f.min - f.tickInterval, !0)
                    }
                }],
                position: {
                    x: e.spacingLeft,
                    y: q.height - e.spacingBottom + (e.showFormBtn || e.showRestoreBtn ? 10 : -15)
                }
            })), a.configureButton = c.add("configureIcon", function (a, b) {
                return function () {
                    D.visible ? D.hide() : D.show({x: a, y: b + 1})
                }
            }(), {
                x: e.spacingLeft,
                y: q.height - e.spacingBottom + (e.showFormBtn || e.showRestoreBtn ? 10 : -15),
                tooltip: "Change Y-Axis Limits"
            })))
        }, getCollatedData: function () {
            var b =
                this.chartInstance, d = b.__state, a = b.jsVars, b = this.updatedDataObj || P({}, b.getChartData(I.dataFormats.JSON)), c = a._reflowData, a = b.dataset, e = (c = c && c.hcJSON && c.hcJSON.series) && c.length, g, q, m, f;
            if (void 0 !== d.hasStaleData && !d.hasStaleData && this.updatedDataObj)return this.updatedDataObj;
            if (a && c)for (; e--;)if (q = a[e] && a[e].data, (g = (m = c[e] && c[e].data) && m.length) && q)for (; g--;)if (f = m[g])q[g].value = f.y;
            d.hasStaleData = !1;
            return this.updatedDataObj = b
        }, eiMethods: {
            restoreData: function () {
                var b = this.jsVars, d = b.fcObj;
                b._reflowData =
                {};
                delete b._reflowClean;
                I.hcLib.createChart(d, b.container, b.type, void 0, void 0, !1, !0);
                w.raiseEvent("dataRestored", {}, d, [d.id]);
                return !0
            }, submitData: function () {
                var b = this.jsVars, d = b.fcObj, a = d.__state, c = a._submitAjaxObj || (a._submitAjaxObj = new I.ajax), a = I.dataFormats.JSON, e = I.dataFormats.CSV, g = I.dataFormats.XML, b = b.instanceAPI, q = b.hcJSON.chart, m = q.formAction, f = q.submitFormAsAjax, l, p, k, n, h;
                q.formDataFormat === a ? (l = a, p = JSON.stringify(b.getCollatedData())) : q.formDataFormat === e ? (l = e, p = b.getCSVString && b.getCSVString(),
                void 0 === p && (p = I.core.transcodeData(b.getCollatedData(), a, e))) : (l = g, p = I.core.transcodeData(b.getCollatedData(), a, g));
                I.raiseEvent("beforeDataSubmit", {data: p}, d, void 0, function () {
                    f ? (c.onError = function (a, b, c, e) {
                        w.raiseEvent("dataSubmitError", {
                            xhrObject: b.xhr,
                            url: e,
                            statusText: a,
                            httpStatus: b.xhr && b.xhr.status ? b.xhr.status : -1,
                            data: p
                        }, d, [d.id, a, b.xhr && b.xhr.status])
                    }, c.onSuccess = function (a, b, e, g) {
                        w.raiseEvent("dataSubmitted", {xhrObject: c, response: a, url: g, data: p}, d, [d.id, a])
                    }, k = {}, k["str" + l.toUpperCase()] =
                        p, c.open && c.abort(), c.post(m, k)) : (n = Va.document.createElement("span"), n.innerHTML = '<form style="display:none" action="' + m + '" method="' + q.formMethod + '" target="' + q.formTarget + '"> <input type="hidden" name="strXML" value="' + Ac(p) + '"><input type="hidden" name="dataFormat" value="' + l.toUpperCase() + '" /></form>', h = n.removeChild(n.firstChild), Va.document.body.appendChild(h), h.submit && h.submit(), h.parentNode.removeChild(h), n = h = null)
                }, function () {
                    I.raiseEvent("dataSubmitCancelled", {data: p}, d)
                })
            }, getDataWithId: function () {
                for (var b =
                    this.jsVars.instanceAPI.getCollatedData(), d = [[B]], a = b.dataset, b = b.categories && b.categories[0] && b.categories[0].category, c = a && a.length || 0, e = 0, g, q, m, f, l, p; c--;)if (q = a[c])for (d[0][c + 1] = q.id || q.seriesname, f = q.id || c + 1, p = (q = q.data) && q.length || 0, l = 0; l < p; l += 1) {
                    m = l + 1;
                    if (!d[m]) {
                        for (g = b && b[l + e] || {}; g.vline;)e += 1, g = b[l + e] || {};
                        g = g.label || g.name || B;
                        d[m] = [g]
                    }
                    g = d[m];
                    m = q[l].id || m + "_" + f;
                    g[c + 1] = [m, Number(q[l].value)]
                }
                return d
            }, getData: function (b) {
                var d = this.jsVars.instanceAPI.getCollatedData(), a = [[B]], c = d.dataset, e =
                    d.categories && d.categories[0] && d.categories[0].category, g = c && c.length || 0, q = 0, m, f, l;
                if (b)a = /^json$/ig.test(b) ? d : I.core.transcodeData(d, "json", b); else for (; g--;)if (b = c[g])for (a[0][g + 1] = c[g].seriesname, d = (b = c[g] && c[g].data) && b.length || 0, l = 0; l < d; l += 1) {
                    f = l + 1;
                    if (!a[f]) {
                        for (m = e && e[l + q] || {}; m.vline;)q += 1, m = e[l + q] || {};
                        m = m.label || m.name || B;
                        a[f] = [m]
                    }
                    f = a[f];
                    f[g + 1] = Number(b[l].value)
                }
                return a
            }, setYAxisLimits: function (b, d) {
                var a = this.jsVars.instanceAPI, c = a.hcJSON, e = a.dataObj, g = e && e.chart || {}, c = c && c.yAxis && c.yAxis[0] || !1, q = !1;
                g.animation = !1;
                if (!c)return !1;
                void 0 !== b && b > a.highValue && b !== c.max ? (g.yaxismaxvalue = b, q = !0) : (b = a.highValue > c.max ? a.highValue : c.max, g.yaxismaxvalue = b);
                void 0 !== d && d < a.lowValue && d !== c.min ? (g.yaxisminvalue = d, q = !0) : (d = a.lowValue < c.min ? a.lowValue : c.min, g.yaxisminvalue = d);
                q && a.updateChartWithData(e);
                return q
            }, getUpperLimit: function () {
                var b = this.jsVars.instanceAPI.hcJSON;
                return (b = b.yAxis && b.yAxis[0]) ? b.max : void 0
            }, setUpperLimit: function (b) {
                return this.jsVars.fcObj.setYAxisLimits(b, void 0)
            }, getLowerLimit: function () {
                var b =
                    this.jsVars.instanceAPI.hcJSON;
                return (b = b.yAxis && b.yAxis[0]) ? b.min : void 0
            }, setLowerLimit: function (b) {
                return this.jsVars.fcObj.setYAxisLimits(void 0, b)
            }
        }, updateChartWithData: function (b) {
            var d = this.chartInstance, a = d.jsVars, c = b && b.chart;
            b = a._reflowData || (a._reflowData = {});
            c = {
                dataObj: {
                    chart: {
                        yaxisminvalue: f(c.yaxisminvalue),
                        yaxismaxvalue: f(c.yaxismaxvalue),
                        animation: c.animation
                    }
                }
            };
            P(b, c, !0);
            I.hcLib.createChart(d, a.container, a.type)
        }, preSeriesAddition: function () {
            var b = this, d = b.hcJSON, a = b.dataObj.chart,
                c = d.chart;
            b.tooltipSepChar = d[ha].tooltipSepChar;
            c.allowAxisChange = f(a.allowaxischange, 1);
            c.changeDivWithAxis = 1;
            c.snapToDivOnly = f(a.snaptodivonly, 0);
            c.snapToDiv = c.snapToDivOnly ? 1 : f(a.snaptodiv, 1);
            c.snapToDivRelaxation = f(a.snaptodivrelaxation, 10);
            c.doNotSnap = f(a.donotsnap, 0);
            c.doNotSnap && (c.snapToDiv = c.snapToDivOnly = 0);
            c.showRangeError = f(a.showrangeerror, 0);
            f(a.allowaxischange, 1) && (d.callbacks || (d.callbacks = [])).push(function (a) {
                var c = this, d = arguments, m;
                sb(a.renderer.container, "destroy", function () {
                    m &&
                    (m = clearTimeout(m))
                });
                m = setTimeout(function () {
                    b.drawAxisUpdateUI.apply(c, d);
                    m = null
                }, 1)
            })
        }, getTooltextCreator: function () {
            var b = arguments;
            return function () {
                var d = arguments, a = d.length, c, e, g;
                for (g = 0; g < a; g += 1)void 0 !== (e = d[g]) && void 0 !== (c = b[g]) && (b[g] = "object" === typeof c ? P(c, e) : e);
                return db.apply(this, b)
            }
        }, getPointStub: function (b, d, a, c, e, g, q) {
            var m = this.isDual, v = this.dataObj.chart;
            c = c[ha];
            var l = null === d ? d : c.numberFormatter.dataLabels(d, 1 === q ? !0 : !1), p = E(G(h(b.tooltext, e.plottooltext, c.tooltext))), k = c.tooltipSepChar,
                n = e._sourceDataset;
            d = f(b.allowdrag, n.allowdrag, 1);
            var n = f(b.allownegativedrag, n.allownegativedrag, e.allownegativedrag, 1), t, u, D, C, x = 0, y = 0, N, ea;
            c.showTooltip ? void 0 !== p ? (ea = this.getTooltextCreator(p, [1, 2, 3, 4, 5, 6, 7], {
                yaxisName: G(m ? q ? v.syaxisname : v.pyaxisname : v.yaxisname),
                xaxisName: G(v.xaxisname),
                formattedValue: l,
                label: a
            }, b, v, e), e = ea(), e === p && (ea = void 0, x = 1)) : null === l ? e = !1 : (c.seriesNameInToolTip && (C = W(e && e.seriesname)), e = C ? C + k : B, N = e += a ? a + k : B, c.showPercentInToolTip ? t = !0 : e += l) : e = !1;
            f(b.showvalue, g) ? void 0 !==
            E(b.displayvalue) ? (D = G(b.displayvalue), y = 1) : c.showPercentValues ? u = !0 : D = l : D = B;
            g = h(G(b.displayvalue), l, B);
            b = h(b.link);
            return {
                displayValue: D,
                displayValueArgs: g,
                categoryLabel: a,
                toolText: e,
                link: b,
                showPercentValues: u,
                showPercentInToolTip: t,
                allowDrag: d,
                allowNegDrag: n,
                _toolTextStr: N,
                _isUserValue: y,
                _isUserTooltip: x,
                _getTooltext: ea
            }
        }
    };
    r("dragnode", {
        friendlyName: "Dragable Node Chart",
        standaloneInit: !0,
        decimals: 2,
        numdivlines: 0,
        numVDivLines: 0,
        defaultZeroPlaneHighlighted: !1,
        defaultZeroPlaneHidden: !0,
        spaceManager: Qa.spaceManager,
        drawButtons: Qa.drawButtons,
        updateChartWithData: Qa.updateChartWithData,
        creditLabel: ra,
        canvasPaddingModifiers: null,
        defaultSeriesType: "dragnode",
        rendererId: "dragnode",
        tooltipsepchar: " - ",
        showAxisLimitGridLines: 0,
        cleanedData: function (b, d) {
            var a = b && b.hcJSON, c = d && d.hcJSON, e, g, q, m, f, l, p, k, n;
            if (a && c) {
                if (a.series && c.series && (f = c.series.length))for (k = 0; k < f; k += 1)if (g = c.series[k], e = a.series[k], g.data && (l = g.data.length))for (n = 0; n < l; n += 1)!0 === g.data[n] && e && e.data && e.data[n] && (delete e.data[n], e.data[n] = {y: null});
                if (a.connectors && c.connectors && (q = c.connectors.length))for (k = 0; k < q; k += 1)if (g = c.connectors[k], e = a.connectors[k], g.connector && (p = g.connector.length))for (n = 0; n < p; n += 1)!0 === g.connector[n] && e && e.connector && e.connector[n] && (delete e.connector[n], e.connector[n] = {});
                if (a.dragableLabels && c.dragableLabels && (m = c.dragableLabels.length))for (k = 0; k < m; k += 1)!0 === c.dragableLabels[k] && a.dragableLabels[k] && (delete a.dragableLabels[k], a.dragableLabels[k] = {})
            }
        },
        eiMethods: P(eb(r.scatterbase.eiMethods, Qa.eiMethods), {
            addNode: function (b) {
                var d =
                    this.jsVars, a = d.instanceAPI, c = d._reflowData || (d._reflowData = {}), e = a.hcJSON, g = a.numberFormatter, a = h(b.datasetId), q = g.getCleanValue(b.y), g = g.getCleanValue(b.x), m = !1, f = e.series, l = f.length, p = e.xAxis.min, k = e.xAxis.max, n = e.yAxis[0].min, t = e.yAxis[0].max, e = {hcJSON: {series: []}}, u = e.hcJSON.series, D;
                if (void 0 !== a && null !== q && q >= n && q <= t && null !== g && g >= p && g <= k) {
                    for (p = 0; p < l && !m; p += 1)a == f[p].id && (u[p] = {data: []}, m = !0, D = f[p], n = D.data, k = n.length, n.push(n = D._dataParser(b, k, g, q)), u[p].data[k] = n, P(c, e, !0), D = {
                        index: k,
                        dataIndex: k,
                        link: b.link,
                        y: b.y,
                        x: b.x,
                        shape: b.shape,
                        width: b.width,
                        height: b.height,
                        radius: b.radius,
                        sides: b.sides,
                        label: b.name,
                        toolText: b.tooltext,
                        id: b.id,
                        datasetIndex: p,
                        datasetName: D.name,
                        sourceType: "dataplot"
                    });
                    if (m)return fb(d, D, "nodeadded"), I.raiseEvent("nodeadded", D, d.fcObj), !0
                }
                return !1
            }, getNodeAttribute: function (b) {
                var d = this.jsVars, a = d.instanceAPI, d = d._reflowData || (d._reflowData = {}), d = d.hcJSON && d.hcJSON.series || [], a = a.hcJSON.series, c = a.length, e, g, q, m;
                if (void 0 !== b)for (e = 0; e < c; e += 1)for (g = a[e], m = g.data, q = m.length,
                                                                    g = 0; g < q; g += 1)if (m[g].id === b)return d[e] && d[e].data && d[e].data[g] ? P(m[g]._options, d[e].data[g]._options, !0) : m[g]._options;
                return !1
            }, setNodeAttribute: function (b, d, a) {
                var c = this.jsVars, e = c.instanceAPI, g = c._reflowData || (c._reflowData = {}), q = e.hcJSON, m = e.numberFormatter, f = q.series, l = f.length, p = q.xAxis.min, k = q.xAxis.max, n = q.yAxis[0].min, h = q.yAxis[0].max, q = {hcJSON: {series: []}}, e = q.hcJSON.series, u = g.hcJSON && g.hcJSON.series || [], D, C, x, y;
                "object" === typeof d && void 0 === a ? y = d : (y = {}, y[d] = a);
                if (void 0 !== b)for (d = 0; d <
                l; d += 1)for (D = f[d], C = D.data, x = C.length, a = 0; a < x; a += 1)if (b === C[a].id)return b = C[a], delete y.id, u[d] && u[d].data && u[d].data[a] && u[d].data[a]._options && (y = P(u[d].data[a]._options, y, !0)), y = P(b._options, y, !0), b = m.getCleanValue(y.y), m = m.getCleanValue(y.x), null !== b && b >= n && b <= h && null !== m && m >= p && m <= k ? (e[d] = {data: []}, p = D._dataParser(y, a, m, b), k = {
                    index: a,
                    dataIndex: a,
                    link: y.link,
                    y: y.y,
                    x: y.x,
                    shape: y.shape,
                    width: y.width,
                    height: y.height,
                    radius: y.radius,
                    sides: y.sides,
                    label: y.name,
                    toolText: y.tooltext,
                    id: y.id,
                    datasetIndex: d,
                    datasetName: D.name,
                    sourceType: "dataplot"
                }, e[d].data[a] = p, P(g, q, !0), fb(c, k, "nodeupdated"), I.raiseEvent("nodeupdated", k, c.fcObj), !0) : !1;
                return !1
            }, deleteNode: function (b) {
                if (void 0 !== b) {
                    var d = this.jsVars, a = d.instanceAPI, c = d._reflowClean || (d._reflowClean = {}), e = a.hcJSON.series, g = {hcJSON: {series: []}}, q, m, f, l, p;
                    if (e && (f = e.length))for (l = 0; l < f; l += 1)if ((a = e[l]) && (m = a.data) && (q = m.length))for (p = 0; p < q; p += 1)if (b === m[p].id)return g.hcJSON.series[l] = {data: []}, g.hcJSON.series[l].data[p] = !0, P(c, g, !0), b = m[p], b = {
                        index: p,
                        dataIndex: p,
                        link: b.link,
                        y: b.y,
                        x: b.x,
                        shape: b._options.shape,
                        width: b._options.width,
                        height: b._options.height,
                        radius: b._options.radius,
                        sides: b._options.sides,
                        label: b.displayValue,
                        toolText: b.toolText,
                        id: b.id,
                        datasetIndex: l,
                        datasetName: a.name,
                        sourceType: "dataplot"
                    }, fb(d, b, "nodedeleted"), I.raiseEvent("nodedeleted", b, d.fcObj), !0
                }
                return !1
            }, addConnector: function (b) {
                if ("object" === typeof b) {
                    var d = this.jsVars, a = d.instanceAPI, c = d._reflowData || (d._reflowData = {}), a = a.hcJSON, e = a.connectors && a.connectors[0] || {connector: []},
                        a = e.connector.length, g = {hcJSON: {connectors: [{connector: []}]}};
                    b = e._connectorParser && e._connectorParser(b, a);
                    e = {
                        arrowAtEnd: b.arrowAtEnd,
                        arrowAtStart: b.arrowAtStart,
                        fromNodeId: b.from,
                        id: b.id,
                        label: b.label,
                        link: b.connectorLink,
                        sourceType: "connector",
                        toNodeId: b.to
                    };
                    g.hcJSON.connectors[0].connector[a] = b;
                    P(c, g, !0);
                    fb(d, e, "connectoradded");
                    I.raiseEvent("connectoradded", e, d.fcObj);
                    return !0
                }
                return !1
            }, editConnector: function (b, d, a) {
                var c = this.jsVars, e = c.instanceAPI, g = c._reflowData || (c._reflowData = {}), e = e.hcJSON,
                    q = e.connectors || (e.connectors = []), m = q.length, e = {hcJSON: {connectors: []}}, f = e.hcJSON.connectors, l, p, k, n;
                "object" === typeof d && void 0 === a ? n = d : (n = {}, n[d] = a);
                if (void 0 !== b)for (d = 0; d < m; d += 1)if ((p = q[d]) && (l = p.connector))for (k = l.length, a = 0; a < k; a += 1)if (b === l[a].id)return l = l[a], delete n.id, g.hcJSON && g.hcJSON.connectors && g.hcJSON.connectors[d] && g.hcJSON.connectors[d].connector && g.hcJSON.connectors[d].connector[a] && g.hcJSON.connectors[d].connector[a]._options && (n = P(g.hcJSON.connectors[d].connector[a]._options,
                    n, !0)), n = P(l._options, n, !0), b = {
                    arrowAtEnd: Boolean(n.arrowatend),
                    arrowAtStart: Boolean(n.arrowatstart),
                    fromNodeId: n.from,
                    id: b,
                    label: n.label,
                    link: n.link,
                    sourceType: "connector",
                    toNodeId: n.to
                }, f[d] = {connector: []}, l = p._connectorParser(n, a), f[d].connector[a] = l, P(g, e, !0), fb(c, b, "connectorupdated"), I.raiseEvent("connectorupdated", b, c.fcObj), !0;
                return !1
            }, deleteConnector: function (b) {
                if (void 0 !== b) {
                    var d = this.jsVars, a = d.instanceAPI, c = d._reflowClean || (d._reflowClean = {}), e = a.hcJSON.connectors, a = {hcJSON: {connectors: []}},
                        g, q, m, f, l, p = {};
                    if (e && (f = e.length))for (l = 0; l < f; l += 1)if ((g = e[l]) && (m = g.connector) && (q = m.length))for (g = 0; g < q; g += 1)if (b === m[g].id)return b = m[g], p = {
                        arrowAtEnd: b.arrowAtEnd,
                        arrowAtStart: b.arrowAtStart,
                        fromNodeId: b.from,
                        id: b.id,
                        label: b.label,
                        link: b.connectorLink,
                        sourceType: "connector",
                        toNodeId: b.to
                    }, a.hcJSON.connectors[l] = {connector: []}, a.hcJSON.connectors[l].connector[g] = !0, P(c, a, !0), fb(d, p, "connectordeleted"), I.raiseEvent("connectordeleted", p, d.fcObj), !0
                }
                return !1
            }, addLabel: function (b) {
                if (b) {
                    var d = this.jsVars,
                        a = d.instanceAPI, c = d._reflowData || (d._reflowData = {}), e = {hcJSON: {dragableLabels: []}};
                    e.hcJSON.dragableLabels[(a.hcJSON.dragableLabels || []).length] = b;
                    P(c, e, !0);
                    b = {text: b.text, x: b.x, y: b.y, allowdrag: b.allowdrag, sourceType: "labelnode", link: b.link};
                    fb(d, b, "labeladded");
                    I.raiseEvent("labeladded", b, d.fcObj);
                    return !0
                }
                return !1
            }, deleteLabel: function (b, d) {
                var a = this.jsVars, c = a.instanceAPI, e = a._reflowClean || (a._reflowClean = {}), g = {hcJSON: {dragableLabels: []}};
                return b < (c.hcJSON.dragableLabels || []).length ? (g.hcJSON.dragableLabels[b] = !0, P(e, g, !0), fb(a, d, "labeldeleted"), I.raiseEvent("labeldeleted", d, a.fcObj), !0) : !1
            }, setThreshold: function (b) {
                var d = this.jsVars.hcObj.connectorsStore || [], a = d.length, c, e;
                for (e = 0; e < a; e += 1)(c = d[e]) && c.options && (c.options.conStrength < b ? (c.graphic && c.graphic.hide(), c.text && (c.text.hide(), c.text.textBoundWrapper && c.text.textBoundWrapper.hide())) : (c.graphic && c.graphic.show(), c.text && (c.text.show(), c.text.textBoundWrapper && c.text.textBoundWrapper.show())))
            }
        }),
        getCollatedData: function () {
            var b = this.chartInstance,
                d = b.__state, a = b.jsVars, b = this.updatedDataObj || P({}, b.getChartData(I.dataFormats.JSON)), c = a._reflowData, e = a._reflowClean, a = (b.labels || (b.labels = {label: []}), b.labels.label || (b.labels.label = [])), g = c && c.hcJSON && c.hcJSON.dragableLabels, q = e && e.hcJSON && e.hcJSON.dragableLabels, m = b.connectors, f = c && c.hcJSON && c.hcJSON.connectors, l = e && e.hcJSON && e.hcJSON.connectors, p = b.dataset, k = c && c.hcJSON && c.hcJSON.series, c = e && e.hcJSON && e.hcJSON.series, e = k && k.length, n, h, u, D;
            if (void 0 !== d.hasStaleData && !d.hasStaleData && this.updatedDataObj)return this.updatedDataObj;
            if (p && k)for (; e--;)if (h = p[e] && p[e].data, (n = (u = k[e] && k[e].data) && u.length) && h)for (; n--;)if (D = u[n])h[n] ? P(h[n], D._options) : h[n] = D._options;
            if (e = f && f.length)for (b.connectors || (m = b.connectors = [{connector: []}]); e--;)if (k = m[e] && m[e].connector, (n = (h = f[e] && f[e].connector) && h.length) && k)for (; n--;)if (u = h[n])k[n] ? P(k[n], u._options) : k[n] = u._options;
            if ((e = g && g.length) && g)for (; e--;)g[e] && (a[e] = g[e]);
            ic(p, c);
            ic(m, l);
            ic(a, q);
            d.hasStaleData = !1;
            return this.updatedDataObj = b
        },
        createHtmlDialog: function (b, d, a, c, e, g) {
            var q =
                b.paper, m = this.hcJSON[ha].inCanvasStyle, f = b.chartWidth, l = b.chartHeight, h = {
                color: m.color,
                textAlign: "center",
                paddingTop: "1px",
                border: "1px solid #cccccc",
                borderRadius: "4px",
                cursor: "pointer",
                _cursor: "hand",
                backgroundColor: "#ffffff",
                zIndex: 21,
                "-webkit-border-radius": "4px"
            }, k;
            k = q.html("div", {fill: "transparent", width: f, height: l}, {
                fontSize: "10px",
                lineHeight: "15px",
                fontFamily: m.fontFamily
            }, b.container);
            k.veil = q.html("div", {fill: "000000", width: f, height: l, opacity: .3}, void 0, k);
            k.dialog = q.html("div", {
                x: (f - d) /
                2, y: (l - a) / 2, fill: "efefef", strokeWidth: 1, stroke: "000000", width: d, height: a
            }, {
                borderRadius: "5px",
                boxShadow: "1px 1px 3px #000000",
                "-webkit-border-radius": "5px",
                "-webkit-box-shadow": "1px 1px 3px #000000",
                filter: 'progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color="#000000")'
            }, k);
            k.ok = q.html("div", {
                x: d - 70 - 5,
                y: a - 23 - 5,
                width: 65,
                height: 17,
                text: "Submit",
                tabIndex: 1
            }, h, k.dialog).on("click", c);
            k.cancel = q.html("div", {
                x: d - 140 - 5,
                y: a - 23 - 5,
                width: 65,
                height: 17,
                text: "Cancel",
                tabIndex: 2
            }, h, k.dialog).on("click",
                e);
            k.remove = q.html("div", {
                x: d - 210 - 5,
                y: a - 23 - 5,
                width: 65,
                height: 17,
                text: "Delete",
                tabIndex: 3,
                visibility: "hidden"
            }, h, k.dialog).on("click", g);
            k.handleKeyPress = function (a) {
                13 === a.keyCode ? k.ok.trigger(aa ? "touchStart" : "click", a) : 27 === a.keyCode && k.cancel.trigger(aa ? "touchStart" : "click", a)
            };
            k.hide();
            return k
        },
        nodeUpdateUIDefinition: [{key: "id", text: "Id", inputWidth: 60, x: 10, y: 15}, {
            key: "dataset",
            text: "Dataset",
            inputType: "select",
            inputWidth: 110,
            innerHTML: void 0,
            x: 170,
            y: 15
        }, {key: "x", text: "Value", x: 10, y: 40, inputWidth: 21},
            {key: "y", text: ",", x: 88, y: 40, inputWidth: 21, labelWidth: 5}, {
                text: "(x, y)",
                x: 125,
                y: 40,
                labelWidth: 33,
                noInput: !0
            }, {key: "tooltip", text: "Tooltip", inputWidth: 105, x: 170, y: 40}, {
                key: "label",
                text: "Label",
                inputWidth: 92,
                x: 10,
                y: 65
            }, {
                key: "labelalign",
                text: "Align",
                labelWidth: 70,
                inputWidth: 110,
                inputType: "select",
                innerHTML: '<option></option><option value="top">Top</option><option value="middle">Middle</option><option value="bottom">Bottom</option>',
                x: 145,
                y: 63
            }, {key: "color", text: "Color", x: 10, y: 90, inputWidth: 60}, {
                key: "colorOut",
                innerHTML: "&nbsp;", x: 85, y: 90, inputWidth: 15, inputType: "span"
            }, {key: "alpha", text: "Alpha", x: 170, y: 90, inputWidth: 20}, {
                key: "draggable",
                text: "Allow Drag",
                value: !0,
                inputWidth: 20,
                x: 250,
                y: 90,
                labelWidth: 58,
                inputPaddingTop: 3,
                type: "checkbox"
            }, {
                key: "shape",
                text: "Shape",
                inputType: "select",
                inputWidth: 97,
                innerHTML: '<option value="rect">Rectangle</option><option value="circ">Circle</option><option value="poly">Polygon</option>',
                x: 10,
                y: 115
            }, {key: "rectHeight", text: "Height", x: 170, y: 115, inputWidth: 20}, {
                key: "rectWidth",
                text: "Width", x: 255, y: 115, inputWidth: 20
            }, {key: "circPolyRadius", text: "Radius", x: 170, y: 115, inputWidth: 20}, {
                key: "polySides",
                text: "Sides",
                x: 255,
                y: 115,
                inputWidth: 20
            }, {key: "link", text: "Link", x: 10, y: 140, inputWidth: 92}, {
                key: "image",
                text: "Image",
                type: "checkbox",
                inputPaddingTop: 4,
                inputWidth: 20,
                x: 10,
                y: 170
            }, {key: "imgUrl", text: "URL", inputWidth: 105, x: 170, y: 170}, {
                key: "imgWidth",
                text: "Width",
                inputWidth: 20,
                x: 10,
                y: 195
            }, {key: "imgHeight", text: "Height", inputWidth: 20, x: 82, y: 195}, {
                key: "imgAlign",
                text: "Align",
                inputType: "select",
                inputWidth: 75,
                innerHTML: '<option value="top">Top</option><option value="middle">Middle</option><option value="bottom">Bottom</option>',
                x: 170,
                y: 195
            }],
        showNodeUpdateUI: function () {
            var b = function (a) {
                a = a.cacheUpdateUI;
                for (var b = a.fields.shape, d = ["rectWidth", "rectHeight", "circPolyRadius", "polySides"], q = d.length, m; q--;)m = d[q], /rect|poly|circ/ig.test(m) && (a.labels[m].hide(), a.fields[m].hide()), (new RegExp(h(b.val(), "rect"), "ig")).test(m) && (a.labels[m].show(), a.fields[m].show())
            }, d = function (a) {
                a = a.cacheUpdateUI.fields;
                var b = ub(a.color.val());
                b && a.colorOut.css({background: Cb(b)})
            }, a = function (a, b) {
                var d = a.cacheUpdateUI, q = a.chartHeight, m = d.fields.image.val(), f = b ? 300 : 0, l = ["imgWidth", "imgHeight", "imgAlign", "imgUrl"], h, k, n;
                h = m ? 250 : 215;
                d.ok.hide();
                d.cancel.hide();
                d.remove.hide();
                d.error.hide();
                for (k = l.length; !m && k--;)n = l[k], d.labels[n].hide(), d.fields[n].hide();
                w.danimate.animate(d.dialog.element, {top: (q - h) / 2, height: h}, f, "linear", function () {
                    for (k = l.length; k-- && m;)n = l[k], d.labels[n].show(), d.fields[n].show();
                    d.ok.attr({
                        y: h -
                        23 - 5
                    }).show();
                    d.cancel.attr({y: h - 23 - 5}).show();
                    d.remove.attr({y: h - 23 - 5});
                    d.error.attr({y: h - 23 - 5 + 4}).show();
                    d.edit ? d.remove.show() : d.remove.hide()
                })
            };
            return function (c, e, g) {
                var q = this, m = c.cacheUpdateUI, f = c.paper, l = {
                    width: "80px",
                    border: "1px solid #cccccc",
                    fontSize: "10px",
                    lineHeight: "15px",
                    padding: "2px",
                    fontFamily: q.hcJSON[ha].inCanvasStyle.fontFamily
                }, h = 0, k = {textAlign: "right"}, n = m && m.fields, t = m && m.labels, u;
                m || (m = c.cacheUpdateUI = q.createHtmlDialog(c, 350, 215, function () {
                        var a = m && m.fields, b = m.edit, c = q.chartInstance,
                            d = q.hcJSON, e, g, k, f, l, n, v;
                        if (!d)return !1;
                        e = d.xAxis.min;
                        g = d.yAxis[0].min;
                        d = d.series;
                        k = d.length;
                        if (a) {
                            switch (a.shape.val()) {
                                case "circ":
                                    l = "circle";
                                    break;
                                case "poly":
                                    l = "polygon";
                                    break;
                                default:
                                    l = "rectangle"
                            }
                            v = {
                                x: W(a.x.val(), e),
                                y: W(a.y.val(), g),
                                id: e = a.id.val(),
                                datasetId: a.dataset.val(),
                                name: a.label.val(),
                                tooltext: a.tooltip.val(),
                                color: a.color.val(),
                                alpha: a.alpha.val(),
                                labelalign: a.labelalign.val(),
                                allowdrag: a.draggable.val(),
                                shape: l,
                                width: a.rectWidth.val(),
                                height: a.rectHeight.val(),
                                radius: a.circPolyRadius.val(),
                                numsides: a.polySides.val(),
                                imagenode: a.image.val(),
                                imagewidth: a.imgWidth.val(),
                                imageheight: a.imgHeight.val(),
                                imagealign: a.imgAlign.val(),
                                imageurl: a.imgUrl.val(),
                                link: a.link.val()
                            };
                            if (void 0 !== e && !b)for (h = 0; h < k && !f; h += 1)for (l = d[h].data, n = l.length, g = 0; g < n; g += 1)e === l[g].id && (f = !0);
                            if (f)m.error.attr({text: "ID already exist."}), a.label.focus(); else {
                                b ? c && c.setNodeAttribute && c.setNodeAttribute(v.id, v) : c && c.addNode && c.addNode(v);
                                return
                            }
                        }
                        m.enableFields()
                    }, function () {
                        m.hide();
                        m.enableFields();
                        m.error.attr({text: B})
                    },
                    function () {
                        q.chartInstance.deleteNode && q.chartInstance.deleteNode(m.fields.id.val())
                    }), u = m.dialog, t = m.labels = {}, n = m.fields = {});
                m.config = e;
                m.edit = g;
                m.error || (m.error = f.html("span", {color: "ff0000", x: 30, y: 228}, void 0, u));
                m.enableFields || (m.enableFields = function () {
                    for (var a in e)e[a] && e[a].disabled && n[a] && n[a].element.removeAttribute("disabled")
                });
                nb(this.nodeUpdateUIDefinition, function (g) {
                    var q, h = g.key, p = {}, N = e[h] || {}, ea, xa;
                    !t[h] && (t[h] = f.html("label", {x: g.x, y: g.y, width: g.labelWidth || 45, text: g.text},
                        k, u));
                    if (!g.noInput) {
                        q = n[h];
                        if (!q) {
                            l.border = "checkbox" == g.type ? B : "1px solid #cccccc";
                            q = n[h] = f.html(g.inputType || "input", {
                                x: g.labelWidth && g.labelWidth + 5 || 50,
                                y: -2 + (g.inputPaddingTop || 0),
                                width: g.inputWidth || 50,
                                name: h || ""
                            }, l);
                            if ("select" !== g.inputType)q.attr({type: g.type || "text"}).on("keyup", m.handleKeyPress);
                            q.add(t[h])
                        }
                        ca(ea = W(N.innerHTML, g.innerHTML)) && (p.innerHTML = ea);
                        N.disabled && (p.disabled = "disabled");
                        q.attr(p);
                        ca(xa = W(N.value, g.value)) && q.val(xa);
                        "shape" == h && q.on("change", function () {
                            b(c)
                        });
                        "image" ==
                        h && q.on("click", function () {
                            a(c, !0)
                        });
                        "color" == h && q.on("keyup", function () {
                            d(c)
                        })
                    }
                });
                d(c);
                a(c);
                b(c);
                c.options.chart.animation ? m.fadeIn("fast") : m.show();
                m.fields[g ? "label" : "id"].focus()
            }
        }(),
        labelUpdateUIDefinition: [{key: "label", text: "Label*", x: 10, y: 15, inputWidth: 235}, {
            key: "size",
            text: "Size",
            x: 10,
            y: 40
        }, {key: "padding", text: "Padding", x: 10, y: 65}, {
            key: "x",
            text: "Position",
            x: 120,
            y: 65,
            labelWidth: 70,
            inputWidth: 25
        }, {key: "y", text: ",", x: 225, y: 65, labelWidth: 10, inputWidth: 25}, {
            key: "xy",
            text: "(x, y)",
            x: 260,
            y: 65,
            noInput: !0
        },
            {
                key: "allowdrag",
                text: "Allow Drag",
                x: 120,
                y: 40,
                inputType: "checkbox",
                inputPaddingTop: 3,
                inputWidth: 15,
                labelWidth: 70,
                val: 1
            }, {key: "color", text: "Color", x: 10, y: 90}, {
                key: "alpha",
                text: "Alpha",
                x: 145,
                y: 90,
                inputWidth: 30,
                val: "100"
            }, {key: "bordercolor", text: "Border Color", x: 10, y: 125, labelWidth: 100}, {
                key: "bgcolor",
                text: "Background Color",
                x: 10,
                y: 150,
                labelWidth: 100
            }],
        showLabelUpdateUI: function (b, d) {
            var a = this, c = b.paper, e = b.cacheLabelUpdateUI, g = {
                border: "1px solid #cccccc",
                fontSize: "10px",
                lineHeight: "15px",
                fontFamily: a.hcJSON[ha].inCanvasStyle.fontFamily,
                padding: "2px"
            }, q = {textAlign: "right"}, f = e && e.fields, v = e && e.labels, l, p, k;
            e || (e = b.cacheLabelUpdateUI = a.createHtmlDialog(b, 315, 205, function () {
                var b = e && e.fields, c;
                b && (c = {
                    text: b.label.val(),
                    x: b.x.val(),
                    y: b.y.val(),
                    color: b.color.val(),
                    alpha: b.alpha.val(),
                    bgcolor: b.bgcolor.val(),
                    bordercolor: b.bordercolor.val(),
                    fontsize: b.size.val(),
                    allowdrag: b.allowdrag.val(),
                    padding: b.padding.val()
                }, c.text ? a.chartInstance && a.chartInstance.addLabel && a.chartInstance.addLabel(c) : (e.error.attr({text: "Label cannot be blank."}),
                    b.label.focus()))
            }, function () {
                e.error.attr({text: ""});
                e.hide()
            }), k = e.dialog, v = e.labels = {}, f = e.fields = {});
            nb(a.labelUpdateUIDefinition, function (a) {
                var b = a.key;
                v[b] || (v[b] = c.html("label", {x: a.x, y: a.y, width: a.labelWidth || 45, text: a.text}, q, k));
                a.noInput || ((l = f[b]) || (l = f[b] = c.html("input", {
                    y: -2 + (a.inputPaddingTop || 0),
                    x: a.labelWidth && a.labelWidth + 5 || 50,
                    width: a.inputWidth || 50,
                    type: a.inputType || "text",
                    name: b || ""
                }, g, v[b]).on("keyup", e.handleKeyPress)), void 0 !== (p = h(d[b], a.val)) && l.val(p))
            });
            e.error || (e.error =
                c.html("span", {color: "ff0000", x: 10, y: 180}, void 0, k));
            b.animation ? e.fadeIn("fast") : e.show();
            e.fields.label.focus()
        },
        showLabelDeleteUI: function (b, d) {
            var a = this, c = b.paper, e = b["cache-label-delete-ui"], g = d.data && d.data("data") || {}, q = d.data && d.data("eventArgs"), g = g && g.labelNode;
            e || (e = b["cache-label-delete-ui"] = a.createHtmlDialog(b, 250, 100, void 0, function () {
                e.hide()
            }, function () {
                a.chartInstance.deleteLabel(g.index, q)
            }), e.message = c.html("span", {
                x: 10,
                y: 10,
                width: 230,
                height: 80
            }).add(e.dialog), e.ok.hide(), e.remove.translate(175).show());
            e.message.attr({text: 'Would you really like to delete the label: "' + g.text + '"?'});
            b.animation ? e.fadeIn("fast") : e.show()
        },
        connectorUpdateUIDefinition: [{
            key: "fromid",
            text: "Connect From",
            inputType: "select",
            x: 10,
            y: 15,
            labelWidth: 80,
            inputWidth: 100
        }, {
            key: "toid",
            text: "Connect To",
            inputType: "select",
            x: 10,
            y: 40,
            labelWidth: 80,
            inputWidth: 100
        }, {
            key: "arratstart",
            text: "Arrow At Start",
            x: 200,
            y: 15,
            type: "checkbox",
            inputPaddingTop: 3,
            labelWidth: 80,
            inputWidth: 15
        }, {
            key: "arratend", text: "Arrow At End", x: 200, y: 40, type: "checkbox",
            inputPaddingTop: 3, labelWidth: 80, inputWidth: 15
        }, {key: "label", text: "Label", x: 10, y: 75, labelWidth: 40, inputWidth: 120}, {
            key: "id",
            text: "Node ID",
            x: 190,
            y: 75,
            inputWidth: 55
        }, {key: "color", text: "Color", x: 10, y: 100, labelWidth: 40, inputWidth: 35}, {
            key: "alpha",
            text: "Alpha",
            x: 110,
            y: 100,
            inputWidth: 25,
            labelWidth: 35
        }, {key: "strength", text: "Strength", x: 190, y: 100, inputWidth: 55, val: "0.1"}, {
            key: "url",
            text: "Link",
            x: 10,
            y: 125,
            labelWidth: 40,
            inputWidth: 120
        }, {key: "tooltext", text: "Tooltip", x: 190, y: 125, labelWidth: 40, inputWidth: 60},
            {
                key: "dashed",
                text: "Dashed",
                x: 10,
                y: 150,
                type: "checkbox",
                inputPaddingTop: 3,
                inputWidth: 15,
                labelWidth: 40
            }, {key: "dashgap", text: "Dash Gap", x: 85, y: 150, labelWidth: 60, inputWidth: 25}, {
                key: "dashlen",
                text: "Dash Length",
                x: 190,
                y: 150,
                labelWidth: 70,
                inputWidth: 30
            }],
        showConnectorUpdateUI: function (b, d, a) {
            var c = this.chartInstance, e = b.paper, g = b.cacheConnectorUpdateUI, q = {
                    border: "1px solid #cccccc",
                    fontSize: "10px",
                    lineHeight: "15px",
                    fontFamily: this.hcJSON[ha].inCanvasStyle.fontFamily,
                    padding: "2px"
                }, f = {textAlign: "right"},
                v = g && g.fields, l = g && g.labels, p, k, n, t;
            g || (g = b.cacheConnectorUpdateUI = this.createHtmlDialog(b, 315, 215, function () {
                var b = g && g.fields, d;
                b && (d = {
                    from: b.fromid.val(),
                    to: b.toid.val(),
                    id: b.id.val(),
                    label: b.label.val(),
                    color: b.color.val(),
                    alpha: b.alpha.val(),
                    link: b.url.val(),
                    tooltext: b.tooltext.val(),
                    strength: b.strength.val(),
                    arrowatstart: b.arratstart.val(),
                    arrowatend: b.arratend.val(),
                    dashed: b.dashed.val(),
                    dashlen: b.dashlen.val(),
                    dashgap: b.dashgap.val()
                }, d.from ? d.to ? d.from != d.to ? (a ? c.editConnector(d.id, d) : c.addConnector(d),
                    g.enableFields()) : (g.error.attr({text: "Connector cannot start and end at the same node!"}), b.fromid.focus()) : (g.error.attr({text: "Please select a valid connector end."}), b.toid.focus()) : (g.error.attr({text: "Please select a valid connector start."}), b.fromid.focus()))
            }, function () {
                g.error.attr({text: ""});
                g.enableFields();
                g.hide()
            }, function () {
                c.deleteConnector(g.fields.id.val())
            }), t = g.dialog, l = g.labels = {}, v = g.fields = {});
            g.config = d;
            g.enableFields = function () {
                for (var a in d)d[a] && d[a].disabled && v[a] && v[a].element.removeAttribute("disabled")
            };
            nb(this.connectorUpdateUIDefinition, function (a) {
                var b = a.key, c = d[b] || {};
                l[b] || (l[b] = e.html("label", {x: a.x, y: a.y, width: a.labelWidth || 45, text: a.text}, f, t));
                if (!a.noInput) {
                    if (!(k = v[b])) {
                        k = v[b] = e.html(a.inputType || "input", {
                            y: -2 + (a.inputPaddingTop || 0),
                            x: a.labelWidth && a.labelWidth + 5 || 50,
                            width: a.inputWidth || 50,
                            name: b || ""
                        }, q);
                        if ("select" !== a.inputType)k.attr({type: a.type || "text"}).on("keyup", g.handleKeyPress);
                        k.add(l[b])
                    }
                    (p = h(c.innerHTML, a.innerHTML)) && k.attr({innerHTML: p});
                    void 0 !== (n = h(c.val, a.val)) && k.val(n);
                    c.disabled && k.attr({disabled: "disabled"})
                }
            });
            g.checkDash = function () {
                var a = v.dashed && v.dashed.val() ? "show" : "hide";
                l.dashgap && l.dashgap[a]();
                v.dashgap && v.dashgap[a]();
                l.dashlen && l.dashlen[a]();
                v.dashlen && v.dashlen[a]()
            };
            g.checkDash();
            v.dashed.on("click", g.checkDash);
            g.error || (g.error = e.html("span", {color: "ff0000", x: 10, y: 170}, void 0, t));
            g.remove[a ? "show" : "hide"]();
            b.animation ? g.fadeIn("fast") : g.show()
        },
        drawNodeUpdateButtons: function () {
            var b = this, d = b.logic, a = b.options, c = a.chart, e = a.pointStore || {}, g = a.series,
                a = (a = a[ha]) && a.outCanvasStyle || b.outCanvasStyle || {}, q = b.menu || (b.menu = []), f = b.toolbar, h = g.length, l = "", p = "", k, n;
            for (n in e)l += '<option value="' + n + '">' + n + "</option>";
            for (n = 0; n < h; n += 1)e = g[n], p += '<option value="' + e.id + '">' + (e.name !== B && void 0 !== e.name && e.name + Ca + " " || B) + e.id + "</option>";
            q.push(k = Ob({
                chart: b,
                basicStyle: a,
                items: [{
                    text: "Add a Node", onclick: function () {
                        d.showNodeUpdateUI(b, {dataset: {innerHTML: p}})
                    }
                }, {
                    text: "Add a Label", onclick: function () {
                        d.showLabelUpdateUI(b, {})
                    }
                }, {
                    text: "Add a Connector",
                    onclick: function () {
                        d.showConnectorUpdateUI(b, {fromid: {innerHTML: l}, toid: {innerHTML: l}})
                    }
                }],
                position: {
                    x: c.spacingLeft,
                    y: b.chartHeight - c.spacingBottom + (c.showFormBtn || c.showRestoreBtn ? 10 : -15)
                }
            }));
            b.elements.configureButton = f.add("configureIcon", function (a, b) {
                return function () {
                    k.visible ? k.hide() : k.show({x: a, y: b + 1})
                }
            }(), {
                x: c.spacingLeft,
                y: b.chartHeight - c.spacingBottom + (c.showFormBtn || c.showRestoreBtn ? 10 : -15),
                tooltip: "Add or edit items"
            })
        },
        postSeriesAddition: function () {
            var b = this.hcJSON, d = this.dataObj.chart,
                a = this.base.postSeriesAddition && this.base.postSeriesAddition.apply(this, arguments);
            b.legend.enabled = "1" == d.showlegend ? !0 : !1;
            (b.chart.viewMode = f(d.viewmode, 0)) || (b.callbacks || (b.callbacks = [])).push(this.drawNodeUpdateButtons);
            return a
        },
        pointHoverOptions: function (b, d, a, c) {
            var e = f(b.showhovereffect, d.showhovereffect, a.plothovereffect, a.showhovereffect), g = {}, q = !!h(b.hovercolor, d.hovercolor, a.plotfillhovercolor, b.hoveralpha, d.hoveralpha, a.plotfillhoveralpha, b.borderhovercolor, d.borderhovercolor, a.plotborderhovercolor,
                b.borderhoveralpha, d.borderhoveralpha, a.plotborderhoveralpha, b.borderhoverthickness, d.borderhoverthickness, a.plotborderhoverthickness, b.hoverheight, d.hoverheight, a.plothoverheight, b.hoverwidth, d.hoverwidth, a.plothoverwidth, b.hoverradius, d.hoverradius, a.plothoverradius, e), m = !1;
            if (void 0 === e && q || e)m = !0, e = h(b.hovercolor, d.hovercolor, a.plotfillhovercolor, Q(c.color, 70)), q = h(b.hoveralpha, d.hoveralpha, a.plotfillhoveralpha, c.alpha), g = {
                stroke: z(h(b.borderhovercolor, d.borderhovercolor, a.plotborderhovercolor,
                    c.borderColor), f(b.borderhoveralpha, d.borderhoveralpha, a.plotborderhoveralpha, q, c.borderAlpha)),
                "stroke-width": f(b.borderhoverthickness, d.borderhoverthickness, a.plotborderhoverthickness, c.borderThickness),
                height: f(b.hoverheight, d.hoverheight, a.plothoverheight, c.height),
                width: f(b.hoverwidth, d.hoverwidth, a.plothoverwidth, c.width),
                r: f(b.hoverradius, d.hoverradius, a.plothoverradius, c.radius)
            }, b = c.use3D ? this.getPointColor(Z(h(b.hovercolor, d.hovercolor, a.plotfillhovercolor, Q(c.color, 70))), h(b.hoveralpha,
                d.hoveralpha, a.plotfillhoveralpha, c.alpha), c.shapeType) : z(e, q), g.fill = pa(b);
            return {enabled: m, rolloverProperties: g}
        },
        point: function (b, d, a, c, e, g, q) {
            var m = this;
            b = f(c.ignoreemptydatasets, 0);
            var v = m.numberFormatter, l = (g = a.data) && g.length, p = f(a.showvalues, e[ha].showValues), k = f(c.useroundedges), n = !1, t = m.colorManager, u, D, C, x, y, N, ea, xa, r, F, la, K, w, na;
            d.zIndex = 1;
            d.name = E(a.seriesname);
            N = d.id = h(a.id, q);
            if (b && !a.data)return d.showInLegend = !1, d;
            if (0 === f(a.includeinlegend) || void 0 === d.name)d.showInLegend = !1;
            D = h(c.plotfillalpha,
                "100");
            C = f(c.showplotborder, 1);
            q = Z(h(c.plotbordercolor, "666666"));
            u = f(c.plotborderthickness, k ? 2 : 1);
            x = h(c.plotborderalpha, c.plotfillalpha, k ? "35" : "95");
            y = Boolean(f(c.use3dlighting, c.is3d, k ? 1 : 0));
            ea = Z(h(a.color, t.getPlotColor()));
            xa = h(a.plotfillalpha, a.nodeFillAlpha, a.alpha, D);
            k = Boolean(f(a.showplotborder, C));
            r = Z(h(a.plotbordercolor, a.nodebordercolor, q));
            F = f(a.plotborderthickness, a.nodeborderthickness, u);
            la = k ? h(a.plotborderalpha, a.nodeborderalpha, a.alpha, x) : "0";
            K = Boolean(f(a.allowdrag, 1));
            d.marker = {
                enabled: !0,
                fillColor: z(ea, xa), lineColor: {FCcolor: {color: r, alpha: la}}, lineWidth: F, symbol: "poly_4"
            };
            x = d._dataParser = function (b, d, g, q) {
                d = h(b.id, N + "_" + d);
                var k = Boolean(f(b.allowdrag, K)), l = E(b.shape, "rectangle").toLowerCase(), n = E(b.height, 10), t = E(b.width, 10), u = E(b.radius, 10), D = E(b.numsides, 4), x = Z(h(b.color, ea)), C = h(b.alpha, xa), A = E(b.imageurl), Y = Boolean(f(b.imagenode));
                switch (l) {
                    case "circle":
                        na = 0;
                        break;
                    case "polygon":
                        na = 2;
                        l = ga(D);
                        break;
                    default:
                        na = 1
                }
                w = y ? m.getPointColor(x, C, na) : z(x, C);
                D = m.pointHoverOptions(b, a, c, {
                    plotType: "funnel",
                    shapeType: na,
                    use3D: y,
                    height: n,
                    width: t,
                    radius: u,
                    color: x,
                    alpha: C,
                    borderColor: r,
                    borderAlpha: la,
                    borderThickness: F
                });
                return P(m.getPointStub(b, q, v.xAxis(g), e, a, p), {
                    hoverEffects: D,
                    _options: b,
                    y: q,
                    x: g,
                    id: d,
                    imageNode: Y,
                    imageURL: A,
                    imageAlign: E(b.imagealign, B).toLowerCase(),
                    imageWidth: E(b.imagewidth),
                    imageHeight: E(b.imageheight),
                    labelAlign: h(b.labelalign, Y && ca(A) ? La : "middle"),
                    allowDrag: k,
                    marker: {
                        enabled: !0,
                        fillColor: w,
                        lineColor: {FCcolor: {color: r, alpha: la}},
                        lineWidth: F,
                        radius: u,
                        height: n,
                        width: t,
                        symbol: l
                    },
                    tooltipConstraint: m.tooltipConstraint
                })
            };
            for (q = 0; q < l; q += 1)if (u = g[q])k = v.getCleanValue(u.y), t = v.getCleanValue(u.x), null === k ? d.data.push({
                _options: u,
                y: null
            }) : (n = !0, d.data.push(x(u, q, t, k)), this.pointValueWatcher(e, k, t));
            b && !n && (d.showInLegend = !1);
            return d
        },
        getPointColor: function (b, d, a) {
            var c;
            b = Z(b);
            d = ib(d);
            c = Q(b, 80);
            b = tc(b, 65);
            d = {FCcolor: {gradientUnits: "objectBoundingBox", color: c + "," + b, alpha: d + "," + d, ratio: Nb}};
            a ? d.FCcolor.angle = 1 === a ? 0 : 180 : (d.FCcolor.cx = .4, d.FCcolor.cy = .4, d.FCcolor.r = "50%", d.FCcolor.radialGradient = !0);
            return d
        },
        getPointStub: function (b,
                                d, a, c, e) {
            var g = this.dataObj.chart, q = c[ha], f = null === d ? d : q.numberFormatter.dataLabels(d), v = E(G(h(b.tooltext, e.plottooltext, q.tooltext))), l = this.tooltipSepChar = q.tooltipSepChar, p = h(b.label, b.name);
            d = G(p);
            var k;
            c = B;
            var n = !1;
            q.showTooltip ? void 0 !== v ? (n = !0, e = db(v, [3, 4, 5, 6, 8, 9, 10, 11], {
                yaxisName: G(g.yaxisname),
                xaxisName: G(g.xaxisname),
                yDataValue: f,
                xDataValue: a,
                label: d
            }, b, g, e)) : void 0 !== p ? (e = d, n = !0) : null === f ? e = !1 : (q.seriesNameInToolTip && (k = W(e && e.seriesname)), e = c = k ? k + l : B, e += a ? a + l : B, e += f) : e = !1;
            b = h(b.link);
            return {displayValue: d, toolText: e, link: b, _toolTextStr: c, _isUserTooltip: n}
        },
        connector: function (b, d, a, c, e) {
            var g = e[ha], q = g.smartLabel;
            e = (b = a.connector) && b.length;
            var m, v, l, p, k, n, t, u, D, C, x, y = E(G(h(a.connectortooltext, c.connectortooltext))), N = "$fromLabel" + g.tooltipSepChar + "$toLabel";
            m = f(a.stdthickness, 1);
            v = Z(h(a.color, "FF5904"));
            l = h(a.alpha, "100");
            p = f(a.dashgap, 5);
            k = f(a.dashlen, 5);
            n = Boolean(f(a.dashed, 0));
            t = Boolean(f(a.arrowatstart, 1));
            u = Boolean(f(a.arrowatend, 1));
            D = f(a.strength, 1);
            c = d.connector;
            C = d._connectorParser =
                function (a, b) {
                    var c = G(h(a.label, a.name)), d = h(a.alpha, l), d = {
                        FCcolor: {
                            color: Z(h(a.color, v)),
                            alpha: d
                        }
                    }, e = q.getOriSize(c), C = E(G(h(a.tooltext, y)));
                    x = g.showTooltip ? h(C, c ? "$label" : N) : !1;
                    return {
                        _options: a,
                        id: h(a.id, b).toString(),
                        from: h(a.from, B),
                        to: h(a.to, B),
                        label: c,
                        toolText: x,
                        customToolText: C,
                        color: d,
                        dashStyle: Boolean(f(a.dashed, n)) ? ta(f(a.dashlen, k), f(a.dashgap, p), m) : "none",
                        arrowAtStart: Boolean(f(a.arrowatstart, t)),
                        arrowAtEnd: Boolean(f(a.arrowatend, u)),
                        conStrength: f(a.strength, D),
                        connectorLink: E(a.link),
                        stdThickness: m,
                        labelWidth: e.widht,
                        labelHeight: e.height
                    }
                };
            for (a = 0; a < e; a += 1)c.push(C(b[a], a));
            return d
        },
        series: function (b, d, a) {
            var c = d[ha], e = [], g, q, m, v;
            d.legend.enabled = Boolean(f(b.chart.showlegend, 1));
            if (b.dataset && 0 < (q = b.dataset.length)) {
                this.categoryAdder(b, d);
                c.x.requiredAutoNumericLabels = !1;
                if (b.connectors && (g = b.connectors.length))for (v = 0, m = g; v < m; v += 1)g = {connector: []}, e.push(this.connector(a, g, b.connectors[v], b.chart, d, c.oriCatTmp.length, v)); else g = {connector: []}, e.push(this.connector(a, g, {}, b.chart,
                    d, c.oriCatTmp.length, v));
                for (v = 0; v < q; v += 1)g = {
                    hoverEffects: this.parseSeriesHoverOptions(b, d, b.dataset[v], a),
                    data: []
                }, g = this.point(a, g, b.dataset[v], b.chart, d, c.oriCatTmp.length, v), g instanceof Array ? d.series = d.series.concat(g) : d.series.push(g);
                d.connectors = e;
                b.labels && b.labels.label && 0 < b.labels.label.length && (d.dragableLabels = b.labels.label);
                b.chart.showyaxisvalue = h(b.chart.showyaxisvalue, 0);
                this.configureAxis(d, b);
                b.trendlines && Rb(b.trendlines, d.yAxis, c, !1, this.isBar)
            }
        }
    }, r.scatterbase);
    pb = function (b,
                   d, a, c, e, g) {
        var q = g.logic, m = g.options.chart, v, l, p = d[b.from], k = d[b.to], n = {sourceType: "connector"}, t = b && b._options, u = q.numberFormatter, D, C, x, y, N;
        this.renderer = c;
        this.connectorsGroup = e;
        this.pointStore = d;
        this.options = b;
        this.style = a || {};
        p && k && (this.fromPointObj = p, this.toPointObj = k, this.fromX = D = p._xPos, this.fromY = C = p._yPos, this.toX = x = k._xPos, this.toY = y = k._yPos, this.arrowAtStart = n.arrowAtStart = b.arrowAtStart, this.arrowAtEnd = n.arrowAtEnd = b.arrowAtEnd, this.strokeWidth = d = b.conStrength * b.stdThickness, this.textBgColor =
            l = (this.color = v = b.color) && v.FCcolor && v.FCcolor.color, this.label = n.label = N = b.label, u = db(b.toolText, [3, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92], {
            label: b.label,
            fromXValue: u.dataLabels(p.x),
            fromYValue: u.dataLabels(p.y),
            fromXDataValue: p.x,
            fromYDataValue: p.y,
            fromLabel: h(p.displayValue, p.id),
            toXValue: u.dataLabels(k.x),
            toYValue: u.dataLabels(k.y),
            toXDataValue: k.x,
            toYDataValue: k.y,
            toLabel: h(k.displayValue, k.id)
        }), this.link = n.link = t && t.link, n.id = b.id, n.fromNodeId = p.id, n.toNodeId = k.id, p._config && p._config.startConnectors &&
        p._config.startConnectors.push(this), k._config && k._config.endConnectors && k._config.endConnectors.push(this), p = function () {
            var a = this, c = b._options || {};
            a._longpressactive = clearTimeout(a._longpressactive);
            a.data("fire_click_event", 1);
            a._longpressactive = setTimeout(function () {
                a.data("fire_click_event", 0);
                a.data("viewMode") || q.showConnectorUpdateUI(g, {
                    fromid: {val: c.from, innerHTML: "<option>" + c.from + "</option>", disabled: !0},
                    toid: {val: c.to, innerHTML: "<option>" + c.to + "</option>", disabled: !0},
                    arratstart: {
                        val: Boolean(f(c.arrowatstart,
                            1))
                    },
                    arratend: {val: Boolean(f(c.arrowatend, 1))},
                    dashed: {val: f(c.dashed)},
                    dashgap: {val: c.dashgap},
                    dashlen: {val: c.dashlen},
                    label: {val: c.label},
                    tooltext: {val: c.tooltext},
                    id: {val: b.id, disabled: !0},
                    strength: {val: c.strength},
                    alpha: {val: c.alpha},
                    color: {val: c.color}
                }, !0)
            }, 1E3)
        }, this.graphic = c.path(this.getlinePath(), e).attr({
            "stroke-width": d,
            ishot: !0,
            "stroke-dasharray": b.dashStyle,
            cursor: this.link ? "pointer" : "",
            stroke: pa(v)
        }).mousedown(p).mousemove(function () {
            this.data("fire_click_event", 0);
            ka.call(this)
        }).mouseup(function (a) {
            ka.call(this);
            Da.call(this, g, a, "ConnectorClick")
        }).hover(function (a) {
            Da.call(this, g, a, "ConnectorRollover")
        }, function (a) {
            Da.call(this, g, a, "ConnectorRollout")
        }).tooltip(u).data("eventArgs", n).data("viewMode", m.viewMode), N && (this.text = c.text(), e.appendChild(this.text), this.text.css(a.style).attr({
            text: N,
            x: (D + x) / 2,
            y: (C + y) / 2,
            fill: a.color,
            ishot: !0,
            direction: m.textDirection,
            cursor: this.link ? "pointer" : "",
            "text-bound": [h(a.backgroundColor, l), h(a.borderColor, l), 1, "2"]
        }).tooltip(u).mousedown(p).mousemove(function () {
            this.data("fire_click_event",
                0);
            ka.call(this)
        }).hover(function (a) {
            Da.call(this, g, a, "ConnectorRollover")
        }, function (a) {
            Da.call(this, g, a, "ConnectorRollout")
        }).mouseup(function (a) {
            ka.call(this);
            Da.call(this, g, a, "ConnectorClick")
        }).tooltip(u).data("eventArgs", n).data("viewMode", g.options.chart.viewMode)))
    };
    pb.prototype = {
        updateFromPos: function (b, d) {
            this.fromX = b;
            this.fromY = d;
            this.graphic && this.graphic.animate({path: this.getlinePath()});
            this.text && this.text.animate({x: (this.fromX + this.toX) / 2, y: (this.fromY + this.toY) / 2})
        }, updateToPos: function (b,
                                  d) {
            this.toX = b;
            this.toY = d;
            this.graphic && this.graphic.animate({path: this.getlinePath()});
            this.text && this.text.animate({x: (this.fromX + this.toX) / 2, y: (this.fromY + this.toY) / 2})
        }, getlinePath: function () {
            var b = this.fromPointObj, d = this.toPointObj, a = this.fromX, c = this.fromY, e = this.toX, g = this.toY, q = ["M", a, c];
            this.arrowAtStart && (b = b._config, q = b.shapeType === hc ? q.concat(Bb(a, c, e, g, b.shapeArg.width, b.shapeArg.height)) : q.concat(Bb(a, c, e, g, b.shapeArg.radius)));
            this.arrowAtEnd && (b = d._config, q = b.shapeType === hc ? q.concat(Bb(e,
                g, a, c, b.shapeArg.width, b.shapeArg.height)) : q.concat(Bb(e, g, a, c, b.shapeArg.radius)));
            q.push("L", e, g);
            return q
        }
    };
    pb.prototype.constructor = pb;
    oa = {
        mouseDown: function (b) {
            delete b.data.point.dragActive
        }, click: function (b) {
            return !b.data.point.dragActive
        }, dragHandler: function (b) {
            var d = b.data, a = b.type, c = d.point, e = d.series, g = e.chart || e, q = g.tooltip, f = aa && Pa(b) || kb, g = g.options.instanceAPI;
            switch (a) {
                case "dragstart":
                    q.block(!0);
                    d.dragStartY = b.pageY || f.pageY || 0;
                    d.dragStartX = b.pageX || f.pageX || 0;
                    d.startValue = c.y;
                    d.startXValue = c.x;
                    c.dragActive = !0;
                    e.dragStartHandler && e.dragStartHandler(d);
                    break;
                case "dragend":
                    q.block(!1);
                    e.repositionItems(d, d.changeX ? (b.pageX || f.pageX || 0) - d.dragStartX : 0, d.changeY ? (b.pageY || f.pageY || 0) - d.dragStartY : 0, !0);
                    a = {
                        dataIndex: c.index + 1,
                        datasetIndex: e.index + 1,
                        startValue: d.startValue,
                        endValue: c.y,
                        datasetName: e.name
                    };
                    b = [g.chartInstance.id, a.dataIndex, a.datasetIndex, a.datasetName, a.startValue, a.endValue];
                    d.changeX && (a.startYValue = d.startValue, a.endYValue = c.y, a.startXValue = d.startXValue,
                        a.endXValue = c.x, b.push(d.startXValue, c.x), delete a.startValue, delete a.endValue);
                    w.raiseEvent("chartupdated", a, g.chartInstance, b);
                    delete d.dragStartY;
                    delete d.dragStartX;
                    delete d.startValue;
                    delete d.startXValue;
                    break;
                default:
                    e.repositionItems(d, d.changeX ? (b.pageX || f.pageX || 0) - d.dragStartX : 0, d.changeY ? (b.pageY || f.pageY || 0) - d.dragStartY : 0)
            }
        }, dragLabelHandler: function (b) {
            var d = b.data, a = b.type, c = d.element, e = d.tracker, g = d.toolTip, q = aa && Pa(b) || kb, f = d.series, h, l, p;
            "dragstart" === a ? (g.block(!0), d.dragStartY =
                b.pageY || q.pageY || 0, d.dragStartX = b.pageX || q.pageX || 0) : (h = d.x + (b.pageX || q.pageX || 0) - d.dragStartX, p = h - d.leftDistance, p + d.width > d.plotWidth && (p = d.plotWidth - d.width), 0 > p && (p = 0), h = p + d.leftDistance, l = d.y + (b.pageY || q.pageY || 0) - d.dragStartY, b = l - d.topDistance, b + d.height > d.plotHeight && (b = d.plotHeight - d.height), 0 > b && (b = 0), l = b + d.topDistance, "dragend" === a ? (g.block(!1), d.x = h, d.y = l, delete d.dragStartY, delete d.dragStartX) : (c.attr({
                x: h,
                y: l
            }).textBound(), e.attr({x: p, y: b})));
            "dragend" == a && (a = {hcJSON: {dragableLabels: []}},
                a.hcJSON.dragableLabels[d.index] = {
                    y: f.yAxis.translate(f.chart.plotHeight - l + d.yAdjustment, 1),
                    x: f.xAxis.translate(h, 1)
                }, P(f.chart.options.instanceAPI.chartInstance.jsVars._reflowData, a, !0))
        }, pointUpdate: function (b, d, a) {
            b._isUserTooltip || b.toolText === B || b._getTooltext ? b._getTooltext && (b.toolText = b._getTooltext(void 0, void 0, {formattedValue: d}, {value: a})) : b.toolText = b._toolTextStr + d;
            b._isUserValue || b.displayValue === B || (b.displayValue = d)
        }, snapPoint: function (b, d, a) {
            var c = b.options.chart, e = c.snapToDiv, g =
                c.snapToDivOnly;
            b = b._yAxisPlotLines;
            for (var q = ua(b[1] - b[0]), c = g ? .5 * q : c.snapToDivRelaxation, q = d.lastSnap, f = 1, h = b.length, l; h--;)if (l = ua(b[h] - a), e && l < c) {
                q !== h && (d.lastSnap = g ? void 0 : h, a = b[h]);
                f = 0;
                break
            }
            f && (d.lastSnap = void 0);
            return a
        }, setMinMaxValue: function (b) {
            var d = b.options.series;
            b = b.logic;
            var a = 0, c = Infinity, e = -Infinity, g = b.chartInstance.jsVars._reflowData, q, f, h, l, p;
            p = 0;
            for (q = d.length; p < q; p += 1)for (h = d[p] && d[p].data, a = 0, l = h.length; a < l; a += 1)f = h[a].y, null !== f && (e = e > f ? e : f, c = c < f ? c : f);
            b.highValue = e;
            b.lowValue =
                c;
            g.postHCJSONCreation = function () {
                var a = this.hcJSON[ha][0];
                a.min = c;
                a.max = e
            }
        }, setSelectBoxValues: function (b, d) {
            var a = d.xAxis[0], c = d.yAxis[0], e = d.plotHeight;
            b.startX = a.translate(b.left, 1);
            b.endX = a.translate(b.left + b.width, 1);
            b.startY = c.translate(e - b.top, 1);
            b.endY = c.translate(e - (b.top + b.height), 1)
        }
    };
    r("dragarea", eb({
        friendlyName: "Dragable Area Chart",
        standaloneInit: !0,
        creditLabel: ra,
        rendererId: "dragarea",
        defaultSeriesType: "area",
        decimals: 2,
        anchorAlpha: "100",
        eiMethods: r.msareabase.eiMethods
    }, Qa), r.msareabase);
    r("dragline", eb({
        friendlyName: "Dragable Line Chart",
        standaloneInit: !0,
        creditLabel: ra,
        decimals: 2,
        defaultSeriesType: "line",
        rendererId: "dragline",
        eiMethods: r.mslinebase.eiMethods
    }, Qa), r.mslinebase);
    r("dragcolumn2d", eb({
        friendlyName: "Dragable Column Chart",
        standaloneInit: !0,
        creditLabel: ra,
        decimals: 2,
        defaultSeriesType: "column",
        rendererId: "dragcolumn2d",
        eiMethods: r.mscolumn2dbase.eiMethods
    }, Qa), r.mscolumn2dbase);
    r("selectscatter", {
        friendlyName: "Dragable Scatter Chart",
        isXY: !0,
        standaloneInit: !0,
        creditLabel: ra,
        defaultSeriesType: "scatter",
        defaultZeroPlaneHighlighted: !1,
        spaceManager: Qa.spaceManager,
        drawButtons: Qa.drawButtons,
        updateChartWithData: Qa.updateChartWithData,
        eiMethods: eb(eb(eb({}, r.scatterbase.eiMethods), Qa.eiMethods), {
            getData: function (b) {
                var d = this.jsVars.instanceAPI, a = d.getCollatedData(), c = [], e = a.dataset, g = e && e.length || 0, f = 0, m = 0;
                if (b)c = /^json$/ig.test(b) ? a : /^csv$/ig.test(b) ? d.getCSVString() : I.core.transcodeData(a, "json", b); else for (; f < g; f += 1)if (d = e[f]) {
                    for ((a = b = (d = e[f] && e[f].data) && d.length || 0) &&
                         (c[m] || (c[m] = [E(e[f].id, "null")])); a--;)c[m][a + 1] = E(d[a].id, "null");
                    b && (m += 1)
                }
                return c
            }
        }),
        getCSVString: function () {
            for (var b = this.chartInstance.getData(), d = b.length; d--;)b[d] = b[d].join(",");
            return b.join("|")
        },
        getCollatedData: function () {
            for (var b = this.chartInstance, d = b.jsVars.hcObj._selectEleArr, a = d && d.length, b = P({}, b.getChartData(I.dataFormats.JSON)), c = b.dataset, e, g, f, m, h, l, p, k, n, t = []; a--;)if (e = d[a])for (l = e.startX, p = e.endX, k = e.startY, n = e.endY, m = c.length; m--;)for (t[m] || (t[m] = {data: []}), h = (f = c[m].data) &&
                f.length; h--;)g = f[h], e = g.x, g = g.y, e > l && e < p && g < k && g > n && (t[m].data[h] = !0);
            for (m = c.length; m--;)for (h = (f = c[m].data) && f.length; h--;)t[m] && t[m].data[h] || f.splice(h, 1);
            return this.updatedDataObj = b
        },
        createSelectionBox: function (b) {
            var d = b.chart, a = d.paper, c = d.options.chart, e = d.yAxis && d.yAxis[0], g = d.xAxis && d.xAxis[0], f = b.selectionLeft, m = b.selectionTop, h = b.selectionWidth;
            b = b.selectionHeight;
            var l = f + h, p = m + b, k = 15 < h && 15 < b, n = {
                resizeEleRadius: 15,
                canvasTop: d.canvasTop,
                canvasRight: d.canvasLeft + d.canvasWidth,
                canvasLeft: d.canvasLeft,
                canvasBottom: d.canvasTop + d.canvasHeight
            }, t = d.layers.tracker, u = d._selectEleArr || (d._selectEleArr = []);
            n.index = u.length;
            n.id = "SELECT_" + n.index;
            n.selectBoxG = t = a.group("selection-box", t).toFront();
            n.selectBoxTracker = a.rect(f, m, h, b, t).attr({
                "stroke-width": 1,
                stroke: pa(c.selectBorderColor),
                ishot: !0,
                fill: c.selectFillColor
            }).css({cursor: "move"});
            n.selectBoxTracker.data("config", {position: 6, selectEleObj: n, xChange: !0, yChange: !0});
            n.topTracker = a.rect(f, m - 6, h, 12, t).attr({"stroke-width": 0, ishot: !0, fill: Ba}).css("cursor",
                Za && "ns-resize" || "n-resize");
            n.topTracker.data("config", {position: 1, selectEleObj: n, yChange: !0});
            n.rightTracker = a.rect(f + h - 6, m, 12, b, t).attr({
                "stroke-width": 0,
                ishot: !0,
                fill: Ba
            }).css("cursor", Za && "ew-resize" || "w-resize");
            n.rightTracker.data("config", {position: 2, selectEleObj: n, xChange: !0});
            n.bottomTracker = a.rect(f, m + b - 6, h, 12, t).attr({
                "stroke-width": 0,
                ishot: !0,
                fill: Ba
            }).css("cursor", Za && "ns-resize" || "n-resize");
            n.bottomTracker.data("config", {position: 3, selectEleObj: n, yChange: !0});
            n.leftTracker = a.rect(f -
                6, m, 12, b, t).attr({
                "stroke-width": 0,
                ishot: !0,
                fill: Ba
            }).css("cursor", Za && "ew-resize" || "e-resize");
            n.leftTracker.data("config", {position: 4, selectEleObj: n, xChange: !0});
            n.cornerInnerSymbol = a.symbol("resizeIcon", 0, 0, 15, t).attr({
                transform: "t" + l + "," + p,
                "stroke-width": 1,
                visibility: k ? tb : "hidden",
                ishot: !0,
                stroke: "#999999"
            });
            n.cornerOuterSymbol = a.symbol("resizeIcon", 0, 0, -12, t).attr({
                transform: "t" + l + "," + p,
                strokeWidth: 1,
                visibility: k ? "hidden" : tb,
                ishot: !0,
                stroke: "#777777"
            });
            n.resizeTracker = a.circle(l, p, 12, t).attr({
                "stroke-width": 1,
                stroke: Ba, ishot: !0, fill: Ba
            }).css("cursor", Za && "nwse-resize" || "nw-resize");
            n.resizeTracker.data("config", {position: 5, selectEleObj: n, yChange: !0, xChange: !0});
            n.closeButton = a.symbol("closeIcon", 0, 0, 6, t).attr({
                transform: "t" + l + "," + m,
                "stroke-width": 2,
                stroke: c.selectionCancelButtonBorderColor,
                fill: c.selectionCancelButtonFillColor,
                "stroke-linecap": "round",
                ishot: !0,
                "stroke-linejoin": "round"
            }).css({cursor: "pointer", _cursor: "hand"}).click(function () {
                d.logic.deleteSelection(this, d)
            });
            n.closeButton.data("config",
                {index: n.index});
            n.chart = d;
            n.startX = g.getAxisPosition(f, 1);
            n.startY = e.getAxisPosition(m, 1);
            n.endX = g.getAxisPosition(l, 1);
            n.endY = e.getAxisPosition(p, 1);
            n.isVisible = !0;
            u.push(n);
            d.logic.bindDragEvent(n)
        },
        deleteSelection: function (b, d) {
            var a = b.data("config").index, c = d._selectEleArr, e = c[a], g, f, m;
            g = e.selectBoxTracker.getBBox();
            m = {
                selectionLeft: g.x,
                selectionTop: g.y,
                selectionWidth: g.width,
                selectionHeight: g.height,
                startXValue: d.xAxis[0].getAxisPosition(g.x, 1),
                startYValue: d.yAxis[0].getAxisPosition(g.y, 1),
                endXValue: d.xAxis[0].getAxisPosition(g.x + g.width, 1),
                endYValue: d.yAxis[0].getAxisPosition(g.y + g.height, 1),
                data: d.logic.getCollatedData(),
                id: e.id
            };
            for (f in e)g = e[f], g.remove && g.remove(), delete e[f];
            delete c[a];
            I.raiseEvent("selectionRemoved", m, d.logic.chartInstance)
        },
        bindDragEvent: function (b) {
            for (var d in b)/Tracker/.test(d) && b[d].drag(this.move, this.start, this.up)
        },
        start: function () {
            var b = this.data("config").selectEleObj, d = b.topTracker, a = b.rightTracker, c = b.bottomTracker, e = b.leftTracker, g = b.resizeTracker,
                f = d.data("config"), m = a.data("config"), h = c.data("config"), l = e.data("config"), p = g.data("config"), k = b.selectBoxTracker.data("config"), n = b.selectBoxTracker.getBBox();
            f.ox = n.x;
            f.oy = n.y;
            m.ox = n.x2;
            m.oy = n.y;
            h.ox = n.x;
            h.oy = n.y2;
            l.ox = n.x;
            l.oy = n.y;
            f.ox = n.x;
            f.oy = n.y;
            p.ox = n.x2;
            p.oy = n.y2;
            k.ox = n.x;
            k.oy = n.y;
            k.ow = n.width;
            k.oh = n.height;
            k.ox2 = n.x2;
            k.oy2 = n.y2;
            b.selectBoxG.toFront();
            d.hide();
            a.hide();
            c.hide();
            e.hide();
            g.hide();
            this.show()
        },
        move: function (b, d) {
            var a = this.data("config"), c = a.selectEleObj, e = c.chart, g = c.topTracker,
                f = c.rightTracker, m = c.bottomTracker, h = c.leftTracker, l = c.resizeTracker, p = c.selectBoxTracker, k = c.canvasLeft, n = c.canvasRight, t = c.canvasTop, u = c.canvasBottom, D = p.data("config"), C = {}, x, y;
            b = a.xChange ? b : 0;
            d = a.yChange ? d : 0;
            x = b + a.ox;
            y = d + a.oy;
            x = H(n - (a.ow || 0), ab(x, k));
            y = H(u - (a.oh || 0), ab(y, t));
            switch (a.position) {
                case 1:
                    C.y = H(D.oy2, y);
                    C.height = ua(D.oy2 - y) || 1;
                    g.attr({y: y + -6});
                    break;
                case 2:
                    C.x = H(D.ox, x);
                    C.width = ua(D.ox - x) || 1;
                    f.attr({x: x + -6});
                    break;
                case 3:
                    C.y = H(D.oy, y);
                    C.height = ua(D.oy - y) || 1;
                    m.attr({y: y + -6});
                    break;
                case 4:
                    C.x = H(D.ox2, x);
                    C.width = ua(D.ox2 - x) || 1;
                    h.attr({x: x + -6});
                    break;
                case 5:
                    C.x = H(D.ox, x);
                    C.width = ua(D.ox - x) || 1;
                    C.y = H(D.oy, y);
                    C.height = ua(D.oy - y) || 1;
                    l.attr({cx: x, cy: y});
                    break;
                default:
                    C.x = x, C.y = y
            }
            this.data("dragStarted") || (a = p.getBBox(), a = {
                selectionLeft: a.x,
                selectionTop: a.y,
                selectionWidth: a.width,
                selectionHeight: a.height,
                startXValue: e.xAxis[0].getAxisPosition(a.x, 1),
                startYValue: e.yAxis[0].getAxisPosition(a.y, 1),
                endXValue: e.xAxis[0].getAxisPosition(a.x + a.width, 1),
                endYValue: e.yAxis[0].getAxisPosition(a.y +
                    a.height, 1),
                id: c.id
            }, I.raiseEvent("BeforeSelectionUpdate", a, e.logic.chartInstance), this.data("dragStarted", 1));
            p.animate(C);
            c.isVisible && (c.closeButton.hide(), c.cornerInnerSymbol.hide(), c.cornerOuterSymbol.hide(), c.isVisible = !1)
        },
        up: function () {
            var b = this, d = b.data("config").selectEleObj, a = d.chart, c = a.xAxis && a.xAxis[0], e = a.yAxis && a.yAxis[0], g = d.topTracker, f = d.rightTracker, m = d.bottomTracker, h = d.leftTracker, l = d.resizeTracker, p = d.selectBoxTracker, k, n;
            setTimeout(function () {
                k = p.getBBox();
                d.startX = c.getAxisPosition(k.x,
                    1);
                d.startY = e.getAxisPosition(k.y, 1);
                d.endX = c.getAxisPosition(k.x2, 1);
                d.endY = e.getAxisPosition(k.y2, 1);
                g.attr({x: k.x, y: k.y + -6, width: k.width});
                f.attr({x: k.x2 + -6, y: k.y, height: k.height});
                m.attr({x: k.x, y: k.y2 + -6, width: k.width});
                h.attr({x: k.x + -6, y: k.y, height: k.height});
                l.attr({cx: k.x2, cy: k.y2});
                d.closeButton.transform("t" + k.x2 + "," + k.y);
                d.cornerInnerSymbol.transform("t" + k.x2 + "," + k.y2);
                d.cornerOuterSymbol.transform("t" + k.x2 + "," + k.y2);
                d.closeButton.show();
                15 > k.width || 15 > k.height ? (d.cornerInnerSymbol.hide(),
                    d.cornerOuterSymbol.show()) : (d.cornerInnerSymbol.show(), d.cornerOuterSymbol.hide());
                d.isVisible = !0;
                g.show();
                f.show();
                m.show();
                h.show();
                l.show();
                b.data("dragStarted") && (n = {
                    selectionLeft: k.x,
                    selectionTop: k.y,
                    selectionWidth: k.width,
                    selectionHeight: k.height,
                    startXValue: a.xAxis[0].getAxisPosition(k.x, 1),
                    startYValue: a.yAxis[0].getAxisPosition(k.y, 1),
                    endXValue: a.xAxis[0].getAxisPosition(k.x + k.width, 1),
                    endYValue: a.yAxis[0].getAxisPosition(k.y + k.height, 1),
                    data: a.logic.getCollatedData(),
                    id: d.id
                }, I.raiseEvent("SelectionUpdated",
                    n, a.logic.chartInstance), b.data("dragStarted", 0))
            }, 100)
        },
        postSeriesAddition: function (b, d) {
            var a = r.scatter && r.scatter.postSeriesAddition && r.scatter.postSeriesAddition.apply(this, arguments), c = b.chart, e = d.chart, g = this.colorManager, q = h(e.selectbordercolor, g.getColor("canvasBorderColor")), m = f(e.selectborderalpha, g.getColor("canvasBorderAlpha"));
            c.selectBorderColor = {FCcolor: {color: q, alpha: m}};
            c.selectFillColor = z(h(e.selectfillcolor, g.getColor("altHGridColor")), f(e.selectfillalpha, g.getColor("altHGridAlpha")));
            c.selectionCancelButtonBorderColor = z(h(e.selectioncancelbuttonbordercolor, q), f(e.selectioncancelbuttonborderalpha, m));
            c.selectionCancelButtonFillColor = z(h(e.selectioncancelbuttonfillcolor, "FFFFFF"), f(e.selectioncancelbuttonfillalpha, 100));
            b.chart.nativeZoom = !1;
            c.formAction = E(e.formaction);
            "0" !== e.submitdataasxml || e.formdataformat || (e.formdataformat = I.dataFormats.CSV);
            c.formDataFormat = h(e.formdataformat, I.dataFormats.XML);
            c.formTarget = h(e.formtarget, "_self");
            c.formMethod = h(e.formmethod, "POST");
            c.submitFormAsAjax =
                f(e.submitformusingajax, 1);
            (b.callbacks || (b.callbacks = [])).push(function () {
                var a = this.logic;
                Ra(this, {
                    selectionStart: function (a) {
                        var b = Lb(a.chart.container, a.originalEvent), b = P({
                            selectionLeft: a.selectionLeft,
                            selectionTop: a.selectionTop,
                            selectionWidth: a.selectionWidth,
                            selectionHeight: a.selectionHeight,
                            startXValue: a.chart.xAxis[0].getAxisPosition(a.selectionLeft, 1),
                            startYValue: a.chart.yAxis[0].getAxisPosition(a.selectionTop, 1)
                        }, b);
                        I.raiseEvent("selectionStart", b, a.chart.logic.chartInstance)
                    }, selectionEnd: function (b) {
                        var c =
                            Lb(b.chart.container, b.originalEvent), d = b.chart.xAxis[0], e = b.chart.yAxis[0], c = P({
                            selectionLeft: b.selectionLeft,
                            selectionTop: b.selectionTop,
                            selectionWidth: b.selectionWidth,
                            selectionHeight: b.selectionHeight,
                            startXValue: d.getAxisPosition(b.selectionLeft, 1),
                            startYValue: e.getAxisPosition(b.selectionTop, 1),
                            endXValue: d.getAxisPosition(b.selectionLeft + b.selectionWidth, 1),
                            endYValue: e.getAxisPosition(b.selectionTop + b.selectionHeight, 1)
                        }, c);
                        I.raiseEvent("selectionEnd", c, b.chart.logic.chartInstance);
                        a.createSelectionBox(b)
                    }
                })
            });
            b.chart.zoomType = "xy";
            return a
        }
    }, r.scatterbase);
    r("multiaxisline", {
        friendlyName: "Multi-axis Line Chart",
        standaloneInit: !0,
        creditLabel: ra,
        defaultSeriesType: "line",
        rendererId: "multiaxisline",
        isMLAxis: !0,
        canvasPaddingModifiers: ["anchor", "anchorlabel"],
        drawAxisTrackerAndCheckBox: function () {
            for (var b = this, d = b.canvasLeft, a = b.canvasTop, c = b.canvasWidth, e = b.canvasHeight, g = b.paper, q = b.yAxis, m = q.length, h = b.logic, l = 0, p = 0, k = {
                    cursor: "col-resize",
                    _cursor: "e-resize",
                    "*cursor": "e-resize"
                }, n = h.chartInstance, t = n.jsVars,
                     u = h.dataObj, D = t._reflowData, C = D.hcJSON || {}, x = u.axis, y = u.chart, u = f(y.allowaxisshift, 1), N = (y = f(y.allowselection, 1)) && g.html("div", {
                        fill: "transparent",
                        width: b.chartWidth
                    }, {
                        top: "",
                        left: "",
                        fontSize: "10px",
                        lineHeight: "15px",
                        marginTop: -b.chartHeight + "px"
                    }, b.container), C = C.yAxis || (C.yAxis = []), ea, xa, B, F, la, r, w = function (a) {
                    b.series && b.series[a] && b.series[a].setVisible(!1, !1)
                }, na = function (a) {
                    var c = a.data;
                    a = c.axis[c.index].axisData;
                    var d = a._relatedSeries, e = !c.checkBox.checked(), c = x[a._axisposition];
                    d && nb(d, function (a) {
                        b.options.series[a].legendClick(e,
                            !0)
                    });
                    c.hidedataplots = !e;
                    P(D, {
                        preReflowAdjustments: function () {
                            this.dataObj.axis = x
                        }
                    });
                    I.raiseEvent("AxisSelected", {
                        selected: e,
                        AxisId: c._index,
                        AxisConfiguration: a._origAttr || hb(c, a)
                    }, b.logic.chartInstance)
                }, A = function (a) {
                    var c = a.data;
                    a = c.axis;
                    var c = a[c.index].axisData, d = c.opposite, e = c._axisposition, g = x.length, k, q, m, l = {}, p = x[e], u = {};
                    for (k = 0; k < g; k += 1)q = x[k], q = !f(q.axisonleft, 1), q === d && (m = k, d && (k = g));
                    m !== e && (l = a[m], u = x[m], a = x.splice(m, 1, x[e]), x.splice(e, 1, a[0]));
                    if (m !== e || d !== h.dataObj.chart._lastClickedOpp)P(D,
                        {
                            preReflowAdjustments: function () {
                                this.dataObj.chart._lastClickedOpp = d;
                                this.dataObj.axis = x
                            }
                        }), I.raiseEvent("AxisShifted", {
                        previousDefaultAxisId: u._index,
                        newDefaultAxisId: p._index,
                        previousDefaultAxisConfiguration: l._origAttr || hb(u, l),
                        newDefaultAxisConfiguration: c._origAttr || hb(p, c)
                    }, b.logic.chartInstance), I.hcLib.createChart(n, t.container, t.type, void 0, void 0, !1, !0)
                }; m--;)ea = q[m], xa = ea.axisData, B = xa._axisWidth, (F = xa.opposite) || (l += B), C[m] || (C[m] = {}), y && xa.showAxis && (la = d + (F ? c + p + f(xa.title.margin, B -
                    10) + 5 : -l), r = a + e + 10, ea.checkBox = g.html("input", {}, {
                left: la + "px",
                top: r + "px"
            }).attr({
                type: "checkbox",
                name: "axis[]",
                value: xa.title.text || ""
            }).add(N), ea.checkBox.val(xa.hidedataplots), xa.hidedataplots || xa._relatedSeries && nb(xa._relatedSeries, w), sb(ea.checkBox.element, aa ? "touchstart" : "mousedown", na, {
                axis: q,
                index: m,
                checkBox: ea.checkBox
            })), u && (ea.tracker = g.rect(d + (F ? c + p : -l), a, B, e, 0).attr({
                "stroke-width": 0,
                fill: Ba,
                isTracker: +new Date,
                zIndex: 7
            }).css(k), F && (p += B), sb(ea.tracker[0], aa ? "touchstart" : "mousedown",
                A, {axis: q, index: m}))
        },
        series: function (b) {
            var d = this, a = d.numberFormatter, c = d.name, e = d.dataObj, g = e.chart, q = e.axis, m = d.hcJSON, v = m[ha], l = m.yAxis[0], p = f(e.chart.allowselection, 1), k = [], n = f(g.showaxisnamesinlegend, 0), t = f(g.yaxisvaluesstep, g.yaxisvaluestep, 1), u = this.colorManager, D, C, x, y, N, ea, xa, r, F, la, K, w, na, A, E;
            m.callbacks || (m.callbacks = []);
            m.callbacks.push(function () {
                d.drawAxisTrackerAndCheckBox.call(this)
            });
            m.legend.enabled = Boolean(f(e.chart.showlegend, 1));
            if (q && 0 < q.length) {
                this.categoryAdder(e, m);
                m.yAxis.splice(0,
                    2);
                ea = v.noHiddenAxis = 0;
                for (r = q.length; ea < r; ea += 1)F = q[ea], void 0 === F._index && (F._index = ea), F._axisposition = ea, (y = !f(F.axisonleft, 1)) ? (F._isSY = !0, k.unshift(F)) : (F._isSY = !1, k.push(F));
                ea = 0;
                for (r = k.length; ea < r; ea += 1)if (F = k[ea], N = f(F.showaxis, 1), q = F._index || 0, a.parseMLAxisConf(F, q), D = u.getPlotColor(q), F.id = q, na = h(F.color, g.axiscolor, D), la = z(na, 100), y = !f(F.axisonleft, 1), K = f(F.divlinethickness, g.divlinethickness, 1), C = N ? f(F.tickwidth, g.axistickwidth, 2) : 0, x = N ? f(F.axislinethickness, g.axislinethickness, 2) : 0,
                        w = v[ea] = {}, w.showAxis = N, v.noHiddenAxis += 1 - N, N && (y ? E = ea : A = ea), xa = [], m.yAxis.push({
                        startOnTick: !1,
                        endOnTick: !1,
                        _axisposition: F._axisposition,
                        _isSY: F._isSY,
                        _index: q,
                        hidedataplots: !f(F.hidedataplots, 0),
                        title: {
                            enabled: N,
                            style: l.title.style,
                            text: N ? G(F.title) : B,
                            align: p ? "low" : "middle",
                            textAlign: p && y ? "right" : void 0
                        },
                        labels: {x: 0, style: l.labels.style},
                        plotBands: [],
                        plotLines: [],
                        gridLineColor: z(h(F.divlinecolor, na), f(F.divlinealpha, g.divlinealpha, u.getColor("divLineAlpha"), 100)),
                        gridLineWidth: K,
                        gridLineDashStyle: f(F.divlinedashed,
                            F.divlineisdashed, g.divlinedashed, g.divlineisdashed, 0) ? ta(f(F.divlinedashlen, g.divlinedashlen, 4), f(F.divlinedashgap, g.divlinedashgap, 2), K) : "none",
                        alternateGridColor: qa,
                        lineColor: la,
                        lineWidth: x,
                        tickLength: C,
                        tickColor: la,
                        tickWidth: x,
                        opposite: y,
                        _relatedSeries: xa,
                        showAxis: N
                    }), w.yAxisValuesStep = f(F.yaxisvaluesstep, F.yaxisvaluestep, t), w.maxValue = F.maxvalue, w.tickWidth = C, w.minValue = F.minvalue, w.setadaptiveymin = f(F.setadaptiveymin, g.setadaptiveymin), w.numDivLines = f(F.numdivlines, g.numdivlines, 4), w.adjustdiv =
                        f(F.adjustdiv, g.adjustdiv), w.showYAxisValues = N ? f(F.showyaxisvalues, F.showyaxisvalue, g.showyaxisvalues, g.showyaxisvalue, 1) : 0, w.showLimits = N ? f(F.showlimits, g.showyaxislimits, g.showlimits, w.showYAxisValues) : 0, w.showDivLineValues = N ? f(F.showdivlinevalue, g.showdivlinevalues, F.showdivlinevalues, w.showYAxisValues) : 0, w.showzeroplane = F.showzeroplane, w.showzeroplanevalue = f(F.showzeroplanevalue), w.zeroplanecolor = F.zeroplanecolor, w.zeroplanethickness = F.zeroplanethickness, w.zeroplanealpha = F.zeroplanealpha, w.linecolor =
                        h(F.linecolor, g.linecolor || F.color, D), w.linealpha = F.linealpha, w.linedashed = F.linedashed, w.linethickness = F.linethickness, w.linedashlen = F.linedashlen, w.linedashgap = F.linedashgap, w.anchorShadow = F.anchorshadow, w.plottooltext = F.plottooltext, F.dataset && 0 < F.dataset.length) {
                    K = F.dataset.length;
                    D = f(F.includeinlegend, 1);
                    y = !1;
                    N = {
                        data: [],
                        relatedSeries: xa,
                        name: G(F.title),
                        type: "line",
                        marker: {symbol: "axisIcon", fillColor: Ba, lineColor: tc(na, 80).replace(jb, Oa)},
                        lineWidth: 0,
                        legendFillColor: 0 !== n ? z(na, 25) : void 0,
                        legendFillOpacity: 0,
                        legendIndex: F._index,
                        showInLegend: Boolean(f(n, D))
                    };
                    m.series.push(N);
                    for (la = 0; la < K; la += 1) {
                        x = F.dataset[la];
                        x._yAxisName = F.title;
                        void 0 === x.color && (x.color = h(w.linecolor, na));
                        C = {
                            visible: !f(x.initiallyhidden, 0),
                            yAxis: ea,
                            data: [],
                            hoverEffects: this.parseSeriesHoverOptions(b, m, x, c)
                        };
                        C = this.point(c, C, x, e.chart, m, v.oriCatTmp.length, ea, q);
                        C.legendFillColor = N.legendFillColor;
                        C.legendIndex = F._index;
                        if (void 0 === C.showInLegend || C.showInLegend)y = !0;
                        !1 !== C.showInLegend && (C.showInLegend = Boolean(D));
                        xa.push(m.series.length);
                        m.series.push(C)
                    }
                    0 !== xa.length && y || (N.showInLegend = !1)
                }
                b = g._lastClickedOpp ? f(E, A) : f(A, E);
                ea = 0;
                for (r = m.yAxis.length; ea < r; ea += 1)ea != b && (m.yAxis[ea].gridLineWidth = 0, v[ea].zeroplanethickness = 0);
                this.configureAxis(m, e)
            }
        },
        point: function (b, d, a, c, e, g, q, m) {
            b = !1;
            q = f(c.ignoreemptydatasets, 0);
            var v;
            v = e.chart;
            var l = a.data || [], p = e[ha], k = p[d.yAxis || 0], n = h(d.type, this.defaultSeriesType), t = e.plotOptions[n] && e.plotOptions[n].stacking, u = h(this.isValueAbs, p.isValueAbs, !1), D = f(d.yAxis, 0), C = this.numberFormatter, x = this.colorManager,
                y = Z(h(a.color, k.linecolor, c.linecolor, x.getPlotColor())), N = f(a.alpha, k.linealpha, c.linealpha, Ga), ea = f(c.showshadow, this.defaultPlotShadow, 1), xa = f(a.drawanchors, a.showanchors, c.drawanchors, c.showanchors), w = f(a.anchorsides, c.anchorsides, 0), F = f(a.anchorstartangle, c.anchorstartangle, 90), r = f(a.anchorradius, c.anchorradius, 3), K = Z(h(a.anchorbordercolor, c.anchorbordercolor, y)), A = f(a.anchorborderthickness, c.anchorborderthickness, 1), x = Z(h(a.anchorbgcolor, c.anchorbgcolor, x.getColor("anchorBgColor"))), na = h(a.anchoralpha,
                c.anchoralpha, Ga), z = h(a.anchorbgalpha, c.anchorbgalpha, na);
            d.anchorShadow = na && h(a.anchorshadow, k.anchorShadow, c.anchorshadow, 0);
            d.name = E(a.seriesname);
            if (0 === f(a.includeinlegend) || void 0 === d.name || 0 === N && 1 !== xa)d.showInLegend = !1;
            d.marker = {
                fillColor: {FCcolor: {color: x, alpha: z * na / 100 + B}},
                lineColor: {FCcolor: {color: K, alpha: na + B}},
                lineWidth: A,
                radius: r,
                symbol: ga(w),
                startAngle: F
            };
            d.color = {FCcolor: {color: y, alpha: N}};
            d.shadow = ea ? {opacity: ea ? N / 100 : 0} : !1;
            d.step = this.stepLine;
            d.drawVerticalJoins = Boolean(f(c.drawverticaljoins,
                1));
            d.useForwardSteps = Boolean(f(c.useforwardsteps, 1));
            d.lineWidth = f(a.linethickness, k.linethickness, c.linethickness, 2);
            c = d._dataParser = ob.line(e, {
                plottooltext: h(a.plottooltext, k.plottooltext),
                seriesname: d.name,
                lineAlpha: N,
                anchorAlpha: na,
                showValues: f(a.showvalues, p.showValues),
                yAxis: m,
                lineDashed: Boolean(f(a.dashed, k.linedashed, c.linedashed, 0)),
                lineDashLen: f(a.linedashlen, k.linedashlen, c.linedashlen, 5),
                lineDashGap: f(a.linedashgap, k.linedashgap, c.linedashgap, 4),
                lineThickness: d.lineWidth,
                lineColor: y,
                valuePosition: h(a.valueposition, v.valuePosition),
                drawAnchors: xa,
                anchorShadow: d.anchorShadow,
                anchorBgColor: x,
                anchorBgAlpha: z,
                anchorBorderColor: K,
                anchorBorderThickness: A,
                anchorRadius: r,
                anchorSides: w,
                anchorAngle: F,
                _sourceDataset: a,
                _yAxisName: a._yAxisName,
                hoverEffects: d.hoverEffects
            }, this);
            delete a._yAxisName;
            for (m = 0; m < g; m += 1)(v = l[m]) ? (a = C.getCleanValue(v.value, u), null === a ? d.data.push({y: null}) : (b = !0, d.data.push(c(v, m, a)), this.pointValueWatcher(e, a, D, t, m, 0, n))) : d.data.push({y: null});
            !q || b || this.realtimeEnabled ||
            (d.showInLegend = !1);
            return d
        },
        configureAxis: function (b, d) {
            var a = b[ha], c = d.chart, e, g, q, m, h, l, p, k, n, t, u, D, C;
            b.xAxis.title.text = G(c.xaxisname);
            C = 0;
            for (g = b.yAxis.length; C < g; C += 1)e = b.yAxis[C], q = a[C], D = f(q.yAxisValuesStep, 1), D = 1 > D ? 1 : D, m = q.maxValue, h = q.minValue, l = f(q.setadaptiveymin, 0), p = l = !l, k = q.numDivLines, n = 0 !== q.adjustdiv, t = q.showLimits, u = q.showDivLineValues, this.axisMinMaxSetter(e, q, m, h, l, p, k, n), this.configurePlotLines(c, b, e, q, t, u, D, this.numberFormatter, e._isSY, void 0, e._index), e.reversed && 0 <= e.min &&
            (b.plotOptions.series.threshold = e.max)
        },
        spaceManager: function (b, d, a, c) {
            var e = b[ha], g, q, m = d.chart, v, l, p, k, n, t, u, D, C, x, y, N, ea, w;
            w = b.chart.marginLeft;
            var r = b.chart.marginRight, F = e.marginLeftExtraSpace, B = e.marginTopExtraSpace, K = e.marginBottomExtraSpace, A = e.marginRightExtraSpace;
            n = a - (F + A + b.chart.marginRight + b.chart.marginLeft);
            var na = c - (K + b.chart.marginBottom + b.chart.marginTop), z = .3 * n;
            c = .3 * na;
            var E = n - z, T = na - c, G = h(m.legendposition, Ia).toLowerCase();
            b.legend.enabled && G === za && (E -= this.placeLegendBlockRight(b,
                d, E / 2, na));
            q = b.yAxis;
            k = q.length;
            g = k - e.noHiddenAxis;
            u = 0;
            if (g)for (x = D = 0, y = 10, ea = E / g, t = k - 1; 0 <= t; --t)C = q[t], C.showAxis && (g = e[t], p = C.opposite, N = (p ? x : D) + y, v = g.tickWidth, l = h(m.rotateyaxisname, p ? "cw" : "ccw"), g.verticalAxisNamePadding = 4, g.fixedValuesPadding = v, g.verticalAxisValuesPadding = v, g.rotateVerticalAxisName = p && "ccw" !== l ? "cw" : l, g.verticalAxisNameWidth = 50, C.offset = N, u = ea + u - y, g = $a(C, g, b, d, na, u, p, 0, 0), g += y, p ? (x += g, b.chart.marginRight += y) : (D += g, b.chart.marginLeft += y), u -= g, E -= g, E < y && (y = 0), C._axisWidth = g);
            E -=
                Gb(b, d, E);
            q = E + z;
            b.legend.enabled && G !== za && (T -= this.placeLegendBlockBottom(b, d, n, T / 2), b.legend.width > q && (b.legend.x = 0));
            T -= this.titleSpaceManager(b, d, q, T / 2);
            g = e.x;
            g.horizontalAxisNamePadding = f(m.xaxisnamepadding, 5);
            g.horizontalLabelPadding = f(m.labelpadding, 2);
            g.labelDisplay = "1" == m.rotatelabels ? "rotate" : h(m.labeldisplay, "auto").toLowerCase();
            g.staggerLines = f(m.staggerlines, 2);
            g.slantLabels = f(m.slantlabels, m.slantlabel, 0);
            n = {left: 0, right: 0};
            n = b.chart.managePlotOverflow && this.canvasPaddingModifiers &&
                this.calculateCanvasOverflow(b, !0) || n;
            t = n.left + n.right;
            u = .6 * q;
            t > u && (D = n.left / t, n.left -= D * (t - u), n.right -= (1 - D) * (t - u));
            this.xAxisMinMaxSetter(b, d, q, n.left, n.right);
            T -= Db(b.xAxis, g, b, d, q, T, z);
            T -= vb(b, d, T, b.xAxis);
            d = c + T;
            for (t = 0; t < k; t += 1)Ha(d, b, m, b.yAxis[t], e[t].lYLblIdx);
            b.legend.enabled && G === za && (e = b.legend, m = c + T, e.height > m && (e.height = m, e.scroll.enabled = !0, u = (e.scroll.scrollBarWidth = 10) + (e.scroll.scrollBarPadding = 2), e.width += u, b.chart.marginRight += u), e.y = 20);
            m = (e = b.title.alignWithCanvas) ? b.chart.marginLeft +
            q / 2 : a / 2;
            w = e ? b.chart.marginLeft : w;
            a = e ? a - b.chart.marginRight : a - r;
            switch (b.title.align) {
                case Ja:
                    b.title.x = w;
                    b.title.align = "start";
                    break;
                case za:
                    b.title.x = a;
                    b.title.align = "end";
                    break;
                default:
                    b.title.x = m, b.title.align = "middle"
            }
            switch (b.subtitle.align) {
                case Ja:
                    b.subtitle.x = w;
                    break;
                case za:
                    b.subtitle.x = a;
                    break;
                default:
                    b.subtitle.x = m
            }
            b.chart.marginLeft += F;
            b.chart.marginTop += B;
            b.chart.marginBottom += K;
            b.chart.marginRight += A
        }
    }, r.mslinebase);
    r("candlestick", {
        friendlyName: "Candlestick Chart",
        standaloneInit: !0,
        creditLabel: ra,
        paletteIndex: 3,
        defaultSeriesType: "candlestick",
        canvasborderthickness: 1,
        rendererId: "candlestick",
        chart: r.errorbar2d.chart,
        drawErrorValue: r.errorbar2d.drawErrorValue,
        series: function (b, d, a) {
            var c, e, g = d[ha], q, m, v, l, p, k;
            c = b.chart;
            q = d.chart;
            var n = f(c.showvolumechart, 1);
            m = this.colorManager;
            var t;
            d.legend.enabled = Boolean(f(c.showlegend, 1));
            q.rollOverBandColor = z(h(c.rolloverbandcolor, m.getColor("altHGridColor")), h(c.rolloverbandalpha, m.getColor("altHGridAlpha")));
            if (b.dataset && 0 < b.dataset.length) {
                this.categoryAdder(b,
                    d);
                d.yAxis[0].opposite = !0;
                g.numdivlines = E(b.chart.numpdivlines);
                n && (t = d._FCconf.numberFormatter, q = d.labels, d._FCconf.numberFormatter = {}, d._FCconf.smartLabel && (e = d._FCconf.smartLabel, d._FCconf.smartLabel = void 0), d.labels = {}, v = P({}, d), d._FCconf.numberFormatter = t, d._FCconf.smartLabel = e, d.labels = q, e && (v._FCconf.smartLabel = e), v._FCconf.numberFormatter = new w.NumberFormatter(P(P({}, c), {
                    forcedecimals: W(c.forcevdecimals, c.forcedecimals),
                    forceyaxisvaluedecimals: W(c.forcevyaxisvaluedecimals, c.forceyaxisvaluedecimals),
                    yaxisvaluedecimals: W(c.vyaxisvaluedecimals, c.yaxisvaluedecimals),
                    formatnumber: W(c.vformatnumber, c.formatnumber),
                    formatnumberscale: W(c.vformatnumberscale, c.formatnumberscale),
                    defaultnumberscale: W(c.vdefaultnumberscale, c.defaultnumberscale),
                    numberscaleunit: W(c.vnumberscaleunit, c.numberscaleunit),
                    vnumberscalevalue: W(c.vnumberscalevalue, c.numberscalevalue),
                    scalerecursively: W(c.vscalerecursively, c.scalerecursively),
                    maxscalerecursion: W(c.vmaxscalerecursion, c.maxscalerecursion),
                    scaleseparator: W(c.vscaleseparator,
                        c.scaleseparator),
                    numberprefix: W(c.vnumberprefix, c.numberprefix),
                    numbersuffix: W(c.vnumbersuffix, c.numbersuffix),
                    decimals: W(c.vdecimals, c.decimals)
                }), this), P(v, {
                    chart: {
                        backgroundColor: "rgba(255,255,255,0)",
                        borderColor: "rgba(255,255,255,0)",
                        animation: !1
                    },
                    title: {text: null},
                    subtitle: {text: null},
                    legend: {enabled: !1},
                    credits: {enabled: !1},
                    xAxis: {opposite: !0, labels: {enabled: !1}},
                    yAxis: [{opposite: !0, title: {}, plotBands: [], plotLines: []}, {
                        opposite: !1,
                        title: {text: b.chart.vyaxisname}
                    }]
                }), t = d.subCharts = [v]);
                c = 0;
                for (e = b.dataset.length; c < e; c += 1)q = {
                    numColumns: e,
                    data: []
                }, m = b.dataset[c], q = this.point(a, q, m, b.chart, d, g.oriCatTmp.length, c), q instanceof Array ? (n && (v.series.push({
                    type: "column",
                    data: q[1]
                }), v.showVolume = !0, m = f(b.chart.volumeheightpercent, 40), m = 20 > m ? 20 : 80 < m ? 80 : m, l = g.height - (d.chart.marginBottom + d.chart.marginTop), p = l * m / 100, k = d.chart.marginBottom + p, v[ha].marginTop = k + 40, v.yAxis[0].plotBands = [], v.yAxis[0].plotLines = [], v.exporting.enabled = !1, v.yAxis[0].title.text = G(E(b.chart.vyaxisname)), v.yAxis[0].title.align =
                    "low", v.chart.height = p + 20, v.chart.width = g.width, v.chart.top = l - p, v.chart.left = 0, v.chart.volumeHeightPercent = m), d.series.push(q[0])) : (d.series.push(q), t = d.subCharts = void 0);
                if (b.trendset && 0 < b.trendset.length)for (c = 0, e = b.trendset.length; c < e; c += 1)q = {
                    type: "line",
                    marker: {enabled: !1},
                    connectNullData: 1,
                    data: []
                }, v = b.trendset[c], v.data && 0 < v.data.length && (q = this.getTrendsetPoint(a, q, v, b.chart, d, g.oriCatTmp.length, c), d.series.push(q));
                b.chart.showdivlinesecondaryvalue = 0;
                b.chart.showsecondarylimits = 0;
                this.configureAxis(d,
                    b);
                d.yAxis[1].opposite = !1;
                d.yAxis[1].min = d.yAxis[0].min;
                d.yAxis[1].max = d.yAxis[0].max;
                d.yAxis[1].title.text = d.yAxis[0].title.text;
                d.yAxis[0].title.text = B;
                n && t && (t = t[0], a = t[ha], a.numdivlines = E(b.chart.numvdivlines), a[0].min = g.volume && g.volume.min, a[0].max = g.volume && g.volume.max, t.series && t.series[0] && (t.series[0].showInLegend = !1), this.configureAxis(t, b), t.yAxis[0].title.text = G(E(b.chart.vyaxisname)), t.yAxis[1].min = t.yAxis[0].min, t.yAxis[1].max = t.yAxis[0].max, t.yAxis[1].title.text = t.yAxis[0].title.text,
                    t.yAxis[0].title.text = B);
                if ((a = b.trendlines && b.trendlines[0] && b.trendlines[0].line) && a.length) {
                    for (n = 0; n < a.length; n += 1)a[n].parentyaxis = "s", a[n].valueonleft = "1";
                    Rb(b.trendlines, d.yAxis, g, !0, this.isBar)
                }
            }
        },
        getTrendsetPoint: function (b, d, a, c, e) {
            if (a.data) {
                b = a.data;
                var g = b.length, q = 0, m, v, l, p, k, n = e[ha], t = this.numberFormatter, u = f(d.yAxis, 0), n = n.toolTextStore, g = Z(h(a.color, c.trendsetcolor, "666666")), q = h(a.alpha, c.trendsetalpha, "100");
                m = f(a.thickness, c.trendsetthickness, 2);
                v = Boolean(f(a.dashed, c.trendsetdashed,
                    0));
                l = f(a.dashlen, c.trendsetdashlen, 4);
                p = f(a.dashgap, c.trendsetdashgap, 4);
                k = h(a.includeinlegend, 1);
                d.color = z(g, q);
                d.lineWidth = m;
                d.dashStyle = v ? ta(l, p) : "none";
                d.includeInLegend = k;
                d.name = E(a.name);
                d.doNotUseBand = !0;
                if (0 === f(a.includeinlegend) || void 0 === d.name)d.showInLegend = !1;
                d.tooltip = {enabled: !1};
                q = c.interactivelegend = 0;
                for (g = b.length; q < g; q += 1)(c = b[q]) && !c.vline && (a = t.getCleanValue(c.value), c = t.getCleanValue(c.x), c = null !== c ? c : q + 1, m = n && n[c], d.data.push({
                    x: c,
                    y: a,
                    toolText: m
                }), this.pointValueWatchers(e,
                    null, a, a, null, u))
            }
            return d
        },
        point: function (b, d, a, c, e) {
            if (a.data) {
                b = r[b];
                var g = e[ha], q = E(c.plotpriceas, B).toLowerCase(), m = a.data, v = m && m.length, l = this.numberFormatter, p = [], k = [], n = {}, t, u, D, C = !1, x = f(d.yAxis, 0), y = Z(h(c.bearbordercolor, "B90000")), N = Z(h(c.bearfillcolor, "B90000")), ea = this.colorManager, w = Z(h(c.bullbordercolor, ea.getColor("canvasBorderColor"))), A = Z(h(c.bullfillcolor, "FFFFFF")), F = d.lineWidth = f(c.plotlinethickness, "line" == q || "bar" == q ? 2 : 1), la = h(c.plotlinealpha, "100"), K = f(c.plotlinedashlen, 5),
                    Wa = f(c.plotlinedashgap, 4), na = f(c.vplotborderthickness, 1), Na = !!f(c.drawanchors, 1), L = f(c.anchorsides, 0), T = f(c.anchorstartangle, 90), P = f(c.anchorradius, this.anchorRadius, 3), X = Z(h(c.anchorbordercolor, w)), M = f(c.anchorborderthickness, this.anchorBorderThickness, 1), ea = Z(h(c.anchorbgcolor, ea.getColor("anchorBgColor"))), J = h(c.anchoralpha, "0"), R = h(c.anchorbgalpha, J), ya, U, S, da, ba, Y, I, O, W, fa, ca, pa, ja, ma, Q, va = !1;
                d.name = E(a.seriesname);
                d.showInLegend = !1;
                d.marker = {};
                switch (q) {
                    case "line":
                        d.plotType = "line";
                        break;
                    case "bar":
                        d.plotType =
                            "candlestickbar";
                        break;
                    default:
                        d.plotType = "column", d.errorBarWidthPercent = 0, va = !0
                }
                for (U = 0; U < v; U += 1)(S = m[U]) && !S.vline && (I = l.getCleanValue(S.open), O = l.getCleanValue(S.close), W = l.getCleanValue(S.high), fa = l.getCleanValue(S.low), ca = l.getCleanValue(S.volume, !0), ma = l.getCleanValue(S.x), va && ua(O - I), H(I, O), ab(I, O), null !== ca && (C = !0), pa = H(I, O, W, fa), ja = ab(I, O, W, fa), G(E(S.valuetext, B)), t = Z(h(S.bordercolor, O < I ? y : w)), u = h(S.alpha, "100"), q = z(Z(h(S.color, O < I ? N : A)), u), D = Boolean(f(S.dashed)) ? ta(K, Wa) : "none", ya = {
                    opacity: u /
                    100
                }, ba = g.oriCatTmp[U], Q = z(t, la), da = b.getPointStub(e, c, S, I, O, W, fa, ca, Q, F, d.plotType, ba), ma = ma ? ma : U + 1, n[ma] = da.toolText, Y = G(h(S.displayvalue, S.valuetext, B)), d.data.push({
                    high: ab(I, O, W, fa),
                    low: H(I, O, W, fa),
                    color: va ? q : {FCcolor: {color: t, alpha: u}},
                    displayValue: Y,
                    displayValueArgs: Y,
                    borderColor: Q,
                    shadow: ya,
                    dashStyle: D,
                    borderWidth: F,
                    x: ma,
                    y: da.y,
                    categoryLabel: ba,
                    errorValue: da.errorValue,
                    previousY: da.previousY,
                    toolText: da.toolText,
                    link: da.link,
                    marker: {
                        enabled: Na,
                        fillColor: {FCcolor: {color: ea, alpha: R * J / 100 + B}},
                        lineColor: {FCcolor: {color: X, alpha: J}},
                        lineWidth: M,
                        radius: P,
                        startAngle: T,
                        symbol: ga(L)
                    }
                }), Y = E(G(h(S.volumetooltext, a.volumetooltext, c.volumetooltext))), Y = void 0 !== Y ? b.getPointStub(e, c, S, I, O, W, fa, ca, Q, F, d.plotType, ba, Y).toolText : da.toolText, k.push({
                    y: ca,
                    categoryLabel: ba,
                    color: z(q, u),
                    toolText: Y,
                    borderWidth: na,
                    borderColor: z(t, h(c.plotlinealpha, S.alpha)),
                    dashStyle: D,
                    shadow: ya,
                    x: ma,
                    link: S.link
                }), this.pointValueWatchers(e, ma, pa, ja, ca, x));
                g.toolTextStore = n;
                (d.drawVolume = C) ? p.push(d, k) : p = d;
                return p
            }
            return []
        },
        getPointStub: function (b, d, a, c, e, g, f, m, v, l, p, k, n) {
            var t = B, t = b[ha], u = t.numberFormatter, D = "line" === p, C = H(c, e), x = ab(c, e), y = {};
            b = b.subCharts && b.subCharts[0] && b.subCharts[0][ha].numberFormatter || u;
            switch (p) {
                case "line":
                    y.y = e;
                    y.link = h(a.link);
                    break;
                case "column":
                    y.y = ua(e - c);
                    y.previousY = C;
                    y.link = h(a.link);
                    y.errorValue = [];
                    0 < g - x && y.errorValue.push({
                        errorValue: g - x,
                        errorStartValue: x,
                        errorBarColor: v,
                        errorBarThickness: l,
                        opacity: 1
                    });
                    0 > f - C && y.errorValue.push({
                        errorValue: f - C, errorStartValue: C, errorBarColor: v, errorBarThickness: l,
                        opacity: 1
                    });
                    break;
                default:
                    y.y = c, y.previousY = e, y.link = h(a.link)
            }
            t.showTooltip ? (t = E(G(h(n, a.tooltext, t.tooltext))), void 0 !== t ? t = db(t, [3, 5, 6, 10, 54, 55, 56, 57, 58, 59, 60, 61, 81, 82], {
                label: k,
                yaxisName: G(d.yaxisname),
                xaxisName: G(d.xaxisname),
                openValue: a.open,
                openDataValue: u.dataLabels(c),
                closeValue: a.close,
                closeDataValue: u.dataLabels(e),
                highValue: a.high,
                highDataValue: u.dataLabels(g),
                lowValue: a.low,
                lowDataValue: u.dataLabels(f),
                volumeValue: a.volume,
                volumeDataValue: u.dataLabels(m)
            }, a, d) : (t = null === c || D ? B : "<b>Open:</b> " +
            u.dataLabels(c) + "<br/>", t += null !== e ? "<b>Close:</b> " + u.dataLabels(e) + "<br/>" : B, t += null === g || D ? B : "<b>High:</b> " + u.dataLabels(g) + "<br/>", t += null === f || D ? B : "<b>Low:</b> " + u.dataLabels(f) + "<br/>", t += null !== m ? "<b>Volume:</b> " + b.dataLabels(m) : B)) : t = B;
            y.toolText = t;
            return y
        },
        pointValueWatchers: function (b, d, a, c, e, g) {
            var q = b[ha];
            g = f(g, 0);
            null !== e && (b = q.volume, b || (b = q.volume = {}), b.max = b.max > e ? b.max : e, b.min = b.min < e ? b.min : e);
            null !== a && (b = q[g], !b.max && 0 !== b.max && (b.max = a), !b.min && 0 !== b.min && (b.min = a), b.max = ab(b.max,
                a), b.min = H(b.min, a));
            null !== c && (b = q[g], !b.max && 0 !== b.max && (b.max = c), !b.min && 0 !== b.min && (b.min = c), b.max = ab(b.max, c), b.min = H(b.min, c));
            null !== d && (a = q.x, a.max = a.max > d ? a.max : d, a.min = a.min < d ? a.min : d)
        },
        spaceManager: function (b, d, a, c) {
            var e = b[ha], g, q = d.chart, m = b.chart, v, l, p = this.smartLabel || e.smartLabel, k = e.x.min, n = e.x.max, t, u, D = c - (e.marginBottomExtraSpace + 0 + m.marginTop), C = b.yAxis, x;
            l = C.length;
            var y, N, ea = 0, w = 0, r = 8, F, la = ab(f(m.plotBorderWidth, 1), 0), K;
            this.base.spaceManager.apply(this, arguments);
            b.xAxis.min =
                k - .5;
            b.xAxis.max = n + .5;
            b.yAxis[0].title.centerYAxis = b.yAxis[1].title.centerYAxis = !0;
            if (b.subCharts) {
                k = b.subCharts[0];
                ea = b.xAxis.showLine ? b.xAxis.lineThickness : la;
                K = c - (m.marginTop + m.marginBottom + ea + la);
                w = k.chart.volumeHeightPercent;
                n = (e.horizontalAxisHeight || 15) + la;
                K = K * w / 100;
                m.marginBottom += K + ea + la;
                l = P({}, b.xAxis);
                w = 0;
                for (r = b.xAxis.plotBands.length; w < r; w += 1)(g = b.xAxis.plotBands[w]) && g.label && g.label.text && (g.label.text = " "), (g = l.plotBands[w]) && g.label && g.label.y && (g.label.y = zc(q.basefontsize, 10) + 4 +
                    ea);
                w = 0;
                for (r = l.plotLines.length; w < r; w += 1)(g = l.plotLines[w]) && g.label && g.label.text && (g.label.text = B);
                k.yAxis && k.yAxis[0] && k.yAxis[0].title && k.yAxis[0].title.text && (k.yAxis[0].title.text = B);
                k.xAxis = l;
                l = h(d.chart.rotateyaxisname, "ccw");
                l = l === Ma ? "none" : l;
                p = C[1].title.rotation ? p.getSmartText(k.yAxis[1].title.text, "none" === l ? m.marginLeft - 10 : K, void 0, !0).text : p.getSmartText(k.yAxis[1].title.text, p.getOriSize(C[1].title.text).width, void 0, !0).text;
                C = k.yAxis;
                l = C.length;
                r = w = ea = 0;
                for (y = l - 1; 0 <= y; --y)N = C[y],
                    g = e[y], x = N.opposite, F = (x ? w : ea) + r, l = h(d.chart.rotateyaxisname, x ? "cw" : "ccw"), l = l === Ma ? "none" : l, v = f(q.yaxisvaluespadding, q.labelypadding, 4), v < la && (v = la), g.verticalAxisNamePadding = 10, g.verticalAxisValuesPadding = v + (N.showLine ? N.lineThickness : 0), g.rotateVerticalAxisName = l, N.offset = F, x ? t = $a(N, g, k, d, D, m.marginRight, !!x, 0, 0, w) : u = $a(N, g, k, d, D, m.marginLeft, !!x, 0, 0, ea);
                C = b.yAxis;
                k.yAxis[1].title = P({}, b.yAxis[1].title);
                k.yAxis[1].title.style = b.orphanStyles.vyaxisname.style;
                k.yAxis[1].title.text = p;
                k.chart.left =
                    0;
                k.chart.width = a;
                k.chart.top = c - m.marginBottom + n;
                k.chart.height = m.marginBottom - n;
                t = Math.max(m.marginRight, t + m.spacingRight);
                u = Math.max(m.marginLeft, u + m.spacingLeft);
                k.chart.marginLeft = m.marginLeft = u;
                k.chart.marginRight = m.marginRight = t;
                k.chart.marginTop = 5;
                k.chart.marginBottom = m.marginBottom - (n + K);
                b.yAxis.push(k.yAxis[0], k.yAxis[1]);
                k.xAxis.startY = C[2].startY = C[3].startY = k.chart.top + k.chart.marginTop;
                k.xAxis.endY = C[2].endY = C[3].endY = k.yAxis[0].startY + k.chart.height - k.chart.marginBottom;
                k.series[0] &&
                (k.series[0].yAxis = 3, b.series.push(k.series[0]));
                b.xAxis = [b.xAxis, k.xAxis];
                b.yAxis[2].title.centerYAxis = b.yAxis[3].title.centerYAxis = !0
            }
        },
        isDual: !0,
        numVDivLines: 0,
        defSetAdaptiveYMin: !0,
        divLineIsDashed: 1,
        isCandleStick: !0,
        defaultPlotShadow: 1,
        requiredAutoNumericLabels: 1
    }, r.scatterbase);
    r("kagi", {
        friendlyName: "Kagi Chart",
        standaloneInit: !0,
        stepLine: !0,
        creditLabel: ra,
        defaultSeriesType: "kagi",
        defaultZeroPlaneHighlighted: !1,
        setAdaptiveYMin: 1,
        canvasPadding: 15,
        isKagi: 1,
        rendererId: "kagi",
        pointValueWatcher: function (b,
                                     d, a) {
            null !== d && (b = b[ha], a = f(a, 0), b[a] || (b[a] = {}), a = b[a], this.maxValue = a.max = a.max > d ? a.max : d, this.minValue = a.min = a.min < d ? a.min : d)
        },
        point: function (b, d, a, c, e) {
            b = e.chart;
            var g = a.length, q = 0, m = e[ha].x, v = e[ha].numberFormatter, l = this.colorManager, p, k, n, t, u, D, C, x, y, N, w, r, A, F, la, K, z, na, E, L, T, H, X, M, J, R;
            x = Z(h(c.linecolor, c.palettecolors, l.getColor("plotFillColor")));
            y = f(c.linealpha, 100);
            p = f(c.linethickness, 2);
            d.color = {FCcolor: {color: x, alpha: y}};
            E = d.anchorShadow = f(c.anchorshadow, 0);
            d.lineWidth = p;
            d.step = this.stepLine;
            d.drawVerticalJoins = Boolean(f(c.drawverticaljoins, 1));
            C = f(c.drawanchors, c.showanchors);
            for (k = 0; k < g; k += 1)t = a[k], t.vline || (p = v.getCleanValue(t.value), null != p && (n = f(t.showlabel, c.showlabels, 1), n = G(n ? W(t.label, t.name) : B), q += 1, D = f(t.linealpha, y), u = {opacity: D / 100}, N = f(t.anchorsides, c.anchorsides, 0), na = f(t.anchorstartangle, c.anchorstartangle, 90), A = f(t.anchorradius, c.anchorradius, this.anchorRadius, 3), r = Z(h(t.anchorbordercolor, c.anchorbordercolor, x)), w = f(t.anchorborderthickness, c.anchorborderthickness, this.anchorBorderThickness,
                1), F = Z(h(t.anchorbgcolor, c.anchorbgcolor, l.getColor("anchorBgColor"))), la = h(t.anchoralpha, c.anchoralpha, "100"), K = h(t.anchorbgalpha, c.anchorbgalpha, la), D = void 0 === C ? 0 !== D : !!C, L = Boolean(f(t.anchorshadow, E, 0)), T = h(t.anchorimageurl, c.anchorimageurl), H = h(t.anchorimagescale, c.anchorimagescale, 100), X = h(t.anchorimagealpha, c.anchorimagealpha, 100), M = h(t.anchorimagepadding, c.anchorimagepadding, 1), J = f(t.anchorradius, c.anchorradius), R = f(t.hoverradius, c.hoverradius, t.anchorhoverradius, c.anchorhoverradius), z = this.pointHoverOptions(t,
                d, {
                    plotType: "anchor",
                    anchorBgColor: F,
                    anchorAlpha: la,
                    anchorBgAlpha: K,
                    anchorAngle: na,
                    anchorBorderThickness: w,
                    anchorBorderColor: r,
                    anchorBorderAlpha: la,
                    anchorSides: N,
                    anchorRadius: A,
                    imageUrl: T,
                    imageScale: H,
                    imageAlpha: X,
                    imagePadding: M,
                    shadow: u
                }), d.data.push(P(this.getPointStub(t, p, n, e), {
                y: p,
                color: x,
                shadow: u,
                dashStyle: t.dashed,
                valuePosition: h(t.valueposition, b.valuePosition),
                isDefined: !0,
                marker: {
                    enabled: !!D,
                    shadow: L && {opacity: la / 100},
                    fillColor: {FCcolor: {color: F, alpha: K * la / 100 + B}},
                    lineColor: {
                        FCcolor: {
                            color: r,
                            alpha: la
                        }
                    },
                    lineWidth: w,
                    radius: A,
                    startAngle: na,
                    symbol: ga(N),
                    imageUrl: T,
                    imageScale: H,
                    imageAlpha: X,
                    imagePadding: M,
                    isAnchorRadius: J,
                    isAnchorHoverRadius: R
                },
                hoverEffects: z.enabled && z.options,
                rolloverProperties: z.enabled && z.rolloverOptions
            })), this.pointValueWatcher(e, p)));
            m.catCount = q;
            return d
        },
        postSeriesAddition: function (b, d) {
            var a = b.series[0], c = d.chart, e = d.data, g = a && a.data, q = g && g.length, m = b[ha], v = m.x, m = m.axisGridManager, l = b.xAxis, p = !1, k = 0, n = .5, t = f(c.reversalvalue, -1), q = f(c.reversalpercentage, 5), u = this.maxValue,
                D = this.minValue, C, x, y, N, w, r, A, F, la, K, z, na, E, H, T, L, X = {};
            if (g && g.length) {
                a.rallyColor = h(c.rallycolor, "FF0000");
                a.rallyAlpha = f(c.rallyalpha, c.linealpha, 100);
                a.declineColor = h(c.declinecolor, "0000FF");
                a.declineAlpha = f(c.declinealpha, c.linealpha, 100);
                a.rallyThickness = f(c.rallythickness, c.linethickness, 2);
                w = f(c.rallydashlen, c.linedashlen, 5);
                na = f(c.rallydashgap, c.linedashgap, 4);
                a.declineThickness = f(c.declinethickness, c.linethickness, 2);
                E = f(c.declinedashlen, c.linedashlen, 5);
                H = f(c.declinedashgap, c.linedashgap,
                    4);
                a.lineDashed = {
                    "true": f(c.rallydashed, c.linedashed, 0),
                    "false": f(c.declinedashed, c.linedashed, 0)
                };
                a.rallyDashed = f(c.rallydashed, c.linedashed, 0) ? ta(w, na, a.rallyThickness) : "none";
                a.declineDashed = f(c.declinedashed, c.linedashed, 0) ? ta(E, H, a.declineThickness) : "none";
                a.canvasPadding = f(c.canvaspadding, this.canvasPadding, 15);
                t = 0 < t ? t : q * (u - D) / 100;
                u = g[0].y;
                D = function (a, b) {
                    for (var c, d = 1, e = g[0].y; d < a;)c = g[d].y, b ? c <= e && (g[d].isDefined = !1) : c >= e && (g[d].isDefined = !1), d += 1;
                    g[0].vAlign = b ? Ia : La;
                    g[0].align = "center"
                };
                q = e && e.length;
                for (H = E = 0; H < q; H += 1)if ((na = e[H]) && na.vline)E && m.addVline(l, na, n, b); else {
                    X = e[H];
                    L && (L = !1, n += .5);
                    if (E && (la = g[E])) {
                        K = g[E - 1];
                        la.vAlign = "middle";
                        la.align = za;
                        la.showLabel = !1;
                        w = null;
                        N = la.y;
                        y = g[E + 1] && g[E + 1].y;
                        z = ua(u - N);
                        p ? N < r && C ? C = !1 : N > A && !C && (C = !0) : (N > u && z > t ? (C = !0, r = u, A = null, p = x = !0, D(E, C)) : N < u && z > t ? (C = !1, r = null, A = u, x = !1, p = !0, D(E, C)) : (x = C = null, p = !1), ca(K) && (K.isRally = C), null != C && (g[0].isRally = C));
                        la.isRally = C;
                        if (x && N < u || !x && N > u)w = u;
                        T = w ? w : N;
                        z = ua(T - y);
                        y = null == x ? null : x ? T > y && z >= t : T < y && z >= t;
                        if (K &&
                            K.isShift)for (x ? (r = u, F = Ia) : x || (A = u, F = La), K = E; 1 < K; --K)if (g[K].y == u) {
                            g[K].vAlign = F;
                            g[K].align = "center";
                            g[K].showLabel = !0;
                            break
                        }
                        y ? (k += 1, n += .5, L = !0, x = !x, la.isShift = !0, u = T, N = f(na.showlabel, c.showlabels, 1), N = G(N ? W(na.label, na.name) : B), m.addXaxisCat(l, k - 1, k - 1, N, na, {}, c)) : x && N > u || !x && N < u ? u = N : w = u;
                        la.plotValue = w;
                        la.objParams = {isRally: C, lastHigh: A, lastLow: r, isRallyInitialised: p}
                    }
                    E += 1
                }
                N = f(X.showlabel, c.showlabels, 1);
                N = G(N ? W(X.label, X.name) : B);
                m.addXaxisCat(l, k, k, N, X, {}, c);
                a.shiftCount = v.catCount = k + 1
            }
        },
        xAxisMinMaxSetter: function (b,
                                     d, a) {
            var c = b[ha].x, e = d.chart;
            d = c.min = f(c.min, 0);
            var c = c.max = f(c.max, c.catCount - 1), g = b.xAxis, q = H(f(e.canvaspadding, 0), a / 2 - 10), m = q, h = f(e.maxhshiftpercent, 10), l = b.series[0];
            b = l && l.shiftCount;
            var e = f(e.canvaspadding, this.canvasPadding, 15), p = a - 2 * e;
            l && (m = l.xShiftLength = H(p / b, (0 >= h ? 10 : h) * p / 100), q = e + m / 2, m = a - (m * ab(b - 1, 1) + q), c = ab(c, 1));
            g.labels.enabled = !1;
            g.gridLineWidth = 0;
            g.alternateGridColor = qa;
            a = (a - (q + m)) / (c - d + 0);
            g.min = d - (0 + q / a);
            g.max = c + (0 + m / a)
        }
    }, r.linebase);
    Eb = function (b, d, a) {
        this.nf = d;
        this.dataSeparator =
            a;
        this.method = (b || B).toLowerCase().replace(/\s/g, "")
    };
    Eb.prototype = {
        setArray: function (b) {
            var d = this.nf, a = this.dataSeparator, c = 0;
            !b && (b = B);
            for (b = this.dataLength = (a = b.replace(/\s/g, B).split(a)) && a.length; b--;)c += a[b] = d.getCleanValue(a[b]);
            a && a.sort(function (a, b) {
                return a - b
            });
            this.values = a;
            this.mean = c / this.dataLength;
            this.getFrequencies()
        }, getQuartiles: function () {
            var b = this.values, d = this.dataLength, a = d % 2, c, e;
            switch (this.method) {
                case "tukey":
                    a ? (a = (d + 3) / 4, d = (3 * d + 1) / 4) : (a = (d + 2) / 4, d = (3 * d + 2) / 4);
                    break;
                case "mooremccabe":
                    a ?
                        (a = (d + 1) / 4, d = 3 * a) : (a = (d + 2) / 4, d = (3 * d + 2) / 4);
                    break;
                case "freundperles":
                    a = (d + 3) / 4;
                    d = (3 * d + 1) / 4;
                    break;
                case "mendenhallsincich":
                    a = L((d + 1) / 4);
                    d = L(3 * a);
                    break;
                default:
                    a = (d + 1) / 4, d = 3 * a
            }
            --a;
            --d;
            c = Zb(a);
            e = Zb(d);
            a = a - c ? b[c] + (b[sc(a)] - b[c]) * (a - c) : b[a];
            b = d - e ? b[e] + (b[sc(d)] - b[e]) * (d - e) : b[d];
            return this.quartiles = {q1: a, q3: b}
        }, getMinMax: function () {
            var b = this.values;
            return {min: b[0], max: b[this.dataLength - 1]}
        }, getMean: function () {
            return this.mean
        }, getMD: function () {
            for (var b = this.mean, d = this.frequencies, a = d.length, c, e = 0; a--;)c =
                d[a], e += c.frequency * ua(c.value - b);
            return e / this.dataLength
        }, getSD: function () {
            for (var b = this.mean, d = this.values, a = this.dataLength, c = a, e = 0; a--;)e += O(d[a] - b, 2);
            return ec(e) / c
        }, getQD: function () {
            return .5 * (this.quartiles.q3 - this.quartiles.q1)
        }, getFrequencies: function () {
            var b = [], d = this.dataLength, a = this.values, c = 0, e, g, f;
            for (f = 0; f < d; f += 1)c += e = a[f], ca(b[f]) ? b[f].frequency += 1 : (g = {}, g.value = e, g.frequency = 1, b[f] = g);
            this.sum = c;
            this.frequencies = b
        }, getMedian: function () {
            var b = this.dataLength, d = .5 * b, a = this.values;
            return 0 === b % 2 ? (a[d] + a[d - 1]) / 2 : a[Zb(d)]
        }
    };
    Eb.prototype.constructor = Eb;
    r("boxandwhisker2d", {
        friendlyName: "Box and Whisker Chart",
        standaloneInit: !0,
        creditLabel: ra,
        defaultSeriesType: "boxandwhisker2d",
        chart: r.errorbar2d.chart,
        drawErrorValue: r.errorbar2d.drawErrorValue,
        decimals: 2,
        maxColWidth: 9E3,
        useErrorAnimation: 1,
        avoidCrispError: 0,
        tooltipsepchar: ": ",
        rendererId: "boxandwhisker",
        fireGroupEvent: !0,
        point: function (b, d, a, c, e, g, q, m, v) {
            var l = e[ha], p = f(c.ignoreemptydatasets, 0), k = l.numberFormatter, n = e.chart.useRoundEdges,
                t = f(c.showshadow, 1), u = this.colorManager, D = "," + (f(c.useplotgradientcolor, 0) ? Fb(c.plotgradientcolor, u.getColor("plotGradientColor")) : B), C = 2 * q, x = f(c.plotborderthickness, 1), y = h(c.plotbordercolor, u.getColor("plotBorderColor")).split(",")[0], N = h(c.plotborderalpha, "100"), w = "0" == c.showplotborder ? "0" : N, r = f(a.dashed, c.plotborderdashed, 0), A = f(a.dashlen, c.plotborderdashlen, 5), F = f(a.dashgap, c.plotborderdashgap, 4), la = h(a.upperboxcolor, c.upperboxcolor, u.getPlotColor(C)), K = h(a.lowerboxcolor, c.lowerboxcolor, u.getPlotColor(C +
                    1)), L = f(a.upperboxalpha, c.upperboxalpha), na = f(a.lowerboxalpha, c.lowerboxalpha), I = h(a.upperwhiskercolor, c.upperwhiskercolor, y), O = h(a.lowerwhiskercolor, c.lowerwhiskercolor, y), T = f(a.upperwhiskeralpha, c.upperwhiskeralpha, c.plotborderalpha, "100"), W = f(a.lowerwhiskeralpha, c.lowerwhiskeralpha, c.plotborderalpha, "100"), X = f(a.upperwhiskerthickness, c.upperwhiskerthickness, x), M = f(a.lowerwhiskerthickness, c.lowerwhiskerthickness, x), J = h(a.upperwhiskerdashed, c.upperwhiskerdashed, 0), R = h(a.lowerwhiskerdashed, c.lowerwhiskerdashed,
                0), ya = h(a.upperwhiskerdashlen, c.upperwhiskerdashlen, 5), U = h(a.lowerwhiskerdashlen, c.lowerwhiskerdashlen, 5), S = h(a.upperwhiskerdashgap, c.upperwhiskerdashgap, 4), da = h(a.lowerwhiskerdashgap, c.lowerwhiskerdashgap, 4), ba = h(a.upperquartilecolor, c.upperquartilecolor, y), Y = h(a.lowerquartilecolor, c.lowerquartilecolor, y), Z = h(a.upperboxbordercolor, c.upperboxbordercolor, y), Q = h(a.lowerboxbordercolor, c.lowerboxbordercolor, y), aa = h(a.mediancolor, c.mediancolor, y), fa = h(a.upperquartilealpha, c.upperquartilealpha, n ? 0 : N), ka =
                    h(a.lowerquartilealpha, c.lowerquartilealpha, n ? 0 : N), ia = h(a.upperboxborderalpha, c.upperboxborderalpha, n ? 0 : w), ja = h(a.lowerboxborderalpha, c.lowerboxborderalpha, n ? 0 : w), ma = h(a.medianalpha, c.medianalpha, N), oa = h(a.upperquartilethickness, c.upperquartilethickness, x), va = h(a.lowerquartilethickness, c.lowerquartilethickness, x), ra = h(a.upperboxborderthickness, c.upperboxborderthickness, x), Mc = h(a.lowerboxborderthickness, c.lowerboxborderthickness, x), Bc = h(a.medianthickness, c.medianthickness, x), ua = h(a.upperquartiledashed,
                c.upperquartiledashed, r), wa = h(a.lowerquartiledashed, c.lowerquartiledashed, r), sa = h(a.upperboxborderdashed, c.upperboxborderdashed, r), qb = h(a.lowerboxborderdashed, c.lowerboxborderdashed, r), bd = h(a.mediandashed, c.mediandashed, r), Ba = h(a.upperquartiledashlen, c.upperquartiledashlen, A), Aa = h(a.lowerquartiledashlen, c.lowerquartiledashlen, A), za = h(a.upperboxborderdashlen, c.upperboxborderdashlen, A), Ca = h(a.lowerboxborderdashlen, c.lowerboxborderdashlen, A), Da = h(a.mediandashlen, c.mediandashlen, A), Ea = h(a.upperquartiledashgap,
                c.upperquartiledashgap, F), Ia = h(a.lowerquartiledashgap, c.lowerquartiledashgap, F), Ja = h(a.upperboxborderdashgap, c.upperboxborderdashgap, F), Ka = h(a.lowerboxborderdashgap, c.lowerboxborderdashgap, F), Ma = h(a.mediandashgap, c.mediandashgap, F), Ha = {}, La = {}, Oa = {}, Pa = {}, Ga = {}, Qa = [], Ra = [], Sa = [], Ta = [], Va = [], Ua = {
                    polygon: "polygon",
                    spoke: "spoke"
                }, Xa = Ua[h(a.meaniconshape, c.meaniconshape, "polygon").toLowerCase()] || "polygon", $a = f(a.meaniconradius, c.meaniconradius, 5), Za = f(a.meaniconsides, c.meaniconsides, 3), bb = h(a.meaniconcolor,
                c.meaniconcolor, "000000"), cb = h(a.meaniconbordercolor, c.meaniconbordercolor, "000000"), eb = f(a.meaniconalpha, c.meaniconalpha, 100), db = Ua[h(a.sdiconshape, c.sdiconshape, "polygon").toLowerCase()] || "polygon", fb = f(a.sdiconradius, c.sdiconradius, 5), hb = f(a.sdiconsides, c.sdiconsides, 3), ib = h(a.sdiconcolor, c.sdiconcolor, "000000"), jb = h(a.sdiconbordercolor, c.sdiconbordercolor, "000000"), nb = f(a.sdiconalpha, c.sdiconalpha, 100), kb = Ua[h(a.mdiconshape, c.mdiconshape, "polygon").toLowerCase()] || "polygon", ob = f(a.mdiconradius,
                c.mdiconradius, 5), pb = f(a.mdiconsides, c.mdiconsides, 3), mb = h(a.mdiconcolor, c.mdiconcolor, "000000"), wb = h(a.mdiconbordercolor, c.mdiconbordercolor, "000000"), Bb = f(a.mdiconalpha, c.mdiconalpha, 100), sb = Ua[h(a.qdiconshape, c.qdiconshape, "polygon").toLowerCase()] || "polygon", ub = f(a.qdiconradius, c.qdiconradius, 5), vb = f(a.qdiconsides, c.qdiconsides, 3), tb = h(a.qdiconcolor, c.qdiconcolor, "000000"), Db = h(a.qdiconbordercolor, c.qdiconbordercolor, "000000"), Gb = f(a.qdiconalpha, c.qdiconalpha, 100), Eb = Ua[h(a.outliericonshape, c.outliericonshape,
                    "polygon").toLowerCase()] || "polygon", Nb = f(a.outliericonradius, c.outliericonradius, 5), Ob = f(a.outliericonsides, c.outliericonsides, 3), Rb = h(a.outliericoncolor, c.outliericoncolor, "000000"), Sb = h(a.outliericonbordercolor, c.outliericonbordercolor, "000000"), $b = f(a.outliericonalpha, c.outliericonalpha, 100), Lb = (1 - 2 * l.plotSpacePercent) / 2 * (-.5 + q), Zb = f(c.reverselegend, 0), jc = Zb ? -1 : 1, kc = d.legendIndex = 6 * q + (Zb ? 5 : 0), gc = f(a.showmean, c.showmean, 0), hc = f(a.showmd, c.showmd, 0), ic = f(a.showsd, c.showsd, 0), sc = f(a.showqd, c.showqd,
                0), ec = f(a.showalloutliers, c.showalloutliers, 0), uc = f(c.outliersupperrangeratio, 0), vc = f(c.outlierslowerrangeratio, 0), fc = !1, lc = Boolean(f(c.showdetailedlegend, 1)), mc = l.tooltipSepChar, Tb = !0, tc = l.dataSeparator, Pb = l.bwCalc, Nc = h(d.type, this.defaultSeriesType), zc = e.plotOptions[Nc] && e.plotOptions[Nc].stacking, rb, Ub, Cc, Dc, Oc, Pc, Qc, Rc, Sc, Tc, Uc, lb, Hb, Ib, Jb, Kb, wc, Ec, Mb, bc, nc, Qb, cc, Vb, Wb, Xb, Fc, Gc, oc, Hc, V, pc, Yb, qc, dc, Vc, Ic, gb, Ya, Wc, rc, Jc, xb, yb, xc, Kc, zb, Ab, Lc, Ac = function (a, b) {
                    return a - b
                }, yc, Xc, Yc, Zc, $c, ad;
            d.errorBarWidthPercent =
                f(a.whiskerslimitswidthratio, c.whiskerslimitswidthratio, 40);
            Jc = a.data;
            d.name = E(a.seriesname);
            zc || (d.columnPosition = f(v, m, q));
            d.errorBar2D = !0;
            if (0 === f(a.includeinlegend) || void 0 === d.name)Tb = d.showInLegend = !1;
            3 > Za && (Za = 3);
            wc = Cb(la.split(",")[0]);
            Ec = Cb(K.split(",")[0]);
            d.color = {
                FCcolor: {
                    color: wc + "," + wc + "," + Ec + "," + Ec,
                    alpha: "100,100,100,100",
                    angle: 90,
                    ratio: "0,50,0,50"
                }
            };
            qc = this.isBar;
            w = (dc = /3d$/.test(e.chart.defaultSeriesType)) ? c.showplotborder ? w : "0" : w;
            y = dc ? h(c.plotbordercolor, "#FFFFFF") : y;
            uc = 0 > uc ? 0 : uc;
            vc = 0 > vc ? 0 : vc;
            for (Xb = 0; Xb < g; Xb += 1) {
                if (V = Jc && Jc[Xb])V.value ? (Pb.setArray(V.value), Kc = Pb.getQuartiles(), zb = Kc.q1, Ab = Kc.q3, Lc = Pb.getMinMax(), yb = Wb = Lc.min, xb = Lc.max, xc = Pb.getMedian(), Hb = Pb.getMean(), Jb = Pb.getMD(), Ib = Pb.getSD(), Kb = Pb.getQD(), Vb = cc = xb) : (zb = k.getCleanValue(V.q1), Ab = k.getCleanValue(V.q3), yb = Wb = k.getCleanValue(V.min), xb = k.getCleanValue(V.max), xc = k.getCleanValue(V.median), Vb = cc = xb, Hb = Dc = k.getCleanValue(V.mean), Jb = k.getCleanValue(V.md), Ib = k.getCleanValue(V.sd), Kb = k.getCleanValue(V.qd));
                if (V &&
                    null != zb && null != Ab && null !== cc) {
                    fc = !0;
                    Dc = f(V.showmean, gc);
                    Oc = f(V.showmd, hc);
                    Pc = f(V.showsd, ic);
                    Qc = f(V.showqd, sc);
                    Ub = l.oriCatTmp[Xb];
                    gb = this.getPointStub(e, c, a, V, xb, Ab, xc, zb, yb, Hb, Jb, Ib, Kb, Ub);
                    Ya = gb.toolText;
                    Dc ? (Rc = 1, lb = f(V.meaniconalpha, eb), Ya = E(G(h(V.meantooltext, a.meantooltext, c.meantooltext))), Ya = void 0 !== Ya ? this.getTooltext(Ya, e, c, a, V, xb, yb, zb, Ab, Ga, Ib, Kb, Jb, Hb, Ub) : "<b>Mean" + mc + "</b>" + k.dataLabels(Hb), Qa.push({
                        y: Hb, toolText: Ya, link: gb.link, marker: {
                            enabled: !0,
                            fillColor: z(h(V.meaniconcolor, bb), lb),
                            lineColor: z(h(V.meaniconbordercolor, cb), lb),
                            radius: f(V.meaniconradius, $a),
                            symbol: ga(f(V.meaniconsides, Za), "spoke" == h(V.meaniconshape, Xa))
                        }
                    })) : Qa.push({y: null});
                    Oc ? (Sc = 1, lb = f(V.mdiconalpha, Bb), Ya = E(G(h(V.mdtooltext, a.mdtooltext, c.mdtooltext))), Ya = void 0 !== Ya ? this.getTooltext(Ya, e, c, a, V, xb, yb, zb, Ab, Ga, Ib, Kb, Jb, Hb, Ub) : "<b>MD" + mc + "</b>" + k.dataLabels(Jb), Ra.push({
                        y: Jb, toolText: Ya, link: gb.link, marker: {
                            enabled: !0,
                            fillColor: z(h(V.mdiconcolor, mb), lb),
                            lineColor: z(h(V.mdiconbordercolor, jb), lb),
                            radius: f(V.mdiconradius,
                                ob),
                            symbol: ga(f(V.mdiconsides, pb), "spoke" == h(V.mdiconshape, kb))
                        }
                    })) : Ra.push({y: null});
                    Pc ? (Tc = 1, lb = f(V.sdiconalpha, nb), Ya = E(G(h(V.sdtooltext, a.sdtooltext, c.sdtooltext))), Ya = void 0 !== Ya ? this.getTooltext(Ya, e, c, a, V, xb, yb, zb, Ab, Ga, Ib, Kb, Jb, Hb, Ub) : "<b>SD" + mc + "</b>" + k.dataLabels(Ib), Sa.push({
                        y: Ib,
                        toolText: Ya,
                        link: gb.link,
                        marker: {
                            enabled: !0,
                            fillColor: z(h(V.sdiconcolor, ib), lb),
                            lineColor: z(h(V.sdiconbordercolor, jb), lb),
                            radius: f(V.sdiconradius, fb),
                            symbol: ga(f(V.sdiconsides, hb), "spoke" == h(V.sdiconshape, db))
                        }
                    })) :
                        Sa.push({y: null});
                    Qc ? (Uc = 1, lb = f(V.qdiconalpha, Gb), Ya = E(G(h(V.qdtooltext, a.qdtooltext, c.qdtooltext))), Ya = void 0 !== Ya ? this.getTooltext(Ya, e, c, a, V, xb, yb, zb, Ab, Ga, Ib, Kb, Jb, Hb, Ub) : "<b>QD" + mc + "</b>" + k.dataLabels(Kb), Ta.push({
                        y: Kb,
                        toolText: Ya,
                        link: gb.link,
                        marker: {
                            enabled: !0,
                            fillColor: z(h(V.qdiconcolor, tb), lb),
                            lineColor: z(h(V.qdiconbordercolor, Db), lb),
                            radius: f(V.qdiconradius, ub),
                            symbol: ga(f(V.qdiconsides, vb), "spoke" == h(V.qdiconshape, sb))
                        }
                    })) : Ta.push({y: null});
                    if (Mb = V.outliers) {
                        Mb = Mb.replace(/\s/g, B).split(tc);
                        for (bc = Mb.length; bc--;)Mb[bc] = k.getCleanValue(Mb[bc]);
                        Mb.sort(Ac);
                        bc = Mb.length;
                        for (nc = 0; nc < bc; nc += 1)if (Qb = Mb[nc], ec && (Vb = ab(cc, Qb), Wb = H(yb, Qb)), lb = f(V.outliericonalpha, $b), Qb > cc || Qb < yb)Ya = E(G(h(V.outlierstooltext, a.outlierstooltext, c.outlierstooltext))), Ya = void 0 !== Ya ? this.getTooltext(Ya, e, c, a, V, xb, yb, zb, Ab, Ga, Ib, Kb, Jb, Hb, Ub, Qb) : "<b>Outlier" + mc + "</b>" + k.dataLabels(Qb), Va.push({
                            y: Qb, toolText: Ya, x: Xb, link: gb.link, marker: {
                                enabled: !0,
                                fillColor: z(h(V.outliericoncolor, Rb), lb),
                                lineColor: z(h(V.outliericonbordercolor,
                                    Sb), lb),
                                radius: f(V.outliericonradius, Nb),
                                symbol: ga(f(V.outliericonsides, Ob), "spoke" == h(V.outliericonshape, Eb))
                            }
                        })
                    }
                    ec || (Cc = Vb - Wb, Vb += Cc * uc, Wb -= Cc * vc);
                    Fc = h(V.upperboxcolor, la) + D;
                    Gc = h(V.lowerboxcolor, K) + D;
                    oc = h(V.upperboxalpha, L, c.upperboxalpha, c.plotfillalpha, "100") + B;
                    Hc = h(V.lowerboxalpha, na, c.lowerboxalpha, c.plotfillalpha, "100") + B;
                    pc = h(V.ratio, a.ratio, c.plotfillratio);
                    Yb = h(360 - c.plotfillangle, 90);
                    0 > cc && (Yb = 360 - Yb);
                    Wc = {opacity: oc / 100};
                    rc = H(oc, w) + B;
                    Vc = ac(Fc, oc, pc, Yb, n, y, rc, qc, dc);
                    Ic = ac(Gc, Hc, pc, Yb, n,
                        y, rc, qc, dc);
                    Ha = {
                        value: Ab,
                        color: z(h(V.upperquartilecolor, ba), f(V.upperquartilealpha, fa)),
                        borderWidth: f(V.upperquartilethickness, oa),
                        dashStyle: f(V.upperquartiledashed, ua) ? ta(h(V.upperquartiledashlen, Ba), h(V.upperquartiledashgap, Ea), f(V.upperquartilethickness, oa)) : "none",
                        displayValue: gb.displayValueQ3
                    };
                    La = {
                        value: zb,
                        color: z(h(V.lowerquartilecolor, Y), f(V.lowerquartilealpha, ka)),
                        borderWidth: f(V.lowerquartilethickness, va),
                        dashStyle: f(V.lowerquartiledashed, wa) ? ta(h(V.lowerquartiledashlen, Aa), h(V.lowerquartiledashgap,
                            Ia), f(V.lowerquartilethickness, va)) : "none",
                        displayValue: gb.displayValueQ1
                    };
                    Oa = {
                        color: z(h(V.upperboxbordercolor, Z), f(V.upperboxborderalpha, ia)),
                        borderWidth: f(V.upperboxborderthickness, ra),
                        dashStyle: f(V.upperboxborderdashed, sa) ? ta(h(V.upperboxborderdashlen, za), h(V.upperboxborderdashgap, Ja), f(V.upperboxborderthickness, ra)) : "none"
                    };
                    Pa = {
                        color: z(h(V.lowerboxbordercolor, Q), f(V.lowerboxborderalpha, ja)),
                        borderWidth: f(V.lowerboxborderthickness, Mc),
                        dashStyle: f(V.lowerboxborderdashed, qb) ? ta(h(V.lowerboxborderdashlen,
                            Ca), h(V.lowerboxborderdashgap, Ka), f(V.lowerboxborderthickness, Mc)) : "none"
                    };
                    Ga = {
                        value: xc,
                        color: z(h(V.mediancolor, aa), f(V.medianalpha, ma)),
                        borderWidth: f(V.medianthickness, Bc),
                        dashStyle: f(V.mediandashed, bd) ? ta(h(V.mediandashlen, Da), h(V.mediandashgap, Ma), f(V.medianthickness, Bc)) : "none",
                        displayValue: gb.displayValueMid
                    };
                    yc = [];
                    ca(xb) && yc.push({
                        errorValue: xb - Ab,
                        toolText: gb.toolText,
                        link: gb.link,
                        errorBarColor: z(h(V.upperwhiskercolor, I), f(V.upperwhiskeralpha, T)),
                        errorBarThickness: f(V.upperwhiskerthickness,
                            X),
                        dashStyle: f(V.upperwhiskerdashed, J) ? ta(h(V.upperwhiskerdashlen, ya), h(V.upperwhiskerdashgap, S), f(V.upperwhiskerthickness, X)) : "none",
                        displayValue: gb.displayValueMax,
                        shadow: {opacity: t ? f(V.upperwhiskeralpha, T) / 250 : 0}
                    });
                    ca(yb) && yc.push({
                        errorValue: -(zb - yb),
                        errorStartValue: zb,
                        toolText: gb.toolText,
                        link: gb.link,
                        errorBarColor: z(h(V.lowerwhiskercolor, O), f(V.lowerwhiskeralpha, W)),
                        errorBarThickness: f(V.lowerwhiskerthickness, M),
                        dashStyle: f(V.lowerwhiskerdashed, R) ? ta(h(V.lowerwhiskerdashlen, U), h(V.lowerwhiskerdashgap,
                            da), f(V.lowerwhiskerthickness, M)) : "none",
                        displayValue: gb.displayValueMin,
                        shadow: {opacity: t ? f(V.lowerwhiskeralpha, W) / 250 : 0}
                    });
                    rb = this.pointHoverOptions(V, a, c, {
                        upperBoxColor: Fc,
                        upperBoxAlpha: oc,
                        upperBoxBorderColor: h(V.upperboxbordercolor, Z),
                        upperBoxBorderAlpha: f(V.upperboxborderalpha, ia),
                        upperBoxBorderThickness: Oa.borderWidth,
                        lowerBoxColor: Gc,
                        lowerBoxAlpha: Hc,
                        lowerBoxBorderColor: h(V.lowerboxbordercolor, Q),
                        lowerBoxBorderAlpha: f(V.lowerboxborderalpha, ja),
                        lowerBoxBorderThickness: Pa.borderWidth,
                        upperQuartileColor: h(V.upperquartilecolor,
                            ba),
                        upperQuartileAlpha: f(V.upperquartilealpha, fa),
                        upperQuartileThickness: Ha.borderWidth,
                        lowerQuartileColor: h(V.lowerquartilecolor, Y),
                        lowerQuartileAlpha: f(V.lowerquartilealpha, ka),
                        lowerQuartileThickness: La.borderWidth,
                        upperWhiskerColor: h(V.upperwhiskercolor, I),
                        upperWhiskerThickness: f(V.upperwhiskerthickness, X),
                        upperWhiskerAlpha: f(V.upperwhiskeralpha, T),
                        lowerWhiskerColor: h(V.lowerwhiskercolor, O),
                        lowerWhiskerAlpha: f(V.lowerwhiskeralpha, W),
                        lowerWhiskerThickness: f(V.lowerwhiskerthickness, M),
                        medianColor: h(V.mediancolor,
                            aa),
                        medianAlpha: f(V.medianalpha, ma),
                        medianThickness: f(V.medianthickness, Bc)
                    });
                    rb.enabled && (rb.upperBox.fill = pa(ac(rb.upperBox.color, rb.upperBox.alpha, pc, Yb, n, y, rc, qc, dc)[0].FCcolor), delete rb.upperBox.color, delete rb.upperBox.alpha, rb.lowerBox.fill = pa(ac(rb.lowerBox.color, rb.lowerBox.alpha, pc, Yb, n, y, rc, qc, dc)[0].FCcolor), delete rb.lowerBox.color, delete rb.lowerBox.alpha);
                    d.data.push(P(gb, {
                        y: Ab,
                        errorValue: yc,
                        shadow: Wc,
                        color: Vc[0],
                        toolText: gb.toolText,
                        lowerboxColor: Ic[0],
                        lowerboxBorderColor: Ic[1],
                        borderWidth: 0,
                        upperQuartile: Ha,
                        lowerQuartile: La,
                        upperBoxBorder: Oa,
                        lowerBoxBorder: Pa,
                        median: Ga,
                        hoverEffects: rb
                    }));
                    d.isRoundEdges = n;
                    this.pointValueWatcher(e, Vb);
                    this.pointValueWatcher(e, Wb)
                } else d.data.push({y: null}), Ra.push({y: null}), Sa.push({y: null}), Ta.push({y: null}), Qa.push({y: null})
            }
            d.showInLegend = Tb && (fc || !p);
            d.legendFillColor = z(wc, 20);
            Xc = {
                type: "line",
                name: "Mean",
                relatedSeries: "boxandwhisker",
                data: Qa,
                legendIndex: kc + jc,
                showInLegend: !!Rc && Tb && lc,
                marker: {
                    fillColor: z(bb, 100), lineColor: z(cb, 100), radius: $a, symbol: ga(Za,
                        "spoke" == Xa)
                },
                color: f(c.drawmeanconnector, a.drawmeanconnector, 0) ? z(h(a.meanconnectorcolor, c.meanconnectorcolor, bb), f(a.meanconnectoralpha, c.meanconnectoralpha, 100)) : qa,
                lineWidth: f(c.drawmeanconnector, a.drawmeanconnector, 0) ? f(a.meanconnectorthickness, c.meanconnectorthickness, 1) : 0,
                shadow: 0,
                legendFillColor: d.legendFillColor
            };
            Yc = {
                type: "line",
                name: "SD",
                relatedSeries: "boxandwhisker",
                data: Sa,
                legendIndex: kc + 2 * jc,
                showInLegend: !!Tc && Tb && lc,
                marker: {
                    fillColor: z(ib, 100), lineColor: z(jb, 100), radius: fb, symbol: ga(hb,
                        "spoke" == db)
                },
                color: f(c.drawsdconnector, a.drawsdconnector, 0) ? z(h(a.sdconnectorcolor, c.sdconnectorcolor, ib), f(a.sdconnectoralpha, c.sdconnectoralpha, 100)) : qa,
                lineWidth: f(c.drawsdconnector, a.drawsdconnector, 0) ? f(a.sdconnectorthickness, c.sdconnectorthickness, 1) : 0,
                shadow: 0,
                pointStart: Lb,
                legendFillColor: d.legendFillColor
            };
            Zc = {
                type: "line",
                name: "MD",
                relatedSeries: "boxandwhisker",
                data: Ra,
                legendIndex: kc + 3 * jc,
                showInLegend: !!Sc && Tb && lc,
                marker: {
                    fillColor: z(mb, 100), lineColor: z(wb, 100), radius: ob, symbol: ga(pb, "spoke" ==
                        kb)
                },
                color: f(c.drawmdconnector, a.drawmdconnector, 0) ? z(h(a.mdconnectorcolor, c.mdconnectorcolor, mb), f(a.mdconnectoralpha, c.mdconnectoralpha, 100)) : qa,
                lineWidth: f(c.drawmdconnector, a.drawmdconnector, 0) ? f(a.mdconnectorthickness, c.mdconnectorthickness, 1) : 0,
                shadow: 0,
                pointStart: Lb,
                legendFillColor: d.legendFillColor
            };
            $c = {
                type: "line",
                name: "QD",
                relatedSeries: "boxandwhisker",
                data: Ta,
                legendIndex: kc + 4 * jc,
                showInLegend: !!Uc && Tb && lc,
                marker: {fillColor: z(tb, 100), lineColor: z(Db, 100), radius: ub, symbol: ga(vb, "spoke" == sb)},
                color: f(c.drawqdconnector, a.drawqdconnector, 0) ? z(h(a.qdconnectorcolor, c.qdconnectorcolor, tb), f(a.qdconnectoralpha, c.qdconnectoralpha, 100)) : qa,
                lineWidth: f(c.drawqdconnector, a.drawqdconnector, 0) ? f(a.qdconnectorthickness, c.qdconnectorthickness, 1) : 0,
                shadow: 0,
                pointStart: Lb,
                legendFillColor: d.legendFillColor
            };
            ad = {
                type: "line",
                name: "Outlier",
                relatedSeries: "boxandwhisker",
                showInLegend: !(!Va || !Va.length) && Tb && lc,
                data: Va,
                legendIndex: kc + 5 * jc,
                marker: {
                    fillColor: z(Rb, 100), lineColor: z(Sb, 100), radius: Nb, symbol: ga(Ob,
                        "spoke" == Eb)
                },
                color: qa,
                lineWidth: 0,
                shadow: 0,
                pointStart: Lb,
                legendFillColor: d.legendFillColor
            };
            e._meanDataArr.push(Xc);
            e._sdDataArr.push(Yc);
            e._mdDataArr.push(Zc);
            e._qdDataArr.push($c);
            e._outliers.push(ad);
            return d
        },
        series: function (b, d, a) {
            var c = d.series, e = d._meanDataArr = [], g = d._sdDataArr = [], f = d._mdDataArr = [], m = d._qdDataArr = [], v = d._outliers = [], l = d[ha], p = d.yAxis[0], k = 2 * l.plotSpacePercent, n, t, u, D, C;
            l.dataSeparator = h(d.chart.dataseparator, Ca);
            l.bwCalc = new Eb(b.chart.calculationmethod, l.numberFormatter,
                l.dataSeparator);
            r.multiseries.series.call(this, b, d, a);
            a = c && c.length;
            b = ab(e.length, g.length, f.length, m.length, v.length, a);
            k = (1 - k) / a;
            l = p.min;
            C = p.max;
            d.series = c.concat(e, g, f, m, v);
            for (p = 0; p < a; p += 1)for (t = c[p], n = p, !t.relatedSeries && (t.relatedSeries = []), u = 0; 5 > u; u += 1)n += a, t.relatedSeries.push(n);
            for (u = p = 0; u < b; u += 1, p += 1)if (c = (-.5 * (a - 1) + p) * k, e[p] && (e[p].pointStart = c), g[p] && (g[p].pointStart = c), m[p] && (m[p].pointStart = c), f[p] && (f[p].pointStart = c), v[p] && (v[p].pointStart = c), n = (c = v[p]) && c.data)for (c = 0; c < n.length; c +=
                1)t = n[c], D = t.y, t.y = D > C || D < l ? null : D;
            delete d._meanDataArr;
            delete d._sdDataArr;
            delete d._mdDataArr;
            delete d._qdDataArr;
            delete d._outliers
        },
        getTooltext: function (b, d, a, c, e, g, f, m, h, l, p, k, n, t, u, D) {
            d = this.numberFormatter;
            return db(b, [1, 2, 3, 4, 5, 6, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80], {
                maxValue: g,
                maxDataValue: d.dataLabels(g),
                minValue: f,
                minDataValue: d.dataLabels(f),
                Q1: d.dataLabels(m),
                unformattedQ1: m,
                Q3: d.dataLabels(h),
                unformattedQ3: h,
                median: d.dataLabels(l),
                unformattedMedian: l,
                SD: d.dataLabels(p),
                unformattedSD: p,
                QD: d.dataLabels(k),
                unformattedQD: k,
                MD: d.dataLabels(n),
                unformattedMD: n,
                mean: d.dataLabels(t),
                unformattedMean: t,
                label: G(u),
                yaxisName: G(a.yaxisname),
                xaxisName: G(a.xaxisname),
                formattedValue: d.dataLabels(D),
                value: D
            }, {value: D}, a, c)
        },
        pointHoverOptions: function (b, d, a, c) {
            var e = f(b.showhovereffect, d.showhovereffect, a.plothovereffect, a.showhovereffect), g = f(b.highlightonhover, d.highlightonhover, d.highlightplotonhover, a.highlightonhover, a.highlightplotonhover, e), q = {}, m = {}, v = {}, l = {}, p = {}, k = {}, n =
            {}, t = {}, u = {}, D;
            q.color = h(b.upperboxhovercolor, d.upperboxhovercolor, a.plotfillhovercolor, a.upperboxhovercolor);
            q.alpha = h(b.upperboxhoveralpha, d.upperboxhoveralpha, a.upperboxhoveralpha);
            n.color = h(b.upperboxborderhovercolor, d.upperboxborderhovercolor, a.upperboxborderhovercolor);
            n.alpha = h(b.upperboxborderhoveralpha, d.upperboxborderhoveralpha, a.upperboxborderhoveralpha);
            n.thickness = f(b.upperboxborderhoverthickness, d.upperboxborderhoverthickness, a.upperboxborderhoverthickness);
            m.color = h(b.lowerboxhovercolor,
                d.lowerboxhovercolor, a.plotfillhovercolor, a.lowerboxhovercolor);
            m.alpha = h(b.lowerboxhoveralpha, d.lowerboxhoveralpha, a.lowerboxhoveralpha);
            t.color = h(b.lowerboxborderhovercolor, d.lowerboxborderhovercolor, a.lowerboxborderhovercolor);
            t.alpha = h(b.lowerboxborderhoveralpha, d.lowerboxborderhoveralpha, a.lowerboxborderhoveralpha);
            t.thickness = f(b.lowerboxborderhoverthickness, d.lowerboxborderhoverthickness, a.lowerboxborderhoverthickness);
            p.color = h(b.upperwhiskerhovercolor, d.upperwhiskerhovercolor, a.upperwhiskerhovercolor);
            p.alpha = h(b.upperwhiskerhoveralpha, d.upperwhiskerhoveralpha, a.upperwhiskerhoveralpha);
            p.thickness = h(b.upperwhiskerhoverthickness, d.upperwhiskerhoverthickness, a.upperwhiskerhoverthickness);
            k.color = h(b.lowerwhiskerhovercolor, d.lowerwhiskerhovercolor, a.lowerwhiskerhovercolor);
            k.alpha = h(b.lowerwhiskerhoveralpha, d.lowerwhiskerhoveralpha, a.lowerwhiskerhoveralpha);
            k.thickness = h(b.lowerwhiskerhoverthickness, d.lowerwhiskerhoverthickness, a.lowerwhiskerhoverthickness);
            v.color = h(b.upperquartilehovercolor, d.upperquartilehovercolor,
                a.upperquartilehovercolor);
            v.alpha = h(b.upperquartilehoveralpha, d.upperquartilehoveralpha, a.upperquartilehoveralpha);
            v.thickness = h(b.upperquartilehoverthickness, d.upperquartilehoverthickness, a.upperquartilehoverthickness);
            l.color = h(b.lowerquartilehovercolor, d.lowerquartilehovercolor, a.lowerquartilehovercolor);
            l.alpha = h(b.lowerquartilehoveralpha, d.lowerquartilehoveralpha, a.lowerquartilehoveralpha);
            l.thickness = h(b.lowerquartilehoverthickness, d.lowerquartilehoverthickness, a.lowerquartilehoverthickness);
            u.color = h(b.medianhovercolor, d.medianhovercolor, a.medianhovercolor);
            u.alpha = h(b.medianhoveralpha, d.medianhoveralpha, a.medianhoveralpha);
            u.thickness = h(b.medianhoverthickness, d.medianhoverthickness, a.medianhoverthickness);
            b = !!h(q.color, q.alpha, n.color, n.alpha, n.thickness, m.color, m.alpha, t.color, t.thickness, t.alpha, p.color, p.alpha, p.thickness, k.color, k.alpha, k.thickness, v.color, v.alpha, v.thickness, l.color, l.alpha, l.thickness, u.color, u.alpha, u.thickness, g);
            void 0 === e && void 0 === g && b && (g = 0);
            if (void 0 ===
                e && b || e)D = !0, q.color = h(q.color, g ? Q(c.upperBoxColor, 70) : c.upperBoxColor), q.alpha = h(q.alpha, c.upperBoxAlpha), m.color = h(m.color, g ? Q(c.lowerBoxColor, 70) : c.lowerBoxColor), m.alpha = h(m.alpha, c.lowerBoxAlpha), n.color = h(n.color, c.upperBoxBorderColor), n.alpha = f(n.alpha, c.upperBoxBorderAlpha), n.stroke = z(n.color, n.alpha), n["stroke-width"] = f(n.thickness, c.upperBoxBorderThickness), delete n.color, delete n.alpha, delete n.thickness, t.color = h(t.color, c.lowerBoxBorderColor), t.alpha = h(t.alpha, c.lowerBoxBorderAlpha),
                t.stroke = z(t.color, t.alpha), t["stroke-width"] = f(t.thickness, c.lowerBoxBorderThickness), delete t.color, delete t.alpha, delete t.thickness, p.color = h(p.color, c.upperWhiskerColor, 70), p.alpha = h(p.alpha, c.upperWhiskerAlpha), p.stroke = z(p.color, p.alpha), p["stroke-width"] = h(p.thickness, c.upperWhiskerThickness), delete p.color, delete p.alpha, delete p.thickness, k.color = h(k.color, c.lowerWhiskerColor, 70), k.alpha = h(k.alpha, c.lowerWhiskerAlpha), k.stroke = z(k.color, k.alpha), k["stroke-width"] = h(k.thickness, c.lowerWhiskerThickness),
                delete k.color, delete k.alpha, delete k.thickness, v.color = h(v.color, c.upperQuartileColor, 70), v.alpha = h(v.alpha, c.upperQuartileAlpha), v.stroke = z(v.color, v.alpha), v["stroke-width"] = h(v.thickness, c.upperQuartileThickness), delete v.color, delete v.alpha, delete v.thickness, l.color = h(l.color, c.lowerQuartileColor, 70), l.alpha = h(l.alpha, c.lowerQuartileAlpha), l.stroke = z(l.color, l.alpha), l["stroke-width"] = h(l.thickness, c.lowerQuartileThickness), delete l.color, delete l.alpha, delete l.thickness, u.color = h(u.color,
                c.medianColor, 70), u.alpha = h(u.alpha, c.medianAlpha), u.stroke = z(u.color, u.alpha), u["stroke-width"] = h(u.thickness, c.medianThickness), delete u.color, delete u.alpha, delete u.thickness;
            return {
                enabled: D,
                upperBox: q,
                upperBoxBorder: n,
                lowerBox: m,
                lowerBoxBorder: t,
                upperQuartile: v,
                lowerQuartile: l,
                upperWhisker: p,
                lowerWhisker: k,
                median: u
            }
        },
        getPointStub: function (b, d, a, c, e, g, q, m, v, l, p, k, n, t) {
            var u = B, u = b[ha], D = u.tooltipSepChar, C = this.numberFormatter, x = f(c.showvalue, a.showvalues, d.showvalues, 1), y = {
                "true": C.dataLabels(e),
                "false": B
            }, N = {"true": C.dataLabels(g), "false": B}, w = {
                "true": C.dataLabels(q),
                "false": B
            }, r = {"true": C.dataLabels(m), "false": B}, C = {"true": C.dataLabels(v), "false": B};
            u.showTooltip ? (u = E(G(h(c.tooltext, a.plottooltext, u.tooltext))), u = void 0 !== u ? this.getTooltext(u, b, d, a, c, e, v, m, g, q, k, n, p, l, t) : "<b>Maximum" + D + "</b>" + y[!0] + "<br/><b>Q3" + D + "</b>" + N[!0] + "<br/><b>Median" + D + "</b>" + w[!0] + "<br/><b>Q1" + D + "</b>" + r[!0] + "<br/><b>Minimum" + D + "</b>" + C[!0]) : u = B;
            return {
                toolText: u,
                link: h(c.link),
                categoryLabel: t,
                displayValueMax: y[!(!x || !f(c.showmaxvalue, a.showmaxvalues, d.showmaxvalues, 1))],
                displayValueMid: w[!(!x || !f(c.showmedianvalue, a.showmedianvalues, d.showmedianvalues, 1))],
                displayValueMin: C[!(!x || !f(c.showminvalue, a.showminvalues, d.showminvalues, 1))],
                displayValueQ3: N[!(!x || !f(c.showq3value, a.showq3values, d.showq3values, 0))],
                displayValueQ1: r[!(!x || !f(c.showq1value, a.showq1values, d.showq1values, 0))]
            }
        }
    }, r.multiseries);
    r("heatmap", {
        friendlyName: "Heatmap Chart",
        standaloneInit: !0,
        creditLabel: ra,
        defaultSeriesType: "heatmap",
        tooltipsepchar: ": ",
        tooltipConstraint: "chart",
        rendererId: "heatmap",
        series: function (b, d, a) {
            var c = b.chart, e = d.chart, g = d[ha], q = this.colorManager, m = d.series, v = this.numberFormatter, l = b.rows && b.rows.row, p = l && l.length, k = b.columns && b.columns.column, n = k && k.length, t = b.dataset, u = t && t.data, D = b.colorrange || {}, C = g.mapByPercent = f(D.mapbypercent, 0), x = g.mapByCategory = f(c.mapbycategory, 0), D = !x && f(D.gradient, 0), y = h(c.plotfillalpha, 100), N = f(c.showlabels, c.showlabel, 1), r = f(c.showplotborder, 1), A = r ? f(c.plotborderthickness, 1) : 0, q = h(c.plotbordercolor,
                q.getColor("plotBorderColor")), r = h(c.plotborderalpha, r ? 95 : 0).toString(), q = z(q, r), r = f(c.plotborderdashed, 0), H = f(c.plotborderdashlen, 5), u = f(c.plotborderdashgap, 4), H = r ? ta(H, u, A) : "none", F = w.colorRange, la = 0, K = 0, I = 0, na = 0, Na = g.rowIdObj = {}, O = g.columnIdObj = {}, T = [], r = [], W = 0, X = [], M, J, R, ya, U, S, da, ba, Y;
            e.showHoverEffect = f(c.showhovereffect, 1);
            D && (d.legend.type = "gradient");
            d.legend.enabled = Boolean(f(c.showlegend, 1));
            for (e = 0; e < p; e += 1)J = l[e], M = J.id, ca(M) && M !== B && (la += 1, Na[M.toLowerCase()] = {
                index: la, label: f(J.showlabel,
                    c.showyaxislabels, c.showyaxisnames, N) ? h(J.label, J.name, M) : B
            });
            for (e = 0; e < n; e += 1)R = k[e], l = R.id, ca(l) && l !== B && (O[l.toLowerCase()] = {
                index: K,
                label: f(R.showlabel, c.showxaxislabels, c.showxaxisnames, N) ? h(R.label, R.name, l) : B
            }, K += 1);
            da = 0;
            for (ba = t && t.length; da < ba; da += 1)for (u = t[da] && t[da].data, e = 0, Y = u && u.length; e < Y; e += 1)if (k = u[e], S = v.getCleanValue(k.value), null !== S || x)M = E(k.rowid, k.rowids), J = E(M, B).toLowerCase(), l = E(k.columnid, k.columnids), R = E(l, B).toLowerCase(), T.push(S), ca(U) || ca(ya) || !ca(S) || (ya = U = S), U > S &&
            (U = S), ya < S && (ya = S), !ca(J) || ca(Na[J]) || p || (I += 1, Na[J] = {
                index: I,
                label: M
            }), !ca(R) || ca(O[R]) || n || (O[R] = {
                index: na,
                label: l
            }, na += 1), J = Na[J], R = O[R], J && R && (ca(X[J.index]) || (X[J.index] = []), X[J.index][R.index] ? r[X[J.index][R.index] - 1] = {
                rowId: M,
                columnId: l,
                categoryId: h(k.colorrangelabel, k.categoryid, k.categoryname, k.category),
                tlLabel: G(h(k.tllabel, k.ltlabel)),
                trLabel: G(h(k.trlabel, k.rtlabel)),
                blLabel: G(h(k.bllabel, k.lblabel)),
                brLabel: G(h(k.brlabel, k.rblabel)),
                rowLabel: J.label,
                columnLabel: R.label,
                setColor: k.color,
                setAlpha: h(k.alpha, y),
                setShowLabel: f(k.showlabel, k.showname, N),
                colorRangeLabel: k.colorrangelabel,
                displayValue: k.displayvalue,
                tooltext: k.tooltext,
                showvalue: k.showvalue,
                link: k.link,
                hoverColor: h(k.hovercolor, c.hovercolor, c.plotfillhovercolor),
                hoverAlpha: f(k.hoveralpha, c.hoveralpha, c.plotfillhoveralpha),
                index: W,
                value: S,
                y: J.index,
                x: R.index,
                _value: k.value,
                _cleanValue: S
            } : (W += 1, r.push({
                rowId: M,
                columnId: l,
                categoryId: h(k.colorrangelabel, k.categoryid, k.categoryname, k.category),
                tlLabel: G(h(k.tllabel, k.ltlabel)),
                trLabel: G(h(k.trlabel, k.rtlabel)),
                blLabel: G(h(k.bllabel, k.lblabel)),
                brLabel: G(h(k.brlabel, k.rblabel)),
                rowLabel: J.label,
                columnLabel: R.label,
                setColor: k.color && k.color.replace(jb, Oa),
                setAlpha: h(k.alpha, y),
                setShowLabel: f(k.showlabel, k.showname, N),
                colorRangeLabel: k.colorrangelabel,
                displayValue: k.displayvalue,
                tooltext: k.tooltext,
                showvalue: k.showvalue,
                link: k.link,
                hoverColor: h(k.hovercolor, c.hovercolor, c.plotfillhovercolor),
                hoverAlpha: f(k.hoveralpha, c.hoveralpha, c.plotfillhoveralpha),
                index: W,
                value: S,
                y: J.index,
                x: R.index,
                _value: k.value,
                _cleanValue: S
            }), X[J.index][R.index] = W));
            if (r.length) {
                g.rowCount = la = ab(la, I);
                g.columnCount = ab(K, na);
                for (e in Na)Na[e].index = la - Na[e].index + 1;
                g.minHeatValue = U;
                g.maxHeatValue = ya;
                p = ya - U;
                C = C && !x;
                d.colorRange = new F({
                    colorRange: b.colorrange,
                    dataMin: U,
                    dataMax: ya,
                    sortLegend: f(c.autoorderlegendicon, c.autoorderlegendicon, 0),
                    mapByCategory: x,
                    defaultColor: "cccccc",
                    numberFormatter: v
                });
                if (D)m.push({
                    data: [],
                    hoverEffects: this.parseSeriesHoverOptions(b, d, t, a),
                    borderWidth: A,
                    borderColor: q,
                    dashStyle: H
                });
                else for (v = (c = d.colorRange.colorArr) && c.length, e = 0; e < v; e += 1)ya = c[e], ca(ya.code) && m.push({
                    data: [],
                    hoverEffects: this.parseSeriesHoverOptions(b, d, t, a),
                    name: h(ya.label, ya.name),
                    borderWidth: A,
                    borderColor: q,
                    color: Cb(ya.code),
                    dashStyle: H
                });
                m.length || m.push({data: [], showInLegend: !1});
                for (e = 0; e < r.length; e += 1)k = r[e], C && (k.value = L((k.value - U) / p * 1E4) / 100), a = d.colorRange.getColorObj(x ? k.categoryId : k.value), a.outOfRange || (k.y = g.rowCount - k.y + 1, k.color = z(h(k.setColor, a.code), h(k.setAlpha, y)), k.hoverColor = z(h(k.hoverColor,
                    k.setColor, a.code), f(k.hoverAlpha, 25)), k = P(k, this.getPointStub(k, k.value, B, d, b)), D ? m[0].data.push(k) : m[a.seriesIndex] && m[a.seriesIndex].data.push(k))
            } else d.series = [];
            this.configureAxis(d, b)
        },
        getPointStub: function (b, d, a, c, e) {
            a = c[ha];
            var g = e.chart, q = a.tooltipSepChar, m = a.mapByCategory;
            e = a.mapByPercent && !m;
            var v = this.numberFormatter, l = b._cleanValue;
            c = v.percentValue(d);
            var p = null === l ? d : v.dataLabels(l), k = E(G(h(b.tooltext, a.tooltext))), n = E(G(b.displayValue)), t = m ? n : h(n, p), u = f(b.showvalue, a.showValues), D =
                E(g.tltype, B), C = E(g.trtype, B), x = E(g.bltype, B), y = E(g.brtype, B);
            d = b.tlLabel;
            var m = b.trLabel, v = b.blLabel, l = b.brLabel, N;
            D !== B && (D = "<b>" + D + q + "</b>");
            C !== B && (C = "<b>" + C + q + "</b>");
            x !== B && (x = "<b>" + x + q + "</b>");
            y !== B && (y = "<b>" + y + q + "</b>");
            a = a.showTooltip ? void 0 !== k ? db(k, [1, 2, 5, 6, 7, 14, 93, 94, 95, 96, 97, 98, 112, 113, 114, 115, 116, 117], {
                formattedValue: p,
                percentValue: e ? c : B,
                yaxisName: G(g.yaxisname),
                xaxisName: G(g.xaxisname)
            }, {
                value: b._value,
                displayvalue: b.displayValue
            }, g, b) : t === B ? !1 : (e ? "<b>Value" + q + "</b>" + p + "<br/><b>Percentage" +
            q + "</b>" + c : t) + (b.tlLabel !== B ? "<br/>" + (D + b.tlLabel) : B) + (b.trLabel !== B ? "<br/>" + C + b.trLabel : B) + (b.blLabel !== B ? "<br/>" + x + b.blLabel : B) + (b.brLabel !== B ? "<br/>" + y + b.brLabel : B) : B;
            u ? N = void 0 !== n ? n : e ? c : p : d = m = v = l = N = B;
            e = h(n, e ? c : p, B);
            b = h(b.link);
            return {
                displayValue: N,
                displayValueArgs: e,
                toolText: a,
                link: b,
                tlLabel: d,
                trLabel: m,
                blLabel: v,
                brLabel: l
            }
        },
        configureAxis: function (b, d) {
            var a = b[ha], c = d.chart, e = b.yAxis[0], g = b.xAxis, q = a.rowCount, m = a.columnCount, v = a.axisGridManager, l = a.rowIdObj, p = a.columnIdObj, k = this.colorManager,
                n = z(h(c.vdivlinecolor, c.divlinecolor, k.getColor("divLineColor")), f(c.vdivlinealpha, c.divlinealpha, k.getColor("divLineAlpha"))), t = f(c.vdivlinethickness, c.divlinethickness, 1), u = f(c.vdivlinedashed, c.vdivlineisdashed, c.divlinedashed, c.divlineisdashed, 0) ? ta(f(c.vdivlinedashlen, c.divlinedashlen, 4), f(c.vdivlinedashgap, c.divlinedashgap, 2), t) : "none", D = z(h(c.hdivlinecolor, c.divlinecolor, k.getColor("divLineColor")), f(c.hdivlinealpha, c.divlinealpha, k.getColor("divLineAlpha"))), C = f(c.hdivlinethickness, c.divlinethickness,
                1), x = f(c.hdivlinedashed, c.hdivlineisdashed, c.divlinedashed, c.divlineisdashed, 0) ? ta(f(c.hdivlinedashlen, c.divlinedashlen, 4), f(c.hdivlinedashgap, c.divlinedashgap, 2), t) : "none", y, N;
            e.min = 0;
            e.max = q;
            for (N in l)y = l[N], k = y.index, y = y.label, v.addAxisGridLine(e, k + -.5, y, .1, void 0, qa, 1), k < q && e.plotBands.push({
                isTrend: !0,
                color: D,
                value: k,
                width: C,
                dashStyle: x,
                zIndex: 3
            });
            e.labels.enabled = !1;
            e.gridLineWidth = 0;
            e.alternateGridColor = qa;
            e.title.text = G(c.yaxisname);
            g.min = -.5;
            g.max = e = m + -.5;
            g.opposite = f(c.placexaxislabelsontop,
                0);
            a.x.catCount = m;
            for (N in p)a = p[N], k = a.index, y = a.label, v.addXaxisCat(g, k, 1, y, a, {}, c), k -= -.5, k < e && g.plotBands.push({
                isTrend: !0,
                color: n,
                value: k,
                width: t,
                dashStyle: u,
                zIndex: 3
            });
            g.labels.enabled = !1;
            g.gridLineWidth = 0;
            g.alternateGridColor = qa;
            g.title.text = G(c.xaxisname)
        },
        xAxisMinMaxSetter: function () {
        },
        placeLegendBlockRight: function () {
            return "gradient" === arguments[0].legend.type ? w.placeGLegendBlockRight ? w.placeGLegendBlockRight.apply(this, arguments) : 0 : w.placeLegendBlockRight.apply(this, arguments)
        },
        placeLegendBlockBottom: function () {
            return "gradient" ===
            arguments[0].legend.type ? w.placeGLegendBlockBottom ? w.placeGLegendBlockBottom.apply(this, arguments) : 0 : w.placeLegendBlockBottom.apply(this, arguments)
        }
    }, r.column2dbase);
    r("renderer.multiaxisline", {
        legendClick: function (b, d, a) {
            var c = this.options.series, e = this.yAxis[c[b.index].yAxis], g = e.axisData._relatedSeries, f = g.length, m = !1;
            r["renderer.cartesian"].legendClick.call(this, b, d, a);
            if (!a) {
                for (; f-- && !(m = c[g[f]].visible););
                e.checkBox.element.checked = m
            }
        }
    }, r["renderer.cartesian"]);
    r("renderer.candlestick", {
            drawPlotCandlestickbar: function (b,
                                              d) {
                var a = b.data, c = a.length, e = b.items, g = b.graphics = [], q = this.paper, m = this.layers, h = this.definition.chart, l = this.options.plotOptions.series, p = this.xAxis[d.xAxis || 0], k = this.yAxis[d.yAxis || 0], n = d.numColumns || 1, t = d.columnPosition || 0, u = !1 === d.visible ? "hidden" : "visible", D = p.getAxisPosition(0), D = p.getAxisPosition(1) - D, C = l.groupPadding, x = l.maxColWidth, h = (1 - .01 * (h && h.plotspacepercent)) * D || H(D * (1 - 2 * C), x * n), n = h / n * t - h / 2, y, N, w, r, B, C = m.dataset = m.dataset || q.group("dataset-orphan");
                C.column = C.column || q.group("columns",
                        C);
                for (m = 0; m < c; m += 1) {
                    t = a[m];
                    D = t.y;
                    y = null;
                    if (null === D) {
                        if (x = e[m])y = x.graphic, y.attr({height: 0})
                    } else x = f(t.x, m), h = t.link, x = p.getAxisPosition(x), y = t.previousY, N = k.getAxisPosition(y), y = k.getAxisPosition(D), w = k.getAxisPosition(t.high), r = k.getAxisPosition(t.low), ua(y - N), B = n, N = ["M", x, r, "L", x, w, "M", x, y, "L", x + B, y, "M", x, N, "L", x - B, N], (x = e[m]) || (x = e[m] = {
                        index: m,
                        value: D,
                        graphic: q.path(N, C),
                        dataLabel: null,
                        tracker: null
                    }), y = x.graphic, y.attr({
                        path: N,
                        fill: pa(t.color),
                        stroke: pa(t.borderColor),
                        "stroke-width": t.borderWidth,
                        "stroke-dasharray": t.dashStyle,
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "shape-rendering": "crisp",
                        cursor: h ? "pointer" : "",
                        visibility: u
                    }).shadow(l.shadow || t.shadow), this.drawTracker && this.drawTracker.call(this, b, d, m);
                    y && g.push(y);
                    this.drawTracker && this.drawTracker.call(this, b, d, m)
                }
                b.visible = !1 !== d.visible;
                return b
            }, drawCanvas: function () {
                r["renderer.cartesian"].drawCanvas.call(this, arguments);
                if (this.options.subCharts && this.options.subCharts[0]) {
                    var b = this.options, b = (b.subCharts && b.subCharts[0]).chart ||
                        {}, d = this.paper, a = this.elements, c = a.volumeCanvas, e = b.marginTop + b.top, g = b.left = b.marginLeft, q = b.width - b.marginLeft - b.marginRight, m = b.height - b.marginBottom, h = f(b.plotBorderRadius, 0), l = b.plotBorderWidth, p = b.plotBackgroundColor, k = .5 * l, n = b.plotBorderColor, t = this.layers.canvas;
                    c || (a.volumeCanvas = d.rect(g - k, e - k - 1, q + l, m + l, h, t).attr({
                        fill: pa(p),
                        "stroke-width": l,
                        stroke: n,
                        "stroke-linejoin": 2 < l ? "round" : "miter",
                        "shape-rendering": "crisp"
                    }).shadow(b.plotShadow).crisp())
                }
            }, drawTracker: function (b, d, a) {
                var c = this,
                    e = c.paper, g = c.xAxis[0], q = b.data[a], m = c.yAxis[0].getAxisPosition(q.y), h = g.getAxisPosition(f(q.x, a));
                b = b.items[a];
                a = aa ? 40 : 20;
                var l = c.layers.tracker, p = c.definition.chart, k = c.options.plotOptions.series, n = g.getAxisPosition(0), g = g.getAxisPosition(1) - n, n = k.groupPadding, k = k.maxColWidth, t = ((1 - .01 * (p && p.plotspacepercent)) * g || H(g * (1 - 2 * n), 1 * k)) / 1, u = .5 * -t, p = c.elements, g = p.canvas.getBBox(), k = p.volumeCanvas && p.volumeCanvas.getBBox(), n = p.rollOverBand, D = b && b.tracker, t = {
                    "stroke-width": t, ishot: !0, stroke: pa(c.options.chart.rollOverBandColor),
                    fill: pa(c.options.chart.rollOverBandColor), visibility: "hidden"
                };
                k && D && !d.doNotUseBand && (D || (D = b.tracker = e.circle(h, m, a, l).attr({
                    "stroke-width": 0,
                    fill: Ba
                })), D.data("x", h), q.toolText && D.tooltip(q.toolText), n || (n = p.rollOverBand = e.path(["M", 0, g.y, "L", 0, g.y2, "M", 0, k.y, "L", 0, k.y2]).attr(t), c.layers.dataset.appendChild(n), n.toBack()), D.mouseover(function () {
                    c.rollOver(c, this, u)
                }).mouseout(function () {
                    c.rollOut(c)
                }))
            }, rollOver: function (b, d) {
                b.elements.rollOverBand.transform("t" + d.data("x") + ",0").show()
            }, rollOut: function (b) {
                b.elements.rollOverBand.hide()
            }
        },
        r["renderer.cartesian"]);
    r("renderer.spline", {
        getSplinePath: function (b, d, a) {
            var c = function (a, b, c, d) {
                b = (d - b) / ec((c - a) * (c - a) + (d - b) * (d - b));
                b = ua(.5 * b);
                return a * b + c * (1 - b)
            }, e = function (a, b, c, d) {
                var e = a.length, g = a[e - 1], f = g.length, k = g[0], g = g[f - 2];
                3 > f || ("R" !== k && "C" !== k || 3 !== f || (a[e - 1][0] = "L"), b && a.push(["L", g, d, c, d, "Z"]))
            }, g = /area/ig.test(this.logic.defaultSeriesType), f = this.options.chart.minimizeTendency, m = [null], h = [], l = [], p = d.max, k = d.min;
            d = d.getAxisPosition(0 < p && 0 < k ? k : 0 > p && 0 > k ? p : 0);
            var n, t, u, D, C, x, y, N, w,
                r, B, F, A, K, z;
            K = 0;
            for (z = b.length; K < z; K += 1)if (N = b[K], u = b[K - 1] || {}, D = b[K + 1] || {}, k = N.x, p = N.y, n = u.x, u = u.y, C = D.x, D = D.y, x = N.lastYPos, y = N.lastXPos, r = h.length, N = l.length, f)if (null !== x)if (t = F, K === b.length - 1) {
                x = m[K - B - 1];
                N = C = (k + n) / 2;
                r = (N - n) * x + u;
                if (u > p && r < p || u < p && r > p)r = p, N = (r - u) / x + n;
                F.push(N, r, C, (p + u) / 2, k, p);
                h.push(F);
                l.push(F);
                g && e(h, !0, A, d);
                g && e(l, !1)
            } else {
                x = m[K - B - 1];
                if (u > p && D >= p || u < p && D <= p)if (w = 0, C = c(n, u, k, p), D = p, 1 !== K - B) {
                    N = C;
                    r = (N - n) * x + u;
                    if (u > p && r < p || u < p && r > p)r = p, N = (r - u) / x + n;
                    F.push(N, r, C, D, k, p)
                } else F.push((k +
                    n) / 2, (p + u) / 2, C, D, k, p); else if (u === p)w = 0, F.push(n, u, k, p, k, p); else if (u > p && p > D || u < p && p < D) {
                    w = (D - u) / (C - n);
                    C = c(n, u, k, p);
                    D = (C - k) * w + p;
                    if (u > p && D > u || u < p && D < u)D = u, C = (D - p) / w + k;
                    if (1 !== K - B) {
                        N = C;
                        r = (N - n) * x + u;
                        if (u > p && r < p || u < p && r > p)r = p, N = (r - u) / x + n;
                        F.push(N, r, C, D, k, p)
                    } else F.push((k + n) / 2, (p + u) / 2, C, D, k, p)
                }
                m.push(w)
            } else null === x && 0 !== K ? (t || (t = []), "C" === t[0] && (h.push(F), l.push(F), g && e(h, !0, A, d), g && e(l, !1)), h.push(["M", k, p]), l.push(["M", k, p]), A = k, F = ["C"], B = K, m = [null]) : (h.push(["M", k, p]), l.push(["M", k, p]), A = k, F = ["C"],
                B = K); else null !== x ? 2 <= r ? ("M" === h[r - 1][0] && h.push(["R"]), "M" === l[N - 1][0] && l.push(["R"]), r = h.length, N = l.length, t = h[r - 1], n = t.length, h[r - 1].push(k), h[r - 1].push(p), l[N - 1].push(k), l[N - 1].push(p), K === a - 1 && "R" === t[0] && (e(h, !0, A, d), e(l, !1))) : (h.push(["M", y, x]), h.push(["R", k, p]), l.push(["M", y, x]), l.push(["R", k, p]), A = y) : null === x && 2 <= r && (t = h[r - 1], "R" === t[0] && (e(h, !0, A, d), e(l, !1)), h.push(["M", k, p]), l.push(["M", k, p]), A = k);
            t = h[h.length - 1];
            g && t && (n = t.length, "Z" === t[n - 1] || "R" !== t[0] && "C" !== t[0] || (e(h, !0, A, d), e(l,
                !1)));
            g || (h = f ? h : l, 2 <= h.length && e(h, !1));
            return {closedPath: h, openPath: l}
        }, drawPlotSpline: function (b, d) {
            var a = this, c = [], c = [], e = a.paper, g = a.elements, h = a.options, m = h.chart, v = h.plotOptions.series, l = v.dataLabels && v.dataLabels.style || {}, p = {
                fontFamily: l.fontFamily,
                fontSize: l.fontSize,
                lineHeight: l.lineHeight,
                fontWeight: l.fontWeight,
                fontStyle: l.fontStyle
            }, k = b.items, n = b.graphics = b.graphics || [], t = a.xAxis[d.xAxis || 0], u = a.yAxis[d.yAxis || 0], D = b.data, l = [], C = [], x = !1 === d.visible, y = x ? "hidden" : "visible", w = isNaN(+v.animation) &&
                v.animation.duration || 1E3 * v.animation, r = !1 !== (h.tooltip || {}).enabled, B = a.chartWidth, A = a.chartHeight, h = function () {
                Z.attr({"clip-rect": null});
                ja.show();
                fa.show();
                ca.show();
                W.attr({transform: "...t" + -B + "," + -A})
            }, F, la, K = v.connectNullData, z, E, H, L, T, G, X = null, M, J = d.lineWidth, R, I, U, S, da, ba, Y, P = a.layers, O = P.dataset = P.dataset || e.group("dataset-orphan"), W = P.datalabels = P.datalabels || e.group("datalables"), P = P.tracker, m = m.anchorTrackingRadius, fa, ca, Z, ja, ma, Q, va, ga = function (c, e, g, f, k, h, m) {
                return function () {
                    (ma = g.dataLabel =
                        a.drawPlotLineLabel(b, d, m, c, e)) && n.push(ma)
                }
            }, ha = function (b) {
                Da.call(this, a, b)
            }, aa = function (b, c) {
                return function (d) {
                    a.hoverPlotAnchor(this, d, c, b, a)
                }
            };
            a.addCSSDefinition(".fusioncharts-datalabels .fusioncharts-label", p);
            W.insertAfter(O);
            W.attr({"class": "fusioncharts-datalabels", transform: "...t" + B + "," + A});
            w && a.animationCompleteQueue.push({fn: h, scope: a});
            p = O.line || (O.line = e.group("line-connector", O));
            fa = e.group("connector-shadow", p);
            ca = e.group("anchor-shadow", p);
            Z = e.group("connector", p);
            ja = e.group("anchors",
                p);
            ja.hide();
            fa.hide();
            ca.hide();
            F = 0;
            for (la = D.length; F < la; F += 1)if (z = D[F], H = z.y, S = Q = ma = null, null === H)0 === K && (X = null); else {
                p = k[F] = {chart: a, index: F, value: H};
                E = f(z.x, F);
                L = z.link;
                T = z.tooltext || z.toolText;
                M = u.getAxisPosition(H);
                E = t.getAxisPosition(E);
                c.push({x: E, y: M, lastXPos: G, lastYPos: X});
                if ((R = z.marker) && R.enabled)if (I = R.radius, ba = R.shadow, U = R.symbol.split("_"), X = {
                        index: F,
                        link: L,
                        value: H,
                        displayValue: z.displayValueArgs,
                        categoryLabel: z.categoryLabel,
                        toolText: z.toolText,
                        id: b.userID,
                        datasetIndex: b.index,
                        datasetName: b.name,
                        visible: b.visible
                    }, H = Y = {}, G = z.rolloverProperties, R.imageUrl)Q = new Va.Image, L = {
                    isTooltip: r,
                    setLink: L,
                    hotLayer: P
                }, Q.onload = a.onAnchorImageLoad(this, b, d, E, M, R, p, X, T, G, F, ja, L), Q.onerror = ga(E, M, p, F), Q.src = R.imageUrl; else {
                    G && (H = {
                        polypath: [U[1] || 2, E, M, R.radius, R.startAngle, 0],
                        fill: pa(R.fillColor),
                        "stroke-width": R.lineWidth,
                        stroke: pa(R.lineColor)
                    }, Y = {
                        polypath: [G.sides || 2, E, M, G.radius, G.startAngle, G.dip],
                        fill: pa(G.fillColor),
                        "stroke-width": G.lineWidth,
                        stroke: pa(G.lineColor)
                    });
                    S = p.graphic =
                        e.polypath(U[1] || 2, E, M, R.radius, R.startAngle, 0, ja).attr({
                            fill: pa(R.fillColor),
                            "stroke-width": R.lineWidth,
                            stroke: pa(R.lineColor),
                            cursor: L ? "pointer" : "",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            ishot: !0,
                            visibility: 0 === I ? "hidden" : y
                        }).data("alwaysInvisible", 0 === I).data("setRolloverProperties", G).data("setRolloverAttr", Y).data("setRolloutAttr", H).data("anchorRadius", I).data("anchorHoverRadius", G && G.radius).shadow(ba || !1, ca);
                    if (L || r || G)I = ab(I, G && G.radius || 0, m), Q = e.polypath(U[1] || 2, E, M, I, R.startAngle,
                        0, P).attr({
                        cursor: L ? "pointer" : "",
                        stroke: Ba,
                        "stroke-width": 0,
                        ishot: !0,
                        fill: Ba,
                        visibility: y
                    });
                    va = Q || S;
                    va.click(ha);
                    (Q || S).data("eventArgs", X).hover(aa(p, "DataPlotRollOver"), aa(p, "DataPlotRollOut")).tooltip(T)
                }
                S && n.push(S);
                va && n.push(va);
                G = E;
                X = M;
                T = z.color;
                L = z.dashStyle;
                C.push(S);
                p.dataLabel = ma;
                p.tracker = va;
                R && R.imageUrl || (ma = a.drawPlotLineLabel(b, d, F, E, M));
                ma && n.push(ma);
                a.drawTracker && a.drawTracker.call(a, b, d, F)
            }
            c = a.getSplinePath(c, u).closedPath;
            2 <= c.length && (da = b.graphic = e.path(c, Z).attr({
                "stroke-dasharray": L,
                "stroke-width": J, stroke: pa(T), "stroke-linecap": "round", "stroke-linejoin": "round", visibility: y
            }).shadow(v.shadow && z.shadow, fa), l.push(da), O.shadow(v.shadow || z.shadow));
            w ? Z.attr({"clip-rect": g["clip-canvas-init"]}).animate({"clip-rect": g["clip-canvas"]}, w, "normal", a.getAnimationCompleteFn()) : (h && h(), h = void 0);
            da && n.push(da);
            b.visible = !x;
            return b
        }, drawPlotAreaspline: function (b, d) {
            var a = this, c = [], c = [], e = a.paper, g = a.layers, h = a.options, m = h.chart, v = a.elements, l = h.plotOptions.series, p = l.dataLabels && l.dataLabels.style ||
                    {}, k = {
                    fontFamily: p.fontFamily,
                    fontSize: p.fontSize,
                    lineHeight: p.lineHeight,
                    fontWeight: p.fontWeight,
                    fontStyle: p.fontStyle
                }, n = a.xAxis[d.xAxis || 0], t = a.yAxis[d.yAxis || 0], u = b.data, D = (p = !1 === d.visible) ? "hidden" : "visible", C = isNaN(+l.animation) && l.animation.duration || 1E3 * l.animation, x = "0" === a.definition.chart.drawfullareaborder, h = !1 !== (h.tooltip || {}).enabled, y, w, r, B, A = b.items, F = b.graphics = b.graphics || [], z = null, K, E = g.tracker, H = g.dataset = g.dataset || e.group("dataset-orphan"), G = g.datalabels = g.datalabels || e.group("datalabels").insertAfter(H),
                L = m.anchorTrackingRadius, T = a.chartWidth, I = a.chartHeight, g = function () {
                    R.attr({"clip-rect": null});
                    J.show();
                    M.show();
                    G.attr({transform: "...t" + -T + "," + -I})
                }, X, M, J, R, P, U, S = [], da, ba, Y, O, W, ca, fa, Z, Q, ja, S = function (c, e, g, f) {
                    return function () {
                        (O = g.dataLabel = a.drawPlotLineLabel(b, d, f, c, e)) && F.push(O)
                    }
                }, ma = function (b) {
                    Da.call(this, a, b)
                }, ga = function (b, c) {
                    return function (d) {
                        a.hoverPlotAnchor(this, d, c, b, a)
                    }
                };
            R = H.area = H.area || e.group("area", H);
            X = H.line || (H.line = e.group("line-connector", H));
            e.group("connector-shadow",
                X);
            M = e.group("anchor-shadow", X);
            m = e.group("area-connector", X);
            J = e.group("area-anchors", X);
            J.hide();
            M.hide();
            a.addCSSDefinition(".fusioncharts-datalabels .fusioncharts-label", k);
            G.insertAfter(H);
            G.attr({"class": "fusioncharts-datalabels", transform: "...t" + T + "," + I});
            C && a.animationCompleteQueue.push({fn: g, scope: a});
            H = 0;
            for (X = u.length; H < X; H += 1)if (y = u[H], r = y.y, ba = Y = O = null, null === r)0 === l.connectNullData && (z = null); else {
                Q = A[H] = {chart: a, index: H, value: r};
                w = f(y.x, H);
                B = y.link;
                k = y.tooltext || y.toolText;
                w = n.getAxisPosition(w);
                r = t.getAxisPosition(r);
                c.push({x: w, y: r, lastXPos: K, lastYPos: z});
                if ((K = y.marker) && K.enabled)if (ja = {
                        index: H,
                        link: B,
                        value: y.y,
                        displayValue: y.displayValueArgs,
                        categoryLabel: y.categoryLabel,
                        toolText: k,
                        id: b.userID,
                        datasetIndex: b.index,
                        datasetName: b.name,
                        visible: b.visible
                    }, U = K.radius, Z = K.shadow, da = K.symbol.split("_"), ca = fa = {}, z = y.rolloverProperties, K.imageUrl)Y = new Va.Image, B = {
                    isTooltip: h,
                    setLink: B,
                    hotLayer: E
                }, Y.onload = a.onAnchorImageLoad(this, b, d, w, r, K, Q, ja, k, z, H, J, B), Y.onerror = S(w, r, Q, H), Y.src = K.imageUrl;
                else {
                    if (z = y.rolloverProperties)ca = {
                        polypath: [da[1] || 2, w, r, U, K.startAngle, 0],
                        fill: pa(K.fillColor),
                        "stroke-width": K.lineWidth,
                        stroke: pa(K.lineColor)
                    }, fa = {
                        polypath: [z.sides || 2, w, r, z.radius, z.startAngle, z.dip],
                        fill: pa(z.fillColor),
                        "stroke-width": z.lineWidth,
                        stroke: pa(z.lineColor)
                    };
                    ba = Q.graphic = e.polypath(da[1] || 2, w, r, U, K.startAngle, 0, J).attr({
                        fill: pa(K.fillColor),
                        "stroke-width": K.lineWidth,
                        stroke: pa(K.lineColor),
                        "stroke-linecap": "round",
                        cursor: B ? "pointer" : "",
                        ishot: !0,
                        visibility: 0 === U ? "hidden" : D
                    }).data("alwaysInvisible",
                        0 === U).data("setRolloverProperties", z).data("setRolloverAttr", fa).data("setRolloutAttr", ca).data("anchorRadius", U).data("anchorHoverRadius", z && z.radius).shadow(Z || !1, M);
                    if (B || h || z)U = ab(U, z && z.radius || 0, L), Y = e.polypath(da[1] || 2, w, r, U, K.startAngle, 0, E).attr({
                        cursor: B ? "pointer" : "",
                        stroke: Ba,
                        "stroke-width": 0,
                        ishot: !0,
                        fill: Ba,
                        visibility: D
                    });
                    (Y || ba).data("eventArgs", ja).click(ma).hover(ga(Q, "DataPlotRollOver"), ga(Q, "DataPlotRollOut")).tooltip(k)
                }
                ba && F.push(ba);
                a.drawTracker && a.drawTracker.call(a, b, d, H);
                Q.graphic = ba;
                Q.dataLabel = O;
                Q.tracker = void 0;
                K && K.imageUrl || (O = a.drawPlotLineLabel(b, d, H, w, r));
                O && F.push(O);
                a.drawTracker && a.drawTracker.call(a, b, d, H);
                K = w;
                z = r
            }
            n = a.getSplinePath(c, t, X);
            c = n.closedPath;
            S = n.openPath;
            2 <= c.length && (c = e.path(c, R).attr({
                fill: pa(d.fillColor),
                "stroke-dasharray": d.dashStyle,
                "stroke-width": x ? 0 : d.lineWidth,
                stroke: pa(d.lineColor),
                "stroke-linecap": "round",
                visibility: D
            }).shadow(l.shadow && y.shadow), b.graphic = c, F.push(c));
            C ? W = R.attr({"clip-rect": v["clip-canvas-init"]}).animate({"clip-rect": v["clip-canvas"]},
                C, "normal", a.getAnimationCompleteFn()) : (g && g(), g = void 0);
            x && (2 <= S.length && (P = e.path(S, m).attr({
                stroke: pa(d.lineColor),
                "stroke-width": d.lineWidth,
                "stroke-dasharray": y.dashStyle || d.dashStyle,
                "stroke-linecap": "round",
                visibility: D
            }).shadow(l.shadow || y.shadow)), F.push(P), C && m.attr({"clip-rect": v["clip-canvas-init"]}).animateWith(R, W, {"clip-rect": v["clip-canvas"]}, C, "normal"));
            b.visible = !p;
            return b
        }
    }, r["renderer.cartesian"]);
    r("renderer.kagi", {
        drawPlotKagi: function (b, d) {
            var a = this, c = a.paper, e = a.options,
                g = a.elements, f = b.data, m = e.plotOptions.series, v = a.xAxis[d.xAxis || 0], l = a.yAxis[d.yAxis || 0], p = d.canvasPadding, k = d.xShiftLength, n = b.items, t = a.logic, u = !1 === d.visible ? "hidden" : "visible", D = !1 !== (e.tooltip || {}).enabled, C = {
                    stroke: pa({
                        color: d.rallyColor,
                        alpha: d.rallyAlpha
                    }),
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": d.rallyThickness || d.lineWidth,
                    "stroke-dasharray": d.rallyDashed
                }, x = {
                    stroke: pa({color: d.declineColor, alpha: d.declineAlpha}),
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": d.declineThickness || d.lineWidth,
                    "stroke-dasharray": d.declineDashed
                }, y = {
                    "true": C["stroke-width"],
                    "false": x["stroke-width"]
                }, w = a.layers, r = w.dataset = w.dataset || c.group("dataset-orphan"), B = w.datalabels = w.datalabels || c.group("datalabels").insertAfter(r), z = w.tracker, w = isNaN(+m.animation) && m.animation.duration || 1E3 * m.animation, F = g["clip-canvas-init"].slice(0), g = g["clip-canvas"].slice(0), A = 0, K = v.getAxisPosition(A), E = a.chartWidth, H = a.chartHeight, G = function () {
                    aa.attr({"clip-rect": null});
                    va.show();
                    ka.show();
                    B.attr({transform: "...t" + -E + "," + -H})
                }, I = [], T = [], P, X, M, J, R, O, U, S, da, ba, Y, W, Q, ca, fa, Z, ga, ja, ma = e.chart.anchorTrackingRadius, ha, va, aa, ka, ia, ta, qa, sa, qb, oa, ra, ua;
            if (f.length) {
                e = r.line || (r.line = c.group("line-connector", r));
                c.group("connector-shadow", e);
                va = c.group("anchor-shadow", e);
                aa = c.group("connector", e);
                ka = c.group("anchors", e);
                ka.hide();
                va.hide();
                B.attr({transform: "...t" + E + "," + H});
                w && a.animationCompleteQueue.push({fn: G, scope: this});
                U = !!f[0].isRally;
                e = 0;
                for (r = f.length; e < r; e += 1)n[e] = {
                    chart: a,
                    index: e, graphic: null, line: [], dataLabel: null, tracker: null
                }, S = f[e], da = S.y, S.isDefined || (da = S.plotValue), da = h(S.plotValue, da), S.plotY = mb(l.getAxisPosition(S.y), 2), S.graphY = mb(l.getAxisPosition(da), 2), S.plotX = K, S.isShift && (A += 1, K = v.getAxisPosition(A)), e && (da = f[e - 1], U = S && S.objParams && S.objParams.isRally, Q = S && S.objParams && S.objParams.lastHigh, ca = S && S.objParams && S.objParams.lastLow, fa = S && S.objParams && S.objParams.isRallyInitialised, da && fa && da.isRally !== S.isRally ? (S.isChanged = !0, S.ty = mb(l.getAxisPosition(U ?
                    Q : ca), 2)) : S.isChanged = !1);
                v = a.canvasLeft + p;
                K = v + k / 2;
                ba = f[0].plotY;
                U = !!f[0].isRally;
                l = L(ba) + y[U] % 2 / 2;
                U ? I.push("M", v, l, "H", K) : T.push("M", v, l, "H", K);
                nb(f, function (e, g) {
                    if (Z = f[g + 1])ja = ["M", K, ba], U = e.isRally, e.isShift && (K += k, ba = e.graphY, ja.push("H", K), ja[2] = L(ja[2]) + y[U] % 2 / 2, ja = ja.toString(), U ? I.push(ja) : T.push(ja), ja = ["M", K, ba]), Z.isChanged && (ba = Z.ty, ja.push("V", ba), ja[1] = L(ja[1]) + y[U] % 2 / 2, ja = ja.toString(), U ? I.push(ja) : T.push(ja), ja = ["M", K, ba]), ga = Z.isRally, Z.graphY !== ja[2] && (ja.push("V", Z.graphY), ja[1] =
                        L(ja[1]) + y[ga] % 2 / 2, ja = ja.toString(), ga ? I.push(ja) : T.push(ja)), ba = Z.graphY;
                    Y = e.plotX;
                    W = e.plotY;
                    J = e.marker;
                    P = e && e.link;
                    X = e && e.toolText;
                    if (void 0 !== W && !isNaN(W) && e.isDefined)if (R = J.symbol.split("_"), qb = "spoke" === R[0] ? 1 : 0, oa = J.radius, ia = J.shadow, ha = {
                            index: g,
                            link: P,
                            value: e.y,
                            displayValue: e.displayValueArgs,
                            categoryLabel: e.categoryLabel,
                            toolText: X,
                            id: b.userID,
                            datasetIndex: b.index,
                            datasetName: b.name,
                            visible: b.visible
                        }, ta = qa = {}, sa = e.rolloverProperties, J.imageUrl)ra = new Va.Image, ra = new Va.Image, ua = {
                        isTooltip: D,
                        setLink: P, hotLayer: z
                    }, ra.onload = a.onAnchorImageLoad(a, b, d, Y, W, J, n[g], ha, X, sa, g, ka, ua), ra.onerror = function (c, e, g, f, k, h, m, q) {
                        return function () {
                            f.dataLabel = a.drawPlotKagiLabel(b, d, q, c, e)
                        }
                    }(Y, W, J, n[g], ha, X, sa, g), ra.src = J.imageUrl; else {
                        !t.multisetRealtime && sa && (ta = {
                            polypath: [R[1] || 2, Y, W, oa, J.startAngle, qb],
                            fill: pa(J.fillColor),
                            "stroke-width": J.lineWidth,
                            stroke: pa(J.lineColor)
                        }, qa = {
                            polypath: [sa.sides || 2, Y, W, sa.radius, sa.startAngle, sa.dip],
                            fill: pa(sa.fillColor),
                            "stroke-width": sa.lineWidth,
                            stroke: pa(sa.lineColor)
                        });
                        O = n[g].graphic = c.polypath(R[1] || 2, Y, W, oa, J.startAngle, qb, ka).attr({
                            fill: pa(J.fillColor),
                            "stroke-width": J.lineWidth,
                            stroke: pa(J.lineColor),
                            "stroke-linecap": "round",
                            cursor: P ? "pointer" : "",
                            ishot: !0,
                            visibility: 0 === oa ? "hidden" : u
                        }).data("alwaysInvisible", 0 === oa).data("setRolloverProperties", sa).data("setRolloverAttr", qa).data("setRolloutAttr", ta).data("anchorRadius", oa).data("anchorHoverRadius", sa && sa.radius).shadow(ia || !1, va);
                        if (P || D)oa = ab(oa, sa && sa.radius || 0, ma), M = c.circle(Y, W, oa, z).attr({
                            cursor: P ? "pointer" :
                                "", stroke: Ba, ishot: !0, fill: Ba, "stroke-width": J.lineWidth, visibility: u
                        }).data("eventArgs", ha).click(function (b) {
                            Da.call(this, a, b)
                        }).hover(function (b) {
                            return function (c) {
                                a.hoverPlotAnchor(this, c, "DataPlotRollOver", b, a)
                            }
                        }(n[g]), function (b) {
                            return function (c) {
                                a.hoverPlotAnchor(this, c, "DataPlotRollOut", b, a)
                            }
                        }(n[g])).tooltip(X);
                        n[g].tracker = M || O;
                        J && J.imageUrl || (n[g].dataLabel = a.drawPlotKagiLabel(b, d, g, Y, W))
                    }
                });
                C = c.path(I, aa).attr(C).shadow(m.shadow);
                n[0].line.push(C);
                C = c.path(T, aa).attr(x).shadow(m.shadow);
                n[0].line.push(C);
                w ? aa.attr({"clip-rect": F}).animate({"clip-rect": g}, w, "normal", a.getAnimationCompleteFn()) : (G && G(), G = void 0)
            }
        }, drawPlotKagiLabel: function (b, d, a, c, e, g) {
            var f = this.options, h = f.chart, v = this.paper, l = this.layers, p = f.plotOptions.series.dataLabels.style, f = 1 === h.rotateValues ? 270 : 0, k = this.canvasHeight, n = this.canvasTop, t = this.canvasLeft, u = b.data[a], D = b.items[a];
            b = (b = D.graphic) && "image" == b.type && .5 * b.attr("height") || u.marker && u.marker.radius - 3;
            b = h.valuePadding + 2 + b;
            d = !1 === d.visible ? "hidden" :
                "visible";
            a = D.dataLabel;
            var w = {
                fontFamily: p.fontFamily,
                fontSize: p.fontSize,
                lineHeight: p.lineHeight,
                fontWeight: p.fontWeight,
                fontStyle: p.fontStyle
            }, x, y, r;
            g = g || l.datalabels;
            l = u.displayValue;
            ca(l) && l !== B ? (a ? f && a.rotate(360 - f) : a = D.dataLabel = v.text(g).attr({
                text: l,
                fill: p.color,
                direction: h.textDirection,
                "text-bound": [p.backgroundColor, p.borderColor, p.borderThickness, p.borderPadding, p.borderRadius, p.borderDash]
            }).css(w), a.attr({fill: p.color}).tooltip(u.originalText), v = a.getBBox(), g = l = f ? v.width : v.height, h =
                e, g = g + b + 4, l = .5 * l + b, f ? (t = !0, u.vAlign === La ? (h -= l, t = e - n < g) : u.vAlign === Ia && (h += l - 2, x = 1, t = e + g > n + k), t && (y = 1, c -= b + 3 + .5 * v.height, h = e)) : u.vAlign === La ? h -= l : u.vAlign === Ia ? (h += l, x = 1) : v.width > c - t ? h -= l : (y = 1, c -= b + 3, r = "end"), a.attr({
                x: c,
                y: h,
                "text-anchor": r,
                visibility: d
            }).data("isBelow", x).data("isMiddle", y), f && a.attr("transform", "T0,0,R" + f)) : a && a.attr({text: B});
            return a
        }
    }, r["renderer.cartesian"]);
    r("renderer.boxandwhisker", {
        drawPlotBoxandwhisker2d: function (b, d) {
            var a = this, c = a.paper, e = a.options, g = e.plotOptions.series,
                h = a.xAxis[d.xAxis || 0], m = a.yAxis[d.xAxis || 0], v = isNaN(+g.animation) && g.animation.duration || 1E3 * g.animation, l = a.layers, p = l.dataset = l.dataset || c.group("dataset-orphan"), k = l.datalabels = l.datalabels || c.group("datalabels"), n = d.data, t = b.items || (b.items = []), u = !1 === d.visible ? "hidden" : "visible", D = !1 !== (e.tooltip || {}).enabled, w = d.columnPosition || 0, x = a.definition.chart, y = h.getAxisPosition(0), r = h.getAxisPosition(1) - y, z = g.groupPadding, A = g.maxColWidth, y = d.numColumns || 1, r = (1 - .01 * (x && x.plotspacepercent)) * r || H(r * (1 -
                        2 * z), A * y), x = r / y, w = w * x - r / 2, y = e.chart, r = 1 === y.rotateValues ? 270 : void 0, z = f(y.valuePadding, 0), A = p.upperBoxGroup = p.upperBoxGroup || c.group("upperBox", p), E = p.lowerBoxGroup = p.lowerBoxGroup || c.group("lowerBox", p), F = p.medianGroup = p.medianGroup || c.group("median", p), G = b.graphics = b.graphics || [], K = t.displayValues = {}, I = K.upperQuartileValues = [], P = K.lowerQuartileValues = [], K = K.medianValues = [], O = function (b) {
                    Da.call(this, a, b)
                }, l = l.shadows || (l.shadows = c.group("shadows", p).toBack()), e = e.plotOptions.series.dataLabels.style,
                W = {
                    fontFamily: e.fontFamily,
                    fontSize: e.fontSize,
                    lineHeight: e.lineHeight,
                    fontWeight: e.fontWeight,
                    fontStyle: e.fontStyle
                }, T = function (b, c) {
                    return function (d) {
                        b.upperBox.attr(c.upperBox);
                        b.lowerBox.attr(c.lowerBox);
                        b.upperBoxBorder.attr(c.upperBoxBorder);
                        b.lowerBoxBorder.attr(c.lowerBoxBorder);
                        b.upperQuartile.attr(c.upperQuartile);
                        b.lowerQuartile.attr(c.lowerQuartile);
                        b.medianBorder.attr(c.median);
                        Da.call(this, a, d, "DataPlotRollOver")
                    }
                }, Z = function (b, c) {
                    return function (d) {
                        b.upperBox.attr(c.upperBox);
                        b.lowerBox.attr(c.lowerBox);
                        b.upperBoxBorder.attr(c.upperBoxBorder);
                        b.lowerBoxBorder.attr(c.lowerBoxBorder);
                        b.upperQuartile.attr(c.upperQuartile);
                        b.lowerQuartile.attr(c.lowerQuartile);
                        b.medianBorder.attr(c.median);
                        Da.call(this, a, d, "DataPlotRollOut")
                    }
                }, X, M, J, R, ya, U, S, da, ba, Y, Q, ga, aa, fa, ha, ka, ja, ma, oa, va, ta, ia, qa, ra, ua, sa;
            ma = 0;
            for (oa = n.length; ma < oa; ma += 1)M = n[ma], J = M.y, ya = M.link, U = M.tooltext || M.toolText, (X = t[ma]) || (X = t[ma] = {
                index: ma,
                value: J,
                upperBox: null,
                lowerBox: null,
                upperBoxBorder: null,
                lowerBoxBorder: null,
                upperQuartileBorder: null,
                lowerQuartileBorder: null,
                medianBorder: null,
                upperQuartileValues: null,
                lowerQuartileValues: null,
                medianValues: null,
                tracker: null,
                hot: null
            }), null !== J && (m.getAxisPosition(J), J = f(M.x, ma), J = h.getAxisPosition(J), w && (J += w), R = g.borderRadius || 0, da = ((da = (aa = M.upperQuartile || {}, aa.value)) || 0 === da) && m.getAxisPosition(da), S = ((S = (fa = M.lowerQuartile || {}, fa.value)) || 0 === S) && m.getAxisPosition(S), Y = ((ba = (ja = M.median) && ja.value) || 0 === ba) && m.getAxisPosition(ba), Q = Y - da, ga = S - Y, ha = M.upperBoxBorder || {}, ka = M.lowerBoxBorder ||
                {}, ba = {
                index: ma,
                link: ya,
                maximum: M.displayValueMax,
                minimum: M.displayValueMin,
                median: ba,
                q3: aa.value,
                q1: fa.value,
                maxDisplayValue: M.displayValueMax,
                minDisplayValue: M.displayValueMin,
                medianDisplayValue: M.displayValueMid,
                q1DisplayValue: M.displayValueQ1,
                q3DisplayValue: M.displayValueQ3,
                categoryLabel: M.categoryLabel,
                toolText: M.toolText,
                id: b.userID,
                datasetIndex: b.index,
                datasetName: b.name,
                visible: b.visible
            }, va = L(J) + ha.borderWidth % 2 * .5, ta = L(J + x) + ha.borderWidth % 2 * .5, ia = L(da) + aa.borderWidth % 2 * .5, x = ta - va, sa = M.hoverEffects.rollOut =
            {
                upperBox: {
                    fill: pa(M.color.FCcolor),
                    "stroke-width": 0,
                    "stroke-dasharray": ha.dashStyle,
                    cursor: ya ? "pointer" : "",
                    ishot: !0,
                    visibility: u
                },
                lowerBox: {
                    fill: pa(M.lowerboxColor.FCcolor),
                    "stroke-width": 0,
                    "stroke-dasharray": ka.dashStyle,
                    cursor: ya ? "pointer" : B,
                    ishot: !0,
                    visibility: u
                },
                upperBoxBorder: {
                    stroke: ha.color,
                    "stroke-width": ha.borderWidth,
                    "stroke-linecap": "round",
                    dashstyle: ha.dashStyle,
                    ishot: !0,
                    visibility: u
                },
                lowerBoxBorder: {
                    stroke: ka.color,
                    "stroke-width": ka.borderWidth,
                    dashstyle: ka.dashStyle,
                    "stroke-linecap": "round",
                    ishot: !0,
                    visibility: u
                },
                upperQuartile: {
                    stroke: pa(aa.color),
                    "stroke-width": aa.borderWidth,
                    "stroke-dasharray": aa.dashSyle,
                    "stroke-linecap": "round",
                    cursor: ya ? "pointer" : B,
                    ishot: !0,
                    visibility: u
                },
                lowerQuartile: {
                    stroke: pa(fa.color),
                    "stroke-width": fa.borderWidth,
                    "stroke-dasharray": fa.dashSyle,
                    cursor: ya ? "pointer" : "",
                    "stroke-linecap": "round",
                    ishot: !0,
                    visibility: u
                },
                median: {
                    stroke: pa(ja.color),
                    "stroke-width": ja.borderWidth,
                    "stroke-dasharray": ja.dashSyle,
                    cursor: ya ? "pointer" : "",
                    "stroke-linecap": "round",
                    ishot: !0,
                    visibility: u
                }
            }, ya = X.graphic = X.upperBox = c.rect(va, ia, x, Q, R, A).attr(sa.upperBox).shadow(g.shadow && M.shadow, l), Q = X.upperBoxBorder = c.path(["M", va, ia, "V", ia + Q, "M", ta, ia, "V", ia + Q], A).attr(sa.upperBoxBorder).shadow(g.shadow && ha.shadow, l), ha = X.upperQuartile = c.path(["M", va, ia, "H", va + x], F).attr(sa.upperQuartile).shadow(g.shadow && aa.shadow, l), va = L(J) + ka.borderWidth % 2 * .5, ta = L(J + x) + ka.borderWidth % 2 * .5, ia = L(Y + ga) + fa.borderWidth % 2 * .5, R = X.lowerBox = c.rect(va, Y, x, ia - Y, R, E).attr(sa.lowerBox).shadow(g.shadow && M.shadow,
                l), ka = X.lowerBoxBorder = c.path(["M", va, Y, "V", Y + ga, "M", ta, Y, "V", Y + ga], E).attr(sa.lowerBoxBorder).shadow(g.shadow && ka.shadow, l), ia = L(Y + ga) + fa.borderWidth % 2 * .5, ga = X.lowerQuartile = c.path(["M", va, ia, "H", va + x], F).attr(sa.lowerQuartile).shadow(g.shadow && aa.shadow, l), ia = L(Y) + ja.borderWidth % 2 * .5, va = X.medianBorder = c.path(["M", va, ia, "H", va + x], F).attr(sa.median), ia = b.index + "_" + ma, ya.click(O).hover(T(X, M.hoverEffects), Z(X, sa)).data("groupId", ia).data("eventArgs", ba), R.click(O).hover(T(X, M.hoverEffects), Z(X, sa)).data("groupId",
                ia).data("eventArgs", ba), Q.click(O).hover(T(X, M.hoverEffects), Z(X, sa)).data("groupId", ia).data("eventArgs", ba), ka.click(O).hover(T(X, M.hoverEffects), Z(X, sa)).data("groupId", ia).data("eventArgs", ba), ha.click(O).hover(T(X, M.hoverEffects), Z(X, sa)).data("groupId", ia).data("eventArgs", ba), ga.click(O).hover(T(X, M.hoverEffects), Z(X, sa)).data("groupId", ia).data("eventArgs", ba), va.click(O).hover(T(X, M.hoverEffects), Z(X, sa)).data("groupId", ia).data("eventArgs", ba), ba = r ? Ja : Xa, ca(aa.displayValue) && aa.displayValue !==
            B && (qa = I[ma] = c.text(k).attr({
                text: aa.displayValue,
                x: J + x / 2,
                title: aa.originalText || "",
                y: da - z,
                "text-anchor": r ? "start" : ba,
                "vertical-align": r ? "middle" : "bottom",
                visibility: u,
                direction: y.textDirection,
                fill: e.color,
                "text-bound": [e.backgroundColor, e.borderColor, e.borderThickness, e.borderPadding, e.borderRadius, e.borderDash]
            }).hover(T(X, M.hoverEffects), Z(X, sa)).data("groupId", ia).css(W), r && qa.rotate(r, J + x / 2, da - z)), ca(ja.displayValue) && ja.displayValue !== B && (ua = K[ma] = c.text(k).attr({
                text: ja.displayValue,
                x: J + x /
                2,
                y: Y - z,
                title: ja.originalText || "",
                "text-anchor": r ? "start" : ba,
                "vertical-align": r ? "middle" : "bottom",
                visibility: u,
                direction: y.textDirection,
                fill: e.color,
                "text-bound": [e.backgroundColor, e.borderColor, e.borderThickness, e.borderPadding, e.borderRadius, e.borderDash]
            }).hover(T(X, M.hoverEffects), Z(X, sa)).data("groupId", ia).css(W), r && ua.rotate(r, J + x / 2, Y - z)), ca(fa.displayValue) && fa.displayValue !== B && (ra = P[ma] = c.text(k).attr({
                text: fa.displayValue,
                x: J + x / 2,
                y: S + z,
                title: fa.originalText || "",
                "text-anchor": r ? "start" :
                    ba,
                "vertical-align": r ? "middle" : "top",
                visibility: u,
                direction: y.textDirection,
                fill: e.color,
                "text-bound": [e.backgroundColor, e.borderColor, e.borderThickness, e.borderPadding, e.borderRadius, e.borderDash]
            }).hover(T(X, M.hoverEffects), Z(X, sa)).data("groupId", ia).css(W), r && ra.rotate(r, J + x / 2, S + z)), D && (ya.tooltip(U), R.tooltip(U), Q.tooltip(U), ka.tooltip(U), ha.tooltip(U), ga.tooltip(U), va.tooltip(U), qa && qa.tooltip(U), ua && ua.tooltip(U), ra && ra.tooltip(U)), ya && G.push(ya), R && G.push(R), va && G.push(va), Q && G.push(Q), ka &&
            G.push(ka), ha && G.push(ha), ga && G.push(ga), qa && G.push(qa), ua && G.push(ua), ra && G.push(ra));
            p.attr({"clip-rect": [a.canvasLeft, a.canvasTop, v ? 0 : a.canvasWidth, a.canvasHeight]});
            v && p.animate({"clip-rect": [a.canvasLeft, a.canvasTop, a.canvasWidth, a.canvasHeight]}, v, "normal");
            b.visible = !1 !== d.visible
        }
    }, r["renderer.cartesian"]);
    r("renderer.dragnode", {
        drawPlotDragnode: function (b, d) {
            var a = this, c = b.graphics = [], e = {}, g = a.options, q = g.tooltip, m = g._FCconf.inCanvasStyle, v = a.paper, l = a.layers, p = b.items, k = l.dataset, n = l.connector,
                t = e.xAxis = a.xAxis[d.xAxis || 0], u = e.yAxis = a.yAxis[d.yAxis || 0], r = d.data, C = e.elements = {data: []}, x = a.smartLabel, y = g.plotOptions.series.dataLabels.style, N = g.orphanStyles.connectorlabels.style, z = g.connectors, A = g.connectorsStore, E = g.pointStore || (g.pointStore = []), F = g.invalConnectStore, H = {
                    fontFamily: y.fontFamily,
                    fontSize: y.fontSize,
                    lineHeight: y.lineHeight,
                    fontWeight: y.fontWeight,
                    fontStyle: y.fontStyle
                }, K = function (b) {
                    E[b.from] && E[b.to] ? A.push(new pb(b, E, N, v, n, a)) : F.push(b)
                }, I = function () {
                    var b = this;
                    b.data("fire_click_event",
                        1);
                    clearTimeout(b._longpressactive);
                    b._longpressactive = setTimeout(function () {
                        b.data("fire_click_event", 0);
                        b.data("viewMode") || a.logic.showLabelDeleteUI(a, b)
                    }, 1E3)
                }, L = function () {
                    this.data("fire_click_event") && (this.data("fire_click_event", 0), ka.call(this))
                }, O = function (b) {
                    var c = this.data("fire_click_event");
                    ka.call(this);
                    c && Da.call(this, a, b, "LabelClick")
                }, W = function (b) {
                    Da.call(this, a, b, "LabelRollover")
                }, T = function (b) {
                    Da.call(this, a, b, "LabelRollout")
                }, Z = function (b, c, d, e, g) {
                    d = this.data("data");
                    e = d.bBox;
                    var f = a.canvasTop + a.canvasHeight, h = a.canvasLeft + a.canvasWidth;
                    this.data("fire_dragend") || (Da.call(this, a, g, "LabelDragStart"), this.data("fire_dragend", 1));
                    e.x + b < a.canvasLeft && (b = a.canvasLeft - e.x);
                    e.x2 + b > h && (b = h - e.x2);
                    e.y + c < a.canvasTop && (c = a.canvasTop - e.y);
                    e.y2 + c > f && (c = f - e.y2);
                    this.attr({x: e.x + b, y: e.y + c});
                    d.label.attr({x: d.ox + b, y: d.oy + c})
                }, X = function () {
                    var a = this.data("data"), b = this.getBBox();
                    a.ox = a.label.attr("x");
                    a.oy = a.label.attr("y");
                    a.bBox = b;
                    this.data("fire_dragend", 0)
                }, M = function (b) {
                    var c = this.data("data"),
                        d = c.label, e = {hcJSON: {dragableLabels: []}}, g = this.data("eventArgs"), f = g.x = a.xAxis[0].getAxisPosition(d.attr("x"), 1), d = g.y = a.yAxis[0].getAxisPosition(d.attr("y"), 1);
                    e.hcJSON.dragableLabels[c.labelNode.index] = {y: d, x: f};
                    P(a.logic.chartInstance.jsVars._reflowData, e, !0);
                    this.data("fire_dragend") && (c = Lb(a.container, b), c.sourceEvent = "labeldragend", w.raiseEvent("chartupdated", P(c, g), a.logic.chartInstance), Da.call(this, a, b, "labeldragend"))
                }, J, R, Q, U, S, da, ba, Y, ga, ia, aa, fa, ha, oa, ja, ma, qa, va, ra, ua, wa, Aa, za, sa;
            n ||
            (n = l.connector = v.group("connectors").insertBefore(k));
            q && !1 !== q.enabled && n.trackTooltip(!0);
            l = C.group = v.group(k);
            q = C.dragLabelGroup = v.group(k);
            x.setStyle(y);
            k = 0;
            for (C = r.length; k < C; k += 1) {
                J = r[k];
                U = J.marker;
                J._yPos = Q = u.getAxisPosition(J.y);
                J._xPos = R = t.getAxisPosition(J.x);
                da = p[k] || (p[k] = {});
                sa = J.hoverEffects && J.hoverEffects.rolloverProperties;
                U = da.graphic;
                ba = da.image;
                Y = da.label;
                U = J.marker;
                if (void 0 !== Q && !isNaN(Q) && U) {
                    aa = J._config = J._config || {shapeArg: {}, startConnectors: [], endConnectors: []};
                    fa = aa.shapeArg;
                    ha = f(U && U.height);
                    oa = f(U && U.width);
                    ja = f(U && U.radius);
                    S = h(U && U.symbol);
                    ma = "rectangle" === S;
                    ga = J.id;
                    qa = J.imageNode;
                    va = J.imageURL;
                    ra = J.imageAlign;
                    ua = J.labelAlign;
                    wa = ma ? oa : 1.4 * ja;
                    Aa = f(J.imageWidth, wa);
                    ma = ma ? ha : 1.4 * ja;
                    za = f(J.imageHeight, ma);
                    ja = {fill: pa(U.fillColor), "stroke-width": U.lineWidth, r: U.radius, stroke: pa(U.lineColor)};
                    S = fa.symbol = h(U && U.symbol, e.symbol);
                    S = S.split("_");
                    fa.x = R;
                    fa.y = Q;
                    fa.radius = U.radius;
                    fa.width = oa;
                    fa.height = ha;
                    fa.sides = S[1];
                    "poly" === S[0] || "circle" === S[0] ? U = v.polypath(S[1], R, Q, U.radius,
                        U.startAngle, 0, l).attr(ja) : (aa.shapeType = hc, fa.x = R - oa / 2, fa.y = Q - ha / 2, fa.r = 0, ja.width = oa, ja.height = ha, ja.x = R - oa / 2, ja.y = Q - ha / 2, sa && J.hoverEffects.enabled && (sa.x = R - sa.width / 2, sa.y = Q - sa.height / 2, delete sa.r), delete ja.r, U = v.rect(fa.x, fa.y, oa, ha, 0, l).attr(ja));
                    if (qa && va) {
                        za > ma && (za = ma);
                        Aa > wa && (Aa = wa);
                        switch (ra) {
                            case "middle":
                                sa = Q - za / 2;
                                break;
                            case "bottom":
                                sa = ma > za ? Q + ma / 2 - za : Q - za / 2;
                                break;
                            default:
                                sa = ma > za ? Q - .5 * ma : Q - za / 2
                        }
                        aa.imageX = R - Aa / 2;
                        aa.imageY = sa;
                        ba || (ba = v.image(l));
                        ba.attr({
                            src: va, x: aa.imageX, y: sa, width: Aa,
                            height: za
                        })
                    }
                    aa = J.displayValue;
                    if (ca(aa) || aa !== B) {
                        wa = x.getSmartText(aa, wa, ma);
                        aa = .5 * ma - .5 * wa.height;
                        switch (ua) {
                            case "top":
                                aa = -aa;
                                break;
                            case "bottom":
                                break;
                            default:
                                aa = 0
                        }
                        J._yAdjustment = ua = aa;
                        Q += ua;
                        Y ? Y.attr({
                            text: wa.text,
                            title: wa.tooltext || "",
                            fill: y.color,
                            x: R,
                            y: Q
                        }) : (Y = v.text(l), Y.attr({
                            text: wa.text,
                            fill: y.color,
                            x: R,
                            y: Q,
                            direction: g.chart.textDirection,
                            "text-bound": [y.backgroundColor, y.borderColor, y.borderThickness, y.borderPadding, y.borderRadius, y.borderDash]
                        }).css(H))
                    }
                    E[ga] = J;
                    da.index = k;
                    da.graphic = U;
                    da.label =
                        Y;
                    da.image = ba;
                    ga = a.drawTracker && a.drawTracker.call(a, b, d, k, ja);
                    U && c.push(U);
                    Y && c.push(Y);
                    ba && c.push(ba);
                    ga && c.push(ga)
                }
                da.index = k;
                da.tracker = ga
            }
            if (A)for (k = F.length - 1; 0 <= k; --k)c = F[k], E[c.from] && E[c.to] && (F.splice(k, 1), A.push(new pb(c, E, N, v, n, a))); else for (A = g.connectorsStore = [], F = g.invalConnectStore = [], k = 0; k < z.length; k += 1)nb(z[k].connector, K);
            if (!a.dragLabelsDrawn && (ia = g.dragableLabels) && 0 < (C = ia.length)) {
                wa = a.plotSizeX;
                ma = a.plotSizeY;
                c = parseInt(m.fontSize, 10);
                p = m.backgroundColor;
                r = m.borderColor;
                for (k =
                         0; k < C; k += 1)if (x = ia[k], x.index = k, H = G(h(x.text, x.label)))H = G(H), K = t.getAxisPosition(x.x || 0), Q = u.getAxisPosition(x.y || 0, 0, 1, 0, 1), J = f(x.fontsize, c), R = bb(h(x.color, m.color)), l = f(x.alpha, 100) / 100, y = f(x.allowdrag, 1), ua = .8 * J, z = f(x.padding, 5), ba = {
                    fontSize: J + "px",
                    fontFamily: m.fontFamily,
                    fill: R,
                    color: R,
                    opacity: l
                }, Ka(ba), R = h(x.bgcolor, p), da = h(x.bordercolor, r), J = {
                    link: x.link,
                    text: H,
                    x: K,
                    y: Q,
                    allowdrag: y,
                    sourceType: "labelnode"
                }, R && (ba.backgroundColor = R.replace(jb, Oa), ba.backgroundOpacity = l), da && (ba.borderColor = da.replace(jb,
                    Oa), ba.borderOpacity = l), H = v.text(q).css(ba).attr({
                    text: H,
                    x: K,
                    y: Q,
                    align: Xa,
                    direction: g.chart.textDirection,
                    "text-bound": [(x.bgcolor || "").replace(jb, Oa), (x.bordercolor || "").replace(jb, Oa), f(x.borderthickness, 1), z, f(x.radius, 0), f(x.dashed, 0) ? ta(f(x.dashlen, 5), f(x.dashgap, 4), f(x.borderthickness, 1)) : "none"]
                }), K = H.getBBox(), z = v.rect(K.x - z, K.y - z, K.width + 2 * z, K.height + 2 * z, 0).attr({
                    fill: Ba,
                    ishot: !0,
                    "stroke-width": 0
                }).css({cursor: y ? "move" : ""}).mousedown(I).mousemove(L).mouseup(O).data("viewMode", g.chart.viewMode).hover(W,
                    T), q.appendChild(z), z.data("data", {
                    label: H,
                    labelNode: x,
                    chart: a
                }).data("eventArgs", J).data("link", x.link), y && z.drag(Z, X, M);
                a.dragLabelsDrawn = !0
            }
            return e
        }, drawTracker: function (b, d, a, c) {
            var e = this, g = e.paper, f = b.data[a], m = b.items[a], v = f._config, l = e.layers.tracker, p = eb({}, v.pointAttr), k = v.shapeArg, n = k.x, t = k.y, u = k.width, r = k.height, w = k.radius, x = e.dragStart, y = e.dragUp, z = e.dragMove, B = f.link ? "pointer" : f.allowDrag ? "move" : "", A = m.tracker;
            p.fill = Ba;
            p.stroke = Ba;
            p.cursor = B;
            p.ishot = !0;
            A = "rect" === v.shapeType ? g.rect(n,
                t, u, r, 0).attr(p) : g.polypath(k.sides, n, t, w, k.startAngle).attr(p);
            g = {
                index: a,
                link: f.link,
                y: f.y,
                x: f.x,
                shape: h(f._options.shape, "rect"),
                width: u,
                height: r,
                radius: w,
                sides: k.sides,
                label: f.displayValue,
                toolText: f.toolText,
                id: f.id,
                datasetIndex: b.index,
                datasetName: b.name,
                sourceType: "dataplot"
            };
            m.tracker = A.hover(function (a, b) {
                return function (c) {
                    a.graphic.attr(b);
                    Da.call(this, e, c, "DataPlotRollOver")
                }
            }(m, f.hoverEffects.rolloverProperties), function (a, b) {
                return function (c) {
                    a.graphic.attr(b);
                    Da.call(this, e, c, "DataPlotRollOut")
                }
            }(m,
                c)).data("eventArgs", g).data("drag-options", {
                plotItems: m,
                dataObj: f,
                endConnectors: v.endConnectors,
                startConnectors: v.startConnectors,
                boundaryTop: e.canvasTop,
                boundaryBottom: e.canvasTop + e.canvasHeight,
                boundaryLeft: e.canvasLeft,
                boundaryRight: e.canvasLeft + e.canvasWidth,
                cloneGroup: e.layers.dataset,
                datasetIndex: b.index,
                pointIndex: a,
                dataOptions: d,
                cursor: B,
                chart: e,
                link: f.link
            }).tooltip(f.toolText);
            l.appendChild(A);
            A.drag(function (a, b, c, d, g) {
                z.call(this, a, b, c, d, g, e)
            }, function (a, b, c) {
                x.call(this, a, b, c, e)
            }, function (a) {
                y.call(this,
                    a, e)
            });
            return A
        }, dragStart: function (b, d, a, c) {
            var e = this;
            b = e.paper;
            d = e.data("drag-options") || {};
            var g = d.dataObj, f = d.plotItems, h = f.cloneGroup, v = f.cloneGraphic, l = f.cloneImage, p = f.cloneLabel, k = e.getBBox(), n = aa && Pa(a) || kb, t = a.layerX || n.layerX, u = a.layerY || n.layerY, r = w.getPosition(c.container), C = c.elements, x = C.waitElement, y = d.dataOptions, z = c.layers.tracker, A = {opacity: .3};
            e.data("fire_click_event", 1);
            e.data("mousedown", 1);
            void 0 === t && (t = (a.pageX || n.pageX) - r.left, u = (a.pageY || n.pageY) - r.top);
            clearTimeout(e._longpressactive);
            e.data("move", !0);
            c.options.chart.viewMode || (x || (x = C.waitElement = b.ringpath(t, u, 8, 11, 0, 0, z).attr({
                fill: pa({
                    alpha: "100,100",
                    angle: 120,
                    color: "CCCCCC,FFFFFF",
                    ratio: "30,50"
                }), "stroke-width": 0
            })), t += 11, u -= 21, x.attr({ringpath: [t, u, 8, 11, 0, 0]}).show().animate({ringpath: [t, u, 8, 11, 0, 6.28]}, 1E3), e._longpressactive = setTimeout(function () {
                var a = y.name !== B && void 0 !== y.name ? y.name + Ca + " " : B, b = y.id, d = g._options, f = {
                    circle: "circ",
                    polygon: "poly",
                    undefined: "rect"
                }[d.shape];
                C.waitElement && C.waitElement.hide();
                e.data("fire_click_event",
                    0);
                c.logic.showNodeUpdateUI(c, {
                    x: {value: g.x},
                    y: {value: g.y},
                    draggable: {value: W(d.allowdrag, 1)},
                    color: {value: d.color},
                    alpha: {value: d.alpha},
                    label: {value: W(d.label, d.name)},
                    tooltip: {value: d.tooltext},
                    shape: {value: f},
                    rectWidth: {value: d.width},
                    rectHeight: {value: d.height},
                    circPolyRadius: {value: d.radius},
                    polySides: {value: d.numsides},
                    image: {value: d.imagenode},
                    imgWidth: {value: d.imagewidth},
                    imgHeight: {value: d.imageheight},
                    imgAlign: {value: d.imagealign},
                    imgUrl: {value: d.imageurl},
                    id: {value: g.id, disabled: !0},
                    link: {value: d.link},
                    dataset: {innerHTML: '<option value="' + b + '">' + a + b + "</option>", disabled: !0}
                }, !0)
            }, 1E3));
            d.bBoxX = k.x;
            d.bBoxX2 = k.x2 || k.x + k.width;
            d.bBoxY = k.y;
            d.bBoxY2 = k.y2 || k.y + k.height;
            d.origX = d.lastX || (d.lastX = 0);
            d.origY = d.lastY || (d.lastY = 0);
            d.draged = !1;
            d.startYValue = g.y;
            d.startXValue = g.x;
            h || (h = f.cloneGroup = b.group(d.cloneGroup).attr(A));
            f.graphic && !v && (v = f.cloneGraphic = f.graphic.clone(), h.appendChild(v), v.attr(A));
            f.image && !l && (l = f.cloneImage = f.image.clone(), h.appendChild(l).attr(A));
            f.label && !p && (p = f.cloneLabel = f.label.clone(),
                h.appendChild(p).attr(A));
            h.show()
        }, dragMove: function (b, d, a, c, e, g) {
            a = this.data("drag-options");
            c = a.plotItems;
            var f = a.bBoxX2 + b, h = a.bBoxY + d, v = a.bBoxY2 + d, l = g.elements;
            a.bBoxX + b < a.boundaryLeft && (b = a.boundaryLeft - a.bBoxX);
            f > a.boundaryRight && (b = a.boundaryRight - a.bBoxX2);
            h < a.boundaryTop && (d = a.boundaryTop - a.bBoxY);
            v > a.boundaryBottom && (d = a.boundaryBottom - a.bBoxY2);
            if (b || d)l.waitElement && l.waitElement.hide(), this.data("fire_click_event", 0), ka.call(this);
            a.dataObj.allowDrag && (f = a._transformObj = {
                transform: "t" +
                (a.origX + b) + "," + (a.origY + d)
            }, this.attr(f), c.cloneGraphic && c.cloneGraphic.attr(f), c.cloneImage && c.cloneImage.attr(f), c.cloneLabel && c.cloneLabel.attr(f), a.draged || Da.call(this, g, e, "DataplotDragStart"), a.draged = !0, a.lastX = b, a.lastY = d)
        }, dragUp: function (b) {
            var d = this.data("drag-options"), a = d.plotItems, c = d.chart, e = c.xAxis[0], g = c.yAxis[0], f = c.logic, h = f.tooltipSepChar, v = f.numberFormatter, l = d.dataObj, p = c.elements, k = this.data("fire_click_event"), n, t, u;
            p.waitElement && p.waitElement.hide();
            ka.call(this);
            this.data("mousedown",
                0);
            k && Da.call(this, c, b);
            if (d.draged) {
                d.lastX += d.origX;
                d.lastY += d.origY;
                k = l._xPos + d.lastX;
                p = l._yPos + d.lastY;
                n = d.startConnectors;
                t = n.length;
                for (u = 0; u < t; u += 1)n[u].updateFromPos(k, p);
                n = d.endConnectors;
                t = n.length;
                for (u = 0; u < t; u += 1)n[u].updateToPos(k, p);
                a.label && a.label.attr(d._transformObj);
                a.image && a.image.attr(d._transformObj);
                a.graphic && a.graphic.attr(d._transformObj);
                e = e.getAxisPosition(k, 1);
                g = g.getAxisPosition(p, 1);
                l._isUserTooltip || l.toolText === B || (l.toolText = l._toolTextStr + v.dataLabels(e) + h + v.dataLabels(g));
                v = this.data("eventArgs");
                l.x = v.x = e;
                l.y = v.y = g;
                h = Lb(c.container, b);
                h.sourceEvent = "dataplotdragend";
                w.raiseEvent("chartupdated", P(h, v), c.logic.chartInstance);
                Da.call(this, c, b, "dataplotdragend");
                b = {hcJSON: {series: []}};
                b.hcJSON.series[d.datasetIndex] = {data: []};
                b.hcJSON.series[d.datasetIndex].data[d.pointIndex] = {
                    _options: {x: e, y: g},
                    x: e,
                    y: g,
                    toolText: l.toolText,
                    displayValue: l.displayValue
                };
                P(f.chartInstance.jsVars._reflowData, b, !0)
            }
            a.cloneGroup && a.cloneGroup.hide()
        }
    }, r["renderer.cartesian"]);
    r("renderer.dragcolumn2d",
        {
            drawTracker: function (b, d, a) {
                var c = this.paper, e = this.yAxis[0], g = b.data[a], f = e.getAxisPosition(g.y), h = b.items[a], v = this.layers.tracker, l = h && h.dragTracker || null, p = this.dragStart, k = this.dragUp, n = this.dragMove, t = {
                    stroke: Ba,
                    "stroke-width": aa ? 40 : 10,
                    ishot: !0,
                    cursor: Za && "ns-resize" || "n-resize"
                }, u = e && e.axisData && e.axisData.plotLines, r = this._yAxisPlotLines || (this._yAxisPlotLines = []), w = 0, x, y;
                if (!r.length)for (x = u.length; w < x; w += 1)y = u[w], y.isGrid && r.push(e.getAxisPosition(y.value));
                null !== g.y && g.allowDrag && (e =
                    h.graphic.getBBox(), e = ["M", e.x, f, "L", e.x + e.width, f, "Z"], l ? l.animate({d: e}).attr(t) : l = h.dragTracker = c.path(e, v).attr(t), l.drag(n, p, k).data("drag-options", {
                    items: h,
                    yPos: f,
                    chart: this,
                    datasetIndex: b.index,
                    pointIndex: a,
                    dataOptions: d,
                    dataObj: g
                }), h.dragTracker = l)
            }, dragStart: function () {
            var b = this.data("drag-options"), d = b.chart, a = d.yAxis[0], c = a.max, a = a.min, e = this.getBBox();
            b.barH = b.items.graphic.getBBox().height;
            b.isAllPositive = 0 < c && 0 < a;
            b.isAllPositiveZero = 0 < c && 0 <= a;
            b.isAllNegative = 0 > c && 0 > a;
            b.isAllNegativeZero =
                0 >= c && 0 > a;
            b.isPositiveNegative = 0 < c && 0 > a;
            b.boundaryTop = d.canvasTop;
            b.boundaryBottom = d.canvasTop + d.canvasHeight;
            b.bBoxY = e.y;
            b.bBoxY2 = e.y2 || e.y + e.height;
            b.startValue = b.dataObj.y;
            b.origX = b.lastX || (b.lastX = 0);
            b.origY = b.lastY || (b.lastY = 0);
            b.draged = !1
        }, dragMove: function (b, d) {
            var a = this.data("drag-options"), c = a.items, e = a.dataObj, g = a.chart, f = g.options.chart, h = g.yAxis[0], v = g.logic.numberFormatter, l = h.yBasePos, p = c.dataLabel, k = {}, n = a.bBoxY2 + d, t = a.bBoxY + d, u = g.canvasBottom, r = e.allowNegDrag ? u : l, w = g.canvasTop, x =
                parseFloat(e.borderWidth) || 0, f = f.isCanvasBorder, y = a.isAllNegativeZero, z = a.isPositiveNegative, B = a.dataOptions;
            t < a.boundaryTop && (d = a.boundaryTop - a.bBoxY);
            n > r && (d = r - a.bBoxY2);
            t = a._transformObj = {transform: "t0," + (a.origY + d)};
            a.draged || (n = {
                dataIndex: a.pointIndex + 1,
                datasetIndex: B.__i + 1,
                startValue: a.startValue,
                datasetName: B.name
            }, I.raiseEvent("dataplotDragStart", n, g.logic.chartInstance));
            n = a.yPos + d;
            n <= l ? (k.y = n, k.height = l - n) : (k.y = l, k.height = n - l);
            f && !z && (y ? k.y -= k.y - (w - x / 2) : k.height = u - k.y + x / 2);
            this.attr(t);
            c.graphic.animate(k);
            a.shapeAttr = k;
            c = a.value = L(1E8 * h.getAxisPosition(n, 1)) / 1E8;
            v = v.dataLabels(c);
            oa.pointUpdate(e, v, c);
            p && g.drawPlotColumnLabel(g.plots[a.datasetIndex], a.dataOptions, a.pointIndex, void 0, n).attr("text", a.dataObj.displayValue);
            a.draged = !0;
            a.lastX = b;
            a.lastY = d
        }, dragUp: function () {
            var b = this.data("drag-options"), d = b.chart, a = d.logic, c = !d.options.chart.doNotSnap, e = b.dataObj, g = b.dataOptions, f, h;
            b.draged && (f = b.yPos + b.lastY, c && (h = oa.snapPoint(d, e, f), h - f && d.dragMove.call(this, 0, h - b.yPos)), b.yPos =
                h, b.lastX += b.origX, b.lastY += b.origY, c = {
                dataIndex: b.pointIndex + 1,
                datasetIndex: g.__i + 1,
                startValue: b.startValue,
                endValue: b.dataObj.y = b.value,
                datasetName: g.name
            }, g = [d.logic.chartInstance.id, c.dataIndex, c.datasetIndex, c.datsetName, c.startValue, c.endValue], I.raiseEvent("dataplotDragEnd", c, d.logic.chartInstance), w.raiseEvent("chartupdated", c, d.logic.chartInstance, g), c = {hcJSON: {series: []}}, c.hcJSON.series[b.datasetIndex] = {data: []}, b.items.tracker.attr(b.shapeAttr).tooltip(e.toolText), c.hcJSON.series[b.datasetIndex].data[b.pointIndex] =
            {
                y: b.value,
                toolText: e.toolText,
                displayValue: e.displayValue
            }, oa.setMinMaxValue(d), P(a.chartInstance.jsVars._reflowData, c, !0))
        }
        }, r["renderer.cartesian"]);
    r("renderer.dragline", {
        drawTracker: function (b, d, a) {
            var c = this.paper, e = this.yAxis[0], g = this.xAxis[0], f = b.data[a], h = b.items[a], v = aa ? 20 : ab(f.marker && f.marker.radius || 0, 5), l = this.layers.tracker, p = h.tracker || null, k = this.dragStart, n = this.dragUp, t = this.dragMove, u = {
                    fill: Ba,
                    "stroke-width": 0,
                    cursor: Za && "ns-resize" || "n-resize"
                }, r = e && e.axisData && e.axisData.plotLines,
                w = this._yAxisPlotLines || (this._yAxisPlotLines = []), x = 0, y, z;
            if (!w.length)for (y = r.length; x < y; x += 1)z = r[x], z.isGrid && w.push(e.getAxisPosition(z.value));
            null !== f.y && f.allowDrag && (g = g.getAxisPosition(a), e = e.getAxisPosition(f.y), p || (p = h.tracker = c.circle(g, e, v, l).attr(u)), p.attr({
                cursor: Za && "ns-resize" || "n-resize",
                ishot: !0
            }).drag(t, k, n).data("drag-options", {
                items: b.items,
                yPos: e,
                chart: this,
                datasetIndex: b.index,
                pointIndex: a,
                dataOptions: d,
                dataObj: f
            }))
        }, dragStart: function () {
            var b = this.data("drag-options"), d = b.items,
                a = b.pointIndex, c = d[a + 1], d = d[a], c = b.nextGraph = c && c.connector, d = b.currGraph = d && d.connector, a = b.chart;
            b._origY = b._lastY || (b._lastY = 0);
            b.boundaryTop = a.canvasTop;
            b.boundaryBottom = a.canvasTop + a.canvasHeight;
            b.currPath = d && d.attr("path");
            b.nextPath = c && c.attr("path");
            b.startValue = b.dataObj.y;
            b.origY = this.attr("cy");
            b.origX = this.attr("cx");
            b.draged = !1
        }, dragMove: function (b, d) {
            var a = this.data("drag-options"), c = a.items[a.pointIndex], e = a.nextPath, g = a.currPath, f = a.dataObj, h = a.chart, v = h.elements.plots[a.datasetIndex],
                l = h.yAxis[0], p = h.logic.numberFormatter, k = l.yBasePos, n = c.dataLabel, t = f.allowNegDrag ? a.boundaryBottom : k, u = a.dataOptions, k = a.origY + d;
            a.draged || (u = {
                dataIndex: a.pointIndex + 1,
                datasetIndex: u.__i + 1,
                startValue: a.startValue,
                datasetName: u.name
            }, I.raiseEvent("dataplotDragStart", u, h.logic.chartInstance));
            k < a.boundaryTop && (d = a.boundaryTop - a.origY);
            k > t && (d = t - a.origY);
            k = a.origY + d;
            this.animate({cy: k});
            c.graphic && c.graphic.attr("transform", "t0," + (a._origY + d));
            c.graphicImage && c.graphicImage.attr("transform", "t0," + (a._origY +
                d));
            e && e[0] && a.nextGraph && (Za ? e[0][2] = k : e[2] = k, a.nextGraph.animate({path: e}));
            g && g[1] && a.currGraph && (Za ? g[1][2] = k : g[5] = k, a.currGraph.animate({path: g}));
            c = f.y = a.value = L(1E8 * l.getAxisPosition(k, 1)) / 1E8;
            p = p.dataLabels(c);
            oa.pointUpdate(f, p, c);
            n && h.drawPlotLineLabel(h.plots[a.datasetIndex], a.dataOptions, a.pointIndex, a.origX, k).attr("text", f.displayValue);
            a.draged = !0;
            a.lastY = d;
            h.getAreaPath && v.graphic && v.graphic.attr({path: h.getAreaPath(v.data)})
        }, dragUp: function () {
            var b = this.data("drag-options"), d = b.chart,
                a = d.logic, c = !d.options.chart.doNotSnap, e = b.dataObj, g = b.dataOptions, f, h;
            b.draged && (f = b.yPos + b.lastY, c && (h = oa.snapPoint(d, e, f), h - f && d.dragMove.call(this, 0, h - b.yPos)), b.yPos = h, b._lastY = b.lastY + b._origY, b.lastY += b.origY, g = {
                dataIndex: b.pointIndex + 1,
                datasetIndex: g.__i + 1,
                startValue: b.startValue,
                endValue: b.dataObj.y = b.value,
                datasetName: g.name
            }, c = [d.logic.chartInstance.id, g.dataIndex, g.datasetIndex, g.datasetName, g.startValue, g.endValue], I.raiseEvent("dataplotDragEnd", g, d.logic.chartInstance), w.raiseEvent("chartupdated",
                g, d.logic.chartInstance, c), c = {hcJSON: {series: []}}, c.hcJSON.series[b.datasetIndex] = {data: []}, c.hcJSON.series[b.datasetIndex].data[b.pointIndex] = {
                y: b.value,
                toolText: e.toolText,
                displayValue: e.displayValue
            }, b.items[b.pointIndex].tracker.tooltip(e.toolText), oa.setMinMaxValue(d), P(a.chartInstance.jsVars._reflowData, c, !0))
        }
    }, r["renderer.cartesian"]);
    r("renderer.dragarea", {
        getAreaPath: function (b) {
            for (var d = this.xAxis[0], a = this.yAxis[0], c = a.yBasePos, e = b.length, g = 0, f = [], h = [], v = [], l = !0, p, k, n; g < e; g += 1)k = b[g],
                v[g] = d.getAxisPosition(g), h[g] = null, null !== k.y && (h[g] = a.getAxisPosition(k.y), n = b[g - 1] ? b[g - 1].y : null, k = b[g + 1] ? b[g + 1].y : null, null !== n ? (l ? (f.push("M", v[g - 1], c, "L", v[g - 1], h[g - 1], "L", v[g], h[g]), p = g - 1) : f.push("L", v[g], h[g]), null === k && f.push("L", v[g], c, "L", v[p], c), l = !1) : l = !0);
            return f
        }
    }, r["renderer.dragline"]);
    r("renderer.heatmap", {
        drawPlotHeatmap: function (b, d) {
            var a = this, c = b.data, e = b.items, g = b.graphics = b.graphics || [], h = a.paper, m = a.layers, v = a.options, l = v.chart, p = l.showHoverEffect, k = !1 !== (v.tooltip || {}).enabled,
                n = v.plotOptions.series, v = a.xAxis[d.xAxis || 0], t = a.yAxis[d.yAxis || 0], n = isNaN(+n.animation) && n.animation.duration || 1E3 * n.animation, u = !1 === d.visible ? "hidden" : "visible", r, w, x = v.getAxisPosition(0), y = v.getAxisPosition(1), z = t.getAxisPosition(0), B = t.getAxisPosition(1), x = y - x, z = z - B, l = f(l.useRoundEdges, 0), B = d.borderColor, y = d.borderWidth, A = d.dashStyle, E = x / 2, F = z / 2, H = m.dataset = m.dataset || h.group("dataset-orphan"), K = m.datalabels = m.datalabels || h.group("datalables").insertAfter(H), m = m.tracker, G = a.chartWidth, I = a.chartHeight,
                L = function (b) {
                    Da.call(this, a, b)
                }, P = function (b) {
                    Da.call(this, a, b, "DataPlotRollOver")
                }, T = function (b) {
                    Da.call(this, a, b, "DataPlotRollOut")
                }, Q = function (a, b) {
                    return function () {
                        a.attr({fill: pa(b)})
                    }
                }, X, M, J, R, O, U, S, W, ba;
            n && (K.attr({transform: "t" + G + "," + I}), a.animationCompleteQueue.push({
                fn: function () {
                    K.attr({transform: "t0,0"})
                }, scope: this
            }));
            G = 0;
            for (I = c.length; G < I; G++) {
                R = c[G];
                M = R.y;
                X = null;
                if (null !== M) {
                    O = R.link;
                    U = R.toolText || R.tooltext;
                    X = pa(R.setColor || R.color);
                    w = (r = R.visible) && !1 === r ? "hiddden" : u;
                    S = f(R.x, G);
                    S = v.getAxisPosition(S) - E;
                    ba = t.getAxisPosition(M);
                    W = ba + F;
                    M = {
                        link: O,
                        value: R.value,
                        columnId: R.columnId,
                        rowId: R.rowId,
                        displayValue: R.displayValueArgs,
                        tlLabel: R.tlLabel,
                        trLabel: R.trLabel,
                        blLabel: R.blLabel,
                        brLabel: R.brLabel,
                        toolText: U,
                        id: b.userID,
                        datasetIndex: b.index,
                        datasetName: b.name,
                        visible: b.visible
                    };
                    X = h.rect(S, ba, x, z, l, H).attr({
                        fill: X,
                        stroke: B,
                        "stroke-width": y,
                        "stroke-dasharray": A,
                        "stroke-linejoin": "miter",
                        "shape-rendering": 0 === l ? "crisp" : "",
                        cursor: O ? "pointer" : "",
                        opacity: n ? 0 : R.setAlpha && +R.setAlpha /
                        100 || 1
                    }).crisp().attr({visibility: w});
                    n && X.animate({opacity: R.setAlpha && +R.setAlpha / 100 || 1}, n, "normal", a.getAnimationCompleteFn());
                    if (p || k || O)J = h.rect(S, ba, x, z, l, m).attr({
                        cursor: O ? "pointer" : "",
                        stroke: Ba,
                        "stroke-width": y,
                        fill: Ba,
                        ishot: !0
                    }).data("eventArgs", M);
                    (J || X).click(L).hover(P, T).tooltip(U);
                    1 === p && X && J && J.hover(Q(X, R.hoverColor), Q(X, R.setColor || R.color));
                    e[G] = {
                        index: G,
                        value: R.value,
                        graphic: X,
                        tracker: J,
                        dataLabel: null,
                        dataLabels: [],
                        visible: r || "hidden" !== w
                    };
                    r = a.drawLabelHeatmap.call(a, b, d, G);
                    X &&
                    g.push(X);
                    J && g.push(J);
                    w = 0;
                    for (R = r.length; w < R; w++)!e[G].dataLabels && (e[G].dataLabels = []), r[w] && g.push(r[w]), e[G].dataLabels.push(r[w])
                }
                a.drawTracker && a.drawTracker.call(a, b, G, S, W)
            }
            b.visible = !1 !== d.visible;
            return b
        }, drawLabelHeatmap: function (b, d, a) {
            var c = b.items[a], e = b.data[a], g = this.options;
            b = this.paper;
            a = this.layers.datalabels;
            var f = g.plotOptions.series.dataLabels, h = f.style;
            d = !1 === d.visible ? "hidden" : tb;
            var v = e.displayValue, g = g.chart.textDirection, l = e.tlLabel, p = e.trLabel, k = e.blLabel, e = e.brLabel, n =
                f.tlLabelStyle, t = f.trLabelStyle, u = f.blLabelStyle, f = f.brLabelStyle, r = {
                fontFamily: n.fontFamily,
                fontSize: n.fontSize,
                lineHeight: n.lineHeight,
                fontWeight: n.fontWeight,
                fontStyle: n.fontStyle
            }, w = {
                fontFamily: t.fontFamily,
                fontSize: t.fontSize,
                lineHeight: t.lineHeight,
                fontWeight: t.fontWeight,
                fontStyle: t.fontStyle
            }, x = {
                fontFamily: u.fontFamily,
                fontSize: u.fontSize,
                lineHeight: u.lineHeight,
                fontWeight: u.fontWeight,
                fontStyle: u.fontStyle
            }, y = {
                fontFamily: f.fontFamily, fontSize: f.fontSize, lineHeight: f.lineHeight, fontWeight: f.fontWeight,
                fontStyle: f.fontStyle
            }, z = c.tlLabel, A = c.trLabel, E = c.blLabel, H = c.brLabel, F = this.smartLabel, G = c.dataLabel, K = [], I = {
                fontFamily: h.fontFamily,
                fontSize: h.fontSize,
                lineHeight: h.lineHeight,
                fontWeight: h.fontWeight,
                fontStyle: h.fontStyle
            }, L, O, P, T, Q, X, M, J;
            T = c.graphic.getBBox();
            L = T.width;
            O = T.height;
            P = T.x;
            T = T.y;
            F.setStyle(h);
            ca(v) && v !== B && (M = F.getSmartText(v, L, O, !1), v = M.text, G || (G = c.dataLabel = b.text(a)), G.attr({
                text: v,
                title: M.tooltext || "",
                visibility: d,
                fill: h.color,
                direction: g,
                x: P + .5 * L,
                y: T + .5 * O,
                "text-bound": [h.backgroundColor,
                    h.borderColor, h.borderThickness, h.borderPadding, h.borderRadius, h.borderDash]
            }).css(I), K.push(G));
            v = ca(l) && l !== B;
            I = ca(p) && p !== B;
            Q = ca(k) && k !== B;
            X = ca(e) && e !== B;
            h = L * (v && I ? .5 : .9);
            G = .5 * (O - (M && M.height || 0));
            J = T + 4;
            v && (F.setStyle(n), M = F.getSmartText(l, h, G, !1), v = M.text, l = P, z || (z = c.tlLabel = b.text(a)), z.attr({
                text: v,
                title: M.tooltext || "",
                visibility: d,
                fill: n.color,
                "text-anchor": "start",
                "vertical-align": La,
                direction: g,
                x: l + 4,
                y: J,
                "text-bound": [n.backgroundColor, n.borderColor, n.borderThickness, n.borderPadding, n.borderRadius,
                    n.borderDash]
            }).css(r), a.appendChild(z), K.push(z));
            I && (F.setStyle(t), M = F.getSmartText(p, h, G, !1), v = M.text, l = P + L, A || (A = c.trLabel = b.text(a)), A.attr({
                text: v,
                title: M.tooltext || "",
                visibility: d,
                fill: t.color,
                "text-anchor": "end",
                "vertical-align": La,
                direction: g,
                x: l - 4,
                y: J,
                "text-bound": [t.backgroundColor, t.borderColor, t.borderThickness, t.borderPadding, t.borderRadius, t.borderDash]
            }).css(w), a.appendChild(A), K.push(A));
            J = T + O - 4;
            Q && (F.setStyle(u), M = F.getSmartText(k, h, G, !1), v = M.text, l = P, E || (E = c.blLabel = b.text(a)),
                E.attr({
                    text: v,
                    title: M.tooltext || "",
                    visibility: d,
                    fill: u.color,
                    "text-anchor": "start",
                    "vertical-align": Ia,
                    direction: g,
                    x: l + 4,
                    y: J,
                    "text-bound": [u.backgroundColor, u.borderColor, u.borderThickness, u.borderPadding, u.borderRadius, u.borderDash]
                }).css(x), K.push(E));
            X && (F.setStyle(u), M = F.getSmartText(e, h, G, !1), v = M.text, l = P + L - 4, H || (H = c.brLabel = b.text(a)), H.attr({
                text: v,
                title: M.tooltext || "",
                visibility: d,
                fill: f.color,
                "text-anchor": "end",
                "vertical-align": Ia,
                direction: g,
                x: l,
                y: J,
                "text-bound": [f.backgroundColor, f.borderColor,
                    f.borderThickness, f.borderPadding, f.borderRadius, f.borderDash]
            }).css(y), a.appendChild(H), K.push(H));
            return K
        }, setScaleRange: function (b, d) {
            var a = this.logic, c = this.plots[0], e = {visibility: "visible"}, f = {visibility: "hidden"}, h = {hcJSON: {series: [{}]}}, m = h.hcJSON.series[0], v = m.data || (m.data = []), l = a.chartInstance.jsVars._reflowData, p = c.items, k, n, t, u, r, w, x, y = function (a) {
                a.attr(w)
            };
            setTimeout(function () {
                var a, c;
                a = 0;
                for (c = p.length; a < c; a++)k = p[a], n = k.value, t = k.graphic, r = v[a] || (v[a] = {}), u = k.dataLabels, w = (x = n >=
                    b && n <= d) ? e : f, t.attr(w), nb(u, y), r.visible = x;
                P(l, h, !0)
            }, 100)
        }
    }, r["renderer.cartesian"]);
    r("renderer.radar", {
        createRadarAxis: function () {
            var b = this.options, d = this.canvasLeft + this.canvasWidth / 2, a = this.canvasTop + this.canvasHeight / 2, c = b.xAxis, e = b.yAxis instanceof Array ? b.yAxis[0] : b.yAxis, f = c.max - c.min + 1, h = ua(e.max - e.min), b = ca(b.chart.axisRadius) ? b.chart.axisRadius : H(d, a), m, v = Sa.PI / 2, l = {};
            0 > b && (b = H(d, a));
            m = 2 * Sa.PI / f;
            l.yTrans = b / h;
            l.xTrans = m;
            l.yRange = h;
            l.startAngle = v;
            l.yMin = e.min;
            l.centerX = d;
            l.centerY = a;
            l.radius =
                b;
            l.categories = [];
            l.catLength = f;
            l.yAxis = e;
            l.xAxis = c;
            return this.radarAxis = l
        }, drawRadarAxis: function () {
            var b = this.radarAxis, d = b.catLength, a = b.xAxis, c = b.yAxis, e = c.min, g = c.plotLines, q = g.length, m = a.plotLines, v = b.xTrans, l = b.yTrans, p = b.radius, k = b.startAngle, n = this.canvasLeft + this.canvasWidth / 2, t = this.canvasTop + this.canvasHeight / 2, u = this.paper, r = this.layers, w = r.dataset = r.dataset || u.group("orphan-dataset").trackTooltip(!0), x = r.layerBelowDataset = r.layerBelowDataset || u.group("axisbottom").trackTooltip(!0),
                y = r.layerAboveDataset = r.layerAboveDataset || u.group("axistop").trackTooltip(!0), z = r.axisLines = r.axisLines || u.group("axis-lines", x), B = r.axisLabels = r.axisLabels || u.group("axis-labels", x), A = c.labels, c = 2 * Sa.PI, E = Sa.PI / 2, F = Sa.PI + E, H = !1 !== (this.options.tooltip || {}).enabled, G = ["right", "center", "left"], I = a.labels, L = f(.9 * parseInt(I.style && I.style.fontSize, 10), 9) / 2, I = p + I.labelPadding, O = [], P = ["M"], T = [], Q = this.logic.smartLabel, X = this.options.chart.textDirection, M, J, R, W, U, S, da, ba, Y, Z, aa, ca = function (a) {
                    if (1 <= a)aa =
                        .5; else return aa = a || .5, a = (J - M) * aa + (M - R) * aa, W > a && ca.call(this, aa + .1), aa
                };
            x.insertBefore(w);
            y.insertAfter(w);
            b.divline = [];
            for (Y = 0; Y < q; Y += 1) {
                T[Y] = ["M"];
                x = !0;
                w = d;
                U = g[Y];
                Z = U.tooltext;
                for (S = U.value; w--;)A = ua(S - e) * l, da = n + A * Aa(-(k + w * v)), ba = t + A * cb(-(k + w * v)), T[Y].splice(T[Y].length, 0, da, ba), x && (T[Y].push("L"), x = !1), 0 === w && U.label && (A = U.label, ((y = A.text) || 0 === y) && u.text(B).attr({
                    text: y,
                    x: da,
                    y: ba,
                    "text-anchor": "right" === A.textAlign ? "end" : "left" === A.textAlign ? "start" : "middle",
                    "vertical-align": A.verticalAlign,
                    direction: X,
                    rotation: A.rotation
                }).css(A.style));
                T[Y].push("Z");
                b.divline[Y] = u.path(T[Y], z).attr({stroke: U.color, "stroke-width": U.width});
                H && Z && u.path({
                    stroke: Ba,
                    "stroke-width": ab(U.width, gc),
                    ishot: !0,
                    path: T[Y]
                }, r.tracker).toBack().tooltip(Z)
            }
            x = !0;
            for (w = m.length; w--;)if (U = m[w], S = U.value, r = k + S * v, d = r % c, da = n + p * Aa(-r), ba = t + p * cb(-r), O.splice(O.length, 0, "M", n, t, "L", da, ba), P.splice(P.length, 0, da, ba), x && (P.push("L"), x = !1), U.label && (A = U.label, (y = A.text) || 0 === y)) {
                g = d > E && d < F ? 0 : d == E || d == F ? 1 : 2;
                d = A.style;
                e = {
                    fontFamily: d.fontFamily,
                    fontSize: d.fontSize,
                    lineHeight: d.lineHeight,
                    fontWeight: d.fontWeight,
                    fontStyle: d.fontStyle,
                    color: d.color
                };
                Q.setStyle(e);
                g = "right" === G[g] ? "end" : "left" === G[g] ? "start" : "middle";
                q = n + I * Aa(-r);
                M = t + I * cb(-r);
                W = parseInt(e.lineHeight, 10);
                T = A.verticalAlign;
                switch (g) {
                    case "start":
                        l = this.canvasLeft + this.canvasWidth - q;
                        r = m[w - 1];
                        r = k + r.value * v;
                        J = t + I * cb(-r) + L * cb(-r) + L;
                        r = m[w + 1 === m.length ? 0 : w + 1];
                        r = k + r.value * v;
                        R = t + I * cb(-r) + L * cb(-r) + L;
                        r = ca();
                        H = (J - M) * r + (M - R) * r;
                        T = "middle";
                        break;
                    case "end":
                        l = q - this.canvasLeft;
                        r = m[w + 1];
                        r = k +
                            r.value * v;
                        J = t + I * cb(-r) + L * cb(-r) + L;
                        r = m[w - 1];
                        r = k + r.value * v;
                        R = t + I * cb(-r) + L * cb(-r) + L;
                        r = ca();
                        H = (J - M) * r + (M - R) * r;
                        T = "middle";
                        break;
                    default:
                        l = this.canvasWidth, H = W, M += L * cb(-r) + L
                }
                y = Q.getSmartText(y, l, H);
                u.text(B).attr({
                    text: y.text,
                    x: q,
                    y: M,
                    "text-anchor": g,
                    "vertical-align": T,
                    rotation: A.rotation,
                    direction: X,
                    "text-bound": [d.backgroundColor, d.borderColor, d.borderThickness, d.borderPadding, d.borderRadius, d.borderDash]
                }).css(e).tooltip(y.tooltext)
            }
            P.push("Z");
            b.spikeGraph = u.path(O, z).attr({
                stroke: a.gridLineColor, "stroke-width": h(a.gridLineWidth,
                    1)
            });
            a.showRadarBorder && (b.borderGraph = u.path(P, z).toBack().attr({
                stroke: a.radarBorderColor,
                "stroke-width": h(a.radarBorderThickness, 2),
                fill: a.radarFillColor
            }))
        }, drawPlotRadar: function (b, d) {
            var a = this, c = a.paper, e = a.layers, g = e.dataset = e.dataset || c.group("orphan-dataset"), h = e.datalabels = e.datalabels || c.group("datalabels").insertAfter(g), m = e.tracker = e.tracker || c.group("hot").insertAfter(g), v = a.options, l = v.chart.anchorTrackingRadius, p = v.plotOptions.series, k = [], n = b.items || {}, t = b.graphics = b.graphics || [],
                e = a.radarAxis, u = d.data || [], w = u.length, z, x, y = !1 === d.visible, A = y ? "hidden" : "visible", p = isNaN(+p.animation) && p.animation.duration || 1E3 * p.animation, B, E, H = !1 !== (v.tooltip || {}).enabled, F, G, K, I, L = g.radarGroup = g.radarGroup || c.group("connectors", g), P = g.marker = g.marker || c.group("anchors", g), O = m.trackers = m.trackers || c.group("trackers", m), T = a.chartWidth, Q = a.chartHeight, g = [], X, M, J, R, W, U, S, Z, ba, Y, aa, ca, ga, fa, ha, ia, ja = (v = v.cursor) && {cursor: v}, ma = r["renderer.cartesian"], ka, oa, qa, ra;
            void 0 === a.radarAxis && (e = a.radarAxis =
                a.createRadarAxis(d), a.drawRadarAxis(d));
            B = e.yTrans;
            F = e.yMin;
            G = e.startAngle;
            E = e.xTrans;
            z = e.centerX;
            x = e.centerY;
            1 <= w && (U = [], nb(u, function (e, g) {
                ba = null;
                g ? 2 > g && U.push("L") : U.push("M");
                n[g] = ka = k[g] = {chart: a, index: g, value: e.y};
                if (null === e.y)U.push(z, x); else {
                    S = Y = null;
                    aa = e.link;
                    ca = e.tooltext || e.toolText;
                    K = z + B * ua(e.y - F) * Aa(-(G + g * E));
                    I = x + B * ua(e.y - F) * cb(-(G + g * E));
                    if (S = e.anchorElem)W = f(S.attr("r"), M.radius), S.attr({
                        x: K,
                        y: I,
                        r: W
                    }); else if (M = e.marker, qa = {
                            index: g,
                            link: aa,
                            value: e.y,
                            displayValue: e.displayValueArgs,
                            categoryLabel: e.categoryLabel,
                            toolText: ca,
                            id: b.userID,
                            datasetIndex: b.index,
                            datasetName: b.name,
                            visible: b.visible
                        }, M && M.enabled)if (J = M.radius, ga = M.shadow, X = M.symbol.split("_"), R = "spoke" === X[0] ? 1 : 0, ha = ia = {}, fa = e.rolloverProperties, M.imageUrl)oa = new Va.Image, ra = {
                        isTooltip: H,
                        setLink: aa,
                        hotLayer: m,
                        cartesianRenderer: ma,
                        clickFunc: function (b) {
                            Da.call(this, a, b)
                        }
                    }, oa.onload = ma.onAnchorImageLoad(a, b, d, K, I, M, ka, qa, ca, fa, g, P, ra), oa.onerror = function (c, e, g, f, h, k, l, m) {
                        return function () {
                            (ba = f.dataLabel = ma.drawPlotLineLabel.call(a,
                                b, d, m, c, e)) && t.push(ba)
                        }
                    }(K, I, M, ka, qa, ca, fa, g), oa.src = M.imageUrl; else {
                        fa && (ha = {
                            polypath: [X[1] || 2, K, I, J, M.startAngle, R],
                            fill: pa(M.fillColor),
                            "stroke-width": M.lineWidth,
                            stroke: pa(M.lineColor)
                        }, ia = {
                            polypath: [fa.sides || 2, K, I, fa.radius, fa.startAngle, fa.dip],
                            fill: pa(fa.fillColor),
                            "stroke-width": fa.lineWidth,
                            stroke: pa(fa.lineColor)
                        });
                        S = ka.graphic = c.polypath(X[1] || 2, K, I, J, M.startAngle, null, P).attr({
                            fill: pa(M.fillColor),
                            "stroke-width": M.lineWidth,
                            stroke: pa(M.lineColor),
                            cursor: aa ? "pointer" : "",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            ishot: !0,
                            visibility: 0 === J ? "hidden" : A
                        }).data("alwaysInvisible", 0 === J).data("setRolloverProperties", fa).data("setRolloverAttr", ia).data("setRolloutAttr", ha).data("anchorRadius", J).data("anchorHoverRadius", fa && fa.radius).shadow(ga);
                        e.anchorElem = S;
                        if (aa || H || fa)(Y = e.trackerElem) ? (W = f(Y.attr("r"), M.radius + 1), Y.attr({
                            x: K,
                            y: I,
                            r: W
                        })) : (X || (X = M.symbol.split("_")), J = ab(J, l, fa && fa.radius || 0), Y = c.circle(K, I, J, O).attr({
                            cursor: e.link ? "pointer" : "", stroke: Ba, "stroke-width": 1, fill: Ba, ishot: !0,
                            visibility: A
                        }).css(ja)), e.trackerElem = Y;
                        (Y = Y || S) && Y.data("eventArgs", qa).click(function (b) {
                            Da.call(this, a, b)
                        }).hover(function (b) {
                            return function (c) {
                                ma.hoverPlotAnchor(this, c, "DataPlotRollOver", b, a)
                            }
                        }(ka), function (b) {
                            return function (c) {
                                ma.hoverPlotAnchor(this, c, "DataPlotRollOut", b, a)
                            }
                        }(ka)).tooltip(ca)
                    }
                    U.push(K, I);
                    ka.dataLabel = ba;
                    ka.tracker = Y;
                    M && M.imageUrl || (ba = ma.drawPlotLineLabel.call(a, b, d, g, K, I));
                    S && t.push(S);
                    ba && t.push(ba);
                    Y && t.push(Y)
                }
            }), U.push("Z"), g = g.concat(U));
            g && 0 < g.length && (Z = b.graphic =
                c.path(g, L).attr({
                    stroke: pa(d.lineColor.FCcolor),
                    fill: pa(d.fillColor.FCcolor),
                    "stroke-width": d.lineWidth,
                    visibility: A
                }));
            p && (a.animationCompleteQueue.push({
                fn: function () {
                    P.show();
                    h.attr({transform: "...t" + -T + "," + -Q})
                }, scope: a
            }), P.hide(), h.attr({transform: "...t" + T + "," + Q}), L.scale(.01, .01, z, x).animate({transform: "s1,1"}, p, "normal", a.getAnimationCompleteFn()));
            Z && t.push(Z);
            b.visible = !y
        }, legendClick: function (b) {
            r["renderer.cartesian"].legendClick.call(this, b)
        }, getEventArgs: function (b) {
            return r["renderer.cartesian"].getEventArgs.call(this,
                b)
        }
    }, r["renderer.root"]);
    r("renderer.multiLevelPie", {
        drawPlotMultilevelpie: function (b, d) {
            var a = this, c = b.items, e = b.data, g = a.options, h = g.plotOptions.series, m = a.layers, r = h.animation, l = h.dataLabels.style, p = h.shadow, k = f(b.moveDuration, r.duration, 0), n = h.borderWidth, t = h.borderColor, u = a.paper, w = g.chart.textDirection, g = (g = g.tooltip || {}, !1 !== g.enabled), z = (d.startAngle || 0) % ia, x = ia / (d.valueTotal || 100), y = a.canvasLeft + .5 * a.canvasWidth, A = a.canvasTop + .5 * a.canvasHeight, B, E, G, F, I, K, L, P, O, Q, T;
            E = H(a.canvasWidth, a.canvasHeight);
            var W, X = m.dataset, M = r.mainItem, J = r.animObj, R = function (b) {
                Da.call(this.graphic, a, b, "DataPlotRollOver");
                h.point.events.mouseOver.call(this)
            }, Z = function (b) {
                Da.call(this.graphic, a, b, "DataPlotRollOut");
                h.point.events.mouseOut.call(this)
            }, U = function (b) {
                Da.call(this.graphic, a, b, "DataPlotRollOver");
                h.point.events.mouseOver.call(this)
            }, S = function (b) {
                Da.call(this.graphic, a, b, "DataPlotRollOut");
                h.point.events.mouseOut.call(this)
            }, aa = function () {
                a.placeDataLabels(!1, c, b, d)
            };
            B = .5 * (/%$/.test(d.size) ? E * parseInt(d.size,
                    10) / 100 : d.size);
            E = .5 * (/%$/.test(d.innerSize) ? E * parseInt(d.innerSize, 10) / 100 : d.innerSize);
            d.metrics = [y, A, 2 * B, 2 * E];
            e && e.length || (e = []);
            W = m.datalabels || (m.datalabels = u.group("datalabels").insertAfter(X));
            Q = O = z;
            for (T = e.length; T--;)F = e[T], I = F.y, K = F.displayValue, m = F.toolText, L = !!F.link, null !== I && void 0 !== I && (Q = O, O -= I * x, P = .5 * (O + Q), (G = c[T]) || (G = c[T] = {
                chart: a,
                link: F.link,
                value: I,
                angle: P,
                color: F.color,
                prevPointIndex: F.prevPointIndex,
                prevSeriesIndex: F.prevSeriesIndex,
                labelText: K,
                graphic: u.ringpath(y, A, B, E, z,
                    z, X).attr({
                    "stroke-width": F.borderWidth || n,
                    stroke: F.borderColor || t,
                    fill: pa(F.color),
                    "stroke-dasharray": F.dashStyle,
                    ishot: !g,
                    cursor: L ? "pointer" : ""
                }).shadow(p && !!F.shadow)
            }, F = {
                link: F.link,
                label: F.displayValue,
                toolText: F.toolText
            }, G.graphic.mouseover(R, G), G.graphic.mouseout(Z, G), G.graphic.mouseup(a.plotMouseUp), G.graphic.data("plotItem", G), G.graphic.data("eventArgs", F), g && G.graphic.tooltip(m), void 0 !== K && (G.dataLabel = u.text(W).css(l).attr({
                text: K, fill: l.color || "#000000", visibility: "hidden", direction: w,
                ishot: L, cursor: L ? "pointer" : ""
            }).mouseover(U, G).mouseout(S, G).mouseup(a.plotMouseUp).data("plotItem", G).data("eventArgs", F).attr({"text-bound": [l.backgroundColor, l.borderColor, l.borderThickness, l.borderPadding, l.borderRadius, l.borderDash]}), g && G.dataLabel.tooltip(m))), k ? M ? G.graphic.animateWith(M, J, {ringpath: [y, A, B, E, O, Q]}, k, "easeIn", !T && aa) : (J = r.animObj = Ea.animation({ringpath: [y, A, B, E, O, Q]}, k, "easeIn", !T && aa), M = r.mainItem = G.graphic.animate(J)) : (G.graphic.attr({ringpath: [y, A, B, E, O, Q]}), !T && aa && aa()))
        },
        plotMouseUp: function (b) {
            var d = this.data("plotItem");
            Da.call(this, d.chart, b)
        }
    }, r["renderer.piebase"]);
    Ea.addSymbol({
        resizeIcon: function (b, d, a) {
            var c = f(a, 15) / 3, e = [];
            0 > c && (c = -c, a = -a, b += a - c / 2, d += a - c / 2);
            for (a = 3; 0 < a; --a)e.push("M", b - c * a, d - 3, "L", b - 3, d - c * a);
            return e
        }, closeIcon: function (b, d, a) {
            var c = 1.3 * a, e = 43 * fc, f = 48 * fc, h = b + c * Aa(e), e = d + c * cb(e), m = b + c * Aa(f), r = d + c * cb(f), f = .71 * (a - 2);
            a = .71 * (a - 2);
            c = ["A", c, c, 0, 1, 0, m, r];
            h = ["M", h, e];
            h = h.concat(c);
            return h = h.concat(["M", b + f, d - a, "L", b - f, d + a, "M", b - f, d - a, "L", b + f, d + a])
        },
        configureIcon: function (b, d, a) {
            --a;
            var c = .71 * a, e = .71 * (a + 2), f = b - a, h = d - a, m = b + a;
            a = d + a;
            var r = b + .5, l = d + .5, p = b - .5, k = d - .5, n = f - 2, t = h - 2, u = m + 2, w = a + 2, z = b + c, x = d + c, y = b - c, c = d - c, A = b + e, B = d + e;
            b -= e;
            d -= e;
            return ["M", f, l, "L", n, l, n, k, f, k, y - .25, c + .25, b - .25, d + .25, b + .25, d - .25, y + .25, c - .25, p, h, p, t, r, t, r, h, z - .25, c - .25, A - .25, d - .25, A + .25, d + .25, z + .25, c + .25, m, k, u, k, u, l, m, l, z + .25, x - .25, A + .25, B - .25, A - .25, B + .25, z - .25, x + .25, r, a, r, w, p, w, p, a, y + .25, x + .25, b + .25, B + .25, b - .25, B - .25, y - .25, x - .25, "Z"]
        }, axisIcon: function (b, d, a) {
            --a;
            var c = .33 * a,
                e = a / 2, f = b - a, h = d - a, m = b + e;
            a = d + a;
            b -= e;
            e = d + c;
            d -= c;
            return ["M", f, h, "L", m, h, m, a, f, a, "M", b, e, "L", m, e, "M", b, d, "L", m, d]
        }, loggerIcon: function (b, d, a) {
            --a;
            b -= a;
            d -= a;
            var c = b + 2 * a, e = b + 2, f = c - 2, h = d + 2;
            a = h + a;
            var m = a + 2;
            return ["M", b, d, "L", c, d, c, h, f, h, f, a, c, a, c, m, b, m, b, a, e, a, e, h, b, h, b, d]
        }
    })
}, [3, 2, 1, "release"]]);
