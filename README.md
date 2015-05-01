# jquery.textClock
Jquery plugin to show time easily on your site

## Installation
In the <head> block of the page
```html
<head>
<script src="http://code.jquery.com/jquery.min.js"></script>
<script src="js/jquery.textClock.min.js"></script>
</head>
```

## Usage
In the <body> block of this HTML page

```html
<body>
<ul>
	<li>Current local time <span class="clock"></span></li>
	<li>Time at Berlin from server
		<span class="clock" data-timezone="Europe/Berlin"></span></li>
	<li>
	<li>12 h format<span data-format="hh:mm A" class="clock"></span></li>
</ul>

<script>
$( document ).ready(function() {
	$(".clock").textClock();
});
</script>
</body>
```
See the test.html for more examples

## Options
All parameters can be transmitted during initialization of the plugin

Ex :
```javascript
$( document ).ready(function() {
	$(".clock").textClock({
		format: "HH:mm:ss",
		timeZone: "Japan"
	});
});

```

* format :
H    Hours (0 to 23)
HH   Hours (00 to 23) (two digits)
h    English hour (0 to 12)
hh   English hour (00 to 12) (two digits)
a    Ante or Post Meridiem (am or pm)
A    Ante or Post Meridiem (AM or PM)
mm   Minutes (0 to 59)
m    Minutes (00 to 59)(two digits)
s    Seconds (0 to 59)
ss   Seconds (00 to 59) (two digits)

default = HH:mm:ss

* timezone :
timezone name. See http://json-time.appspot.com/timezones.json for see timezones
NOTE that this parameter overrides "offset" parameter if present

+offset :
numeric signed in minutes to add an offset to the local time.

default = 0

* cbReady :
Callback function called when the plugin is initialized

default : false

# Data properties
All parameters can also be transmitted by adding properties "data" to the DOM element
Ex to show US Eastern local time in 24h format. Show just hours ans minutes
```html
<span class="clock" data-format="HH:mm" data-timezone="US/Eastern"></span>
```

IMPORTANT :
DOM data-parameter will override the options passed to the plugin
