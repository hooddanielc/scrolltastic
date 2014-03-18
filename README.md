scrolltastic
============

An infinite scroll jquery plugin for the impatient

> The overall goal of this plugin
> is to allow developers to easily create
> an infinite scroll container without
> forceing the developer to change there
> data source to meet infinite scroll
> requirements.


Installation
--------------
Installation is quite easy. Include jquery and the scrolltastic plugin.

```sh
<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="jquery.scrolltastic.js"></script>
```

How To Use
--------------
First lets set up some html for our infinite scroll. First we create a block element with overflow-y:auto, and set a specific height. Inside the scroll element, we have have an element that holds the loading animation, and end of results message along with the dh-scroll-items element. When it is time to render more items, we append more html onto the dh-scroll-items element.

```sh
  <div class="dhoodlum-scroll" style="height: 300px;overflow-y:auto;">
    <div class="dh-scroll-content">
      <div class="dh-scroll-items"></div>
      <div class="dh-scroll-loading">Loading</div>
      <div class="dh-scroll-end">End of results</div>
    </div>
  </div>
```

Now lets write the javascript that powers our infinite scroll. The jquery plugin adds a new method to the jQuery object called 'scrolltastic.' The scrolltastic function takes an object argument. You must define loadMore and renderMore. When the loadMore function is invoked, you must invoke bufferItems with an array argument. That data will be eventually passed to the renderMore function.

```sh
  $('.dhoodlum-scroll').scrolltastic({
    loadMore: function(page) {
      // replace setTimeout with your
      // ajax call
      var self = this;
      setTimeout(function() {
        // after you get results
        // from your ajax call,
        // invoke bufferItems
        self.bufferItems([
          {name: 'john #1'},
          {name: 'john #2'},
          {name: 'john #3'},
          {name: 'john #4'},
          {name: 'john #5'}
        ]);
      }, 500);
    },
    renderMore: function(data) {
      // infinite scroll will call this method,
      // when it wants you to render more results
      for(var i = 0; i < data.length; i++) {
        var el = $('<div>'+ data[i].name +'</div>');
        this.find('.dh-scroll-items').append(el);
      }
    }
  });
```
Thats about it! have fun and happy coding :-)

License
----

GPL v2 See LICENSE for more details