;(function($) {

    $.textClock = function(element, options) {
        defaults = {
            template:"HH:mm:ss",
            offset: false,
            timezone: false,
            autosync: false,
		    cbReady: false,
            cbDateTime: false
		};

        var plugin = this;
        plugin.$container = $(element);
        plugin.settings = {};

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);

            var data_format = plugin.$container.attr("data-format");
            if( typeof data_format !== "undefined"){
                plugin.settings.format = data_format;
            }

            var data_offset = plugin.$container.attr("data-offset");
            if( typeof data_offset !== "undefined"){
                plugin.settings.offset = data_offset;
            }

            var data_timezone = plugin.$container.attr("data-timezone");
            if( typeof data_timezone !== "undefined"){
                plugin.settings.timezone = data_timezone;
            }

            var data_autosync = plugin.$container.attr("data-autosync");
            if( typeof data_autosync !== "undefined"){
                plugin.settings.autosync = data_autosync;
            }

            plugin.getDate();

			plugin.timer = setInterval(function(){
				plugin.run();
			}, 1000);

            if( plugin.settings.autosync && plugin.settings.timezone ){
                plugin.timer = setInterval(function(){
                    plugin.getDate();
                }, plugin.settings.autosync * 60000);
            }

			if( plugin.settings.cbReady ){
				plugin.settings.cbReady();
			}

        };

        plugin.getDate = function(){
            var applyOffset = function(){
                if( plugin.settings.offset !== false){
                    plugin.date.setTime(plugin.date.getTime() + (plugin.date.getTimezoneOffset() * 60000));
                    plugin.date.setTime(plugin.date.getTime() + (plugin.settings.offset * 1000));
                }
            };

            var getTime = function(zone, success) {
                var url = 'http://json-time.appspot.com/time.json?tz=' + zone + '&callback=?';
                $.getJSON(url, function(o){
                    var d = new Date();
                    d.setHours(parseInt(o.hour));
                    d.setMinutes(parseInt(o.minute));
                    d.setSeconds(parseInt(o.second));
		    /*jshint -W030 */
                    success && success(d);
                });
            };

            plugin.date = new Date();
            if( plugin.settings.timezone ){
                plugin.$container.html("---");
                getTime(plugin.settings.timezone, function(time){
                     plugin.date = time;
                     plugin.run();
                });
            }else{
                applyOffset();
                plugin.run();
            }

        };

        plugin.run = function(){
            var leadZero = function(n){
                return n > 9 ? n : "0" + n;
            };

            var englishHour = function(h){
                if( h === 0){
                    h = 12;
                }else if(h > 12){
                    h = h -12;
                }
                return h;
            };

            var englishAmPm = function(h, maj){
                if( ! maj ){
                    return  h < 12 ? "am" : "pm";
                }else{
                    return  h < 12 ? "AM" : "PM";
                }
            };

            plugin.date.setTime(plugin.date.getTime() + 1000);

            var s = plugin.settings.format;

            s = s.replace("HH", leadZero(plugin.date.getHours()));
            s = s.replace("H", plugin.date.getHours());
            s = s.replace("hh", leadZero(englishHour(plugin.date.getHours())));
            s = s.replace("h", englishHour(plugin.date.getHours()));
            s = s.replace("mm", leadZero(plugin.date.getMinutes()));
            s = s.replace("m", plugin.date.getMinutes());
            s = s.replace("ss", leadZero(plugin.date.getSeconds()));
            s = s.replace("s", plugin.date.getSeconds());
            s = s.replace("a", englishAmPm(plugin.date.getHours(), false));
            s = s.replace("A", englishAmPm(plugin.date.getHours(), true));

            plugin.$container.html(s);

            if( plugin.settings.cbDateTime ){
                plugin.settings.cbDateTime(plugin.date);
            }

        };

        plugin.getTime = function(){
            return plugin.date;
        };

        plugin.init();

    };

    $.fn.textClock = function(options) {
        return this.each(function() {
            if (undefined === $(this).data('textClock')) {
                var plugin = new $.textClock(this, options);
                $(this).data('textClock',plugin);
            }
        });
    };

})(jQuery);
