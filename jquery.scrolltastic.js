/*
* jQuery Infinite Scroll Plugin
* Created by Daniel Hood (www.havenofcode.com)
* * * * * */
(function($) {
  $.fn.scrolltastic = function(o) {
    var $this = this,
      _tickSpeed = o.tickSpeed,
      _offsetBottom = o.offsetBottom || 500,
      _bufferLength = o.bufferLength || 20,
      _renderAmount = o.renderAmount || 5,
      _renderMore = o.renderMore || function(){},
      _loadMore = o.loadMore || function(){},
      _stop = false,
      _itemsWaitingToBeRendered = [],
      _scrollEl = $this,
      _contentEl = $this.find('.dh-scroll-content'),
      _loading = false,
      _page = 0;

    // make sure scrolling is enabled
    $this.css('overflow-y', 'auto');

    // hide end of content element
    $this.find('.dh-scroll-end').hide();

    $this.bufferItems = function(objArray) {
      // concatenate _itemsWaitingToBeRendered
      _itemsWaitingToBeRendered = _itemsWaitingToBeRendered.concat(objArray);
      if(objArray.length == 0) {
        // we need to stop now, because buffer fed
        // us nothing, and we don't expect buffer
        // to feed us anymore.
        _stop = true;
      } else {
        // stop the loading state
        _loading = false;
      }
    }

    $this.stop = function() {
      _stop = true;
    }

    function _getScrollDifference() {
      var scrollHeight = _scrollEl.height();
      var contentHeight = _contentEl.height();
      var scrollTop = _scrollEl.scrollTop();
      return contentHeight - (scrollHeight + scrollTop);
    }

    // sliceBuffer take the first
    // x items out of array and
    // returns them for your use
    function _sliceBuffer(amount) {
      var newBuffer = _itemsWaitingToBeRendered.slice(amount, _itemsWaitingToBeRendered.length);
      var returnedObjArray = _itemsWaitingToBeRendered.slice(0, amount);
      _itemsWaitingToBeRendered = newBuffer;
      return returnedObjArray;
    }

    // we are using state machine
    // to monitor the state of the
    // scroll.
    function _tick() {
      // should we stop?
      if(!_stop) {
        setTimeout($.proxy(function() {
          _tick();
        }, this), _tickSpeed);
      } else {
        // looks like there is an end
        // to the world after all
        $.proxy(_renderMore, $this)(_itemsWaitingToBeRendered);
        $this.find('.dh-scroll-loading').css('display', 'none');
        $this.find('.dh-scroll-end').css('display', 'block');
        return;
      }

      // is the user able to scroll yet?
      if(_scrollEl.height() >= _contentEl.height()) {
        if(_itemsWaitingToBeRendered.length > 0) {
          $.proxy(_renderMore, $this)(_sliceBuffer(_renderAmount));
        } else if(!_loading) {
          $.proxy(_loadMore, $this)(_page++);
          _loading = true;
        }
        return;
      }

      // should we load more?
      if(_itemsWaitingToBeRendered.length <= _bufferLength && !_loading) {
        $.proxy(_loadMore, $this)(_page++);
        _loading = true;
      }

      var scrollDifference = _getScrollDifference();

      // has the user scrolled far enough to
      // perhaps view more items?
      if(scrollDifference <= _offsetBottom && _itemsWaitingToBeRendered.length > 0) {
        $.proxy(_renderMore, $this)(_sliceBuffer(_renderAmount));
      }
    }
    _tick();
  }
})(jQuery);