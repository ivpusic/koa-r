# koa-r

Requesting node modules from some proxy object;

### Installation
```
npm install koa-r
```

### Example

```
var r = require('../modules/koa-r').isGlobal(true);
r.set('user', require('path/to/module'));
// etc...


// and then when you need to call some function from loaded module
r('user', 'someFn')();
```

As you can see we need to specify key and value for some module, and after that we can access 
to loaded module from some other place. Note that if ``isGlobal`` option is setted to ``true``, 
we don't need to require ``koa-r`` twice. We need to require it only once, and after that it will in ``GLOBAL.r`` variable.

I am using this module in combination with ``koa-router``.
My idea is to separate routes definitions into multiple files, and then from one central place to mount routes to some url paths. Before that we set to ``koa-r`` all required dependencies for executing route callbacks, so we can call easily functions which are handling some routes. Example of some route file:

```
app.get('/users', r('user', 'getUsers'));
```

After user visit ``/users`` url, function ``getUsers`` from ``user`` module will handle this route.

With this you don't need to require ``user`` module inside script where above line is defined. You can use global ``r``,
and access to cached modules and their functions.

# License
MIT
