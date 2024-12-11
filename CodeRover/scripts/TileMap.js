//Tile maps are simple indexed arrays where each index corresponds to a texture from
//a standard texture sheet.

class IsoTileMap extends PIXI.Container{
	constructor(width, height, tileWidth, tileHeight, textureAtlas, tileData){
		super();
		
		this.width = width;
		this.height = height;
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
		this.textureAtlas = textureAtlas;
		this.tileData = tileData;
		
		//get texture data
		this.tileTextures = this.loadTexturesFromAtlas(textureAtlas);
		
		this.generateTileMap();
	}
	
	generateTileMap() {
		const vertices = [];
		const uvs = [];
		const indices = [];
		
		let indexOffset = 0;
		
		//loop through the grid and create the verts, uv and indices per Tile
		for(let row=0; row < this.height; row++){
			for(let col=0; col< this.width; col++){
				const tileType = this.tileData[row][col];
				
				
			}
		}
	}
}