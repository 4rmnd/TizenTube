// Tric Tube Adblock Script | Pinned to: reisxd/TizenTube-v1.15.2 | Date: 2026-10-26 | Modified by Farel under GPL-3.0 from reisxd/TizenTube
(function() {
  'use strict';
  console.log('[TricTube] Adblock script initialized before YouTube boot');

  if (window.__trictube_adblock_loaded) return;
  window.__trictube_adblock_loaded = true;

  var origParse = JSON.parse;
  JSON.parse = function() {
    var r = origParse.apply(this, arguments);
    if (!r || typeof r !== 'object') return r;

    try {
      // 1. Remove video ad placements
      if (r.adPlacements) {
        r.adPlacements = [];
      }

      // 2. Set playerAds to false
      if (r.playerAds) {
        r.playerAds = false;
      }

      // 3. Clear adSlots
      if (r.adSlots) {
        r.adSlots = [];
      }

      // 4. Drop masthead and shelf ads from home screen
      if (r.contents && r.contents.tvBrowseRenderer && r.contents.tvBrowseRenderer.content &&
          r.contents.tvBrowseRenderer.content.tvSurfaceContentRenderer &&
          r.contents.tvBrowseRenderer.content.tvSurfaceContentRenderer.content &&
          r.contents.tvBrowseRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer &&
          r.contents.tvBrowseRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents) {
        
        var contents = r.contents.tvBrowseRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents;
        
        // Filter out adSlotRenderer from top-level contents
        r.contents.tvBrowseRenderer.content.tvSurfaceContentRenderer.content.sectionListRenderer.contents = contents.filter(function(elm) {
          return !elm.adSlotRenderer && !elm.feedNudgeRenderer;
        });

        // Filter out adSlotRenderer from shelves
        for (var i = 0; i < contents.length; i++) {
          var shelve = contents[i];
          if (shelve.shelfRenderer && shelve.shelfRenderer.content && shelve.shelfRenderer.content.horizontalListRenderer &&
              shelve.shelfRenderer.content.horizontalListRenderer.items) {
            shelve.shelfRenderer.content.horizontalListRenderer.items = shelve.shelfRenderer.content.horizontalListRenderer.items.filter(function(item) {
              return !item.adSlotRenderer;
            });
          }
        }
      }

      // 5. Remove shorts ads
      if (!Array.isArray(r) && r.entries && Array.isArray(r.entries)) {
        r.entries = r.entries.filter(function(elm) {
          return !(elm && elm.command && elm.command.reelWatchEndpoint &&
                   elm.command.reelWatchEndpoint.adClientParams &&
                   elm.command.reelWatchEndpoint.adClientParams.isAd);
        });
      }

      // 6. Filter out youThereRenderer ("Still watching?" prompts)
      if (r.messages && Array.isArray(r.messages)) {
        r.messages = r.messages.filter(function(msg) {
          return !(msg && msg.youThereRenderer);
        });
      }
    } catch (e) {
      console.warn('[TricTube] Adblock parsing error:', e);
    }

    return r;
  };
})();
