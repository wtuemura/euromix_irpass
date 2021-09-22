/* Do not edit, autogenerated by pscript */

var _pyfunc_enumerate = function (iter) { // nargs: 1
    var i, res=[];
    if ((typeof iter==="object") && (!Array.isArray(iter))) {iter = Object.keys(iter);}
    for (i=0; i<iter.length; i++) {res.push([i, iter[i]]);}
    return res;
};
var _pyfunc_format = function (v, fmt) {  // nargs: 2
    fmt = fmt.toLowerCase();
    var s = String(v);
    if (fmt.indexOf('!r') >= 0) {
        try { s = JSON.stringify(v); } catch (e) { s = undefined; }
        if (typeof s === 'undefined') { s = v._IS_COMPONENT ? v.id : String(v); }
    }
    var fmt_type = '';
    if (fmt.slice(-1) == 'i' || fmt.slice(-1) == 'f' ||
        fmt.slice(-1) == 'e' || fmt.slice(-1) == 'g') {
            fmt_type = fmt[fmt.length-1]; fmt = fmt.slice(0, fmt.length-1);
    }
    var i0 = fmt.indexOf(':');
    var i1 = fmt.indexOf('.');
    var spec1 = '', spec2 = '';  // before and after dot
    if (i0 >= 0) {
        if (i1 > i0) { spec1 = fmt.slice(i0+1, i1); spec2 = fmt.slice(i1+1); }
        else { spec1 = fmt.slice(i0+1); }
    }
    // Format numbers
    if (fmt_type == '') {
    } else if (fmt_type == 'i') { // integer formatting, for %i
        s = parseInt(v).toFixed(0);
    } else if (fmt_type == 'f') {  // float formatting
        v = parseFloat(v);
        var decimals = spec2 ? Number(spec2) : 6;
        s = v.toFixed(decimals);
    } else if (fmt_type == 'e') {  // exp formatting
        v = parseFloat(v);
        var precision = (spec2 ? Number(spec2) : 6) || 1;
        s = v.toExponential(precision);
    } else if (fmt_type == 'g') {  // "general" formatting
        v = parseFloat(v);
        var precision = (spec2 ? Number(spec2) : 6) || 1;
        // Exp or decimal?
        s = v.toExponential(precision-1);
        var s1 = s.slice(0, s.indexOf('e')), s2 = s.slice(s.indexOf('e'));
        if (s2.length == 3) { s2 = 'e' + s2[1] + '0' + s2[2]; }
        var exp = Number(s2.slice(1));
        if (exp >= -4 && exp < precision) { s1=v.toPrecision(precision); s2=''; }
        // Skip trailing zeros and dot
        var j = s1.length-1;
        while (j>0 && s1[j] == '0') { j-=1; }
        s1 = s1.slice(0, j+1);
        if (s1.slice(-1) == '.') { s1 = s1.slice(0, s1.length-1); }
        s = s1 + s2;
    }
    // prefix/padding
    var prefix = '';
    if (spec1) {
        if (spec1[0] == '+' && v > 0) { prefix = '+'; spec1 = spec1.slice(1); }
        else if (spec1[0] == ' ' && v > 0) { prefix = ' '; spec1 = spec1.slice(1); }
    }
    if (spec1 && spec1[0] == '0') {
        var padding = Number(spec1.slice(1)) - (s.length + prefix.length);
        s = '0'.repeat(Math.max(0, padding)) + s;
    }
    return prefix + s;
};
var _pyfunc_int = function (x, base) { // nargs: 1 2
    if(base !== undefined) return parseInt(x, base);
    return x<0 ? Math.ceil(x): Math.floor(x);
};
var _pyfunc_list = function (x) {
    var r=[];
    if (typeof x==="object" && !Array.isArray(x)) {x = Object.keys(x)}
    for (var i=0; i<x.length; i++) {
        r.push(x[i]);
    }
    return r;
};
var _pyfunc_op_add = function (a, b) { // nargs: 2
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.concat(b);
    } return a + b;
};
var _pyfunc_op_equals = function op_equals (a, b) { // nargs: 2
    var a_type = typeof a;
    // If a (or b actually) is of type string, number or boolean, we don't need
    // to do all the other type checking below.
    if (a_type === "string" || a_type === "boolean" || a_type === "number") {
        return a == b;
    }

    if (a == null || b == null) {
    } else if (Array.isArray(a) && Array.isArray(b)) {
        var i = 0, iseq = a.length == b.length;
        while (iseq && i < a.length) {iseq = op_equals(a[i], b[i]); i+=1;}
        return iseq;
    } else if (a.constructor === Object && b.constructor === Object) {
        var akeys = Object.keys(a), bkeys = Object.keys(b);
        akeys.sort(); bkeys.sort();
        var i=0, k, iseq = op_equals(akeys, bkeys);
        while (iseq && i < akeys.length)
            {k=akeys[i]; iseq = op_equals(a[k], b[k]); i+=1;}
        return iseq;
    } return a == b;
};
var _pyfunc_op_error = function (etype, msg) { // nargs: 2
    var e = new Error(etype + ': ' + msg);
    e.name = etype
    return e;
};
var _pyfunc_op_instantiate = function (ob, args) { // nargs: 2
    if ((typeof ob === "undefined") ||
            (typeof window !== "undefined" && window === ob) ||
            (typeof global !== "undefined" && global === ob))
            {throw "Class constructor is called as a function.";}
    for (var name in ob) {
        if (Object[name] === undefined &&
            typeof ob[name] === 'function' && !ob[name].nobind) {
            ob[name] = ob[name].bind(ob);
            ob[name].__name__ = name;
        }
    }
    if (ob.__init__) {
        ob.__init__.apply(ob, args);
    }
};
var _pyfunc_op_mult = function (a, b) { // nargs: 2
    if ((typeof a === 'number') + (typeof b === 'number') === 1) {
        if (a.constructor === String) return _pymeth_repeat.call(a, b);
        if (b.constructor === String) return _pymeth_repeat.call(b, a);
        if (Array.isArray(b)) {var t=a; a=b; b=t;}
        if (Array.isArray(a)) {
            var res = []; for (var i=0; i<b; i++) res = res.concat(a);
            return res;
        }
    } return a * b;
};
var _pyfunc_range = function (start, end, step) {
    var i, res = [];
    var val = start;
    var n = (end - start) / step;
    for (i=0; i<n; i++) {
        res.push(val);
        val += step;
    }
    return res;
};
var _pymeth_append = function (x) { // nargs: 1
    if (!Array.isArray(this)) return this.append.apply(this, arguments);
    this.push(x);
};
var _pymeth_format = function () {
    if (this.constructor !== String) return this.format.apply(this, arguments);
    var parts = [], i = 0, i1, i2;
    var itemnr = -1;
    while (i < this.length) {
        // find opening
        i1 = this.indexOf('{', i);
        if (i1 < 0 || i1 == this.length-1) { break; }
        if (this[i1+1] == '{') {parts.push(this.slice(i, i1+1)); i = i1 + 2; continue;}
        // find closing
        i2 = this.indexOf('}', i1);
        if (i2 < 0) { break; }
        // parse
        itemnr += 1;
        var fmt = this.slice(i1+1, i2);
        var index = fmt.split(':')[0].split('!')[0];
        index = index? Number(index) : itemnr
        var s = _pyfunc_format(arguments[index], fmt);
        parts.push(this.slice(i, i1), s);
        i = i2 + 1;
    }
    parts.push(this.slice(i));
    return parts.join('');
};
var _pymeth_index = function (x, start, stop) { // nargs: 1 2 3
    start = (start === undefined) ? 0 : start;
    stop = (stop === undefined) ? this.length : stop;
    start = Math.max(0, ((start < 0) ? this.length + start : start));
    stop = Math.min(this.length, ((stop < 0) ? this.length + stop : stop));
    if (Array.isArray(this)) {
        for (var i=start; i<stop; i++) {
            if (_pyfunc_op_equals(this[i], x)) {return i;} // indexOf cant
        }
    } else if (this.constructor === String) {
        var i = this.slice(start, stop).indexOf(x);
        if (i >= 0) return i + start;
    } else return this.index.apply(this, arguments);
    var e = Error(x); e.name='ValueError'; throw e;
};
var _pymeth_join = function (x) { // nargs: 1
    if (this.constructor !== String) return this.join.apply(this, arguments);
    return x.join(this);  // call join on the list instead of the string.
};
var _pymeth_repeat = function(count) { // nargs: 0
    if (this.repeat) return this.repeat(count);
    if (count < 1) return '';
    var result = '', pattern = this.valueOf();
    while (count > 1) {
        if (count & 1) result += pattern;
        count >>= 1, pattern += pattern;
    }
    return result + pattern;
};
var _pymeth_replace = function (s1, s2, count) {  // nargs: 2 3
    if (this.constructor !== String) return this.replace.apply(this, arguments);
    var i = 0, i2, parts = [];
    count = (count === undefined) ? 1e20 : count;
    while (count > 0) {
        i2 = this.indexOf(s1, i);
        if (i2 >= 0) {
            parts.push(this.slice(i, i2));
            parts.push(s2);
            i = i2 + s1.length;
            count -= 1;
        } else break;
    }
    parts.push(this.slice(i));
    return parts.join('');
};
var _pymeth_split = function (sep, count) { // nargs: 0, 1 2
    if (this.constructor !== String) return this.split.apply(this, arguments);
    if (sep === '') {var e = Error('empty sep'); e.name='ValueError'; throw e;}
    sep = (sep === undefined) ? /\s/ : sep;
    if (count === undefined) { return this.split(sep); }
    var res = [], i = 0, index1 = 0, index2 = 0;
    while (i < count && index1 < this.length) {
        index2 = this.indexOf(sep, index1);
        if (index2 < 0) { break; }
        res.push(this.slice(index1, index2));
        index1 = index2 + sep.length || 1;
        i += 1;
    }
    res.push(this.slice(index1));
    return res;
};
var EuromixIRPassword, KonamiMRand, generate_password, int_js_from_bytes, int_js_to_bytes, mul64, n2h, n2h_long, safe_div, safe_modulo, shl, shr, this_is_js;
this_is_js = function flx_this_is_js () {
    return false;
};

safe_modulo = function flx_safe_modulo (n, m) {
    if (("this_is_js()" && (n < 0))) {
        return (_pyfunc_op_add((n % m), m)) % m;
    }
    return n % m;
};

n2h = function flx_n2h (a) {
    var a1, a2, h;
    if (true) { /* if this_is_js() */
        h = "0123456789abcdef";
        a1 = a % 16;
        a2 = Math.floor(a/16);
        return _pyfunc_op_add(h[a2], h[a1]);
    }
    return _pymeth_format.call("{:02x}", a);
};

n2h_long = function flx_n2h_long (a) {
    var a1, h, ret;
    if (true) { /* if this_is_js() */
        h = "0123456789abcdef";
        ret = [];
        while (a > 0) {
            a1 = a % 16;
            a = safe_div(a, 16);
            ret = _pyfunc_op_add(([h[a1]]), ret);
        }
        return _pymeth_join.call("", ret);
    }
    return _pymeth_format.call("{:x}", a);
};

shr = function flx_shr (a, n) {
    var bits, i, output;
    if (true) { /* if this_is_js() */
        a &= 4294967295;
        bits = (function list_comprehension (iter0) {var res = [];var i, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {i = iter0[i0];{res.push(((!_pyfunc_op_equals((a & (1 << i)), 0)))? (1) : (0));}}return res;}).call(this, _pyfunc_range(0, 32, 1)).slice(n);
        output = 0;
        for (i = 0; i < Math.min(bits.length, 32); i += 1) {
            output |= bits[i] << i;
        }
        return output;
    }
    return (a >> n) & 4294967295;
};

shl = function flx_shl (a, n) {
    var bits, i, output, stub1_, stub1_i, stub1_i0, stub1_iter0;
    if (true) { /* if this_is_js() */
        a &= 4294967295;
        stub1_ = [];stub1_iter0 = _pyfunc_range(0, 32, 1);if ((typeof stub1_iter0 === "object") && (!Array.isArray(stub1_iter0))) {stub1_iter0 = Object.keys(stub1_iter0);}for (stub1_i0=0; stub1_i0<stub1_iter0.length; stub1_i0++) {stub1_i = stub1_iter0[stub1_i0];{stub1_.push(((!_pyfunc_op_equals((a & (1 << stub1_i)), 0)))? (1) : (0));}}
        bits = stub1_;
        output = 0;
        for (i = Math.min(n, 32); i < 32; i += 1) {
            output |= bits[i - n] << i;
        }
        return output;
    }
    return (a << n) & 4294967295;
};

mul64 = function flx_mul64 (a, b) {
    var ah, al, bh, bl, rl, rm1, rm1l, rm2, rm2l, rml;
    if (true) { /* if this_is_js() */
        al = a & 65535;
        ah = shr(a, 16);
        bl = b & 65535;
        bh = shr(b, 16);
        rl = _pyfunc_op_mult(al, bl);
        rm1 = _pyfunc_op_mult(ah, bl);
        rm2 = _pyfunc_op_mult(al, bh);
        rm1l = rm1 & 65535;
        rm2l = rm2 & 65535;
        rml = _pyfunc_op_add(rm1l, rm2l) & 65535;
        rl = _pyfunc_op_add(rl, shl(rml, 16));
        return rl;
    }
    return _pyfunc_op_mult(a, b) & 4294967295;
};

safe_div = function flx_safe_div (n, m) {
    var i;
    if (true) { /* if this_is_js() */
        if ((((_pyfunc_op_equals((m & (m - 1)), 0))) && ((!_pyfunc_op_equals(m, 0))))) {
            for (i = 0; i < 32; i += 1) {
                if ((_pyfunc_op_equals(Math.pow(2, i), m))) {
                    return shr(n, i);
                }
            }
        }
        return Math.floor(n/m);
    }
    return Math.floor(n/m);
};

int_js_to_bytes = function flx_int_js_to_bytes (data, length, endianness) {
    endianness = (endianness === undefined) ? "big": endianness;
    if (true) { /* if this_is_js() */
        if (!(_pyfunc_op_equals(endianness, "big"))) { throw _pyfunc_op_error('AssertionError', "_pyfunc_op_equals(endianness, \"big\")");}
        if (_pyfunc_op_equals(length, 1)) {
            return data[0];
        } else if (_pyfunc_op_equals(length, 2)) {
            return [shr(data, 8) & 255, data & 255];
        } else if (_pyfunc_op_equals(length, 4)) {
            return [shr(data, 24) & 255, shr(data, 16) & 255, shr(data, 8) & 255, data & 255];
        }
        if (!(_pyfunc_op_equals(length, 1) || _pyfunc_op_equals(length, 2) || _pyfunc_op_equals(length, 4))) { throw _pyfunc_op_error('AssertionError', "_pyfunc_op_equals(length, 1) || _pyfunc_op_equals(length, 2) || _pyfunc_op_equals(length, 4)");}
    }
    return null;
};

int_js_from_bytes = function flx_int_js_from_bytes (data, endianness) {
    var length;
    endianness = (endianness === undefined) ? "big": endianness;
    if (true) { /* if this_is_js() */
        if (!(_pyfunc_op_equals(endianness, "big"))) { throw _pyfunc_op_error('AssertionError', "_pyfunc_op_equals(endianness, \"big\")");}
        length = data.length;
        if (_pyfunc_op_equals(length, 1)) {
            return data[0];
        } else if (_pyfunc_op_equals(length, 2)) {
            return shl(data[0], 8) | data[1];
        } else if (_pyfunc_op_equals(length, 4)) {
            return ((shl(data[0], 24) | shl(data[1], 16)) | shl(data[2], 8)) | data[3];
        }
        if (!(_pyfunc_op_equals(length, 1) || _pyfunc_op_equals(length, 2) || _pyfunc_op_equals(length, 4))) { throw _pyfunc_op_error('AssertionError', "_pyfunc_op_equals(length, 1) || _pyfunc_op_equals(length, 2) || _pyfunc_op_equals(length, 4)");}
    }
    return null;
};

KonamiMRand = function () {
    _pyfunc_op_instantiate(this, arguments);
}
KonamiMRand.prototype._base_class = Object;
KonamiMRand.prototype.__name__ = "KonamiMRand";

KonamiMRand.prototype.__init__ = function () {
    this.x = _pyfunc_op_mult([0], 522);
    return null;
};

KonamiMRand.prototype.irnd = function (max) {
    var ret;
    max = (max === undefined) ? null: max;
    this.jrnd += 1;
    if ((this.jrnd >= 521)) {
        this.rnd521();
        this.jrnd = 0;
    }
    ret = this.x[this.jrnd];
    if ((max !== null)) {
        ret = safe_modulo(ret, max);
    }
    return ret;
};

KonamiMRand.prototype.rnd521 = function () {
    var i;
    for (i = 0; i < 32; i += 1) {
        this.x[i] ^= this.x[i + 489];
    }
    for (i = 32; i < 521; i += 1) {
        this.x[i] ^= this.x[i - 32];
    }
    return null;
};

KonamiMRand.prototype.init_rnd = function (seed) {
    var _, bits, i, j, u;
    this.x = _pyfunc_op_mult([0], 522);
    for (i = 0; i < 16 + 1; i += 1) {
        bits = _pyfunc_op_mult([0], 32);
        for (j = 0; j < 32; j += 1) {
            seed = mul64(seed, 1566083941) + 1;
            bits[j] = ((!_pyfunc_op_equals((seed & 2147483648), 0)))? (1) : (0);
        }
        u = 0;
        for (j = 0; j < 32; j += 1) {
            u |= shl(bits[j], j);
        }
        this.x[i] = u & 4294967295;
    }
    this.x[16] = (shl(this.x[16], 23) ^ shr(this.x[0], 9)) ^ this.x[15];
    for (i = 17; i < 521; i += 1) {
        this.x[i] = (shl(this.x[i - 17], 23) ^ shr(this.x[i - 16], 9)) ^ this.x[i - 1];
    }
    for (_ = 0; _ < 9; _ += 1) {
        this.rnd521();
    }
    this.jrnd = 520;
    return null;
};


EuromixIRPassword = function () {
    _pyfunc_op_instantiate(this, arguments);
}
EuromixIRPassword.prototype._base_class = Object;
EuromixIRPassword.prototype.__name__ = "EuromixIRPassword";

EuromixIRPassword.prototype.__init__ = function (machine_key) {
    this.machine_key = machine_key;
    this.prng = new KonamiMRand();
    this.parse_machine_key();
    return null;
};

EuromixIRPassword.prototype.parse_machine_key = function () {
    var a, a1, a2, buf, c, chunk, chunk1, chunk1_data, chunk2, chunk2_data, chunk3, chunk3_data, chunk_bytes, day, machine_key_chunks, month, seed, stub2_seq, stub3_itr, stub4_seq, stub5_itr, stub6_, v1, v2, year;
    machine_key_chunks = [];
    stub4_seq = _pymeth_split.call(this.machine_key, "-");
    if ((typeof stub4_seq === "object") && (!Array.isArray(stub4_seq))) { stub4_seq = Object.keys(stub4_seq);}
    for (stub5_itr = 0; stub5_itr < stub4_seq.length; stub5_itr += 1) {
        chunk = stub4_seq[stub5_itr];
        chunk_bytes = [];
        stub2_seq = chunk;
        if ((typeof stub2_seq === "object") && (!Array.isArray(stub2_seq))) { stub2_seq = Object.keys(stub2_seq);}
        for (stub3_itr = 0; stub3_itr < stub2_seq.length; stub3_itr += 1) {
            c = stub2_seq[stub3_itr];
            _pymeth_append.call(chunk_bytes, c.charCodeAt(0));
        }
        _pymeth_append.call(machine_key_chunks, chunk_bytes);
    }
    if (!(machine_key_chunks.length == 3)) { throw _pyfunc_op_error('AssertionError', "machine_key_chunks.length == 3");}
    stub6_ = machine_key_chunks;
    chunk1 = stub6_[0];chunk2 = stub6_[1];chunk3 = stub6_[2];
    seed = this.generate_seed_hash("SIDENC", "GN894EAA");
    chunk1_data = this.decode_chunk(this.generate_scrambled_charset(seed), chunk1);
    chunk2_data = this.decode_chunk(this.generate_scrambled_charset(seed + 576), chunk2);
    a = this.decode_chunk(this.generate_scrambled_charset(seed + 1152), chunk3);
    chunk3_data = this.scramble_buffer_with_seed2(this.calc_crc16_alt(chunk2), int_js_to_bytes(a, 4));
    seed = this.generate_seed_hash("GN894EAA", "SIDENC");
    chunk3_data ^= seed;
    v1 = shr(chunk3_data, 8) & 255;
    v2 = chunk3_data & 255;
    this.prng.init_rnd((shl(v1, 8) | v2) | (shl(shl(v2, 8) | v1, 16)));
    chunk2_data ^= this.prng.irnd();
    chunk1_data ^= this.prng.irnd();
    buf = _pyfunc_list((_pyfunc_op_add((_pyfunc_op_add(int_js_to_bytes(chunk1_data, 4), int_js_to_bytes(chunk2_data, 4))), int_js_to_bytes(chunk3_data, 4))));
    a1 = this.calc_crc16_alt(buf, 4) & 255;
    a2 = this.calc_crc16(buf, 10) & 255;
    if ((((!_pyfunc_op_equals(a1, buf[10]))) || (!_pyfunc_op_equals(a2, buf[11])))) {
        console.log("Invalid checksums!");
        console.log((_pymeth_join.call(" ", ((function list_comprehension (iter0) {var res = [];var x, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {x = iter0[i0];{res.push(_pymeth_format.call("{:02X}", x));}}return res;}).call(this, buf)))));
        exit(1);
    }
    this.security_id = _pymeth_join.call("", ((function list_comprehension (iter0) {var res = [];var x, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {x = iter0[i0];{res.push(n2h(x));}}return res;}).call(this, buf.slice(4,10))));
    day = shr(chunk1_data, 11) & 31;
    month = shr(chunk1_data, 16) & 15;
    year = Math.floor(chunk1_data/1048576);
    console.log(_pymeth_format.call("{:d}/{:d}/{:d}", year, month, day) + " " + this.security_id);
    return _pyfunc_op_add(_pyfunc_op_add(chunk1, chunk2), chunk3);
};

EuromixIRPassword.prototype.create_machine_key = function (security_id, year, month, day) {
    var buf, chunk1, chunk2, chunk3, payload, seed, t1, t2, v1, v2;
    payload = ((_pyfunc_op_mult(year, 1048576) | shl(month & 15, 16)) | shl(day & 31, 11)) | 798;
    buf = _pyfunc_op_add(int_js_to_bytes(payload, 4), security_id);
    v1 = this.calc_crc16_alt(buf, 4) & 255;
    buf = _pyfunc_op_add(buf, int_js_to_bytes(v1, 1));
    v2 = this.calc_crc16(buf, 10) & 255;
    buf = _pyfunc_op_add(buf, int_js_to_bytes(v2, 1));
    seed = this.generate_seed_hash("GN894EAA", "SIDENC");
    this.prng.init_rnd((shl(v1, 8) | v2) | (shl(shl(v2, 8) | v1, 16)));
    t1 = this.prng.irnd();
    t2 = this.prng.irnd();
    buf = this.xor_bytes(buf, 0, t2);
    buf = this.xor_bytes(buf, 4, t1);
    buf = this.xor_bytes(buf, 8, seed);
    seed = this.generate_seed_hash("SIDENC", "GN894EAA");
    chunk1 = this.encode_chunk(this.generate_scrambled_charset(seed), int_js_from_bytes(buf.slice(0,4)));
    chunk2 = this.encode_chunk(this.generate_scrambled_charset(seed + 576), int_js_from_bytes(buf.slice(4,8)));
    chunk3 = this.encode_chunk(this.generate_scrambled_charset(seed + 1152), this.scramble_buffer_with_seed2(this.calc_crc16_alt(chunk2), buf.slice(8,12)));
    return _pyfunc_op_add(_pyfunc_op_add(chunk1, chunk2), chunk3);
};

EuromixIRPassword.prototype.scramble_buffer_with_seed2 = function (seed, data) {
    var bVar1, bVar2, data_idx, i, output, uVar4, uVar5, uVar6;
    output = this.scramble_buffer_with_seed(seed);
    for (i = 0; i < 16; i += 1) {
        uVar6 = 3 - shr(output[i], 3);
        uVar4 = output[i] & 7;
        uVar5 = output[i + 16] & 7;
        bVar2 = shl(1, uVar5) & 255;
        data_idx = (3 - shr(output[i + 16], 3)) & 255;
        bVar1 = data[data_idx];
        if ((_pyfunc_op_equals((shr(data[uVar6 & 255], uVar4) & 1), 0))) {
            data[data_idx] &= ~bVar2;
        } else {
            data[data_idx] |= bVar2;
        }
        uVar6 &= 255;
        if ((_pyfunc_op_equals((shr(bVar1, uVar5) & 1), 0))) {
            data[uVar6] &= ~shl(1, uVar4);
        } else {
            data[uVar6] |= shl(1, uVar4);
        }
    }
    return int_js_from_bytes(data) & 4294967295;
};

EuromixIRPassword.prototype.generate_seed_hash = function (input, input2) {
    var a, b, c, hash1, iVar3, j, output, sra, stub10_itr, stub11_seq, stub12_itr, stub7_, stub7_c, stub7_i0, stub7_iter0, stub8_, stub8_c, stub8_i0, stub8_iter0, stub9_seq, uVar7;
    sra = (function flx_sra (x, n, m) {
        var filler;
        if ((!_pyfunc_op_equals((x & (Math.pow(2, (n - 1)))), 0))) {
            filler = _pyfunc_int((_pyfunc_op_add(_pyfunc_op_mult("1", m), (_pyfunc_op_mult("0", (n - m))))), 2);
            x = shr(x, m) | filler;
            return x;
        } else {
            return shr(x, m);
        }
        return null;
    }).bind(this);

    stub7_ = [];stub7_iter0 = input;if ((typeof stub7_iter0 === "object") && (!Array.isArray(stub7_iter0))) {stub7_iter0 = Object.keys(stub7_iter0);}for (stub7_i0=0; stub7_i0<stub7_iter0.length; stub7_i0++) {stub7_c = stub7_iter0[stub7_i0];{stub7_.push(stub7_c.charCodeAt(0));}}
    input = stub7_;
    stub8_ = [];stub8_iter0 = input2;if ((typeof stub8_iter0 === "object") && (!Array.isArray(stub8_iter0))) {stub8_iter0 = Object.keys(stub8_iter0);}for (stub8_i0=0; stub8_i0<stub8_iter0.length; stub8_i0++) {stub8_c = stub8_iter0[stub8_i0];{stub8_.push(stub8_c.charCodeAt(0));}}
    input2 = stub8_;
    hash1 = 0;
    stub9_seq = input2;
    if ((typeof stub9_seq === "object") && (!Array.isArray(stub9_seq))) { stub9_seq = Object.keys(stub9_seq);}
    for (stub10_itr = 0; stub10_itr < stub9_seq.length; stub10_itr += 1) {
        c = stub9_seq[stub10_itr];
        for (j = 0; j < 6; j += 1) {
            a = (shl(hash1, 1) & 4294967295) | (sra(c, 8, j & 31) & 1);
            a &= 4294967295;
            b = sra(hash1, 32, 31) & 79764919;
            b &= 4294967295;
            hash1 = a ^ b;
        }
    }
    output = 0;
    stub11_seq = input;
    if ((typeof stub11_seq === "object") && (!Array.isArray(stub11_seq))) { stub11_seq = Object.keys(stub11_seq);}
    for (stub12_itr = 0; stub12_itr < stub11_seq.length; stub12_itr += 1) {
        c = stub11_seq[stub12_itr];
        iVar3 = c + 10685573;
        hash1 = mul64(hash1, iVar3);
        uVar7 = mul64(hash1, iVar3);
        output = _pyfunc_op_add(output, (hash1 & 4294901760) | (shr(uVar7, 15) & 65535));
        output &= 4294967295;
        hash1 = _pyfunc_op_add(uVar7, c) & 4294967295;
    }
    return output & 4294967295;
};

EuromixIRPassword.prototype.generate_scrambled_charset = function (seed) {
    var _, charset, i1, i2, stub13_, stub13_c, stub13_i0, stub13_iter0, stub14_;
    this.prng.init_rnd(seed);
    stub13_ = [];stub13_iter0 = "123456789ABCDEFGHIJKLMNPQRSTUWXZ";if ((typeof stub13_iter0 === "object") && (!Array.isArray(stub13_iter0))) {stub13_iter0 = Object.keys(stub13_iter0);}for (stub13_i0=0; stub13_i0<stub13_iter0.length; stub13_i0++) {stub13_c = stub13_iter0[stub13_i0];{stub13_.push(stub13_c.charCodeAt(0));}}
    charset = stub13_;
    for (_ = 0; _ < 573; _ += 1) {
        i1 = this.prng.irnd(charset.length);
        i2 = this.prng.irnd(charset.length);
        stub14_ = [charset[i2], charset[i1]];
        charset[i1] = stub14_[0];charset[i2] = stub14_[1];
    }
    return charset;
};

EuromixIRPassword.prototype.encode_chunk = function (charset, chunk, param2, chunkLen) {
    var _, c, output;
    param2 = (param2 === undefined) ? 32: param2;
    chunkLen = (chunkLen === undefined) ? 7: chunkLen;
    output = [];
    for (_ = 0; _ < chunkLen; _ += 1) {
        c = safe_modulo(chunk, param2);
        chunk = safe_div(chunk, param2);
        _pymeth_append.call(output, charset[c]);
    }
    return _pyfunc_list(output);
};

EuromixIRPassword.prototype.decode_chunk = function (charset, chunk, param2, chunkLen) {
    var c, charsetIdx, chunkIdx, i, lastCharMaxIdx, output, stub15_seq, stub16_itr, stub17_tgt, t;
    param2 = (param2 === undefined) ? 32: param2;
    chunkLen = (chunkLen === undefined) ? 7: chunkLen;
    lastCharMaxIdx = 0;
    chunkIdx = 0;
    t = 4294967295;
    while (true) {
        if (_pyfunc_op_equals(t, 0)) {
            break;
        }
        lastCharMaxIdx = safe_modulo(t, param2);
        t = safe_div(t, param2);
        chunkIdx += 1;
        if ((chunkIdx >= chunkLen)) {
            break;
        }
    }
    output = 0;
    stub15_seq = _pyfunc_enumerate(chunk);
    if ((typeof stub15_seq === "object") && (!Array.isArray(stub15_seq))) { stub15_seq = Object.keys(stub15_seq);}
    for (stub16_itr = 0; stub16_itr < stub15_seq.length; stub16_itr += 1) {
        stub17_tgt = stub15_seq[stub16_itr];
        i = stub17_tgt[0]; c = stub17_tgt[1];
        charsetIdx = _pymeth_index.call(charset, c);
        output = _pyfunc_op_add(output, _pyfunc_op_mult(charsetIdx, Math.pow(param2, i)));
    }
    if ((((((!_pyfunc_op_equals(chunkIdx, chunk.length))) || (charsetIdx <= lastCharMaxIdx))) && (output <= 4294967295))) {
        return output;
    }
    return null;
};

EuromixIRPassword.prototype.scramble_buffer_with_seed = function (seed) {
    var _, d, i, j, output, stub18_, t1, t2, v;
    this.prng.init_rnd(seed);
    d = [];
    for (i = 0; i < 32; i += 2) {
        _pymeth_append.call(d, i);
    }
    for (i = 1; i < 32; i += 2) {
        _pymeth_append.call(d, i);
    }
    output = _pyfunc_op_mult([0], d.length);
    for (i = 0; i < Math.floor(output.length/2); i += 1) {
        v = this.prng.irnd();
        if ((_pyfunc_op_equals((v & 1), 0))) {
            output[i] = d[i];
            output[i + 16] = d[i + 16];
        } else {
            output[i] = d[i + 16];
            output[i + 16] = d[i];
        }
    }
    for (j = 0; j < 2; j += 1) {
        for (_ = 0; _ < 576; _ += 1) {
            t1 = this.prng.irnd() & 15;
            t2 = this.prng.irnd() & 15;
            stub18_ = [output[_pyfunc_op_add(t2, _pyfunc_op_mult(j, 16))], output[_pyfunc_op_add(t1, _pyfunc_op_mult(j, 16))]];
            output[_pyfunc_op_add(t1, _pyfunc_op_mult(j, 16))] = stub18_[0];output[_pyfunc_op_add(t2, _pyfunc_op_mult(j, 16))] = stub18_[1];
        }
    }
    return output;
};

EuromixIRPassword.prototype.scramble_buffer_with_seed_even_more = function (seed, data) {
    var i, output, uVar2, uVar3;
    output = this.scramble_buffer_with_seed(seed);
    for (i = 0; i < 16; i += 1) {
        uVar3 = data;
        if ((_pyfunc_op_equals((uVar3 & shl(1, output[i] & 31)), 0))) {
            uVar2 = uVar3 & (~shl(1, output[i + 16] & 31));
        } else {
            uVar2 = uVar3 | shl(1, output[i + 16] & 31);
        }
        data = uVar2;
        if ((_pyfunc_op_equals((uVar3 & shl(1, output[i + 16] & 31)), 0))) {
            uVar3 = data & (~shl(1, output[i] & 31));
        } else {
            uVar3 = data | shl(1, output[i] & 31);
        }
        data = uVar3;
    }
    return data;
};

EuromixIRPassword.prototype.calc_crc16 = function (data, length) {
    var _, crc, i;
    length = (length === undefined) ? null: length;
    crc = 65535;
    if ((length === null)) {
        length = data.length;
    }
    for (i = 0; i < length; i += 1) {
        crc ^= shl(data[i], 8);
        for (_ = 0; _ < 8; _ += 1) {
            crc = shl(crc, 1) ^ (((!_pyfunc_op_equals((crc & 32768), 0)))? (4129) : (0));
        }
    }
    return (~crc) & 65535;
};

EuromixIRPassword.prototype.calc_crc16_alt = function (data, length) {
    var _, crc, i;
    length = (length === undefined) ? null: length;
    crc = 65535;
    if ((length === null)) {
        length = data.length;
    }
    for (i = 0; i < length; i += 1) {
        crc ^= data[i];
        for (_ = 0; _ < 8; _ += 1) {
            crc = shr(crc, 1) ^ (((!_pyfunc_op_equals((crc & 1), 0)))? (33800) : (0));
        }
    }
    return crc & 65535;
};

EuromixIRPassword.prototype.xor_bytes = function (data, offset, val) {
    var result;
    result = int_js_to_bytes((int_js_from_bytes(data.slice(offset,offset + 4))) ^ val, 4);
    return _pyfunc_op_add((_pyfunc_op_add((_pyfunc_list(data.slice(0,offset))), _pyfunc_list(result))), (_pyfunc_list(data.slice(offset + 4))));
};

EuromixIRPassword.prototype.verify_password = function (password) {
    var buf, chunk1, chunk1_output, chunk2, chunk2_output, chunk3, chunk3_output, h1, h2, h3, h4, seed, stub19_, stub20_, stub20_i, stub20_i0, stub20_iter0, v, x;
    this.prng = new KonamiMRand();
    password = ((password !== null))? ((function list_comprehension (iter0) {var res = [];var c, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {c = iter0[i0];{res.push(c.charCodeAt(0));}}return res;}).call(this, _pymeth_replace.call(password, "-", ""))) : (null);
    stub20_ = [];stub20_iter0 = _pyfunc_range(0, password.length, 7);if ((typeof stub20_iter0 === "object") && (!Array.isArray(stub20_iter0))) {stub20_iter0 = Object.keys(stub20_iter0);}for (stub20_i0=0; stub20_i0<stub20_iter0.length; stub20_i0++) {stub20_i = stub20_iter0[stub20_i0];{stub20_.push(password.slice(stub20_i,stub20_i + 7));}}
    stub19_ = stub20_;
    chunk1 = stub19_[0];chunk2 = stub19_[1];chunk3 = stub19_[2];
    seed = this.generate_seed_hash(this.security_id, "GN894EAA");
    x = this.decode_chunk(this.generate_scrambled_charset(seed), chunk1);
    chunk1_output = this.scramble_buffer_with_seed_even_more(seed + 897, x);
    chunk2_output = this.scramble_buffer_with_seed_even_more(this.calc_crc16(chunk1), this.decode_chunk(this.generate_scrambled_charset(seed + 576), chunk2));
    chunk3_output = this.scramble_buffer_with_seed_even_more(this.calc_crc16_alt(chunk2), this.decode_chunk(this.generate_scrambled_charset(seed + 1152), chunk3));
    buf = _pyfunc_list((_pyfunc_op_add((_pyfunc_op_add(int_js_to_bytes(chunk1_output, 4), int_js_to_bytes(chunk2_output, 4))), int_js_to_bytes(chunk3_output, 4))));
    seed = this.generate_seed_hash("GN894EAA", this.security_id);
    this.prng.init_rnd(seed);
    buf = this.xor_bytes(buf, 8, this.prng.irnd());
    this.prng.init_rnd(int_js_from_bytes(buf.slice(8,12)));
    buf = this.xor_bytes(buf, 0, this.prng.irnd());
    buf = this.xor_bytes(buf, 4, this.prng.irnd());
    h1 = _pyfunc_op_equals(this.calc_crc16(buf, 8), (int_js_from_bytes(buf.slice(8,10))));
    if ((!_pyfunc_op_equals(h1, true))) {
        return false;
    }
    h2 = _pyfunc_op_equals(this.calc_crc16_alt(buf, 10), (int_js_from_bytes(buf.slice(10,12))));
    if ((!_pyfunc_op_equals(h2, true))) {
        return false;
    }
    buf = this.xor_bytes(buf, 4, seed);
    v = this.generate_seed_hash(this.security_id, n2h_long(int_js_from_bytes(buf.slice(4,8))));
    buf = this.xor_bytes(buf, 0, v);
    h3 = _pyfunc_op_equals(this.calc_crc16(buf, 4), (int_js_from_bytes(buf.slice(4,6))));
    if ((!_pyfunc_op_equals(h3, true))) {
        return false;
    }
    h4 = _pyfunc_op_equals(this.calc_crc16_alt(buf, 6), (int_js_from_bytes(buf.slice(6,8))));
    if ((!_pyfunc_op_equals(h4, true))) {
        return false;
    }
    return true;
};

EuromixIRPassword.prototype.generate_password = function (year, month, day) {
    var buf, chunk1, chunk1_payload, chunk2, chunk2_payload, chunk3, chunk3_payload, h1, h2, parts, payload, seed, stub21_seq, stub22_itr, x;
    if (!(year > 2000)) { throw _pyfunc_op_error('AssertionError', "year > 2000");}
    if (!(month > 8)) { throw _pyfunc_op_error('AssertionError', "month > 8");}
    payload = (day | shl(month, 8)) | shl(year, 16);
    buf = int_js_to_bytes(payload, 4);
    buf = _pyfunc_op_add(buf, int_js_to_bytes(this.calc_crc16(buf, 4), 2));
    buf = _pyfunc_op_add(buf, int_js_to_bytes(this.calc_crc16_alt(buf, 6), 2));
    seed = this.generate_seed_hash(this.security_id, n2h_long(int_js_from_bytes(buf.slice(4,8))));
    buf = this.xor_bytes(buf, 0, seed);
    seed = this.generate_seed_hash("GN894EAA", this.security_id);
    buf = this.xor_bytes(buf, 4, seed);
    buf = _pyfunc_op_add(buf, int_js_to_bytes(this.calc_crc16(buf, 8), 2));
    buf = _pyfunc_op_add(buf, int_js_to_bytes(this.calc_crc16_alt(buf, 10), 2));
    h1 = _pyfunc_op_equals(this.calc_crc16(buf, 8), (int_js_from_bytes(buf.slice(8,10))));
    if ((!_pyfunc_op_equals(h1, true))) {
        return false;
    }
    h2 = _pyfunc_op_equals(this.calc_crc16_alt(buf, 10), (int_js_from_bytes(buf.slice(10,12))));
    if ((!_pyfunc_op_equals(h2, true))) {
        return false;
    }
    chunk1_payload = int_js_from_bytes(buf.slice(0,4));
    chunk2_payload = int_js_from_bytes(buf.slice(4,8));
    chunk3_payload = int_js_from_bytes(buf.slice(8,12));
    seed = this.generate_seed_hash("GN894EAA", this.security_id);
    this.prng.init_rnd(seed);
    chunk3_payload ^= this.prng.irnd();
    this.prng.init_rnd(int_js_from_bytes(buf.slice(8,12)));
    chunk1_payload ^= this.prng.irnd();
    chunk2_payload ^= this.prng.irnd();
    seed = this.generate_seed_hash(this.security_id, "GN894EAA");
    chunk1 = this.encode_chunk(this.generate_scrambled_charset(seed), this.scramble_buffer_with_seed_even_more(seed + 897, chunk1_payload));
    chunk2 = this.encode_chunk(this.generate_scrambled_charset(seed + 576), this.scramble_buffer_with_seed_even_more(this.calc_crc16(chunk1), chunk2_payload));
    chunk3 = this.encode_chunk(this.generate_scrambled_charset(seed + 1152), this.scramble_buffer_with_seed_even_more(this.calc_crc16_alt(chunk2), chunk3_payload));
    parts = [];
    stub21_seq = [chunk1, chunk2, chunk3];
    if ((typeof stub21_seq === "object") && (!Array.isArray(stub21_seq))) { stub21_seq = Object.keys(stub21_seq);}
    for (stub22_itr = 0; stub22_itr < stub21_seq.length; stub22_itr += 1) {
        x = stub21_seq[stub22_itr];
        _pymeth_append.call(parts, (_pymeth_join.call("", ((function list_comprehension (iter0) {var res = [];var c, i0;if ((typeof iter0 === "object") && (!Array.isArray(iter0))) {iter0 = Object.keys(iter0);}for (i0=0; i0<iter0.length; i0++) {c = iter0[i0];{res.push(String.fromCharCode(c));}}return res;}).call(this, x)))));
    }
    return _pymeth_join.call("-", parts);
};


generate_password = function flx_generate_password (machine_license_key, year, day, month) {
    var irpass, irpass_check, password;
    year = (year === undefined) ? 3030: year;
    day = (day === undefined) ? 9: day;
    month = (month === undefined) ? 22: month;
    try {
        irpass = new EuromixIRPassword(machine_license_key);
        password = irpass.generate_password(year, day, month);
        irpass_check = new EuromixIRPassword(machine_license_key);
        if ((_pyfunc_op_equals(irpass_check.verify_password(password), false))) {
            return "Failed to generate password!";
        }
        return password;
    } catch(err_2) {
        {
            return "Unknown error";
        }
    }
    return null;
};
