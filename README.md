# koa-r

Requesting node modules from some proxy object;

### Installation
```
npm install koa-r
```

### Example

```
var r = require('koa-r').isGlobal(true);
r.set('someModule', require('path/to/someModule'));
// etc...

// and then when you need to call some function from loaded module
r('someModule', 'someFn')();
```

As you can see we need to specify key and value for some module, and after that we can access 
to loaded module from some other place. Note that if ``isGlobal`` option is setted to ``true``, 
we don't need to require ``koa-r`` twice. We need to require it only once, and after that it will in ``GLOBAL.r`` variable.

I am using this module in combination with ``koa-router``.
My idea is to separate routes definitions into multiple files, and then from one central place to mount routes to some url paths. Before that we set to ``koa-r`` all required dependencies for executing route callbacks, so we can call easily functions which are handling some routes. Example:

```
// some/path/handlers/user.js
exports.getUsers = function * (next) {
  // some code here...
  yield next;
}
```

```
// some/path/router/index.js
var mount = require('koa-mount'),
  r = require('koa-r').isGlobal(true),
  userAPI = require('some/path/router/user.js');

r.set('user', require('/some/path/handlers/user'));
// etc...

module.exports = function (app) {
  app.use(mount('/api/user/', userAPI.middleware()));
  // etc...
};
```

```
// some/path/router/user.js
var Router = require('koa-router'),
  api = new Router();

api.get('/users', r('user', 'getUsers'));
module.exports = api;
```

When user visits ``api/user/users`` url, function ``getUsers`` from ``user`` module will handle this route.

# License
MIT
