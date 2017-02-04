"use strict";

var newline = "\r\n"

// available args:
//     boundary
function MultiPartish(args) {
    var boundary = ""
    // XXX: is this unique enough?, maybe we should use window.crypto or something
    if(args && args.boundary) {
        boundary = args.boundary;
    } else {
        for (var i = 0; i < 40; i++) {
            boundary += Math.floor(Math.random() * 36).toString(36)
        }
    }

    this._result = ''
    this._need_boundray = true
    this.boundary = boundary
}

function separate(mp) {
    if(mp._need_boundray) {
        mp._result += "--"
        mp._result += mp.boundary
        mp._result += newline
        mp._need_boundray = false
    }
}

MultiPartish.prototype.contentType = function(subtype) {
    // https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html
    return "multipart/" + (subtype || "mixed") + "; boundary=" + this.boundary
}

MultiPartish.prototype.header = function(header, value) {
    separate(this)

    if(value !== undefined) {
        this._result += header
        this._result += ": "
        this._result += value
    } else {
        this._result += header
    }


    this._result += newline
}

MultiPartish.prototype.part = function(text) {
    separate(this)

    this._result += newline
    this._result += text
    this._result += newline
    this._need_boundray = true
}

MultiPartish.prototype.get = function() {
    var out = this._result

    if(!this._need_boundray) {
        // no body for last part, let's pretend it's empty
        out += newline
    }

    out += "--"
    out += this.boundary
    out += "--"
    out += newline
    return out
}

module.exports = MultiPartish
