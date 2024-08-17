
class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/characters';
    _apiKey = 'apikey=ef4b5738e027c92c944977fe97f44c1e';
    _baseOffset = 205; 

    getResource = async (url) => { 
        let res = await fetch(url); 

        if (!res.ok) { 
            throw new Error(`Could not fetch ${url}, status: ${res.state}`);
        }

        return await res.json(); 
    }

    getAllCharacters = async (offset = this._baseOffset) => { 
        const res = await this.getResource(`${this._apiBase}?limit=9&offset=${offset}&${this._apiKey}`); 
        return res.data.results.map(this._transformChar);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/${id}?${this._apiKey}`);
        return this._transformChar(res.data.results[0]);
    }

    _transformChar = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: `${char.description ? (char.description.length > 225 ? char.description.slice(0, 224) : char.description) : 'Description is not found'}`,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items 
        }
    }
}

export default MarvelService;