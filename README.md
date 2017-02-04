# multipartish

Dead simple way of producing `multipart/*` messages. Works in browser, node, or anywhere else (hopefully) thanks to its simplicity.

Its suitable for small messages (say, up to few kB), larger would benefit greatly from stream based approach.

## Installation

```javascript
npm install multipartish --save
```

## Example

Hello world

```javascript
var MultiPartish = require('multipartish')

console.log(new MultiPartish().header("Content-Type", "text/plain").part("hello world").get())
```

This example shows how to [upload file to Google drive](https://developers.google.com/drive/v3/web/manage-uploads#multipart)

```javascript
// prepare data
var MultiPartish = require('multipartish')
var name = "My File"
var body = "Hello world!\n"

var m = new MultiPartish()
m.header("Content-Type", "application/json; charset=UTF-8")
m.part(JSON.stringify(name: name))
m.header("Content-Type", "text/plain")
m.part(body)

var body_data = m.get()
var contentType = m.contentType()

// upload
gapi.client.request({
   'path': 'https://www.googleapis.com/upload/drive/v3/files',
   'method': 'POST',
   'params': {'uploadType': 'multipart'},
   'headers': { 'Content-Type': contentType },
   'body': body_data
})
```


## Usage

### Constructor

Constructor accepts a single object as the parameter, encapsulating the optional arguments. Only one key is currently defined:

* `boundary`: sets the boundary

Examples:
```javascript
   var MultiPartish = require('multipartish')

   var a = new MultiPartish()
   var b = new MultiPartish({boundary: 'my-boundary'})
```

### Methods

#### get()

Returns the complete multipart message.

#### part(body)

Adds a part and returns `this`.

#### header(value)

Specifies a header for following part, for example `.header("Content-Type: text/plain")`. Returns `this`.

#### header(name, value)

Specifies a header for following part, for example `.header('Content-Type', 'text/plain')`. Returns `this`.

Equavalent to:

```javascript
header(name + ": " + value)
```


#### contentType()

Returns `multipart/mixed; boundary=XXX`.

#### contentType(something)

Returns `multipart/something; boundary=XXX`. According to [RFC](https://www.w3.org/Protocols/rfc1341/7_2_Multipart.html)
you can set `something` to: `mixed`, `alternative`, `digest` or `parallel`.

### Public properties

#### boundary

Boundary of multipart message. Consider this property read-only, if you feel you want to set this property,
you should use the contructor argument instead.

## Version history

0.1.0 - initial release

0.1.1 - fluent api support

0.1.2 - README.md fixes, **not yet published to npm**
