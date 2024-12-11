(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("TestMap",
{ "compressionlevel":-1,
 "height":10,
 "infinite":false,
 "layers":[
        {
         "data":[1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 2, 2, 2, 2, 2, 2, 1, 1,
            1, 1, 2, 2, 2, 2, 2, 2, 1, 1,
            1, 1, 2, 2, 2, 2, 2, 2, 1, 1,
            1, 1, 2, 2, 2, 2, 2, 2, 1, 1,
            1, 1, 2, 2, 2, 2, 2, 2, 1, 1,
            1, 1, 2, 2, 2, 2, 2, 2, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         "height":10,
         "id":1,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }],
 "nextlayerid":2,
 "nextobjectid":1,
 "orientation":"isometric",
 "renderorder":"right-down",
 "tiledversion":"1.11.0",
 "tileheight":16,
 "tilesets":[
        {
         "firstgid":1,
         "source":"TestTileset.tsx"
        }],
 "tilewidth":32,
 "type":"map",
 "version":"1.10",
 "width":10
});