"use strict";

var test = require('tape');
var multi = require("../lib/index.js")

test('tests', function (t) {
    t.plan(7);

    var m = new multi({boundary: "S"});

    // boundary property
    t.equal(m.boundary, "S")

    // content type
    t.equal(m.contentType(), "multipart/mixed; boundary=S")
    t.equal(m.contentType("foo"), "multipart/foo; boundary=S")

    // empty body
    t.equal(m.get(), "--S--\r\n");

    // headers
    m.header('a', 'b')
    m.header('c: d')

    t.equal(m.get(), "--S\r\na: b\r\nc: d\r\n\r\n--S--\r\n");

    // one part
    m = new multi({boundary: "S"});
    m.part("foo")
    t.equal(m.get(), "--S\r\n\r\nfoo\r\n--S--\r\n");

    // two parts, second with headers
    m.header("a", "b")
    m.part("bar")
    t.equal(m.get(), "--S\r\n\r\nfoo\r\n--S\r\na: b\r\n\r\nbar\r\n--S--\r\n");
});

test('fluentapi', function(t) {
    var m = new multi();
    t.plan(2)
    t.equal(m, m.part("a"))
    t.equal(m, m.header("a"))
});
