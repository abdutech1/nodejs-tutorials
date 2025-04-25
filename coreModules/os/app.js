// Example 1: This example uses Node.js os module to fetch and display system details and memory info.

// Include os module and create its object
const os = require('os');

// return the cpu architecture
console.log("CPU architecture: " + os.arch());

// It returns the amount of free system memory in bytes
console.log("Free memory: " + os.freemem());

// It return total amount of system memory in bytes
console.log("Total memory: " + os.totalmem());

// It returns the list of network interfaces
console.log('List of network Interfaces: ' + os.networkInterfaces());

// It returns the operating systems default directory for temp files.
console.log('OS default directory for temp files : ' + os.tmpdir());


// Example 2: This code snippet uses Node.js os module to display the system’s endianness, hostname, OS name, platform, and release information.

// Include os module and create its object
const os = require('os');

// return the endianness of system
console.log("Endianness of system: " + os.endianness());

// It returns hostname of system
console.log("Hostname: " + os.hostname());

// It return operating system name
console.log("Operating system name: " + os.type());

// It returns the platform of os
console.log('operating system platform: ' + os.platform());

// It returns the operating systems release.
console.log('OS release : ' + os.release());


