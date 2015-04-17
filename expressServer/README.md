This directory contains two express servers:
* eServer.js - basic express web server
* eServerParams.js - express web server with parameter support

Make sure you install the node.js server software.  Ensure your path variable contains the execution path of the node.js binary.

To execute the server run one of the following commands:

1. node eServer.js

2. node eServerParams.js

To test server #1, try the following URL on the browser, while the server is running:
* http://localhost/
* http://localhost/index.html
* http://localhost/images/image1.png

To test server #2, try the following URL on the browser, while the server is running:
* http://localhost/one
* http://localhost/add?var1=1&var2=2
* http://localhost/name/israelh
* http://localhost/name/hello