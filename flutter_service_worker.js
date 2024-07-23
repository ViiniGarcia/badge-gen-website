'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"manifest.json": "37561270488b6d9e36f5543a3623118c",
"canvaskit/canvaskit.js": "738255d00768497e86aa4ca510cce1e1",
"canvaskit/canvaskit.js.symbols": "74a84c23f5ada42fe063514c587968c6",
"canvaskit/chromium/canvaskit.js": "901bb9e28fac643b7da75ecfd3339f3f",
"canvaskit/chromium/canvaskit.js.symbols": "ee7e331f7f5bbf5ec937737542112372",
"canvaskit/chromium/canvaskit.wasm": "399e2344480862e2dfa26f12fa5891d7",
"canvaskit/canvaskit.wasm": "9251bb81ae8464c4df3b072f84aa969b",
"canvaskit/skwasm.wasm": "4051bfc27ba29bf420d17aa0c3a98bce",
"canvaskit/skwasm.js.symbols": "c3c05bd50bdf59da8626bbe446ce65a3",
"canvaskit/skwasm.js": "5d4f9263ec93efeb022bb14a3881d240",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"flutter.js": "383e55f7f3cce5be08fcf1f3881f585c",
"flutter_bootstrap.js": "6bea9b69cd99fdad856e6a5ea3410674",
"version.json": "1128334bf230c40aacf48bf89f72d156",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/NOTICES": "6385f7963055ad428fcc439def2622b0",
"assets/AssetManifest.bin": "7abbd8d6a2c3b2e6578ea6c4fb9ef7ba",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "d2a7b7db83d0e6a01834b06ff7c22b2c",
"assets/assets/Ordem.jpg": "d89a55efb97c94f18e846e3bee230d66",
"assets/assets/Visitacao.jpg": "70eac3dd93a18b490a8cad37d96e2fac",
"assets/assets/Sao%2520Joao%2520Paulo%2520ll.jpg": "a0a842151b585aef187b22b664b500f3",
"assets/assets/Pascom.jpg": "401df30dc89b2c8d0e003a29b6702c09",
"assets/assets/Carlo%2520Acutis.jpg": "1efb6e37974bfa5fe3a4c0c6623860ff",
"assets/assets/Nossa%2520Senhora%2520Aparecida.jpg": "556b6db75dbaa6151960a4e697e121fa",
"assets/assets/Santo%2520Agostinho.jpg": "17e708614cc0024ac3de5ddb4c2746bf",
"assets/assets/Sao%2520Padre%2520Pio.jpg": "f45b11febd1ac7fa5c2d2f7c8a823961",
"assets/assets/Reflexao.jpg": "289fe992737c651e56bd0c78caa30f27",
"assets/assets/Cafe.jpg": "73952cc56ceafa76f692998b48febace",
"assets/assets/Cozinha.jpg": "a9dc3c6d0b1fc02d0cf311127d6653d1",
"assets/assets/Bomboniere.jpg": "59fd3e59604a797c50fad7c89ff0effd",
"assets/assets/Dirigentes.jpg": "6ce0184a8a75ba30cc4416ff208700c7",
"assets/assets/Circulo.jpg": "d919d8542d3c1533c47d0f03f936f859",
"assets/assets/Santo%2520Antonio.jpg": "3222f085bf99d2d9b3d4434b15bf860c",
"assets/assets/Sala.jpg": "12a8c760c13ca11f62bfe568f3570341",
"assets/assets/Gerais.jpg": "502d0499d42acb9fc4ba5b131b470e4d",
"assets/assets/Diretores%2520Espirituais.jpg": "f2997a2448e6656d1104fb3d108fda1d",
"assets/assets/Regras.jpg": "19f1d0356c913461870821ca61881b95",
"assets/assets/Patrimonio.jpg": "e0a3f7b2478fb8205004503e71b396d2",
"assets/assets/Liturgia.jpg": "39c5403dab040c90d58cebaea3b31f68",
"assets/assets/Compras.jpg": "7826a51916b6370994b9c9951c4440b3",
"assets/assets/Teatro.jpg": "3d7c7d1fc408ae6c1073d5be51d6648a",
"assets/assets/Santo%2520Padre%2520Pio.jpg": "f45b11febd1ac7fa5c2d2f7c8a823961",
"assets/fonts/MaterialIcons-Regular.otf": "3a86da5ea1094255b7f199523772d16a",
"assets/AssetManifest.json": "183ece057763b8d2fdd9a0e161d525fc",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"index.html": "e4aa66a48fba1599e6cc9358d4dfc402",
"/": "e4aa66a48fba1599e6cc9358d4dfc402",
"main.dart.js": "b820d48c52bf4306cf3eec63b701354b"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
