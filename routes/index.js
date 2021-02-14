var express = require('express');
var pointer = require('json-pointer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/path/*', function(req, res, next) {
  //res.render('index', { title: req.path });
const root = {
type: "dir",
children: {
home: {
type: "dir",
children: {
myname: {
type: "dir",
children: {
"filea.txt": {
type: "file",
},
"fileb.txt": {
type: "file",
},
"projects": {
type: "dir",
children: {
mysupersecretproject: {
type: "dir",
children: {
mysupersecretfile: {
type: "file",
},
},
}
},
},
}
},
},
}
},
};

    res.setHeader('Content-Type', 'application/json');
    //res.end(JSON.stringify({ a: 1, path: req.path, tree:root, currpath: currpath }));
    //let tree=JSON.stringify(root);
    //let currpath = pointer.get(tree, '/type')
    //let realpath = '/children/' + req.path.split('/').splice(0,1).join('/children/');
    let splitpath = req.path.split('/');
    splitpath.shift();
    splitpath.shift();
    let realpath = '/children/' + splitpath.join('/children/');
    //let obj2 = pointer.get(root, '/children/');
    if (realpath == '/children/')
      realpath = '';
    if (!pointer.has(root, realpath))
    {
      res.end(JSON.stringify({ error: "path not found"}));
    }
    else
    {
      const objtype = pointer.get(root, realpath + '/type');
      if (pointer.has(root, realpath+ '/children'))
      {
        const objchildren = pointer.get(root, realpath+ '/children');
        let ch = [];
        for (let key in objchildren)
          ch.push(key);
        res.end(JSON.stringify({ type: objtype, children: ch}));
      }
      else
      {
        res.end(JSON.stringify({ type: objtype }));
      }
    }
});



module.exports = router;
