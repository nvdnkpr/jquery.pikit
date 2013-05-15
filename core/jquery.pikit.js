// Generated by CoffeeScript 1.4.0
(function() {

  (function($, window, document) {
    var Plugin, defaults, pluginName;
    pluginName = "pikit";
    defaults = {
      service: 'random',
      height: null,
      width: null,
      format: null,
      sizeKeyword: null,
      greyscale: false,
      backColor: null,
      foreColor: null,
      customText: null,
      category: null,
      variant: null
    };
    Plugin = (function() {

      function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this.$container = $(element);
        this.services = {
          dummyimage: {
            url: 'dummyimage.com/g/widthxheight/backColor/foreColor.format&text=customText',
            greyscale: '/g',
            sizeKeyword: '/widthxheight',
            backColor: '/backColor',
            foreColor: '/foreColor',
            format: '.format',
            customText: '&text=customText'
          },
          dummyimages: {
            url: 'dummyimages.com/widthxheight/backColor/foreColor.format&text=customText',
            backColor: '/backColor',
            foreColor: '/foreColor',
            format: '.format',
            customText: '&text=customText'
          },
          fpoimg: {
            url: 'fpoimg.com/widthxheight?&bg_color=backColor&text_color=foreColor&text=customText',
            backColor: '&bg_color=backColor',
            foreColor: '&text_color=foreColor',
            customText: '&text=customText'
          },
          instasrc: {
            url: 'instasrc.com/width/height/category/greyscale',
            category: '/category',
            greyscale: '/greyscale'
          },
          ipsumimage: {
            url: 'ipsumimage.com/widthxheight?&l=customText&f=foreColor&b=backColor&t=format',
            customText: '&l=customText',
            backColor: '&b=backColor',
            foreColor: '&f=foreColor',
            format: '&f=format'
          },
          lorempixel: {
            url: 'lorempixel.com/g/width/height/category/variant',
            category: '/category',
            greyscale: '/g',
            variant: '/variant'
          },
          nosrc: {
            url: 'nosrc.net/widthxheight'
          },
          placeboxes: {
            url: 'placebox.es/width/height/backColor/foreColor/customText',
            backColor: '/backColor',
            foreColor: '/foreColor',
            customText: '/customText'
          },
          placedog: {
            url: 'placedog.com/g/width/height',
            greyscale: '/g'
          },
          placeholdit: {
            url: 'placehold.it/widthxheight/backColor/foreColor.format&text=customText',
            backColor: '/backColor',
            foreColor: '/foreColor',
            format: '.format',
            customText: '&text=customText'
          },
          placeholdus: {
            url: 'placehold.it/widthxheight'
          },
          placekitten: {
            url: 'placekitten.com/g/width/height',
            greyscale: '/g'
          },
          placesheen: {
            url: 'placesheen.com/width/height'
          },
          placezombies: {
            url: 'placezombies.com/g/widthxheight',
            greyscale: '/g'
          },
          placepuppy: {
            url: 'placepuppy.it/width/height'
          },
          nicenicejpg: {
            url: 'nicenicejpg.com/width/height'
          }
        };
        this.parseOptions();
        this.create();
      }

      Plugin.prototype.parseOptions = function() {
        var random_height, random_width, services;
        if (this.options.service === 'random') {
          services = Object.keys(this.services);
          this.options.service = services[Math.floor(Math.random() * services.length)];
        }
        if ($.isArray(this.options.height)) {
          random_height = Math.floor(Math.random() * (this.options.height[0] - this.options.height[1] + 1)) + this.options.height[1];
          this.options.height = random_height;
        } else if (this.options.height === null) {
          this.options.height = this.$container.height();
        }
        if ($.isArray(this.options.width)) {
          random_width = Math.floor(Math.random() * (this.options.width[0] - this.options.width[1] + 1)) + this.options.width[1];
          this.options.width = random_width;
        } else if (this.options.width === null) {
          this.options.width = this.$container.width();
        }
        if (this.options.backColor === 'random' || 'pastel' || 'dark') {
          this.options.backColor = this.randomHex(this.options.backColor);
        }
        if (this.options.foreColor === 'random' || 'pastel' || 'dark') {
          return this.options.foreColor = this.randomHex(this.options.foreColor);
        }
      };

      Plugin.prototype.create = function() {
        var $img;
        this.$container.find("img.pikit").remove();
        $img = $('<img class="pikit" src="' + this.generateUrl() + '" />');
        this.$container.height(this.options.height).width(this.options.width);
        return this.$container.append($img);
      };

      Plugin.prototype.generateUrl = function() {
        var attribute, i, replacable_attrs, service, service_data, url, _i, _ref;
        service = this.options.service;
        service_data = this.services[service];
        url = 'http://' + service_data.url;
        if (this.options.sizeKeyword && service_data.sizeKeyword) {
          url = url.replace(/width[x,\/]height/, this.options.sizeKeyword);
        } else {
          url = url.replace('height', this.options.height);
          url = url.replace('width', this.options.width);
        }
        if (service_data.greyscale) {
          if (!this.options.greyscale) {
            url = url.replace(service_data.greyscale, '');
          }
        }
        replacable_attrs = ['backColor', 'foreColor', 'format', 'customText', 'category', 'variant'];
        for (i = _i = 0, _ref = replacable_attrs.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          attribute = replacable_attrs[i];
          if (service_data[attribute]) {
            if (this.options[attribute]) {
              url = url.replace(attribute, this.options[attribute]);
            } else {
              url = url.replace(service_data[attribute], '');
            }
          }
        }
        return url;
      };

      Plugin.prototype.randomHex = function(type) {
        var color, i, letters, _i;
        if (type === 'pastel') {
          letters = 'ABCDEF'.split('');
        } else if (type === 'dark') {
          letters = '01234567'.split('');
        } else {
          letters = '0123456789ABCDEF'.split('');
        }
        color = '';
        for (i = _i = 0; _i < 6; i = ++_i) {
          color += letters[Math.round(Math.random() * 5)];
        }
        return color;
      };

      return Plugin;

    })();
    return $.fn[pluginName] = function(options) {
      return this.each(function() {
        return $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      });
    };
  })(jQuery, window, document);

}).call(this);
