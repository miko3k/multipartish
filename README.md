# multipartish

Dead simple way of producing `multipart/*` data. Works in browser, node, or anywhere else (hopefully), because it's super simple.

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
var body = "text\n"

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

Constructor accepts a single object as parameter, encapsulating the optional arguments. Only one key is currently defined:

* `boundary`: set boundary value, use is discouraged, but it makes writing unit tests possible

Examples:
```javascript
   var MultiPartish = require('multipartish')

   var a = new MultiPartish()
   var b = new MultiPartish({boundary: 'my-boundary'})
```

### Methods

#### get()

Returns the complete multipart message. Most important method! Returns `this`.

#### part(body)

Adds a part. Second most important method! Returns `this`.

#### header(value)

Specifies a header for following part, for example `.header("Content-Type: text/plain")`

#### header(name, value)

Specifies a header for following part, for example `.header('Content-Type', 'text/plain')`

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
